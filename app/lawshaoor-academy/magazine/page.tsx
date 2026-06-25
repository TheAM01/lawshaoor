import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { SplitReveal } from '@/components/motion/split-reveal'
import { FadeIn } from '@/components/motion/fade-in'
import { Rule } from '@/components/motion/rule'
import { SectionNav } from '@/components/section-nav'
import { TesseractCube, VectorNode, OrbitRings } from '@/components/illustrations'
import { PanelImage } from '@/components/panel-image'
import { getSiteSettings } from '@/lib/server/settings'


export const metadata: Metadata = {
  title: 'LawShaoor Magazine — Legal Review & Commentary',
  description: 'LawShaoor Magazine — a digital legal publication and review from LawShaoor Chambers. Commentary on corporate, banking, energy, regulatory and cross-border law across Pakistan, the UAE, DIFC and ADGM. Subscribe on Substack.',
  keywords: ['LawShaoor Magazine', 'LawShaoor Review', 'Pakistan law magazine', 'legal commentary Pakistan', 'corporate law review', 'law Substack'],
}

export default async function Magazine() {
  const { magazine: m } = await getSiteSettings()
  if (!m.visible) notFound()

  return (
    <main className="relative overflow-x-clip">
      <Navbar />

      {/* HERO — 60/40 */}
      <section className="relative section-pad pt-32 md:pt-40 pb-16 md:pb-24 bg-fixed-mist overflow-x-clip">
        <span aria-hidden className="hero-orb top-[10%] -right-[12%] hidden md:block" />
        <div className="max-w-[1560px] mx-auto relative grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-3">
            <Breadcrumbs items={[{ label: 'Academy', href: '/lawshaoor-academy' }, { label: 'Magazine' }]} className="mb-7" />
            <span className="eyebrow text-foreground/55">{m.eyebrow}</span>
            <h1 className="display-xl font-display mt-5">
              <span className="block"><SplitReveal trigger="load" delay={0.1}>{m.title}</SplitReveal></span>
              <span className="block text-primary"><SplitReveal trigger="load" delay={0.3}>{m.subtitle}</SplitReveal></span>
            </h1>
            <FadeIn delay={0.5}>
              <p className="mt-7 text-base md:text-lg leading-relaxed text-foreground/70 max-w-xl">
                {m.intro}
              </p>
            </FadeIn>
            <FadeIn delay={0.6} className="mt-8 flex flex-col sm:flex-row gap-3">
              {m.substackUrl && (
                <a href={m.substackUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
                  <span>Subscribe on Substack</span>
                </a>
              )}
              <Link href="/lawshaoor-academy" className="btn-ghost">
                <span>Browse the Academy</span>
              </Link>
            </FadeIn>
          </div>
          <FadeIn delay={0.4} className="lg:col-span-2 hidden lg:block">
            <div className="relative aspect-[4/5] bg-background-alt border border-foreground/12 overflow-hidden flex items-center justify-center">
              <PanelImage seed="magazine" />
              <span aria-hidden className="hero-orb accent-breathe top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-45" />
              <TesseractCube className="absolute inset-0 m-auto w-[58%] h-[58%] opacity-70" uid="mag-hero-tc" />
            </div>
          </FadeIn>
        </div>
      </section>

      <SectionNav
        sections={[
          { id: 'issue', label: 'In each issue' },
          { id: 'subscribe', label: 'Subscribe' },
        ]}
        label="Magazine"
      />

      {/* SECTIONS */}
      {m.sections.length > 0 && (
        <section id="issue" className="section-pad py-20 md:py-28 border-t border-foreground/15 bg-background scroll-mt-32">
          <div className="max-w-[1560px] mx-auto">
            <span className="index-chip mb-10 inline-flex">In each issue</span>
            <Rule className="mb-12" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
              {m.sections.map((s, i) => (
                <FadeIn key={i} delay={i * 0.06} className="az-card">
                  <span aria-hidden className="az-mark block w-7 h-px mb-1" />
                  <h2 className="font-display text-2xl">{s.title}</h2>
                  <p className="text-base text-foreground/65 leading-relaxed">{s.body}</p>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section id="subscribe" className="relative section-pad py-32 md:py-44 border-t border-foreground/15 bg-fixed-deep overflow-x-clip scroll-mt-32">
        <OrbitRings className="absolute -left-20 -top-12 w-[420px] h-[420px] opacity-30 hidden md:block" uid="mag-cta-orb" rotate />
        <VectorNode className="absolute right-12 bottom-8 w-44 h-44 opacity-40 hidden md:block" uid="mag-cta-vn" />
        <div className="max-w-[1560px] mx-auto relative">
          <div className="grid grid-cols-12 gap-6 items-end">
            <div className="col-span-12 md:col-span-8 space-y-6">
              <span className="index-chip">Subscribe</span>
              <h2 className="display-lg font-display">
                <span className="block"><SplitReveal>Read the law</SplitReveal></span>
                <span className="block text-primary"><SplitReveal>before it moves.</SplitReveal></span>
              </h2>
            </div>
            <div className="col-span-12 md:col-span-4 flex flex-col gap-3 md:items-end">
              {m.substackUrl && (
                <a href={m.substackUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
                  <span>Subscribe free</span>                </a>
              )}
              <Link href="/contact" className="btn-ghost">
                <span>Get in Touch</span>
                              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
