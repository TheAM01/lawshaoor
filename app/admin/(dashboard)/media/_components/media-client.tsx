'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Copy, Trash2, ExternalLink, Loader2, FileText, Music, Video, Image as ImageIcon, Upload } from 'lucide-react'
import {
  formatBytes,
  isAudioMime,
  isImageMime,
  isVideoMime,
  type MediaListItem,
} from '@/lib/models/media'

type Filter = 'all' | 'images' | 'video' | 'audio' | 'files'

export function MediaClient({ initial }: { initial: MediaListItem[] }) {
  const router = useRouter()
  const [items, setItems] = useState<MediaListItem[]>(initial)
  const [filter, setFilter] = useState<Filter>('all')
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState<string | null>(null)

  const filtered = useMemo(() => {
    if (filter === 'all') return items
    return items.filter((m) => {
      if (filter === 'images') return isImageMime(m.mime)
      if (filter === 'video') return isVideoMime(m.mime)
      if (filter === 'audio') return isAudioMime(m.mime)
      return !isImageMime(m.mime) && !isVideoMime(m.mime) && !isAudioMime(m.mime)
    })
  }, [items, filter])

  async function refresh() {
    const res = await fetch('/api/admin/media')
    if (res.ok) {
      const data = (await res.json()) as { media: MediaListItem[] }
      setItems(data.media)
    }
  }

  async function onDelete(item: MediaListItem) {
    if (!confirm(`Delete "${item.name}"? ${item.source === 'imgbb' ? '(ImgBB does not allow remote deletion — the URL may stay live for some time.)' : ''}`)) return
    setDeletingId(item._id)
    setError('')
    try {
      const res = await fetch(`/api/admin/media/${item._id}`, { method: 'DELETE' })
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string }
        throw new Error(data?.error || `Failed (${res.status})`)
      }
      setItems((cur) => cur.filter((x) => x._id !== item._id))
      router.refresh()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Delete failed')
    } finally {
      setDeletingId(null)
    }
  }

  async function onUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? [])
    e.target.value = ''
    if (files.length === 0) return
    setUploading(true)
    setError('')
    try {
      for (const file of files) {
        const form = new FormData()
        form.append('file', file)
        const res = await fetch('/api/admin/upload', { method: 'POST', body: form })
        if (!res.ok) {
          const data = (await res.json().catch(() => ({}))) as { error?: string }
          throw new Error(data?.error || `Failed (${res.status})`)
        }
      }
      await refresh()
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  function copy(url: string, id: string) {
    const full = url.startsWith('http') ? url : `${window.location.origin}${url}`
    navigator.clipboard.writeText(full)
    setCopied(id)
    setTimeout(() => setCopied((c) => (c === id ? null : c)), 1500)
  }

  return (
    <div className="space-y-5">
      {error && (
        <div className="border border-destructive/40 bg-destructive/5 p-3">
          <p className="text-sm text-destructive font-mono tracking-[0.05em] break-words">{error}</p>
        </div>
      )}

      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-1">
          {(['all', 'images', 'video', 'audio', 'files'] as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`text-[10px] font-mono tracking-[0.22em] uppercase px-3 py-2 border transition-colors ${
                filter === f
                  ? 'border-primary bg-primary/10 text-foreground'
                  : 'border-foreground/15 text-foreground/55 hover:text-foreground hover:border-foreground/30'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <label className="btn-primary cursor-pointer">
          <span>{uploading ? 'Uploading…' : 'Upload media'}</span>
          {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
          <input type="file" multiple hidden onChange={onUpload} disabled={uploading} />
        </label>
      </div>

      {filtered.length === 0 ? (
        <div className="border border-dashed border-foreground/20 p-12 text-center">
          <p className="font-display text-2xl tracking-[-0.02em] text-foreground/85">
            {items.length === 0 ? 'No media yet.' : 'No media in this filter.'}
          </p>
          <p className="text-sm text-foreground/60 mt-3 font-heading">
            Click <span className="text-foreground">Upload media</span> or drop a file into the post editor.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-px bg-foreground/15 border border-foreground/15">
          {filtered.map((m) => (
            <MediaCard
              key={m._id}
              item={m}
              isDeleting={deletingId === m._id}
              copied={copied === m._id}
              onCopy={() => copy(m.url, m._id)}
              onDelete={() => onDelete(m)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function MediaCard({
  item,
  isDeleting,
  copied,
  onCopy,
  onDelete,
}: {
  item: MediaListItem
  isDeleting: boolean
  copied: boolean
  onCopy: () => void
  onDelete: () => void
}) {
  const isImage = isImageMime(item.mime)
  const isVideo = isVideoMime(item.mime)
  const isAudio = isAudioMime(item.mime)

  return (
    <div className="bg-background flex flex-col group">
      <div className="relative aspect-square bg-background-alt overflow-hidden">
        {isImage ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={item.url}
            alt={item.name}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : isVideo ? (
          <video
            src={item.url}
            className="absolute inset-0 w-full h-full object-cover"
            preload="metadata"
            muted
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-foreground/55">
            {isAudio ? (
              <Music className="w-10 h-10" />
            ) : (
              <FileText className="w-10 h-10" />
            )}
            <span className="text-[10px] font-mono tracking-[0.22em] uppercase">
              {item.mime.split('/')[1] || 'file'}
            </span>
          </div>
        )}

        <span className="absolute top-2 left-2 tag text-[9px] bg-background/85 backdrop-blur">
          {item.source === 'imgbb' ? 'ImgBB' : 'Blob'}
        </span>
        <span className="absolute top-2 right-2 tag text-[9px] bg-background/85 backdrop-blur flex items-center gap-1">
          {isImage ? <ImageIcon className="w-3 h-3" /> : isVideo ? <Video className="w-3 h-3" /> : isAudio ? <Music className="w-3 h-3" /> : <FileText className="w-3 h-3" />}
          {formatBytes(item.size)}
        </span>
      </div>

      <div className="p-3 space-y-2 border-t border-foreground/10">
        <p className="font-heading text-xs text-foreground/85 truncate" title={item.name}>
          {item.name}
        </p>
        <p className="text-[10px] font-mono text-foreground/45 tracking-[0.15em] truncate">
          {item.url}
        </p>
        <div className="flex items-center gap-1 pt-1">
          <button
            onClick={onCopy}
            className="flex-1 flex items-center justify-center gap-1.5 py-1.5 text-[10px] font-mono tracking-[0.18em] uppercase text-foreground/70 hover:text-primary border border-foreground/15 hover:border-primary transition-colors"
            title="Copy URL"
          >
            <Copy className="w-3 h-3" />
            {copied ? 'Copied' : 'Copy'}
          </button>
          <a
            href={item.url}
            target="_blank"
            rel="noopener"
            className="p-1.5 text-foreground/60 hover:text-primary border border-foreground/15 hover:border-primary transition-colors"
            title="Open"
          >
            <ExternalLink className="w-3 h-3" />
          </a>
          <button
            onClick={onDelete}
            disabled={isDeleting}
            className="p-1.5 text-foreground/60 hover:text-destructive border border-foreground/15 hover:border-destructive transition-colors disabled:opacity-50"
            title="Delete"
          >
            {isDeleting ? <Loader2 className="w-3 h-3 animate-spin" /> : <Trash2 className="w-3 h-3" />}
          </button>
        </div>
      </div>
    </div>
  )
}
