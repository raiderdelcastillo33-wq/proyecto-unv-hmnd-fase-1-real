import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Humanity Guide OS - Governed AI Product Demo',
  description:
    'A governance-first, human-centered product demo for creating reviewable organization proposals from simulated data.'
}

const stackHighlights = [
  'Humanity Guide OS',
  'Governance-first',
  'Proposal-only',
  'Human-centered',
  'Simulation-only',
  'Next.js + React + TypeScript'
]

const productStatus = [
  {
    label: 'Public Demo',
    status: 'Current capability',
    detail: 'A guided conversation UI with typed API boundaries and safe fallback behavior.'
  },
  {
    label: 'Private Lab',
    status: 'Current capability',
    detail: 'A simulation workspace for reviewing organization proposals, approvals, risk labels, and audit metadata.'
  },
  {
    label: 'GENIO',
    status: 'Governance metadata',
    detail: 'A visible policy profile that describes risk, approval, and orchestration boundaries. It is not an autonomous agent.'
  },
  {
    label: 'Adapters and runtime',
    status: 'Not implemented',
    detail: 'There is no real filesystem, terminal, email, database, authentication, memory, or external execution.'
  }
]

const capabilitySplit = [
  {
    title: 'Current capabilities',
    items: [
      'Public `/demo` route',
      'Owner-gated `/lab` simulation',
      'Owner-facing `/personal` route',
      'Mock organization proposals',
      'Approval and risk metadata',
      'In-memory audit events'
    ]
  },
  {
    title: 'Future blueprints',
    items: [
      'Real owner authentication',
      'Persistent audit storage',
      'Read-only external adapters',
      'Controlled information retrieval',
      'Secure runtime sandbox'
    ]
  },
  {
    title: 'Not implemented',
    items: [
      'No real filesystem or email access',
      'No terminal or runtime execution',
      'No database or real authentication',
      'No persistent memory',
      'No autonomous agents or background workers'
    ]
  }
]

const governanceContract = [
  {
    label: 'Proposal',
    value: 'not execution',
    detail: 'The product prepares reviewable options and never presents a proposal as completed work.'
  },
  {
    label: 'Approval',
    value: 'metadata only',
    detail: 'Approval states demonstrate governance. They do not trigger workers, adapters, or external actions.'
  },
  {
    label: 'Simulation',
    value: 'mock data only',
    detail: 'Sensitive workflows remain simulated, reversible, and visibly marked as not executed.'
  },
  {
    label: 'Human',
    value: 'final authority',
    detail: 'The system explains options and tradeoffs. A person remains responsible for every real-world action.'
  }
]

const demoNavigation = [
  {
    href: '/demo',
    label: 'Public demo',
    title: 'See the product interaction',
    detail: 'Review the guided conversation flow and its safe fallback behavior.'
  },
  {
    href: '/lab',
    label: 'Private Lab',
    title: 'Inspect governance',
    detail: 'See simulated proposals, approval states, audit events, and no-execution indicators.'
  },
  {
    href: '/personal',
    label: 'Personal mode',
    title: 'View the owner experience',
    detail: 'Explore a daily organization surface built around manual, human-controlled decisions.'
  }
]

const engineeringSignals = [
  {
    title: 'Product clarity',
    detail: 'The interface separates working demo surfaces from future architecture and unavailable capabilities.'
  },
  {
    title: 'Typed implementation',
    detail: 'Next.js, React, and TypeScript support clear UI, API, and domain boundaries.'
  },
  {
    title: 'Responsible scope',
    detail: 'Safety limits are part of the product experience, not hidden in technical documentation.'
  }
]

