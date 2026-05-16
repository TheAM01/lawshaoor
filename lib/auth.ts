import { cookies } from 'next/headers'
import { getIronSession, type SessionOptions } from 'iron-session'

export type AdminSession = {
  user?: { name: string }
}

export function getSessionOptions(): SessionOptions {
  const password = process.env.SESSION_SECRET
  if (!password || password.length < 32) {
    throw new Error('SESSION_SECRET must be set and at least 32 characters long')
  }
  return {
    password,
    cookieName: 'lawshaoor_admin',
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
    },
  }
}

export async function getSession() {
  const store = await cookies()
  return getIronSession<AdminSession>(store, getSessionOptions())
}

export function verifyAdminCredentials(username: string, password: string): boolean {
  const u = process.env.ADMIN_USERNAME
  const p = process.env.ADMIN_PASSWORD
  if (!u || !p) return false
  return u === username && p === password
}
