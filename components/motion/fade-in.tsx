'use client'

import { useRef, type ElementType, type ReactNode } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from './gsap-init'

type Props = {
  children: ReactNode
  as?: ElementType
  className?: string
  delay?: number
  /** Kept for API compatibility — translate is intentionally not used. */
  y?: number
  duration?: number
  stagger?: number
  /** If true, children's direct children are staggered. Useful for lists. */
  staggerChildren?: boolean
}

/**
 * Simple opacity fade-in. No transform / translate — just a gentle fade,
 * triggered on scroll into view (with a hard safety reveal).
 */
export function FadeIn({
  children,
  as: Tag = 'div',
  className = '',
  delay = 0,
  duration = 0.5,
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
        { opacity: 0 },
        {
          opacity: 1,
          duration,
          ease: 'power1.out',
          stagger: staggerChildren ? stagger : 0,
          delay,
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 94%',
            once: true,
          },
        }
      )

      // Hard safety: force-reveal if the trigger never fires.
      const safety = window.setTimeout(() => {
        gsap.to(targets, { opacity: 1, duration: 0.3, overwrite: 'auto' })
      }, 1200 + delay * 1000)

      return () => {
        window.clearTimeout(safety)
        tween.kill()
      }
    },
    { scope: ref as any }
  )

  return (
    <Tag ref={ref} className={`fade-in-root ${className}`}>
      {children}
    </Tag>
  )
}
