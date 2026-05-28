import type { Metadata } from 'next'
import Link from 'next/link'
import { createPersonalOrganizerDailyPlan } from '@/lib/personal-organizer-mode'

export const metadata: Metadata = {
  title: 'Personal Organizer Mode - Humanity Guide OS',
  description:
    'Owner-controlled personal organization surface for documents, photos, emails, and priorities. Read-only-first, proposal-first, and no real execution.'
}

const areaLabels = {
  documents: 'Documents',
  photos: 'Photos',
  email: 'Email',
  priorities: 'Priorities'
} as const

export default function PersonalOrganizerPage() {
  const plan = createPersonalOrganizerDailyPlan()

  return (
    <main className="page-shell personal-page">
      <section className="hero personal-hero">
        <div className="hero-copy hero-copy--stacked">
          <span className="hero-badge">Owner daily surface</span>
          <h1>Humanity Guide OS - Personal Organizer Mode</h1>
          <p>
            A calm daily workspace for organizing documents, photos, emails, and priorities through governed
            proposals. It is built for clarity, not automation.
          </p>
          <div className="tag-row">
            <span className="tech-pill">owner-controlled</span>
            <span className="tech-pill">read-only-first</span>
            <span className="tech-pill">proposal-first</span>
            <span className="tech-pill">approval-required</span>
            <span className="tech-pill">actionExecuted: false</span>
          </div>
          <div className="hero-actions">
            <Link className="primary-button" href="/lab">
              Review governance lab
            </Link>
            <Link className="secondary-button" href="/demo">
              Open public demo
            </Link>
          </div>
        </div>

        <aside className="hero-card hero-card--spotlight">
          <p className="result-eyebrow">Daily clarity snapshot</p>
          <h2>Review first. Decide calmly. Execute nothing here.</h2>
          <p className="meta-text">
            This mode turns simulated organization signals into a practical review plan. It does not write, delete,
            move, send, reply, scan the host, or run background agents.
          </p>
          <div className="metrics-grid">
            <article className="metric-card">
              <strong className="metric-value">{plan.signals.length}</strong>
              <span className="metric-label">Daily signals</span>
            </article>
            <article className="metric-card">
              <strong className="metric-value">{plan.proposals.length}</strong>
              <span className="metric-label">Preview proposals</span>
            </article>
            <article className="metric-card">
              <strong className="metric-value">0</strong>
              <span className="metric-label">Real destructive actions</span>
            </article>
            <article className="metric-card">
              <strong className="metric-value">Owner</strong>
              <span className="metric-label">Final authority</span>
            </article>
          </div>
        </aside>
      </section>

      <section className="section-block" aria-labelledby="personal-mode-heading">
        <div className="section-head">
          <p className="result-eyebrow">Personal organization cockpit</p>
          <h2 className="section-title" id="personal-mode-heading">
            One place to reduce daily chaos
          </h2>
          <p>
            `/personal` is the owner-facing mode. `/lab` remains the technical governance and blueprint surface.
          </p>
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

      <section className="section-block" aria-labelledby="proposal-heading">
        <div className="section-head">
          <p className="result-eyebrow">Organization proposals</p>
          <h2 className="section-title" id="proposal-heading">
            Suggested next actions, not executed actions
          </h2>
        </div>

        <div className="personal-proposal-list">
          {plan.proposals.map((proposal) => (
            <article className="personal-proposal-row" key={proposal.id}>
              <div>
                <span className="info-chip">{areaLabels[proposal.area]}</span>
                <h3>{proposal.title}</h3>
                <p>{proposal.recommendation}</p>
              </div>
              <div className="response-meta">
                <span className="info-chip">{proposal.approvalMode}</span>
                <span className="info-chip">{proposal.actionMode}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block personal-safety" aria-labelledby="personal-safety-heading">
        <div className="section-head">
          <p className="result-eyebrow">Safety boundary</p>
          <h2 className="section-title" id="personal-safety-heading">
            Personal usefulness without unsafe automation
          </h2>
        </div>

        <div className="email-safety-strip" aria-label="Personal Organizer safety indicators">
          <strong>Controlled daily mode</strong>
          <span>readOnlyFirst: true</span>
          <span>proposalFirst: true</span>
          <span>approvalRequired: true</span>
          <span>actionExecuted: false</span>
          <span>filesystemWriteAccess: false</span>
          <span>filesystemDeleteAccess: false</span>
          <span>filesystemMoveAccess: false</span>
          <span>emailSendAccess: false</span>
          <span>backgroundAgents: false</span>
        </div>

        <div className="organization-checklist">
          {plan.checklist.map((item) => (
            <label key={item}>
              <input checked readOnly type="checkbox" />
              <span>{item}</span>
            </label>
          ))}
        </div>
      </section>
    </main>
  )
}
