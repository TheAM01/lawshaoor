import { Suspense } from 'react'
import { LoginForm } from './login-form'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Admin sign in · LawShaoor',
  robots: { index: false, follow: false },
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  )
}
