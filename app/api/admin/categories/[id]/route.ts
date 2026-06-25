import { NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import { categoriesCollection, postsCollection } from '@/lib/mongo'
import {
  CategoryInputSchema,
  normalizeCategoryName,
  normalizeCategorySlug,
} from '@/lib/models/category'
import { revalidateAcademy } from '@/lib/server/revalidate'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

function isValidObjectId(id: string) {
  return /^[0-9a-fA-F]{24}$/.test(id)
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

type Ctx = { params: Promise<{ id: string }> }

export async function PATCH(req: Request, ctx: Ctx) {
  const { id } = await ctx.params
  if (!isValidObjectId(id)) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 })
  }

  const body = await req.json().catch(() => null)
  const parsed = CategoryInputSchema.partial().safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: parsed.error.flatten() },
      { status: 400 }
    )
  }
  const data = parsed.data

  const col = await categoriesCollection()
  const existingRaw = await col.findOne({ _id: new ObjectId(id) })
  if (!existingRaw) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
  const existing = existingRaw as unknown as { name: string }

  const now = new Date()
  const update: Record<string, unknown> = { updatedAt: now }
  if (typeof data.description === 'string') update.description = data.description
  if (typeof data.order === 'number') update.order = data.order
  if (typeof data.illustrationKey === 'string') update.illustrationKey = data.illustrationKey

  // Renaming logic.
  const oldName = existing.name
  let newName = oldName
  if (typeof data.name === 'string') {
    const trimmed = normalizeCategoryName(data.name)
    if (!trimmed) {
      return NextResponse.json({ error: 'Name cannot be empty after trimming' }, { status: 400 })
    }
    if (trimmed !== oldName) {
      // Case-insensitive uniqueness — but allow same id.
      const dupe = await col.findOne({
        _id: { $ne: new ObjectId(id) },
        name: { $regex: `^${escapeRegex(trimmed)}$`, $options: 'i' },
      })
      if (dupe) {
        return NextResponse.json({ error: 'A category with this name already exists' }, { status: 409 })
      }
      newName = trimmed
      update.name = newName
    }
  }

  // Slug — explicit edit OR re-derive on rename.
  if (typeof data.slug === 'string') {
    update.slug = normalizeCategorySlug(newName, data.slug)
  } else if (newName !== oldName) {
    update.slug = normalizeCategorySlug(newName)
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

  if (newName !== oldName) {
    const posts = await postsCollection()
    await posts.updateMany(
      { category: oldName },
      { $set: { category: newName, updatedAt: now } }
    )
  }

  revalidateAcademy()
  return NextResponse.json({ ok: true })
}

export async function DELETE(_req: Request, ctx: Ctx) {
  const { id } = await ctx.params
  if (!isValidObjectId(id)) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 })
  }

  const col = await categoriesCollection()
  const existingRaw = await col.findOne({ _id: new ObjectId(id) })
  if (!existingRaw) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
  const existing = existingRaw as unknown as { name: string }

  const posts = await postsCollection()
  const inUse = await posts.countDocuments({ category: existing.name })
  if (inUse > 0) {
    return NextResponse.json(
      { error: `Category is in use by ${inUse} post${inUse === 1 ? '' : 's'}. Reassign first.` },
      { status: 409 }
    )
  }

  await col.deleteOne({ _id: new ObjectId(id) })
  revalidateAcademy()
  return NextResponse.json({ ok: true })
}
