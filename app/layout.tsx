import type { Metadata } from 'next'
import { Poppins, Jost } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider, ThemeScript } from '@/components/theme-provider'
import { SiteTracker } from '@/components/analytics/site-tracker'
import './globals.css'

/* Headings + buttons — Poppins (geometric sans) */
const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

/* Body, labels & everything else — Century-Gothic-style geometric sans */
const jost = Jost({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: {
    default: 'LawShaoor Chambers — Law. Strategy. Future.',
    template: '%s · LawShaoor Chambers',
  },
  description: 'LawShaoor Chambers — the law firm for Pakistan’s next economy. A specialist Islamabad law firm advising businesses, financial institutions, investors and technology companies on technology, fintech, corporate, regulatory and disputes. In strategic partnership with M.B. KEMP (ME) LLP — Abu Dhabi, Dubai, London, Milan, Hong Kong.',
  keywords: ['LawShaoor Chambers', 'Law Strategy Future', 'Islamabad law chambers', 'Pakistan corporate law', 'M.B. KEMP (ME) LLP', 'fintech law Pakistan', 'technology law Pakistan', 'banking and finance law', 'energy law Pakistan', 'white-collar defence Pakistan', 'Pakistan GCC cross-border', 'dispute resolution Pakistan', 'DIFC ADGM advisory'],
  openGraph: {
    title: 'LawShaoor Chambers — Law. Strategy. Future.',
    description: 'The law firm for Pakistan’s next economy. A specialist Islamabad law firm, in strategic partnership with M.B. KEMP (ME) LLP — Abu Dhabi, Dubai, London, Milan, Hong Kong.',
    siteName: 'LawShaoor Chambers',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LawShaoor Chambers — Law. Strategy. Future.',
    description: 'The law firm for Pakistan’s next economy. Law. Strategy. Future.',
  },
  generator: 'v0.app',
  icons: {
    icon: [{ url: '/ls-logo-1x1.png', type: 'image/png' }],
    shortcut: '/ls-logo-1x1.png',
    apple: '/ls-logo-1x1.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${jost.variable}`}
      suppressHydrationWarning
    >
      <head>
        <ThemeScript defaultTheme="light" attribute="class" />
      </head>
      <body className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
        <SiteTracker />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
