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
      <Marquee speed={45} className="mb-20 md:mb-28">
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

      <div className="section-pad max-w-[1440px] mx-auto">
        <Rule className="mb-14" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 mb-20">
          <div className="md:col-span-5 space-y-6">
            <span className="eyebrow text-foreground/65">— Get in touch</span>
            <h3 className="display-sm font-display">
              <SplitReveal>Let&apos;s draft your next move.</SplitReveal>
            </h3>
            <Link href="/contact" className="btn-primary mt-2">
              <span>Start a conversation</span>
              <span className="arrow-magnet">→</span>
            </Link>
          </div>

          <div className="md:col-span-2">
            <p className="eyebrow text-foreground/65 mb-5">Navigate</p>
            <ul className="space-y-3 text-sm font-mono uppercase tracking-[0.18em]">
              <li><Link href="/our-story" className="link-line">Our Story</Link></li>
              <li><Link href="/practice-areas" className="link-line">Practice</Link></li>
              <li><Link href="/people" className="link-line">People</Link></li>
              <li><Link href="/lawshaoor-academy" className="link-line">Academy</Link></li>
              <li><Link href="/contact" className="link-line">Contact</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2 hidden md:flex justify-center">
            <OrbitRings className="w-44 h-44" uid="footer-seg" rotate />
          </div>

          <div className="md:col-span-3 space-y-5 text-sm">
            <div>
              <p className="eyebrow text-foreground/65 mb-3">Studio</p>
              <p className="font-heading text-base leading-snug tracking-[-0.005em]">
                500 Fifth Avenue<br />
                New York, NY 10110
              </p>
            </div>
            <div className="space-y-1">
              <a href="mailto:hello@lawshaoor.com" className="link-line block font-mono text-xs tracking-[0.18em] uppercase">hello@lawshaoor.com</a>
              <a href="tel:+12125559000" className="text-foreground/65 font-mono text-xs tracking-[0.18em] uppercase">+1 (212) 555-9000</a>
            </div>
          </div>
        </div>

        <Rule className="mb-6" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs eyebrow text-foreground/70">
          <p>© {new Date().getFullYear()} LawShaoor · All rights reserved</p>
          <p>Licensed: NY · CA · TX · IL</p>
          <p>
            <a href="#" className="link-line">Privacy</a>
            <span className="mx-3 opacity-40">·</span>
            <a href="#" className="link-line">Terms</a>
            <span className="mx-3 opacity-40">·</span>
            <a href="#" className="link-line">Disclosures</a>
          </p>
        </div>
      </div>
    </footer>
  )
}
