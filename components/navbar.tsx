'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { Moon, Sun, Menu, X } from 'lucide-react'

const NAV = [
  { href: '/about', label: 'Our Story' },
  { href: '/practice-areas', label: 'Practice' },
  { href: '/services', label: 'Services' },
  { href: '/insights', label: 'Journal' },
]

export function Navbar() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isDark = mounted && (theme === 'dark' || resolvedTheme === 'dark')

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-[background,border,backdrop-filter] duration-500 ${
        scrolled
          ? 'bg-background/85 backdrop-blur-md border-b border-foreground/25'
          : 'bg-background/40 backdrop-blur-sm border-b border-transparent'
      }`}
    >
      <div className="section-pad max-w-[1440px] mx-auto flex items-center justify-between h-16 md:h-20">
        <Link href="/" className="flex items-baseline gap-2 group">
          <span className="font-serif text-2xl md:text-[26px] tracking-[-0.04em] leading-none">
            LawShaoor
          </span>
          <span className="eyebrow-sm text-foreground/65 hidden md:inline">
            · est. 2005
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          {NAV.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex items-baseline gap-1.5"
            >
              <span className="eyebrow text-foreground/65 group-hover:text-primary transition-colors">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="link-line text-sm font-medium text-foreground/95 group-hover:text-primary transition-colors">
                {item.label}
              </span>
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            aria-label="Toggle theme"
            className="hidden md:inline-flex items-center justify-center w-10 h-10 border border-foreground/40 hover:border-primary hover:text-primary hover:bg-primary/10 transition-colors"
          >
            {mounted && (isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />)}
          </button>

          <Link
            href="/contact"
            className="hidden md:inline-flex btn-ink"
          >
            <span>Schedule</span>
            <span className="arrow-magnet">→</span>
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className="md:hidden inline-flex items-center justify-center w-10 h-10 border border-foreground/40 hover:border-primary hover:text-primary transition-colors"
          >
            {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`md:hidden overflow-hidden transition-[max-height] duration-500 ease-out ${
          open ? 'max-h-96 border-b border-foreground/10' : 'max-h-0'
        } bg-background`}
      >
        <nav className="section-pad py-6 flex flex-col gap-5">
          {NAV.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="flex items-baseline gap-3"
            >
              <span className="eyebrow text-foreground/45">{String(i + 1).padStart(2, '0')}</span>
              <span className="font-serif text-3xl tracking-[-0.03em]">{item.label}</span>
            </Link>
          ))}
          <Link href="/contact" onClick={() => setOpen(false)} className="btn-ink mt-4 self-start">
            <span>Schedule</span>
            <span className="arrow-magnet">→</span>
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
  )
}
