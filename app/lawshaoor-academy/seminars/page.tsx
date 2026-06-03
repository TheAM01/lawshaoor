import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { SplitReveal } from '@/components/motion/split-reveal'
import { FadeIn } from '@/components/motion/fade-in'
import { Rule } from '@/components/motion/rule'
import { HexagonalCascade, OrbitRings, SquareCascade } from '@/components/illustrations'
import { getSiteSettings } from '@/lib/server/settings'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Seminars & Training — LawShaoor Academy',
  description: 'Seminars, workshops and continuing legal education from LawShaoor Academy. Practical training on corporate governance, banking regulation, data protection, energy law and cross-border practice for in-house teams and lawyers.',
  keywords: ['legal seminars Pakistan', 'corporate law training', 'CLE Pakistan', 'compliance workshop', 'LawShaoor Academy seminars'],
}

export default async function Seminars() {
  const { seminars: s } = await getSiteSettings()
  if (!s.visible) notFound()

  return (
    <main className="relative overflow-hidden">
      <Navbar />

      {/* HERO */}
      <section className="relative section-pad pt-32 md:pt-44 pb-20 md:pb-28 bg-fixed-mist overflow-hidden">
        <span aria-hidden className="hero-orb accent-breathe top-[8%] -right-[12%] hidden md:block" />
        <HexagonalCascade className="absolute -left-16 bottom-0 w-72 h-72 opacity-30 hidden md:block" uid="sem-hero-hex" />
        <div className="max-w-[1440px] mx-auto relative">
          <Breadcrumbs items={[{ label: 'Academy', href: '/lawshaoor-academy' }, { label: 'Seminars' }]} className="mb-8" />
          <div className="mb-10 md:mb-14">
            <span className="index-chip">{s.eyebrow}</span>
          </div>
          <h1 className="display-xl font-display">
            <span className="block"><SplitReveal trigger="load" delay={0.1}>{s.title}</SplitReveal></span>
            <span className="block text-gradient"><SplitReveal trigger="load" delay={0.3}>{s.subtitle}</SplitReveal></span>
          </h1>
          <div className="grid grid-cols-12 gap-6 mt-12 md:mt-20">
            <div className="col-span-12 md:col-span-7 md:col-start-3">
              <FadeIn>
                <p className="font-heading text-xl md:text-2xl leading-snug text-foreground/90 tracking-[-0.01em]">
                  {s.intro}
                </p>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* FORMATS */}
      <section className="section-pad py-20 md:py-28 border-t border-foreground/15 bg-background">
        <div className="max-w-[1440px] mx-auto">
          {s.formats.length > 0 && (
            <>
              <span className="index-chip mb-10 inline-flex">Formats</span>
              <Rule className="mb-12" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-foreground/12 border border-foreground/12">
                {s.formats.map((f, i) => (
                  <FadeIn key={i} delay={i * 0.06} className="bg-background p-8 md:p-10 space-y-3">
                    <span className="eyebrow text-foreground/55">{String(i + 1).padStart(2, '0')}</span>
                    <h2 className="font-display text-2xl tracking-[-0.02em]">{f.title}</h2>
                    <p className="font-heading text-base text-foreground/80 leading-relaxed">{f.body}</p>
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
              <span>Request a session</span>
              <span className="arrow-magnet">→</span>
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="relative section-pad py-32 md:py-44 border-t border-foreground/15 bg-fixed-deep overflow-hidden">
        <OrbitRings className="absolute -left-20 -top-12 w-[420px] h-[420px] opacity-30 hidden md:block" uid="sem-cta-orb" rotate />
        <SquareCascade className="absolute right-12 top-12 w-32 h-32 opacity-40 hidden lg:block" uid="sem-cta-sq" />
        <div className="max-w-[1440px] mx-auto relative">
          <div className="grid grid-cols-12 gap-6 items-end">
            <div className="col-span-12 md:col-span-8 space-y-6">
              <span className="index-chip">Get in Touch</span>
              <h2 className="display-lg font-display">
                <span className="block"><SplitReveal>Train with</SplitReveal></span>
                <span className="block text-gradient"><SplitReveal>practitioners.</SplitReveal></span>
              </h2>
            </div>
            <div className="col-span-12 md:col-span-4 flex flex-col gap-3 md:items-end">
              <Link href="/contact" className="btn-primary">
                <span>Book a seminar</span>
                <span className="arrow-magnet">→</span>
              </Link>
              <Link href="/lawshaoor-academy" className="btn-ghost">
                <span>Back to Academy</span>
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
