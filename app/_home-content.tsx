'use client'

import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { SectionNav } from '@/components/section-nav'
import { PanelImage } from '@/components/panel-image'
import { SplitReveal } from '@/components/motion/split-reveal'
import { FadeIn } from '@/components/motion/fade-in'
import { Rule } from '@/components/motion/rule'
import { Counter } from '@/components/motion/counter'
import { HeroStatus } from '@/components/hero-status'
import {
  CirclesInCircumference,
  OrbitRings,
  VectorNode,
} from '@/components/illustrations'

const SECTIONS = [
  { id: 'chambers',    label: 'The Chambers' },
  { id: 'capability',  label: 'Capability' },
  { id: 'difference',  label: 'Difference' },
  { id: 'partnership', label: 'Partnership' },
  { id: 'contact',     label: 'Contact' },
]

export function HomeContent() {
  return (
    <main className="relative overflow-x-clip">
      <Navbar />

      {/* ────────────────────────────────────────────
          HERO — split-screen 60/40
          ──────────────────────────────────────────── */}
      <section className="relative min-h-[92svh] section-pad bg-fixed-mist overflow-hidden flex items-center pt-28 md:pt-32 pb-16">
        <span aria-hidden className="hero-orb top-[6%] -right-[10%] hidden md:block" />

        <div className="max-w-[1560px] mx-auto w-full relative grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-center">
          {/* LEFT — 60% */}
          <div className="lg:col-span-3">
            <h1 className="display-hero font-display">
              <span className="block"><SplitReveal trigger="load" delay={0.1}>The law firm for</SplitReveal></span>
              <span className="block text-primary"><SplitReveal trigger="load" delay={0.28}>Pakistan’s next economy.</SplitReveal></span>
            </h1>

            <FadeIn delay={0.7}>
              <p className="mt-7 md:mt-9 text-base md:text-lg leading-relaxed text-foreground/70 max-w-xl">
                We are a specialist Pakistani law firm advising ambitious businesses, financial institutions,
                investors, technology companies and senior decision-makers operating at the intersection of law,
                commerce and regulation.
              </p>
            </FadeIn>
          </div>

          {/* RIGHT — 40% : abstract, professional visual panel */}
          <FadeIn delay={0.5} className="lg:col-span-2">
            <div className="relative aspect-[4/5] bg-background-alt border border-foreground/12 overflow-hidden">
              <PanelImage seed="lawshaoor-chambers" />
              <span aria-hidden className="hero-orb accent-breathe top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-50" />
              <OrbitRings className="absolute inset-0 m-auto w-[78%] h-[78%] opacity-70" uid="hero-orbit" rotate />
              <CirclesInCircumference className="absolute right-5 top-5 w-20 h-20 opacity-80" uid="hero-c1" />
              <VectorNode className="absolute left-5 bottom-5 w-24 h-24 opacity-70" uid="hero-vn" />
              <div className="absolute left-6 bottom-6 right-6">
                <span className="eyebrow text-foreground/50">International partner</span>
                <p className="font-display text-xl font-semibold mt-1 text-foreground/85">M.B. KEMP (ME) LLP</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Sticky path bar */}
      <SectionNav sections={SECTIONS} label="On this page" />

      {/* ────────────────────────────────────────────
          THE CHAMBERS — intro
          ──────────────────────────────────────────── */}
      <section id="chambers" className="section-pad py-20 md:py-28 border-t border-foreground/12 bg-background scroll-mt-32">
        <div className="max-w-[1560px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-3 space-y-7">
              <span className="eyebrow text-foreground/55">The Chambers</span>
              <FadeIn>
                <p className="font-display text-xl md:text-[1.4rem] leading-snug text-foreground max-w-xl">
                  Legal advice cannot remain confined to legal theory or standard documentation.
                  LawShaoor Chambers is built for precisely that environment.
                </p>
              </FadeIn>
              <FadeIn className="space-y-4 text-sm md:text-[0.95rem] text-foreground/70 leading-relaxed max-w-xl">
                <p>
                  Pakistan’s business environment is entering a more complex and consequential era. Technology is
                  transforming financial services, capital is moving across borders, artificial intelligence is
                  reshaping business models, digital platforms are changing how people work, transact and consume
                  services — and regulators are imposing greater scrutiny on businesses operating in financial,
                  technological and other sensitive sectors.
                </p>
                <p>
                  Businesses need counsel that understands the commercial objective, the regulatory architecture,
                  the technology, the people involved and the consequences of getting the legal structure wrong.
                </p>
                <p>
                  Our work is concentrated in sectors where legal complexity is greatest and the cost of imprecision
                  is highest. We help clients launch, structure, finance, regulate, protect, defend and scale their
                  businesses with greater confidence.
                </p>
              </FadeIn>
              <FadeIn staggerChildren className="flex flex-col sm:flex-row gap-3 items-start pt-1">
                <Link href="/our-story" className="btn-primary">
                  <span>About the Chambers</span>
                </Link>
                <Link href="/practice-areas" className="btn-ghost">
                  <span>See practice areas</span>
                </Link>
              </FadeIn>
            </div>
            <div className="lg:col-span-2">
              <HeroStatus />
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────
          CAPABILITY SNAPSHOT
          ──────────────────────────────────────────── */}
      <section id="capability" className="relative section-pad py-24 md:py-32 border-t border-foreground/12 bg-fixed-mist overflow-hidden scroll-mt-32">
        <div className="max-w-[1560px] mx-auto relative">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-16 md:mb-20 lg:items-end">
            <div className="lg:col-span-3 space-y-4">
              <span className="eyebrow text-foreground/55">Capability</span>
              <h2 className="display-sm font-display">
                <SplitReveal>At a glance.</SplitReveal>
              </h2>
            </div>
            <div className="lg:col-span-2">
              <FadeIn>
                <p className="text-foreground/70 leading-relaxed">
                  Our lawyers possess transactional, regulatory and contentious capability. This enables us to
                  see the full legal picture.
                </p>
              </FadeIn>
            </div>
          </div>

          <Rule className="rule-heavy mb-10" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 md:gap-y-0">
            {[
              { v: 10, suffix: '', label: 'Practice areas' },
              { v: 6, suffix: '', label: 'Lawyers on the bench' },
              { v: 4, suffix: '', label: 'Partner firms' },
              { v: 50, suffix: '+ yrs', label: 'Combined experience' },
            ].map((s, i) => (
              <FadeIn key={i} delay={i * 0.08} className="relative px-5 md:px-8 first:pl-0 border-l border-foreground/15 first:border-l-0">
                <span aria-hidden className="block w-6 h-px bg-primary mb-3" />
                <div className="display-md font-display text-foreground">
                  <Counter value={s.v} suffix={s.suffix} />
                </div>
                <p className="eyebrow text-foreground/55 mt-3">{s.label}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────
          THE LAWSHAOOR DIFFERENCE
          ──────────────────────────────────────────── */}
      <section id="difference" className="section-pad py-24 md:py-32 border-t border-foreground/12 bg-background scroll-mt-32">
        <div className="max-w-[1560px] mx-auto grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
          <div className="lg:col-span-2 space-y-4">
            <span className="eyebrow text-foreground/55">The LawShaoor difference</span>
            <h2 className="display-md font-display">
              <SplitReveal>Legal judgment,</SplitReveal>{' '}
              <span className="text-primary"><SplitReveal>connected to commercial reality.</SplitReveal></span>
            </h2>
          </div>
          <div className="lg:col-span-3 space-y-7">
            <FadeIn className="space-y-5 text-base md:text-lg leading-relaxed text-foreground/75 max-w-2xl">
              <p>
                We offer the focus of a boutique, the reach of an international relationship and the resilience of
                a disputes practice.
              </p>
              <p>
                Our ambition is not to be the largest firm in Pakistan. It is to be the firm clients call when the
                matter is strategically important, legally difficult and commercially consequential.
              </p>
            </FadeIn>
            <FadeIn staggerChildren className="flex flex-col sm:flex-row gap-3 items-start">
              <Link href="/our-story" className="btn-ghost">
                <span>Why LawShaoor</span>
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────
          STRATEGIC PARTNERSHIP — M.B. KEMP
          ──────────────────────────────────────────── */}
      <section id="partnership" className="relative section-pad py-24 md:py-32 border-t border-foreground/12 bg-background overflow-hidden scroll-mt-32">
        <div className="max-w-[1560px] mx-auto relative">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-12 md:mb-16 lg:items-end">
            <div className="lg:col-span-3 space-y-4">
              <span className="eyebrow text-foreground/55">International reach</span>
              <h2 className="display-md font-display">
                <SplitReveal>Strategic partnership</SplitReveal>{' '}
                <span className="text-primary"><SplitReveal>with M.B. KEMP (ME) LLP.</SplitReveal></span>
              </h2>
            </div>
            <div className="lg:col-span-2">
              <FadeIn>
                <p className="text-foreground/70 leading-relaxed">
                  An international law firm with offices across the Gulf, Europe and Asia. Together, we support
                  clients operating between Pakistan and the GCC with a unified legal strategy, rather than
                  disconnected advice from separate teams.
                </p>
              </FadeIn>
            </div>
          </div>

          <FadeIn staggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-0 mb-12">
            {[
              { j: 'Pakistan',     d: 'Islamabad headquarters, with associated offices in other major cities.' },
              { j: 'UAE',          d: 'Free-zone & onshore arrangements across the Emirates.' },
              { j: 'DIFC',         d: 'Dubai International Financial Centre structures.' },
              { j: 'ADGM',         d: 'Abu Dhabi Global Market structures.' },
              { j: 'Saudi Arabia', d: 'Market entry, investment & regulatory coordination.' },
            ].map((x) => (
              <div key={x.j} className="az-card">
                <h3 className="font-display text-2xl md:text-3xl">{x.j}</h3>
                <p className="text-sm text-foreground/65 leading-snug">{x.d}</p>
              </div>
            ))}
          </FadeIn>

          <div className="flex items-center gap-4 mb-10">
            <span className="eyebrow text-foreground/55 whitespace-nowrap">Offices</span>
            <Rule className="rule-heavy flex-1" />
          </div>

          <FadeIn staggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-0">
            {[
              'Abu Dhabi',
              'Dubai',
              'London',
              'Milan',
              'Hong Kong',
            ].map((city) => (
              <div key={city} className="az-card">
                <h3 className="font-display text-2xl md:text-3xl">{city}</h3>
              </div>
            ))}
          </FadeIn>
        </div>
      </section>

      {/* ────────────────────────────────────────────
          CTA
          ──────────────────────────────────────────── */}
      <section id="contact" className="relative section-pad pt-28 md:pt-40 pb-16 md:pb-24 border-t border-foreground/12 bg-fixed-deep overflow-hidden scroll-mt-32">
        <div className="max-w-[1560px] mx-auto relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8 space-y-6">
              <span className="eyebrow text-foreground/55">Next step</span>
              <h2 className="display-lg font-display">
                <span className="block"><SplitReveal>Have a matter</SplitReveal></span>
                <span className="block text-primary"><SplitReveal>to discuss?</SplitReveal></span>
              </h2>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-4 lg:items-end">
              <FadeIn delay={0.2} className="flex flex-col gap-3 lg:items-end">
                <Link href="/contact" className="btn-primary">
                  <span>Schedule a Consultation</span>
                </Link>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
