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

const governanceContract = [
  {
    label: 'Proposal',
    value: 'not execution',
    detail: 'GENIO can prepare a reviewable plan, but the product never presents a proposal as completed work.'
  },
  {
    label: 'Approval',
    value: 'not execution',
    detail: 'Owner approval is displayed as governance metadata. It does not trigger a runtime, worker, or adapter.'
  },
  {
    label: 'Simulation',
    value: 'only',
    detail: 'Every sensitive workflow stays mock-data based, reversible, and visibly actionExecuted: false.'
  },
  {
    label: 'Owner',
    value: 'final control',
    detail: 'The system explains options and tradeoffs while the human remains the only actor who can execute outside the app.'
  }
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
    title: 'Open Personal Organizer Mode',
    description: 'Use `/personal` to see the owner-facing daily surface for documents, photos, emails, and priorities.'
  },
  {
    step: '04',
    title: 'Review the Private Lab',
    description: 'Walk through the technical governance lab, approval flow, audit metadata, and safety indicators.'
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
    items: [
      'Public `/demo` route',
      'Owner-gated `/lab` route',
      'Owner-facing `/personal` route',
      'Mock organization simulation',
      'Read-only metadata preview',
      'Email preview with fake inbox',
      'Local approval metadata',
      'In-memory audit events'
    ]
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

const governanceMaturity = [
  {
    title: 'Visible governance',
    status: 'Implemented',
    detail: 'Safety chips, approval states, audit events, risk labels, and simulation-only boundaries appear in the UX.'
  },
  {
    title: 'Execution planning',
    status: 'Preview only',
    detail: 'Timeline, rollback, and impact metadata are generated for review without running real actions.'
  },
  {
    title: 'Enterprise realism',
    status: 'Blueprinted',
    detail: 'Auth, observability, adapters, sandboxing, and persistence are documented as future controlled phases.'
  },
  {
    title: 'Autonomy boundary',
    status: 'Blocked',
    detail: 'No background jobs, no autonomous agents, no OS automation, no Gmail runtime, and no shell execution.'
  }
]

const recruiterValueSignals = [
  {
    title: 'Product engineering judgment',
    detail: 'A complex AI idea is narrowed into a concrete, reviewable organization workflow instead of an exaggerated autonomy claim.'
  },
  {
    title: 'Frontend execution',
    detail: 'Next.js 15, React 19, App Router, responsive surfaces, metadata, manifest, sitemap, and Vercel-ready delivery.'
  },
  {
    title: 'Typed architecture',
    detail: 'TypeScript contracts connect UI, API routes, backend domain models, governance metadata, and testable service boundaries.'
  },
  {
    title: 'Responsible AI UX',
    detail: 'The interface makes limits visible: proposal-only, owner-controlled, simulation-first, auditable, and reversible.'
  },
  {
    title: 'Testing discipline',
    detail: 'The public app and backend domain are validated through Jest, Testing Library, TypeScript build checks, and API smoke coverage.'
  },
  {
    title: 'Enterprise realism',
    detail: 'Future auth, audit, adapters, sandboxing, and observability stay documented as blueprints rather than implied runtime.'
  }
]

const demoNavigation = [
  {
    href: '/demo',
    label: 'Public demo',
    title: 'Start with the safe AI conversation',
    detail: 'Shows the visible product layer, typed API boundary, fallback behavior, and a low-risk public interaction.'
  },
  {
    href: '/personal',
    label: 'Personal mode',
    title: 'Then show the owner daily surface',
    detail: 'Explains how Humanity Guide OS helps organize priorities with manual checklists and no destructive actions.'
  },
  {
    href: '/lab',
    label: 'Private Lab',
    title: 'Close with governance depth',
    detail: 'Reveals GENIO metadata, approval states, audit events, execution planning preview, and simulation-only safety.'
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

const recruiterQuickStart = [
  {
    step: '01',
    title: 'Open the product story',
    description: 'Start on this page and explain Humanity Guide OS as a governed AI organization demo, not an AGI product.'
  },
  {
    step: '02',
    title: 'Show the public demo',
    description: 'Open `/demo` to show a safe multi-agent interaction with fallback-aware production behavior.'
  },
  {
    step: '03',
    title: 'Show the Private Lab',
    description: 'Open `/lab` to show the guided organization simulation, safety indicators, and proposal-only workflow.'
  },
  {
    step: '04',
    title: 'Close with architecture',
    description: 'Use `/about` and the README to separate current features from future controlled blueprints.'
  }
]

const demonstrationPoints = [
  'Product UX: a complex AI concept explained through a calm two-minute walkthrough.',
  'Frontend engineering: responsive Next.js App Router UI with typed client/server boundaries.',
  'Governance design: visible approval, audit, simulation, and no-execution constraints.',
  'Production mindset: metadata, sitemap, manifest, tests, build checks, and deployment-oriented copy.'
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
            <Link className="secondary-button" href="/personal">
              Open Personal Mode
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

      <section className="governance-contract" aria-labelledby="governance-contract-heading">
        <div className="governance-contract__intro">
          <p className="result-eyebrow">Governance contract</p>
          <h2 id="governance-contract-heading">The system is designed to stop before power becomes execution.</h2>
          <p>
            This first-screen contract keeps the demo recruiter-safe: proposals are inspectable, approvals are
            explicit, and every sensitive flow remains simulation-only until a real controlled runtime exists.
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

      <section className="section-block recruiter-start" aria-labelledby="recruiter-quick-start-heading">
        <div className="section-head">
          <p className="result-eyebrow">Recruiter Quick Start</p>
          <h2 className="section-title" id="recruiter-quick-start-heading">A clean walkthrough for interviews and video demos</h2>
          <p>
            Use this sequence for GitHub, Vercel, portfolio reviews, or a short Loom recording. It keeps the story
            practical, safe, and easy to verify.
          </p>
        </div>

        <div className="quick-start-grid">
          {recruiterQuickStart.map((item) => (
            <article className="quick-start-card" key={item.step}>
              <span className="step-index">{item.step}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block recruiter-value" aria-labelledby="for-recruiters-heading">
        <div className="section-head">
          <p className="result-eyebrow">For recruiters</p>
          <h2 className="section-title" id="for-recruiters-heading">What this project proves in a professional review</h2>
          <p>
            Humanity Guide OS is presented as a safe AI product demo: strong frontend craft, typed architecture,
            governance maturity, and clear restraint around what is not implemented.
          </p>
        </div>

        <div className="recruiter-value-grid">
          {recruiterValueSignals.map((item) => (
            <article className="recruiter-value-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block demo-navigation" aria-labelledby="demo-navigation-heading">
        <div className="section-head">
          <p className="result-eyebrow">Demo navigation</p>
          <h2 className="section-title" id="demo-navigation-heading">What to open first, second, and third</h2>
          <p>
            The walkthrough is intentionally ordered from simple product proof to deeper governance review. Each
            route shows value without claiming real automation.
          </p>
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

      <section className="section-block" aria-labelledby="demonstrates-heading">
        <div className="section-head">
          <p className="result-eyebrow">What this project demonstrates</p>
          <h2 className="section-title" id="demonstrates-heading">A serious product surface with explicit limits</h2>
          <p>
            The value is not a fake autonomous system. The value is product clarity, architecture discipline, and a
            credible path toward controlled AI capabilities.
          </p>
        </div>

        <div className="proof-list">
          {demonstrationPoints.map((item) => (
            <article className="proof-item" key={item}>
              <span />
              <p>{item}</p>
            </article>
          ))}
        </div>
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

      <section className="section-block" aria-labelledby="governance-maturity-heading">
        <div className="section-head">
          <p className="result-eyebrow">Governance maturity</p>
          <h2 className="section-title" id="governance-maturity-heading">A clearer view of what is ready, previewed, and blocked</h2>
          <p>
            The refinement layer makes the Owner and recruiter experience easier to audit without adding runtime
            power or blurring the architecture boundary.
          </p>
        </div>

        <div className="maturity-grid">
          {governanceMaturity.map((item) => (
            <article className="maturity-card" key={item.title}>
              <span>{item.status}</span>
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
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
