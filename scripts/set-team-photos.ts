/**
 * Point team members' `photo` at the bundled headshots in `public/team/`.
 *
 * Dry run:   npx tsx scripts/set-team-photos.ts
 * Apply:     APPLY=1 npx tsx scripts/set-team-photos.ts
 *
 * Only members whose photo is empty are updated — a photo set in the admin
 * panel is left alone. Use FORCE=1 to overwrite those too.
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

async function main() {
  const uri = process.env.MONGODB_URI
  if (!uri) {
    console.error('MONGODB_URI is not set. Add it to .env.local before running this script.')
    process.exit(1)
  }
  const apply = process.env.APPLY === '1'
  const force = process.env.FORCE === '1'

  const client = new MongoClient(uri)
  await client.connect()
  const team = client.db().collection('team')

  for (const member of SEED_TEAM_MEMBERS) {
    if (!member.photo) continue
    const existing = await team.findOne({ slug: member.slug })
    if (!existing) {
      console.log(`  [missing]  ${member.slug} — not in DB, skipped`)
      continue
    }
    if (existing.photo === member.photo) {
      console.log(`  [same]     ${member.slug}`)
      continue
    }
    if (existing.photo && !force) {
      console.log(`  [kept]     ${member.slug} — has ${existing.photo} (FORCE=1 to overwrite)`)
      continue
    }

    console.log(`  [${apply ? 'update' : 'would update'}] ${member.slug}: "${existing.photo ?? ''}" → "${member.photo}"`)
    if (apply) {
      await team.updateOne({ slug: member.slug }, { $set: { photo: member.photo, updatedAt: new Date() } })
    }
  }

  if (!apply) console.log('\nDry run. Re-run with APPLY=1 to write these changes.')
  await client.close()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
