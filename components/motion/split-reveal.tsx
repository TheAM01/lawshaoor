'use client'

import { useRef, type ElementType } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from './gsap-init'

type Props = {
  children: string
  as?: ElementType
  className?: string
  delay?: number
  /** Kept for API compatibility (no longer used). */
  stagger?: number
  trigger?: 'load' | 'scroll'
  by?: 'word' | 'line'
}

/**
 * Plain opacity fade-in for headings. No splitting, no transform/translate —
 * the text simply fades in (on load or on scroll into view), with a safety
 * reveal so it is never stuck invisible.
 */
export function SplitReveal({
  children,
  as: Tag = 'span',
  className = '',
  delay = 0,
  trigger = 'scroll',
}: Props) {
  const ref = useRef<HTMLElement | null>(null)

  useGSAP(
    () => {
      if (!ref.current) return
      const el = ref.current

      const reveal = () =>
        gsap.to(el, { opacity: 1, duration: 0.5, ease: 'power1.out', delay, overwrite: 'auto' })

      gsap.set(el, { opacity: 0 })

      let st: ScrollTrigger | undefined
      if (trigger === 'load') {
        reveal()
      } else {
        st = ScrollTrigger.create({
          trigger: el,
          start: 'top 94%',
          once: true,
          onEnter: reveal,
        })
      }

      const safety = window.setTimeout(() => {
        gsap.to(el, { opacity: 1, duration: 0.3, overwrite: 'auto' })
      }, 1300 + delay * 1000)

      return () => {
        window.clearTimeout(safety)
        if (st) st.kill()
      }
    },
    { scope: ref as any }
  )

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  )
}
