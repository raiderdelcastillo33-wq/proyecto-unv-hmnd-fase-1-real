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
          <span className="hero-badge">Personal operating system</span>
          <p className="personal-hero-kicker">Humanity Guide OS</p>
          <h1>Personal Organizer Mode</h1>
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

        <aside className="hero-card hero-card--spotlight personal-os-card">
          <p className="result-eyebrow">Daily operating status</p>
          <h2>{plan.dayStatus}</h2>
          <p className="meta-text">
            This mode turns organization signals into a practical first-use plan. It does not write, delete, move,
            send, reply, scan the host, or run background agents.
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
              <strong className="metric-value">0</strong>
              <span className="metric-label">Real destructive actions</span>
            </article>
          </div>
        </aside>
      </section>

      <section className="section-block personal-dashboard" aria-labelledby="daily-dashboard-heading">
        <div className="section-head">
          <p className="result-eyebrow">Daily Organization Dashboard</p>
          <h2 className="section-title" id="daily-dashboard-heading">
            Your calm command center for today
          </h2>
          <p>Everything here is mock/read-only guidance. The owner chooses what to do manually.</p>
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

      <section className="section-block personal-score-panel" aria-labelledby="visual-score-heading">
        <div className="section-head">
          <p className="result-eyebrow">Visual Chaos Score</p>
          <h2 className="section-title" id="visual-score-heading">
            Clarity is improving one manual pass at a time
          </h2>
          <p>{plan.todayImprovement}</p>
        </div>

        <div className="personal-score-grid">
          {plan.scoreMetrics.map((metric) => (
            <article className="personal-score-card" key={metric.id}>
              <div>
                <span>{metric.label}</span>
                <strong>{metric.score}%</strong>
              </div>
              <div className="personal-progress-track" aria-label={`${metric.label} progress`}>
                <span style={{ width: `${metric.score}%` }} />
              </div>
              <p>{metric.helper}</p>
            </article>
          ))}
        </div>
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

      <section className="section-block" aria-labelledby="organization-zones-heading">
        <div className="section-head">
          <p className="result-eyebrow">Organization Zones</p>
          <h2 className="section-title" id="organization-zones-heading">
            Give every type of chaos a calm place
          </h2>
        </div>

        <div className="personal-zone-grid">
          {plan.organizationZones.map((zone) => (
            <article className="personal-zone-card" key={zone.id}>
              <span className="info-chip">{zone.label}</span>
              <h3>{zone.summary}</h3>
              <p>{zone.suggestedAction}</p>
              <span className="info-chip">risk: {zone.riskLevel}</span>
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
          <p>{plan.todayFocus.focusPrinciple}</p>
        </div>

        <article className="personal-focus-panel">
          <span className="info-chip">one small step at a time</span>
          <h3>{plan.todayFocus.recommendedFirstAction}</h3>
          <p>{plan.todayFocus.startHere}</p>
          <div className="response-meta">
            <span className="info-chip">avoid overwhelm</span>
            <span className="info-chip">estimated manual session time: {plan.todayFocus.estimatedManualSessionTime}</span>
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

      <section className="section-block" aria-labelledby="smart-checklist-heading">
        <div className="section-head">
          <p className="result-eyebrow">Smart Manual Checklist</p>
          <h2 className="section-title" id="smart-checklist-heading">
            Practical steps with clear boundaries
          </h2>
        </div>

        <div className="personal-smart-checklist">
          <article>
            <h3>start here</h3>
            {plan.smartManualChecklist.startHere.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </article>
          <article>
            <h3>do not touch yet</h3>
            {plan.smartManualChecklist.doNotTouchYet.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </article>
          <article>
            <h3>review manually</h3>
            {plan.smartManualChecklist.reviewManually.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </article>
          <article>
            <h3>low risk cleanup</h3>
            {plan.smartManualChecklist.lowRiskCleanup.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </article>
          <article>
            <h3>high attention files</h3>
            {plan.smartManualChecklist.highAttentionFiles.map((item) => (
              <p key={item}>{item}</p>
            ))}
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
