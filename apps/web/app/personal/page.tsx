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
            This mode turns organization signals into a practical first-use plan. It does not write, delete, move,
            send, reply, scan the host, or run background agents.
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

      <section className="section-block personal-workflow" aria-labelledby="first-use-workflow-heading">
        <div className="section-head">
          <p className="result-eyebrow">First Use Workflow</p>
          <h2 className="section-title" id="first-use-workflow-heading">
            A guided first organization pass
          </h2>
          <p>
            Start small, preview the chaos, review proposals, and then execute manually outside the app. The workflow
            is designed to reduce overwhelm without giving the system destructive powers.
          </p>
        </div>

        <div className="personal-workflow-grid">
          {plan.firstUseWorkflow.map((item) => (
            <article className="personal-workflow-card" key={item.id}>
              <span className="info-chip">{item.step}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block" aria-labelledby="organize-options-heading">
        <div className="section-head">
          <p className="result-eyebrow">Choose what to organize</p>
          <h2 className="section-title" id="organize-options-heading">
            Pick one surface, not everything
          </h2>
          <p>These options are planning targets only. Selecting an area does not scan, move, delete, or send anything.</p>
        </div>

        <div className="personal-target-grid" aria-label="Personal organization options">
          {plan.organizationTargets.map((target) => (
            <button className="personal-target-button" key={target} type="button">
              {target}
            </button>
          ))}
        </div>
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
          <p className="result-eyebrow">Personal Organization Plan</p>
          <h2 className="section-title" id="proposal-heading">
            What to sort first, why it matters, and how to stay safe
          </h2>
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
          <p className="result-eyebrow">Today's Focus</p>
          <h2 className="section-title" id="today-focus-heading">
            Start without overwhelming yourself
          </h2>
          <p>{plan.todayFocus.startHere}</p>
        </div>

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
          <span>No files moved</span>
          <span>No files deleted</span>
          <span>No email sent</span>
          <span>Manual execution only</span>
          <span>Owner approval required</span>
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
