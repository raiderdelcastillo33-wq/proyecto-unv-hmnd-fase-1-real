import Image from 'next/image'
import Link from 'next/link'

const engineeringHighlights = [
  {
    title: 'Humanity Guide OS',
    description: 'A human-centered system for learning, planning, interviews, personal organization, and responsible AI exploration.'
  },
  {
    title: 'Private AI Lab',
    description: 'A governance-first environment for simulated proposals, owner approval, audit events, and future capability blueprints.'
  },
  {
    title: 'Recruiter Demo',
    description: 'A focused conversational experience with specialist roles, visible runtime status, and safe fallback behavior.'
  },
  {
    title: 'Architecture and documentation',
    description: 'Clear boundaries, diagrams, and written decisions that make a complex product easier to review and evolve.'
  },
  {
    title: 'Next.js + TypeScript',
    description: 'A typed App Router frontend built through iterative product work and reusable interface patterns.'
  },
  {
    title: 'Git and GitHub workflow',
    description: 'Version-controlled development with scoped changes, reviewable diffs, and disciplined project history.'
  },
  {
    title: 'Docker learning',
    description: 'Developing practical understanding of containers, environments, and reproducible application delivery.'
  },
  {
    title: 'Holberton foundations',
    description: 'Core engineering habits shaped through algorithms, systems thinking, projects, collaboration, and continuous practice.'
  }
]

const technicalStack = [
  {
    title: 'Frontend',
    items: ['Next.js', 'React', 'TypeScript', 'Responsive UI', 'Accessible product surfaces']
  },
  {
    title: 'Backend',
    items: ['Node.js', 'API boundaries', 'Typed domain models', 'Validation', 'Controlled fallbacks']
  },
  {
    title: 'AI',
    items: ['Human-centered UX', 'Governance metadata', 'Proposal workflows', 'Safe simulations']
  },
  {
    title: 'DevOps',
    items: ['Docker learning', 'Vercel workflows', 'Build checks', 'Environment configuration']
  },
  {
    title: 'Tools',
    items: ['Git', 'GitHub', 'VS Code', 'Notion organization', 'Technical documentation']
  }
]

const waysOfWorking = [
  {
    title: 'Small iterations',
    description: 'Turn broad ideas into focused changes that can be reviewed, tested, and improved.'
  },
  {
    title: 'Documentation-first',
    description: 'Clarify intent, boundaries, and architecture before complexity grows.'
  },
  {
    title: 'Proposal != Execution',
    description: 'Keep analysis and recommendations separate from real-world actions.'
  },
  {
    title: 'Human approval',
    description: 'Design important decisions around visible context and meaningful human control.'
  },
  {
    title: 'Testing mindset',
    description: 'Use types, checks, and verification as part of building—not as an afterthought.'
  },
  {
    title: 'Long-term thinking',
    description: 'Build foundations that support learning and evolution without pretending the future already exists.'
  }
]

const learningJourney = [
  {
    step: '01',
    title: 'Cuba',
    description: 'Curiosity, resourcefulness, and the human experiences behind the work.'
  },
  {
    step: '02',
    title: 'France',
    description: 'A new environment for rebuilding, learning, and expanding professional possibilities.'
  },
  {
    step: '03',
    title: 'Holberton',
    description: 'Project-based foundations in software engineering, collaboration, and independent problem solving.'
  },
  {
    step: '04',
    title: 'Full Stack',
    description: 'Connecting interfaces, APIs, architecture, tooling, and deployment into complete product experiences.'
  },
  {
    step: '05',
    title: 'AI',
    description: 'Exploring useful AI experiences with governance, restraint, and human needs at the center.'
  },
  {
    step: '06',
    title: 'Builder path',
    description: 'Continuing from personal experiments toward thoughtful tools, learning systems, and responsible products.'
  }
]

const architectureWork = [
  {
    src: '/images/architecture-flux.svg',
    title: 'Application flow',
    description: 'A concise view of the Browser → Next.js → API boundary.',
    tags: ['System flow', 'API boundary', 'Communication']
  },
  {
    src: '/images/interface-agent.svg',
    title: 'Recruiter-facing demo',
    description: 'A product surface designed for clarity, trust, and quick understanding.',
    tags: ['UI/UX', 'Product thinking', 'Demo']
  },
  {
    src: '/images/systeme-modulaire.svg',
    title: 'Modular system',
    description: 'A visual model for separation of concerns and future controlled growth.',
    tags: ['Architecture', 'Modularity', 'Boundaries']
  }
]

