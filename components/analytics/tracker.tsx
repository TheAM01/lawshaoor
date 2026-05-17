'use client'

/* Client-side analytics tracker.
 *
 * Renders nothing. Mounts side-effects:
 *   – emits a `view` event on mount
 *   – heartbeats `engage` events while the page is visible & user is active
 *   – fires `scroll` milestones at 25/50/75/100% depth
 *   – fires a single `read` event when the article is consumed
 *     (~95% scroll OR active seconds > readMinutes * 60)
 *   – fires `outbound` events for clicks on external links
 *
 * Events are queued and batched. Flushes are:
 *   – every 5 s, OR when the queue reaches 8 events
 *   – on `visibilitychange → hidden` via sendBeacon
 *   – on `pagehide` via sendBeacon (covers bfcache / reload / close)
 *   – on component unmount (route change)
 *
 * Public side-channel: `track(event)` is a module-level helper that
 * other components (ShareButtons, CTAs) can import to push events into
 * the same queue without prop-drilling. */

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import type {
  ClientEvent,
  EventType,
  PageKind,
} from '@/lib/models/analytics'

/* ──────────────────────────────────────────────
   Session state — module-level, shared across pages
   ────────────────────────────────────────────── */

const SESSION_KEY = 'ls_sess'
const TRACK_URL = '/api/track'
/** Flush when queue reaches this size. */
const BATCH_SIZE = 8
/** Flush interval (ms) when queue has items. */
const FLUSH_INTERVAL_MS = 5000
/** Engagement heartbeat tick (ms). */
const HEARTBEAT_MS = 15000
/** Activity decay — inputs older than this don't count as active. */
const ACTIVITY_WINDOW_MS = 30000

let queue: ClientEvent[] = []
let seq = 0
let flushTimer: ReturnType<typeof setTimeout> | null = null

function newId(): string {
  // crypto.randomUUID exists in all modern browsers; fall back to a
  // shorter random string if it's missing (very old Safari).
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }
  return Math.random().toString(36).slice(2) + Date.now().toString(36)
}

function getSessionId(): string {
  if (typeof window === 'undefined') return ''
  try {
    let id = sessionStorage.getItem(SESSION_KEY)
    if (!id) {
      id = newId()
      sessionStorage.setItem(SESSION_KEY, id)
    }
    return id
  } catch {
    // Private mode / storage disabled — still works, but session is
    // per-page-load. The visitor hash on the server is the durable id.
    return newId()
  }
}

function parseUtm(search: string): ClientEvent['utm'] | undefined {
  if (!search) return undefined
  const p = new URLSearchParams(search)
  const utm = {
    source: p.get('utm_source') ?? undefined,
    medium: p.get('utm_medium') ?? undefined,
    campaign: p.get('utm_campaign') ?? undefined,
    term: p.get('utm_term') ?? undefined,
    content: p.get('utm_content') ?? undefined,
  }
  const anySet = Object.values(utm).some(Boolean)
  return anySet ? utm : undefined
}

/* ──────────────────────────────────────────────
   Flush logic
   ────────────────────────────────────────────── */

function scheduleFlush() {
  if (flushTimer) return
  flushTimer = setTimeout(() => {
    flushTimer = null
    void flush('timer')
  }, FLUSH_INTERVAL_MS)
}

function clearFlushTimer() {
  if (flushTimer) {
    clearTimeout(flushTimer)
    flushTimer = null
  }
}

async function flush(reason: 'timer' | 'size' | 'unmount' | 'hidden' | 'pagehide') {
  if (queue.length === 0) return
  const events = queue
  queue = []
  clearFlushTimer()
  const body = JSON.stringify({ events })

  // sendBeacon — use for terminal events where we can't await fetch.
  if (
    (reason === 'hidden' || reason === 'pagehide') &&
    typeof navigator !== 'undefined' &&
    typeof navigator.sendBeacon === 'function'
  ) {
    try {
      const blob = new Blob([body], { type: 'application/json' })
      const ok = navigator.sendBeacon(TRACK_URL, blob)
      if (ok) return
      // Beacon refused (size > ~64KB or queue full) — fall through to fetch.
    } catch {
      /* Ignore — fall through to fetch. */
    }
  }

  try {
    await fetch(TRACK_URL, {
      method: 'POST',
      keepalive: true,
      headers: { 'content-type': 'application/json' },
      body,
      // We don't read the response; using 'no-cors' isn't useful here
      // because the endpoint is same-origin, but keepalive matters.
    })
  } catch {
    /* Network failure — events are lost. We don't retry; analytics
     *  loss is acceptable and avoiding a retry storm matters more. */
  }
}

