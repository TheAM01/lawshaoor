import { EditorTestLoader } from './_loader'

export const dynamic = 'force-dynamic'

export default function EditorTestPage() {
  return (
    <div className="p-8">
      <h1 className="font-display text-2xl mb-6">Editor smoke test</h1>
      <EditorTestLoader />
    </div>
  )
}
