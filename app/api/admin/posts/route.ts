import { NextResponse } from 'next/server'
import { postsCollection } from '@/lib/mongo'
import {
  defaultBlocks,
  toListItem,
  toSlug,
  type PostDoc,
} from '@/lib/models/post'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  const col = await postsCollection()
  const docs = await col.find({}).sort({ updatedAt: -1 }).toArray()
  return NextResponse.json({
    posts: docs.map((d) => toListItem(d as unknown as PostDoc)),
  })
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as { title?: string }
  const title = (body.title ?? '').trim() || 'Untitled'

  const now = new Date()
  const col = await postsCollection()

  const base = toSlug(title) || 'untitled'
  const slug = `${base}-${Date.now().toString(36)}`

  const doc: PostDoc = {
    title,
    slug,
    excerpt: '',
    category: 'Opinion',
    thumbnailUrl: '',
    blocks: defaultBlocks(),
    status: 'draft',
    seo: { title: '', description: '', ogImage: '' },
    createdAt: now,
    updatedAt: now,
    publishedAt: null,
    readMinutes: 1,
  }

  const result = await col.insertOne(doc as never)
  return NextResponse.json({ id: String(result.insertedId) })
}
