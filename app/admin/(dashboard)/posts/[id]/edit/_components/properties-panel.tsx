'use client'

import { useState } from 'react'
import { AlignLeft, AlignCenter, AlignRight, AlignJustify, Upload, Loader2, X } from 'lucide-react'
import type { Block } from '@blocknote/core'
import { CATEGORIES, toSlug } from '@/lib/models/post'
import type { PostMeta } from './editor-shell'

type Props = {
  focusedBlock: Block | null
  onUpdateBlockProps: (props: Record<string, unknown>) => void
  meta: PostMeta
  onUpdateMeta: (patch: Partial<PostMeta>) => void
}

type Tab = 'block' | 'post'

const COLORS: { value: string; name: string; swatch: string }[] = [
  { value: 'default', name: 'Default', swatch: 'transparent' },
  { value: 'gray',    name: 'Gray',    swatch: '#9b9a97' },
  { value: 'brown',   name: 'Brown',   swatch: '#64473a' },
  { value: 'red',     name: 'Red',     swatch: '#e03e3e' },
  { value: 'orange',  name: 'Orange',  swatch: '#d9730d' },
  { value: 'yellow',  name: 'Yellow',  swatch: '#dfab01' },
  { value: 'green',   name: 'Green',   swatch: '#0f7b6c' },
  { value: 'blue',    name: 'Blue',    swatch: '#0b6e99' },
  { value: 'purple',  name: 'Purple',  swatch: '#6940a5' },
  { value: 'pink',    name: 'Pink',    swatch: '#ad1a72' },
]

export function PropertiesPanel({
  focusedBlock,
  onUpdateBlockProps,
  meta,
  onUpdateMeta,
}: Props) {
  const [tab, setTab] = useState<Tab>('block')

  return (
    <aside className="w-80 lg:w-96 shrink-0 border-l border-foreground/15 bg-background-alt/40 flex flex-col min-h-0">
      <div className="border-b border-foreground/15 flex">
        <TabButton active={tab === 'block'} onClick={() => setTab('block')}>
          Block
        </TabButton>
        <TabButton active={tab === 'post'} onClick={() => setTab('post')}>
          Post
        </TabButton>
      </div>

      <div className="flex-1 overflow-y-auto">
        {tab === 'block' ? (
          <BlockPanel block={focusedBlock} onUpdate={onUpdateBlockProps} />
        ) : (
          <PostPanel meta={meta} onUpdate={onUpdateMeta} />
        )}
      </div>
    </aside>
  )
}

