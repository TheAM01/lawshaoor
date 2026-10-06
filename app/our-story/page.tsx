'use client'

import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { SectionNav } from '@/components/section-nav'
import { SplitReveal } from '@/components/motion/split-reveal'
import { FadeIn } from '@/components/motion/fade-in'
import { Rule } from '@/components/motion/rule'
import { PanelImage } from '@/components/panel-image'
import {
  CirclesInCircumference,
  VectorNode,
} from '@/components/illustrations'

const SECTIONS = [
  { id: 'introduction', label: 'Built around consequence' },
  { id: 'approach',     label: 'Our position' },
  { id: 'difference',   label: 'The difference' },
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
              <span className="block"><SplitReveal trigger="load" delay={0.1}>A specialist</SplitReveal></span>
              <span className="block text-primary"><SplitReveal trigger="load" delay={0.3}>law firm.</SplitReveal></span>
            </h1>
            <FadeIn delay={0.5}>
              <p className="mt-7 text-base md:text-lg leading-relaxed text-foreground/70 max-w-xl">
                We advise businesses, financial institutions, investors and technology companies where law, commerce
                and regulation meet. Six lawyers, ten practice areas, 50+ years’ combined experience. Based in
                Islamabad, with reach across Pakistan and the GCC through M.B. KEMP (ME) LLP.
              </p>
            </FadeIn>
          </div>
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
            <FadeIn className="space-y-5 text-base md:text-lg leading-relaxed text-foreground/75 max-w-2xl">
              <p>
                We don’t try to cover every area of law. We focus on what shapes a business: launching a product,
                running a fintech model, structuring an investment, protecting technology and data, and answering
                regulators or litigation.
              </p>
              <p>
                With 50 years’ combined transactional, regulatory and contentious experience, we see the whole
                picture, find the pressure points and give clients a clear route forward.
              </p>
              <p>
                We regularly appear before courts, tribunals and regulators across Pakistan, including in energy and
                other heavily regulated sectors.
              </p>
            </FadeIn>
          </div>

          {/* Right 40% — simple office/visual panel */}
          <div className="lg:col-span-2">
            <FadeIn className="lg:sticky lg:top-[120px] relative aspect-[4/5] bg-background-alt border border-foreground/12 overflow-hidden flex items-center justify-center">
              <PanelImage src="/images/seed/our-story-chambers.jpg" />
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
            <FadeIn className="lg:col-span-3 space-y-5 text-base md:text-lg leading-relaxed text-foreground/75 max-w-2xl">
              <p>
                Sector depth, partner-led attention, advice you can actually use, and real strength when things turn
                adversarial.
              </p>
              <p>
                We’re at our best where regulation meets innovation, where a deal needs senior speed, or where the
                exposure is serious.
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
          <FadeIn className="lg:col-span-3 space-y-5 text-base md:text-lg leading-relaxed text-foreground/75 max-w-2xl">
            <p>
              The focus of a boutique, the reach of an international partnership and the resilience of a disputes
              practice.
            </p>
            <p>
              We don’t aim to be Pakistan’s largest firm. We aim to be the one you call when the matter is difficult
              and the stakes are high.
            </p>
          </FadeIn>
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
            <div className="lg:col-span-3 space-y-5 text-base md:text-lg leading-relaxed text-foreground/75">
              <FadeIn><p>We work in strategic partnership with M.B. KEMP (ME) LLP — offices in Abu Dhabi, Dubai, London, Milan and Hong Kong.</p></FadeIn>
              <FadeIn delay={0.1}><p>For clients working between Pakistan and the GCC, including DIFC and ADGM matters, that means one legal strategy instead of disconnected advice from separate teams.</p></FadeIn>
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
