'use client'

import { useState } from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { SplitReveal } from '@/components/motion/split-reveal'
import { FadeIn } from '@/components/motion/fade-in'
import { Rule } from '@/components/motion/rule'
import { ScrollLine } from '@/components/motion/scroll-line'
import { Counter } from '@/components/motion/counter'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <main className="relative overflow-hidden">
      <Navbar />
      <ScrollLine />

      {/* HERO */}
      <section className="relative section-pad pt-32 md:pt-44 pb-16 md:pb-20 overflow-hidden">
        <span aria-hidden className="hero-orb accent-breathe top-[15%] -right-[15%] hidden md:block" />
        <div className="max-w-[1440px] mx-auto relative">
          <div className="grid grid-cols-12 gap-6 items-end">
            <div className="col-span-12 md:col-span-2">
              <span className="index-chip">001 — Contact</span>
            </div>
            <div className="col-span-12 md:col-span-10">
              <h1 className="display-xl font-serif">
                <span className="block"><SplitReveal trigger="load" delay={0.1}>Let's</SplitReveal></span>
                <span className="block italic-display text-accent-shimmer"><SplitReveal trigger="load" delay={0.3}>talk.</SplitReveal></span>
              </h1>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-6 mt-12 md:mt-16 items-end">
            <div className="col-span-12 md:col-span-5 md:col-start-3">
              <FadeIn>
                <p className="font-serif text-xl md:text-2xl leading-snug text-foreground/90">
                  Tell us about your matter. We will respond within 24 hours with next steps — not a form letter.
                </p>
              </FadeIn>
            </div>
            <div className="col-span-12 md:col-span-4 md:col-start-9 flex flex-wrap gap-2">
              <span className="tag tag-primary"><span className="dot-live" /> Replies under 24h</span>
              <span className="tag">NDA on request</span>
              <span className="tag">Confidential intake</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad py-16 md:py-24 border-t-2 border-foreground/30">
        <div className="max-w-[1440px] mx-auto grid grid-cols-12 gap-8 md:gap-16">
          {/* FORM */}
          <div className="col-span-12 md:col-span-7">
            <p className="eyebrow text-foreground/75 mb-6">— 002 / The brief</p>

            {submitted ? (
              <FadeIn className="border border-primary/40 p-10 md:p-12 bg-primary/5">
                <h2 className="display-sm font-serif mb-4">Got it.</h2>
                <p className="text-foreground/85 text-lg leading-relaxed max-w-md">
                  We will be in touch within 24 hours. If it is urgent, call us directly at{' '}
                  <a href="tel:+12125559000" className="link-line text-primary">+1 (212) 555-9000</a>.
                </p>
              </FadeIn>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  setSubmitted(true)
                }}
                className="space-y-2"
              >
                <FadeIn staggerChildren className="space-y-2">
                  <div className="field">
                    <label>Name</label>
                    <input type="text" required placeholder="Who's writing?" />
                  </div>
                  <div className="field">
                    <label>Company</label>
                    <input type="text" placeholder="Where you operate" />
                  </div>
                  <div className="field">
                    <label>Email</label>
                    <input type="email" required placeholder="you@company.com" />
                  </div>
                  <div className="field">
                    <label>Phone</label>
                    <input type="tel" placeholder="Optional — if you prefer a call" />
                  </div>
                  <div className="field">
                    <label>Matter type</label>
                    <select defaultValue="">
                      <option value="" disabled>Choose a practice area</option>
                      <option value="ma">M&A & Transactions</option>
                      <option value="governance">Corporate Governance</option>
                      <option value="commercial">Commercial Contracts</option>
                      <option value="financing">Financing & Capital</option>
                      <option value="executive">Employment & Executive</option>
                      <option value="advisory">Strategic Advisory</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="field">
                    <label>What's the situation?</label>
                    <textarea rows={5} placeholder="The actual problem, not the cleaned-up version." />
                  </div>
                </FadeIn>

                <FadeIn delay={0.2} className="pt-10 flex flex-col sm:flex-row gap-4 items-start">
                  <button type="submit" className="btn-ink">
                    <span>Send the brief</span>
                    <span className="arrow-magnet">→</span>
                  </button>
                  <p className="text-xs text-foreground/75 max-w-xs leading-relaxed">
                    Submitting doesn't create an attorney-client relationship. We will confirm before any privileged exchange.
                  </p>
                </FadeIn>
              </form>
            )}
          </div>

          {/* SIDECAR */}
          <div className="col-span-12 md:col-span-4 md:col-start-9 space-y-12">
            <FadeIn>
              <p className="eyebrow text-foreground/75 mb-6">— 003 / Direct lines</p>
              <ul className="space-y-7">
                <li>
                  <p className="eyebrow text-foreground/65 mb-1">Email</p>
                  <a href="mailto:hello@lawshaoor.com" className="font-serif text-2xl md:text-3xl tracking-[-0.02em] link-line">
                    hello@lawshaoor.com
                  </a>
                  <p className="text-sm text-foreground/75 mt-1">Response within 24 hours</p>
                </li>
                <li>
                  <p className="eyebrow text-foreground/65 mb-1">Phone</p>
                  <a href="tel:+12125559000" className="font-serif text-2xl md:text-3xl tracking-[-0.02em] link-line">
                    +1 (212) 555-9000
                  </a>
                  <p className="text-sm text-foreground/75 mt-1">Mon–Fri, 9am–6pm ET</p>
                </li>
                <li>
                  <p className="eyebrow text-foreground/65 mb-1">Studio</p>
                  <p className="font-serif text-2xl md:text-3xl tracking-[-0.02em] leading-snug">
                    500 Fifth Avenue<br />New York, NY 10110
                  </p>
                  <p className="text-sm text-foreground/75 mt-1">Virtual meetings on request</p>
                </li>
              </ul>
            </FadeIn>

            <Rule />

            <FadeIn staggerChildren className="grid grid-cols-2 gap-x-4 gap-y-8">
              {[
                { v: 24, suffix: 'h', label: 'Response time' },
                { v: 20, suffix: '+', label: 'Years on the desk' },
                { v: 6,  suffix: '',  label: 'Service lines' },
                { v: 98, suffix: '%', label: 'Client retention' },
              ].map((s, i) => (
                <div key={i}>
                  <div className="font-serif text-4xl md:text-5xl tracking-[-0.035em] text-primary">
                    <Counter value={s.v} suffix={s.suffix} />
                  </div>
                  <p className="eyebrow text-foreground/75 mt-1">{s.label}</p>
                </div>
              ))}
            </FadeIn>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
