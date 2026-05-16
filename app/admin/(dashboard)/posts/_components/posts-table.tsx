'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Pencil, Trash2, ExternalLink } from 'lucide-react'
import type { PostListItem } from '@/lib/models/post'

export function PostsTable({ initial }: { initial: PostListItem[] }) {
  const router = useRouter()
  const [posts, setPosts] = useState(initial)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [error, setError] = useState('')

  async function onDelete(p: PostListItem) {
    if (!confirm(`Delete "${p.title}"? This cannot be undone.`)) return
    setDeletingId(p._id)
    setError('')
    try {
      const res = await fetch(`/api/admin/posts/${p._id}`, { method: 'DELETE' })
      if (!res.ok) {
        const data = await res.json().catch(() => ({} as { error?: string }))
        throw new Error(data?.error || `Failed (${res.status})`)
      }
      setPosts((cur) => cur.filter((x) => x._id !== p._id))
      router.refresh()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Delete failed')
    } finally {
      setDeletingId(null)
    }
  }

  if (posts.length === 0) {
    return (
      <div className="border border-dashed border-foreground/20 p-12 md:p-16 text-center">
        <p className="font-display text-2xl md:text-3xl tracking-[-0.02em] text-foreground/85">
          No posts yet.
        </p>
        <p className="text-sm text-foreground/60 mt-3 font-heading">
          Click <span className="text-foreground">New post</span> to start writing your first piece.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {error && (
        <p className="text-sm text-destructive font-mono tracking-[0.05em]">{error}</p>
      )}

      <div className="border border-foreground/15">
        <div className="hidden md:grid grid-cols-12 gap-4 px-5 py-3 border-b border-foreground/15 bg-background-alt/40 text-foreground/55 eyebrow-sm">
          <div className="col-span-5">Title</div>
          <div className="col-span-2">Category</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-2">Updated</div>
          <div className="col-span-1 text-right">Actions</div>
        </div>

        {posts.map((p) => (
          <div
            key={p._id}
            className="grid grid-cols-12 gap-4 px-5 py-4 border-b border-foreground/10 last:border-b-0 items-center hover:bg-background-alt/40 transition-colors"
          >
            <div className="col-span-12 md:col-span-5 min-w-0">
              <Link
                href={`/admin/posts/${p._id}/edit`}
                className="font-heading text-base md:text-lg text-foreground hover:text-primary transition-colors block truncate"
              >
                {p.title || 'Untitled'}
              </Link>
              <p className="text-xs text-foreground/55 font-mono truncate mt-0.5">
                /{p.slug}
              </p>
            </div>

            <div className="col-span-6 md:col-span-2 text-sm text-foreground/75 font-heading">
              {p.category}
            </div>

            <div className="col-span-6 md:col-span-2">
              <StatusPill status={p.status} />
            </div>

            <div className="col-span-6 md:col-span-2 text-xs text-foreground/60 font-mono tabular-fig">
              {formatDate(p.updatedAt)}
            </div>

            <div className="col-span-6 md:col-span-1 flex items-center justify-end gap-1">
              {p.status === 'published' && (
                <Link
                  href={`/lawshaoor-academy/${p.slug}`}
                  target="_blank"
                  rel="noopener"
                  title="View on site"
                  className="p-2 text-foreground/60 hover:text-primary transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                </Link>
              )}
              <Link
                href={`/admin/posts/${p._id}/edit`}
                title="Edit"
                className="p-2 text-foreground/60 hover:text-foreground transition-colors"
              >
                <Pencil className="w-4 h-4" />
              </Link>
              <button
                onClick={() => onDelete(p)}
                disabled={deletingId === p._id}
                title="Delete"
                className="p-2 text-foreground/60 hover:text-destructive transition-colors disabled:opacity-40 disabled:pointer-events-none"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function StatusPill({ status }: { status: PostListItem['status'] }) {
  if (status === 'published') {
    return (
      <span className="tag tag-primary text-[10px]">
        <span className="dot-live" /> Live
      </span>
    )
  }
  return <span className="tag text-[10px]">Draft</span>
}

function formatDate(iso: string) {
  try {
    const d = new Date(iso)
    return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
  } catch {
    return iso.slice(0, 10)
  }
}
