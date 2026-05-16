import { NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import { postsCollection } from '@/lib/mongo'
import {
  estimateReadMinutes,
  PostInputSchema,
  toSlug,
} from '@/lib/models/post'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

function isValidObjectId(id: string) {
  return /^[0-9a-fA-F]{24}$/.test(id)
}

type Ctx = { params: Promise<{ id: string }> }

export async function GET(_req: Request, ctx: Ctx) {
  const { id } = await ctx.params
  if (!isValidObjectId(id)) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 })
  }
  const col = await postsCollection()
  const doc = await col.findOne({ _id: new ObjectId(id) })
  if (!doc) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json({
    post: {
      ...doc,
      _id: String(doc._id),
      createdAt: (doc.createdAt as Date)?.toISOString?.() ?? null,
      updatedAt: (doc.updatedAt as Date)?.toISOString?.() ?? null,
      publishedAt: doc.publishedAt ? (doc.publishedAt as Date).toISOString() : null,
    },
  })
}

export async function PATCH(req: Request, ctx: Ctx) {
  const { id } = await ctx.params
  if (!isValidObjectId(id)) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 })
  }

  const body = await req.json().catch(() => null)
  if (!body || typeof body !== 'object') {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const parsed = PostInputSchema.partial().safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: parsed.error.flatten() },
      { status: 400 }
    )
  }

  const now = new Date()
  const update: Record<string, unknown> = { ...parsed.data, updatedAt: now }

  if (typeof update.slug === 'string' && update.slug.trim()) {
    update.slug = toSlug(update.slug)
  }
  if (Array.isArray(update.blocks)) {
    update.readMinutes = estimateReadMinutes(update.blocks)
  }

  const col = await postsCollection()

  if (update.status === 'published') {
    const existing = await col.findOne(
      { _id: new ObjectId(id) },
      { projection: { publishedAt: 1 } }
    )
    if (!existing?.publishedAt) update.publishedAt = now
  }

  try {
    const result = await col.updateOne(
      { _id: new ObjectId(id) },
      { $set: update }
    )
    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }
  } catch (err) {
    const code = (err as { code?: number })?.code
    if (code === 11000) {
      return NextResponse.json({ error: 'Slug is already in use' }, { status: 409 })
    }
    throw err
  }

  return NextResponse.json({ ok: true })
}

export async function DELETE(_req: Request, ctx: Ctx) {
  const { id } = await ctx.params
  if (!isValidObjectId(id)) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 })
  }
  const col = await postsCollection()
  const result = await col.deleteOne({ _id: new ObjectId(id) })
  if (result.deletedCount === 0) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
  return NextResponse.json({ ok: true })
}
