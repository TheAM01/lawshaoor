import { categoriesCollection, postsCollection } from '@/lib/mongo'
import { toCategoryListItem, type CategoryDoc } from '@/lib/models/category'
import { CategoriesClient } from './_components/categories-client'

export const dynamic = 'force-dynamic'

export default async function CategoriesPage() {
  let initial: ReturnType<typeof toCategoryListItem>[] = []
  let dbError: string | null = null

  try {
    const col = await categoriesCollection()
    const docs = await col.find({}).sort({ order: 1, name: 1 }).toArray()

    const counts = new Map<string, number>()
    try {
      const posts = await postsCollection()
      const agg = await posts
        .aggregate<{ _id: string; n: number }>([
          { $group: { _id: '$category', n: { $sum: 1 } } },
        ])
        .toArray()
      for (const row of agg) counts.set(String(row._id), row.n)
    } catch {
      /* ignore */
    }

    initial = docs.map((d) => {
      const doc = d as unknown as CategoryDoc
      return toCategoryListItem(doc, counts.get(doc.name) ?? 0)
    })
  } catch (err) {
    dbError = err instanceof Error ? err.message : 'Failed to load categories'
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="section-pad py-8 md:py-10 border-b border-foreground/15 bg-background-alt/50">
        <span className="index-chip">Categories</span>
        <h1 className="font-display text-3xl md:text-4xl tracking-[-0.02em] mt-3">
          Post categories
          <span className="text-foreground/40 ml-3 text-xl md:text-2xl font-mono tracking-[0.05em]">
            {initial.length}
          </span>
        </h1>
        <p className="text-sm text-foreground/65 font-heading mt-2 max-w-2xl">
          Used in the post editor and in Academy listings. Renaming a category re-buckets every post that uses it.
        </p>
      </div>

      <div className="flex-1 section-pad py-8 md:py-10">
        {dbError ? (
          <div className="border border-destructive/40 bg-destructive/5 p-6">
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-destructive mb-2">
              Database error
            </p>
            <p className="text-sm text-foreground/80 font-heading break-words">{dbError}</p>
          </div>
        ) : (
          <CategoriesClient initial={initial} />
        )}
      </div>
    </div>
  )
}
