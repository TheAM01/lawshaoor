/**
 * Push the seed's *content* fields to existing team members in MongoDB.
 *
 * Dry run:   npx tsx scripts/update-team-content.ts
 * Apply:     APPLY=1 npx tsx scripts/update-team-content.ts
 *
 * Unlike `RESEED=1 pnpm seed:team`, this only $sets name, title, focus, bio and
 * highlights — photos, emails, LinkedIn URLs, locations and ordering set in the
 * admin panel are left untouched. Members missing from the DB are skipped
 * (use `pnpm seed:team` to insert them).
 */

import dns from 'node:dns'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { MongoClient } from 'mongodb'
import { SEED_TEAM_MEMBERS } from '../lib/models/team'

function loadEnv(file: string) {
  try {
    const content = readFileSync(resolve(process.cwd(), file), 'utf8')
    for (const raw of content.split('\n')) {
      const line = raw.trim()
      if (!line || line.startsWith('#')) continue
      const eq = line.indexOf('=')
      if (eq === -1) continue
      const key = line.slice(0, eq).trim()
      const val = line.slice(eq + 1).trim().replace(/^['"]|['"]$/g, '')
      if (!process.env[key]) process.env[key] = val
    }
  } catch {
    /* file optional */
  }
}
loadEnv('.env.local')
loadEnv('.env')

// Node's resolver can't use an IPv6 link-local DNS server (common on Windows
// routers), which breaks `mongodb+srv://` lookups. Use public resolvers.
dns.setServers(['1.1.1.1', '8.8.8.8'])

const FIELDS = ['name', 'title', 'focus', 'bio', 'highlights'] as const

async function main() {
  const uri = process.env.MONGODB_URI
  if (!uri) {
    console.error('MONGODB_URI is not set. Add it to .env.local before running this script.')
    process.exit(1)
  }
  const apply = process.env.APPLY === '1'

  const client = new MongoClient(uri)
  await client.connect()
  const team = client.db().collection('team')

  for (const member of SEED_TEAM_MEMBERS) {
    const existing = await team.findOne({ slug: member.slug })
    if (!existing) {
      console.log(`  [missing]  ${member.slug} — not in DB, skipped`)
      continue
    }

    const changed = FIELDS.filter((f) => JSON.stringify(existing[f]) !== JSON.stringify(member[f]))
    if (changed.length === 0) {
      console.log(`  [same]     ${member.slug}`)
      continue
    }

    console.log(`  [${apply ? 'update' : 'would update'}] ${member.slug}: ${changed.join(', ')}`)
    if (changed.includes('name'))  console.log(`      name:  "${existing.name}" → "${member.name}"`)
    if (changed.includes('title')) console.log(`      title: "${existing.title}" → "${member.title}"`)

    if (apply) {
      const $set: Record<string, unknown> = { updatedAt: new Date() }
      for (const f of changed) $set[f] = member[f]
      await team.updateOne({ slug: member.slug }, { $set })
    }
  }

  const extra = await team
    .find({ slug: { $nin: SEED_TEAM_MEMBERS.map((m) => m.slug) } })
    .project({ slug: 1, name: 1 })
    .toArray()
  for (const d of extra) console.log(`  [not in seed] ${d.slug} (${d.name}) — left alone`)

  if (!apply) console.log('\nDry run. Re-run with APPLY=1 to write these changes.')
  await client.close()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
