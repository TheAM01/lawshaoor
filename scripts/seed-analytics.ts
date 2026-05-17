#!/usr/bin/env tsx
/* Throwaway script to populate the analytics_events collection with
 *  realistic traffic so the dashboard has something to render.
 *
 *  Usage:  pnpm tsx scripts/seed-analytics.ts
 *          (or)  npx tsx scripts/seed-analytics.ts
 *
 *  Hits the local /api/track endpoint, NOT the database directly. So
 *  the events go through the same enrichment path real traffic does. */

import { randomUUID, randomBytes } from 'crypto'

const BASE = process.env.SEED_BASE_URL ?? 'http://localhost:3000'

const POSTS = [
  'convertible-notes-ten-years-on',
  'diligence-for-the-ai-era-target',
  'indemnity-caps-where-the-real-negotiation-lives',
  'reading-an-msa-in-twenty-minutes',
  'the-earnout-clauses-that-quietly-kill-deals',
  'what-boards-get-wrong-about-oversight',
  'when-the-founder-is-the-problem',
]

const CATEGORIES = ['m-a', 'governance', 'contracts', 'capital', 'sector-notes', 'opinion']

const UAS = [
  // Desktop
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36 Edg/130.0.0.0',
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:130.0) Gecko/20100101 Firefox/130.0',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.6 Safari/605.1.15',
  // Mobile
  'Mozilla/5.0 (iPhone; CPU iPhone OS 17_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.6 Mobile/15E148 Safari/604.1',
  'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Mobile Safari/537.36',
  // Tablet
  'Mozilla/5.0 (iPad; CPU OS 17_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.6 Mobile/15E148 Safari/604.1',
]

const REFERRERS = [
  'https://www.google.com/',
  'https://www.google.com/search?q=corporate+law',
  'https://www.bing.com/',
  'https://duckduckgo.com/',
  'https://www.linkedin.com/feed/',
  'https://twitter.com/i/web/status/123',
  'https://x.com/i/web/status/456',
  'https://news.ycombinator.com/',
  'https://www.reddit.com/r/law',
  'https://medium.com/some-blog',
  '',  // direct
  '',
  '',
]

const COUNTRIES = ['US', 'GB', 'CA', 'DE', 'AU', 'IN', 'SG', 'AE', 'FR', 'NL']

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function maybe(p: number): boolean {
  return Math.random() < p
}

async function sendBatch(opts: {
  events: unknown[]
  ua: string
  ip: string
  country: string
}) {
  // We can spoof X-Forwarded-For + X-Vercel-IP-Country on localhost
  // since there's no edge proxy stripping them.
  await fetch(`${BASE}/api/track`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'user-agent': opts.ua,
      'x-forwarded-for': opts.ip,
      'x-vercel-ip-country': opts.country,
    },
    body: JSON.stringify({ events: opts.events }),
  })
}

/* Simulate a single visitor session that lands on one page, may scroll,
 *  may share, and may navigate to one other page. */
