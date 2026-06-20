import { existsSync } from 'node:fs'
import path from 'node:path'

const profileSignals = [
  'Junior Full Stack Developer',
  'Human-Centered AI Systems',
  'Holberton Student',
  'Responsible AI Product Builder'
]

const currentFocus = [
  'Holberton foundations',
  'Linux / Shell',
  'Git / GitHub',
  'C / Python',
  'Docker',
  'Next.js / React / TypeScript',
  'Humanity Guide OS',
  'Responsible AI UX'
]

const technicalSkills = [
  {
    title: 'Frontend',
    items: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'Responsive interfaces']
  },
  {
    title: 'Backend',
    items: ['Node.js', 'API integration', 'Validation', 'Typed boundaries', 'C and Python foundations']
  },
  {
    title: 'Tools',
    items: ['Linux / Shell', 'Git', 'GitHub', 'VS Code', 'Docker learning', 'Technical documentation']
  },
  {
    title: 'AI / Product',
    items: ['Human-centered UX', 'Governance-first design', 'Safe simulations', 'Proposal-only workflows']
  }
]

const projects = [
  {
    title: 'Humanity Guide OS',
    description: 'A Full Stack product vision for learning, planning, interviews, and personal organization with responsible AI boundaries.'
  },
  {
    title: 'Private AI Lab',
    description: 'A controlled simulation environment for governance, proposal review, owner approval, and in-memory audit events.'
  },
  {
    title: 'Public AI Demo',
    description: 'A recruiter-friendly conversational interface with specialist roles, visible runtime state, and safe fallback behavior.'
  },
  {
    title: 'Personal Organizer Mode',
    description: 'A calm, read-only product preview for documents, photos, email priorities, organization zones, and daily clarity.'
  },
  {
    title: 'Professional Portfolio',
    description: 'A visual record of projects, architecture thinking, Full Stack practice, and the learning journey behind the work.'
  }
]

const waysOfWorking = [
  'Small, reviewable steps',
  'Verification before completion',
  'Documentation discipline',
  'Scoped Git workflow',
  'Human approval for meaningful actions',
  'Proposal-only for sensitive workflows'
]

const recruiterSignals = [
  'Reliable learner',
  'Builder mindset',
  'Strong documentation',
  'Responsible AI boundaries',
  'Long-term growth'
]

const contactDetails = ['Bordeaux, France', 'GitHub: raiderdelcastillo33-wq']

export default function CvPage() {
  const pdfPath = path.join(process.cwd(), 'public', 'cv', 'raider-cv.pdf')
  const hasPdf = existsSync(pdfPath)

  return (
    <main className="page-shell cv-page">
      <section className="page-intro">
        <span className="status-pill status-pill--success">Professional profile</span>
        <h1>Raider Del Castillo Abalos</h1>
        <p>
          Junior Full Stack developer building practical foundations through Holberton, real projects, disciplined
          documentation, and responsible AI product thinking.
        </p>
      </section>

      <section className="cv-layout">
        <aside className="cv-sidebar">
          <div className="cv-sidebar__identity">
            <p className="result-eyebrow">Profile</p>
            <h2>Full Stack builder in progress</h2>
            <p className="cv-title">Learning deeply, building carefully, improving continuously.</p>
          </div>

          <div className="tag-row">
            {profileSignals.map((signal) => (
              <span className="tech-pill" key={signal}>{signal}</span>
            ))}
          </div>

          <div className="cv-download-card">
            {hasPdf ? (
              <a
                className="primary-button cv-download-button"
                download="raider-cv.pdf"
                href="/cv/raider-cv.pdf"
                rel="noreferrer"
                target="_blank"
              >
                Download CV
              </a>
            ) : (
              <span
                aria-disabled="true"
                className="secondary-button cv-download-button cv-download-button--placeholder"
                role="button"
              >
                Download CV
              </span>
            )}
            <p className="cv-download-note">
              {hasPdf ? 'PDF version available.' : 'PDF download will be available when the final document is added.'}
            </p>
          </div>

          <div className="cv-contact-card">
            <p className="result-eyebrow">Contact</p>
            <ul className="bullet-list">
              {contactDetails.map((detail) => <li key={detail}>{detail}</li>)}
            </ul>
          </div>

          <div className="cv-contact-card">
            <p className="result-eyebrow">Recruiter signal</p>
            <ul className="bullet-list">
              {recruiterSignals.map((signal) => <li key={signal}>{signal}</li>)}
            </ul>
          </div>
        </aside>

        <div className="cv-content">
          <article className="info-card cv-section">
            <p className="result-eyebrow">Professional summary</p>
            <h2>Junior profile built through practice</h2>
            <p>
              Raider Del Castillo Abalos is building a junior Full Stack profile through Holberton, real projects,
              GitHub workflow, documentation discipline, and responsible AI product thinking. The focus is dependable
              learning, clear engineering boundaries, and useful products that keep people in control.
            </p>
          </article>

          <article className="info-card cv-section">
            <p className="result-eyebrow">Current focus</p>
            <h2>Foundations and active learning</h2>
            <div className="tag-row">
              {currentFocus.map((item) => <span className="tech-pill" key={item}>{item}</span>)}
            </div>
          </article>

          <article className="info-card cv-section">
            <p className="result-eyebrow">Technical skills</p>
            <h2>Working knowledge by area</h2>
            <div className="capability-split">
              {technicalSkills.map((group) => (
                <section className="capability-column" key={group.title}>
                  <h3>{group.title}</h3>
                  <ul>
                    {group.items.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </section>
              ))}
            </div>
          </article>

          <article className="info-card cv-section">
            <p className="result-eyebrow">Projects</p>
            <h2>Product work and engineering practice</h2>
            <div className="showcase-grid">
              {projects.map((project) => (
                <section className="showcase-card" key={project.title}>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                </section>
              ))}
            </div>
          </article>

          <article className="info-card cv-section">
            <p className="result-eyebrow">Ways of working</p>
            <h2>A reliable approach to growth</h2>
            <ul className="bullet-list bullet-list--dense">
              {waysOfWorking.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </article>

          <article className="info-card cv-section">
            <p className="result-eyebrow">Professional direction</p>
            <h2>Ready for a junior opportunity</h2>
            <p>
              Seeking a junior Full Stack or frontend role where consistent learning, careful implementation,
              collaboration, and long-term growth are valued.
            </p>
          </article>
        </div>
      </section>
    </main>
  )
}
