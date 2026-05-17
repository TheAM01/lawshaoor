import 'server-only'
import crypto from 'crypto'
import {
  analyticsEventsCollection,
  analyticsSaltsCollection,
  analyticsSessionsCollection,
} from '@/lib/mongo'
import {
  ClientBatchSchema,
  todayUTC,
  type ClientBatch,
  type ClientEvent,
  type DeviceType,
  type SessionDoc,
  type StoredEvent,
} from '@/lib/models/analytics'

/* ──────────────────────────────────────────────
   Bot detection
   ──────────────────────────────────────────────
   We reject obvious bots at the ingest layer rather than store-and-filter.
   The regex is intentionally conservative — when in doubt, count the
   visitor. Bots are uninteresting noise; over-tagging humans as bots is
   a much bigger problem. */

const BOT_RE =
  /(bot|crawl|spider|slurp|mediapartners|preview|monitor|headless|chrome-lighthouse|googleweblight|pingdom|uptime|axios|curl|wget|node-fetch|python-requests|java\/|okhttp|httpclient|libwww|insomnia|postman|whatsapp|telegram|discord|skype|slackbot|facebookexternalhit|twitterbot|linkedinbot|embedly|ahrefs|semrush|mj12|dotbot|petalbot|seznam|bingpreview)/i

export function isBot(ua: string): boolean {
  if (!ua) return true
  return BOT_RE.test(ua)
}

/* ──────────────────────────────────────────────
   UA parsing (hand-rolled)
   ──────────────────────────────────────────────
   We resist adding a UA-parser dep. The Big Five browsers + iOS/Android
   account for >99% of traffic; everything else falls into 'unknown' and
   that's fine — the dashboard already buckets a long tail. */

export function parseDevice(ua: string): DeviceType {
  if (!ua) return 'unknown'
  if (isBot(ua)) return 'bot'
  // iPad first — older iPad UAs claim macOS, but they include 'iPad'
  // when they don't, plus the touch hint.
  if (/iPad|tablet|playbook|silk/i.test(ua)) return 'tablet'
  if (/Android(?!.*Mobile)/i.test(ua)) return 'tablet'
  if (/Mobi|iPhone|iPod|Android.*Mobile|Windows Phone/i.test(ua)) return 'mobile'
  return 'desktop'
}

