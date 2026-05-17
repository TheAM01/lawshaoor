#!/usr/bin/env tsx
/* One-shot: wipe all analytics data.
 *
 * Use after a seed run, or whenever you want a fresh dashboard.
 *
 *   pnpm tsx scripts/clear-analytics.ts
 *
 * Drops every row in analytics_events / analytics_sessions /
 * analytics_daily / analytics_salts. Indexes and the collections
 * themselves are preserved. */

import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { MongoClient } from 'mongodb'

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

async function main() {
  const uri = process.env.MONGODB_URI
  if (!uri) {
    console.error('MONGODB_URI is not set — add it to .env.local or export it.')
    process.exit(1)
  }

  const client = await new MongoClient(uri).connect()
  try {
    const db = client.db(undefined)
    const targets = [
      'analytics_events',
      'analytics_sessions',
      'analytics_daily',
      'analytics_salts',
    ] as const

    for (const name of targets) {
      const res = await db.collection(name).deleteMany({})
      console.log(`  ${name.padEnd(22)} deleted ${res.deletedCount}`)
    }
    console.log('Done — analytics collections cleared.')
  } finally {
    await client.close()
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
