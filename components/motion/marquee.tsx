'use client'

import { useRef, type ReactNode } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from './gsap-init'

type Props = {
  children: ReactNode
  speed?: number // pixels per second
  reverse?: boolean
  className?: string
}

/** Seamless GSAP marquee. Renders content twice for the loop. */
export function Marquee({ children, speed = 60, reverse = false, className = '' }: Props) {
  const wrap = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!track.current) return
      const half = track.current.scrollWidth / 2
      const duration = half / speed
      gsap.set(track.current, { x: 0 })
      gsap.to(track.current, {
        x: reverse ? half : -half,
        duration,
        ease: 'none',
        repeat: -1,
      })
    },
    { scope: wrap as any, dependencies: [speed, reverse] }
  )

  return (
    <div ref={wrap} className={`overflow-hidden ${className}`}>
      <div ref={track} className="marquee-track">
        <div className="flex">{children}</div>
        <div className="flex" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  )
}
