'use client'

import { createEmailOrganizationPreview } from '@/lib/email-organization-preview'

export function ControlledEmailPreviewPanel() {
  const preview = createEmailOrganizationPreview()
  const priorityInbox = preview.emails.filter(
    (email) => email.priority === 'high' || email.requiresReply || email.hasInvoiceSignal
  )
  const severityClass = {
    high: 'status-pill--error',
    medium: 'status-pill--pending',
    low: 'status-pill--success'
  } as const

  return (
    <section className="email-preview-panel" aria-labelledby="email-preview-heading">
      <div className="organization-hero">
        <div className="panel-heading">
          <p className="result-eyebrow">Email Organization Preview Panel</p>
          <h2 id="email-preview-heading">{preview.label}</h2>
          <p>
            A simulated inbox shows how Humanity Guide OS could classify priorities, invoices, newsletters, and
            reply-needed messages without connecting to Gmail or changing a real mailbox.
          </p>
        </div>
        <div className="simulation-badge-system">
          <span className="info-chip">simulationOnly: true</span>
          <span className="info-chip">executionMode: {preview.executionMode}</span>
          <span className="info-chip">actionExecuted: false</span>
          <span className="info-chip">Human Approval Required</span>
        </div>
      </div>

      <div className="email-safety-strip" aria-label="Email preview safety indicators">
        <strong>Preview-only email governance</strong>
        <span>emailSendAccess: false</span>
        <span>emailDeleteAccess: false</span>
        <span>emailMoveAccess: false</span>
        <span>emailReplyAccess: false</span>
        <span>emailDraftMode: {preview.emailDraftMode}</span>
        <span>No Gmail API</span>
      </div>

      <section className="organization-section">
        <div className="organization-section__heading">
          <p className="result-eyebrow">Inbox Chaos Summary</p>
          <h3>Simulated overload signals</h3>
          <p>Metadata-only signals are grouped for owner review. No label, archive, reply, or send action exists.</p>
        </div>
        <div className="email-chaos-grid">
          {preview.inboxChaosSummary.map((item) => (
            <article className="email-card" key={item.id}>
              <span className={`status-pill ${severityClass[item.severity]}`}>{item.severity}</span>
              <strong>{item.count}</strong>
              <p>{item.label}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="organization-section">
        <div className="organization-card-grid">
          <article className="organization-card">
            <span className="info-chip">GENIO Email Analysis Card</span>
            <h3>GENIO separates urgency from noise</h3>
            <p>
              The governance layer proposes a priority inbox and category labels while keeping every email action
              blocked until a future owner-approved system exists.
            </p>
          </article>
          <article className="organization-card">
            <span className="info-chip">GENESIS Communication Pattern Reflection</span>
            <h3>GENESIS observes communication overload</h3>
            <p>
              The reflection layer highlights repeated patterns: urgent work mixed with finance, newsletters, and
              personal messages.
            </p>
          </article>
          <article className="organization-card">
            <span className="info-chip">Alignment Validation Card</span>
            <h3>Alignment keeps the human in control</h3>
            <p>
              The system validates that every suggestion remains preview-only, non-invasive, and approval-required.
            </p>
          </article>
        </div>
      </section>

      <section className="organization-section">
        <div className="organization-section__heading">
          <p className="result-eyebrow">Suggested Labels / Categories</p>
          <h3>Owner-reviewed inbox grouping</h3>
        </div>
        <div className="email-category-grid">
          {preview.categorySuggestions.map((item) => (
            <article className="email-card" key={item.category}>
              <strong>{item.category}</strong>
              <p>{item.count} simulated match(es)</p>
              <span>{item.rationale}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="organization-section">
        <div className="organization-section__heading">
          <p className="result-eyebrow">Priority Inbox Proposal</p>
          <h3>Review first, execute never in this phase</h3>
        </div>
        <div className="email-priority-list">
          {priorityInbox.map((email) => (
            <article className="email-preview-row" key={email.id}>
              <div>
                <strong>{email.subject}</strong>
                <p>
                  {email.from} - {email.snippet}
                </p>
              </div>
              <div className="response-meta">
                {email.categoryHints.map((category) => (
                  <span className="info-chip" key={category}>
                    {category}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="organization-section">
        <div className="organization-section__heading">
          <p className="result-eyebrow">Draft Suggestions Preview</p>
          <h3>Draft-only future, no reply access now</h3>
        </div>
        <div className="email-draft-list">
          {preview.draftSuggestions.map((draft) => (
            <article className="email-preview-row" key={draft.id}>
              <div>
                <strong>{draft.title}</strong>
                <p>{draft.draftPreview}</p>
              </div>
              <span className="info-chip">emailDraftMode: {draft.emailDraftMode}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="organization-section">
        <div className="organization-section__heading">
          <p className="result-eyebrow">Human Approval Required Badge</p>
          <h3>Proposal-only checklist</h3>
        </div>
        <div className="organization-checklist">
          {preview.checklist.map((item) => (
            <label key={item}>
              <input checked readOnly type="checkbox" />
              <span>{item}</span>
            </label>
          ))}
        </div>
      </section>
    </section>
  )
}