export default function HomePage() {
  return (
    <main className="page-shell">
      <section className="hero">
        <div className="hero-copy hero-copy--stacked">
          <span className="hero-badge">Humanity Guide OS</span>
          <h1>Governed AI organization demo</h1>
          <p>
            Humanity Guide OS turns simulated digital clutter into reviewable organization proposals. It is a
            human-centered product demo with visible governance and no real-world execution.
          </p>

          <div className="tag-row">
            {stackHighlights.map((item) => (
              <span className="tech-pill" key={item}>
                {item}
              </span>
            ))}
          </div>

          <div className="hero-actions">
            <Link className="primary-button" href="/demo">
              Try public demo
            </Link>
            <Link className="secondary-button" href="/lab">
              Explore governance lab
            </Link>
            <Link className="secondary-button" href="/about">
              Review architecture
            </Link>
          </div>
        </div>

        <aside className="hero-card hero-card--spotlight">
          <p className="result-eyebrow">Product boundary</p>
          <h2>Analysis {'->'} Proposal {'->'} Human decision</h2>
          <p className="meta-text">
            The current product demonstrates interaction, proposal review, and governance metadata. It does not
            provide autonomous agents, persistent memory, external automation, or a real execution runtime.
          </p>

          <div className="metrics-grid">
            <article className="metric-card">
              <strong className="metric-value">Current</strong>
              <span className="metric-label">Interactive demo surfaces</span>
            </article>
            <article className="metric-card">
              <strong className="metric-value">Mock</strong>
              <span className="metric-label">Data and sensitive workflows</span>
            </article>
            <article className="metric-card">
              <strong className="metric-value">0</strong>
              <span className="metric-label">Real external actions</span>
            </article>
            <article className="metric-card">
              <strong className="metric-value">Human</strong>
              <span className="metric-label">Final authority</span>
            </article>
          </div>
        </aside>
      </section>

      <section className="section-block" aria-labelledby="status-heading">
        <div className="section-head">
          <p className="result-eyebrow">Product status</p>
          <h2 className="section-title" id="status-heading">
            What exists today
          </h2>
          <p>Working demo surfaces are clearly separated from governance concepts and unimplemented infrastructure.</p>
        </div>

        <div className="architecture-summary">
          {productStatus.map((item) => (
            <article className="architecture-summary__item" key={item.label}>
              <span>{item.status}</span>
              <h3>{item.label}</h3>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block" aria-labelledby="capabilities-heading">
        <div className="section-head">
          <p className="result-eyebrow">Capability map</p>
          <h2 className="section-title" id="capabilities-heading">
            Current capabilities, future blueprints, and not implemented
          </h2>
          <p>Blueprints describe a possible governed direction. They are not claims about the current product.</p>
        </div>

        <div className="capability-split">
          {capabilitySplit.map((group) => (
            <article className="capability-column" key={group.title}>
              <h3>{group.title}</h3>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="governance-contract" aria-labelledby="governance-heading">
        <div className="governance-contract__intro">
          <p className="result-eyebrow">Governance boundaries</p>
          <h2 id="governance-heading">Designed to stop before execution</h2>
          <p>
            Humanity Guide OS is responsible because its limits are explicit, inspectable, and present throughout
            the experience.
          </p>
        </div>

        <div className="governance-contract__grid">
          {governanceContract.map((item) => (
            <article className="governance-contract__item" key={item.label}>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block demo-navigation" aria-labelledby="demo-heading">
        <div className="section-head">
          <p className="result-eyebrow">Explore the product</p>
          <h2 className="section-title" id="demo-heading">
            A short, verifiable walkthrough
          </h2>
          <p>Start with the interaction, inspect its governance, then view the human-controlled daily surface.</p>
        </div>

        <div className="demo-navigation-grid">
          {demoNavigation.map((item, index) => (
            <Link className="demo-navigation-card" href={item.href} key={item.href}>
              <span className="step-index">{String(index + 1).padStart(2, '0')}</span>
              <small>{item.label}</small>
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="section-block" aria-labelledby="engineering-heading">
        <div className="section-head">
          <p className="result-eyebrow">Why this project matters</p>
          <h2 className="section-title" id="engineering-heading">
            Product engineering with measured AI claims
          </h2>
        </div>

        <div className="signal-grid">
          {engineeringSignals.map((item) => (
            <article className="signal-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
