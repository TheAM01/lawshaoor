import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { SplitReveal } from '@/components/motion/split-reveal'
import { FadeIn } from '@/components/motion/fade-in'
import { PanelImage } from '@/components/panel-image'
import { OrbitRings, GridDots } from '@/components/illustrations'
import { PRACTICES, practiceImage, summarize } from './_data'

export default function PracticeAreas() {
  return (
    <main className="relative overflow-x-clip">
      <Navbar />

      {/* HERO — 60/40 */}
      <section className="relative section-pad pt-32 md:pt-40 pb-16 md:pb-24 bg-fixed-mist overflow-hidden">
        <span aria-hidden className="hero-orb top-[10%] -right-[12%] hidden md:block" />
        <div className="max-w-[1560px] mx-auto relative grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-3">
            <h1 className="display-xl font-display">
              <span className="block"><SplitReveal trigger="load" delay={0.1}>Practice</SplitReveal></span>
              <span className="block text-primary"><SplitReveal trigger="load" delay={0.3}>areas.</SplitReveal></span>
            </h1>
            <FadeIn delay={0.5}>
              <p className="mt-7 text-base md:text-lg leading-relaxed text-foreground/70 max-w-xl">
                Our work is concentrated in sectors where legal complexity is greatest and the cost of imprecision
                is highest. We help clients launch, structure, finance, regulate, protect, defend and scale their
                businesses with greater confidence.
              </p>
            </FadeIn>
          </div>
          <FadeIn delay={0.4} className="lg:col-span-2">
            <div className="relative aspect-[4/5] bg-background-alt border border-foreground/12 overflow-hidden">
              <PanelImage src="/images/seed/practice-areas.jpg" />
              <span aria-hidden className="hero-orb accent-breathe top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-45" />
              <OrbitRings className="absolute inset-0 m-auto w-[80%] h-[80%] opacity-70" uid="pa-hero-orbit" rotate={false} />
              <GridDots className="absolute right-5 top-5 w-20 h-20 opacity-70" uid="pa-hero-gd" />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* INDEX — image cards, illustration overlaid; each opens its own page */}
      <section className="section-pad py-16 md:py-24 border-t border-foreground/12 bg-background-alt">
        <div className="max-w-[1560px] mx-auto">
          <div className="flex items-center gap-4 mb-10">
            <span className="eyebrow text-foreground/55 whitespace-nowrap">{PRACTICES.length} practice areas</span>
            <span className="block h-px flex-1 bg-foreground/12" />
          </div>
          <FadeIn staggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-foreground/12 border border-foreground/12">
            {PRACTICES.map((p) => (
              <Link key={p.id} href={`/practice-areas/${p.id}`} className="group flex flex-col bg-background">
                <div className="relative aspect-[4/3] bg-background-alt overflow-hidden flex items-center justify-center">
                  <PanelImage src={practiceImage(p.id)} className="transition-transform duration-700 group-hover:scale-[1.04]" />
                  <p.Illo
                    className="relative w-1/2 h-2/3 transition-transform duration-500 group-hover:scale-110"
                    uid={`pa-card-${p.id}`}
                  />
                </div>
                <div className="flex flex-col flex-1 gap-3 p-7 md:p-9 border-t border-foreground/12">
                  <h2 className="font-display text-2xl md:text-[1.6rem] leading-tight group-hover:text-primary transition-colors">{p.title}</h2>
                  <p className="text-sm md:text-base text-foreground/65 leading-relaxed">{summarize(p)}</p>
                  <span
                    aria-hidden
                    className="mt-auto pt-3 self-end text-sm text-foreground/40 group-hover:text-primary group-hover:translate-x-1 transition-all"
                  >
                    →
                  </span>
                </div>
              </Link>
            ))}
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="relative section-pad py-28 md:py-40 border-t border-foreground/12 bg-fixed-deep overflow-hidden">
        <div className="max-w-[1560px] mx-auto relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8 space-y-6">
              <span className="eyebrow text-foreground/55">Get in touch</span>
              <h2 className="display-lg font-display">
                <span className="block"><SplitReveal>Have a matter</SplitReveal></span>
                <span className="block text-primary"><SplitReveal>in mind?</SplitReveal></span>
              </h2>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-3 lg:items-end">
              <Link href="/contact" className="btn-primary">
                <span>Schedule a Consultation</span>
              </Link>
              <Link href="/people" className="btn-ghost">
                <span>Meet the team</span>
              </Link>
            </div>
          </div>
        </div>
      </section>


      <Footer />
    </main>
  )
}
