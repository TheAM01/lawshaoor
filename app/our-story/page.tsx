'use client'

import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { SectionNav } from '@/components/section-nav'
import { SplitReveal } from '@/components/motion/split-reveal'
import { FadeIn } from '@/components/motion/fade-in'
import { Rule } from '@/components/motion/rule'
import { PanelImage } from '@/components/panel-image'
import { Counter } from '@/components/motion/counter'
import {
  CirclesInCircumference,
  VectorNode,
} from '@/components/illustrations'

const SECTIONS = [
  { id: 'introduction', label: 'Built around consequence' },
  { id: 'approach',     label: 'Our position' },
  { id: 'difference',   label: 'The difference' },
  { id: 'capability',   label: 'Capability' },
  { id: 'association',  label: 'Partnership' },
]

/** What defines the work — from "Our Position" in the client's content doc. */
const PILLARS = [
  'Sector depth',
  'Partner-led attention',
  'Commercially usable advice',
  'Regulatory fluency',
  'Cross-border coordination',
  'Contentious strength',
]

const KEMP_OFFICES = [
  { city: 'Abu Dhabi', region: 'UAE · GCC' },
  { city: 'Dubai',     region: 'UAE · GCC' },
  { city: 'London',    region: 'United Kingdom' },
  { city: 'Milan',     region: 'Europe' },
  { city: 'Hong Kong', region: 'East Asia' },
]

