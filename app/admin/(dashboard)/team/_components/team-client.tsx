'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Loader2, Save, Plus, Trash2, Pencil, X, ChevronUp, ChevronDown, Upload, GripVertical,
} from 'lucide-react'
import { ILLUSTRATIONS, getIllustration } from '@/components/illustrations/registry'
import type { TeamListItem, Highlight } from '@/lib/models/team'
import { Section, Field, Input, Textarea, Select } from '../../settings/_components/form-atoms'

type Draft = {
  _id: string | null
  name: string
  slug: string
  title: string
  location: string
  email: string
  linkedin: string
  photo: string
  focus: string
  illustrationKey: string
  bio: string[]
  highlights: Highlight[]
  order: number
}

function emptyDraft(order: number): Draft {
  return {
    _id: null, name: '', slug: '', title: '', location: '', email: '', linkedin: '',
    photo: '', focus: '', illustrationKey: 'circles-in-circumference',
    bio: [''], highlights: [{ label: '', value: '' }], order,
  }
}

function toDraft(m: TeamListItem): Draft {
  return {
    _id: m._id, name: m.name, slug: m.slug, title: m.title, location: m.location,
    email: m.email, linkedin: m.linkedin, photo: m.photo, focus: m.focus,
    illustrationKey: m.illustrationKey || 'circles-in-circumference',
    bio: m.bio.length ? m.bio : [''],
    highlights: m.highlights.length ? m.highlights : [{ label: '', value: '' }],
    order: m.order,
  }
}

