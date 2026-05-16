'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { Moon, Sun, Menu, X } from 'lucide-react'

const NAV = [
  { href: '/our-story',      label: 'Our Story' },
  { href: '/practice-areas', label: 'Practice Areas' },
  { href: '/people',         label: 'People' },
  { href: '/lawshaoor-academy', label: 'LawShaoor Academy' },
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
          ? 'bg-background/80 backdrop-blur-md border-b border-foreground/15'
          : 'bg-background/30 backdrop-blur-sm border-b border-transparent'
      }`}
    >
      <div className="section-pad max-w-[1440px] mx-auto flex items-center justify-between h-16 md:h-[72px]">
        <Link href="/" className="flex items-center gap-3 group">
          {/* Square + text logomark */}
          <span className="relative inline-flex w-7 h-7">
            <span className="absolute inset-0 border border-foreground/70 group-hover:border-primary transition-colors" />
            <span className="absolute inset-[5px] bg-gradient-to-br from-[var(--grad-from)] to-[var(--grad-to)]" />
          </span>
          <span className="font-display text-[20px] md:text-[22px] tracking-[-0.02em] font-medium leading-none">
            LawShaoor
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-9">
          {NAV.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex items-baseline gap-2"
            >
              <span className="eyebrow text-foreground/50 group-hover:text-primary transition-colors">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="link-line font-mono text-[11px] tracking-[0.22em] uppercase text-foreground/90 group-hover:text-primary transition-colors">
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
            className="hidden md:inline-flex items-center justify-center w-10 h-10 border border-foreground/30 hover:border-primary hover:text-primary hover:bg-primary/10 transition-colors"
          >
            {mounted && (isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />)}
          </button>

          <Link href="/contact" className="hidden md:inline-flex btn-primary !py-3 !px-5">
            <span>Contact</span>
            <span className="arrow-magnet">→</span>
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 border border-foreground/30 hover:border-primary hover:text-primary transition-colors"
          >
            {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`lg:hidden overflow-hidden transition-[max-height] duration-500 ease-out ${
          open ? 'max-h-[480px] border-b border-foreground/15' : 'max-h-0'
        } bg-background`}
      >
        <nav className="section-pad py-7 flex flex-col gap-5">
          {NAV.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="flex items-baseline gap-3"
            >
              <span className="eyebrow text-foreground/40">{String(i + 1).padStart(2, '0')}</span>
              <span className="font-display text-3xl tracking-[-0.02em]">{item.label}</span>
            </Link>
          ))}
          <Link href="/contact" onClick={() => setOpen(false)} className="btn-primary mt-4 self-start">
            <span>Contact</span>
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
