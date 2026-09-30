'use client'

import { useEffect, useState } from 'react'
import { FadeIn } from '@/components/motion/fade-in'

const STRENGTHS = [
  'Technology & Digital',
  'Fintech & Banking',
  'Corporate & Investment',
  'Energy & Natural Resources',
  'Disputes & White-Collar',
]

function useClock(tz: string) {
  const [time, setTime] = useState<string>('')
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: tz })
    const tick = () => setTime(fmt.format(new Date()))
    tick()
    const id = setInterval(tick, 1000 * 30)
    return () => clearInterval(id)
  }, [tz])
  return time
}

export function HeroStatus() {
  const isb = useClock('Asia/Karachi')
  const hkg = useClock('Asia/Hong_Kong')
  const ldn = useClock('Europe/London')
  const auh = useClock('Asia/Dubai')

  return (
    <FadeIn delay={0.8} className="surface bracketed p-5 md:p-6 w-full max-w-md ml-auto">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="dot-live" />
          <span className="eyebrow text-foreground/85">Strength sectors</span>
        </div>
        <span className="eyebrow text-foreground/70">Islamabad · PK</span>
      </div>

      <div className="h-px bg-foreground/30 mb-3" />

      <ul className="space-y-2.5 mb-4">
        {STRENGTHS.map((desc) => (
          <li key={desc} className="flex gap-3 items-center">
            <span aria-hidden className="block w-3 h-px bg-primary shrink-0" />
            <span className="text-xs text-foreground/85 leading-tight">{desc}</span>
          </li>
        ))}
      </ul>

      <div className="h-px bg-foreground/25 mb-3" />

      <div className="grid grid-cols-4 gap-3">
        {[
          { label: 'ISB', v: isb },
          { label: 'AUH', v: auh },
          { label: 'LDN', v: ldn },
          { label: 'HKG', v: hkg },
        ].map((c) => (
          <div key={c.label}>
            <p className="eyebrow text-foreground/60 mb-0.5">{c.label}</p>
            <p className="font-display text-xl tabular-fig tracking-tight">{c.v || '— —'}</p>
          </div>
        ))}
      </div>
    </FadeIn>
  )
}