async function simulateSession(opts: {
  ua: string
  ip: string
  country: string
  referrer: string
  landing: { kind: 'post' | 'listing' | 'category'; slug?: string; path: string }
}) {
  const sessionId = randomUUID()
  let seq = 0
  const events: Record<string, unknown>[] = []

  // Initial view
  events.push({
    type: 'view',
    pageKind: opts.landing.kind,
    path: opts.landing.path,
    slug: opts.landing.slug,
    sessionId,
    seq: seq++,
    referrer: opts.referrer,
    viewport: { w: 1440, h: 900 },
    dpr: 2,
  })

  if (opts.landing.kind === 'post') {
    // Engagement / scroll progression
    if (maybe(0.95)) events.push(evt('scroll', { depth: 25 }))
    if (maybe(0.7)) events.push(evt('scroll', { depth: 50 }))
    if (maybe(0.45)) events.push(evt('scroll', { depth: 75 }))
    if (maybe(0.25)) events.push(evt('scroll', { depth: 100 }))

    const engageBursts = Math.floor(Math.random() * 6) + 1
    for (let i = 0; i < engageBursts; i++) {
      events.push(evt('engage', { seconds: 5 + Math.floor(Math.random() * 12) }))
    }

    if (maybe(0.3)) events.push(evt('read'))
    if (maybe(0.15)) {
      events.push(
        evt('share', { platform: pick(['x', 'linkedin', 'copy', 'email']) })
      )
    }
    if (maybe(0.2)) {
      events.push(evt('outbound', { href: pick(['https://example.com', 'https://news.ycombinator.com']) }))
    }
  } else {
    // Listing/category — usually just a quick browse then click into a post.
    if (maybe(0.8)) events.push(evt('scroll', { depth: 25 }))
    if (maybe(0.4)) events.push(evt('scroll', { depth: 50 }))
    events.push(evt('engage', { seconds: 4 + Math.floor(Math.random() * 8) }))
  }

  await sendBatch({ events, ua: opts.ua, ip: opts.ip, country: opts.country })

  // Second pageview (some sessions navigate further)
  if (maybe(0.4)) {
    const next: { kind: 'post' | 'listing'; slug?: string; path: string } = maybe(0.7)
      ? { kind: 'post', slug: pick(POSTS), path: `/lawshaoor-academy/${pick(POSTS)}` }
      : { kind: 'listing', path: '/lawshaoor-academy' }
    const events2: Record<string, unknown>[] = [
      {
        type: 'view',
        pageKind: next.kind,
        path: next.path,
        slug: next.slug,
        sessionId,
        seq: seq++,
        referrer: `${BASE}${opts.landing.path}`,
      },
    ]
    if (next.kind === 'post') {
      if (maybe(0.6)) events2.push(evt('scroll', { depth: 25 }))
      events2.push(evt('engage', { seconds: 6 + Math.floor(Math.random() * 14) }))
      if (maybe(0.2)) events2.push(evt('read'))
    }
    await sendBatch({ events: events2, ua: opts.ua, ip: opts.ip, country: opts.country })
  }

  function evt(type: string, extra: Record<string, unknown> = {}) {
    return {
      type,
      pageKind: opts.landing.kind,
      path: opts.landing.path,
      slug: opts.landing.slug,
      sessionId,
      seq: seq++,
      ...extra,
    }
  }
}

function randomIp(): string {
  const b = randomBytes(4)
  // Avoid 0.x and 127.x
  b[0] = Math.max(1, b[0] === 127 ? 128 : b[0])
  return Array.from(b).join('.')
}

async function main() {
  const sessions = Number(process.env.SEED_SESSIONS ?? 80)
  console.log(`Seeding ~${sessions} sessions against ${BASE}/api/track…`)

  let done = 0
  // Sequential so we don't blow up the local dev server.
  for (let i = 0; i < sessions; i++) {
    const ua = pick(UAS)
    const ip = randomIp()
    const country = pick(COUNTRIES)
    const referrer = pick(REFERRERS)

    // 70% post landings, 20% listing, 10% category
    const r = Math.random()
    let landing: Parameters<typeof simulateSession>[0]['landing']
    if (r < 0.7) {
      const slug = pick(POSTS)
      landing = { kind: 'post', slug, path: `/lawshaoor-academy/${slug}` }
    } else if (r < 0.9) {
      landing = { kind: 'listing', path: '/lawshaoor-academy' }
    } else {
      const slug = pick(CATEGORIES)
      landing = { kind: 'category', slug, path: `/lawshaoor-academy/c/${slug}` }
    }

    try {
      await simulateSession({ ua, ip, country, referrer, landing })
      done++
      if (done % 10 === 0) process.stdout.write(`  ${done}/${sessions}\n`)
    } catch (err) {
      console.error('session failed', err)
    }
  }

  console.log(`Done — ${done} sessions sent.`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
