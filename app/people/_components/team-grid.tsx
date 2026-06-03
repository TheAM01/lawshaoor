'use client'

import Link from 'next/link'
import { MapPin, Mail, ArrowUpRight } from 'lucide-react'
import { FadeIn } from '@/components/motion/fade-in'
import { getIllustration } from '@/components/illustrations/registry'
import type { TeamListItem } from '@/lib/models/team'

export function TeamGrid({ team }: { team: TeamListItem[] }) {
  return (
    <FadeIn staggerChildren className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-foreground/12 border border-foreground/12">
      {team.map((p, i) => {
        const Illo = getIllustration(p.illustrationKey)
        return (
          <Link
            key={p.slug}
            href={`/people/${p.slug}`}
            className="group relative bg-background p-5 md:p-6 flex flex-row gap-5 md:gap-6 hover:bg-background-alt transition-colors"
          >
            {/* Photo / illustration — left */}
            <div className="relative w-28 sm:w-36 md:w-40 shrink-0 aspect-[4/5] bg-background-alt border border-foreground/12 overflow-hidden flex items-center justify-center">
              {p.photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.photo} alt={p.name} className="w-full h-full object-cover" />
              ) : (
                <Illo className="w-[80%] h-[80%] opacity-90" uid={`card-${p.slug}`} />
              )}
              <span className="absolute top-2 left-2 index-chip">{String(i + 1).padStart(2, '0')}</span>
            </div>

            {/* Identity — right */}
            <div className="flex-1 min-w-0 flex flex-col justify-center gap-3">
              <div>
                <h2 className="font-display text-xl md:text-2xl tracking-[-0.02em] text-foreground group-hover:text-primary transition-colors">
                  {p.name}
                </h2>
                <p className="eyebrow text-foreground/60 mt-1">{p.title}</p>
              </div>

              <div className="space-y-1.5">
                {p.location && (
                  <span className="flex items-center gap-2 text-sm text-foreground/70 font-heading">
                    <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                    {p.location}
                  </span>
                )}
                {p.email && (
                  <span className="flex items-center gap-2 text-sm text-foreground/70 font-heading break-all">
                    <Mail className="w-3.5 h-3.5 text-primary shrink-0" />
                    {p.email}
                  </span>
                )}
              </div>
            </div>

            <span className="absolute top-4 right-4 text-foreground/40 group-hover:text-primary transition-colors">
              <ArrowUpRight className="w-4 h-4" />
            </span>
          </Link>
        )
      })}
    </FadeIn>
  )
}
