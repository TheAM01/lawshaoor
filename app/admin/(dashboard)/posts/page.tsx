import { postsCollection } from '@/lib/mongo'
import { toListItem, type PostDoc } from '@/lib/models/post'
import { PostsHeader } from './_components/posts-header'
import { PostsTable } from './_components/posts-table'

export const dynamic = 'force-dynamic'

export default async function PostsPage() {
  let posts: ReturnType<typeof toListItem>[] = []
  let dbError: string | null = null
  try {
    const col = await postsCollection()
    const docs = await col.find({}).sort({ updatedAt: -1 }).toArray()
    posts = docs.map((d) => toListItem(d as unknown as PostDoc))
  } catch (err) {
    dbError = err instanceof Error ? err.message : 'Failed to load posts'
  }

  return (
    <div className="flex-1 flex flex-col">
      <PostsHeader count={posts.length} />

      <div className="flex-1 section-pad py-8 md:py-10">
        {dbError ? (
          <div className="border border-destructive/40 bg-destructive/5 p-6">
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-destructive mb-2">
              Database error
            </p>
            <p className="text-sm text-foreground/80 font-heading break-words">{dbError}</p>
            <p className="text-xs text-foreground/60 mt-4">
              Check that <code className="font-mono">MONGODB_URI</code> in{' '}
              <code className="font-mono">.env.local</code> is correct and the cluster is reachable.
            </p>
          </div>
        ) : (
          <PostsTable initial={posts} />
        )}
      </div>
    </div>
  )
}
