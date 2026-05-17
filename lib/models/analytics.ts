import { z } from 'zod'
import type { ObjectId } from 'mongodb'

/* ──────────────────────────────────────────────
   Event types
   ──────────────────────────────────────────────
   Events are deliberately a small, closed set. Anything new gets added
   here first (typed, schema-validated, then the ingest endpoint will
   accept it). The shape favours wide-rows of optional fields over a
   loose `meta` blob so aggregations stay typed. */

export const EVENT_TYPES = [
  'view',         // page view (post, listing, category)
  'engage',       // periodic engagement heartbeat (active seconds)
  'scroll',       // scroll depth milestone reached (25/50/75/100)
  'read',         // article read to end (~95% scroll OR time > readMinutes)
  'share',        // share button clicked
  'outbound',     // outbound link click
  'cta',          // CTA button click (e.g. "Schedule a call")
  'search',       // future: in-site search
] as const
export type EventType = (typeof EVENT_TYPES)[number]

export const PAGE_KINDS = [
  'post',     // /lawshaoor-academy/[slug]
  'listing',  // /lawshaoor-academy
  'category', // /lawshaoor-academy/c/[slug]
  'other',    // any other page that may be instrumented later
] as const
export type PageKind = (typeof PAGE_KINDS)[number]

export const DEVICE_TYPES = ['mobile', 'tablet', 'desktop', 'bot', 'unknown'] as const
export type DeviceType = (typeof DEVICE_TYPES)[number]

/* ──────────────────────────────────────────────
   Wire format (what the client sends)
   ──────────────────────────────────────────────
   Stays small. Server-side enrichment fills in the rest (visitor hash,
   device, country, referrer host, etc). */

export const ClientEventSchema = z.object({
  type: z.enum(EVENT_TYPES),
  pageKind: z.enum(PAGE_KINDS),
  path: z.string().min(1).max(512),
  /** Post slug, when pageKind === 'post' or 'category'. */
  slug: z.string().max(256).optional(),
  /** Stable session ID generated client-side (sessionStorage UUID). */
  sessionId: z.string().min(8).max(64),
  /** Monotonic counter within session — helps order events on the server. */
  seq: z.number().int().nonnegative().max(100_000).optional(),
  /** Referrer the page was loaded with (full URL or empty). */
  referrer: z.string().max(2048).optional(),
  /** UTM parameters captured from the URL on page load. */
  utm: z
    .object({
      source: z.string().max(128).optional(),
      medium: z.string().max(128).optional(),
      campaign: z.string().max(128).optional(),
      term: z.string().max(128).optional(),
      content: z.string().max(128).optional(),
    })
    .optional(),
  /** Viewport width/height at view time. */
  viewport: z
    .object({
      w: z.number().int().min(0).max(20000),
      h: z.number().int().min(0).max(20000),
    })
    .optional(),
  /** Screen DPR (1 for normal, 2 for retina, etc). */
  dpr: z.number().min(0.5).max(8).optional(),
  /** Active engaged seconds since last heartbeat. type === 'engage'. */
  seconds: z.number().int().min(0).max(60 * 60).optional(),
  /** Scroll-depth milestone 25/50/75/100. type === 'scroll'. */
  depth: z.union([z.literal(25), z.literal(50), z.literal(75), z.literal(100)]).optional(),
  /** Share platform. type === 'share'. */
  platform: z
    .enum(['x', 'linkedin', 'facebook', 'whatsapp', 'email', 'copy', 'native'])
    .optional(),
  /** Outbound link href (full URL). type === 'outbound'. */
  href: z.string().max(2048).optional(),
  /** Free-form CTA identifier (e.g. 'schedule-call'). type === 'cta'. */
  label: z.string().max(128).optional(),
})
export type ClientEvent = z.infer<typeof ClientEventSchema>

export const ClientBatchSchema = z.object({
  events: z.array(ClientEventSchema).min(1).max(50),
})
export type ClientBatch = z.infer<typeof ClientBatchSchema>

/* ──────────────────────────────────────────────
   Stored event (what lives in `analytics_events`)
   ──────────────────────────────────────────────
   Enriched with server-derived fields. Indexed for the queries we run. */

