'use client'

import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { SplitReveal } from '@/components/motion/split-reveal'
import { FadeIn } from '@/components/motion/fade-in'
import { Rule } from '@/components/motion/rule'
import { ScrollLine } from '@/components/motion/scroll-line'

const SERVICES = [
  {
    title: 'M&A Advisory',
    description: 'From initial strategy through close. Acquisitions, divestitures, and the complex negotiations between.',
    includes: ['Transaction strategy & structuring', 'Buyer / seller representation', 'Negotiation & due diligence', 'Post-close integration planning'],
  },
  {
    title: 'Corporate Governance',
    description: 'The architecture beneath every important decision. Boards, bylaws, committees, compliance.',
    includes: ['Board composition & structuring', 'Governance policies & procedures', 'Compliance programs', 'Board training & education'],
  },
  {
    title: 'Commercial Contracts',
    description: 'Agreements that balance legal protection with the business outcome you actually want.',
    includes: ['Strategic partnerships & JVs', 'Distribution & licensing deals', 'Software & SaaS agreements', 'Vendor & supplier contracts'],
  },
  {
    title: 'Financing & Capital',
    description: 'Navigate debt and equity financing — from structure through documentation, with the covenants you can live with.',
    includes: ['Debt facility negotiation', 'Equity financing strategy', 'Warrant & option structures', 'Covenant negotiation'],
  },
  {
    title: 'Employment & Executive',
    description: 'Executive agreements, incentive plans, and the high-stakes employment matters that decide whether a company keeps its leaders.',
    includes: ['Executive agreements & packages', 'Equity plan design', 'Severance & change-of-control', 'Non-compete & confidentiality'],
  },
  {
    title: 'Strategic Advisory',
    description: 'Ongoing counsel as your company grows. A partner on speed-dial, not a memo factory.',
    includes: ['Strategic consulting', 'Risk assessment & planning', 'Exit preparation', 'Business structure optimization'],
  },
]

const ENGAGEMENT = [
  { t: 'Project-based', d: 'Defined scope and deliverables. Best for specific transactions or matters where outcomes are clear.', price: 'Fixed fee' },
  { t: 'Retainer',      d: 'Ongoing access to our team for general counsel and advisory across the business.',                price: 'Monthly' },
  { t: 'Hybrid',        d: 'A retainer base with project work layered on. The most common shape for growing companies.',     price: 'Flexible' },
]

const PRICING = [
  { t: 'Transparent',      d: 'You know what you are paying before we start. Fixed-fee work means no bill shock at month-end.' },
  { t: 'Efficiency rewarded', d: 'Solve a problem faster, pay less. We are incentivized to be smart, not to bill hours.' },
  { t: 'Aligned',          d: 'Your wins are how we measure ours. We structure outcomes with that in mind from day one.' },
  { t: 'Competitive',      d: 'Fortune 500–quality work at boutique pricing. No premium for prestige, just the value.' },
]