export default function OurStory() {
  return (
    <main className="relative overflow-x-clip">
      <Navbar />

      {/* HERO — 60/40 */}
      <section className="relative section-pad pt-32 md:pt-40 pb-16 md:pb-24 bg-fixed-mist overflow-hidden">
        <span aria-hidden className="hero-orb top-[8%] -right-[12%] hidden md:block" />
        <div className="max-w-[1560px] mx-auto relative grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-3">
            <h1 className="display-xl font-display">
              <span className="block"><SplitReveal trigger="load" delay={0.1}>A specialist law</SplitReveal></span>
              <span className="block">
                <SplitReveal trigger="load" delay={0.3}>firm in </SplitReveal>
                <span className="text-primary"><SplitReveal trigger="load" delay={0.5}>Islamabad.</SplitReveal></span>
              </span>
            </h1>
            <FadeIn delay={0.5}>
              <p className="mt-7 text-sm md:text-base leading-relaxed text-foreground/70 max-w-xl">
                LawShaoor Chambers advises ambitious businesses, financial institutions, investors, technology
                companies and senior decision-makers operating at the intersection of law, commerce and regulation —
                from Islamabad, with associated offices in other major cities of Pakistan and, in strategic
                partnership with M.B. KEMP (ME) LLP, across the UAE, Saudi Arabia and the wider GCC.
              </p>
            </FadeIn>
          </div>

          {/* Right 40% — "at a glance" visual card */}
          <FadeIn delay={0.4} className="lg:col-span-2">
            <div className="relative bg-background-alt border border-foreground/12 p-6 md:p-8 overflow-hidden">
              <span aria-hidden className="hero-orb accent-breathe -right-16 -top-16 opacity-40" />
              <div className="relative flex items-center justify-between mb-4">
                <span className="eyebrow text-foreground/55">At a glance</span>
                <span className="dot-live" />
              </div>
              <div className="h-px bg-foreground/15 mb-4" />
              <ul className="relative space-y-3.5 text-sm">
                {[
                  ['Headquarters', 'Islamabad'],
                  ['Reach', 'Major cities of Pakistan'],
                  ['Lawyers', '6'],
                  ['Combined experience', '50+ years'],
                  ['Practice areas', '10'],
                  ['Strategic partnership', 'M.B. KEMP (ME) LLP'],
                ].map(([k, v], i) => (
                  <li key={i} className="flex justify-between gap-4 items-baseline">
                    <span className="text-foreground/55 text-xs tracking-[0.1em] uppercase">{k}</span>
                    <span className="font-display text-base text-foreground text-right">{v}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </section>

      <SectionNav sections={SECTIONS} label="The Chambers" />

      {/* INTRODUCTION — 60/40, short paragraphs */}
      <section id="introduction" className="section-pad py-20 md:py-28 bg-background relative overflow-x-clip scroll-mt-32">
        <div className="max-w-[1560px] mx-auto relative grid grid-cols-1 lg:grid-cols-5 gap-x-12 gap-y-10">
          <div className="lg:col-span-3 space-y-7">
            <span className="eyebrow text-foreground/55">Who we are</span>
            <h2 className="display-md font-display max-w-2xl">
              <SplitReveal>A boutique law firm</SplitReveal>{' '}
              <span className="text-primary"><SplitReveal>built around consequence.</SplitReveal></span>
            </h2>
            <FadeIn className="space-y-5 text-sm md:text-base leading-relaxed text-foreground/75 max-w-2xl">
              <p>
                LawShaoor Chambers is not structured as a traditional firm that attempts to cover every area of law
                equally. We are built around the matters that shape businesses: whether a digital product can
                legally launch, whether a fintech model can operate within the regulatory framework, whether an
                investment structure protects both founder and investor, whether a cross-border transaction can be
                implemented efficiently, whether valuable technology and data are properly protected, and whether a
                company can respond decisively to regulatory scrutiny or litigation.
              </p>
              <p>
                Our lawyers possess transactional, regulatory and contentious capability, together with a combined
                experience of 50 years. This enables us to see the full legal picture. A financing arrangement may
                also involve licensing, corporate governance, data protection, employment and regulatory issues. A
                technology dispute may involve intellectual property, investment, contractual and criminal exposure.
              </p>
              <p>
                We do not treat these issues in isolation. We bring them together, identify the pressure points and
                give clients a clear route forward.
              </p>
              <p>
                We have also developed strength in sectors that are heavily regulated and commercially sensitive,
                including energy and natural resources. Our lawyers regularly appear before courts, tribunals and
                regulatory authorities across Pakistan.
              </p>
            </FadeIn>
          </div>

          {/* Right 40% — simple office/visual panel */}
          <div className="lg:col-span-2">
            <FadeIn className="lg:sticky lg:top-[120px] relative aspect-[4/5] bg-background-alt border border-foreground/12 overflow-hidden flex items-center justify-center">
              <PanelImage seed="our-story-chambers" />
              <span aria-hidden className="hero-orb accent-breathe top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-40" />
              <CirclesInCircumference className="absolute inset-0 m-auto w-[70%] h-[70%] opacity-70" uid="story-hero-circ" />
              <VectorNode className="absolute right-5 bottom-5 w-20 h-20 opacity-70" uid="story-hero-vn" />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* APPROACH — pillars */}
      <section id="approach" className="section-pad py-20 md:py-28 border-t border-foreground/12 bg-fixed-lavender scroll-mt-32">
        <div className="max-w-[1560px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-10 md:mb-14 lg:items-end">
            <div className="lg:col-span-2 space-y-4">
              <span className="eyebrow text-foreground/55">Our position</span>
              <h2 className="display-sm font-display">
                <SplitReveal>More than a general</SplitReveal>{' '}
                <span className="text-primary"><SplitReveal>legal service.</SplitReveal></span>
              </h2>
            </div>
            <FadeIn className="lg:col-span-3 space-y-5 text-sm md:text-base leading-relaxed text-foreground/75 max-w-2xl">
              <p>
                LawShaoor Chambers is positioned for clients who require more than a general legal service. Our
                work is defined by sector depth, partner-led attention, commercially usable advice, regulatory
                fluency, cross-border coordination and contentious strength when the business environment becomes
                adversarial.
              </p>
              <p>
                We are particularly suited to matters where regulation and innovation collide, where technology is
                central to the business model, where a transaction requires rapid and senior-level execution, or
                where the client is facing significant regulatory or contentious exposure.
              </p>
            </FadeIn>
          </div>

          <Rule className="rule-heavy mb-10" />

          <FadeIn staggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0">
            {PILLARS.map((t, i) => (
              <div key={t} className="az-card">
                <span className="eyebrow text-foreground/50">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="font-display text-2xl md:text-3xl text-primary">{t}</h3>
              </div>
            ))}
          </FadeIn>
        </div>
      </section>

      {/* THE LAWSHAOOR DIFFERENCE */}
      <section id="difference" className="section-pad py-20 md:py-28 border-t border-foreground/12 bg-background scroll-mt-32">
        <div className="max-w-[1560px] mx-auto grid grid-cols-1 lg:grid-cols-5 gap-x-12 gap-y-8">
          <div className="lg:col-span-2 space-y-4">
            <span className="eyebrow text-foreground/55">The LawShaoor difference</span>
            <h2 className="display-md font-display">
              <SplitReveal>Legal judgment,</SplitReveal>{' '}
              <span className="text-primary"><SplitReveal>connected to commercial reality.</SplitReveal></span>
            </h2>
          </div>
          <FadeIn className="lg:col-span-3 space-y-5 text-sm md:text-base leading-relaxed text-foreground/75 max-w-2xl">
            <p>
              There are many firms that provide legal services. LawShaoor Chambers is built for clients who need
              legal judgment connected to commercial reality.
            </p>
            <p>
              We offer the focus of a boutique, the reach of an international relationship and the resilience of a
              disputes practice. Our ambition is not to be the largest firm in Pakistan. It is to be the firm clients
              call when the matter is strategically important, legally difficult and commercially consequential.
            </p>
            <p>
              Whether you are launching a regulated product, structuring an investment, protecting a technology
              platform or defending a high-stakes claim, we help you identify the legal route forward and move with
              confidence.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* CAPABILITY STATS */}
      <section id="capability" className="relative section-pad py-20 md:py-28 border-t border-foreground/12 bg-fixed-deep overflow-hidden scroll-mt-32">
        <div className="max-w-[1560px] mx-auto relative">
          <div className="mb-10 space-y-4">
            <span className="eyebrow text-foreground/55">Capability</span>
            <h2 className="display-md font-display">
              <SplitReveal>At a glance.</SplitReveal>
            </h2>
          </div>

          <Rule className="rule-heavy mb-10" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 md:gap-y-0">
            {[
              { v: 10, suffix: '', label: 'Practice areas' },
              { v: 6, suffix: '', label: 'Lawyers' },
              { v: 50, suffix: '+ yrs', label: 'Combined experience' },
              { v: 1, suffix: '', label: 'Strategic partnership' },
            ].map((s, i) => (
              <FadeIn key={i} delay={i * 0.08} className="relative px-5 md:px-8 first:pl-0 border-l border-foreground/15 first:border-l-0">
                <span aria-hidden className="block w-6 h-px bg-primary mb-3" />
                <div className="display-md font-display">
                  <Counter value={s.v} suffix={s.suffix} />
                </div>
                <p className="eyebrow text-foreground/55 mt-3">{s.label}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* M.B. KEMP ASSOCIATION — 60/40 */}
      <section id="association" className="section-pad py-20 md:py-28 border-t border-foreground/12 bg-background relative overflow-hidden scroll-mt-32">
        <div className="max-w-[1560px] mx-auto relative">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-x-12 gap-y-8 mb-12 md:mb-16">
            <div className="lg:col-span-2 space-y-4">
              <span className="eyebrow text-foreground/55">Strategic partnership</span>
              <h2 className="display-md font-display">
                <SplitReveal>M.B. KEMP</SplitReveal>{' '}
                <span className="text-primary"><SplitReveal>(ME) LLP.</SplitReveal></span>
              </h2>
            </div>
            <div className="lg:col-span-3 space-y-5 text-sm md:text-base leading-relaxed text-foreground/75">
              <FadeIn><p>LawShaoor Chambers works in strategic partnership with M.B. KEMP (ME) LLP, an international law firm with offices in Abu Dhabi, Dubai, London, Milan and Hong Kong.</p></FadeIn>
              <FadeIn delay={0.1}><p>Through this partnership, we support clients operating between Pakistan and the GCC, with a particular focus on the UAE and Saudi Arabia, as well as matters involving DIFC, ADGM and other international jurisdictions. We aim to provide a unified legal strategy across the relevant jurisdictions, rather than disconnected advice from separate teams.</p></FadeIn>
              <FadeIn delay={0.2}><p>The partnership strengthens our cross-border capability and lets us draw on the experience of a global team recognized for corporate, banking and finance, restructuring, international arbitration and complex dispute resolution.</p></FadeIn>
            </div>
          </div>

          <Rule className="rule-heavy mb-10" />

          <FadeIn staggerChildren className="grid grid-cols-2 md:grid-cols-5 gap-px bg-foreground/12 border border-foreground/12">
            {KEMP_OFFICES.map((c) => (
              <div key={c.city} className="bg-background p-8 md:p-10 flex flex-col gap-2 last:col-span-2 md:last:col-span-1">
                <span className="eyebrow text-foreground/50">M.B. KEMP office</span>
                <p className="font-display text-2xl md:text-3xl">{c.city}</p>
                <p className="text-sm text-foreground/60 tracking-[0.12em] uppercase mt-1">{c.region}</p>
              </div>
            ))}
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="relative section-pad py-28 md:py-40 border-t border-foreground/12 bg-fixed-deep overflow-hidden">
        <div className="max-w-[1560px] mx-auto relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8 space-y-6">
              <span className="eyebrow text-foreground/55">Work with us</span>
              <h2 className="display-lg font-display">
                <span className="block"><SplitReveal>Meet the people</SplitReveal></span>
                <span className="block text-primary"><SplitReveal>behind the work.</SplitReveal></span>
              </h2>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-3 lg:items-end">
              <Link href="/people" className="btn-primary"><span>Meet the team</span></Link>
              <Link href="/contact" className="btn-ghost"><span>Contact</span></Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
