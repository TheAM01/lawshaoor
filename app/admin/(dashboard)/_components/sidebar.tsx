'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  FileText,
  Image as ImageIcon,
  Tags,
  Settings,
  Globe,
  BookOpen,
  LogOut,
} from 'lucide-react'

type NavItem = {
  href: string
  label: string
  Icon: typeof FileText
  exact?: boolean
}

type NavSection = {
  title: string
  items: NavItem[]
}

const SECTIONS: NavSection[] = [
  {
    title: 'Overview',
    items: [
      { href: '/admin', label: 'Dashboard', Icon: LayoutDashboard, exact: true },
    ],
  },
  {
    title: 'Content',
    items: [
      { href: '/admin/posts',      label: 'Posts',      Icon: FileText },
      { href: '/admin/media',      label: 'Media',      Icon: ImageIcon },
      { href: '/admin/categories', label: 'Categories', Icon: Tags },
    ],
  },
  {
    title: 'Configuration',
    items: [
      { href: '/admin/settings/site',    label: 'Site settings',    Icon: Globe },
      { href: '/admin/settings/general', label: 'General settings', Icon: Settings },
    ],
  },
  {
    title: 'Help',
    items: [
      { href: '/admin/guide', label: 'Guide', Icon: BookOpen },
    ],
  },
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
        <Link href="/" className="flex items-center gap-2.5 group" title="Back to public site">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/lawshaoor-icon.png"
            alt=""
            className="w-7 h-7 object-contain shrink-0 transition-transform group-hover:scale-[1.04]"
          />
          <span className="font-display text-xl tracking-[-0.02em] text-foreground group-hover:text-primary transition-colors">
            LawShaoor<span className="text-primary">.</span>
          </span>
        </Link>
        <p className="text-[10px] text-foreground/55 mt-1.5 font-mono tracking-[0.32em] uppercase pl-[38px]">
          Admin
        </p>
      </div>

      <nav className="flex-1 p-3 space-y-5 overflow-y-auto">
        {SECTIONS.map((section) => (
          <div key={section.title} className="space-y-0.5">
            <p className="px-3 pb-1.5 text-[9px] font-mono tracking-[0.32em] uppercase text-foreground/40">
              {section.title}
            </p>
            {section.items.map(({ href, label, Icon, exact }) => {
              const isActive = exact
                ? pathname === href
                : pathname === href || pathname?.startsWith(href + '/') || false
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
          </div>
        ))}
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
