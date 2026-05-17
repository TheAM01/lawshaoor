import { z } from 'zod'
import type { ObjectId } from 'mongodb'
import { toSlug } from './post'

export const CategoryInputSchema = z.object({
  name: z.string().min(1, 'Name is required').max(60),
  slug: z.string().min(1).max(80).optional(),
  description: z.string().max(280).default(''),
  order: z.number().int().min(0).max(9999).default(0),
  illustrationKey: z.string().max(64).default(''),
})
export type CategoryInput = z.infer<typeof CategoryInputSchema>

export type CategoryDoc = CategoryInput & {
  _id?: ObjectId
  slug: string
  createdAt: Date
  updatedAt: Date
}

export type CategoryListItem = {
  _id: string
  name: string
  slug: string
  description: string
  order: number
  illustrationKey: string
  postCount?: number
  createdAt: string
  updatedAt: string
}

export function toCategoryListItem(
  doc: CategoryDoc,
  postCount?: number
): CategoryListItem {
  return {
    _id: String(doc._id),
    name: doc.name,
    slug: doc.slug,
    description: doc.description ?? '',
    order: doc.order ?? 0,
    illustrationKey: doc.illustrationKey ?? '',
    postCount,
    createdAt: doc.createdAt.toISOString(),
    updatedAt: doc.updatedAt.toISOString(),
  }
}

/** Names seeded on first run, taken from the legacy hardcoded CATEGORIES list.
 *  Paired with sensible default illustrations so freshly-seeded categories
 *  have visual identity on /lawshaoor-academy without any admin work. */
export const SEED_CATEGORIES: { name: string; illustrationKey: string }[] = [
  { name: 'M&A',          illustrationKey: 'circles-in-circumference' },
  { name: 'Governance',   illustrationKey: 'hexagonal-cascade' },
  { name: 'Contracts',    illustrationKey: 'tesseract-cube' },
  { name: 'Capital',      illustrationKey: 'stacked-cubes' },
  { name: 'Sector Notes', illustrationKey: 'orbit-rings' },
  { name: 'Opinion',      illustrationKey: 'vector-node' },
]

export function normalizeCategorySlug(name: string, slug?: string): string {
  const candidate = (slug ?? '').trim() || name
  return toSlug(candidate) || 'category'
}

/** Trim + collapse internal whitespace for the canonical comparison form.
 *  Two names are considered the same if their normalized forms match. */
export function normalizeCategoryName(raw: string): string {
  return raw.trim().replace(/\s+/g, ' ')
}
