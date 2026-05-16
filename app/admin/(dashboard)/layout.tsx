import { Sidebar } from './_components/sidebar'
import { getSession } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Admin · LawShaoor',
  robots: { index: false, follow: false },
}

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getSession()
  const name = session.user?.name ?? 'admin'

  return (
    <div className="min-h-screen flex bg-background text-foreground">
      <Sidebar user={name} />
      <main className="flex-1 min-w-0 flex flex-col">{children}</main>
    </div>
  )
}
