/**
 * Seed / update team members in MongoDB.
 *
 * Run with:           pnpm seed:team
 * Force-reseed:       RESEED=1 pnpm seed:team
 *
 * Default behaviour is idempotent — members whose slug already exists are
 * left alone (so manual edits in the admin panel are safe). Pass RESEED=1
 * to overwrite existing members with the current seed content from
 * `lib/models/team.ts` (bios, titles, ordering, etc.).
 *
 * New members in the seed (e.g. a freshly added associate) are always
 * inserted, regardless of RESEED.
 */

import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { MongoClient } from 'mongodb'
import { SEED_TEAM_MEMBERS } from '../lib/models/team'

// ─── Tiny .env.local loader (no extra dep) ─────────────────────
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

// ─── Main ──────────────────────────────────────────────────────
async function main() {
  const uri = process.env.MONGODB_URI
  if (!uri) {
    console.error('MONGODB_URI is not set. Add it to .env.local before running this script.')
    process.exit(1)
  }

  const force = process.env.RESEED === '1' || process.argv.includes('--reseed')

  const client = new MongoClient(uri)
  await client.connect()
  const db = client.db()
  const team = db.collection('team')

  await team.createIndex({ slug: 1 }, { unique: true }).catch(() => {})

  let inserted = 0
  let replaced = 0
  let skipped = 0

  for (const member of SEED_TEAM_MEMBERS) {
    const existing = await team.findOne({ slug: member.slug })

    if (existing && !force) {
      console.log(`  [skip]     ${member.slug}`)
      skipped++
      continue
    }

    const now = new Date()
    const doc = {
      ...member,
      createdAt: existing?.createdAt ?? now,
      updatedAt: now,
    }

    if (existing) {
      await team.updateOne({ slug: member.slug }, { $set: doc })
      console.log(`  [replace]  ${member.slug}`)
      replaced++
    } else {
      await team.insertOne(doc)
      console.log(`  [insert]   ${member.slug}`)
      inserted++
    }
  }

  console.log('')
  console.log(`Done. Inserted ${inserted}, replaced ${replaced}, skipped ${skipped}.`)
  if (!force && skipped > 0) {
    console.log(`Hint: run with RESEED=1 to overwrite existing members with the latest content.`)
  }
  await client.close()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
