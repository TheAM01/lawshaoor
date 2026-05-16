'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, Loader2 } from 'lucide-react'

export function PostsHeader({ count }: { count: number }) {
  const router = useRouter()
  const [creating, setCreating] = useState(false)
  const [err, setErr] = useState('')

  async function onNew() {
    setCreating(true)
    setErr('')
    try {
      const res = await fetch('/api/admin/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({} as { error?: string }))
        throw new Error(data?.error || `Failed (${res.status})`)
      }
      const { id } = (await res.json()) as { id: string }
      router.push(`/admin/posts/${id}/edit`)
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'Failed to create post')
      setCreating(false)
    }
  }

  return (
    <div className="section-pad py-8 md:py-10 border-b border-foreground/15 bg-background-alt/50">
      <div className="flex items-end justify-between gap-6 flex-wrap">
        <div>
          <span className="index-chip">Posts</span>
          <h1 className="font-display text-3xl md:text-4xl tracking-[-0.02em] mt-3">
            All posts
            <span className="text-foreground/40 ml-3 text-xl md:text-2xl font-mono tracking-[0.05em]">
              {count}
            </span>
          </h1>
        </div>

        <div className="flex flex-col items-end gap-1">
          <button
            onClick={onNew}
            disabled={creating}
            className="btn-primary disabled:opacity-50 disabled:pointer-events-none"
          >
            <span>{creating ? 'Creating…' : 'New post'}</span>
            {creating ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Plus className="w-4 h-4" />
            )}
          </button>
          {err && <span className="text-xs text-destructive font-mono">{err}</span>}
        </div>
      </div>
    </div>
  )
}
