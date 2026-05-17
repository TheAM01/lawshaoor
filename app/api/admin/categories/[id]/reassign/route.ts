import { NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import { z } from 'zod'
import { categoriesCollection, postsCollection } from '@/lib/mongo'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const BodySchema = z.object({
  /** Either an _id of a target category, OR a literal name string. */
  toId: z.string().min(1).max(64).optional(),
  toName: z.string().min(1).max(60).optional(),
  /** When true, deletes the source category after the reassignment. */
  deleteSource: z.boolean().default(false),
}).refine((v) => v.toId || v.toName, {
  message: 'Either toId or toName is required',
})

function isValidObjectId(id: string) {
  return /^[0-9a-fA-F]{24}$/.test(id)
}

type Ctx = { params: Promise<{ id: string }> }

export async function POST(req: Request, ctx: Ctx) {
  const { id } = await ctx.params
  if (!isValidObjectId(id)) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 })
  }

  const body = await req.json().catch(() => null)
  const parsed = BodySchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: parsed.error.flatten() },
      { status: 400 }
    )
  }
  const { toId, toName, deleteSource } = parsed.data

  const col = await categoriesCollection()
  const sourceRaw = await col.findOne({ _id: new ObjectId(id) })
  if (!sourceRaw) {
    return NextResponse.json({ error: 'Source category not found' }, { status: 404 })
  }
  const source = sourceRaw as unknown as { name: string }

  // Resolve target name.
  let targetName: string
  if (toId) {
    if (!isValidObjectId(toId)) {
      return NextResponse.json({ error: 'Invalid toId' }, { status: 400 })
    }
    if (toId === id) {
      return NextResponse.json({ error: 'Source and target cannot be the same' }, { status: 400 })
    }
    const targetRaw = await col.findOne({ _id: new ObjectId(toId) })
    if (!targetRaw) {
      return NextResponse.json({ error: 'Target category not found' }, { status: 404 })
    }
    targetName = (targetRaw as unknown as { name: string }).name
  } else {
    targetName = String(toName).trim()
    if (!targetName) {
      return NextResponse.json({ error: 'toName cannot be empty' }, { status: 400 })
    }
    if (targetName === source.name) {
      return NextResponse.json({ error: 'Source and target cannot be the same' }, { status: 400 })
    }
  }

  const posts = await postsCollection()
  const now = new Date()
  const result = await posts.updateMany(
    { category: source.name },
    { $set: { category: targetName, updatedAt: now } }
  )

  let deleted = false
  if (deleteSource) {
    await col.deleteOne({ _id: new ObjectId(id) })
    deleted = true
  }

  return NextResponse.json({
    ok: true,
    movedPostCount: result.modifiedCount,
    from: source.name,
    to: targetName,
    deleted,
  })
}