export function TeamClient({ initial }: { initial: TeamListItem[] }) {
  const router = useRouter()
  const [list, setList] = useState<TeamListItem[]>(initial)
  const [draft, setDraft] = useState<Draft | null>(null)
  const [busyId, setBusyId] = useState<string | null>(null)
  const [error, setError] = useState('')

  async function refresh() {
    try {
      const res = await fetch('/api/admin/team', { cache: 'no-store' })
      const data = (await res.json()) as { team?: TeamListItem[] }
      if (data.team) setList(data.team)
    } catch { /* ignore */ }
    router.refresh()
  }

  async function remove(m: TeamListItem) {
    if (!confirm(`Delete ${m.name}? This removes their profile page too.`)) return
    setBusyId(m._id)
    setError('')
    try {
      const res = await fetch(`/api/admin/team/${m._id}`, { method: 'DELETE' })
      if (!res.ok) {
        const d = (await res.json().catch(() => ({}))) as { error?: string }
        throw new Error(d.error || `Failed (${res.status})`)
      }
      await refresh()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Delete failed')
    } finally {
      setBusyId(null)
    }
  }

  async function move(m: TeamListItem, dir: -1 | 1) {
    const idx = list.findIndex((x) => x._id === m._id)
    const j = idx + dir
    if (j < 0 || j >= list.length) return
    const other = list[j]
    setBusyId(m._id)
    try {
      await Promise.all([
        fetch(`/api/admin/team/${m._id}`, {
          method: 'PATCH', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ order: other.order }),
        }),
        fetch(`/api/admin/team/${other._id}`, {
          method: 'PATCH', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ order: m.order }),
        }),
      ])
      await refresh()
    } finally {
      setBusyId(null)
    }
  }

  if (draft) {
    return (
      <TeamEditor
        draft={draft}
        onChange={setDraft}
        onClose={() => { setDraft(null); setError('') }}
        onSaved={async () => { setDraft(null); await refresh() }}
      />
    )
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {error && (
        <div className="border border-destructive/40 bg-destructive/5 p-3">
          <p className="text-sm text-destructive font-mono tracking-[0.05em] break-words">{error}</p>
        </div>
      )}

      <div className="flex items-center justify-between">
        <p className="text-sm text-foreground/65 font-heading">{list.length} member{list.length === 1 ? '' : 's'}</p>
        <button
          onClick={() => setDraft(emptyDraft((list.at(-1)?.order ?? -1) + 1))}
          className="btn-primary"
        >
          <span>Add member</span>
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <div className="border border-foreground/15 divide-y divide-foreground/12 bg-background">
        {list.length === 0 && (
          <div className="p-8 text-center text-sm text-foreground/60 font-heading">
            No team members yet. Add the first one.
          </div>
        )}
        {list.map((m, i) => {
          const Illo = getIllustration(m.illustrationKey)
          return (
            <div key={m._id} className="flex items-center gap-4 p-4">
              <div className="flex flex-col text-foreground/40">
                <button onClick={() => move(m, -1)} disabled={i === 0 || busyId === m._id}
                  className="hover:text-foreground disabled:opacity-20" title="Move up">
                  <ChevronUp className="w-4 h-4" />
                </button>
                <button onClick={() => move(m, 1)} disabled={i === list.length - 1 || busyId === m._id}
                  className="hover:text-foreground disabled:opacity-20" title="Move down">
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>

              <div className="w-12 h-14 bg-background-alt border border-foreground/12 shrink-0 overflow-hidden flex items-center justify-center">
                {m.photo
                  // eslint-disable-next-line @next/next/no-img-element
                  ? <img src={m.photo} alt="" className="w-full h-full object-cover" />
                  : <Illo className="w-[80%] h-[80%]" uid={`adm-${m._id}`} />}
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-display text-lg tracking-[-0.01em] truncate">{m.name}</p>
                <p className="text-xs font-mono tracking-[0.16em] uppercase text-foreground/55 truncate">{m.title || '—'}</p>
                <p className="text-xs text-foreground/45 font-heading truncate">/people/{m.slug}</p>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button onClick={() => setDraft(toDraft(m))}
                  className="p-2 text-foreground/55 hover:text-primary transition-colors" title="Edit">
                  <Pencil className="w-4 h-4" />
                </button>
                <button onClick={() => remove(m)} disabled={busyId === m._id}
                  className="p-2 text-foreground/55 hover:text-destructive transition-colors disabled:opacity-40" title="Delete">
                  {busyId === m._id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ──────────────────────────────────────────────── Editor ─── */

function TeamEditor({
  draft, onChange, onClose, onSaved,
}: {
  draft: Draft
  onChange: (d: Draft) => void
  onClose: () => void
  onSaved: () => void | Promise<void>
}) {
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  function patch(p: Partial<Draft>) { onChange({ ...draft, ...p }) }

  async function save() {
    if (!draft.name.trim()) { setError('Name is required'); return }
    setSaving(true); setError('')
    const payload = {
      name: draft.name.trim(),
      slug: draft.slug.trim() || undefined,
      title: draft.title, location: draft.location, email: draft.email, linkedin: draft.linkedin,
      photo: draft.photo, focus: draft.focus, illustrationKey: draft.illustrationKey,
      bio: draft.bio.map((b) => b.trim()).filter(Boolean),
      highlights: draft.highlights.filter((h) => h.label.trim() || h.value.trim()),
      order: draft.order,
    }
    try {
      const url = draft._id ? `/api/admin/team/${draft._id}` : '/api/admin/team'
      const res = await fetch(url, {
        method: draft._id ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        const d = (await res.json().catch(() => ({}))) as { error?: string }
        throw new Error(d.error || `Failed (${res.status})`)
      }
      await onSaved()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  async function onUpload(file: File) {
    setUploading(true); setError('')
    try {
      const fd = new FormData()
      fd.append('file', file)
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
      const d = (await res.json().catch(() => ({}))) as { url?: string; error?: string }
      if (!res.ok || !d.url) throw new Error(d.error || 'Upload failed')
      patch({ photo: d.url })
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl tracking-[-0.02em]">
          {draft._id ? `Edit ${draft.name || 'member'}` : 'New member'}
        </h2>
        <button onClick={onClose} className="btn-ghost"><span>Cancel</span><X className="w-4 h-4" /></button>
      </div>

      {error && (
        <div className="border border-destructive/40 bg-destructive/5 p-3">
          <p className="text-sm text-destructive font-mono tracking-[0.05em] break-words">{error}</p>
        </div>
      )}

      <Section title="Identity">
        <Field label="Name"><Input value={draft.name} onChange={(e) => patch({ name: e.target.value })} placeholder="Abdul Manan" /></Field>
        <Field label="Designation / title"><Input value={draft.title} onChange={(e) => patch({ title: e.target.value })} placeholder="Founder, LawShaoor Chambers" /></Field>
        <Field label="Focus" help="Short practice summary shown above the name on the profile."><Input value={draft.focus} onChange={(e) => patch({ focus: e.target.value })} placeholder="Corporate · Commercial · Energy" /></Field>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Location"><Input value={draft.location} onChange={(e) => patch({ location: e.target.value })} placeholder="Islamabad, Pakistan" /></Field>
          <Field label="Email"><Input value={draft.email} onChange={(e) => patch({ email: e.target.value })} placeholder="name@lawshaoor.com" /></Field>
        </div>
        <Field label="LinkedIn URL" help="Optional. Shows a LinkedIn button on the team card and profile.">
          <Input value={draft.linkedin} onChange={(e) => patch({ linkedin: e.target.value })} placeholder="https://www.linkedin.com/in/…" />
        </Field>
        <Field label="URL slug" help="Leave blank to auto-generate from the name. Changing this breaks existing links.">
          <Input value={draft.slug} onChange={(e) => patch({ slug: e.target.value })} placeholder="abdul-manan" />
        </Field>
      </Section>

      <Section title="Photo & illustration">
        <Field label="Headshot" help="Upload a photo, or paste a URL. If empty, the illustration below is used.">
          <div className="flex items-start gap-4">
            <div className="w-20 h-24 bg-background-alt border border-foreground/15 shrink-0 overflow-hidden flex items-center justify-center">
              {draft.photo
                // eslint-disable-next-line @next/next/no-img-element
                ? <img src={draft.photo} alt="" className="w-full h-full object-cover" />
                : (() => { const I = getIllustration(draft.illustrationKey); return <I className="w-[80%] h-[80%]" uid="prev" /> })()}
            </div>
            <div className="flex-1 space-y-2">
              <Input value={draft.photo} onChange={(e) => patch({ photo: e.target.value })} placeholder="https://… or upload" />
              <div className="flex items-center gap-2">
                <label className="btn-ghost cursor-pointer !py-2 !px-3 text-[10px]">
                  {uploading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
                  <span>{uploading ? 'Uploading…' : 'Upload'}</span>
                  <input type="file" accept="image/*" className="hidden"
                    onChange={(e) => { const f = e.target.files?.[0]; if (f) onUpload(f); e.target.value = '' }} />
                </label>
                {draft.photo && (
                  <button onClick={() => patch({ photo: '' })} className="text-[10px] font-mono tracking-[0.18em] uppercase text-foreground/55 hover:text-destructive">
                    Remove
                  </button>
                )}
              </div>
            </div>
          </div>
        </Field>

        <Field label="Fallback illustration">
          <Select value={draft.illustrationKey} onChange={(v) => patch({ illustrationKey: v })}>
            {ILLUSTRATIONS.map((il) => <option key={il.key} value={il.key}>{il.label}</option>)}
          </Select>
        </Field>
      </Section>

      <Section title="Biography">
        <ListEditor
          items={draft.bio}
          onChange={(bio) => patch({ bio })}
          render={(val, set) => <Textarea value={val} onChange={(e) => set(e.target.value)} rows={4} placeholder="A paragraph of biography…" />}
          empty={() => ''}
          addLabel="Add paragraph"
        />
      </Section>

      <Section title="Highlights" >
        <p className="text-[11px] text-foreground/55 font-heading">Label / value pairs shown in the sidebar of the profile page.</p>
        <ListEditor
          items={draft.highlights}
          onChange={(highlights) => patch({ highlights })}
          render={(val, set) => (
            <div className="grid grid-cols-1 sm:grid-cols-[1fr_2fr] gap-2 w-full">
              <Input value={val.label} onChange={(e) => set({ ...val, label: e.target.value })} placeholder="Experience" />
              <Input value={val.value} onChange={(e) => set({ ...val, value: e.target.value })} placeholder="13+ years" />
            </div>
          )}
          empty={() => ({ label: '', value: '' })}
          addLabel="Add highlight"
        />
      </Section>

      <div className="flex items-center justify-end gap-3 pt-6 border-t border-foreground/15">
        <button onClick={onClose} className="btn-ghost"><span>Cancel</span></button>
        <button onClick={save} disabled={saving} className="btn-primary disabled:opacity-50">
          <span>{saving ? 'Saving…' : 'Save member'}</span>
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
        </button>
      </div>
    </div>
  )
}

/* Generic add / remove / reorder list editor. */
function ListEditor<T>({
  items, onChange, render, empty, addLabel,
}: {
  items: T[]
  onChange: (items: T[]) => void
  render: (value: T, set: (v: T) => void) => React.ReactNode
  empty: () => T
  addLabel: string
}) {
  function set(idx: number, v: T) { const n = [...items]; n[idx] = v; onChange(n) }
  function remove(idx: number) { onChange(items.filter((_, i) => i !== idx)) }
  function move(idx: number, dir: -1 | 1) {
    const j = idx + dir
    if (j < 0 || j >= items.length) return
    const n = [...items]; ;[n[idx], n[j]] = [n[j], n[idx]]; onChange(n)
  }
  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="flex items-start gap-2">
          <div className="flex flex-col pt-2 text-foreground/35">
            <button type="button" onClick={() => move(i, -1)} disabled={i === 0} className="hover:text-foreground disabled:opacity-20"><ChevronUp className="w-3.5 h-3.5" /></button>
            <button type="button" onClick={() => move(i, 1)} disabled={i === items.length - 1} className="hover:text-foreground disabled:opacity-20"><ChevronDown className="w-3.5 h-3.5" /></button>
          </div>
          <GripVertical className="w-4 h-4 text-foreground/25 mt-2.5 shrink-0" />
          <div className="flex-1 min-w-0">{render(item, (v) => set(i, v))}</div>
          <button type="button" onClick={() => remove(i)} className="p-2 text-foreground/50 hover:text-destructive transition-colors" title="Remove"><Trash2 className="w-4 h-4" /></button>
        </div>
      ))}
      <button type="button" onClick={() => onChange([...items, empty()])} className="btn-ghost">
        <span>{addLabel}</span><Plus className="w-4 h-4" />
      </button>
    </div>
  )
}
