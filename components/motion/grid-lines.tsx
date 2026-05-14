'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from './gsap-init'

type Props = {
  columns?: number
  className?: string
}

/**
 * Absolutely-positioned vertical grid lines that draw downward as the
 * section enters the viewport. Sits inside a `relative` parent.
 */
export function GridLines({ columns = 12, className = '' }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!ref.current) return
      const lines = ref.current.querySelectorAll<HTMLDivElement>('[data-line]')
      gsap.set(lines, { scaleY: 0, transformOrigin: 'top center' })
      ScrollTrigger.create({
        trigger: ref.current,
        start: 'top 90%',
        once: true,
        onEnter: () => {
          gsap.to(lines, {
            scaleY: 1,
            duration: 1.4,
            ease: 'expo.out',
            stagger: 0.04,
          })
        },
      })
    },
    { scope: ref as any }
  )

  return (
    <div
      ref={ref}
      aria-hidden
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{
        maskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
      }}
    >
      {Array.from({ length: columns - 1 }).map((_, i) => (
        <div
          key={i}
          data-line
          className="absolute top-0 bottom-0 w-px bg-foreground/12"
          style={{ left: `${((i + 1) / columns) * 100}%` }}
        />
      ))}
    </div>
  )
}
