import { briefsCollection } from '@/lib/mongo'
import { toBriefListItem, type BriefDoc, type BriefListItem } from '@/lib/models/brief'
import { BriefsClient } from './_components/briefs-client'

export const dynamic = 'force-dynamic'

export default async function BriefsAdminPage() {
  let briefs: BriefListItem[] = []
  let dbError: string | null = null

  try {
    const col = await briefsCollection()
    const docs = await col
      .find({}, { projection: { ipHash: 0, userAgent: 0 } })
      .sort({ createdAt: -1 })
      .limit(500)
      .toArray()
    briefs = docs.map((d) => toBriefListItem(d as unknown as BriefDoc))
  } catch (err) {
    dbError = err instanceof Error ? err.message : 'Failed to load briefs'
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="section-pad py-8 md:py-10 border-b border-foreground/15 bg-background-alt/50">
        <span className="index-chip">Briefs</span>
        <h1 className="font-display text-3xl md:text-4xl tracking-[-0.02em] mt-3">
          Inbox
          <span className="text-foreground/40 ml-3 text-xl md:text-2xl font-mono tracking-[0.05em]">
            {briefs.filter((b) => b.status === 'new').length} new
          </span>
        </h1>
        <p className="text-sm text-foreground/65 font-heading mt-2 max-w-2xl">
          Enquiries submitted through the public <code className="font-mono text-xs">/contact</code> form, newest first.
        </p>
      </div>

      <div className="flex-1 section-pad py-8 md:py-10">
        {dbError ? (
          <div className="border border-destructive/40 bg-destructive/5 p-6">
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-destructive mb-2">
              Database error
            </p>
            <p className="text-sm text-foreground/80 font-heading break-words">{dbError}</p>
          </div>
        ) : (
          <BriefsClient initial={briefs} />
        )}
      </div>
    </div>
  )
}
