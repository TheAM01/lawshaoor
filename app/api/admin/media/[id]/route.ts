import { NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import { del } from '@vercel/blob'
import { mediaCollection } from '@/lib/mongo'
import type { MediaDoc } from '@/lib/models/media'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

function isValidObjectId(id: string) {
  return /^[0-9a-fA-F]{24}$/.test(id)
}

type Ctx = { params: Promise<{ id: string }> }

export async function DELETE(_req: Request, ctx: Ctx) {
  const { id } = await ctx.params
  if (!isValidObjectId(id)) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 })
  }

  const col = await mediaCollection()
  const existing = (await col.findOne({ _id: new ObjectId(id) })) as
    | (MediaDoc & { _id: ObjectId })
    | null
  if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  // Attempt origin-side delete for Vercel Blob. ImgBB doesn't expose a delete
  // API on the upload key, so the file stays at ImgBB; we just remove the
  // tracking row (the public URL effectively becomes orphaned).
  if (existing.source === 'vercel-blob' && existing.pathname) {
    const token = process.env.BLOB_READ_WRITE_TOKEN
    if (token) {
      try {
        await del(existing.pathname, { token })
      } catch {
        /* If the blob is already gone or unreachable, proceed with row delete. */
      }
    }
  }

  await col.deleteOne({ _id: new ObjectId(id) })
  return NextResponse.json({ ok: true, source: existing.source })
}
