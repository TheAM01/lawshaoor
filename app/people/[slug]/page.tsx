import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MapPin, Mail, Linkedin } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { SplitReveal } from '@/components/motion/split-reveal'
import { FadeIn } from '@/components/motion/fade-in'
import { Rule } from '@/components/motion/rule'
import { OrbitRings, HexagonalCascade } from '@/components/illustrations'
import { getIllustration } from '@/components/illustrations/registry'
import { getTeam, getTeamMember } from '@/lib/server/team'


export async function generateStaticParams() {
  const team = await getTeam()
  return team.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const person = await getTeamMember(slug)
  if (!person) return { title: 'Team' }
  const desc = person.bio[0]?.slice(0, 180) ?? ''
  return {
    title: `${person.name} — ${person.title}`,
    description: desc,
    openGraph: { title: `${person.name} — ${person.title}`, description: desc },
  }
}

export default async function PersonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const person = await getTeamMember(slug)
  if (!person) notFound()

  const { name, title, location, email, linkedin, photo, focus, bio, highlights, illustrationKey } = person
  const Illo = getIllustration(illustrationKey)

  return (
    <main className="relative overflow-x-clip">
      <Navbar />

      {/* HERO */}
      <section className="relative section-pad pt-32 md:pt-40 pb-16 md:pb-20 bg-fixed-mist overflow-hidden">
        <span aria-hidden className="hero-orb accent-breathe top-[6%] -right-[14%] hidden md:block" />
        <div className="max-w-[1560px] mx-auto relative">
          <div className="grid grid-cols-12 gap-6 md:gap-10 items-end">
            <div className="col-span-12 md:col-span-8 space-y-5">
              {focus && <p className="eyebrow text-primary">— {focus}</p>}
              <h1 className="display-lg font-display tracking-[-0.025em]">
                <SplitReveal trigger="load">{name}</SplitReveal>
              </h1>
              {title && <p className="eyebrow text-foreground/70 font-mono tracking-[0.18em] uppercase">{title}</p>}

              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2">
                {location && (
                  <span className="flex items-center gap-2 text-sm text-foreground/80 font-heading">
                    <MapPin className="w-4 h-4 text-primary" />
                    {location}
                  </span>
                )}
                {email && (
                  <a href={`mailto:${email}`} className="flex items-center gap-2 text-sm text-foreground/80 link-line hover:text-primary transition-colors">
                    <Mail className="w-4 h-4 text-primary" />
                    {email}
                  </a>
                )}
                {linkedin && (
                  <a href={linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-foreground/80 link-line hover:text-primary transition-colors">
                    <Linkedin className="w-4 h-4 text-primary" />
                    LinkedIn
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BODY */}
      <section className="relative section-pad py-16 md:py-24 border-t border-foreground/15 bg-background overflow-hidden">
        <HexagonalCascade className="absolute -left-24 -bottom-12 w-72 h-72 opacity-25 hidden md:block" uid={`person-${slug}-hex`} />
        <div className="max-w-[1560px] mx-auto relative">
          <div className="grid grid-cols-12 gap-6 md:gap-10">
            {/* Left: portrait + highlights */}
            <div className="col-span-12 md:col-span-4">
              <FadeIn className="surface bracketed p-6 md:p-8">
                <div className="aspect-[4/5] bg-background-alt border border-foreground/15 flex items-center justify-center overflow-hidden">
                  {photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={photo} alt={name} className="w-full h-full object-cover" />
                  ) : (
                    <Illo className="w-[85%] h-[85%]" uid={`person-${slug}-illo`} />
                  )}
                </div>
              </FadeIn>

              {highlights.length > 0 && (
                <FadeIn delay={0.15} className="mt-6 space-y-3">
                  <span className="eyebrow text-foreground/65">— Highlights</span>
                  <ul className="space-y-3">
                    {highlights.map((h, k) => (
                      <li key={k} className="border-b border-foreground/15 pb-3">
                        <p className="eyebrow text-foreground/55 mb-1">{h.label}</p>
                        <p className="font-heading text-base text-foreground/90 tracking-[-0.005em]">{h.value}</p>
                      </li>
                    ))}
                  </ul>
                </FadeIn>
              )}

              {(email || linkedin) && (
                <FadeIn delay={0.25} className="mt-6 flex flex-col gap-3">
                  {email && (
                    <a href={`mailto:${email}`} className="btn-primary w-full justify-center">
                      <span>Email {name.split(' ')[0]}</span>
                    </a>
                  )}
                  {linkedin && (
                    <a href={linkedin} target="_blank" rel="noopener noreferrer" className="btn-ghost w-full justify-center">
                      <Linkedin className="w-4 h-4" />
                      <span>LinkedIn profile</span>
                    </a>
                  )}
                </FadeIn>
              )}
            </div>

            {/* Right: bio */}
            <div className="col-span-12 md:col-span-8 lg:col-span-7 lg:col-start-6 space-y-6">
              <Rule className="rule-heavy" />
              <FadeIn staggerChildren className="space-y-5 font-heading text-base md:text-lg leading-relaxed text-foreground/85 tracking-[-0.005em] max-w-2xl">
                {bio.map((para, j) => (
                  <p key={j}>{para}</p>
                ))}
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative section-pad py-24 md:py-32 border-t border-foreground/15 bg-fixed-deep overflow-hidden">
        <OrbitRings className="absolute -left-20 -top-12 w-[420px] h-[420px] opacity-30 hidden md:block" uid={`person-${slug}-cta-orb`} rotate />
        <div className="max-w-[1560px] mx-auto relative">
          <div className="grid grid-cols-12 gap-6 items-end">
            <div className="col-span-12 md:col-span-8 space-y-5">
              <span className="eyebrow text-foreground/55">Get in touch</span>
              <h2 className="display-md font-display">
                <SplitReveal>Work with our team.</SplitReveal>
              </h2>
            </div>
            <div className="col-span-12 md:col-span-4 flex flex-col gap-3 md:items-end">
              <Link href="/contact" className="btn-primary">
                <span>Contact</span>
              </Link>
              <Link href="/people" className="btn-ghost">
                <span>Back to team</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