/* ─────────────────────────────────────────────────────────── */

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 px-4 py-3 text-[10px] font-mono tracking-[0.28em] uppercase transition-colors border-b-2 ${
        active
          ? 'border-primary text-foreground'
          : 'border-transparent text-foreground/55 hover:text-foreground'
      }`}
    >
      {children}
    </button>
  )
}

/* ─────────────────────────────────────────────────────────── */

function BlockPanel({
  block,
  onUpdate,
}: {
  block: Block | null
  onUpdate: (props: Record<string, unknown>) => void
}) {
  if (!block) {
    return (
      <div className="p-6 text-sm text-foreground/55 font-heading">
        Click into a block in the editor to see its properties here.
      </div>
    )
  }

  const props = (block as { props?: Record<string, unknown> }).props ?? {}
  const type = (block as { type: string }).type
  const isHeading = type === 'heading'
  const supportsAlignment = ['paragraph', 'heading', 'bulletListItem', 'numberedListItem', 'quote'].includes(
    type
  )

  return (
    <div className="p-5 space-y-6">
      <Field label="Block type">
        <div className="px-3 py-2 bg-background border border-foreground/15 font-mono text-sm text-foreground capitalize">
          {type.replace(/([A-Z])/g, ' $1').toLowerCase()}
        </div>
      </Field>

      {isHeading && (
        <Field label="Heading level">
          <div className="grid grid-cols-3 gap-1">
            {[1, 2, 3].map((lvl) => {
              const current = (props.level as number) ?? 1
              return (
                <button
                  key={lvl}
                  onClick={() => onUpdate({ level: lvl })}
                  className={`py-2 text-sm font-display border transition-colors ${
                    current === lvl
                      ? 'border-primary bg-primary/10 text-foreground'
                      : 'border-foreground/15 text-foreground/65 hover:border-foreground/40'
                  }`}
                >
                  H{lvl}
                </button>
              )
            })}
          </div>
        </Field>
      )}

      {supportsAlignment && (
        <Field label="Alignment">
          <div className="grid grid-cols-4 gap-1">
            {[
              { v: 'left',    Icon: AlignLeft    },
              { v: 'center',  Icon: AlignCenter  },
              { v: 'right',   Icon: AlignRight   },
              { v: 'justify', Icon: AlignJustify },
            ].map(({ v, Icon }) => {
              const current = (props.textAlignment as string) ?? 'left'
              return (
                <button
                  key={v}
                  onClick={() => onUpdate({ textAlignment: v })}
                  title={v}
                  className={`py-2 flex items-center justify-center border transition-colors ${
                    current === v
                      ? 'border-primary bg-primary/10 text-foreground'
                      : 'border-foreground/15 text-foreground/55 hover:border-foreground/40 hover:text-foreground'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </button>
              )
            })}
          </div>
        </Field>
      )}

      <Field label="Text color">
        <ColorGrid
          value={(props.textColor as string) ?? 'default'}
          onChange={(v) => onUpdate({ textColor: v })}
        />
      </Field>

      <Field label="Background">
        <ColorGrid
          value={(props.backgroundColor as string) ?? 'default'}
          onChange={(v) => onUpdate({ backgroundColor: v })}
          background
        />
      </Field>

      <p className="text-[11px] text-foreground/45 font-heading leading-relaxed pt-2 border-t border-foreground/10">
        Use the slash menu (<span className="font-mono">/</span>) in the editor to add new headings, lists, images, quotes, and more.
      </p>
    </div>
  )
}

