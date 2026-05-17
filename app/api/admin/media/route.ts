import { NextResponse } from 'next/server'
import { mediaCollection } from '@/lib/mongo'
import { toMediaListItem, type MediaDoc } from '@/lib/models/media'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const filter = url.searchParams.get('filter') ?? 'all'
  const limit = Math.min(Number(url.searchParams.get('limit')) || 100, 500)

  const col = await mediaCollection()
  const query: Record<string, unknown> = {}
  if (filter === 'images') query.mime = { $regex: '^image/' }
  if (filter === 'video') query.mime = { $regex: '^video/' }
  if (filter === 'audio') query.mime = { $regex: '^audio/' }
  if (filter === 'files') query.mime = { $not: { $regex: '^(image|video|audio)/' } }

  const docs = await col
    .find(query)
    .sort({ uploadedAt: -1 })
    .limit(limit)
    .toArray()

  return NextResponse.json({
    media: docs.map((d) => toMediaListItem(d as unknown as MediaDoc)),
  })
}
