'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { FileText, Image as ImageIcon, Tags, Settings, LogOut } from 'lucide-react'

type NavItem = {
  href: string
  label: string
  Icon: typeof FileText
  active: boolean
}

const NAV: NavItem[] = [
  { href: '/admin/posts',      label: 'Posts',      Icon: FileText,  active: true  },
  { href: '/admin/media',      label: 'Media',      Icon: ImageIcon, active: false },
  { href: '/admin/categories', label: 'Categories', Icon: Tags,      active: false },
  { href: '/admin/settings',   label: 'Settings',   Icon: Settings,  active: false },
]

export function Sidebar({ user }: { user: string }) {
  const pathname = usePathname()
  const router = useRouter()

  async function onLogout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <aside className="w-60 shrink-0 border-r border-foreground/15 bg-background-alt flex flex-col">
      <div className="p-6 border-b border-foreground/15">
        <Link href="/" className="font-display text-xl tracking-[-0.02em] hover:text-primary transition-colors">
          LawShaoor<span className="text-primary">.</span>
        </Link>
        <p className="text-[10px] text-foreground/55 mt-1 font-mono tracking-[0.32em] uppercase">
          Admin
        </p>
      </div>

      <nav className="flex-1 p-3 space-y-0.5">
        {NAV.map(({ href, label, Icon, active }) => {
          if (!active) {
            return (
              <span
                key={href}
                className="flex items-center gap-3 px-3 py-2 text-sm text-foreground/35 cursor-not-allowed font-heading select-none"
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
                <span className="ml-auto text-[9px] font-mono tracking-[0.22em] uppercase text-foreground/40">
                  soon
                </span>
              </span>
            )
          }
          const isActive = pathname?.startsWith(href) ?? false
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2 text-sm transition-colors font-heading ${
                isActive
                  ? 'bg-primary/15 text-foreground border-l-2 border-primary -ml-px pl-[11px]'
                  : 'text-foreground/70 hover:bg-foreground/5 hover:text-foreground'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="p-3 border-t border-foreground/15 space-y-2">
        <div className="px-3">
          <div className="text-[10px] text-foreground/55 font-mono tracking-[0.32em] uppercase mb-0.5">
            Signed in
          </div>
          <div className="text-sm font-heading text-foreground/85 truncate">{user}</div>
        </div>
        <button
          onClick={onLogout}
          className="flex items-center gap-3 px-3 py-2 text-sm w-full text-left text-foreground/70 hover:bg-foreground/5 hover:text-foreground transition-colors font-heading"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign out</span>
        </button>
      </div>
    </aside>
  )
}
