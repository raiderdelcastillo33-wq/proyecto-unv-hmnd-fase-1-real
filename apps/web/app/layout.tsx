import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Link from 'next/link'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'UNV-HMND | AI Agent System',
    template: '%s | UNV-HMND'
  },
  description:
    'Portfolio-ready Next.js experience showcasing an AI Agent System, internal API routing, TypeScript reliability, and Vercel-ready deployment.',
  keywords: ['Next.js', 'TypeScript', 'AI Agent System', 'App Router', 'Vercel', 'Frontend Portfolio'],
  authors: [{ name: 'Raider del Castillo' }],
  creator: 'Raider del Castillo',
  applicationName: 'UNV-HMND',
  robots: {
    index: true,
    follow: true
  },
  openGraph: {
    title: 'UNV-HMND | AI Agent System',
    description:
      'A production-minded Next.js portfolio project with a live demo flow, internal API proxying, and recruiter-friendly technical storytelling.',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UNV-HMND | AI Agent System',
    description:
      'Next.js portfolio experience designed to show a polished UI, a working demo, and a deployable system architecture.'
  }
}

const navigationItems = [
  { href: '/', label: 'Home' },
  { href: '/demo', label: 'Demo' },
  { href: '/about', label: 'Architecture' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/cv', label: 'CV' }
]

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <div className="site-shell site-header__inner">
            <Link className="brand" href="/">
              <span>AI Agent Portfolio</span>
              <strong>UNV-HMND</strong>
            </Link>

            <nav className="site-nav">
              {navigationItems.map((item) => (
                <Link className="nav-link" href={item.href} key={item.href}>
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </header>

        {children}
      </body>
    </html>
  )
}
