import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Link from 'next/link'
import { ChatWidget } from '../components/ChatWidget'
import './globals.css'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://unv-hmnd.vercel.app'

export const viewport = {
  themeColor: '#070b11',
  colorScheme: 'dark'
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Humanity Guide OS | UNV-HMND',
    template: '%s | UNV-HMND'
  },
  description:
    'A human-centered Full Stack journey built through learning in public, responsible experimentation, and proposal-first product design.',
  keywords: ['Next.js', 'TypeScript', 'Humanity Guide OS', 'Responsible AI', 'Full Stack', 'Learning in Public', 'Portfolio'],
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
    canonical: siteUrl
  },
  openGraph: {
    title: 'Humanity Guide OS | UNV-HMND',
    description:
      'A human-centered Full Stack journey exploring responsible product design, guided demos, and controlled proposals.',
    type: 'website',
    siteName: 'UNV-HMND'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Humanity Guide OS | UNV-HMND',
    description:
      'Learning in public through Full Stack projects, responsible experimentation, and proposal-first design.'
  }
}

const navigationItems = [
  { href: '/', label: 'Home' },
  { href: '/demo', label: 'Demo' },
  { href: '/lab', label: 'Private Lab' },
  { href: '/personal', label: 'Personal' },
  { href: '/about', label: 'Architecture' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/cv', label: 'CV' }
]

const footerNavigationItems = [
  { href: '/', label: 'Home' },
  { href: '/demo', label: 'Demo' },
  { href: '/lab', label: 'Private Lab' },
  { href: '/personal', label: 'Personal' },
  { href: '/about', label: 'Architecture' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/cv', label: 'CV' }
]

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <div className="site-shell site-header__inner">
            <Link className="brand" href="/">
              <strong>Humanity Guide OS</strong>
              <span>Human-centered Full Stack journey</span>
            </Link>

            <nav aria-label="Primary navigation" className="site-nav">
              {navigationItems.map((item) => (
                <Link className="nav-link" href={item.href} key={item.href}>
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </header>

        {children}

        <footer className="site-footer">
          <div className="site-shell site-footer__grid">
            <section className="site-footer__identity" aria-labelledby="footer-brand-heading">
              <p className="site-footer__eyebrow">Humanity Guide OS · UNV-HMND</p>
              <h2 id="footer-brand-heading">Human-centered systems</h2>
              <div className="site-footer__principles" aria-label="Project principles">
                <span>Learning in public</span>
                <span>Responsible AI</span>
                <span>Full Stack journey</span>
              </div>
            </section>

            <nav aria-label="Footer navigation" className="site-footer__section">
              <p className="site-footer__title">Explore</p>
              <div className="site-footer__links">
                {footerNavigationItems.map((item) => (
                  <Link href={item.href} key={item.href}>
                    {item.label}
                  </Link>
                ))}
              </div>
            </nav>
          </div>

          <div className="site-shell site-footer__bottom">
            <span>© Raider Del Castillo Abalos</span>
            <span>Humanity Guide OS · UNV-HMND</span>
            <span>Built with Next.js + React + TypeScript</span>
            <span>Learning in public.</span>
          </div>
        </footer>

        <ChatWidget />
      </body>
    </html>
  )
}
