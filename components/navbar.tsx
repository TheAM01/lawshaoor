'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useTheme } from '@/components/theme-provider'
import { Moon, Sun, Menu, X, ChevronDown } from 'lucide-react'
import { LinkedInBanner } from '@/components/linkedin-banner'

type NavLeaf = { key: string; href: string; label: string; external?: boolean }
type NavGroup = { key: string; label: string; href?: string; wide?: boolean; children: NavLeaf[] }
type NavItem = NavLeaf | NavGroup

/** Curated practice-area dropdown. Anchors match the ids on /practice-areas. */
const PRACTICE_AREAS: NavLeaf[] = [
  { key: 'pa-banking',      href: '/practice-areas#banking-finance',         label: 'Banking & Finance' },
  { key: 'pa-corporate',    href: '/practice-areas#corporate-commercial',    label: 'Corporate & Commercial' },
  { key: 'pa-energy',       href: '/practice-areas#energy-natural-resources', label: 'Energy & Natural Resources' },
  { key: 'pa-disputes',     href: '/practice-areas#dispute-resolution',      label: 'Dispute Resolution & Arbitration' },
  { key: 'pa-ma',           href: '/practice-areas#mergers-acquisitions',    label: 'Mergers & Acquisitions' },
  { key: 'pa-construction', href: '/practice-areas#construction-operation',  label: 'Construction & Operation' },
  { key: 'pa-government',   href: '/practice-areas#government-sector',        label: 'Government Sector' },
  { key: 'pa-telecom',      href: '/practice-areas#telecom-it',              label: 'Telecommunication & IT' },
  { key: 'pa-healthcare',   href: '/practice-areas#healthcare-pharma',       label: 'Healthcare & Pharmaceuticals' },
  { key: 'pa-labour',       href: '/practice-areas#labour-employment',       label: 'Labour & Employment' },
  { key: 'pa-nonprofit',    href: '/practice-areas#non-profit',              label: 'Non-Profit' },
  { key: 'pa-crossborder',  href: '/practice-areas#cross-border',            label: 'UAE & Cross-Border Practice' },
]

/** Default nav with stable keys. Labels here are the fallback when no admin
 *  override is set; `href`s never change. */
const NAV: NavItem[] = [
  { key: 'theChambers', href: '/our-story', label: 'The Chambers' },
  {
    key: 'practiceAreas',
    label: 'Practice Areas',
    href: '/practice-areas',
    wide: true,
    children: PRACTICE_AREAS,
  },
  { key: 'team', href: '/people', label: 'Team' },
  {
    key: 'knowledge',
    label: 'Knowledge',
    children: [
      { key: 'academy',  href: '/lawshaoor-academy',          label: 'LawShaoor Academy' },
      { key: 'magazine', href: '/lawshaoor-academy/magazine', label: 'Magazine' },
      { key: 'substack', href: 'https://lawshaoor.substack.com', label: 'LawShaoor Substack', external: true },
    ],
  },
  { key: 'careers', href: '/careers', label: 'Careers' },
]

type Config = {
  navLabels: Record<string, string>
  magazineVisible: boolean
  seminarsVisible: boolean
}

function isGroup(item: NavItem): item is NavGroup {
  return 'children' in item
}

