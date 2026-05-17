'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, Save, Plus, Trash2, RotateCcw, GripVertical } from 'lucide-react'
import {
  DEFAULT_MARQUEE_ITEMS,
  type SiteSettings,
} from '@/lib/models/settings'
import { Section, Field, Input, Select, Toggle } from '../../_components/form-atoms'

type PostOption = { _id: string; title: string; status: string }

type SiteFormShape = Pick<
  SiteSettings,
  | 'featuredPostId'
  | 'pinnedPostId'
  | 'latestLimit'
  | 'showNewsletter'
  | 'siteMarqueeItems'
  | 'linkedInUrl'
>

export function SiteSettingsForm({
  initial,
  posts,
}: {
  initial: SiteSettings
  posts: PostOption[]
}) {
  const router = useRouter()
  const [form, setForm] = useState<SiteFormShape>({
    featuredPostId: initial.featuredPostId,
    pinnedPostId: initial.pinnedPostId,
    latestLimit: initial.latestLimit,
    showNewsletter: initial.showNewsletter,
    siteMarqueeItems: initial.siteMarqueeItems,
    linkedInUrl: initial.linkedInUrl,
  })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  function patch(p: Partial<SiteFormShape>) {
    setForm((cur) => ({ ...cur, ...p }))
    setSaved(false)
  }

  async function onSave() {
    setSaving(true)
    setError('')
    setSaved(false)
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          // Trim and drop empty marquee items on save.
          siteMarqueeItems: form.siteMarqueeItems.map((s) => s.trim()).filter(Boolean),
        }),
      })
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string }
        throw new Error(data?.error || `Failed (${res.status})`)
      }
      setSaved(true)
      router.refresh()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-8 max-w-4xl">
      {error && (
        <div className="border border-destructive/40 bg-destructive/5 p-3">
          <p className="text-sm text-destructive font-mono tracking-[0.05em] break-words">{error}</p>
        </div>
      )}

      <Section title="Featured & display">
        <Field
          label="Featured post"
          help="Shown as the lead piece on /lawshaoor-academy. Leave empty to use the most recent published post."
        >
          <Select value={form.featuredPostId} onChange={(v) => patch({ featuredPostId: v })}>
            <option value="">— Most recent published —</option>
            {posts.map((p) => (
              <option key={p._id} value={p._id}>
                {p.title} {p.status === 'draft' ? ' (draft)' : ''}
              </option>
            ))}
          </Select>
        </Field>

        <Field
          label="Pinned post"
          help="Appears at the top of the Academy editorial rail regardless of date. Leave empty for none."
        >
          <Select value={form.pinnedPostId} onChange={(v) => patch({ pinnedPostId: v })}>
            <option value="">— None —</option>
            {posts.map((p) => (
              <option key={p._id} value={p._id}>
                {p.title} {p.status === 'draft' ? ' (draft)' : ''}
              </option>
            ))}
          </Select>
        </Field>

        <Field
          label="Latest rail size"
          help='How many posts the "Latest writing" rail shows. 0 = unlimited (everything in the rail, nothing in the archive).'
        >
          <Input
            type="number"
            min={0}
            max={50}
            value={form.latestLimit}
            onChange={(e) => patch({ latestLimit: Number(e.target.value) || 0 })}
            className="w-32"
          />
        </Field>

        <Field
          row
          label="Newsletter section"
          help='Toggle the "Get the next piece in your inbox" block at the bottom of /lawshaoor-academy.'
        >
          <Toggle
            value={form.showNewsletter}
            onChange={(v) => patch({ showNewsletter: v })}
            label={form.showNewsletter ? 'Visible' : 'Hidden'}
          />
        </Field>
      </Section>

      <Section title="Home-page marquee">
        <p className="text-[11px] text-foreground/55 font-heading leading-relaxed">
          The scrolling strip on the home page, just below the hero. Reorder by editing the list (top item appears first). Empty list falls back to a sensible default.
        </p>
        <MarqueeEditor
          items={form.siteMarqueeItems}
          onChange={(items) => patch({ siteMarqueeItems: items })}
        />
      </Section>

      <Section title="Public links">
        <Field
          label="LinkedIn URL"
          help="Used by the slim side banner on every public page. Empty = fall back to the hardcoded default."
        >
          <Input
            value={form.linkedInUrl}
            onChange={(e) => patch({ linkedInUrl: e.target.value })}
            placeholder="https://www.linkedin.com/company/lawshaoor-chambers"
          />
        </Field>
      </Section>

      <div className="flex items-center justify-end gap-3 pt-6 border-t border-foreground/15">
        {saved && (
          <span className="text-[10px] font-mono tracking-[0.22em] uppercase text-primary">
            ✓ Saved
          </span>
        )}
        <button
          onClick={onSave}
          disabled={saving}
          className="btn-primary disabled:opacity-50"
        >
          <span>{saving ? 'Saving…' : 'Save site settings'}</span>
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
        </button>
      </div>
    </div>
  )
}

