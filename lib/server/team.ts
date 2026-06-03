import 'server-only'
import { teamCollection } from '@/lib/mongo'
import {
  toTeamListItem,
  SEED_TEAM_MEMBERS,
  type TeamMemberDoc,
  type TeamListItem,
} from '@/lib/models/team'

/** Fallback list (the seed) used when the DB is unreachable so /people never 500s. */
function seedFallback(): TeamListItem[] {
  const now = new Date()
  return SEED_TEAM_MEMBERS.map((m) =>
    toTeamListItem({ ...m, createdAt: now, updatedAt: now } as TeamMemberDoc),
  ).map((t) => ({ ...t, _id: t.slug }))
}

/** All team members, ordered. Falls back to the seed on DB failure. */
export async function getTeam(): Promise<TeamListItem[]> {
  try {
    const col = await teamCollection()
    const docs = await col.find({}).sort({ order: 1, name: 1 }).toArray()
    if (docs.length === 0) return seedFallback()
    return docs.map((d) => toTeamListItem(d as unknown as TeamMemberDoc))
  } catch {
    return seedFallback()
  }
}

/** Single member by slug. Returns null if not found. */
export async function getTeamMember(slug: string): Promise<TeamListItem | null> {
  try {
    const col = await teamCollection()
    const doc = await col.findOne({ slug })
    if (doc) return toTeamListItem(doc as unknown as TeamMemberDoc)
  } catch {
    /* fall through to seed */
  }
  return seedFallback().find((m) => m.slug === slug) ?? null
}
