'use client'

import Link from 'next/link'
import { MapPin, Mail, ArrowUpRight, Linkedin } from 'lucide-react'
import { FadeIn } from '@/components/motion/fade-in'
import { getIllustration } from '@/components/illustrations/registry'
import type { TeamListItem } from '@/lib/models/team'

export function TeamGrid({ team }: { team: TeamListItem[] }) {
  return (
    <FadeIn staggerChildren className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-foreground/12 border border-foreground/12">
      {team.map((p) => {
        const Illo = getIllustration(p.illustrationKey)
        return (
          <div
            key={p.slug}
            className="group relative bg-background p-5 md:p-7 flex flex-row gap-5 md:gap-7 hover:bg-background-alt transition-colors"
          >
            {/* Photo / illustration — left (≈40%) */}
            <Link
              href={`/people/${p.slug}`}
              className="relative w-32 sm:w-40 md:w-44 shrink-0 aspect-[4/5] bg-background-alt border border-foreground/12 overflow-hidden flex items-center justify-center"
              aria-label={p.name}
            >
              {p.photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.photo} alt={p.name} className="w-full h-full object-cover" />
              ) : (
                <Illo className="w-[80%] h-[80%] opacity-90" uid={`card-${p.slug}`} />
              )}
            </Link>

            {/* Identity — right (≈60%) */}
            <div className="flex-1 min-w-0 flex flex-col justify-center gap-3">
              <Link href={`/people/${p.slug}`}>
                <h2 className="font-display text-xl md:text-2xl text-foreground group-hover:text-primary transition-colors">
                  {p.name}
                </h2>
                <p className="eyebrow text-foreground/55 mt-1.5">{p.title}</p>
              </Link>

              <div className="space-y-1.5">
                {p.location && (
                  <span className="flex items-center gap-2 text-sm text-foreground/65">
                    <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                    {p.location}
                  </span>
                )}
                {p.email && (
                  <span className="flex items-center gap-2 text-sm text-foreground/65 break-all">
                    <Mail className="w-3.5 h-3.5 text-primary shrink-0" />
                    {p.email}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 mt-1.5">
                <Link
                  href={`/people/${p.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs tracking-[0.06em] uppercase text-primary hover:text-primary-hover transition-colors"
                >
                  Profile <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
                {p.linkedin && (
                  <a
                    href={p.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${p.name} on LinkedIn`}
                    className="inline-flex items-center justify-center w-8 h-8 border border-foreground/20 text-foreground/70 hover:border-primary hover:text-primary hover:bg-primary/8 transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        )
      })}
    </FadeIn>
  )
}
