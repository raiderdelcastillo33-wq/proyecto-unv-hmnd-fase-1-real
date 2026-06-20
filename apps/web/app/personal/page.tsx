import type { Metadata } from 'next'
import Link from 'next/link'
import { createPersonalOrganizerDailyPlan } from '@/lib/personal-organizer-mode'

export const metadata: Metadata = {
  title: 'Personal Life OS - Humanity Guide OS',
  description:
    'A calm, human-centered space for learning, priorities, projects, memories, and daily clarity.'
}

const areaLabels = {
  documents: 'Documents',
  photos: 'Photos',
  email: 'Email',
  priorities: 'Priorities'
} as const

const lifeAreas = [
  {
    title: 'Learning',
    description: 'Bring study goals, technical practice, and future learning paths into one calm view.'
  },
  {
    title: 'Projects',
    description: 'See active ideas, Full Stack work, and next steps without losing the human purpose behind them.'
  },
  {
    title: 'Family',
    description: 'Protect space for people, shared memories, and the responsibilities that matter beyond work.'
  },
  {
    title: 'Documents',
    description: 'Turn scattered paperwork into reviewable organization zones and manual next steps.'
  },
  {
    title: 'Photos',
    description: 'Represent memories as something to care for, review, and organize without automatic file access.'
  },
  {
    title: 'Emails',
    description: 'Preview communication priorities without connecting to, reading, sending, or changing a real inbox.'
  },
  {
    title: 'Daily priorities',
    description: 'Choose a small, realistic focus for today and leave lower-value noise for later.'
  },
  {
    title: 'Life clarity',
    description: 'Connect learning, personal responsibilities, projects, and long-term growth with less overwhelm.'
  }
]

const futureVision = [
  'Safe memory',
  'Learning paths',
  'Interview workflows',
  'Humanity Pro University',
  'Community layer'
]

const safetyBoundaries = [
  'No real email',
  'No filesystem',
  'No memory engine',
  'No automation',
  'No autonomous agents',
  'Proposal != Execution'
]

