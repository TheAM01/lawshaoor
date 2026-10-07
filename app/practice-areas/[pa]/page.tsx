import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { SplitReveal } from '@/components/motion/split-reveal'
import { FadeIn } from '@/components/motion/fade-in'
import { PanelImage } from '@/components/panel-image'
import { PRACTICES, getPractice, practiceImage, summarize } from '../_data'

type Props = { params: Promise<{ pa: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return PRACTICES.map((p) => ({ pa: p.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { pa } = await params
  const p = getPractice(pa)
  if (!p) return {}
  return {
    title: `${p.title} — LawShaoor Chambers`,
    description: summarize(p, 160),
  }
}

export default async function PracticeArea({ params }: Props) {
  const { pa } = await params
  const p = getPractice(pa)
  if (!p) notFound()

  const others = PRACTICES.filter((x) => x.id !== p.id)
  const Illo = p.Illo
  // The first paragraph introduces the practice in the hero; the overview carries the rest.
  const [intro, ...rest] = p.paragraphs

  return (
    <main className="relative overflow-x-clip">
      <Navbar />

      {/* HERO — 60/40 */}
      <section className="relative section-pad pt-32 md:pt-40 pb-16 md:pb-24 bg-fixed-mist overflow-hidden">
        <span aria-hidden className="hero-orb top-[10%] -right-[12%] hidden md:block" />
        <div className="max-w-[1560px] mx-auto relative grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-3">
            <h1 className="display-lg font-display text-primary max-w-3xl">
              <SplitReveal trigger="load" delay={0.1}>{p.title}</SplitReveal>
            </h1>
            {p.tagline && (
              <FadeIn delay={0.3}>
                <p className="mt-5 font-display text-lg md:text-xl leading-snug text-foreground/85 max-w-xl">
                  {p.tagline}
                </p>
              </FadeIn>
            )}
            <FadeIn delay={0.4}>
              <p className="mt-5 text-sm md:text-base leading-relaxed text-foreground/65 max-w-xl">
                {intro}
              </p>
            </FadeIn>
          </div>
          <FadeIn delay={0.3} className="lg:col-span-2">
            <div className="relative aspect-[4/5] bg-background-alt border border-foreground/12 overflow-hidden flex items-center justify-center">
              <PanelImage src={practiceImage(p.id)} />
              <span aria-hidden className="hero-orb accent-breathe top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-45" />
              <Illo className="relative w-3/5 h-3/5" uid={`pa-hero-${p.id}`} />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* BODY — 60/40 */}
      <section className="relative section-pad py-20 md:py-28 border-t border-foreground/12 bg-background">
        <div className="max-w-[1560px] mx-auto grid grid-cols-1 lg:grid-cols-5 gap-x-12 gap-y-14">
          <div className="lg:col-span-3">
            <span className="index-chip mb-10 inline-flex">Overview</span>
            <FadeIn className="space-y-5 max-w-2xl">
              {rest.map((para, j) => (
                <p key={j} className="text-base md:text-lg leading-relaxed text-foreground/75">
                  {para}
                </p>
              ))}
            </FadeIn>

            <div className="mt-16">
              <span className="eyebrow text-foreground/55">What we handle</span>
              <FadeIn staggerChildren className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
                {p.bullets.map((b, j) => (
                  <div key={j} className="group border border-foreground/12 bg-card p-5 md:p-6 flex items-start gap-3 hover:bg-primary transition-colors">
                    <span aria-hidden className="block w-3 h-px bg-primary group-hover:bg-primary-foreground mt-3 shrink-0 transition-colors" />
                    <span className="text-sm md:text-base text-foreground/85 group-hover:text-primary-foreground transition-colors">{b}</span>
                  </div>
                ))}
              </FadeIn>
            </div>
          </div>

          <aside className="lg:col-span-2">
            <div className="lg:sticky lg:top-[128px] space-y-8">
              {p.keys.length > 0 && (
                <div className="space-y-3">
                  <span className="eyebrow text-foreground/55">Key authorities & frameworks</span>
                  <FadeIn staggerChildren className="border-t border-foreground/12">
                    {p.keys.map((t, j) => (
                      <div key={j} className="flex items-start gap-3 py-3 border-b border-foreground/12">
                        <span aria-hidden className="text-primary mt-1.5 text-xs">◆</span>
                        <div className="flex-1">
                          <p className="font-display text-base md:text-lg">{t.name}</p>
                          <p className="text-sm text-foreground/60 mt-0.5">{t.detail}</p>
                        </div>
                      </div>
                    ))}
                  </FadeIn>
                </div>
              )}

              <div className="surface bracketed p-6 md:p-8 space-y-5">
                <p className="font-display text-2xl leading-tight">Have a {p.short.toLowerCase()} matter?</p>
                <p className="text-sm text-foreground/65 leading-relaxed">
                  Talk to the partner who will actually run it. No intake funnel.
                </p>
                <Link href="/contact" className="btn-primary w-full justify-center">
                  <span>Schedule a call</span>
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* OTHER PRACTICES */}
      <section className="section-pad py-16 md:py-24 border-t border-foreground/12 bg-background">
        <div className="max-w-[1560px] mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <span className="eyebrow text-foreground/55 whitespace-nowrap">Other practice areas</span>
            <span className="block h-px flex-1 bg-foreground/12" />
          </div>
          <div className="flex flex-wrap gap-2">
            {others.map((o) => (
              <Link
                key={o.id}
                href={`/practice-areas/${o.id}`}
                className="tag hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
              >
                {o.short}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