function ColorGrid({
  value,
  onChange,
  background = false,
}: {
  value: string
  onChange: (v: string) => void
  background?: boolean
}) {
  return (
    <div className="grid grid-cols-5 gap-1.5">
      {COLORS.map((c) => {
        const isSelected = value === c.value
        const isDefault = c.value === 'default'
        return (
          <button
            key={c.value}
            onClick={() => onChange(c.value)}
            title={c.name}
            className={`relative aspect-square border transition-all ${
              isSelected
                ? 'border-primary ring-2 ring-primary/40'
                : 'border-foreground/15 hover:border-foreground/40'
            }`}
            style={{
              background: isDefault
                ? 'transparent'
                : background
                  ? c.swatch + '33'
                  : c.swatch,
            }}
          >
            {isDefault && (
              <span className="absolute inset-0 flex items-center justify-center text-[9px] font-mono text-foreground/55">
                A
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────── */

function PostPanel({
  meta,
  onUpdate,
}: {
  meta: PostMeta
  onUpdate: (patch: Partial<PostMeta>) => void
}) {
  return (
    <div className="p-5 space-y-6">
      <Field label="Title">
        <PanelInput
          value={meta.title}
          onChange={(e) => onUpdate({ title: e.target.value })}
        />
      </Field>

      <Field
        label="Slug"
        action={
          <button
            onClick={() => onUpdate({ slug: toSlug(meta.title) })}
            className="text-[10px] font-mono tracking-[0.18em] uppercase text-foreground/55 hover:text-primary transition-colors"
          >
            from title
          </button>
        }
      >
        <PanelInput
          value={meta.slug}
          onChange={(e) => onUpdate({ slug: e.target.value })}
          spellCheck={false}
        />
        <p className="text-[11px] text-foreground/45 font-heading mt-1.5">
          URL: <code className="font-mono">/lawshaoor-academy/{meta.slug || '…'}</code>
        </p>
      </Field>

      <Field label="Excerpt">
        <PanelTextarea
          rows={3}
          value={meta.excerpt}
          onChange={(e) => onUpdate({ excerpt: e.target.value })}
          placeholder="1-2 sentences shown in the listing."
        />
      </Field>

      <Field label="Category">
        <PanelSelect
          value={meta.category}
          onChange={(e) => onUpdate({ category: e.target.value })}
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </PanelSelect>
      </Field>

      <Field label="Thumbnail">
        <ImagePicker
          url={meta.thumbnailUrl}
          onChange={(url) => onUpdate({ thumbnailUrl: url })}
        />
      </Field>

      <div className="pt-5 border-t border-foreground/10 space-y-6">
        <p className="text-[10px] font-mono tracking-[0.32em] uppercase text-foreground/55">SEO</p>

        <Field label="Meta title">
          <PanelInput
            value={meta.seo.title}
            onChange={(e) => onUpdate({ seo: { ...meta.seo, title: e.target.value } })}
            placeholder={meta.title}
          />
        </Field>

        <Field label="Meta description">
          <PanelTextarea
            rows={3}
            value={meta.seo.description}
            onChange={(e) => onUpdate({ seo: { ...meta.seo, description: e.target.value } })}
            placeholder={meta.excerpt}
          />
        </Field>

        <Field label="OG image">
          <ImagePicker
            url={meta.seo.ogImage}
            onChange={(url) => onUpdate({ seo: { ...meta.seo, ogImage: url } })}
          />
        </Field>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────── */

function ImagePicker({
  url,
  onChange,
}: {
  url: string
  onChange: (url: string) => void
}) {
  const [uploading, setUploading] = useState(false)
  const [err, setErr] = useState('')

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    setUploading(true)
    setErr('')
    try {
      const form = new FormData()
      form.append('image', file)
      const res = await fetch('/api/admin/upload', { method: 'POST', body: form })
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string }
        throw new Error(data?.error || `Upload failed (${res.status})`)
      }
      const { url: u } = (await res.json()) as { url: string }
      onChange(u)
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-2">
      {url ? (
        <div className="relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={url} alt="" className="w-full aspect-video object-cover border border-foreground/15" />
          <button
            onClick={() => onChange('')}
            className="absolute top-1.5 right-1.5 bg-background/85 hover:bg-background border border-foreground/20 p-1 text-foreground/70 hover:text-destructive transition-colors"
            title="Remove"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        <label className="block aspect-video border border-dashed border-foreground/25 hover:border-primary transition-colors cursor-pointer">
          <span className="w-full h-full flex flex-col items-center justify-center gap-2 text-foreground/55 hover:text-foreground transition-colors">
            {uploading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Upload className="w-5 h-5" />
            )}
            <span className="text-[10px] font-mono tracking-[0.22em] uppercase">
              {uploading ? 'Uploading…' : 'Click to upload'}
            </span>
          </span>
          <input type="file" accept="image/*" onChange={onFile} hidden />
        </label>
      )}

      <PanelInput
        value={url}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Or paste image URL"
        spellCheck={false}
      />

      {err && <p className="text-xs text-destructive font-mono">{err}</p>}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────── */

function Field({
  label,
  action,
  children,
}: {
  label: string
  action?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-baseline justify-between">
        <label className="text-[10px] font-mono tracking-[0.28em] uppercase text-foreground/55">
          {label}
        </label>
        {action}
      </div>
      {children}
    </div>
  )
}

function PanelInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full bg-background border border-foreground/15 px-3 py-2 text-sm font-heading text-foreground placeholder:text-foreground/35 focus:outline-none focus:border-primary transition-colors ${
        props.className ?? ''
      }`}
    />
  )
}

function PanelTextarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`w-full bg-background border border-foreground/15 px-3 py-2 text-sm font-heading text-foreground placeholder:text-foreground/35 focus:outline-none focus:border-primary transition-colors resize-y ${
        props.className ?? ''
      }`}
    />
  )
}

function PanelSelect(
  props: React.SelectHTMLAttributes<HTMLSelectElement> & { children: React.ReactNode }
) {
  return (
    <select
      {...props}
      className={`w-full bg-background border border-foreground/15 px-3 py-2 text-sm font-heading text-foreground focus:outline-none focus:border-primary transition-colors ${
        props.className ?? ''
      }`}
    >
      {props.children}
    </select>
  )
}
