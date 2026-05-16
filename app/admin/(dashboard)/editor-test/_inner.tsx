'use client'

import '@blocknote/core/fonts/inter.css'
import '@blocknote/mantine/style.css'

import { useCreateBlockNote } from '@blocknote/react'
import { BlockNoteView } from '@blocknote/mantine'

export function Inner() {
  const editor = useCreateBlockNote()
  return (
    <div style={{ border: '1px solid #ccc', padding: 16, maxWidth: 720 }}>
      <BlockNoteView editor={editor} />
    </div>
  )
}
