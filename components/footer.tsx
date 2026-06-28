'use client'

import Link from 'next/link'
import { Linkedin, Instagram, Mail } from 'lucide-react'
import { Rule } from '@/components/motion/rule'

/* Firm socials — update the hrefs with the real handles. */
const SOCIALS = [
  { label: 'LinkedIn',  href: 'https://www.linkedin.com/company/lawshaoor', Icon: Linkedin },
  { label: 'Substack',  href: 'https://lawshaoor.substack.com',             Icon: SubstackIcon },
  { label: 'Instagram', href: 'https://www.instagram.com/lawshaoor',        Icon: Instagram },
  { label: 'Email',     href: 'mailto:info@lawshaoor.com',                  Icon: Mail },
]

function SubstackIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M22 4H2v2.7h20V4ZM2 9.4V22l10-4.4L22 22V9.4H2Z" />
    </svg>
  )
}

export function Footer() {
  return (
    <footer className="relative pt-12 md:pt-16 pb-10 bg-background-deep text-foreground border-t border-foreground/15 overflow-hidden">
      <div className="section-pad max-w-[1560px] mx-auto">
        <Rule className="mb-14" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 mb-20">
          <div className="md:col-span-5 space-y-6">
            <div className="space-y-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/ls-logo-min.png"
                alt="LawShaoor Chambers"
                className="h-12 md:h-14 w-auto"
              />
              <p className="font-mono text-[10px] md:text-xs tracking-[0.32em] uppercase text-foreground/65">
                Law<span className="text-gold">.</span> Strategy<span className="text-gold">.</span> Future<span className="text-gold">.</span>
              </p>
            </div>

            <div className="pt-2 flex items-center gap-3">
              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex items-center justify-center w-10 h-10 border border-foreground/25 text-foreground/70 hover:border-primary hover:text-primary hover:bg-primary/10 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-2">
            <p className="eyebrow text-foreground/65 mb-5">Navigate</p>
            <ul className="space-y-3 text-sm font-mono uppercase tracking-[0.18em]">
              <li><Link href="/our-story" className="link-line">The Chambers</Link></li>
              <li><Link href="/practice-areas" className="link-line">Practice</Link></li>
              <li><Link href="/people" className="link-line">Team</Link></li>
              <li><Link href="/careers" className="link-line">Careers</Link></li>
              <li><Link href="/contact" className="link-line">Contact</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="eyebrow text-foreground/65 mb-5">Knowledge</p>
            <ul className="space-y-3 text-sm font-mono uppercase tracking-[0.18em]">
              <li><Link href="/lawshaoor-academy" className="link-line">Academy</Link></li>
              <li><Link href="/lawshaoor-academy/magazine" className="link-line">Magazine</Link></li>
              <li><Link href="/lawshaoor-academy/seminars" className="link-line">Seminars</Link></li>
            </ul>
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
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link href="/privacy" className="link-line hover:text-primary transition-colors">Privacy</Link>
            <Link href="/disclaimer" className="link-line hover:text-primary transition-colors">Disclaimer</Link>
            <span className="hidden md:inline text-foreground/40">·</span>
            <span>In strategic partnership with M.B. KEMP (ME) LLP</span>
            <Link href="/admin" className="link-line text-foreground/60 hover:text-primary transition-colors">Admin →</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
