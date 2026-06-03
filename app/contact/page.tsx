'use client'

import { useState } from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { SplitReveal } from '@/components/motion/split-reveal'
import { FadeIn } from '@/components/motion/fade-in'
import { Rule } from '@/components/motion/rule'
import {
  CirclesInCircumference,
  VectorNode,
  GridDots,
  StackedCubes,
  OrbitRings,
  HexagonalCascade,
  SquareCascade,
} from '@/components/illustrations'

const PRACTICE_OPTIONS = [
  'Banking & Finance',
  'Corporate & Commercial',
  'Energy & Natural Resources',
  'Construction & Operation',
  'Dispute Resolution & Arbitration',
  'Mergers & Acquisitions',
  'Government Sector',
  'Telecommunication & Information Technology',
  'Healthcare & Pharmaceuticals',
  'Labour & Employment',
  'Non-Profit',
  'UAE & Cross-Border Practice',
  'Something else',
]

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <main className="relative overflow-hidden">
      <Navbar />

      {/* HERO */}
      <section className="relative section-pad pt-32 md:pt-44 pb-16 md:pb-20 bg-fixed-mist overflow-hidden">
        <span aria-hidden className="hero-orb accent-breathe top-[15%] -right-[15%] hidden md:block" />
        <CirclesInCircumference className="absolute -left-16 top-8 w-[300px] h-[300px] opacity-30 hidden md:block" uid="ct-hero-circ" />
        <VectorNode className="absolute -right-8 -bottom-8 w-44 h-44 opacity-35 hidden md:block" uid="ct-hero-vn" />

        <div className="max-w-[1440px] mx-auto relative">
          <div className="mb-10 md:mb-14">
            <Breadcrumbs items={[{ label: 'Contact' }]} className="mb-8" />
            <span className="index-chip">001 · Contact</span>
          </div>

          <h1 className="display-xl font-display">
            <span className="block"><SplitReveal trigger="load" delay={0.1}>Let&apos;s</SplitReveal></span>
            <span className="block text-gradient"><SplitReveal trigger="load" delay={0.3}>talk.</SplitReveal></span>
          </h1>

          <div className="grid grid-cols-12 gap-6 mt-12 md:mt-16 items-end">
            <div className="col-span-12 md:col-span-5 md:col-start-3">
              <FadeIn>
                <p className="font-heading text-xl md:text-2xl leading-snug text-foreground/90 tracking-[-0.01em]">
                  Tell us about your matter. We&apos;ll review the brief and be in touch with next steps.
                </p>
              </FadeIn>
            </div>
            <div className="col-span-12 md:col-span-4 md:col-start-9 flex flex-wrap gap-2">
              <span className="tag tag-primary"><span className="dot-live" /> Confidential intake</span>
              <span className="tag">Islamabad chambers</span>
            </div>
          </div>
        </div>
      </section>

      {/* FORM + AT-A-GLANCE */}
      <section className="section-pad py-16 md:py-24 border-t border-foreground/15 bg-background-alt relative overflow-hidden">
        <OrbitRings className="absolute -right-32 top-12 w-[420px] h-[420px] opacity-30 hidden md:block" uid="ct-form-orb" rotate />
        <CirclesInCircumference className="absolute -left-12 -bottom-8 w-56 h-56 opacity-40 hidden md:block float-soft" uid="ct-form-circ" />
        <div className="max-w-[1440px] mx-auto grid grid-cols-12 gap-8 md:gap-16 relative">
          {/* FORM */}
          <div className="col-span-12 md:col-span-7">
            <span className="index-chip">002 · The brief</span>

            {submitted ? (
              <FadeIn className="border border-primary/50 p-10 md:p-12 bg-primary/5 mt-6 bracketed">
                <h2 className="display-sm font-display mb-4">Got it.</h2>
                <p className="text-foreground/85 text-lg leading-relaxed max-w-md font-heading tracking-[-0.005em]">
                  Thank you — your brief has been received. We will review and be in touch.
                </p>
              </FadeIn>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  setSubmitted(true)
                }}
                className="space-y-2 mt-6"
              >
                <FadeIn staggerChildren className="space-y-2">
                  <div className="field">
                    <label>Name</label>
                    <input type="text" required placeholder="Who's writing?" />
                  </div>
                  <div className="field">
                    <label>Company / Organization</label>
                    <input type="text" placeholder="If applicable" />
                  </div>
                  <div className="field">
                    <label>Email</label>
                    <input type="email" required placeholder="you@company.com" />
                  </div>
                  <div className="field">
                    <label>Practice area of interest</label>
                    <select required defaultValue="">
                      <option value="" disabled>Choose one</option>
                      {PRACTICE_OPTIONS.map((opt) => (
                        <option key={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                  <div className="field">
                    <label>The matter</label>
                    <textarea required placeholder="A paragraph is plenty. What is the actual issue?" />
                  </div>
                </FadeIn>

                <FadeIn delay={0.2} className="pt-6">
                  <button type="submit" className="btn-primary">
                    <span>Send Message</span>
                    <span className="arrow-magnet">→</span>
                  </button>
                </FadeIn>
              </form>
            )}
          </div>

          {/* AT-A-GLANCE */}
          <aside className="col-span-12 md:col-span-4 md:col-start-9 space-y-8">
            <FadeIn className="surface bracketed p-6 md:p-8">
              <div className="flex items-center justify-between mb-4">
                <span className="index-chip">Chambers</span>
                <span className="dot-live" />
              </div>
              <div className="h-px bg-foreground/25 mb-4" />
              <p className="font-display text-xl tracking-[-0.015em] mb-1">Islamabad</p>
              <p className="text-sm text-foreground/75 font-heading tracking-[-0.005em] leading-relaxed">
                Office No. 204, Millennium Heights<br />
                F-11 Markaz<br />
                Islamabad, 44000
              </p>
              <Rule className="my-5" />
              <p className="font-display text-xl tracking-[-0.015em] mb-1">Online</p>
              <ul className="text-sm space-y-1 font-mono tracking-[0.18em] uppercase">
                <li><a href="https://www.lawshaoor.com" className="link-line">www.lawshaoor.com</a></li>
              </ul>
            </FadeIn>

            <FadeIn delay={0.2} className="space-y-3">
              <span className="eyebrow text-foreground/65">— Associated offices</span>
              <p className="font-heading text-sm text-foreground/80 leading-relaxed tracking-[-0.005em]">
                Associated offices in other major cities of Pakistan.
              </p>
            </FadeIn>

            <FadeIn delay={0.3} className="space-y-3">
              <span className="eyebrow text-foreground/65">— Associated firm</span>
              <p className="font-heading text-sm text-foreground/80 leading-relaxed tracking-[-0.005em]">
                M.B. KEMP (ME) LLP — Hong Kong · London · Milan · Abu Dhabi
              </p>
            </FadeIn>

            <GridDots className="w-44 h-44 opacity-90" uid="ct-aside-gd" />
          </aside>
        </div>
      </section>

      {/* WHAT TO EXPECT */}
      <section className="relative section-pad py-24 md:py-36 border-t border-foreground/15 bg-fixed-deep overflow-hidden">
        <HexagonalCascade className="absolute -left-24 -bottom-12 w-[360px] h-[360px] opacity-30 hidden md:block" uid="ct-cta-hex" />
        <StackedCubes className="absolute right-12 -top-8 w-40 h-56 opacity-55 hidden md:block float-soft" uid="ct-cta-stk" />
        <SquareCascade className="absolute right-1/3 bottom-8 w-32 h-32 opacity-40 hidden lg:block" uid="ct-cta-sq" />
        <div className="max-w-[1440px] mx-auto relative">
          <div className="grid grid-cols-12 gap-6 mb-12 md:mb-16">
            <div className="col-span-12 md:col-span-5 space-y-4">
              <span className="index-chip">003 · How we engage</span>
              <h2 className="display-md font-display">
                <SplitReveal>From inbox to</SplitReveal>{' '}
                <span className="text-gradient"><SplitReveal>first call.</SplitReveal></span>
              </h2>
            </div>
          </div>

          <Rule className="rule-heavy mb-0" />

          <FadeIn staggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-px bg-foreground/15">
            {[
              { n: '01', t: 'Listen.',   d: 'We read your brief in full to understand the commercial objective and the regulatory context.' },
              { n: '02', t: 'Simplify.', d: 'We translate complex legal issues into clear, practical options that are legally sound and commercially workable.' },
              { n: '03', t: 'Engage.',   d: 'If we are a fit, we proceed with advisory and contentious work — focused on professionalism, efficiency, and the best interests of the client.' },
            ].map((s) => (
              <div key={s.n} className="bg-background p-8 md:p-10">
                <span className="font-display text-5xl md:text-6xl text-gradient block mb-4">{s.n}</span>
                <h3 className="font-display text-2xl md:text-3xl tracking-[-0.02em] mb-3">{s.t}</h3>
                <p className="text-foreground/80 leading-relaxed font-heading tracking-[-0.005em]">{s.d}</p>
              </div>
            ))}
          </FadeIn>
        </div>
      </section>

      <Footer />
    </main>
  )
}
