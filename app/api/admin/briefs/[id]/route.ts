import { NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import { briefsCollection } from '@/lib/mongo'
import { BriefStatusUpdateSchema } from '@/lib/models/brief'

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
  const parsed = BriefStatusUpdateSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: parsed.error.flatten() },
      { status: 400 }
    )
  }

  const col = await briefsCollection()
  const res = await col.updateOne(
    { _id: new ObjectId(id) },
    { $set: { status: parsed.data.status, updatedAt: new Date() } }
  )
  if (res.matchedCount === 0) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
  return NextResponse.json({ ok: true })
}

export async function DELETE(_req: Request, ctx: Ctx) {
  const { id } = await ctx.params
  if (!isValidObjectId(id)) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 })
  }
  const col = await briefsCollection()
  const res = await col.deleteOne({ _id: new ObjectId(id) })
  if (res.deletedCount === 0) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
  return NextResponse.json({ ok: true })
}
