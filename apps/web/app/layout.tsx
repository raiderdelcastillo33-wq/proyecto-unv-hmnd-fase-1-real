import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Link from 'next/link'
import { ChatWidget } from '../components/ChatWidget'
import './globals.css'

export const viewport = {
  themeColor: '#070b11',
  colorScheme: 'dark'
}

export const metadata: Metadata = {
  title: {
    default: 'Humanity Guide OS | UNV-HMND',
    template: '%s | UNV-HMND'
  },
  description:
    'Humanity Guide OS demo built with Next.js, TypeScript, governed AI workflows, simulation-only lab UX, and production-ready portfolio architecture.',
  keywords: ['Next.js', 'TypeScript', 'Humanity Guide OS', 'AI Governance', 'App Router', 'Vercel', 'Portfolio Frontend'],
  authors: [{ name: 'Raider del Castillo' }],
  creator: 'Raider del Castillo',
  applicationName: 'UNV-HMND',
  manifest: '/manifest.webmanifest',
  icons: {
    icon: '/icon.svg',
    apple: '/icon.svg'
  },
  category: 'technology',
  robots: {
    index: true,
    follow: true
  },
  alternates: {
    canonical: '/'
  },
  openGraph: {
    title: 'Humanity Guide OS | UNV-HMND',
    description:
      'Production-oriented Next.js portfolio demonstrating governed AI UX, public demo flow, and simulation-only Private Lab architecture.',
    type: 'website',
    siteName: 'UNV-HMND'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Humanity Guide OS | UNV-HMND',
    description:
      'Recruiter-friendly AI product demo with a governed public demo and simulation-only Private Lab.'
  }
}

const navigationItems = [
  { href: '/', label: 'Accueil' },
  { href: '/demo', label: 'Démo' },
  { href: '/lab', label: 'Private Lab' },
  { href: '/about', label: 'Architecture' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/gallery', label: 'Galerie' },
  { href: '/cv', label: 'CV' }
]

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <header className="site-header">
          <div className="site-shell site-header__inner">
            <Link className="brand" href="/">
              <span>Humanity Guide OS</span>
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

        <ChatWidget />
      </body>
    </html>
  )
}
