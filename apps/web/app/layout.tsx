import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Link from 'next/link'
import './globals.css'

export const metadata: Metadata = {
  title: 'UNV-HMND',
  description: 'Next.js frontend for UNV-HMND'
}

const navigationItems = [
  { href: '/', label: 'Accueil' },
  { href: '/demo', label: 'Démo' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/cv', label: 'CV' }
]

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <header className="site-header">
          <div className="site-shell site-header__inner">
            <Link className="brand" href="/">
              <span>UNV-HMND</span>
              <strong>Next Frontend</strong>
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