export default function PersonalOrganizerPage() {
  const plan = createPersonalOrganizerDailyPlan()

  return (
    <main className="page-shell personal-page">
      <section className="hero personal-hero">
        <div className="hero-copy hero-copy--stacked">
          <span className="hero-badge">Humanity Guide OS · Personal Life OS</span>
          <h1>Create more calm around the life you are building.</h1>
          <p>
            A human-centered space for learning, priorities, projects, family, memories, and daily clarity—designed
            for long-term growth without hidden automation.
          </p>
          <div className="tag-row">
            <span className="tech-pill">Calm</span>
            <span className="tech-pill">Human-centered</span>
            <span className="tech-pill">Full Stack Journey</span>
            <span className="tech-pill">Long-term growth</span>
            <span className="tech-pill">Proposal-only</span>
          </div>
          <div className="hero-actions">
            <Link className="primary-button" href="/lab">
              Review governance lab
            </Link>
            <Link className="secondary-button" href="/demo">
              Open public demo
            </Link>
            <Link className="tech-pill" href="/portfolio">
              Follow the builder journey
            </Link>
          </div>
        </div>

        <aside className="hero-card hero-card--spotlight personal-os-card">
          <p className="result-eyebrow">Today</p>
          <h2>{plan.dayStatus}</h2>
          <p className="meta-text">
            Start with one useful step. The system offers perspective and proposals while every real action stays
            with the person.
          </p>
          <div className="metrics-grid">
            <article className="metric-card">
              <strong className="metric-value">{plan.clarityEstimate}</strong>
              <span className="metric-label">Estimated clarity</span>
            </article>
            <article className="metric-card">
              <strong className="metric-value">{plan.focusLevel}</strong>
              <span className="metric-label">Focus level</span>
            </article>
            <article className="metric-card">
              <strong className="metric-value">{plan.organizationReadiness}</strong>
              <span className="metric-label">Organization readiness</span>
            </article>
            <article className="metric-card">
              <strong className="metric-value">Human</strong>
              <span className="metric-label">Final authority</span>
            </article>
          </div>
        </aside>
      </section>

      <section className="section-block personal-dashboard" aria-labelledby="daily-dashboard-heading">
        <div className="section-head">
          <p className="result-eyebrow">Daily clarity</p>
          <h2 className="section-title" id="daily-dashboard-heading">
            A gentle overview, not a command center
          </h2>
          <p>Use the signals as guidance for a manageable day. They are not measurements of personal worth.</p>
        </div>

        <div className="personal-dashboard-grid">
          {plan.dashboardMetrics.map((metric) => (
            <article className={`personal-dashboard-card personal-dashboard-card--${metric.tone}`} key={metric.id}>
              <span className="info-chip">{metric.label}</span>
              <strong>{metric.value}</strong>
              <p>{metric.helper}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block" aria-labelledby="life-areas-heading">
        <div className="section-head">
          <p className="result-eyebrow">A whole-life perspective</p>
          <h2 className="section-title" id="life-areas-heading">
            What Personal Life OS brings together
          </h2>
          <p>Daily organization makes more sense when learning, relationships, work, memories, and rest share context.</p>
        </div>

        <div className="showcase-grid">
          {lifeAreas.map((area) => (
            <article className="showcase-card" key={area.title}>
              <h3>{area.title}</h3>
              <p>{area.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block" aria-labelledby="personal-mode-heading">
        <div className="section-head">
          <p className="result-eyebrow">Documents, photos, email and priorities</p>
          <h2 className="section-title" id="personal-mode-heading">
            Current organization signals
          </h2>
          <p>A read-only preview of the areas that may need attention, expressed as calm suggestions.</p>
        </div>

        <div className="personal-mode-grid">
          {plan.signals.map((signal) => (
            <article className="showcase-card" key={signal.id}>
              <span className="info-chip">{areaLabels[signal.area]}</span>
              <h3>{signal.title}</h3>
              <p>{signal.summary}</p>
              <div className="response-meta">
                <span className="info-chip">priority: {signal.priority}</span>
                <span className="info-chip">risk: {signal.riskLevel}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block" aria-labelledby="organization-zones-heading">
        <div className="section-head">
          <p className="result-eyebrow">Organization zones</p>
          <h2 className="section-title" id="organization-zones-heading">
            Give each part of life a calmer place
          </h2>
          <p>Zones create a useful mental map before any manual organization begins.</p>
        </div>

        <div className="personal-zone-grid">
          {plan.organizationZones.map((zone) => (
            <article className="personal-zone-card" key={zone.id}>
              <span className="info-chip">{zone.label}</span>
              <h3>{zone.summary}</h3>
              <p>{zone.suggestedAction}</p>
              <span className="info-chip">Review level: {zone.riskLevel}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block" aria-labelledby="proposal-heading">
        <div className="section-head">
          <p className="result-eyebrow">Personal organization proposals</p>
          <h2 className="section-title" id="proposal-heading">
            Small steps with context and purpose
          </h2>
          <p>Each proposal explains what could help and why. The person decides whether and how to act.</p>
        </div>

        <div className="personal-proposal-list">
          {plan.proposals.map((proposal) => (
            <article className="personal-proposal-row" key={proposal.id}>
              <div>
                <span className="info-chip">{areaLabels[proposal.area]}</span>
                <h3>{proposal.title}</h3>
                <p>{proposal.recommendation}</p>
                <dl className="personal-plan-details">
                  <div>
                    <dt>Sort first</dt>
                    <dd>{proposal.organizeFirst}</dd>
                  </div>
                  <div>
                    <dt>Why</dt>
                    <dd>{proposal.rationale}</dd>
                  </div>
                  <div>
                    <dt>Estimated time</dt>
                    <dd>{proposal.estimatedTime}</dd>
                  </div>
                  <div>
                    <dt>Expected impact</dt>
                    <dd>{proposal.expectedImpact}</dd>
                  </div>
                </dl>
              </div>
              <div className="response-meta">
                <span className="info-chip">{proposal.approvalMode}</span>
                <span className="info-chip">{proposal.actionMode}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block personal-focus" aria-labelledby="today-focus-heading">
        <div className="section-head">
          <p className="result-eyebrow">Daily priorities</p>
          <h2 className="section-title" id="today-focus-heading">
            Make progress without overwhelming yourself
          </h2>
          <p>{plan.todayFocus.focusPrinciple}</p>
        </div>

        <article className="personal-focus-panel">
          <span className="info-chip">one small step at a time</span>
          <h3>{plan.todayFocus.recommendedFirstAction}</h3>
          <p>{plan.todayFocus.startHere}</p>
          <div className="response-meta">
            <span className="info-chip">Protect attention</span>
            <span className="info-chip">Suggested time: {plan.todayFocus.estimatedManualSessionTime}</span>
          </div>
        </article>

        <div className="personal-focus-grid">
          <article className="showcase-card">
            <span className="info-chip">What I do today</span>
            <ul className="bullet-list">
              {plan.todayFocus.doToday.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article className="showcase-card">
            <span className="info-chip">What I do not touch</span>
            <ul className="bullet-list">
              {plan.todayFocus.doNotTouch.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article className="showcase-card">
            <span className="info-chip">What I review manually</span>
            <ul className="bullet-list">
              {plan.todayFocus.reviewManually.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="section-block presentation-band" aria-labelledby="future-vision-heading">
        <div className="section-head">
          <p className="result-eyebrow">Future vision · Blueprint only</p>
          <h2 className="section-title" id="future-vision-heading">
            From daily clarity to lifelong learning
          </h2>
          <p>
            Future study plans could connect personal growth, interviews, education, and community through carefully
            governed tools. None of these capabilities is implemented here.
          </p>
        </div>

        <div className="tag-row">
          {futureVision.map((item) => (
            <span className="tech-pill" key={item}>{item}</span>
          ))}
        </div>
      </section>

      <section className="section-block personal-safety" aria-labelledby="personal-safety-heading">
        <div className="section-head">
          <p className="result-eyebrow">Human-centered boundaries</p>
          <h2 className="section-title" id="personal-safety-heading">
            Guidance without hidden control
          </h2>
          <p>This page represents a responsible vision. It cannot inspect, remember, send, move, or automate real life.</p>
        </div>

        <div className="tag-row" aria-label="Personal Life OS safety boundaries">
          {safetyBoundaries.map((boundary) => (
            <span className="tech-pill" key={boundary}>
              {boundary}
            </span>
          ))}
        </div>
      </section>
    </main>
  )
}
