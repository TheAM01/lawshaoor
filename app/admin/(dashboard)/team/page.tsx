import { teamCollection } from '@/lib/mongo'
import { toTeamListItem, type TeamMemberDoc, type TeamListItem } from '@/lib/models/team'
import { TeamClient } from './_components/team-client'

export const dynamic = 'force-dynamic'

export default async function TeamAdminPage() {
  let team: TeamListItem[] = []
  let dbError: string | null = null

  try {
    const col = await teamCollection()
    const docs = await col.find({}).sort({ order: 1, name: 1 }).toArray()
    team = docs.map((d) => toTeamListItem(d as unknown as TeamMemberDoc))
  } catch (err) {
    dbError = err instanceof Error ? err.message : 'Failed to load team'
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="section-pad py-8 md:py-10 border-b border-foreground/15 bg-background-alt/50">
        <span className="index-chip">Team</span>
        <h1 className="font-display text-3xl md:text-4xl tracking-[-0.02em] mt-3">
          People &amp; profiles
        </h1>
        <p className="text-sm text-foreground/65 font-heading mt-2 max-w-2xl">
          Add, edit, reorder or remove the lawyers shown on the public <code className="font-mono text-xs">/people</code> page and their individual profile pages. Changes go live immediately.
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
          <TeamClient initial={team} />
        )}
      </div>
    </div>
  )
}
