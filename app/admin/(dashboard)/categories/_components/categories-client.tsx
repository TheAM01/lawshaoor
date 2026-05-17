'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, Loader2, Pencil, Trash2, Check, X, ArrowRightLeft } from 'lucide-react'
import type { CategoryListItem } from '@/lib/models/category'
import {
  ILLUSTRATIONS,
  getIllustration,
  illustrationLabel,
} from '@/components/illustrations/registry'

type EditingState = {
  id: string
  name: string
  slug: string
  description: string
  order: number
  illustrationKey: string
  slugDirty: boolean
}

function liveSlug(raw: string): string {
  return raw
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
}

function toSlugFromName(name: string): string {
  return liveSlug(name.trim())
}

export function CategoriesClient({ initial }: { initial: CategoryListItem[] }) {
  const router = useRouter()
  const [items, setItems] = useState<CategoryListItem[]>(initial)
  const [editing, setEditing] = useState<EditingState | null>(null)
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [showNew, setShowNew] = useState(false)
  const [newName, setNewName] = useState('')
  const [newDescription, setNewDescription] = useState('')
  const [newIllustration, setNewIllustration] = useState('')
  const [error, setError] = useState('')
  const [reassigning, setReassigning] = useState<CategoryListItem | null>(null)

  async function refresh() {
    const res = await fetch('/api/admin/categories')
    if (res.ok) {
      const data = (await res.json()) as { categories: CategoryListItem[] }
      setItems(data.categories)
      router.refresh()
    }
  }

  async function onCreate() {
    if (!newName.trim()) {
      setError('Name is required')
      return
    }
    setSaving(true)
    setError('')
    try {
      const res = await fetch('/api/admin/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newName.trim(),
          description: newDescription.trim(),
          order: items.length,
          illustrationKey: newIllustration,
        }),
      })
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string }
        throw new Error(data?.error || `Failed (${res.status})`)
      }
      setNewName('')
      setNewDescription('')
      setNewIllustration('')
      setShowNew(false)
      await refresh()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Create failed')
    } finally {
      setSaving(false)
    }
  }

  async function onSaveEdit() {
    if (!editing) return
    setSaving(true)
    setError('')
    try {
      const res = await fetch(`/api/admin/categories/${editing.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: editing.name.trim(),
          slug: editing.slug.trim() || undefined,
          description: editing.description.trim(),
          order: editing.order,
          illustrationKey: editing.illustrationKey,
        }),
      })
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string }
        throw new Error(data?.error || `Failed (${res.status})`)
      }
      setEditing(null)
      await refresh()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  async function onDelete(item: CategoryListItem) {
    if (item.postCount && item.postCount > 0) {
      setReassigning(item)
      return
    }
    if (!confirm(`Delete category "${item.name}"?`)) return
    setDeletingId(item._id)
    setError('')
    try {
      const res = await fetch(`/api/admin/categories/${item._id}`, { method: 'DELETE' })
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

  return (
    <div className="space-y-4">
      {error && (
        <div className="border border-destructive/40 bg-destructive/5 p-3">
          <p className="text-sm text-destructive font-mono tracking-[0.05em]">{error}</p>
        </div>
      )}

      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-foreground/65 font-heading">
          {items.length} {items.length === 1 ? 'category' : 'categories'} ·{' '}
          {items.reduce((acc, c) => acc + (c.postCount ?? 0), 0)} posts assigned
        </p>
        {!showNew && (
          <button
            onClick={() => {
              setShowNew(true)
              setError('')
            }}
            className="btn-primary"
          >
            <span>New category</span>
            <Plus className="w-4 h-4" />
          </button>
        )}
      </div>

      {showNew && (
        <div className="border border-primary/40 bg-primary/5 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-mono tracking-[0.32em] uppercase text-foreground/70">
              New category
            </p>
            <button
              onClick={() => {
                setShowNew(false)
                setNewName('')
                setNewDescription('')
                setNewIllustration('')
              }}
              className="text-foreground/55 hover:text-foreground transition-colors"
              title="Cancel"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <Input
            placeholder="Name (e.g. Cross-Border)"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            autoFocus
          />
          <Input
            placeholder="Short description (optional)"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
          />
          <div>
            <p className="text-[10px] font-mono tracking-[0.28em] uppercase text-foreground/65 mb-2">
              Illustration
            </p>
            <IllustrationPicker value={newIllustration} onChange={setNewIllustration} />
          </div>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => {
                setShowNew(false)
                setNewName('')
                setNewDescription('')
                setNewIllustration('')
              }}
              className="btn-ghost"
            >
              <span>Cancel</span>
            </button>
            <button onClick={onCreate} disabled={saving} className="btn-primary disabled:opacity-50">
              <span>{saving ? 'Creating…' : 'Create'}</span>
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
            </button>
          </div>
        </div>
      )}

      <div className="border border-foreground/15">
        <div className="hidden md:grid grid-cols-12 gap-4 px-5 py-3 border-b border-foreground/15 bg-background-alt/40 text-foreground/55 eyebrow-sm">
          <div className="col-span-1 text-center">Icon</div>
          <div className="col-span-3">Name</div>
          <div className="col-span-2">Slug</div>
          <div className="col-span-3">Description</div>
          <div className="col-span-1 text-center">Posts</div>
          <div className="col-span-1 text-center">Order</div>
          <div className="col-span-1 text-right">Actions</div>
        </div>

        {items.length === 0 && (
          <div className="p-8 text-center text-foreground/60 font-heading">
            No categories yet. Click <span className="text-foreground">New category</span>.
          </div>
        )}

        {items.map((item) =>
          editing?.id === item._id ? (
            <EditRow
              key={item._id}
              state={editing}
              setState={setEditing}
              onSave={onSaveEdit}
              onCancel={() => setEditing(null)}
              saving={saving}
              postCount={item.postCount ?? 0}
            />
          ) : (
            <ReadRow
              key={item._id}
              item={item}
              isDeleting={deletingId === item._id}
              onEdit={() =>
                setEditing({
                  id: item._id,
                  name: item.name,
                  slug: item.slug,
                  description: item.description,
                  order: item.order,
                  illustrationKey: item.illustrationKey,
                  slugDirty: false,
                })
              }
              onDelete={() => onDelete(item)}
              onReassign={() => setReassigning(item)}
            />
          )
        )}
      </div>

      {reassigning && (
        <ReassignDialog
          source={reassigning}
          options={items.filter((c) => c._id !== reassigning._id)}
          onClose={() => setReassigning(null)}
          onDone={async () => {
            setReassigning(null)
            await refresh()
          }}
        />
      )}
    </div>
  )
}

/* ───────────────────── Read row ───────────────────── */

function ReadRow({
  item,
  isDeleting,
  onEdit,
  onDelete,
  onReassign,
}: {
  item: CategoryListItem
  isDeleting: boolean
  onEdit: () => void
  onDelete: () => void
  onReassign: () => void
}) {
  const Illo = getIllustration(item.illustrationKey)
  const hasPosts = (item.postCount ?? 0) > 0
  return (
    <div className="grid grid-cols-12 gap-4 px-5 py-4 border-b border-foreground/10 last:border-b-0 items-center hover:bg-background-alt/40 transition-colors">
      <div className="col-span-2 md:col-span-1 flex items-center justify-center">
        <span className="w-9 h-9 flex items-center justify-center border border-foreground/15 bg-background-alt/40">
          <Illo className="w-7 h-7" uid={`cat-${item._id}`} />
        </span>
      </div>
      <div className="col-span-10 md:col-span-3 font-heading text-foreground">
        {item.name}
        <p className="text-[10px] text-foreground/45 font-mono tracking-[0.18em] uppercase mt-0.5">
          {illustrationLabel(item.illustrationKey)}
        </p>
      </div>
      <div className="col-span-6 md:col-span-2 text-xs font-mono text-foreground/55 truncate">
        /{item.slug}
      </div>
      <div className="col-span-12 md:col-span-3 text-sm text-foreground/70 font-heading line-clamp-1">
        {item.description || <span className="text-foreground/35">—</span>}
      </div>
      <div className="col-span-3 md:col-span-1 text-center text-sm text-foreground/75 font-mono tabular-fig">
        {item.postCount ?? 0}
      </div>
      <div className="col-span-3 md:col-span-1 text-center text-sm text-foreground/55 font-mono tabular-fig">
        {item.order}
      </div>
      <div className="col-span-6 md:col-span-1 flex items-center justify-end gap-1">
        {hasPosts && (
          <button
            onClick={onReassign}
            className="p-2 text-foreground/60 hover:text-primary transition-colors"
            title="Reassign posts"
          >
            <ArrowRightLeft className="w-4 h-4" />
          </button>
        )}
        <button
          onClick={onEdit}
          className="p-2 text-foreground/60 hover:text-foreground transition-colors"
          title="Edit"
        >
          <Pencil className="w-4 h-4" />
        </button>
        <button
          onClick={onDelete}
          disabled={isDeleting}
          className="p-2 text-foreground/60 hover:text-destructive transition-colors disabled:opacity-30 disabled:pointer-events-none"
          title={hasPosts ? 'Has posts — opens reassign flow' : 'Delete'}
        >
          {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
        </button>
      </div>
    </div>
  )
}

/* ───────────────────── Edit row ───────────────────── */

function EditRow({
  state,
  setState,
  onSave,
  onCancel,
  saving,
  postCount,
}: {
  state: EditingState
  setState: (s: EditingState) => void
  onSave: () => void
  onCancel: () => void
  saving: boolean
  postCount: number
}) {
  return (
    <div className="border-b border-foreground/10 last:border-b-0 bg-primary/5 px-5 py-5 space-y-4">
      <div className="grid grid-cols-12 gap-4 items-start">
        <div className="col-span-12 md:col-span-1 space-y-1">
          <p className="text-[9px] font-mono tracking-[0.22em] uppercase text-foreground/55">Icon</p>
          <span className="w-12 h-12 flex items-center justify-center border border-foreground/15 bg-background">
            {(() => {
              const Illo = getIllustration(state.illustrationKey)
              return <Illo className="w-9 h-9" uid={`edit-${state.id}`} />
            })()}
          </span>
        </div>

        <div className="col-span-12 md:col-span-3 space-y-1">
          <p className="text-[9px] font-mono tracking-[0.22em] uppercase text-foreground/55">Name</p>
          <Input
            value={state.name}
            onChange={(e) =>
              setState({
                ...state,
                name: e.target.value,
                // Auto-update slug while user hasn't manually edited it.
                slug: state.slugDirty ? state.slug : toSlugFromName(e.target.value),
              })
            }
          />
        </div>

        <div className="col-span-12 md:col-span-2 space-y-1">
          <p className="text-[9px] font-mono tracking-[0.22em] uppercase text-foreground/55">Slug</p>
          <Input
            value={state.slug}
            onChange={(e) =>
              setState({ ...state, slug: liveSlug(e.target.value), slugDirty: true })
            }
            spellCheck={false}
          />
        </div>

        <div className="col-span-12 md:col-span-3 space-y-1">
          <p className="text-[9px] font-mono tracking-[0.22em] uppercase text-foreground/55">Description</p>
          <Input
            value={state.description}
            onChange={(e) => setState({ ...state, description: e.target.value })}
          />
        </div>

        <div className="col-span-3 md:col-span-1 space-y-1">
          <p className="text-[9px] font-mono tracking-[0.22em] uppercase text-foreground/55">Posts</p>
          <p className="px-3 py-2 text-sm text-foreground/75 font-mono">{postCount}</p>
        </div>

        <div className="col-span-3 md:col-span-1 space-y-1">
          <p className="text-[9px] font-mono tracking-[0.22em] uppercase text-foreground/55">Order</p>
          <input
            type="number"
            value={state.order}
            onChange={(e) => setState({ ...state, order: Number(e.target.value) || 0 })}
            className="w-full bg-background border border-foreground/15 px-2 py-2 text-sm font-mono text-center focus:outline-none focus:border-primary"
          />
        </div>

        <div className="col-span-6 md:col-span-1 flex items-end justify-end gap-1 h-full pb-1">
          <button
            onClick={onSave}
            disabled={saving}
            className="p-2 text-foreground/60 hover:text-primary transition-colors disabled:opacity-50"
            title="Save"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
          </button>
          <button
            onClick={onCancel}
            className="p-2 text-foreground/60 hover:text-foreground transition-colors"
            title="Cancel"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div>
        <p className="text-[10px] font-mono tracking-[0.28em] uppercase text-foreground/65 mb-2">
          Illustration
        </p>
        <IllustrationPicker
          value={state.illustrationKey}
          onChange={(key) => setState({ ...state, illustrationKey: key })}
        />
      </div>
    </div>
  )
}

/* ───────────────────── Illustration picker ───────────────────── */

function IllustrationPicker({
  value,
  onChange,
}: {
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-12 gap-1.5">
      <button
        type="button"
        onClick={() => onChange('')}
        className={`aspect-square border flex flex-col items-center justify-center gap-0.5 transition-colors ${
          value === '' ? 'border-primary bg-primary/10' : 'border-foreground/15 hover:border-foreground/35'
        }`}
        title="Default (fallback)"
      >
        <span className="font-mono text-[9px] tracking-[0.18em] text-foreground/65">DEF</span>
      </button>
      {ILLUSTRATIONS.map((entry) => {
        const isSelected = value === entry.key
        const Illo = entry.Component
        return (
          <button
            type="button"
            key={entry.key}
            onClick={() => onChange(entry.key)}
            className={`aspect-square border flex items-center justify-center transition-colors group ${
              isSelected ? 'border-primary bg-primary/10' : 'border-foreground/15 hover:border-foreground/35'
            }`}
            title={entry.label}
          >
            <Illo
              className={`w-3/4 h-3/4 transition-transform ${isSelected ? '' : 'group-hover:scale-105'}`}
              uid={`pick-${entry.key}`}
            />
          </button>
        )
      })}
    </div>
  )
}

/* ───────────────────── Reassign dialog ───────────────────── */

function ReassignDialog({
  source,
  options,
  onClose,
  onDone,
}: {
  source: CategoryListItem
  options: CategoryListItem[]
  onClose: () => void
  onDone: () => void
}) {
  const [target, setTarget] = useState<string>(options[0]?._id ?? '')
  const [deleteSource, setDeleteSource] = useState(true)
  const [working, setWorking] = useState(false)
  const [err, setErr] = useState('')

  // Lock background scroll while open.
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [])

  const sourceCount = useMemo(() => source.postCount ?? 0, [source])

  async function onConfirm() {
    if (!target) {
      setErr('Pick a target category')
      return
    }
    setWorking(true)
    setErr('')
    try {
      const res = await fetch(`/api/admin/categories/${source._id}/reassign`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ toId: target, deleteSource }),
      })
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string }
        throw new Error(data?.error || `Failed (${res.status})`)
      }
      onDone()
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'Reassign failed')
    } finally {
      setWorking(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/70 backdrop-blur-sm p-6"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-background border border-foreground/20 shadow-2xl p-6 space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <span className="index-chip">Reassign posts</span>
          <h3 className="font-display text-2xl tracking-[-0.02em] mt-3">
            Move {sourceCount} post{sourceCount === 1 ? '' : 's'} out of {source.name}
          </h3>
          <p className="text-sm text-foreground/70 font-heading mt-2 leading-relaxed">
            Pick a target. Every post currently tagged <span className="font-mono text-foreground/90">{source.name}</span> will be re-tagged to the target. Optionally delete the source category afterwards.
          </p>
        </div>

        {options.length === 0 ? (
          <div className="border border-destructive/40 bg-destructive/5 p-3 text-sm text-destructive font-mono">
            No other categories exist to reassign to. Create one first.
          </div>
        ) : (
          <div className="space-y-1.5">
            <p className="text-[10px] font-mono tracking-[0.28em] uppercase text-foreground/65">
              Target category
            </p>
            <select
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              className="w-full bg-background border border-foreground/15 px-3 py-2 text-sm font-heading text-foreground focus:outline-none focus:border-primary"
            >
              {options.map((o) => (
                <option key={o._id} value={o._id}>
                  {o.name} ({o.postCount ?? 0} posts)
                </option>
              ))}
            </select>
          </div>
        )}

        <label className="flex items-center gap-3 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={deleteSource}
            onChange={(e) => setDeleteSource(e.target.checked)}
            className="w-4 h-4 accent-primary"
          />
          <span className="text-sm font-heading text-foreground/90">
            Delete the &quot;{source.name}&quot; category after the move
          </span>
        </label>

        {err && (
          <div className="border border-destructive/40 bg-destructive/5 p-3">
            <p className="text-sm text-destructive font-mono break-words">{err}</p>
          </div>
        )}

        <div className="flex justify-end gap-2 pt-2 border-t border-foreground/10">
          <button onClick={onClose} className="btn-ghost">
            <span>Cancel</span>
          </button>
          <button
            onClick={onConfirm}
            disabled={working || options.length === 0}
            className="btn-primary disabled:opacity-50"
          >
            <span>{working ? 'Moving…' : 'Move posts'}</span>
            {working ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRightLeft className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  )
}

/* ───────────────────── tiny atom ───────────────────── */

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full bg-background border border-foreground/15 px-3 py-2 text-sm font-heading text-foreground placeholder:text-foreground/35 focus:outline-none focus:border-primary transition-colors ${props.className ?? ''}`}
    />
  )
}
