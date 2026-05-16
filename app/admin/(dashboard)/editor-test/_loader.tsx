'use client'
import dynamic from 'next/dynamic'

const Inner = dynamic(() => import('./_inner').then((m) => m.Inner), {
  ssr: false,
  loading: () => <div>Loading…</div>,
})

export function EditorTestLoader() {
  return <Inner />
}
