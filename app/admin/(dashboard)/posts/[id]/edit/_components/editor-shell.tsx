'use client'

import '@blocknote/core/fonts/inter.css'
import '@blocknote/mantine/style.css'
import './editor.css'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTheme } from '@/components/theme-provider'
import { useCreateBlockNote } from '@blocknote/react'
import { BlockNoteView } from '@blocknote/mantine'
import type { Block, PartialBlock } from '@blocknote/core'

import { sanitizeBlocks } from '@/lib/models/post'
import { TopBar } from './top-bar'
import { PropertiesPanel } from './properties-panel'

export type EditorInitial = {
  _id: string
  title: string
  slug: string
  excerpt: string
  category: string
  thumbnailUrl: string
  blocks: unknown[]
  status: 'draft' | 'published'
  seo: { title: string; description: string; ogImage: string }
}

export type PostMeta = Omit<EditorInitial, '_id' | 'blocks'>

export function EditorShell({ id, initial }: { id: string; initial: EditorInitial }) {
  const router = useRouter()
  const { resolvedTheme } = useTheme()

  // ---- Post-level state (everything except blocks) ----
  const [meta, setMeta] = useState<PostMeta>({
    title: initial.title,
    slug: initial.slug,
    excerpt: initial.excerpt,
    category: initial.category,
    thumbnailUrl: initial.thumbnailUrl,
    status: initial.status,
    seo: initial.seo,
  })

  const updateMeta = useCallback((patch: Partial<PostMeta>) => {
    setMeta((m) => ({ ...m, ...patch }))
  }, [])

  // ---- BlockNote editor ----
  // We intentionally do NOT pass initialContent here so editor creation
  // can never fail on malformed stored data. Content is loaded in a
  // separate effect (below) with a try/catch around it.
  const safeInitial = useMemo(
    () => sanitizeBlocks(initial.blocks) as PartialBlock[],
    [initial.blocks]
  )
  const editor = useCreateBlockNote({
    uploadFile: async (file: File) => {
      const form = new FormData()
      form.append('image', file)
      const res = await fetch('/api/admin/upload', { method: 'POST', body: form })
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string }
        throw new Error(data?.error || `Upload failed (${res.status})`)
      }
      const data = (await res.json()) as { url: string }
      return data.url
    },
  })

  // Load sanitized content once the editor is ready. Failure is logged
  // but non-fatal — the editor stays usable with an empty document.
  const loadedRef = useRef(false)
  useEffect(() => {
    if (!editor || loadedRef.current) return
    loadedRef.current = true
    if (safeInitial.length === 0) return
    try {
      editor.replaceBlocks(editor.document, safeInitial)
    } catch (err) {
      console.error('[editor] Failed to load blocks; starting empty.', err)
    }
  }, [editor, safeInitial])

  // ---- Focused block tracking ----
  const [focusedBlock, setFocusedBlock] = useState<Block | null>(null)

  useEffect(() => {
    if (!editor) return
    const sync = () => {
      try {
        const pos = editor.getTextCursorPosition()
        setFocusedBlock(pos.block as Block)
      } catch {
        /* editor may not be ready */
      }
    }
    sync()
    const offSelect = (editor as unknown as {
      onSelectionChange?: (cb: () => void) => () => void
    }).onSelectionChange?.(sync)
    const offChange = editor.onChange(sync)
    return () => {
      offSelect?.()
      offChange?.()
    }
  }, [editor])

  const updateFocusedBlock = useCallback(
    (patch: { props?: Record<string, unknown> }) => {
      if (!editor || !focusedBlock) return
      const merged = {
        ...(focusedBlock as { props?: Record<string, unknown> }).props,
        ...(patch.props ?? {}),
      }
      // BlockNote's update accepts a partial — cast loosely so any prop key works.
      editor.updateBlock(focusedBlock, { props: merged } as unknown as PartialBlock)
      // Re-read so the panel reflects the just-applied change.
      const pos = editor.getTextCursorPosition()
      setFocusedBlock(pos.block as Block)
    },
    [editor, focusedBlock]
  )

  // ---- Saving ----
  const [saving, setSaving] = useState(false)
  const [savedAt, setSavedAt] = useState<Date | null>(null)
  const [error, setError] = useState('')
  const saveAbort = useRef<AbortController | null>(null)

  const save = useCallback(
    async (overrideStatus?: 'draft' | 'published') => {
      if (!editor) return false
      saveAbort.current?.abort()
      const ctl = new AbortController()
      saveAbort.current = ctl
      setSaving(true)
      setError('')
      try {
        const payload = {
          title: meta.title,
          slug: meta.slug,
          excerpt: meta.excerpt,
          category: meta.category,
          thumbnailUrl: meta.thumbnailUrl,
          blocks: editor.document,
          seo: meta.seo,
          status: overrideStatus ?? meta.status,
        }
        const res = await fetch(`/api/admin/posts/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          signal: ctl.signal,
        })
        if (!res.ok) {
          const data = (await res.json().catch(() => ({}))) as { error?: string }
          throw new Error(data?.error || `Save failed (${res.status})`)
        }
        if (overrideStatus) setMeta((m) => ({ ...m, status: overrideStatus }))
        setSavedAt(new Date())
        router.refresh()
        return true
      } catch (e) {
        if ((e as Error).name === 'AbortError') return false
        setError(e instanceof Error ? e.message : 'Save failed')
        return false
      } finally {
        if (saveAbort.current === ctl) saveAbort.current = null
        setSaving(false)
      }
    },
    [editor, id, meta, router]
  )

  // ---- BlockNote theme sync ----
  const theme = useMemo<'light' | 'dark'>(
    () => (resolvedTheme === 'dark' ? 'dark' : 'light'),
    [resolvedTheme]
  )

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <TopBar
        meta={meta}
        saving={saving}
        savedAt={savedAt}
        error={error}
        onSaveDraft={() => save('draft')}
        onPublish={() => save('published')}
        onUnpublish={() => save('draft')}
      />

      <div className="flex-1 flex min-h-0">
        {/* Editor mainspace */}
        <div className="flex-1 min-w-0 overflow-y-auto bg-background">
          <div className="max-w-3xl mx-auto py-10 md:py-14 px-6 md:px-10">
            <BlockNoteView editor={editor} theme={theme} />
          </div>
        </div>

        {/* Right properties panel */}
        <PropertiesPanel
          focusedBlock={focusedBlock}
          onUpdateBlockProps={(props) => updateFocusedBlock({ props })}
          meta={meta}
          onUpdateMeta={updateMeta}
        />
      </div>
    </div>
  )
}
