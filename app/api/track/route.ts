import { NextResponse } from 'next/server'
import { ingest } from '@/lib/server/analytics'

export const runtime = 'nodejs'
// We want fresh enrichment data on every hit — no caching of the response.
export const dynamic = 'force-dynamic'

/* Public ingest endpoint for the cookieless visitor analytics.
 *
 * Lives outside `/api/admin/*` so middleware doesn't gate it.
 *
 * Anti-abuse posture:
 *  – Server validates the payload via zod (ClientBatchSchema).
 *  – Bots filtered by UA regex.
 *  – Admin self-skip (so previewing the live site doesn't pollute data).
 *  – Hard cap of 50 events per batch (zod-enforced).
 *  – TTL on the events collection (90 days) caps storage worst-case.
 *
 * Beacon support: navigator.sendBeacon submits as text/plain or
 * application/json; both land here as JSON bodies. We tolerate parse
 * failures with a 204 (the client cannot retry usefully). */

function selfHostOf(req: Request): string {
  const url = new URL(req.url)
  // X-Forwarded-Host wins on Vercel; fall back to the URL host.
  return req.headers.get('x-forwarded-host') ?? url.host
}

function isAdminRequest(req: Request): boolean {
  const cookie = req.headers.get('cookie') ?? ''
  return /(^|;\s*)lawshaoor_admin=/.test(cookie)
}

export async function POST(req: Request) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    // sendBeacon with text/plain still passes through here; if the body
    // isn't JSON, drop it quietly.
    return new NextResponse(null, { status: 204 })
  }

  const result = await ingest(body, {
    headers: req.headers,
    isAdmin: isAdminRequest(req),
    selfHost: selfHostOf(req),
  })

  // 204 No Content keeps the response cheap and signals success to the
  // beacon without payload. The client never reads this response anyway.
  if (result.accepted > 0) return new NextResponse(null, { status: 204 })
  return new NextResponse(null, { status: 204 })
}

// Some browsers preflight beacons in development. Allow CORS for the
// same-origin case (the only one we accept).
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'content-type',
    },
  })
}