export function Navbar() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [openGroup, setOpenGroup] = useState<string | null>(null)
  const [config, setConfig] = useState<Config | null>(null)

  useEffect(() => {
    setMounted(true)
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    fetch('/api/site-config')
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => { if (d) setConfig(d as Config) })
      .catch(() => {})

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isDark = mounted && (theme === 'dark' || resolvedTheme === 'dark')

  // Resolve a leaf/group's display label, applying admin overrides.
  const label = (key: string, fallback: string) =>
    (config?.navLabels?.[key]?.trim() || fallback)

  // Filter Knowledge children by visibility toggles.
  const visibleChildren = (children: NavLeaf[]) =>
    children.filter((c) => {
      if (c.key === 'magazine' && config && !config.magazineVisible) return false
      return true
    })

  const linkClass = 'font-heading text-[13px] tracking-[0.04em] uppercase text-foreground/80 hover:text-primary transition-colors'

  return (
    <>
    <LinkedInBanner />
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-[background,border,backdrop-filter] duration-300 ${
        scrolled
          ? 'bg-background/90 backdrop-blur-md border-b border-foreground/12'
          : 'bg-background/70 backdrop-blur-sm border-b border-transparent'
      }`}
    >
      <div className="section-pad max-w-[1560px] mx-auto flex items-center justify-between h-[68px] md:h-20">
        {/* Logo — horizontal wordmark lockup */}
        <Link href="/" className="inline-flex items-center group" aria-label="LawShaoor Chambers — home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/ls-logo-min.png"
            alt="LawShaoor Chambers"
            className="h-9 md:h-11 w-auto transition-opacity group-hover:opacity-80"
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {NAV.map((item) =>
            isGroup(item) ? (
              <div
                key={item.key}
                className="relative"
                onMouseEnter={() => setOpenGroup(item.key)}
                onMouseLeave={() => setOpenGroup(null)}
              >
                {item.href ? (
                  <Link href={item.href} className={`group inline-flex items-center gap-1.5 ${linkClass}`}>
                    {label(item.key, item.label)}
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openGroup === item.key ? 'rotate-180' : ''}`} />
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={() => setOpenGroup((g) => (g === item.key ? null : item.key))}
                    className={`group inline-flex items-center gap-1.5 ${linkClass}`}
                    aria-expanded={openGroup === item.key}
                  >
                    {label(item.key, item.label)}
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openGroup === item.key ? 'rotate-180' : ''}`} />
                  </button>
                )}

                <div
                  className={`absolute left-0 top-full pt-4 transition-[opacity,transform] duration-200 ${
                    item.wide ? 'min-w-[460px]' : 'min-w-[230px]'
                  } ${
                    openGroup === item.key ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-1 pointer-events-none'
                  }`}
                >
                  <div className={`bg-popover border border-foreground/12 shadow-xl ${item.wide ? 'grid grid-cols-2' : ''}`}>
                    {visibleChildren(item.children).map((child) =>
                      child.external ? (
                        <a
                          key={child.key}
                          href={child.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setOpenGroup(null)}
                          className="block px-5 py-3 font-heading text-[12px] tracking-[0.03em] uppercase text-foreground/80 hover:text-primary hover:bg-primary/5 border-b border-foreground/10 transition-colors"
                        >
                          {label(child.key, child.label)}
                        </a>
                      ) : (
                        <Link
                          key={child.key}
                          href={child.href}
                          onClick={() => setOpenGroup(null)}
                          className="block px-5 py-3 font-heading text-[12px] tracking-[0.03em] uppercase text-foreground/80 hover:text-primary hover:bg-primary/5 border-b border-foreground/10 transition-colors"
                        >
                          {label(child.key, child.label)}
                        </Link>
                      )
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <Link key={item.key} href={item.href} className={linkClass}>
                {label(item.key, item.label)}
              </Link>
            )
          )}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            aria-label="Toggle theme"
            className="hidden md:inline-flex items-center justify-center w-10 h-10 border border-foreground/25 hover:border-primary hover:text-primary hover:bg-primary/8 transition-colors"
          >
            {mounted && (isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />)}
          </button>

          <Link href="/contact" className="hidden md:inline-flex btn-primary !py-2.5 !px-5 !text-[0.8rem]">
            <span>{label('contact', 'Contact')}</span>
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 border border-foreground/25 hover:border-primary hover:text-primary transition-colors"
          >
            {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`lg:hidden overflow-hidden transition-[max-height] duration-500 ease-out ${
          open ? 'max-h-[760px] border-b border-foreground/12' : 'max-h-0'
        } bg-background`}
      >
        <nav className="section-pad py-7 flex flex-col gap-5">
          {NAV.map((item) =>
            isGroup(item) ? (
              <div key={item.key} className="flex flex-col gap-3">
                {item.href ? (
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="font-display text-2xl font-semibold tracking-[-0.01em]"
                  >
                    {label(item.key, item.label)}
                  </Link>
                ) : (
                  <span className="font-display text-2xl font-semibold tracking-[-0.01em]">{label(item.key, item.label)}</span>
                )}
                <div className="pl-4 flex flex-col gap-3 border-l border-foreground/12">
                  {visibleChildren(item.children).map((child) =>
                    child.external ? (
                      <a
                        key={child.key}
                        href={child.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setOpen(false)}
                        className="font-heading text-xs tracking-[0.04em] uppercase text-foreground/70 hover:text-primary transition-colors"
                      >
                        {label(child.key, child.label)}
                      </a>
                    ) : (
                      <Link
                        key={child.key}
                        href={child.href}
                        onClick={() => setOpen(false)}
                        className="font-heading text-xs tracking-[0.04em] uppercase text-foreground/70 hover:text-primary transition-colors"
                      >
                        {label(child.key, child.label)}
                      </Link>
                    )
                  )}
                </div>
              </div>
            ) : (
              <Link
                key={item.key}
                href={item.href}
                onClick={() => setOpen(false)}
                className="font-display text-2xl font-semibold tracking-[-0.01em]"
              >
                {label(item.key, item.label)}
              </Link>
            )
          )}
          <Link href="/contact" onClick={() => setOpen(false)} className="btn-primary mt-4 self-start">
            <span>{label('contact', 'Contact')}</span>
          </Link>
          <button
            type="button"
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className="eyebrow text-foreground/80 mt-2 text-left"
          >
            {mounted && (isDark ? 'Light mode' : 'Dark mode')}
          </button>
        </nav>
      </div>
    </header>
    </>
  )
}
