import { MongoClient, type Db } from 'mongodb'

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
  } catch {
    // Best-effort: index may already exist with different options.
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
