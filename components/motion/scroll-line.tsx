'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from './gsap-init'

type Props = {
  /** CSS selector for the element whose scroll progress drives the line. Defaults to body. */
  scope?: string
  className?: string
}

/**
 * Fixed vertical SVG line that draws itself as the user scrolls.
 * Sits on the left rail; renders nothing visually until paint.
 */
export function ScrollLine({ scope, className = '' }: Props) {
  const wrap = useRef<HTMLDivElement>(null)
  const path = useRef<SVGLineElement>(null)
  const dot = useRef<SVGCircleElement>(null)

  useGSAP(
    () => {
      if (!path.current || !dot.current) return
      gsap.set(path.current, { attr: { 'stroke-dashoffset': 1000 }, strokeDasharray: 1000 })

      const trigger = scope ? (document.querySelector(scope) as HTMLElement | null) : document.body

      ScrollTrigger.create({
        trigger: trigger ?? document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.6,
        onUpdate: (self) => {
          const p = self.progress
          gsap.set(path.current!, { attr: { 'stroke-dashoffset': 1000 * (1 - p) } })
          gsap.set(dot.current!, { attr: { cy: 20 + p * 760 } })
        },
      })
    },
    { scope: wrap as any }
  )

  return (
    <div
      ref={wrap}
      aria-hidden
      className={`pointer-events-none fixed left-6 md:left-10 top-0 h-screen z-30 hidden md:block ${className}`}
    >
      <svg width="2" height="100%" viewBox="0 0 2 800" preserveAspectRatio="none" className="overflow-visible">
        <line
          ref={path}
          x1="1"
          y1="20"
          x2="1"
          y2="780"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.45"
          style={{ color: 'var(--foreground)' }}
        />
        <circle ref={dot} cx="1" cy="20" r="3" fill="var(--primary)" />
      </svg>
    </div>
  )
}
