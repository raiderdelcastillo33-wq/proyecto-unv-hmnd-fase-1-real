import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Humanity Guide OS - AI Product Demo & Portfolio',
  description:
    'Recruiter-friendly Next.js portfolio and governed AI product demo showing Humanity Guide OS, public multi-agent demo, and simulation-only Private Lab.'
}

const systemSignals = [
  {
    kicker: 'Product clarity',
    title: 'A demo that explains itself quickly',
    description: 'Humanity Guide OS shows a concrete organization workflow, visible safety boundaries, and a clear recruiter walkthrough.'
  },
  {
    kicker: 'Engineering quality',
    title: 'Typed AI flows with production discipline',
    description: 'Next.js 15, React 19, TypeScript, API routes, backend separation, tests, and conservative fallbacks.'
  },
  {
    kicker: 'Governance-first',
    title: 'Simulation-only by design',
    description: 'The lab demonstrates future AI operating system ideas without filesystem access, terminal execution, automation, or AGI claims.'
  }
]

const stackHighlights = [
  'Humanity Guide OS',
  'Next.js 15 App Router',
  'React 19 + TypeScript',
  'Governed AI UX',
  'Proposal-only Lab',
  'Typed Node backend'
]

const walkthrough = [
  {
    step: '01',
    title: 'Start with the product story',
    description: 'Understand the problem: human digital chaos, unclear priorities, and the need for controlled AI guidance.'
  },
  {
    step: '02',
    title: 'Open the public demo',
    description: 'Test the safe multi-agent conversation flow and verify the Browser -> Next.js -> API route boundary.'
  },
  {
    step: '03',
    title: 'Review the Private Lab',
    description: 'Walk through the simulation-only organization demo, governance badges, approval flow, and safety indicators.'
  }
]

const onboardingSteps = [
  {
    title: 'What problem does it solve?',
    description: 'It turns simulated digital clutter into a clear, reviewable organization proposal.'
  },
  {
    title: 'Why is it safe?',
    description: 'Everything is mock data, proposal-only, owner-controlled, and explicitly actionExecuted: false.'
  },
  {
    title: 'What should a recruiter notice?',
    description: 'Product thinking, frontend polish, typed architecture, testing discipline, and responsible AI boundaries.'
  }
]

const architectureSummary = [
  {
    label: 'Public Demo',
    status: 'Real today',
    detail: 'Multi-agent conversation UI with safe fallback behavior.'
  },
  {
    label: 'Private Lab',
    status: 'Real today',
    detail: 'Owner-gated simulation workspace with auditable proposals.'
  },
  {
    label: 'GENIO',
    status: 'Metadata today',
    detail: 'Central governance profile for risk, approvals, and orchestration.'
  },
  {
    label: 'Future Adapters',
    status: 'Blueprint only',
    detail: 'No filesystem, terminal, Gmail, runtime, or external execution exists yet.'
  }
]

const capabilitySplit = [
  {
    title: 'Current capabilities',
    items: ['Public `/demo` route', 'Owner-gated `/lab` route', 'Mock organization simulation', 'Local approval metadata', 'In-memory audit events']
  },
  {
    title: 'Future blueprints',
    items: ['Real owner auth', 'Persistent audit storage', 'Read-only adapters', 'Secure memory retrieval', 'Controlled runtime sandbox']
  },
  {
    title: 'Not implemented',
    items: ['No real filesystem', 'No terminal execution', 'No background workers', 'No DB/auth runtime', 'No autonomous agents']
  }
]

const projectHighlights = [
  {
    title: 'Governance-first Architecture',
    description: 'GENIO centralizes policy, risk, approvals, and future orchestration before any sensitive capability can exist.'
  },
  {
    title: 'Simulation-first Safety',
    description: 'The Private Lab demonstrates organization value with mock data and visible no-execution boundaries.'
  },
  {
    title: 'Human-centered AI',
    description: 'The system is designed to reduce chaos, explain tradeoffs, and keep the Owner as final authority.'
  },
  {
    title: 'Portfolio-grade Product UX',
    description: 'The public flow is built for recruiters, screenshots, short walkthroughs, and production deployment review.'
  }
]

const showcaseCards = [
  {
    eyebrow: 'Current MVP',
    title: 'Public demo + private simulation lab',
    description:
      'A working Next.js experience with public multi-agent demo, owner-gated lab, proposal lifecycle, and in-memory audit trail.'
  },
  {
    eyebrow: 'Future Controlled Capabilities',
    title: 'Blueprints without unsafe runtime',
    description:
      'Auth, audit persistence, file preview, adapters, memory, and sandbox runtime are documented as future controlled phases.'
  },
  {
    eyebrow: 'Technical Stack',
    title: 'Next.js 15, React 19, TypeScript, Node.js',
    description:
      'Strict TypeScript, App Router, Jest + Testing Library, modular backend domain, and deployment-ready Vercel frontend.'
  },
  {
    eyebrow: 'Architecture Principles',
    title: 'Proposal-first, owner-controlled, auditable',
    description:
      'Every sensitive capability remains reversible, approval-aware, metadata-safe, and clearly separated from real execution.'
  }
]

