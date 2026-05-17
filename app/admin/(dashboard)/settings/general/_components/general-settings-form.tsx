'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, Save } from 'lucide-react'
import type { SiteSettings } from '@/lib/models/settings'
import { Section, Field, Input, Textarea } from '../../_components/form-atoms'

type GeneralFormShape = Pick<
  SiteSettings,
  'siteTitle' | 'siteTagline' | 'metaDescription' | 'contactNote'
>

export function GeneralSettingsForm({ initial }: { initial: SiteSettings }) {
  const router = useRouter()
  const [form, setForm] = useState<GeneralFormShape>({
    siteTitle: initial.siteTitle,
    siteTagline: initial.siteTagline,
    metaDescription: initial.metaDescription,
    contactNote: initial.contactNote,
  })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  function patch(p: Partial<GeneralFormShape>) {
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
        body: JSON.stringify(form),
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

      <Section title="SEO defaults">
        <Field
          label="Site title"
          help="The default browser-tab title and Google search-result title. Leave empty to use the route-level default."
        >
          <Input
            value={form.siteTitle}
            onChange={(e) => patch({ siteTitle: e.target.value })}
            placeholder="LawShaoor Chambers — Law. Strategy. Future."
          />
        </Field>

        <Field
          label="Tagline"
          help="One-line strapline used in OpenGraph and Twitter share cards."
        >
          <Input
            value={form.siteTagline}
            onChange={(e) => patch({ siteTagline: e.target.value })}
            placeholder="Law. Strategy. Future."
          />
        </Field>

        <Field
          label="Meta description"
          help="Default description for share previews and search results. ~155 characters is the sweet spot."
        >
          <Textarea
            rows={3}
            value={form.metaDescription}
            onChange={(e) => patch({ metaDescription: e.target.value })}
            placeholder="A full-service law firm based in Islamabad…"
          />
        </Field>
      </Section>

      <Section title="Contact page">
        <Field
          label="Contact note"
          help="Optional message shown on the public contact page (e.g. holiday hours, response-time expectations)."
        >
          <Textarea
            rows={2}
            value={form.contactNote}
            onChange={(e) => patch({ contactNote: e.target.value })}
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
          <span>{saving ? 'Saving…' : 'Save general settings'}</span>
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
        </button>
      </div>
    </div>
  )
}