export type StoredEvent = ClientEvent & {
  _id?: ObjectId
  /** Anonymous visitor hash (daily-rotating salt). Coarse but consistent
   *  within a calendar day. */
  visitorId: string
  /** sha256(ip + ua) — for de-duping bot floods regardless of day. */
  fingerprint: string
  /** ISO date string yyyy-mm-dd in UTC — convenience for grouping. */
  dayUTC: string
  /** Parsed device class. */
  device: DeviceType
  /** Parsed browser family (e.g. 'Chrome', 'Safari'). */
  browser: string
  /** Parsed OS family (e.g. 'Windows', 'macOS', 'iOS'). */
  os: string
  /** ISO country code from request headers (Vercel/Cloudflare/X-Vercel-IP-Country). */
  country: string
  /** Region/city from headers when available (best-effort). */
  region: string
  /** Referrer host stripped of protocol/path. Empty for direct. */
  refHost: string
  /** Referrer source classification (search/social/direct/internal/other). */
  refSource: 'search' | 'social' | 'direct' | 'internal' | 'other'
  /** When the event landed on the server. */
  createdAt: Date
}

/* ──────────────────────────────────────────────
   Daily roll-up (what lives in `analytics_daily`)
   ──────────────────────────────────────────────
   One doc per (day, slug). Lets the dashboard render fast for any
   historical date range. Built incrementally — first request of the
   day reads from `analytics_events`, later requests hit the rollup. */

export type DailyRollup = {
  _id?: ObjectId
  dayUTC: string                 // yyyy-mm-dd
  pageKind: PageKind
  slug: string                   // '' for listing
  views: number
  uniques: number                // distinct visitorId for the day
  engagedSeconds: number         // sum of 'engage' seconds
  scroll25: number
  scroll50: number
  scroll75: number
  scroll100: number
  reads: number                  // 'read' events
  shares: number                 // 'share' events
  outbound: number               // 'outbound' clicks
  ctas: number                   // 'cta' clicks
  byDevice: Record<DeviceType, number>
  byCountry: Record<string, number>
  byBrowser: Record<string, number>
  byRefSource: Record<StoredEvent['refSource'], number>
  byReferrerHost: Record<string, number>
  builtAt: Date
}

/* ──────────────────────────────────────────────
   Session ledger (what lives in `analytics_sessions`)
   ──────────────────────────────────────────────
   One doc per browser session. TTL'd at 7 days. Used to compute bounce
   rate, pages-per-session, entry/exit pages. */

export type SessionDoc = {
  _id?: ObjectId
  sessionId: string
  visitorId: string
  fingerprint: string
  startedAt: Date
  lastSeenAt: Date
  pageViews: number
  reads: number
  shares: number
  device: DeviceType
  browser: string
  os: string
  country: string
  entryPath: string
  entryRefHost: string
  entryRefSource: StoredEvent['refSource']
  utm?: ClientEvent['utm']
  lastPath: string
}

/* ──────────────────────────────────────────────
   Helpers
   ──────────────────────────────────────────────
   Pure utilities — no I/O. Kept here so both client and server type-import
   cleanly. */

export function todayUTC(d = new Date()): string {
  const y = d.getUTCFullYear()
  const m = String(d.getUTCMonth() + 1).padStart(2, '0')
  const day = String(d.getUTCDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export function shiftDay(dayUTC: string, deltaDays: number): string {
  const [y, m, d] = dayUTC.split('-').map(Number)
  const dt = new Date(Date.UTC(y, m - 1, d))
  dt.setUTCDate(dt.getUTCDate() + deltaDays)
  return todayUTC(dt)
}

/** Generate the inclusive list of UTC day strings between `from` and `to`. */
export function rangeDays(from: string, to: string): string[] {
  const out: string[] = []
  let cur = from
  // safety cap of ~5 years
  for (let i = 0; i < 1900 && cur <= to; i++) {
    out.push(cur)
    cur = shiftDay(cur, 1)
  }
  return out
}

/** Last N days inclusive of today (UTC). */
export function lastNDays(n: number, base = new Date()): string[] {
  const to = todayUTC(base)
  const from = shiftDay(to, -(n - 1))
  return rangeDays(from, to)
}
