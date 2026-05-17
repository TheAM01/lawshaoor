'use client'

import { useEffect, useState } from 'react'
import { FadeIn } from '@/components/motion/fade-in'

const STRENGTHS = [
  { code: '01', desc: 'Banking & Finance',          stage: 'Core' },
  { code: '02', desc: 'Energy & Natural Resources', stage: 'Core' },
  { code: '03', desc: 'Corporate & Commercial',     stage: 'Core' },
  { code: '04', desc: 'Dispute Resolution',         stage: 'Core' },
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
        {STRENGTHS.map((m) => (
          <li key={m.code} className="grid grid-cols-12 gap-2 items-baseline">
            <span className="col-span-2 eyebrow text-primary">{m.code}</span>
            <span className="col-span-7 text-xs text-foreground/85 leading-tight font-heading tracking-[-0.005em]">{m.desc}</span>
            <span className="col-span-3 text-right eyebrow text-foreground/60">{m.stage}</span>
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
