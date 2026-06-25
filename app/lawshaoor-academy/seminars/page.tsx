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
import { HexagonalCascade, OrbitRings, SquareCascade } from '@/components/illustrations'
import { PanelImage } from '@/components/panel-image'
import { getSiteSettings } from '@/lib/server/settings'


export const metadata: Metadata = {
  title: 'Seminars & Training — LawShaoor Academy',
  description: 'Seminars, workshops and continuing legal education from LawShaoor Academy. Practical training on corporate governance, banking regulation, data protection, energy law and cross-border practice for in-house teams and lawyers.',
  keywords: ['legal seminars Pakistan', 'corporate law training', 'CLE Pakistan', 'compliance workshop', 'LawShaoor Academy seminars'],
}

export default async function Seminars() {
  const { seminars: s } = await getSiteSettings()
  if (!s.visible) notFound()

  return (
    <main className="relative overflow-x-clip">
      <Navbar />

      {/* HERO — 60/40 */}
      <section className="relative section-pad pt-32 md:pt-40 pb-16 md:pb-24 bg-fixed-mist overflow-x-clip">
        <span aria-hidden className="hero-orb top-[10%] -right-[12%] hidden md:block" />
        <div className="max-w-[1560px] mx-auto relative grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-3">
            <Breadcrumbs items={[{ label: 'Academy', href: '/lawshaoor-academy' }, { label: 'Seminars' }]} className="mb-7" />
            <span className="eyebrow text-foreground/55">{s.eyebrow}</span>
            <h1 className="display-xl font-display mt-5">
              <span className="block"><SplitReveal trigger="load" delay={0.1}>{s.title}</SplitReveal></span>
              <span className="block text-primary"><SplitReveal trigger="load" delay={0.3}>{s.subtitle}</SplitReveal></span>
            </h1>
            <FadeIn delay={0.5}>
              <p className="mt-7 text-base md:text-lg leading-relaxed text-foreground/70 max-w-xl">
                {s.intro}
              </p>
            </FadeIn>
          </div>
          <FadeIn delay={0.4} className="lg:col-span-2 hidden lg:block">
            <div className="relative aspect-[4/5] bg-background-alt border border-foreground/12 overflow-hidden flex items-center justify-center">
              <PanelImage seed="seminars" />
              <span aria-hidden className="hero-orb accent-breathe top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-45" />
              <HexagonalCascade className="absolute inset-0 m-auto w-[60%] h-[60%] opacity-70" uid="sem-hero-hex" />
            </div>
          </FadeIn>
        </div>
      </section>

      <SectionNav
        sections={[
          { id: 'formats', label: 'Formats' },
          { id: 'contact', label: 'Get in touch' },
        ]}
        label="Seminars"
      />

      {/* FORMATS */}
      <section id="formats" className="section-pad py-20 md:py-28 border-t border-foreground/15 bg-background scroll-mt-32">
        <div className="max-w-[1560px] mx-auto">
          {s.formats.length > 0 && (
            <>
              <span className="index-chip mb-10 inline-flex">Formats</span>
              <Rule className="mb-12" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                {s.formats.map((f, i) => (
                  <FadeIn key={i} delay={i * 0.06} className="az-card">
                    <span aria-hidden className="az-mark block w-7 h-px mb-1" />
                    <h2 className="font-display text-2xl">{f.title}</h2>
                    <p className="text-base text-foreground/65 leading-relaxed">{f.body}</p>
                  </FadeIn>
                ))}
              </div>
            </>
          )}
          <FadeIn className="mt-12 surface bracketed p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="eyebrow text-foreground/55">— Upcoming</span>
              <p className="font-display text-2xl tracking-[-0.02em]">{s.upcomingTitle}</p>
              <p className="font-heading text-base text-foreground/75">{s.upcomingNote}</p>
            </div>
            <Link href="/contact" className="btn-primary shrink-0">
              <span>Request a session</span>            </Link>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="relative section-pad py-32 md:py-44 border-t border-foreground/15 bg-fixed-deep overflow-x-clip scroll-mt-32">
        <OrbitRings className="absolute -left-20 -top-12 w-[420px] h-[420px] opacity-30 hidden md:block" uid="sem-cta-orb" rotate />
        <SquareCascade className="absolute right-12 top-12 w-32 h-32 opacity-40 hidden lg:block" uid="sem-cta-sq" />
        <div className="max-w-[1560px] mx-auto relative">
          <div className="grid grid-cols-12 gap-6 items-end">
            <div className="col-span-12 md:col-span-8 space-y-6">
              <span className="index-chip">Get in Touch</span>
              <h2 className="display-lg font-display">
                <span className="block"><SplitReveal>Train with</SplitReveal></span>
                <span className="block text-primary"><SplitReveal>practitioners.</SplitReveal></span>
              </h2>
            </div>
            <div className="col-span-12 md:col-span-4 flex flex-col gap-3 md:items-end">
              <Link href="/contact" className="btn-primary">
                <span>Book a seminar</span>
                              </Link>
              <Link href="/lawshaoor-academy" className="btn-ghost">
                <span>Back to Academy</span>
                              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