/* ──────────────────────────────────────────────
   Public emit
   ──────────────────────────────────────────────
   Used by both this file and outside (ShareButtons, etc.) via the
   re-exported `track`. */

type EmitInput = {
  type: EventType
  pageKind: PageKind
  path?: string
  slug?: string
  referrer?: string
  utm?: ClientEvent['utm']
  viewport?: ClientEvent['viewport']
  dpr?: number
  seconds?: number
  depth?: ClientEvent['depth']
  platform?: ClientEvent['platform']
  href?: string
  label?: string
}

function emit(input: EmitInput) {
  if (typeof window === 'undefined') return
  const sessionId = getSessionId()
  if (!sessionId) return

  const event: ClientEvent = {
    type: input.type,
    pageKind: input.pageKind,
    path: input.path ?? window.location.pathname + window.location.search,
    sessionId,
    seq: seq++,
    slug: input.slug,
    referrer: input.referrer,
    utm: input.utm,
    viewport: input.viewport,
    dpr: input.dpr,
    seconds: input.seconds,
    depth: input.depth,
    platform: input.platform,
    href: input.href,
    label: input.label,
  }

  queue.push(event)

  if (process.env.NODE_ENV === 'development') {
    // Light dev visibility — one console line per event. The dashboard
    // is the real source of truth, this just helps when wiring things up.
    // eslint-disable-next-line no-console
    console.debug('[analytics]', event.type, { ...event, sessionId: undefined })
  }

  if (queue.length >= BATCH_SIZE) {
    void flush('size')
  } else {
    scheduleFlush()
  }
}

/* The exposed helper for ad-hoc events from other components. The
 * second argument is optional context — if omitted, we don't know the
 * pageKind/slug, so callers from typed pages should pass them. */
export function track(
  type: EventType,
  ctx: {
    pageKind?: PageKind
    slug?: string
    platform?: ClientEvent['platform']
    href?: string
    label?: string
  } = {}
) {
  emit({
    type,
    pageKind: ctx.pageKind ?? 'other',
    slug: ctx.slug,
    platform: ctx.platform,
    href: ctx.href,
    label: ctx.label,
  })
}

/* ──────────────────────────────────────────────
   The component
   ────────────────────────────────────────────── */

type TrackerProps = {
  pageKind: PageKind
  slug?: string
  /** For posts — used to compute the time-based read threshold. */
  readMinutes?: number
}

