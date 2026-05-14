'use client'

import Link from 'next/link'
import { Rule } from '@/components/motion/rule'
import { SplitReveal } from '@/components/motion/split-reveal'
import { Marquee } from '@/components/motion/marquee'

export function Footer() {
  return (
    <footer className="relative pt-24 md:pt-32 pb-10 bg-background text-foreground border-t-2 border-foreground/30 overflow-hidden">
      {/* Massive marquee wordmark */}
      <Marquee speed={45} className="mb-20 md:mb-28">
        <div className="flex items-center gap-12 pr-12">
          {Array.from({ length: 6 }).map((_, i) => (
            <span
              key={i}
              className="font-serif italic-display text-[18vw] md:text-[14vw] leading-none tracking-[-0.04em] text-foreground/30 whitespace-nowrap"
            >
              LawShaoor —
            </span>
          ))}
        </div>
      </Marquee>

      <div className="section-pad max-w-[1440px] mx-auto">
        <Rule className="mb-12" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 mb-20">
          <div className="md:col-span-5 space-y-6">
            <p className="eyebrow text-foreground/75">— Get in touch</p>
            <h3 className="display-sm font-serif">
              <SplitReveal>Let's draft your next move.</SplitReveal>
            </h3>
            <Link href="/contact" className="btn-ink mt-2">
              <span>Start a conversation</span>
              <span className="arrow-magnet">→</span>
            </Link>
          </div>

          <div className="md:col-span-2">
            <p className="eyebrow text-foreground/75 mb-5">Practice</p>
            <ul className="space-y-3 text-sm">
              <li><Link href="/practice-areas" className="link-line">Mergers & Acquisitions</Link></li>
              <li><Link href="/practice-areas" className="link-line">Corporate Governance</Link></li>
              <li><Link href="/practice-areas" className="link-line">Commercial Contracts</Link></li>
              <li><Link href="/services" className="link-line">All Services</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="eyebrow text-foreground/75 mb-5">The Firm</p>
            <ul className="space-y-3 text-sm">
              <li><Link href="/about" className="link-line">Our Story</Link></li>
              <li><Link href="/insights" className="link-line">Journal</Link></li>
              <li><Link href="/contact" className="link-line">Contact</Link></li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-5 text-sm">
            <div>
              <p className="eyebrow text-foreground/75 mb-3">Studio</p>
              <p className="font-serif text-lg leading-snug">
                500 Fifth Avenue<br />
                New York, NY 10110
              </p>
            </div>
            <div>
              <a href="mailto:hello@lawshaoor.com" className="link-line">hello@lawshaoor.com</a>
              <br />
              <a href="tel:+12125559000" className="text-foreground/65">+1 (212) 555-9000</a>
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
