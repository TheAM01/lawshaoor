'use client'

import Link from 'next/link'
import { ArrowLeft, Save, Loader2, Globe, Eye } from 'lucide-react'
import type { PostMeta } from './editor-shell'

type Props = {
  meta: PostMeta
  saving: boolean
  savedAt: Date | null
  error: string
  onSaveDraft: () => void
  onPublish: () => void
  onUnpublish: () => void
}

export function TopBar({
  meta,
  saving,
  savedAt,
  error,
  onSaveDraft,
  onPublish,
  onUnpublish,
}: Props) {
  const isPublished = meta.status === 'published'

  return (
    <header className="border-b border-foreground/15 bg-background-alt/60">
      <div className="px-5 md:px-8 py-3 flex items-center gap-4 flex-wrap">
        <Link
          href="/admin/posts"
          className="flex items-center gap-2 text-xs font-mono tracking-[0.22em] uppercase text-foreground/65 hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>All posts</span>
        </Link>

        <span className="block w-px h-5 bg-foreground/15" />

        <div className="flex items-center gap-2 min-w-0 flex-1">
          {isPublished ? (
            <span className="tag tag-primary text-[10px]">
              <span className="dot-live" /> Live
            </span>
          ) : (
            <span className="tag text-[10px]">Draft</span>
          )}
          <span className="text-sm font-heading text-foreground/85 truncate">
            {meta.title || 'Untitled'}
          </span>
        </div>

        <div className="flex items-center gap-3 ml-auto">
          {error ? (
            <span className="text-xs text-destructive font-mono tracking-[0.05em] max-w-xs truncate">
              {error}
            </span>
          ) : savedAt ? (
            <span className="text-[10px] text-foreground/55 font-mono tracking-[0.22em] uppercase">
              Saved {formatTime(savedAt)}
            </span>
          ) : null}

          {isPublished && meta.slug && (
            <Link
              href={`/lawshaoor-academy/${meta.slug}`}
              target="_blank"
              rel="noopener"
              className="flex items-center gap-2 text-xs font-mono tracking-[0.22em] uppercase text-foreground/65 hover:text-primary transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>View</span>
            </Link>
          )}

          <button
            onClick={onSaveDraft}
            disabled={saving}
            className="btn-ghost py-2 px-4 text-[10px] disabled:opacity-50 disabled:pointer-events-none"
          >
            {saving ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Save className="w-3.5 h-3.5" />
            )}
            <span>Save draft</span>
          </button>

          {isPublished ? (
            <button
              onClick={onUnpublish}
              disabled={saving}
              className="btn-ghost py-2 px-4 text-[10px] disabled:opacity-50 disabled:pointer-events-none"
            >
              <span>Unpublish</span>
            </button>
          ) : (
            <button
              onClick={onPublish}
              disabled={saving}
              className="btn-primary py-2 px-4 text-[10px] disabled:opacity-50 disabled:pointer-events-none"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Publish</span>
            </button>
          )}
        </div>
      </div>
    </header>
  )
}

function formatTime(d: Date) {
  return d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })
}
