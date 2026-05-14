'use client'

import { useRef, type ElementType, type ReactNode } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from './gsap-init'

type Props = {
  children: ReactNode
  as?: ElementType
  className?: string
  delay?: number
  y?: number
  duration?: number
  stagger?: number
  /** If true, children's direct children are staggered. Useful for lists. */
  staggerChildren?: boolean
}

export function FadeIn({
  children,
  as: Tag = 'div',
  className = '',
  delay = 0,
  y = 20,
  duration = 0.55,
  stagger = 0.06,
  staggerChildren = false,
}: Props) {
  const ref = useRef<HTMLElement | null>(null)

  useGSAP(
    () => {
      if (!ref.current) return
      const targets = staggerChildren
        ? Array.from(ref.current.children)
        : [ref.current]

      const tween = gsap.fromTo(
        targets,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration,
          ease: 'expo.inOut',
          stagger: staggerChildren ? stagger : 0,
          delay,
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 92%',
            once: true,
          },
        }
      )

      // Hard safety: if for any reason the trigger never fires (hydration,
      // misreported viewport, late refresh), force-reveal after 1.4s so
      // content never sits invisible.
      const safety = window.setTimeout(() => {
        gsap.to(targets, { opacity: 1, y: 0, duration: 0.35, ease: 'expo.inOut', overwrite: 'auto' })
      }, 1200 + delay * 1000)

      return () => {
        window.clearTimeout(safety)
        tween.kill()
      }
    },
    { scope: ref as any }
  )

  return (
    // @ts-expect-error dynamic tag
    <Tag ref={ref} className={`fade-in-root ${className}`}>
      {children}
    </Tag>
  )
}
