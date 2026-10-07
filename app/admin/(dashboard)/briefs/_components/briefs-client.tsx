'use client'

import { useMemo, useState } from 'react'
import { Archive, ArchiveRestore, Mail, Trash2, Loader2, Inbox } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { BriefListItem, BriefStatus } from '@/lib/models/brief'

type Filter = 'inbox' | 'new' | 'archived'

const FILTERS: { key: Filter; label: string }[] = [
  { key: 'inbox', label: 'Inbox' },
  { key: 'new', label: 'New' },
  { key: 'archived', label: 'Archived' },
]

function formatWhen(iso: string) {
  return new Date(iso).toLocaleString(undefined, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function BriefsClient({ initial }: { initial: BriefListItem[] }) {
  const [briefs, setBriefs] = useState(initial)
  const [filter, setFilter] = useState<Filter>('inbox')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [busy, setBusy] = useState<string | null>(null)
  const [err, setErr] = useState('')

  const visible = useMemo(
    () =>
      briefs.filter((b) =>
        filter === 'archived' ? b.status === 'archived' : filter === 'new' ? b.status === 'new' : b.status !== 'archived'
      ),
    [briefs, filter]
  )
  const selected = briefs.find((b) => b._id === selectedId) ?? null

  async function setStatus(id: string, status: BriefStatus) {
    setErr('')
    const prev = briefs
    setBriefs((bs) => bs.map((b) => (b._id === id ? { ...b, status } : b)))
    const res = await fetch(`/api/admin/briefs/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    }).catch(() => null)
    if (!res?.ok) {
      setBriefs(prev)
      setErr('Could not update the brief. Try again.')
    }
  }

  function open(b: BriefListItem) {
    setSelectedId(b._id)
    if (b.status === 'new') void setStatus(b._id, 'read')
  }

  async function remove(id: string) {
    if (!window.confirm('Delete this brief permanently? This cannot be undone.')) return
    setErr('')
    setBusy(id)
    const res = await fetch(`/api/admin/briefs/${id}`, { method: 'DELETE' }).catch(() => null)
    setBusy(null)
    if (!res?.ok) {
      setErr('Could not delete the brief. Try again.')
      return
    }
    setBriefs((bs) => bs.filter((b) => b._id !== id))
    if (selectedId === id) setSelectedId(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 flex-wrap">
        {FILTERS.map((f) => {
          const count = briefs.filter((b) =>
            f.key === 'archived' ? b.status === 'archived' : f.key === 'new' ? b.status === 'new' : b.status !== 'archived'
          ).length
          return (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={cn(
                'px-3 py-1.5 text-xs font-mono tracking-[0.18em] uppercase border transition-colors',
                filter === f.key
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'border-foreground/15 text-foreground/70 hover:bg-foreground/5'
              )}
            >
              {f.label} <span className="opacity-60 ml-1">{count}</span>
            </button>
          )
        })}
        {err && <span className="text-xs text-destructive font-mono ml-auto">{err}</span>}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6 items-start">
        {/* LIST */}
        <div className="xl:col-span-2 border border-foreground/15 divide-y divide-foreground/10">
          {visible.length === 0 ? (
            <div className="p-10 text-center text-sm text-foreground/55 font-heading flex flex-col items-center gap-3">
              <Inbox className="w-6 h-6 opacity-50" />
              {filter === 'archived' ? 'No archived briefs.' : filter === 'new' ? 'No new briefs.' : 'No briefs yet.'}
            </div>
          ) : (
            visible.map((b) => (
              <button
                key={b._id}
                onClick={() => open(b)}
                className={cn(
                  'w-full text-left p-4 md:p-5 transition-colors flex flex-col gap-1',
                  selectedId === b._id ? 'bg-primary/10' : 'hover:bg-foreground/5'
                )}
              >
                <div className="flex items-center gap-2">
                  {b.status === 'new' && <span aria-label="New" className="w-2 h-2 rounded-full bg-primary shrink-0" />}
                  <span className={cn('font-heading truncate', b.status === 'new' ? 'font-semibold' : 'text-foreground/85')}>
                    {b.name}
                  </span>
                  <span className="ml-auto text-[11px] font-mono text-foreground/45 shrink-0">
                    {new Date(b.createdAt).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })}
                  </span>
                </div>
                <span className="text-xs text-foreground/55 font-mono tracking-[0.05em] truncate">{b.practiceArea}</span>
                <span className="text-sm text-foreground/65 line-clamp-2">{b.message}</span>
              </button>
            ))
          )}
        </div>

        {/* DETAIL */}
        <div className="xl:col-span-3 xl:sticky xl:top-6">
          {selected ? (
            <article className="border border-foreground/15 bg-background p-6 md:p-8 space-y-6">
              <header className="space-y-1">
                <h2 className="font-display text-2xl tracking-[-0.02em]">{selected.name}</h2>
                {selected.company && <p className="text-sm text-foreground/70 font-heading">{selected.company}</p>}
                <p className="text-xs font-mono text-foreground/50">{formatWhen(selected.createdAt)}</p>
              </header>

              <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-sm">
                <dt className="eyebrow-sm text-foreground/55 pt-0.5">Email</dt>
                <dd>
                  <a href={`mailto:${selected.email}`} className="link-line text-primary break-all">{selected.email}</a>
                </dd>
                <dt className="eyebrow-sm text-foreground/55 pt-0.5">Practice</dt>
                <dd className="text-foreground/85">{selected.practiceArea}</dd>
              </dl>

              <div className="border-t border-foreground/12 pt-5">
                <p className="eyebrow-sm text-foreground/55 mb-3">The matter</p>
                <p className="text-sm md:text-base leading-relaxed text-foreground/85 whitespace-pre-wrap break-words">
                  {selected.message}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 border-t border-foreground/12 pt-5">
                <a
                  href={`mailto:${selected.email}?subject=${encodeURIComponent('Re: your brief to LawShaoor Chambers')}`}
                  className="btn-primary !h-9 !py-0 !px-4 !text-[0.78rem]"
                >
                  <span>Reply by email</span>
                  <Mail className="w-4 h-4" />
                </a>
                {selected.status === 'archived' ? (
                  <button onClick={() => setStatus(selected._id, 'read')} className="btn-ghost !h-9 !py-0 !px-4 !text-[0.78rem]">
                    <span>Move to inbox</span>
                    <ArchiveRestore className="w-4 h-4" />
                  </button>
                ) : (
                  <button onClick={() => setStatus(selected._id, 'archived')} className="btn-ghost !h-9 !py-0 !px-4 !text-[0.78rem]">
                    <span>Archive</span>
                    <Archive className="w-4 h-4" />
                  </button>
                )}
                {selected.status !== 'new' && (
                  <button
                    onClick={() => setStatus(selected._id, 'new')}
                    className="px-4 h-9 text-[0.78rem] text-foreground/65 hover:text-foreground transition-colors font-heading"
                  >
                    Mark unread
                  </button>
                )}
                <button
                  onClick={() => remove(selected._id)}
                  disabled={busy === selected._id}
                  className="ml-auto px-3 h-9 inline-flex items-center gap-2 text-[0.78rem] text-destructive/80 hover:text-destructive transition-colors font-heading disabled:opacity-50"
                >
                  {busy === selected._id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                  Delete
                </button>
              </div>
            </article>
          ) : (
            <div className="border border-dashed border-foreground/20 p-12 text-center text-sm text-foreground/55 font-heading">
              Select a brief to read it.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
