'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from './gsap-init'

type Props = {
  value: number
  prefix?: string
  suffix?: string
  duration?: number
  decimals?: number
  className?: string
}

export function Counter({
  value,
  prefix = '',
  suffix = '',
  duration = 2,
  decimals = 0,
  className = '',
}: Props) {
  const ref = useRef<HTMLSpanElement>(null)

  useGSAP(
    () => {
      if (!ref.current) return
      const node = ref.current
      const obj = { v: 0 }

      ScrollTrigger.create({
        trigger: node,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(obj, {
            v: value,
            duration,
            ease: 'expo.out',
            onUpdate: () => {
              const formatted = obj.v.toLocaleString(undefined, {
                minimumFractionDigits: decimals,
                maximumFractionDigits: decimals,
              })
              node.textContent = `${prefix}${formatted}${suffix}`
            },
          })
        },
      })
    },
    { scope: ref as any }
  )

  return (
    <span ref={ref} className={`tabular-fig ${className}`}>
      {prefix}0{suffix}
    </span>
  )
}
