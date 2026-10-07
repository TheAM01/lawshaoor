import { MongoClient, type Db } from 'mongodb'
import { SEED_CATEGORIES, normalizeCategorySlug } from './models/category'
import { SEED_TEAM_MEMBERS } from './models/team'

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined
}

let clientPromise: Promise<MongoClient> | null = null
let indexPromise: Promise<void> | null = null

function getClientPromise(): Promise<MongoClient> {
  if (clientPromise) return clientPromise

  const uri = process.env.MONGODB_URI
  if (!uri) throw new Error('MONGODB_URI is not set in the environment')

  if (process.env.NODE_ENV === 'development') {
    if (!global._mongoClientPromise) {
      global._mongoClientPromise = new MongoClient(uri).connect()
    }
    clientPromise = global._mongoClientPromise
  } else {
    clientPromise = new MongoClient(uri).connect()
  }
  return clientPromise
}

async function ensureIndexes(db: Db) {
  // Independent of each other, so fire them together: one round-trip of
  // latency instead of ~25 sequential ones on every cold start. allSettled
  // keeps this best-effort — an index that already exists with different
  // options must not block the rest.
  await Promise.allSettled([
    db.collection('posts').createIndex({ slug: 1 }, { unique: true }),
    db.collection('posts').createIndex({ status: 1, publishedAt: -1 }),
    db.collection('posts').createIndex({ category: 1, publishedAt: -1 }),

    db.collection('categories').createIndex({ slug: 1 }, { unique: true }),
    db.collection('categories').createIndex({ order: 1, name: 1 }),

    db.collection('team').createIndex({ slug: 1 }, { unique: true }),
    db.collection('team').createIndex({ order: 1, name: 1 }),

    db.collection('media').createIndex({ uploadedAt: -1 }),
    db.collection('media').createIndex({ url: 1 }, { unique: true }),

    // Briefs — contact-form enquiries. Inbox sorts newest first, filters by
    // status; the public route counts recent submissions per IP hash.
    db.collection('briefs').createIndex({ createdAt: -1 }),
    db.collection('briefs').createIndex({ status: 1, createdAt: -1 }),
    db.collection('briefs').createIndex({ ipHash: 1, createdAt: -1 }),

    // Analytics — raw events (TTL 90 days). Indexed for the dashboard's
    // dominant access patterns: by-day-and-slug rollups, by-visitor for
    // de-dup, and a live tail by recency.
    db.collection('analytics_events').createIndex(
      { createdAt: 1 },
      { expireAfterSeconds: 60 * 60 * 24 * 90 }
    ),
    db.collection('analytics_events').createIndex({ dayUTC: 1, slug: 1 }),
    db.collection('analytics_events').createIndex({ dayUTC: 1, pageKind: 1 }),
    db.collection('analytics_events').createIndex({ slug: 1, createdAt: -1 }),
    db.collection('analytics_events').createIndex({ visitorId: 1, createdAt: -1 }),
    db.collection('analytics_events').createIndex({ sessionId: 1, createdAt: 1 }),
    db.collection('analytics_events').createIndex({ type: 1, createdAt: -1 }),

    // Analytics — sessions (TTL 7 days from lastSeenAt). One per browser
    // session. Used for bounce / pages-per-session.
    db.collection('analytics_sessions').createIndex(
      { lastSeenAt: 1 },
      { expireAfterSeconds: 60 * 60 * 24 * 7 }
    ),
    db.collection('analytics_sessions').createIndex({ sessionId: 1 }, { unique: true }),
    db.collection('analytics_sessions').createIndex({ visitorId: 1, startedAt: -1 }),

    // Analytics — daily rollups. Long-lived (no TTL). Unique on the
    // (day, kind, slug) tuple — upsert target for the aggregator.
    db.collection('analytics_daily').createIndex(
      { dayUTC: 1, pageKind: 1, slug: 1 },
      { unique: true }
    ),
    db.collection('analytics_daily').createIndex({ slug: 1, dayUTC: 1 }),

    // Analytics — daily-rotating salt for the visitor hash.
    // One doc per UTC day, holds the random 32-byte salt. TTL 35 days
    // (we only ever need the most recent day, but keep a few weeks for
    // debugging if needed).
    db.collection('analytics_salts').createIndex(
      { createdAt: 1 },
      { expireAfterSeconds: 60 * 60 * 24 * 35 }
    ),
    db.collection('analytics_salts').createIndex({ dayUTC: 1 }, { unique: true }),
  ])

  try {
    const count = await db.collection('categories').countDocuments({})
    if (count === 0) {
      const now = new Date()
      const seeds = SEED_CATEGORIES.map((s, i) => ({
        name: s.name,
        slug: normalizeCategorySlug(s.name),
        description: '',
        order: i,
        illustrationKey: s.illustrationKey,
        createdAt: now,
        updatedAt: now,
      }))
      await db.collection('categories').insertMany(seeds as never[])
    }
  } catch {
    /* Best-effort seed; ignore failures. */
  }

  try {
    const count = await db.collection('team').countDocuments({})
    if (count === 0) {
      const now = new Date()
      const seeds = SEED_TEAM_MEMBERS.map((m) => ({
        ...m,
        createdAt: now,
        updatedAt: now,
      }))
      await db.collection('team').insertMany(seeds as never[])
    }
  } catch {
    /* Best-effort seed; ignore failures. */
  }
}

export async function getDb(): Promise<Db> {
  const client = await getClientPromise()
  const db = client.db(undefined)
  if (!indexPromise) indexPromise = ensureIndexes(db)
  await indexPromise
  return db
}

export async function postsCollection() {
  const db = await getDb()
  return db.collection('posts')
}

export async function categoriesCollection() {
  const db = await getDb()
  return db.collection('categories')
}

export async function teamCollection() {
  const db = await getDb()
  return db.collection('team')
}

export async function mediaCollection() {
  const db = await getDb()
  return db.collection('media')
}

export async function briefsCollection() {
  const db = await getDb()
  return db.collection('briefs')
}

export async function settingsCollection() {
  const db = await getDb()
  return db.collection('settings')
}

export async function analyticsEventsCollection() {
  const db = await getDb()
  return db.collection('analytics_events')
}

export async function analyticsSessionsCollection() {
  const db = await getDb()
  return db.collection('analytics_sessions')
}

export async function analyticsDailyCollection() {
  const db = await getDb()
  return db.collection('analytics_daily')
}

export async function analyticsSaltsCollection() {
  const db = await getDb()
  return db.collection('analytics_salts')
}