export default function Services() {
  return (
    <main className="relative overflow-hidden">
      <Navbar />
      <ScrollLine />

      {/* HERO */}
      <section className="relative section-pad pt-32 md:pt-44 pb-20 md:pb-28 overflow-hidden">
        <span aria-hidden className="hero-orb accent-breathe top-[15%] -right-[18%] hidden md:block" />
        <div className="max-w-[1440px] mx-auto relative">
          <div className="grid grid-cols-12 gap-6 items-end">
            <div className="col-span-12 md:col-span-2">
              <span className="index-chip">001 — Services</span>
            </div>
            <div className="col-span-12 md:col-span-10">
              <h1 className="display-xl font-serif">
                <span className="block"><SplitReveal trigger="load" delay={0.1}>What we do,</SplitReveal></span>
                <span className="block"><SplitReveal trigger="load" delay={0.3}>and</SplitReveal> <span className="italic-display text-accent-shimmer"><SplitReveal trigger="load" delay={0.5}>how it works.</SplitReveal></span></span>
              </h1>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-6 mt-16 md:mt-24 items-end">
            <div className="col-span-12 md:col-span-5 md:col-start-3">
              <FadeIn>
                <p className="font-serif text-xl md:text-2xl leading-snug text-foreground/90">
                  Six service lines, three engagement models, one bar — work done at the standard you would do it yourself.
                </p>
              </FadeIn>
            </div>
            <div className="col-span-12 md:col-span-4 md:col-start-9">
              <FadeIn delay={0.4} staggerChildren className="flex flex-wrap gap-2">
                {['M&A','Governance','Commercial','Capital','Executive','Advisory'].map((s) => (
                  <span key={s} className="tag">{s}</span>
                ))}
                <span className="tag tag-primary"><span className="dot-live" /> Currently taking new work</span>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="section-pad py-24 md:py-36 border-t-2 border-foreground/30">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-12 gap-6 mb-12 md:mb-20">
            <div className="col-span-12 md:col-span-4">
              <p className="eyebrow text-foreground/75 mb-3">— 002 / Lines</p>
              <h2 className="display-md font-serif">
                <SplitReveal>Six practice lines.</SplitReveal>
              </h2>
            </div>
          </div>

          <Rule className="mb-2" />

          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-foreground/25">
            {SERVICES.map((s, i) => (
              <FadeIn key={i} delay={(i % 2) * 0.08} className={`group p-8 md:p-12 ${i >= 2 ? 'border-t-2 border-foreground/30' : ''}`}>
                <div className="flex items-baseline gap-4 mb-5">
                  <span className="eyebrow text-foreground/65">0{i + 1}</span>
                </div>
                <h3 className="font-serif text-4xl md:text-5xl tracking-[-0.035em] mb-5 group-hover:text-primary transition-colors duration-300">
                  {s.title}
                </h3>
                <p className="text-foreground/75 leading-relaxed mb-6 max-w-md">{s.description}</p>
                <ul className="space-y-2 mb-7">
                  {s.includes.map((it, j) => (
                    <li key={j} className="flex gap-3 text-sm text-foreground/75">
                      <span className="text-primary mt-1">—</span>
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className="link-line eyebrow text-foreground/75 hover:text-primary">
                  Discuss this work →
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ENGAGEMENT */}
      <section className="section-pad py-24 md:py-36 border-t-2 border-foreground/30 bg-secondary">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-12 gap-6 mb-12 md:mb-20">
            <div className="col-span-12 md:col-span-4">
              <p className="eyebrow text-foreground/75 mb-3">— 003 / Engagement</p>
              <h2 className="display-md font-serif">
                <SplitReveal>How we plug in.</SplitReveal>
              </h2>
            </div>
            <div className="col-span-12 md:col-span-6 md:col-start-7">
              <FadeIn>
                <p className="text-foreground/75 leading-relaxed">
                  Three flexible engagement shapes. Pick one or layer them — we adapt to your cadence.
                </p>
              </FadeIn>
            </div>
          </div>

          <Rule className="mb-0" />

          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-foreground/25">
            {ENGAGEMENT.map((m, i) => (
              <FadeIn key={i} delay={i * 0.1} className="p-8 md:p-12">
                <div className="flex items-baseline justify-between mb-6">
                  <span className="eyebrow text-foreground/65">0{i + 1}</span>
                  <span className="eyebrow text-primary">{m.price}</span>
                </div>
                <h3 className="font-serif text-4xl tracking-[-0.035em] mb-5">{m.t}</h3>
                <p className="text-foreground/75 leading-relaxed">{m.d}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING PHILOSOPHY */}
      <section className="section-pad py-24 md:py-36 border-t-2 border-foreground/30">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-12 gap-6 mb-12 md:mb-20">
            <div className="col-span-12 md:col-span-4">
              <p className="eyebrow text-foreground/75 mb-3">— 004 / Pricing</p>
              <h2 className="display-md font-serif">
                <SplitReveal>The bill,</SplitReveal>{' '}
                <span className="italic-display text-primary"><SplitReveal>before the work.</SplitReveal></span>
              </h2>
            </div>
          </div>

          <Rule className="mb-12" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-14">
            {PRICING.map((p, i) => (
              <FadeIn key={i} delay={i * 0.08} className="border-t-2 border-foreground/30 pt-8">
                <div className="flex items-baseline gap-4 mb-5">
                  <span className="eyebrow text-foreground/65">0{i + 1}</span>
                  <h3 className="font-serif text-3xl md:text-5xl tracking-[-0.035em]">{p.t}</h3>
                </div>
                <p className="text-foreground/75 leading-relaxed max-w-md">{p.d}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad py-32 md:py-44 border-t-2 border-foreground/30">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-12 gap-6 items-end">
            <div className="col-span-12 md:col-span-8">
              <p className="eyebrow text-foreground/75 mb-6">— 005 / Engage</p>
              <h2 className="display-lg font-serif">
                <span className="block"><SplitReveal>Pick the shape.</SplitReveal></span>
                <span className="block italic-display text-primary"><SplitReveal>We will pick up.</SplitReveal></span>
              </h2>
            </div>
            <div className="col-span-12 md:col-span-4 flex md:justify-end">
              <Link href="/contact" className="btn-ink">
                <span>Schedule a call</span>
                <span className="arrow-magnet">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
