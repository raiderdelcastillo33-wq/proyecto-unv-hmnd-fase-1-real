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
    canonical: siteUrl
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
  { href: '/personal', label: 'Personal' },
  { href: '/about', label: 'Architecture' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/gallery', label: 'Galerie' },
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

const socialPresenceItems = ['GitHub', 'LinkedIn', 'Instagram', 'TikTok', 'Facebook', 'X / Twitter', 'YouTube', 'Email']

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <header className="site-header">
          <div className="site-shell site-header__inner">
            <Link className="brand" href="/">
              <strong>Humanity Guide OS</strong>
              <span>UNV-HMND · Human-centered systems</span>
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
              <p className="site-footer__eyebrow">Humanity Guide OS / UNV-HMND</p>
              <h2 id="footer-brand-heading">Built around people, learning, and responsible growth.</h2>
              <p>
                Human-centered AI systems, Full Stack learning and responsible product architecture.
              </p>
              <div className="site-footer__principles" aria-label="Project principles">
                <span>Human-centered</span>
                <span>Governance-first</span>
                <span>Proposal-only</span>
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

            <nav aria-label="Future social presence" className="site-footer__section">
              <p className="site-footer__title">Social Presence</p>
              <p className="site-footer__note">Build in public and future community layer.</p>
              <div className="site-footer__socials">
                {socialPresenceItems.map((item) => (
                  <a aria-label={`${item} profile — coming soon`} href="#" key={item}>
                    {item}
                  </a>
                ))}
              </div>
            </nav>
          </div>

          <div className="site-shell site-footer__bottom">
            <span>Humanity Guide OS · UNV-HMND</span>
            <span>Learning in public. Building with human approval.</span>
          </div>
        </footer>

        <ChatWidget />
      </body>
    </html>
  )
}
