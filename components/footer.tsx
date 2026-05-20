'use client'

import Link from 'next/link'
import { Rule } from '@/components/motion/rule'
import { SplitReveal } from '@/components/motion/split-reveal'
import { Marquee } from '@/components/motion/marquee'
import { OrbitRings } from '@/components/illustrations'

export function Footer() {
  return (
    <footer className="relative pt-24 md:pt-32 pb-10 bg-background-deep text-foreground border-t border-foreground/15 overflow-hidden">
      {/* Massive wordmark marquee */}
      <Marquee speed={45} className="mb-6 md:mb-8">
        <div className="flex items-center gap-12 pr-12">
          {Array.from({ length: 6 }).map((_, i) => (
            <span
              key={i}
              className="font-display text-[16vw] md:text-[12vw] leading-none tracking-[-0.04em] text-foreground/15 whitespace-nowrap"
            >
              LAWSHAOOR ✦
            </span>
          ))}
        </div>
      </Marquee>

      {/* Tagline under wordmark */}
      <div className="section-pad max-w-[1440px] mx-auto mb-20 md:mb-28 flex items-center gap-4 md:gap-6">
        <span className="block h-px flex-1 bg-foreground/15" />
        <span className="font-mono text-[10px] md:text-xs tracking-[0.42em] uppercase text-foreground/70 whitespace-nowrap">
          Law<span className="text-primary">.</span> Strategy<span className="text-primary">.</span> Future<span className="text-primary">.</span>
        </span>
        <span className="block h-px flex-1 bg-foreground/15" />
      </div>

      <div className="section-pad max-w-[1440px] mx-auto">
        <Rule className="mb-14" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 mb-20">
          <div className="md:col-span-5 space-y-6">
            <span className="eyebrow text-foreground/65">— Get in touch</span>
            <h3 className="display-sm font-display">
              <SplitReveal>Let&apos;s discuss your matter.</SplitReveal>
            </h3>
            <Link href="/contact" className="btn-primary mt-2">
              <span>Start a conversation</span>
              <span className="arrow-magnet">→</span>
            </Link>
          </div>

          <div className="md:col-span-2">
            <p className="eyebrow text-foreground/65 mb-5">Navigate</p>
            <ul className="space-y-3 text-sm font-mono uppercase tracking-[0.18em]">
              <li><Link href="/our-story" className="link-line">The Chambers</Link></li>
              <li><Link href="/practice-areas" className="link-line">Practice</Link></li>
              <li><Link href="/people" className="link-line">Team</Link></li>
              <li><Link href="/lawshaoor-academy" className="link-line">Academy</Link></li>
              <li><Link href="/contact" className="link-line">Contact</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2 hidden md:flex justify-center">
            <OrbitRings className="w-44 h-44" uid="footer-seg" rotate />
          </div>

          <div className="md:col-span-3 space-y-5 text-sm">
            <div>
              <p className="eyebrow text-foreground/65 mb-3">Chambers</p>
              <p className="font-heading text-base leading-snug tracking-[-0.005em]">
                Office No. 204, Millennium Heights<br />
                F-11 Markaz<br />
                Islamabad, 44000
              </p>
            </div>
            <div className="space-y-1">
              <a href="https://www.lawshaoor.com" className="link-line block font-mono text-xs tracking-[0.18em] uppercase">www.lawshaoor.com</a>
            </div>
          </div>
        </div>

        <Rule className="mb-6" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs eyebrow text-foreground/70">
          <p>© {new Date().getFullYear()} LawShaoor Chambers · All rights reserved</p>
          <p>In strategic partnership with M.B. KEMP (ME) LLP</p>
          <Link href="/admin" className="link-line text-foreground/60 hover:text-primary transition-colors">
            Admin →
          </Link>
        </div>
      </div>
    </footer>
  )
}
