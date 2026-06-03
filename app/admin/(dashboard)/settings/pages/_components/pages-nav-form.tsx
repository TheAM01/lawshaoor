'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, Save, Plus, Trash2, ChevronUp, ChevronDown } from 'lucide-react'
import type { SiteSettings, NavLabels, MagazineContent, SeminarsContent, ContentBlock } from '@/lib/models/settings'
import { Section, Field, Input, Textarea, Toggle } from '../../_components/form-atoms'

const NAV_FIELDS: { key: keyof NavLabels; label: string; fallback: string }[] = [
  { key: 'theChambers',   label: 'The Chambers',   fallback: 'The Chambers' },
  { key: 'practiceAreas', label: 'Practice Areas',  fallback: 'Practice Areas' },
  { key: 'team',          label: 'Team',            fallback: 'Team' },
  { key: 'knowledge',     label: 'Knowledge (dropdown)', fallback: 'Knowledge' },
  { key: 'academy',       label: '— Academy',       fallback: 'Academy' },
  { key: 'magazine',      label: '— Magazine',      fallback: 'Magazine' },
  { key: 'seminars',      label: '— Seminars',      fallback: 'Seminars' },
  { key: 'careers',       label: 'Careers',         fallback: 'Careers' },
  { key: 'contact',       label: 'Contact button',  fallback: 'Contact Us' },
]

export function PagesNavForm({ initial }: { initial: SiteSettings }) {
  const router = useRouter()
  const [navLabels, setNavLabels] = useState<NavLabels>(initial.navLabels)
  const [magazine, setMagazine] = useState<MagazineContent>(initial.magazine)
  const [seminars, setSeminars] = useState<SeminarsContent>(initial.seminars)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  function touched() { setSaved(false) }
  function setNav(k: keyof NavLabels, v: string) { setNavLabels((c) => ({ ...c, [k]: v })); touched() }
  function setMag(p: Partial<MagazineContent>) { setMagazine((c) => ({ ...c, ...p })); touched() }
  function setSem(p: Partial<SeminarsContent>) { setSeminars((c) => ({ ...c, ...p })); touched() }

  async function onSave() {
    setSaving(true); setError(''); setSaved(false)
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ navLabels, magazine, seminars }),
      })
      if (!res.ok) {
        const d = (await res.json().catch(() => ({}))) as { error?: string }
        throw new Error(d.error || `Failed (${res.status})`)
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

      <Section title="Navigation labels">
        <p className="text-[11px] text-foreground/55 font-heading leading-relaxed">
          Override what each menu link says. Leave a field blank to keep the default shown as the placeholder.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {NAV_FIELDS.map((f) => (
            <Field key={f.key} label={f.label}>
              <Input
                value={navLabels[f.key] ?? ''}
                onChange={(e) => setNav(f.key, e.target.value)}
                placeholder={f.fallback}
                maxLength={40}
              />
            </Field>
          ))}
        </div>
      </Section>

      <Section title="Magazine page">
        <Field row label="Show in menu" help="Hides the Magazine link from the Knowledge dropdown and footer, and 404s the page.">
          <Toggle value={magazine.visible} onChange={(v) => setMag({ visible: v })} label={magazine.visible ? 'Visible' : 'Hidden'} />
        </Field>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Field label="Eyebrow"><Input value={magazine.eyebrow} onChange={(e) => setMag({ eyebrow: e.target.value })} /></Field>
          <Field label="Title (line 1)"><Input value={magazine.title} onChange={(e) => setMag({ title: e.target.value })} /></Field>
          <Field label="Title (line 2)"><Input value={magazine.subtitle} onChange={(e) => setMag({ subtitle: e.target.value })} /></Field>
        </div>
        <Field label="Intro"><Textarea rows={3} value={magazine.intro} onChange={(e) => setMag({ intro: e.target.value })} /></Field>
        <Field label="Substack URL" help="Leave blank to hide the Subscribe buttons."><Input value={magazine.substackUrl} onChange={(e) => setMag({ substackUrl: e.target.value })} placeholder="https://lawshaoor.substack.com" /></Field>
        <div className="space-y-2">
          <p className="text-[10px] font-mono tracking-[0.28em] uppercase text-foreground/65">“In each issue” blocks</p>
          <BlockListEditor blocks={magazine.sections} onChange={(sections) => setMag({ sections })} />
        </div>
      </Section>

      <Section title="Seminars page">
        <Field row label="Show in menu" help="Hides the Seminars link from the Knowledge dropdown and footer, and 404s the page.">
          <Toggle value={seminars.visible} onChange={(v) => setSem({ visible: v })} label={seminars.visible ? 'Visible' : 'Hidden'} />
        </Field>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Field label="Eyebrow"><Input value={seminars.eyebrow} onChange={(e) => setSem({ eyebrow: e.target.value })} /></Field>
          <Field label="Title (line 1)"><Input value={seminars.title} onChange={(e) => setSem({ title: e.target.value })} /></Field>
          <Field label="Title (line 2)"><Input value={seminars.subtitle} onChange={(e) => setSem({ subtitle: e.target.value })} /></Field>
        </div>
        <Field label="Intro"><Textarea rows={3} value={seminars.intro} onChange={(e) => setSem({ intro: e.target.value })} /></Field>
        <div className="space-y-2">
          <p className="text-[10px] font-mono tracking-[0.28em] uppercase text-foreground/65">Format blocks</p>
          <BlockListEditor blocks={seminars.formats} onChange={(formats) => setSem({ formats })} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Upcoming — heading"><Input value={seminars.upcomingTitle} onChange={(e) => setSem({ upcomingTitle: e.target.value })} /></Field>
          <Field label="Upcoming — note"><Input value={seminars.upcomingNote} onChange={(e) => setSem({ upcomingNote: e.target.value })} /></Field>
        </div>
      </Section>

      <div className="flex items-center justify-end gap-3 pt-6 border-t border-foreground/15">
        {saved && <span className="text-[10px] font-mono tracking-[0.22em] uppercase text-primary">✓ Saved</span>}
        <button onClick={onSave} disabled={saving} className="btn-primary disabled:opacity-50">
          <span>{saving ? 'Saving…' : 'Save changes'}</span>
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
        </button>
      </div>
    </div>
  )
}

