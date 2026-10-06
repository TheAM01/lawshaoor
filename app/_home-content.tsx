'use client'

import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { PanelImage } from '@/components/panel-image'
import { SplitReveal } from '@/components/motion/split-reveal'
import { FadeIn } from '@/components/motion/fade-in'
import { Rule } from '@/components/motion/rule'
import { cn } from '@/lib/utils'
import { ArrowRight } from 'lucide-react'
import {
  CirclesInCircumference,
  OrbitRings,
  StackedCubes,
  TesseractCube,
  VectorNode,
} from '@/components/illustrations'

type Illustration = typeof TesseractCube

/** Legally astute + Commercially aware = The clarity to move forward. */
const EQUATION: {
  label: string
  phrase: [string, string]
  image: string
  Illo: Illustration
  motion: string
  cta: string
  href: string
  operator?: string
  result?: boolean
}[] = [
  { label: '01 · Law',      phrase: ['Legally', 'astute.'],          image: '/images/seed/legally-astute.jpg',              Illo: TesseractCube,           motion: 'group-hover:rotate-[10deg]',    cta: 'Practice areas',     href: '/practice-areas', operator: '+' },
  { label: '02 · Strategy', phrase: ['Commercially', 'aware.'],      image: '/images/seed/commercially-aware.jpg',          Illo: StackedCubes,           motion: 'group-hover:-translate-y-2',    cta: 'The team',           href: '/people',         operator: '=' },
  { label: '03 · Future',   phrase: ['The clarity', 'to move forward.'], image: '/images/seed/the-clarity-to-move-forward.jpg', Illo: CirclesInCircumference, motion: 'group-hover:scale-110',      cta: 'About the Chambers', href: '/our-story',      result: true },
]

/** One term of the equation. Terms rest on paper with a faint photo and turn
 *  into the azure "result" look on hover; the result term is always azure. */
function EquationPanel({ label, phrase, image, Illo, motion, cta, href, operator, result }: (typeof EQUATION)[number]) {
  const ease = 'duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]'
  // Each pair: [result panel — always on, other panels — on hover]. Written out
  // in full so Tailwind can see every class.
  const on = (always: string, hover: string) => (result ? always : hover)
  return (
    <Link
      href={href}
      className={cn(
        'group relative bg-background p-8 md:p-10 min-h-[22rem] lg:min-h-[30rem] flex flex-col justify-between transition-colors',
        ease,
        on('bg-primary', 'hover:bg-primary'),
      )}
    >
      {/* Photo + azure wash, clipped here so the operator can overhang the panel edge */}
      <span aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt=""
          loading="lazy"
          className={cn(
            'absolute inset-0 w-full h-full object-cover grayscale contrast-125 mix-blend-multiply dark:mix-blend-normal dark:brightness-90 opacity-40 transition-[opacity,scale] duration-[1.6s] ease-out group-hover:scale-105',
            on('opacity-35', 'group-hover:opacity-35'),
          )}
        />
        <span className={cn('absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/25 to-transparent opacity-0 transition-opacity', ease, on('opacity-100', 'group-hover:opacity-100'))} />
      </span>

      <div className="relative flex items-start justify-between">
        <span className={cn('font-mono text-[0.68rem] tracking-[0.3em] uppercase text-foreground/50 transition-colors', ease, on('text-primary-foreground/70', 'group-hover:text-primary-foreground/70'))}>
          {label}
        </span>
        <Illo
          uid={`eq-${label.slice(0, 2)}`}
          className={cn(
            'w-24 h-24 md:w-28 md:h-28 opacity-70 transition-[opacity,rotate,translate,scale,filter]',
            ease,
            motion,
            on('opacity-100 brightness-0 invert', 'group-hover:opacity-100 group-hover:brightness-0 group-hover:invert'),
          )}
        />
      </div>

      <div className="relative">
        <span aria-hidden className={cn('block h-px w-8 bg-primary mb-5 transition-[width,background-color]', ease, 'group-hover:w-24', on('bg-primary-foreground', 'group-hover:bg-primary-foreground'))} />
        <h2 className={cn('display-sm font-display transition-colors', ease, on('text-primary-foreground', 'group-hover:text-primary-foreground'))}>
          {phrase[0]}<br />{phrase[1]}
        </h2>
        <span className={cn('mt-8 inline-flex items-center gap-3 font-mono text-[0.68rem] tracking-[0.3em] uppercase text-foreground/55 transition-colors', ease, on('text-primary-foreground/80', 'group-hover:text-primary-foreground/80'))}>
          {cta}
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
        </span>
      </div>

      {operator && <Operator symbol={operator} />}
    </Link>
  )
}

/** Equation operator pinned to a panel's divider — bottom edge when the
 *  panels stack, right edge when they sit side by side. */
function Operator({ symbol }: { symbol: string }) {
  return (
    <span
      aria-hidden
      className="absolute z-10 left-1/2 -bottom-6 -translate-x-1/2 lg:left-auto lg:bottom-auto lg:-right-6 lg:top-1/2 lg:translate-x-0 lg:-translate-y-1/2 w-12 h-12 flex items-center justify-center bg-background border border-foreground/15 font-display text-2xl text-primary"
    >
      {symbol}
    </span>
  )
}

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
              <PanelImage src="/images/seed/lawshaoor.jpg" />
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

      {/* ────────────────────────────────────────────
          THE EQUATION — astute + aware = clarity.
          Three panels read as one sentence; the operators
          sit on the hairline dividers between them.
          ──────────────────────────────────────────── */}
      <section id="approach" className="section-pad py-24 md:py-32 border-t border-foreground/12 bg-background">
        <div className="max-w-[1560px] mx-auto">
          <div className="flex items-center gap-6 mb-12 md:mb-16">
            <span className="index-chip whitespace-nowrap">The LawShaoor equation</span>
            <Rule className="flex-1" />
          </div>

          <FadeIn staggerChildren className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-foreground/12 border border-foreground/12">
            {EQUATION.map((term) => (
              <EquationPanel key={term.label} {...term} />
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