export default function HomePage() {
  return (
    <main className="page-shell">
      <section className="hero">
        <div className="hero-copy hero-copy--stacked">
          <span className="hero-badge">Humanity Guide OS - Recruiter walkthrough</span>
          <h1>Governed AI organization demo</h1>
          <p>
            A premium portfolio experience showing how responsible AI can reduce simulated digital chaos with
            clear governance, visible safety boundaries, and production-minded frontend architecture.
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
              Start public demo
            </Link>
            <Link className="secondary-button" href="/lab">
              Open Private Lab
            </Link>
            <Link className="secondary-button" href="/about">
              Review architecture
            </Link>
            <Link className="secondary-button" href="/portfolio">
              Explore portfolio
            </Link>
          </div>
        </div>

        <aside className="hero-card hero-card--spotlight">
          <p className="result-eyebrow">Two-minute value read</p>
          <h2>Problem {'->'} Analysis {'->'} Proposal {'->'} Human Approval</h2>
          <p className="meta-text">
            The app connects a public demo, a private simulation lab, and a documented governance model. It is
            intentionally safe: proposal-only, simulation-only, and no real execution.
          </p>

          <div className="metrics-grid">
            <article className="metric-card">
              <strong className="metric-value">2 min</strong>
              <span className="metric-label">Recruiter-friendly walkthrough</span>
            </article>
            <article className="metric-card">
              <strong className="metric-value">0</strong>
              <span className="metric-label">Real filesystem or terminal actions</span>
            </article>
            <article className="metric-card">
              <strong className="metric-value">35+</strong>
              <span className="metric-label">Backend/domain checks in the suite</span>
            </article>
            <article className="metric-card">
              <strong className="metric-value">Vercel</strong>
              <span className="metric-label">Frontend deployment target</span>
            </article>
          </div>
        </aside>
      </section>

      <section className="section-block presentation-band" aria-labelledby="onboarding-heading">
        <div className="section-head">
          <p className="result-eyebrow">Mini onboarding visual</p>
          <h2 className="section-title" id="onboarding-heading">How Humanity Guide OS works</h2>
          <p>
            The project is designed to be explainable before it is powerful: show the problem, show the proposal,
            show the limits, then show the architecture.
          </p>
        </div>

        <div className="onboarding-grid">
          {onboardingSteps.map((item, index) => (
            <article className="onboarding-card" key={item.title}>
              <span className="step-index">{String(index + 1).padStart(2, '0')}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block" aria-labelledby="project-highlights-heading">
        <div className="section-head">
          <p className="result-eyebrow">Project Highlights</p>
          <h2 className="section-title" id="project-highlights-heading">A portfolio showcase built like a product</h2>
          <p>
            The showcase is intentionally practical: it demonstrates useful AI interaction, but keeps safety,
            observability, and future production boundaries visible.
          </p>
        </div>

        <div className="showcase-grid">
          {projectHighlights.map((item) => (
            <article className="showcase-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block">
        <div className="section-head">
          <p className="result-eyebrow">Visual architecture summary</p>
          <h2 className="section-title">Current capabilities vs future blueprints</h2>
          <p>
            This distinction is the core of the production story: what works today is modest and stable; what comes
            later is explicitly scoped, governed, and not overstated.
          </p>
        </div>

        <div className="architecture-summary">
          {architectureSummary.map((item) => (
            <article className="architecture-summary__item" key={item.label}>
              <span>{item.status}</span>
              <h3>{item.label}</h3>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block">
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

      <section className="section-block" aria-labelledby="showcase-readiness-heading">
        <div className="section-head">
          <p className="result-eyebrow">Deployment-ready showcase</p>
          <h2 className="section-title" id="showcase-readiness-heading">What is real, what is blueprint, what is blocked</h2>
          <p>
            This page is screenshot-ready and video-friendly because it explains capability status before a reviewer
            needs to inspect the code.
          </p>
        </div>

        <div className="showcase-grid showcase-grid--wide">
          {showcaseCards.map((item) => (
            <article className="showcase-card showcase-card--wide" key={item.title}>
              <p className="result-eyebrow">{item.eyebrow}</p>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block">
        <div className="section-head">
          <p className="result-eyebrow">Recruiter signals</p>
          <h2 className="section-title">What a recruiter or technical manager should understand quickly</h2>
          <p>
            The first scroll should communicate product judgment: clear UX, stable engineering, measured AI claims,
            and a credible path from demo to production architecture.
          </p>
        </div>

        <div className="signal-grid">
          {systemSignals.map((item) => (
            <article className="signal-card" key={item.title}>
              <span className="signal-kicker">{item.kicker}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block">
        <div className="section-head">
          <p className="result-eyebrow">Demo walkthrough</p>
          <h2 className="section-title">A short path with a technical payoff</h2>
          <p>
            The navigation is intentionally simple: public proof first, private lab simulation second, architecture
            details third.
          </p>
        </div>

        <div className="timeline-grid">
          {walkthrough.map((item) => (
            <article className="timeline-card" key={item.step}>
              <span className="step-index">{item.step}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block">
        <article className="story-card">
          <div>
            <p className="result-eyebrow">Recommended presentation flow</p>
            <h2 className="section-title">Show the product, then show the safety model</h2>
            <p>
              Start with `/demo`, then open `/lab` to show the guided organization simulation, and finish with the
              architecture page for implementation details.
            </p>
          </div>

          <div className="story-card__actions">
            <Link className="primary-button" href="/demo">
              Open /demo
            </Link>
            <Link className="secondary-button" href="/lab">
              Open /lab
            </Link>
            <Link className="secondary-button" href="/about">
              Architecture
            </Link>   
          </div>
        </article>
      </section>
    </main>
  )
}
