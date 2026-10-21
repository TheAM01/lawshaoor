'use client'

/**
 * DEV TEST ONLY — temporary heading font / case switcher. Remove when a font is chosen.
 *
 * Mounted in app/layout.tsx so the saved choice applies on every page; the
 * floating box itself only shows on the home page. Works by overriding two CSS
 * variables on <html>: --font-display (font) and --display-transform (case),
 * which the heading rules in globals.css read.
 */

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const FONTS = [
  'Caveat Brush',
  'Pinyon Script',
  'Petit Formal Script',
  'Monsieur La Doulaise',
  'Mrs Saint Delafield',
  'Mr De Haviland',
  'Fondamento',
  'La Belle Aurore',
  'Corinthia',
  'Alex Brush',
  'Kaushan Script',
  'Yellowtail',
  'Mr Dafoe',
  'Damion',
  'Marck Script',
  'Satisfy',
] as const

const CASES = ['uppercase', 'lowercase', 'capitalize'] as const

type Font = (typeof FONTS)[number]
type Case = (typeof CASES)[number]
type Settings = { font: Font; transform: boolean; textCase: Case }

const DEFAULTS: Settings = { font: 'Caveat Brush', transform: true, textCase: 'uppercase' }
const STORAGE_KEY = 'dev-heading-style'
const LINK_ID = 'dev-heading-fonts'

// Caveat Brush is already loaded by next/font; fetch the rest from Google Fonts.
const FONTS_HREF =
  'https://fonts.googleapis.com/css2?' +
  FONTS.filter((f) => f !== 'Caveat Brush')
    .map((f) => `family=${f.replace(/ /g, '+')}`)
    .join('&') +
  '&display=swap'

const fontStack = (font: Font) =>
  font === 'Caveat Brush'
    ? 'var(--font-caveat-brush), ui-sans-serif, system-ui, sans-serif'
    : `'${font}', var(--font-caveat-brush), ui-sans-serif, system-ui, sans-serif`

function load(): Settings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return { ...DEFAULTS, ...JSON.parse(raw) }
  } catch {}
  return DEFAULTS
}

export function HeadingStyleSwitcher() {
  const pathname = usePathname()
  const [settings, setSettings] = useState<Settings | null>(null)
  const [open, setOpen] = useState(true)

  // Load fonts + saved settings once.
  useEffect(() => {
    if (!document.getElementById(LINK_ID)) {
      const link = document.createElement('link')
      link.id = LINK_ID
      link.rel = 'stylesheet'
      link.href = FONTS_HREF
      document.head.appendChild(link)
    }
    setSettings(load())
  }, [])

  // Apply + persist on every change.
  useEffect(() => {
    if (!settings) return
    const root = document.documentElement.style
    root.setProperty('--font-display', fontStack(settings.font))
    root.setProperty('--display-transform', settings.transform ? settings.textCase : 'none')
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
    } catch {}
  }, [settings])

  if (!settings || pathname !== '/') return null

  const update = (patch: Partial<Settings>) => setSettings((s) => (s ? { ...s, ...patch } : s))

  // Cycle through FONTS, wrapping at both ends.
  const stepFont = (dir: 1 | -1) => {
    const i = FONTS.indexOf(settings.font)
    update({ font: FONTS[(i + dir + FONTS.length) % FONTS.length] })
  }

  return (
    <div className="fixed bottom-4 left-4 z-[60] w-[17rem] max-w-[calc(100vw-2rem)] border border-foreground/15 bg-background/95 backdrop-blur shadow-lg text-xs">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-3 py-2 border-b border-foreground/10"
      >
        <span className="eyebrow-sm text-foreground/60">Dev · Heading style</span>
        <span aria-hidden className="text-foreground/50">{open ? '−' : '+'}</span>
      </button>

      {open && (
        <div className="p-3 space-y-3">
          {/* Font */}
          <label className="block space-y-1">
            <span className="text-foreground/55">Font</span>
            <div className="flex items-stretch gap-1">
              <button
                type="button"
                aria-label="Previous font"
                onClick={() => stepFont(-1)}
                className="px-2 border border-foreground/15 hover:bg-foreground/5"
              >
                ‹
              </button>
              <select
                value={settings.font}
                onChange={(e) => update({ font: e.target.value as Font })}
                className="min-w-0 flex-1 border border-foreground/15 bg-background px-2 py-1.5 text-sm"
              >
                {FONTS.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
              <button
                type="button"
                aria-label="Next font"
                onClick={() => stepFont(1)}
                className="px-2 border border-foreground/15 hover:bg-foreground/5"
              >
                ›
              </button>
            </div>
          </label>

          {/* Case on/off */}
          <div className="flex items-center justify-between">
            <span className="text-foreground/55">Text transform</span>
            <button
              type="button"
              role="switch"
              aria-checked={settings.transform}
              onClick={() => update({ transform: !settings.transform })}
              className={cn(
                'relative h-5 w-9 rounded-full transition-colors',
                settings.transform ? 'bg-primary' : 'bg-foreground/20',
              )}
            >
              <span
                className={cn(
                  'absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-background transition-transform',
                  settings.transform && 'translate-x-4',
                )}
              />
            </button>
          </div>

          {/* Which case */}
          <div
            className={cn(
              'grid grid-cols-3 border border-foreground/15',
              !settings.transform && 'opacity-40 pointer-events-none',
            )}
          >
            {CASES.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => update({ textCase: c })}
                className={cn(
                  'py-1.5 transition-colors',
                  settings.textCase === c ? 'bg-primary text-primary-foreground' : 'hover:bg-foreground/5',
                )}
              >
                {c === 'uppercase' ? 'UPPER' : c === 'lowercase' ? 'lower' : 'Capital'}
              </button>
            ))}
          </div>

          {/* Preview + reset */}
          <div className="flex items-center justify-between gap-2 pt-1">
            <span className="font-display text-lg truncate">Law that works</span>
            <button
              type="button"
              onClick={() => setSettings(DEFAULTS)}
              className="text-foreground/55 underline underline-offset-2 shrink-0"
            >
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