const futureInterests = [
  'Applied AI',
  'Responsible automation',
  'Humanity Pro University',
  'Learning systems',
  'Responsible products'
]

export default function PortfolioPage() {
  return (
    <main className="page-shell">
      <section className="hero">
        <div className="hero-copy hero-copy--stacked">
          <span className="hero-badge">Raider Del Castillo Abalos</span>
          <h1>From curiosity to systems.</h1>
          <p>Built through learning, experimentation and continuous practice.</p>

          <div className="tag-row">
            <span className="tech-pill">Full Stack Builder</span>
            <span className="tech-pill">Human-Centered AI Systems</span>
            <span className="tech-pill">Holberton Student</span>
            <span className="tech-pill">Governance-first mindset</span>
          </div>

          <div className="hero-actions">
            <Link className="primary-button" href="/demo">
              Try the demo
            </Link>
            <Link className="secondary-button" href="/about">
              Review architecture
            </Link>
            <Link className="secondary-button" href="/cv">
              View CV
            </Link>
          </div>
        </div>

        <aside className="hero-card hero-card--spotlight">
          <p className="result-eyebrow">Builder perspective</p>
          <h2>Learn {'->'} Build {'->'} Reflect {'->'} Improve</h2>
          <p className="meta-text">
            This portfolio is a record of practical growth: turning personal questions into structured products,
            explaining technical decisions, and keeping people at the center of AI experimentation.
          </p>
          <div className="response-meta">
            <span className="info-chip">Product thinking</span>
            <span className="info-chip">Full Stack practice</span>
            <span className="info-chip">Responsible scope</span>
          </div>
        </aside>
      </section>

      <section className="section-block" aria-labelledby="highlights-heading">
        <div className="section-head">
          <p className="result-eyebrow">Engineering highlights</p>
          <h2 className="section-title" id="highlights-heading">Projects, foundations, and practical growth</h2>
          <p>A selection of work and learning areas that show how product judgment and engineering practice connect.</p>
        </div>

        <div className="showcase-grid">
          {engineeringHighlights.map((item) => (
            <article className="showcase-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block" aria-labelledby="stack-heading">
        <div className="section-head">
          <p className="result-eyebrow">Technical stack</p>
          <h2 className="section-title" id="stack-heading">Tools used to turn ideas into systems</h2>
        </div>

        <div className="capability-split">
          {technicalStack.map((group) => (
            <article className="capability-column" key={group.title}>
              <h3>{group.title}</h3>
              <ul>
                {group.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block" aria-labelledby="working-heading">
        <div className="section-head">
          <p className="result-eyebrow">Ways of working</p>
          <h2 className="section-title" id="working-heading">A thoughtful process for complex ideas</h2>
        </div>

        <div className="signal-grid">
          {waysOfWorking.map((item) => (
            <article className="signal-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block" aria-labelledby="journey-heading">
        <div className="section-head">
          <p className="result-eyebrow">Learning journey</p>
          <h2 className="section-title" id="journey-heading">A human path into engineering</h2>
          <p>Not a list of titles—a progression shaped by place, practice, resilience, and curiosity.</p>
        </div>

        <div className="timeline-grid">
          {learningJourney.map((item) => (
            <article className="timeline-card" key={item.step}>
              <span className="step-index">{item.step}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block" aria-labelledby="architecture-work-heading">
        <div className="section-head">
          <p className="result-eyebrow">Architecture work</p>
          <h2 className="section-title" id="architecture-work-heading">Making technical thinking visible</h2>
        </div>

        <div className="gallery-grid">
          {architectureWork.map((item) => (
            <article className="gallery-card" key={item.src}>
              <div className="gallery-media">
                <Image alt={item.title} height={900} priority={false} src={item.src} width={1400} />
              </div>
              <div className="gallery-copy">
                <div className="gallery-title-row">
                  <h2>{item.title}</h2>
                  <span className="status-pill status-pill--pending">Project asset</span>
                </div>
                <p>{item.description}</p>
                <div className="gallery-tags">
                  {item.tags.map((tag) => <span className="gallery-tag" key={tag}>{tag}</span>)}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block presentation-band" aria-labelledby="future-heading">
        <div className="section-head">
          <p className="result-eyebrow">Future interests</p>
          <h2 className="section-title" id="future-heading">Building useful technology with a human horizon</h2>
          <p>Areas for continued learning and future projects—not claims about capabilities already delivered.</p>
        </div>

        <div className="tag-row">
          {futureInterests.map((item) => <span className="tech-pill" key={item}>{item}</span>)}
        </div>
      </section>
    </main>
  )
}
