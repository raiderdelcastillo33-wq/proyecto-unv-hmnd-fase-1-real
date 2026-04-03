import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Link from 'next/link'
import { ChatWidget } from '../components/ChatWidget'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'UNV-HMND | Système d’Agents IA',
    template: '%s | UNV-HMND'
  },
  description:
    'Expérience Next.js prête pour portfolio montrant un système d’agents IA, routage API interne, fiabilité TypeScript et déploiement Vercel.',
  keywords: ['Next.js', 'TypeScript', 'Système d’Agents IA', 'App Router', 'Vercel', 'Portfolio Frontend'],
  authors: [{ name: 'Raider del Castillo' }],
  creator: 'Raider del Castillo',
  applicationName: 'UNV-HMND',
  robots: {
    index: true,
    follow: true
  },
  openGraph: {
    title: 'UNV-HMND | Système d’Agents IA',
    description:
      'Projet portfolio Next.js orienté production avec un flux démo en direct, proxy d’API interne et narration technique adaptée aux recruteurs.',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UNV-HMND | Système d’Agents IA',
    description:
      'Expérience portfolio Next.js conçue pour montrer une UI soignée, une démo fonctionnelle et une architecture système déployable.'
  }
}

const navigationItems = [
  { href: '/', label: 'Accueil' },
  { href: '/demo', label: 'Démo' },
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

        <ChatWidget />
      </body>
    </html>
  )
}
