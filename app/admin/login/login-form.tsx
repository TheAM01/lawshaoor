'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export function LoginForm() {
  const router = useRouter()
  const params = useSearchParams()
  const next = params.get('next') || '/admin/posts'
  const initialErr =
    params.get('err') === 'server'
      ? 'Server is missing SESSION_SECRET (or it is shorter than 32 chars). Check .env.local.'
      : ''

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(initialErr)
  const [loading, setLoading] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({} as { error?: string }))
        throw new Error(data?.error || `Login failed (${res.status})`)
      }
      router.push(next)
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background section-pad py-16">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md space-y-8 border border-foreground/15 bg-card p-8 md:p-10"
      >
        <div className="space-y-3">
          <span className="index-chip">Admin · Sign in</span>
          <h1 className="font-display text-3xl md:text-4xl tracking-[-0.02em]">
            Welcome back.
          </h1>
          <p className="text-foreground/60 text-sm font-heading">
            Authorized users only.
          </p>
        </div>

        <div className="space-y-5">
          <div className="field">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              required
              autoFocus
            />
          </div>
          <div className="field">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>
        </div>

        {error && (
          <p className="text-sm text-destructive font-mono tracking-[0.05em] leading-relaxed">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full justify-center disabled:opacity-50 disabled:pointer-events-none"
        >
          <span>{loading ? 'Signing in…' : 'Sign in'}</span>
          <span className="arrow-magnet">→</span>
        </button>
      </form>
    </div>
  )
}
