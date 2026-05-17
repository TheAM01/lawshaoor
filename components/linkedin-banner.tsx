'use client'

import { Linkedin } from 'lucide-react'

const LINKEDIN_URL = 'https://www.linkedin.com/company/lawshaoor-chambers'

export function LinkedInBanner() {
  return (
    <a
      href={LINKEDIN_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="LawShaoor Chambers on LinkedIn"
      className="group fixed right-0 top-1/2 -translate-y-1/2 z-40 hidden md:flex"
    >
      <span
        aria-hidden
        className="absolute -left-px top-1/2 -translate-y-1/2 w-px h-10 bg-gradient-to-b from-transparent via-primary/60 to-transparent transition-all duration-500 group-hover:h-16 group-hover:via-primary"
      />

      <div className="flex flex-col items-center gap-3 py-4 w-7 border-l border-y border-foreground/15 bg-background/85 backdrop-blur-md transition-all duration-500 group-hover:bg-background group-hover:border-primary/40 group-hover:-translate-x-1 group-hover:shadow-[-10px_0_24px_-12px] group-hover:shadow-primary/30">
        <Linkedin
          className="w-3.5 h-3.5 text-primary transition-transform duration-500 group-hover:scale-110"
          strokeWidth={1.8}
          fill="currentColor"
          fillOpacity={0.08}
        />

        <span aria-hidden className="block w-2 h-px bg-foreground/30 group-hover:bg-primary/60 transition-colors" />

        <div className="relative h-20 w-full flex items-center justify-center overflow-visible">
          <span className="absolute font-mono leading-none text-[9px] tracking-[0.32em] uppercase text-foreground/80 group-hover:text-primary transition-colors -rotate-90 whitespace-nowrap">
            LinkedIn
          </span>
        </div>

        <span aria-hidden className="block w-2 h-px bg-foreground/30 group-hover:bg-primary/60 transition-colors" />

        <span
          aria-hidden
          className="font-mono text-[8px] tracking-[0.22em] text-foreground/45 group-hover:text-primary transition-colors"
        >
          ↗
        </span>
      </div>
    </a>
  )
}
