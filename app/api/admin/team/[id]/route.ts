import { NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import { teamCollection } from '@/lib/mongo'
import { TeamMemberInputSchema, normalizeTeamSlug } from '@/lib/models/team'
import { revalidatePeople } from '@/lib/server/revalidate'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

function isValidObjectId(id: string) {
  return /^[0-9a-fA-F]{24}$/.test(id)
}

type Ctx = { params: Promise<{ id: string }> }

export async function PATCH(req: Request, ctx: Ctx) {
  const { id } = await ctx.params
  if (!isValidObjectId(id)) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 })
  }

  const body = await req.json().catch(() => null)
  const parsed = TeamMemberInputSchema.partial().safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: parsed.error.flatten() },
      { status: 400 }
    )
  }
  const data = parsed.data

  const col = await teamCollection()
  const existing = await col.findOne({ _id: new ObjectId(id) })
  if (!existing) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
  const cur = existing as unknown as { name: string; slug: string }

  const now = new Date()
  const update: Record<string, unknown> = { updatedAt: now }
  for (const key of ['title', 'location', 'email', 'photo', 'focus', 'illustrationKey'] as const) {
    if (typeof data[key] === 'string') update[key] = data[key]
  }
  if (Array.isArray(data.bio)) update.bio = data.bio
  if (Array.isArray(data.highlights)) update.highlights = data.highlights
  if (typeof data.order === 'number') update.order = data.order

  const newName = typeof data.name === 'string' && data.name.trim() ? data.name.trim() : cur.name
  if (newName !== cur.name) update.name = newName

  // Slug: explicit edit, or re-derive on rename.
  if (typeof data.slug === 'string' && data.slug.trim()) {
    update.slug = normalizeTeamSlug(newName, data.slug)
  } else if (newName !== cur.name && !cur.slug) {
    update.slug = normalizeTeamSlug(newName)
  }

  try {
    await col.updateOne({ _id: new ObjectId(id) }, { $set: update })
  } catch (err) {
    const code = (err as { code?: number })?.code
    if (code === 11000) {
      return NextResponse.json({ error: 'Slug already in use' }, { status: 409 })
    }
    throw err
  }

  revalidatePeople()
  return NextResponse.json({ ok: true })
}

export async function DELETE(_req: Request, ctx: Ctx) {
  const { id } = await ctx.params
  if (!isValidObjectId(id)) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 })
  }
  const col = await teamCollection()
  const res = await col.deleteOne({ _id: new ObjectId(id) })
  if (res.deletedCount === 0) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
  revalidatePeople()
  return NextResponse.json({ ok: true })
}
