'use client'

import { useRef, type ElementType } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from './gsap-init'

type Props = {
  children: string
  as?: ElementType
  className?: string
  delay?: number
  stagger?: number
  trigger?: 'load' | 'scroll'
  by?: 'word' | 'line'
}

/**
 * Mask-reveal text: each word slides up from below a clipped band.
 * Bulletproof — even if ScrollTrigger never fires, a safety timeout
 * reveals the text so nothing is ever stuck invisible.
 */
export function SplitReveal({
  children,
  as: Tag = 'span',
  className = '',
  delay = 0,
  stagger = 0.05,
  trigger = 'scroll',
  by = 'word',
}: Props) {
  const ref = useRef<HTMLElement | null>(null)

  useGSAP(
    () => {
      if (!ref.current) return
      const inners = ref.current.querySelectorAll<HTMLSpanElement>('[data-reveal-inner]')
      if (!inners.length) return

      // Once the reveal completes, release `overflow:hidden` on the mask
      // wrappers so italic descenders/overhang (g, y, p, j, italic f) are
      // no longer clipped.
      const releaseMasks = () => {
        ref.current?.querySelectorAll<HTMLElement>('.mask-reveal').forEach((m) => {
          m.style.overflow = 'visible'
        })
      }

      const reveal = () =>
        gsap.to(inners, {
          yPercent: 0,
          duration: 0.55,
          ease: 'expo.inOut',
          stagger,
          delay,
          overwrite: 'auto',
          onComplete: releaseMasks,
        })

      gsap.set(inners, { yPercent: 110 })

      let safety: number | undefined
      let st: ScrollTrigger | undefined

      if (trigger === 'load') {
        reveal()
      } else {
        st = ScrollTrigger.create({
          trigger: ref.current,
          start: 'top 92%',
          once: true,
          onEnter: reveal,
        })
      }

      // Hard safety: always reveal within ~1.4s + delay, no matter what.
      safety = window.setTimeout(() => {
        gsap.to(inners, { yPercent: 0, duration: 0.4, overwrite: 'auto', onComplete: releaseMasks })
      }, 1400 + delay * 1000)

      return () => {
        if (safety !== undefined) window.clearTimeout(safety)
        if (st) st.kill()
      }
    },
    { scope: ref as any }
  )

  const tokens = by === 'word' ? children.split(/(\s+)/) : [children]

  return (
    // @ts-expect-error dynamic tag
    <Tag ref={ref} className={className}>
      {tokens.map((tok, i) =>
        /^\s+$/.test(tok) ? (
          <span key={i}> </span>
        ) : (
          <span key={i} className="mask-reveal">
            <span data-reveal-inner>{tok}</span>
          </span>
        )
      )}
    </Tag>
  )
}
