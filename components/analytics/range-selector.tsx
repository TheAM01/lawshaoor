'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useTransition } from 'react'

/* Pill toggle bar for the analytics date range. Updates the `?range=`
 *  query param so the parent server component re-renders with the new
 *  range. Client-side transition keeps the UI responsive. */

const OPTIONS: Array<{ label: string; value: number }> = [
  { label: 'Today',    value: 1 },
  { label: 'Last 7d',  value: 7 },
  { label: 'Last 30d', value: 30 },
  { label: 'Last 90d', value: 90 },
]

export function RangeSelector({ current }: { current: number }) {
  const router = useRouter()
  const search = useSearchParams()
  const [pending, startTransition] = useTransition()

  function pick(value: number) {
    const params = new URLSearchParams(search.toString())
    params.set('range', String(value))
    startTransition(() => {
      router.replace(`?${params.toString()}`, { scroll: false })
    })
  }

  return (
    <div
      className={`inline-flex border border-foreground/15 ${pending ? 'opacity-70' : ''}`}
      role="tablist"
      aria-label="Date range"
    >
      {OPTIONS.map((o, i) => {
        const active = o.value === current
        return (
          <button
            key={o.value}
            role="tab"
            aria-selected={active}
            onClick={() => pick(o.value)}
            className={`px-3 py-1.5 text-[10px] font-mono tracking-[0.22em] uppercase transition-colors ${
              active
                ? 'bg-foreground text-background'
                : 'text-foreground/65 hover:text-foreground hover:bg-foreground/5'
            } ${i > 0 ? 'border-l border-foreground/15' : ''}`}
          >
            {o.label}
          </button>
        )
      })}
    </div>
  )
}
