import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { SplitReveal } from '@/components/motion/split-reveal'
import { FadeIn } from '@/components/motion/fade-in'
import { Rule } from '@/components/motion/rule'
import { TesseractCube, VectorNode, OrbitRings } from '@/components/illustrations'
import { getSiteSettings } from '@/lib/server/settings'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'LawShaoor Magazine — Legal Review & Commentary',
  description: 'LawShaoor Magazine — a digital legal publication and review from LawShaoor Chambers. Commentary on corporate, banking, energy, regulatory and cross-border law across Pakistan, the UAE, DIFC and ADGM. Subscribe on Substack.',
  keywords: ['LawShaoor Magazine', 'LawShaoor Review', 'Pakistan law magazine', 'legal commentary Pakistan', 'corporate law review', 'law Substack'],
}

export default async function Magazine() {
  const { magazine: m } = await getSiteSettings()
  if (!m.visible) notFound()

  return (
    <main className="relative overflow-hidden">
      <Navbar />

      {/* HERO */}
      <section className="relative section-pad pt-32 md:pt-44 pb-20 md:pb-28 bg-fixed-mist overflow-hidden">
        <span aria-hidden className="hero-orb accent-breathe top-[8%] -right-[12%] hidden md:block" />
        <TesseractCube className="absolute -left-10 bottom-4 w-48 h-48 opacity-35 hidden md:block float-soft" uid="mag-hero-tc" />
        <div className="max-w-[1440px] mx-auto relative">
          <Breadcrumbs items={[{ label: 'Academy', href: '/lawshaoor-academy' }, { label: 'Magazine' }]} className="mb-8" />
          <div className="mb-10 md:mb-14">
            <span className="index-chip">{m.eyebrow}</span>
          </div>
          <h1 className="display-xl font-display">
            <span className="block"><SplitReveal trigger="load" delay={0.1}>{m.title}</SplitReveal></span>
            <span className="block text-gradient"><SplitReveal trigger="load" delay={0.3}>{m.subtitle}</SplitReveal></span>
          </h1>
          <div className="grid grid-cols-12 gap-6 mt-12 md:mt-20">
            <div className="col-span-12 md:col-span-7 md:col-start-3">
              <FadeIn>
                <p className="font-heading text-xl md:text-2xl leading-snug text-foreground/90 tracking-[-0.01em]">
                  {m.intro}
                </p>
              </FadeIn>
              <FadeIn delay={0.15} className="mt-8 flex flex-col sm:flex-row gap-3">
                {m.substackUrl && (
                  <a href={m.substackUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
                    <span>Subscribe on Substack</span>
                    <span className="arrow-magnet">→</span>
                  </a>
                )}
                <Link href="/lawshaoor-academy" className="btn-ghost">
                  <span>Browse the Academy</span>
                  <span className="arrow-magnet">→</span>
                </Link>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* SECTIONS */}
      {m.sections.length > 0 && (
        <section className="section-pad py-20 md:py-28 border-t border-foreground/15 bg-background">
          <div className="max-w-[1440px] mx-auto">
            <span className="index-chip mb-10 inline-flex">In each issue</span>
            <Rule className="mb-12" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-foreground/12 border border-foreground/12">
              {m.sections.map((s, i) => (
                <FadeIn key={i} delay={i * 0.06} className="bg-background p-8 md:p-10 space-y-3">
                  <span className="eyebrow text-foreground/55">{String(i + 1).padStart(2, '0')}</span>
                  <h2 className="font-display text-2xl tracking-[-0.02em]">{s.title}</h2>
                  <p className="font-heading text-base text-foreground/80 leading-relaxed">{s.body}</p>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="relative section-pad py-32 md:py-44 border-t border-foreground/15 bg-fixed-deep overflow-hidden">
        <OrbitRings className="absolute -left-20 -top-12 w-[420px] h-[420px] opacity-30 hidden md:block" uid="mag-cta-orb" rotate />
        <VectorNode className="absolute right-12 bottom-8 w-44 h-44 opacity-40 hidden md:block" uid="mag-cta-vn" />
        <div className="max-w-[1440px] mx-auto relative">
          <div className="grid grid-cols-12 gap-6 items-end">
            <div className="col-span-12 md:col-span-8 space-y-6">
              <span className="index-chip">Subscribe</span>
              <h2 className="display-lg font-display">
                <span className="block"><SplitReveal>Read the law</SplitReveal></span>
                <span className="block text-gradient"><SplitReveal>before it moves.</SplitReveal></span>
              </h2>
            </div>
            <div className="col-span-12 md:col-span-4 flex flex-col gap-3 md:items-end">
              {m.substackUrl && (
                <a href={m.substackUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
                  <span>Subscribe free</span>
                  <span className="arrow-magnet">→</span>
                </a>
              )}
              <Link href="/contact" className="btn-ghost">
                <span>Get in Touch</span>
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
