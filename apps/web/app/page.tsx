import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Humanity Guide OS - Human-centered AI Workspace',
  description:
    'A governance-first workspace for learning, planning, interviews, personal organization, and responsible AI experimentation.'
}

const stackHighlights = [
  'Raider del Castillo',
  'Full Stack Journey',
  'Learning in Public',
  'Governance-first',
  'Proposal-only',
  'Responsible AI'
]

const connectedSystems = [
  {
    label: 'Learning OS',
    detail: 'Holberton, study plans, technical practice, and a path from questions to working knowledge.'
  },
  {
    label: 'Human Interview OS',
    detail: 'People, interviews, problems, follow-up, and plans organized with human context.'
  },
  {
    label: 'Personal Organizer',
    detail: 'Documents, emails, photos, priorities, and daily clarity represented through safe previews.'
  },
  {
    label: 'Private AI Lab',
    detail: 'Governance, proposals, approvals, and simulations designed to stop before real execution.'
  },
  {
    label: 'Builder Path',
    detail: 'A journey from ideas and documentation to web apps, portfolios, and future tools.'
  }
]

const presentAndFuture = [
  {
    title: 'Present',
    items: [
      'Public demo',
      'Private lab simulation',
      'Personal organizer preview',
      'Documentation architecture',
      'Professional portfolio',
      'Proposal-only workflows'
    ]
  },
  {
    title: 'Future blueprint',
    items: [
      'Controlled Notion integration',
      'Real scheduling',
      'Safe, scoped memory',
      'Personalized learning paths',
      'Interview workflows',
      'Community layer',
      'Builder tools'
    ]
  }
]

const governanceContract = [
  {
    label: 'Proposal',
    value: '!= execution',
    detail: 'A generated plan is a reviewable suggestion, never a completed real-world action.'
  },
  {
    label: 'Human approval',
    value: 'remains mandatory',
    detail: 'The person keeps final authority over every meaningful decision and external action.'
  },
  {
    label: 'Sensitive workflows',
    value: 'simulation-only',
    detail: 'Private data, scheduling, memory, integrations, and automation remain controlled future visions.'
  }
]

const recruiterClarity = [
  {
    status: 'Exists today',
    title: 'Working web experience',
    detail: 'Public demo, private lab, personal mode, architecture, portfolio, gallery, and CV routes.'
  },
  {
    status: 'Simulation',
    title: 'Sensitive workflows',
    detail: 'Organization, approvals, audit events, and planning previews use controlled or mock data.'
  },
  {
    status: 'Blueprint',
    title: 'Future capabilities',
    detail: 'Memory, scheduling, integrations, learning paths, and community tools remain future architecture.'
  },
  {
    status: 'Intentionally blocked',
    title: 'Real execution',
    detail: 'No autonomous agents, filesystem control, terminal execution, background workers, or hidden automation.'
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
    title: 'Explore the private lab',
    detail: 'See simulated proposals, approval states, audit events, and no-execution indicators.'
  },
  {
    href: '/personal',
    label: 'Personal mode',
    title: 'View the owner experience',
    detail: 'Explore a daily organization surface built around manual, human-controlled decisions.'
  }
]

const socialChannels = ['GitHub', 'LinkedIn', 'Instagram', 'TikTok', 'Facebook', 'X / Twitter', 'YouTube', 'Email']

