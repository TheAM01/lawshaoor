import { MongoClient, type Db } from 'mongodb'
import { SEED_CATEGORIES, normalizeCategorySlug } from './models/category'

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
  try {
    await db.collection('posts').createIndex({ slug: 1 }, { unique: true })
    await db.collection('posts').createIndex({ status: 1, publishedAt: -1 })
    await db.collection('posts').createIndex({ category: 1, publishedAt: -1 })

    await db.collection('categories').createIndex({ slug: 1 }, { unique: true })
    await db.collection('categories').createIndex({ order: 1, name: 1 })

    await db.collection('media').createIndex({ uploadedAt: -1 })
    await db.collection('media').createIndex({ url: 1 }, { unique: true })
  } catch {
    /* Best-effort: index may already exist with different options. */
  }

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

export async function mediaCollection() {
  const db = await getDb()
  return db.collection('media')
}

export async function settingsCollection() {
  const db = await getDb()
  return db.collection('settings')
}
