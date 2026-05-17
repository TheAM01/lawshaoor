import 'server-only'
import { categoriesCollection } from '@/lib/mongo'
import type { CategoryDoc, CategoryListItem } from '@/lib/models/category'
import { toCategoryListItem } from '@/lib/models/category'

/** All categories, sorted by order then name. Empty list on DB failure. */
export async function getAllCategories(): Promise<CategoryListItem[]> {
  try {
    const col = await categoriesCollection()
    const docs = await col.find({}).sort({ order: 1, name: 1 }).toArray()
    return docs.map((d) => toCategoryListItem(d as unknown as CategoryDoc))
  } catch {
    return []
  }
}

/** Single category by slug. Returns null if not found. */
export async function getCategoryBySlug(
  slug: string
): Promise<CategoryListItem | null> {
  try {
    const col = await categoriesCollection()
    const doc = await col.findOne({ slug })
    if (!doc) return null
    return toCategoryListItem(doc as unknown as CategoryDoc)
  } catch {
    return null
  }
}

/** Map of category name → illustrationKey, built once per render. */
export function buildIllustrationKeyMap(
  categories: CategoryListItem[]
): Map<string, string> {
  const m = new Map<string, string>()
  for (const c of categories) m.set(c.name, c.illustrationKey)
  return m
}