export function Tracker({ pageKind, slug, readMinutes = 5 }: TrackerProps) {
  const pathname = usePathname()
  // React strict mode runs effects twice in dev. The viewFiredFor ref
  // ensures we only emit one view per (pathname + slug + page-load).
  const viewFiredFor = useRef<string | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const viewKey = `${pathname}|${slug ?? ''}`
    if (viewFiredFor.current === viewKey) return
    viewFiredFor.current = viewKey

    /* ── Initial view event ── */
    const referrer = document.referrer || ''
    const utm = parseUtm(window.location.search)
    emit({
      type: 'view',
      pageKind,
      slug,
      referrer,
      utm,
      viewport: { w: window.innerWidth, h: window.innerHeight },
      dpr: window.devicePixelRatio,
    })

    /* ── Activity + engagement heartbeat ── */
    let lastActivity = Date.now()
    let activeSeconds = 0
    let totalActiveSeconds = 0
    const onActivity = () => {
      lastActivity = Date.now()
    }
    const tickerId = window.setInterval(() => {
      if (document.visibilityState !== 'visible') return
      if (Date.now() - lastActivity > ACTIVITY_WINDOW_MS) return
      activeSeconds += 1
      totalActiveSeconds += 1
      maybeFireRead()
    }, 1000)
    const heartbeatId = window.setInterval(() => {
      if (activeSeconds === 0) return
      emit({
        type: 'engage',
        pageKind,
        slug,
        seconds: activeSeconds,
      })
      activeSeconds = 0
    }, HEARTBEAT_MS)

    /* ── Scroll depth ── */
    const milestones: Array<ClientEvent['depth']> = [25, 50, 75, 100]
    const fired = new Set<number>()
    let scrollTicking = false
    const onScroll = () => {
      if (scrollTicking) return
      scrollTicking = true
      requestAnimationFrame(() => {
        scrollTicking = false
        const doc = document.documentElement
        const max = Math.max(1, doc.scrollHeight - window.innerHeight)
        const pct = Math.min(100, Math.round(((window.scrollY || doc.scrollTop) / max) * 100))
        for (const m of milestones) {
          if (m === undefined) continue
          if (pct >= m && !fired.has(m)) {
            fired.add(m)
            emit({ type: 'scroll', pageKind, slug, depth: m })
          }
        }
        maybeFireRead(pct)
      })
    }

    /* ── Read-completion (once) ── */
    let readFired = false
    const readThresholdSeconds = Math.max(30, readMinutes * 60)
    const maybeFireRead = (pct?: number) => {
      if (readFired) return
      const scrollOk = pct !== undefined && pct >= 95
      const timeOk = totalActiveSeconds >= readThresholdSeconds
      if (!scrollOk && !timeOk) return
      readFired = true
      emit({ type: 'read', pageKind, slug })
    }

    /* ── Outbound link clicks ── */
    const onClick = (ev: MouseEvent) => {
      if (ev.defaultPrevented) return
      const target = ev.target as HTMLElement | null
      const anchor = target?.closest?.('a') as HTMLAnchorElement | null
      if (!anchor || !anchor.href) return
      try {
        const url = new URL(anchor.href)
        if (url.host && url.host !== window.location.host) {
          emit({ type: 'outbound', pageKind, slug, href: anchor.href })
        }
      } catch {
        /* Non-URL hrefs (mailto:, tel:, etc.) — ignored intentionally;
         *  the share button instrumentation captures mailto separately. */
      }
    }

    /* ── Flush triggers ── */
    const onVisibility = () => {
      if (document.visibilityState === 'hidden') {
        // Final engage tick before going dark
        if (activeSeconds > 0) {
          emit({ type: 'engage', pageKind, slug, seconds: activeSeconds })
          activeSeconds = 0
        }
        void flush('hidden')
      }
    }
    const onPageHide = () => {
      if (activeSeconds > 0) {
        emit({ type: 'engage', pageKind, slug, seconds: activeSeconds })
        activeSeconds = 0
      }
      void flush('pagehide')
    }

    /* ── Wire it all up ── */
    const activityEvents = ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll']
    activityEvents.forEach((e) =>
      window.addEventListener(e, onActivity, { passive: true, capture: true })
    )
    window.addEventListener('scroll', onScroll, { passive: true })
    document.addEventListener('click', onClick, { capture: true })
    document.addEventListener('visibilitychange', onVisibility)
    window.addEventListener('pagehide', onPageHide)

    // Fire an initial scroll calculation so depth=25 lands if the page
    // is already scrolled (e.g. anchor link). 1 frame after mount.
    requestAnimationFrame(onScroll)

    return () => {
      window.clearInterval(tickerId)
      window.clearInterval(heartbeatId)
      activityEvents.forEach((e) =>
        window.removeEventListener(e, onActivity, { capture: true })
      )
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('click', onClick, { capture: true })
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('pagehide', onPageHide)

      // Final flush on route change — capture any remaining engagement.
      if (activeSeconds > 0) {
        emit({ type: 'engage', pageKind, slug, seconds: activeSeconds })
      }
      void flush('unmount')
    }
  }, [pathname, pageKind, slug, readMinutes])

  return null
}
