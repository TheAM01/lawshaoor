'use client'

import { useEffect, useState, useCallback } from 'react'

export type Section = { id: string; label: string }

/**
 * Sticky "path bar" that freezes beneath the header and highlights the
 * active section as the visitor scrolls through the page. Clicking a label
 * smooth-scrolls to that section. Used across long pages for a consistent,
 * effortless way to navigate (and to keep the current section title in view).
 */
export function SectionNav({ sections, label }: { sections: Section[]; label?: string }) {
  const [active, setActive] = useState(sections[0]?.id ?? '')

  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => !!el)
    if (!els.length) return

    // Pick the section whose top is closest to (just below) the sticky bar.
    const onScroll = () => {
      const marker = 200 // px below viewport top where the bar sits
      let current = els[0].id
      for (const el of els) {
        if (el.getBoundingClientRect().top <= marker) current = el.id
      }
      setActive(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [sections])

  const go = useCallback((id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY - 132
    window.scrollTo({ top, behavior: 'smooth' })
  }, [])

  return (
    <div className="sticky top-[68px] md:top-20 z-40 bg-background/92 backdrop-blur-md border-y border-foreground/12">
      <div className="section-pad max-w-[1560px] mx-auto flex items-center gap-3 h-12 overflow-x-auto scrollbar-fine">
        {label && (
          <span className="eyebrow text-foreground/45 whitespace-nowrap pr-3 mr-1 border-r border-foreground/12 hidden md:inline">
            {label}
          </span>
        )}
        {sections.map((s) => {
          const isActive = active === s.id
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => go(s.id)}
              className={`relative whitespace-nowrap font-heading text-[11.5px] tracking-[0.06em] uppercase py-1.5 transition-colors ${
                isActive ? 'text-primary' : 'text-foreground/55 hover:text-foreground/90'
              }`}
            >
              {s.label}
              <span
                className={`absolute left-0 right-0 -bottom-[1px] h-[2px] bg-primary transition-transform origin-left ${
                  isActive ? 'scale-x-100' : 'scale-x-0'
                }`}
              />
            </button>
          )
        })}
      </div>
    </div>
  )
}
