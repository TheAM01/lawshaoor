import { z } from 'zod'
import slugify from 'slugify'
import type { ObjectId } from 'mongodb'

export const POST_STATUS = ['draft', 'published'] as const
export const PostStatusSchema = z.enum(POST_STATUS)
export type PostStatus = z.infer<typeof PostStatusSchema>

export const PostSeoSchema = z.object({
  title: z.string().default(''),
  description: z.string().default(''),
  ogImage: z.string().default(''),
})
export type PostSeo = z.infer<typeof PostSeoSchema>

export const PostInputSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1),
  excerpt: z.string().default(''),
  category: z.string().default('Opinion'),
  thumbnailUrl: z.string().default(''),
  blocks: z.array(z.any()).default([]),
  status: PostStatusSchema.default('draft'),
  seo: PostSeoSchema.default({ title: '', description: '', ogImage: '' }),
})
export type PostInput = z.infer<typeof PostInputSchema>

export type PostDoc = PostInput & {
  _id?: ObjectId
  createdAt: Date
  updatedAt: Date
  publishedAt: Date | null
  readMinutes: number
}

export type PostListItem = {
  _id: string
  title: string
  slug: string
  category: string
  excerpt: string
  thumbnailUrl: string
  status: PostStatus
  publishedAt: string | null
  updatedAt: string
  createdAt: string
  readMinutes: number
}

export const CATEGORIES = [
  'M&A',
  'Governance',
  'Contracts',
  'Capital',
  'Sector Notes',
  'Opinion',
] as const

export function toSlug(input: string): string {
  return slugify(input, { lower: true, strict: true, trim: true })
}

/** Walk BlockNote JSON, count words, return minutes at ~220wpm (floor 1). */
export function estimateReadMinutes(blocks: unknown): number {
  let words = 0
  const walk = (node: unknown): void => {
    if (!node) return
    if (typeof node === 'string') {
      words += node.split(/\s+/).filter(Boolean).length
      return
    }
    if (Array.isArray(node)) {
      node.forEach(walk)
      return
    }
    if (typeof node === 'object') {
      const obj = node as Record<string, unknown>
      if (typeof obj.text === 'string') walk(obj.text)
      if (obj.content) walk(obj.content)
      if (obj.children) walk(obj.children)
    }
  }
  walk(blocks)
  return Math.max(1, Math.round(words / 220))
}

/** Convert a Mongo PostDoc into a JSON-serializable list item. */
export function toListItem(doc: PostDoc): PostListItem {
  return {
    _id: String(doc._id),
    title: doc.title,
    slug: doc.slug,
    category: doc.category,
    excerpt: doc.excerpt,
    thumbnailUrl: doc.thumbnailUrl,
    status: doc.status,
    publishedAt: doc.publishedAt ? doc.publishedAt.toISOString() : null,
    updatedAt: doc.updatedAt.toISOString(),
    createdAt: doc.createdAt.toISOString(),
    readMinutes: doc.readMinutes ?? 1,
  }
}

/** Default block tree for a fresh post: one heading + one paragraph.
 *  Uses BlockNote's string-content shorthand so the editor fills in
 *  inline-content defaults itself (avoids renderSpec edge cases). */
export function defaultBlocks() {
  return [
    { type: 'heading', props: { level: 1 }, content: 'Untitled' },
    { type: 'paragraph', content: 'Start writing…' },
  ]
}

/** Normalize blocks coming from storage so BlockNote can render them safely.
 *
 *  Strategy:
 *    – Text blocks (paragraph, heading, list items, quote): preserve type,
 *      flatten content to a plain string (lossy for inline formatting on
 *      load, conservative against renderSpec edge cases). User re-adds
 *      formatting in the editor and re-saves.
 *    – Media blocks (image, file, video, audio): preserve type + props
 *      (url, caption, name, showPreview, previewWidth) so previously
 *      uploaded media reappears on reopen. Content stays empty.
 *    – Unknown types: coerce to paragraph with extracted text. */
const TEXT_BLOCKS = new Set([
  'paragraph',
  'heading',
  'bulletListItem',
  'numberedListItem',
  'checkListItem',
  'quote',
])

const MEDIA_BLOCKS = new Set(['image', 'file', 'video', 'audio'])

function extractText(content: unknown): string {
  if (typeof content === 'string') return content
  if (!Array.isArray(content)) return ''
  return content
    .map((c) => {
      if (typeof c === 'string') return c
      if (!c || typeof c !== 'object') return ''
      const x = c as { type?: unknown; text?: unknown; content?: unknown }
      if (x.type === 'text') return String(x.text ?? '')
      if (x.type === 'link') return extractText(x.content)
      return ''
    })
    .join('')
}

function pickMediaProps(raw: Record<string, unknown>): Record<string, unknown> {
  const props = (raw.props as Record<string, unknown> | undefined) ?? {}
  const out: Record<string, unknown> = {}
  if (typeof props.url === 'string') out.url = props.url
  if (typeof props.caption === 'string') out.caption = props.caption
  if (typeof props.name === 'string') out.name = props.name
  if (typeof props.showPreview === 'boolean') out.showPreview = props.showPreview
  if (typeof props.previewWidth === 'number') out.previewWidth = props.previewWidth
  if (typeof props.textAlignment === 'string') out.textAlignment = props.textAlignment
  return out
}

export function sanitizeBlocks(blocks: unknown): unknown[] {
  if (!Array.isArray(blocks)) return []
  const out: unknown[] = []
  for (const raw of blocks) {
    if (!raw || typeof raw !== 'object') continue
    const b = raw as Record<string, unknown>
    const rawType = typeof b.type === 'string' ? b.type : ''

    if (MEDIA_BLOCKS.has(rawType)) {
      const mediaProps = pickMediaProps(b)
      // Skip media blocks that lost their URL (corrupt/incomplete record).
      if (typeof mediaProps.url !== 'string' || mediaProps.url.length === 0) {
        continue
      }
      out.push({ type: rawType, props: mediaProps })
      continue
    }

    if (TEXT_BLOCKS.has(rawType)) {
      const text = extractText(b.content)
      const block: Record<string, unknown> = { type: rawType, content: text }
      if (rawType === 'heading') {
        const lvl = (b.props as { level?: unknown } | undefined)?.level
        const level =
          typeof lvl === 'number' && lvl >= 1 && lvl <= 6 ? Math.floor(lvl) : 1
        block.props = { level }
      }
      if (rawType === 'checkListItem') {
        const checked = (b.props as { checked?: unknown } | undefined)?.checked
        if (typeof checked === 'boolean') {
          block.props = { checked }
        }
      }
      out.push(block)
      continue
    }

    // Unknown type → coerce to paragraph with extracted text.
    const text = extractText(b.content)
    out.push({ type: 'paragraph', content: text })
  }
  return out
}
