import { notFound } from 'next/navigation'
import { ObjectId } from 'mongodb'
import { postsCollection } from '@/lib/mongo'
import { defaultBlocks } from '@/lib/models/post'
import { EditorLoader } from './_components/editor-loader'

export const dynamic = 'force-dynamic'

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  if (!/^[0-9a-fA-F]{24}$/.test(id)) notFound()

  const col = await postsCollection()
  const doc = await col.findOne({ _id: new ObjectId(id) })
  if (!doc) notFound()

  const initial = {
    _id: id,
    title: (doc.title as string) ?? '',
    slug: (doc.slug as string) ?? '',
    excerpt: (doc.excerpt as string) ?? '',
    category: (doc.category as string) ?? 'Opinion',
    thumbnailUrl: (doc.thumbnailUrl as string) ?? '',
    blocks:
      Array.isArray(doc.blocks) && doc.blocks.length > 0
        ? (doc.blocks as unknown[])
        : defaultBlocks(),
    status: (doc.status as 'draft' | 'published') ?? 'draft',
    seo:
      (doc.seo as { title: string; description: string; ogImage: string }) ?? {
        title: '',
        description: '',
        ogImage: '',
      },
  }

  return <EditorLoader id={id} initial={initial} />
}
