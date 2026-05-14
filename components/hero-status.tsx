'use client'

import { useEffect, useState } from 'react'
import { FadeIn } from '@/components/motion/fade-in'

const MATTERS = [
  { code: 'M-2204', desc: 'Cross-border SaaS acquisition', val: '$420M', stage: 'Diligence' },
  { code: 'G-3110', desc: 'Public-company board restructure', val: '—',     stage: 'Drafting'  },
  { code: 'C-7728', desc: 'Strategic JV — Series C portfolio', val: '$95M', stage: 'Closing'   },
  { code: 'F-1190', desc: 'Senior debt facility renegotiation', val: '$180M', stage: 'Active'   },
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

/**
 * Right-rail panel on the hero. A faux "control room" — live time,
 * what's currently on the firm's desk, and a small index. Fills the
 * negative space without screaming "marketing visual."
 */
export function HeroStatus() {
  const ny  = useClock('America/New_York')
  const ldn = useClock('Europe/London')
  const sng = useClock('Asia/Singapore')

  return (
    <FadeIn delay={0.8} className="surface p-4 md:p-5 w-full max-w-md ml-auto">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="dot-live" />
          <span className="eyebrow text-foreground/85">On the desk</span>
        </div>
        <span className="eyebrow text-foreground/70">{new Date().getFullYear()} · Q2</span>
      </div>

      <div className="h-px bg-foreground/30 mb-3" />

      <ul className="space-y-2.5 mb-4">
        {MATTERS.map((m) => (
          <li key={m.code} className="grid grid-cols-12 gap-2 items-baseline">
            <span className="col-span-3 eyebrow text-primary">{m.code}</span>
            <span className="col-span-6 text-xs text-foreground/85 leading-tight">{m.desc}</span>
            <span className="col-span-3 text-right eyebrow text-foreground/65">{m.stage}</span>
          </li>
        ))}
      </ul>

      <div className="h-px bg-foreground/25 mb-3" />

      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'NY',  v: ny },
          { label: 'LDN', v: ldn },
          { label: 'SNG', v: sng },
        ].map((c) => (
          <div key={c.label}>
            <p className="eyebrow text-foreground/65 mb-0.5">{c.label}</p>
            <p className="font-serif text-lg tabular-fig tracking-tight">{c.v || '— —'}</p>
          </div>
        ))}
      </div>
    </FadeIn>
  )
}