export default function HomePage() {
  return (
    <main className="page-shell">
      <section className="hero">
        <div className="hero-copy hero-copy--stacked">
          <span className="hero-badge">Raider del Castillo · Humanity Guide OS</span>
          <h1>Build a clearer path from learning to action.</h1>
          <p>
            A human-centered Full Stack journey shaped through Holberton practice, responsible AI experiments,
            personal organization, and learning in public.
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
              Explore private lab
            </Link>
            <Link className="tech-pill" href="/about">
              Review architecture
            </Link>
            <Link className="tech-pill" href="/portfolio">
              View portfolio
            </Link>
          </div>
        </div>

        <aside className="hero-card hero-card--spotlight">
          <p className="result-eyebrow">A personal system with professional depth</p>
          <h2>Learn {'->'} Organize {'->'} Build {'->'} Grow</h2>
          <p className="meta-text">
            Universo Humano brings together a personal workspace, private lab, professional portfolio, and future
            learning platform without overstating what the current web product can do.
          </p>

          <div className="metrics-grid">
            <article className="metric-card">
              <strong className="metric-value">Human</strong>
              <span className="metric-label">Centered on real needs</span>
            </article>
            <article className="metric-card">
              <strong className="metric-value">Private</strong>
              <span className="metric-label">Lab for safe exploration</span>
            </article>
            <article className="metric-card">
              <strong className="metric-value">Full Stack</strong>
              <span className="metric-label">Built through practice</span>
            </article>
            <article className="metric-card">
              <strong className="metric-value">Governed</strong>
              <span className="metric-label">Proposal before action</span>
            </article>
          </div>
        </aside>
      </section>

      <section className="section-block" aria-labelledby="connections-heading">
        <div className="section-head">
          <p className="result-eyebrow">Universo Humano</p>
          <h2 className="section-title" id="connections-heading">
            What this system connects
          </h2>
          <p>One evolving system for the work of learning, understanding people, organizing life, and building.</p>
        </div>

        <div className="showcase-grid">
          {connectedSystems.map((item) => (
            <article className="showcase-card" key={item.label}>
              <h3>{item.label}</h3>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block" aria-labelledby="recruiter-clarity-heading">
        <div className="section-head">
          <p className="result-eyebrow">Recruiter clarity</p>
          <h2 className="section-title" id="recruiter-clarity-heading">
            What exists, what is simulated, and what stays blocked
          </h2>
          <p>Human approval remains mandatory for every meaningful real-world action.</p>
        </div>

        <div className="architecture-summary">
          {recruiterClarity.map((item) => (
            <article className="architecture-summary__item" key={item.status}>
              <span>{item.status}</span>
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block" aria-labelledby="present-future-heading">
        <div className="section-head">
          <p className="result-eyebrow">Honest product scope</p>
          <h2 className="section-title" id="present-future-heading">
            Present vs Future
          </h2>
          <p>
            The present is a working product showcase. Integrations, scheduling, memory, community, and advanced
            tools remain controlled blueprints rather than current capabilities.
          </p>
        </div>

        <div className="capability-split">
          {presentAndFuture.map((group) => (
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
          <h2 id="governance-heading">Responsible by design</h2>
          <p>
            Notion is not connected to production, ChatGPT is not directly integrated, and the website does not
            control VS Code. There are no real autonomous agents, total memory, user backend, or working agenda.
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

      <section className="section-block presentation-band" aria-labelledby="why-heading">
        <div className="section-head">
          <p className="result-eyebrow">Why it matters</p>
          <h2 className="section-title" id="why-heading">
            Technology should help people move forward
          </h2>
          <p>
            The goal is not to replace people. The goal is to reduce chaos, organize knowledge, and help humans move
            from learning to action.
          </p>
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

      <section className="section-block" aria-labelledby="social-heading">
        <article className="story-card">
          <div>
            <p className="result-eyebrow">Build in public · Social presence · Future community layer</p>
            <h2 className="section-title" id="social-heading">
              Connect with the journey
            </h2>
            <p>
              Follow the evolution of Humanity Guide OS, Holberton learning, Full Stack projects, responsible AI
              experiments and future community tools through an open learning journey.
            </p>
          </div>

          <nav className="story-card__actions" aria-label="Humanity Guide OS social channels">
            {socialChannels.map((channel) => (
              <a
                aria-label={`${channel} profile — coming soon`}
                className="tech-pill"
                href="#"
                key={channel}
              >
                {channel}
              </a>
            ))}
          </nav>
        </article>
      </section>
    </main>
  )
}
