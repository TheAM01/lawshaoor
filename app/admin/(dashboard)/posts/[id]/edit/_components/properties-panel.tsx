'use client'

import { useEffect, useRef, useState } from 'react'
import { AlignLeft, AlignCenter, AlignRight, AlignJustify, Upload, Loader2, X, Lock, Unlock } from 'lucide-react'
import type { Block } from '@blocknote/core'
import { CATEGORIES, toSlug } from '@/lib/models/post'
import type { PostMeta } from './editor-shell'

/** Normalize a slug as the user types — lowercase, runs of whitespace → "-",
 *  strip anything that isn't [a-z0-9-]. Keep trailing "-" while user types
 *  so the cursor doesn't jump. */
function liveSlug(raw: string): string {
  return raw
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
}

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
      <div className="p-6 text-sm text-foreground/55 font-heading leading-relaxed">
        <p className="mb-3">Click into a block in the editor to see its properties here.</p>
        <p className="text-foreground/45 text-[11px]">
          Tip: type <span className="font-mono">/</span> on a blank line to insert headings, lists, images, quotes, videos, files, tables, and more.
        </p>
      </div>
    )
  }

  const props = (block as { props?: Record<string, unknown> }).props ?? {}
  const type = (block as { type: string }).type
  const isHeading = type === 'heading'
  const supportsAlignment = ['paragraph', 'heading', 'bulletListItem', 'numberedListItem', 'quote'].includes(
    type
  )
  const isMedia = ['image', 'file', 'video', 'audio'].includes(type)

  return (
    <div className="p-5 space-y-6">
      <Field
        label="Block type"
        help={blockTypeHelp(type)}
      >
        <div className="px-3 py-2 bg-background border border-foreground/15 font-mono text-sm text-foreground capitalize">
          {type.replace(/([A-Z])/g, ' $1').toLowerCase()}
        </div>
      </Field>

      {isHeading && (
        <Field
          label="Heading level"
          help="H1 is the largest (use once per post — usually the post title takes this slot already). H2 is a section header. H3 is a sub-section."
        >
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
        <Field
          label="Alignment"
          help="Horizontal alignment of the text inside this block. Most body copy reads best as Left."
        >
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

      {!isMedia && (
        <Field
          label="Text color"
          help="Color of the text in this block. Default uses the post's theme color and is almost always what you want."
        >
          <ColorGrid
            value={(props.textColor as string) ?? 'default'}
            onChange={(v) => onUpdate({ textColor: v })}
          />
        </Field>
      )}

      {!isMedia && (
        <Field
          label="Background"
          help="Background tint behind the text — useful for callouts or pull-quotes. Default = no background."
        >
          <ColorGrid
            value={(props.backgroundColor as string) ?? 'default'}
            onChange={(v) => onUpdate({ backgroundColor: v })}
            background
          />
        </Field>
      )}

      {isMedia && (
        <div className="border border-foreground/10 bg-background-alt/30 p-3 text-[11px] text-foreground/65 font-heading leading-relaxed">
          <p className="font-medium text-foreground/85 mb-1">Media block controls</p>
          <p>
            Captions and resizing are managed inside the editor canvas itself — click the block and use the handles. Color settings don&apos;t apply to media blocks.
          </p>
        </div>
      )}

      <p className="text-[11px] text-foreground/45 font-heading leading-relaxed pt-2 border-t border-foreground/10">
        Use the slash menu (<span className="font-mono">/</span>) in the editor to insert new blocks. Switch to the <strong>Post</strong> tab above to edit title, category, thumbnail, and SEO.
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
  // Slug auto-generation: tracks whether the user has manually edited the slug.
  // Start "locked to title" if the current slug looks auto-generated from the
  // title; otherwise treat it as manually edited. Once unlocked-from-title,
  // title edits no longer overwrite slug.
  const initialAuto = useRef(meta.slug === toSlug(meta.title)).current
  const [slugAuto, setSlugAuto] = useState(initialAuto)

  // Keep slug in sync with title while in auto mode.
  useEffect(() => {
    if (!slugAuto) return
    const next = toSlug(meta.title)
    if (next !== meta.slug) onUpdate({ slug: next })
    // We intentionally depend only on title — when slug is auto, it follows title.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meta.title, slugAuto])

  // Categories are loaded async from the API (with the hardcoded list as fallback
  // until the request resolves).
  const [categories, setCategories] = useState<string[]>([...CATEGORIES])
  useEffect(() => {
    let cancelled = false
    fetch('/api/admin/categories')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (cancelled || !data) return
        const list = (data?.categories as { name: string }[] | undefined)
          ?.map((c) => c.name)
          .filter(Boolean)
        if (list && list.length > 0) setCategories(list)
      })
      .catch(() => { /* keep fallback */ })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="p-5 space-y-6">
      <Field
        label="Title"
        help="The main headline. Shown at the top of the post page, in every Academy listing card, in the browser tab, and in social/search previews unless you override it below in SEO."
      >
        <PanelInput
          value={meta.title}
          onChange={(e) => onUpdate({ title: e.target.value })}
        />
      </Field>

      <Field
        label="Slug"
        help={
          <>
            The post&apos;s URL on the public site: <code className="font-mono">/lawshaoor-academy/{meta.slug || '…'}</code>. Auto-generated from the title — click the lock to edit it manually. Avoid changing this after publishing (existing links would 404).
          </>
        }
        action={
          <button
            onClick={() => {
              if (slugAuto) {
                setSlugAuto(false)
              } else {
                setSlugAuto(true)
                onUpdate({ slug: toSlug(meta.title) })
              }
            }}
            className="inline-flex items-center gap-1.5 text-[10px] font-mono tracking-[0.18em] uppercase text-foreground/55 hover:text-primary transition-colors"
            title={slugAuto ? 'Unlock to edit slug manually' : 'Lock to follow title'}
          >
            {slugAuto ? (
              <>
                <Lock className="w-3 h-3" />
                <span>auto</span>
              </>
            ) : (
              <>
                <Unlock className="w-3 h-3" />
                <span>manual</span>
              </>
            )}
          </button>
        }
      >
        <PanelInput
          value={meta.slug}
          onChange={(e) => {
            const cleaned = liveSlug(e.target.value)
            if (slugAuto) setSlugAuto(false)
            onUpdate({ slug: cleaned })
          }}
          spellCheck={false}
          disabled={slugAuto}
          className={slugAuto ? 'opacity-70 cursor-not-allowed' : ''}
        />
      </Field>

      <Field
        label="Excerpt"
        help="A short summary (1–2 sentences). Appears under the title in every Academy listing card and on the post page above the body. Also used as the default SEO meta description if you don't set one."
      >
        <PanelTextarea
          rows={3}
          value={meta.excerpt}
          onChange={(e) => onUpdate({ excerpt: e.target.value })}
          placeholder="1-2 sentences shown in the listing."
        />
      </Field>

      <Field
        label="Category"
        help={
          <>
            Which topic bucket this post belongs to. Determines its tag chip on the post page and which list it appears in at <code className="font-mono">/lawshaoor-academy/c/&lt;slug&gt;</code>. Manage the list under <strong>Categories</strong> in the sidebar.
          </>
        }
      >
        <PanelSelect
          value={meta.category}
          onChange={(e) => onUpdate({ category: e.target.value })}
        >
          {/* Always include the current category in the list, even if it was
              removed from Categories admin (so we don't silently re-bucket the post). */}
          {Array.from(new Set([meta.category, ...categories].filter(Boolean))).map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </PanelSelect>
      </Field>

      <Field
        label="Thumbnail"
        help="The cover image. Shown in the Academy listing (featured slot + rail cards), at the top of the post page when scrolled, and as the social/search image if no OG image is set. Aim for landscape, ~1200×630."
      >
        <ImagePicker
          url={meta.thumbnailUrl}
          onChange={(url) => onUpdate({ thumbnailUrl: url })}
        />
      </Field>

      <div className="pt-5 border-t border-foreground/10 space-y-6">
        <div>
          <p className="text-[10px] font-mono tracking-[0.32em] uppercase text-foreground/55">SEO</p>
          <p className="text-[11px] text-foreground/45 font-heading mt-1 leading-snug">
            How this post appears in Google results and on social share cards (LinkedIn, Twitter, etc). Every field here is optional — leaving them empty falls back to the post Title, Excerpt, and Thumbnail.
          </p>
        </div>

        <Field
          label="Meta title"
          help="The text used in the browser tab and in Google search results. Overrides the post Title for SEO only. Useful when the post's display title is poetic but the searchable phrase is something else."
        >
          <PanelInput
            value={meta.seo.title}
            onChange={(e) => onUpdate({ seo: { ...meta.seo, title: e.target.value } })}
            placeholder={meta.title}
          />
        </Field>

        <Field
          label="Meta description"
          help="The snippet shown under the title in Google results and on social share cards. ~155 characters is the sweet spot. Falls back to the Excerpt above if empty."
        >
          <PanelTextarea
            rows={3}
            value={meta.seo.description}
            onChange={(e) => onUpdate({ seo: { ...meta.seo, description: e.target.value } })}
            placeholder={meta.excerpt}
          />
        </Field>

        <Field
          label="OG image"
          help="The image used when someone shares this post on LinkedIn, Twitter, Facebook, etc. 1200×630 is the canonical size. Falls back to the Thumbnail above if empty."
        >
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

/** One-line explanation of what each block type does on the public site.
 *  Surfaced under the Block-type field so writers can confirm what they picked. */
function blockTypeHelp(type: string): string {
  switch (type) {
    case 'paragraph':         return 'A standard body-text block. The default for everything you type.'
    case 'heading':           return 'A section header. Use to break the post into scannable sections.'
    case 'bulletListItem':    return 'A bulleted (unordered) list item. Press Enter to make another, Tab to nest.'
    case 'numberedListItem':  return 'A numbered (ordered) list item. Press Enter to make another, Tab to nest.'
    case 'checkListItem':     return 'A checklist row with a checkbox. Click the box to toggle on the public page.'
    case 'quote':             return 'A pull-quote / blockquote. Renders with an emphasized left border on the public site.'
    case 'image':             return 'An inline image. Hosted on ImgBB. Click the block to upload or paste a URL.'
    case 'file':              return 'A downloadable file (PDF, ZIP, etc). Hosted privately on Vercel Blob and served through a proxy.'
    case 'video':             return 'An inline video player. Hosted privately on Vercel Blob. Large files may take a moment to upload.'
    case 'audio':             return 'An inline audio player. Hosted privately on Vercel Blob.'
    case 'table':             return 'A simple table. Click cells to edit. Use the slash menu inside a cell for more options.'
    default:                  return 'A content block in the post body.'
  }
}

function Field({
  label,
  action,
  help,
  children,
}: {
  label: string
  action?: React.ReactNode
  help?: React.ReactNode
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
      {help && (
        <p className="text-[11px] text-foreground/45 font-heading leading-snug pt-0.5">
          {help}
        </p>
      )}
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
