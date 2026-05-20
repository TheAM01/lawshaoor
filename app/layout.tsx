import type { Metadata } from 'next'
import { Syne, Space_Grotesk, Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider, ThemeScript } from '@/components/theme-provider'
import { SiteTracker } from '@/components/analytics/site-tracker'
import './globals.css'

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'LawShaoor Chambers — Law. Strategy. Future.',
    template: '%s · LawShaoor Chambers',
  },
  description: 'LawShaoor Chambers — Law. Strategy. Future. A full-service law chambers based in Islamabad, with associated offices in other major cities of Pakistan. In strategic partnership with M.B. KEMP (ME) LLP — Hong Kong, London, Milan, Abu Dhabi.',
  keywords: ['LawShaoor Chambers', 'Law Strategy Future', 'Islamabad law chambers', 'Pakistan corporate law', 'M.B. KEMP (ME) LLP', 'banking and finance law', 'energy law Pakistan', 'dispute resolution Pakistan', 'DIFC ADGM advisory'],
  openGraph: {
    title: 'LawShaoor Chambers — Law. Strategy. Future.',
    description: 'A full-service law chambers based in Islamabad. In strategic partnership with M.B. KEMP (ME) LLP — Hong Kong, London, Milan, Abu Dhabi.',
    siteName: 'LawShaoor Chambers',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LawShaoor Chambers — Law. Strategy. Future.',
    description: 'A full-service law chambers based in Islamabad. Law. Strategy. Future.',
  },
  generator: 'v0.app',
  icons: {
    icon: [{ url: '/lawshaoor-icon.png', type: 'image/png' }],
    shortcut: '/lawshaoor-icon.png',
    apple: '/lawshaoor-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${spaceGrotesk.variable} ${geist.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <ThemeScript defaultTheme="light" attribute="class" />
      </head>
      <body className="grain antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
        <SiteTracker />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