export function parseBrowser(ua: string): string {
  if (!ua) return 'unknown'
  // Order matters — Edge/Opera/Brave include 'Chrome' in their UA.
  if (/Edg\//.test(ua)) return 'Edge'
  if (/OPR\/|Opera\//.test(ua)) return 'Opera'
  if (/Vivaldi\//.test(ua)) return 'Vivaldi'
  if (/Brave\//.test(ua)) return 'Brave'
  if (/SamsungBrowser/.test(ua)) return 'Samsung'
  if (/FxiOS\/|Firefox\//.test(ua)) return 'Firefox'
  if (/CriOS\//.test(ua)) return 'Chrome'
  if (/Chrome\//.test(ua)) return 'Chrome'
  if (/Safari\//.test(ua) && /Version\//.test(ua)) return 'Safari'
  return 'Other'
}

export function parseOS(ua: string): string {
  if (!ua) return 'unknown'
  if (/Windows NT/.test(ua)) return 'Windows'
  if (/Android/.test(ua)) return 'Android'
  if (/iPhone|iPad|iPod|iOS/.test(ua)) return 'iOS'
  if (/Mac OS X|Macintosh/.test(ua)) return 'macOS'
  if (/CrOS/.test(ua)) return 'ChromeOS'
  if (/Linux/.test(ua)) return 'Linux'
  return 'Other'
}

/* ──────────────────────────────────────────────
   Referrer classification
   ──────────────────────────────────────────────
   Cheap host-match against a curated list. New entries land here when
   we notice a host worth bucketing — the long tail goes to 'other'. */

const SEARCH_HOSTS = new Set([
  'google.com',
  'bing.com',
  'duckduckgo.com',
  'search.brave.com',
  'baidu.com',
  'yandex.com',
  'ecosia.org',
  'startpage.com',
  'kagi.com',
  'qwant.com',
  'searx.org',
])

const SOCIAL_HOSTS = new Set([
  'twitter.com',
  'x.com',
  't.co',
  'facebook.com',
  'fb.com',
  'm.facebook.com',
  'l.facebook.com',
  'linkedin.com',
  'lnkd.in',
  'reddit.com',
  'old.reddit.com',
  'threads.net',
  'instagram.com',
  'youtube.com',
  'mastodon.social',
  'bsky.app',
  'pinterest.com',
  'tumblr.com',
  'telegram.org',
  'whatsapp.com',
  'medium.com',
  'news.ycombinator.com',
])

function normHost(host: string): string {
  return host.toLowerCase().replace(/^www\./, '')
}

export function classifyReferrer(
  referrer: string,
  selfHost: string
): { host: string; source: StoredEvent['refSource'] } {
  if (!referrer) return { host: '', source: 'direct' }
  try {
    const u = new URL(referrer)
    const host = normHost(u.host)
    if (!host) return { host: '', source: 'direct' }
    if (host === normHost(selfHost)) return { host, source: 'internal' }
    // Normalize 'google.co.uk' → 'google.com' bucket
    const rootSearch = Array.from(SEARCH_HOSTS).find((s) =>
      host === s || host.endsWith('.' + s.split('.').slice(-2).join('.'))
    )
    if (rootSearch || /\b(google|bing|duckduckgo|brave|yandex|baidu)\./.test(host)) {
      return { host, source: 'search' }
    }
    if (SOCIAL_HOSTS.has(host)) return { host, source: 'social' }
    return { host, source: 'other' }
  } catch {
    return { host: '', source: 'other' }
  }
}

/* ──────────────────────────────────────────────
   Request IP
   ────────────────────────────────────────────── */

export function extractIp(headers: Headers): string {
  // Order matches what platform routers typically set; the first hop in
  // X-Forwarded-For is the original client.
  const xff = headers.get('x-forwarded-for')
  if (xff) {
    const first = xff.split(',')[0]?.trim()
    if (first) return first
  }
  return (
    headers.get('cf-connecting-ip') ||
    headers.get('x-real-ip') ||
    headers.get('x-vercel-forwarded-for') ||
    ''
  )
}

export function extractCountry(headers: Headers): string {
  return (
    headers.get('x-vercel-ip-country') ||
    headers.get('cf-ipcountry') ||
    headers.get('x-country') ||
    ''
  )
}

export function extractRegion(headers: Headers): string {
  return (
    headers.get('x-vercel-ip-region') ||
    headers.get('x-vercel-ip-city') ||
    headers.get('cf-region') ||
    ''
  )
}

/* ──────────────────────────────────────────────
   Daily salt — for the visitor hash
   ──────────────────────────────────────────────
   Salt rotates every UTC day. This bounds the lifetime of any single
   visitor identifier to one day, which is the cookieless analytics
   pattern that keeps us out of consent-banner territory.

   Concurrency: two requests could race on first hit of the day. We use
   findOneAndUpdate with upsert + returnDocument:'after' so whichever
   write lands first wins; the loser reads back the winner's salt. */

const saltCache = new Map<string, string>()

export async function getDailySalt(day = todayUTC()): Promise<string> {
  const cached = saltCache.get(day)
  if (cached) return cached
  const col = await analyticsSaltsCollection()
  const fresh = crypto.randomBytes(32).toString('hex')
  const res = await col.findOneAndUpdate(
    { dayUTC: day },
    { $setOnInsert: { dayUTC: day, salt: fresh, createdAt: new Date() } },
    { upsert: true, returnDocument: 'after' }
  )
  const salt = (res?.salt as string | undefined) ?? fresh
  saltCache.set(day, salt)
  // Trim cache — only keep last 3 days
  if (saltCache.size > 3) {
    const keys = Array.from(saltCache.keys()).sort()
    for (const k of keys.slice(0, keys.length - 3)) saltCache.delete(k)
  }
  return salt
}

export async function hashVisitor(ip: string, ua: string, day = todayUTC()): Promise<string> {
  const salt = await getDailySalt(day)
  return crypto.createHash('sha256').update(`${salt}|${ip}|${ua}`).digest('hex').slice(0, 32)
}

/** Day-independent identifier (used to spot bot floods that span midnight). */
export function fingerprint(ip: string, ua: string): string {
  return crypto.createHash('sha256').update(`${ip}|${ua}`).digest('hex').slice(0, 24)
}

/* ──────────────────────────────────────────────
   Ingest
   ──────────────────────────────────────────────
   Parse → enrich → write events + upsert session doc. Returns the count
   of events accepted (0 if filtered as bot/admin/invalid). */

export type IngestContext = {
  headers: Headers
  /** Browser-side cookie present means this is the signed-in admin
   *  hitting their own site — skip to keep dashboards honest. */
  isAdmin: boolean
  /** Origin host of the request (e.g. 'lawshaoor.com'). */
  selfHost: string
}

export type IngestResult = {
  accepted: number
  reason?: 'invalid' | 'bot' | 'admin' | 'rate-limited'
}

export async function ingest(
  raw: unknown,
  ctx: IngestContext
): Promise<IngestResult> {
  const parsed = ClientBatchSchema.safeParse(raw)
  if (!parsed.success) return { accepted: 0, reason: 'invalid' }

  const ua = ctx.headers.get('user-agent') ?? ''
  if (isBot(ua)) return { accepted: 0, reason: 'bot' }
  if (ctx.isAdmin) return { accepted: 0, reason: 'admin' }

  const ip = extractIp(ctx.headers)
  const country = extractCountry(ctx.headers)
  const region = extractRegion(ctx.headers)
  const device = parseDevice(ua)
  if (device === 'bot') return { accepted: 0, reason: 'bot' }
  const browser = parseBrowser(ua)
  const os = parseOS(ua)
  const day = todayUTC()
  const visitorId = await hashVisitor(ip, ua, day)
  const fp = fingerprint(ip, ua)

  const batch: ClientBatch = parsed.data
  const now = new Date()
  const stored: StoredEvent[] = batch.events.map((e: ClientEvent) => {
    const { host, source } = classifyReferrer(e.referrer ?? '', ctx.selfHost)
    return {
      ...e,
      visitorId,
      fingerprint: fp,
      dayUTC: day,
      device,
      browser,
      os,
      country,
      region,
      refHost: host,
      refSource: source,
      createdAt: now,
    }
  })

  const events = await analyticsEventsCollection()
  await events.insertMany(stored as never[])

  // Upsert session ledger — atomic, additive counters for view/read/share.
  // Pick the first 'view' (or fall back to first event) for entry-page
  // metadata; that's the session origin.
  const first = stored.find((e) => e.type === 'view') ?? stored[0]
  if (first) {
    const sessions = await analyticsSessionsCollection()
    const viewCount = stored.filter((e) => e.type === 'view').length
    const readCount = stored.filter((e) => e.type === 'read').length
    const shareCount = stored.filter((e) => e.type === 'share').length
    const lastPath = stored[stored.length - 1]?.path ?? first.path

    const update: Record<string, unknown> = {
      $setOnInsert: {
        sessionId: first.sessionId,
        visitorId,
        fingerprint: fp,
        startedAt: now,
        device,
        browser,
        os,
        country,
        entryPath: first.path,
        entryRefHost: first.refHost,
        entryRefSource: first.refSource,
        utm: first.utm,
      } satisfies Partial<SessionDoc>,
      $set: { lastSeenAt: now, lastPath },
      $inc: {
        pageViews: viewCount,
        reads: readCount,
        shares: shareCount,
      },
    }
    await sessions.updateOne({ sessionId: first.sessionId }, update, { upsert: true })
  }

  return { accepted: stored.length }
}
