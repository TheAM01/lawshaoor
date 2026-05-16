'use client'

import dynamic from 'next/dynamic'
import type { EditorInitial } from './editor-shell'

const EditorShell = dynamic(
  () => import('./editor-shell').then((m) => m.EditorShell),
  {
    ssr: false,
    loading: () => (
      <div className="flex-1 flex items-center justify-center text-foreground/55 font-mono text-xs tracking-[0.22em] uppercase">
        Loading editor…
      </div>
    ),
  }
)

export function EditorLoader(props: { id: string; initial: EditorInitial }) {
  return <EditorShell {...props} />
}
