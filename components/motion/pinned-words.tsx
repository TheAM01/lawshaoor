'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from './gsap-init'

type Props = {
  words: string[]
  className?: string
}

/**
 * Manifesto block. Pins a panel and cross-fades through statements
 * as the user scrolls. Each word gets ~80vh of scroll runway.
 */
export function PinnedWords({ words, className = '' }: Props) {
  const wrap = useRef<HTMLDivElement>(null)
  const panel = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!wrap.current || !panel.current) return
      const items = panel.current.querySelectorAll<HTMLElement>('[data-word]')
      if (!items.length) return

      gsap.set(items, { autoAlpha: 0, yPercent: 30 })
      gsap.set(items[0], { autoAlpha: 1, yPercent: 0 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrap.current,
          start: 'top top',
          end: () => `+=${items.length * 80}%`,
          pin: panel.current,
          scrub: 0.4,
          anticipatePin: 1,
        },
      })

      items.forEach((item, i) => {
        if (i === 0) return
        const prev = items[i - 1]
        tl.to(prev, { autoAlpha: 0, yPercent: -30, duration: 1 }, i)
        tl.fromTo(
          item,
          { autoAlpha: 0, yPercent: 30 },
          { autoAlpha: 1, yPercent: 0, duration: 1 },
          i
        )
      })
    },
    { scope: wrap as any }
  )

  return (
    <div ref={wrap} className={className}>
      <div ref={panel} className="h-screen flex items-center justify-start section-pad">
        <div className="relative w-full max-w-[1440px] mx-auto">
          <div className="eyebrow text-foreground/60 mb-12">— Our Philosophy</div>
          <div className="relative h-[40vh] md:h-[50vh]">
            {words.map((w, i) => (
              <div
                key={i}
                data-word
                className="absolute inset-0 display-md font-serif italic-display max-w-5xl"
              >
                {w}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
