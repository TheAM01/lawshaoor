import { NextResponse } from 'next/server'
import { categoriesCollection, postsCollection } from '@/lib/mongo'
import {
  CategoryInputSchema,
  normalizeCategoryName,
  normalizeCategorySlug,
  toCategoryListItem,
  type CategoryDoc,
} from '@/lib/models/category'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  const col = await categoriesCollection()
  const docs = await col.find({}).sort({ order: 1, name: 1 }).toArray()

  const posts = await postsCollection()
  const counts = new Map<string, number>()
  try {
    const agg = await posts
      .aggregate<{ _id: string; n: number }>([
        { $group: { _id: '$category', n: { $sum: 1 } } },
      ])
      .toArray()
    for (const row of agg) counts.set(String(row._id), row.n)
  } catch {
    /* best-effort */
  }

  return NextResponse.json({
    categories: docs.map((d) => {
      const doc = d as unknown as CategoryDoc
      return toCategoryListItem(doc, counts.get(doc.name) ?? 0)
    }),
  })
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null)
  const parsed = CategoryInputSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: parsed.error.flatten() },
      { status: 400 }
    )
  }
  const data = parsed.data
  const name = normalizeCategoryName(data.name)
  if (!name) {
    return NextResponse.json({ error: 'Name cannot be empty after trimming' }, { status: 400 })
  }

  const col = await categoriesCollection()
  // Case-insensitive uniqueness check on trimmed name.
  const dupe = await col.findOne({
    name: { $regex: `^${escapeRegex(name)}$`, $options: 'i' },
  })
  if (dupe) {
    return NextResponse.json({ error: 'A category with this name already exists' }, { status: 409 })
  }

  const slug = normalizeCategorySlug(name, data.slug)
  const now = new Date()

  try {
    const result = await col.insertOne({
      name,
      slug,
      description: data.description ?? '',
      order: data.order ?? 0,
      illustrationKey: data.illustrationKey ?? '',
      createdAt: now,
      updatedAt: now,
    } as never)
    return NextResponse.json({ id: String(result.insertedId), slug })
  } catch (err) {
    const code = (err as { code?: number })?.code
    if (code === 11000) {
      return NextResponse.json({ error: 'Slug already in use' }, { status: 409 })
    }
    throw err
  }
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}
