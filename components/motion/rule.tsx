'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from './gsap-init'

type Props = {
  className?: string
  delay?: number
}

/** Horizontal hairline that draws left-to-right on scroll into view. */
export function Rule({ className = '', delay = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!ref.current) return
      gsap.set(ref.current, { scaleX: 0, transformOrigin: 'left center' })
      ScrollTrigger.create({
        trigger: ref.current,
        start: 'top 90%',
        once: true,
        onEnter: () => {
          gsap.to(ref.current, {
            scaleX: 1,
            duration: 1.4,
            delay,
            ease: 'expo.out',
          })
        },
      })
    },
    { scope: ref as any }
  )

  return <div ref={ref} className={`h-px w-full bg-foreground/25 ${className}`} />
}
