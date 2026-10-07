import { NextResponse } from 'next/server'
import { createHash } from 'node:crypto'
import { briefsCollection } from '@/lib/mongo'
import { BriefInputSchema, type BriefDoc } from '@/lib/models/brief'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/* Public endpoint for the /contact form.
 *
 * Lives outside `/api/admin/*` so middleware doesn't gate it.
 *
 * Anti-abuse posture:
 *  – Payload validated + length-capped via zod (BriefInputSchema).
 *  – Honeypot field (`website`): bots that fill it get a fake success and
 *    nothing is stored, so they have no signal to adapt to.
 *  – Rate limit: RATE_LIMIT submissions per IP per RATE_WINDOW_MS, counted
 *    from stored briefs. IPs are stored only as a salted hash. */

const RATE_LIMIT = 5
const RATE_WINDOW_MS = 60 * 60 * 1000

function clientIp(req: Request): string {
  // First hop of X-Forwarded-For is the client on Vercel.
  const fwd = req.headers.get('x-forwarded-for')
  if (fwd) return fwd.split(',')[0].trim()
  return req.headers.get('x-real-ip') ?? 'unknown'
}

function hashIp(ip: string): string {
  const salt = process.env.SESSION_SECRET ?? ''
  return createHash('sha256').update(`${salt}:brief:${ip}`).digest('hex')
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null)
  const parsed = BriefInputSchema.safeParse(body)
  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors
    const first = Object.values(fieldErrors).flat()[0]
    return NextResponse.json(
      { error: first ?? 'Please check the form and try again.', fields: fieldErrors },
      { status: 400 }
    )
  }
  const data = parsed.data

  if (data.website) return NextResponse.json({ ok: true })

  try {
    const col = await briefsCollection()
    const ipHash = hashIp(clientIp(req))

    const recent = await col.countDocuments({
      ipHash,
      createdAt: { $gt: new Date(Date.now() - RATE_WINDOW_MS) },
    })
    if (recent >= RATE_LIMIT) {
      return NextResponse.json(
        { error: 'Too many submissions. Please try again later, or email us directly.' },
        { status: 429 }
      )
    }

    const now = new Date()
    const doc: BriefDoc = {
      name: data.name,
      company: data.company,
      email: data.email,
      practiceArea: data.practiceArea,
      message: data.message,
      status: 'new',
      ipHash,
      userAgent: (req.headers.get('user-agent') ?? '').slice(0, 300),
      createdAt: now,
      updatedAt: now,
    }
    await col.insertOne(doc as never)
  } catch (err) {
    console.error('[briefs] failed to store brief', err)
    return NextResponse.json(
      { error: 'We could not send your brief right now. Please try again, or email us directly.' },
      { status: 500 }
    )
  }

  return NextResponse.json({ ok: true }, { status: 201 })
}
