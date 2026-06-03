import { NextResponse } from 'next/server'
import { teamCollection } from '@/lib/mongo'
import {
  TeamMemberInputSchema,
  normalizeTeamSlug,
  toTeamListItem,
  type TeamMemberDoc,
} from '@/lib/models/team'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  const col = await teamCollection()
  const docs = await col.find({}).sort({ order: 1, name: 1 }).toArray()
  return NextResponse.json({
    team: docs.map((d) => toTeamListItem(d as unknown as TeamMemberDoc)),
  })
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null)
  const parsed = TeamMemberInputSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: parsed.error.flatten() },
      { status: 400 }
    )
  }
  const data = parsed.data
  const name = data.name.trim()
  if (!name) {
    return NextResponse.json({ error: 'Name cannot be empty' }, { status: 400 })
  }

  const col = await teamCollection()
  const slug = normalizeTeamSlug(name, data.slug)

  // Determine next order if not provided meaningfully.
  const now = new Date()
  try {
    const result = await col.insertOne({
      ...data,
      name,
      slug,
      createdAt: now,
      updatedAt: now,
    } as never)
    return NextResponse.json({ id: String(result.insertedId), slug })
  } catch (err) {
    const code = (err as { code?: number })?.code
    if (code === 11000) {
      return NextResponse.json({ error: 'A member with this slug already exists' }, { status: 409 })
    }
    throw err
  }
}