/* ────────────────────────────────────────────────
   Marquee item editor — list of strings with
   add / remove / reorder by typing.
   ──────────────────────────────────────────────── */

function MarqueeEditor({
  items,
  onChange,
}: {
  items: string[]
  onChange: (items: string[]) => void
}) {
  function update(idx: number, value: string) {
    const next = [...items]
    next[idx] = value
    onChange(next)
  }

  function remove(idx: number) {
    onChange(items.filter((_, i) => i !== idx))
  }

  function add() {
    onChange([...items, ''])
  }

  function move(idx: number, dir: -1 | 1) {
    const j = idx + dir
    if (j < 0 || j >= items.length) return
    const next = [...items]
    ;[next[idx], next[j]] = [next[j], next[idx]]
    onChange(next)
  }

  function loadDefaults() {
    if (
      items.length > 0 &&
      !confirm('Replace your current marquee items with the defaults?')
    ) {
      return
    }
    onChange([...DEFAULT_MARQUEE_ITEMS])
  }

  return (
    <div className="space-y-2">
      {items.length === 0 && (
        <div className="border border-dashed border-foreground/20 p-4 text-center">
          <p className="text-sm text-foreground/60 font-heading">
            No marquee items configured. The home page is showing the default list.
          </p>
        </div>
      )}

      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className="flex flex-col">
            <button
              type="button"
              onClick={() => move(i, -1)}
              disabled={i === 0}
              className="text-foreground/40 hover:text-foreground disabled:opacity-20 disabled:pointer-events-none text-xs"
              title="Move up"
            >
              ▲
            </button>
            <button
              type="button"
              onClick={() => move(i, 1)}
              disabled={i === items.length - 1}
              className="text-foreground/40 hover:text-foreground disabled:opacity-20 disabled:pointer-events-none text-xs"
              title="Move down"
            >
              ▼
            </button>
          </div>
          <GripVertical className="w-4 h-4 text-foreground/30" />
          <span className="text-[10px] font-mono text-foreground/45 tabular-fig w-6 text-center">
            {String(i + 1).padStart(2, '0')}
          </span>
          <Input
            value={item}
            onChange={(e) => update(i, e.target.value)}
            placeholder="e.g. Cross-Border"
            maxLength={80}
          />
          <button
            type="button"
            onClick={() => remove(i)}
            className="p-2 text-foreground/55 hover:text-destructive transition-colors"
            title="Remove"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ))}

      <div className="flex items-center justify-between gap-3 pt-3 border-t border-foreground/10">
        <button
          type="button"
          onClick={loadDefaults}
          className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.18em] uppercase text-foreground/60 hover:text-primary transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Load defaults
        </button>
        <button
          type="button"
          onClick={add}
          className="btn-ghost"
        >
          <span>Add item</span>
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