function BlockListEditor({
  blocks, onChange,
}: {
  blocks: ContentBlock[]
  onChange: (b: ContentBlock[]) => void
}) {
  function set(i: number, b: ContentBlock) { const n = [...blocks]; n[i] = b; onChange(n) }
  function remove(i: number) { onChange(blocks.filter((_, j) => j !== i)) }
  function move(i: number, dir: -1 | 1) {
    const j = i + dir; if (j < 0 || j >= blocks.length) return
    const n = [...blocks]; ;[n[i], n[j]] = [n[j], n[i]]; onChange(n)
  }
  return (
    <div className="space-y-3">
      {blocks.map((b, i) => (
        <div key={i} className="border border-foreground/12 bg-background-alt/40 p-3 flex items-start gap-2">
          <div className="flex flex-col pt-1 text-foreground/35">
            <button type="button" onClick={() => move(i, -1)} disabled={i === 0} className="hover:text-foreground disabled:opacity-20"><ChevronUp className="w-3.5 h-3.5" /></button>
            <button type="button" onClick={() => move(i, 1)} disabled={i === blocks.length - 1} className="hover:text-foreground disabled:opacity-20"><ChevronDown className="w-3.5 h-3.5" /></button>
          </div>
          <div className="flex-1 min-w-0 space-y-2">
            <Input value={b.title} onChange={(e) => set(i, { ...b, title: e.target.value })} placeholder="Block title" />
            <Textarea rows={2} value={b.body} onChange={(e) => set(i, { ...b, body: e.target.value })} placeholder="Block description" />
          </div>
          <button type="button" onClick={() => remove(i)} className="p-2 text-foreground/50 hover:text-destructive transition-colors" title="Remove"><Trash2 className="w-4 h-4" /></button>
        </div>
      ))}
      <button type="button" onClick={() => onChange([...blocks, { title: '', body: '' }])} className="btn-ghost">
        <span>Add block</span><Plus className="w-4 h-4" />
      </button>
    </div>
  )
}
