'use client'

import { createControlledExecutionPlan } from '@/lib/controlled-execution-planning'

export function ControlledExecutionPlanningPanel() {
  const plan = createControlledExecutionPlan()

  return (
    <section className="execution-planning-panel" aria-labelledby="controlled-execution-heading">
      <div className="organization-hero">
        <div className="panel-heading">
          <p className="result-eyebrow">Controlled Execution Planning</p>
          <h2 id="controlled-execution-heading">{plan.label}</h2>
          <p>
            A governance-first preview for future execution planning. It prepares timeline, rollback, impact, and
            approval metadata without running real actions.
          </p>
        </div>
        <div className="simulation-badge-system">
          <span className="info-chip">simulationOnly: true</span>
          <span className="info-chip">actionExecuted: false</span>
          <span className="info-chip">Execution blocked by default</span>
          <span className="info-chip">Manual execution only</span>
        </div>
      </div>

      <div className="execution-safety-strip" aria-label="Controlled execution safety status">
        <strong>No real execution performed</strong>
        <span>no filesystem runtime</span>
        <span>no terminal execution</span>
        <span>no Gmail integration</span>
        <span>no browser automation</span>
        <span>no background execution</span>
      </div>

      <section className="organization-section">
        <div className="organization-section__heading">
          <p className="result-eyebrow">Execution timeline preview</p>
          <h3>Governed planning before any real-world action</h3>
        </div>
        <div className="execution-timeline">
          {plan.steps.map((step, index) => (
            <article className="execution-step-card" key={step.id}>
              <span className="execution-step-index">{index + 1}</span>
              <div>
                <h4>{step.label}</h4>
                <p>{step.description}</p>
                <div className="response-meta">
                  <span className="info-chip">{step.status}</span>
                  <span className="info-chip">risk: {step.riskLevel}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="organization-section">
        <div className="organization-section__heading">
          <p className="result-eyebrow">Rollback and impact preview</p>
          <h3>Safety cards required before future manual action</h3>
        </div>
        <div className="execution-card-grid">
          {plan.rollbackPreviews.map((rollback) => (
            <article className="execution-preview-card" key={rollback.id}>
              <span className="info-chip">{rollback.label}</span>
              <h4>Rollback Ready</h4>
              <p>{rollback.preview}</p>
              <span className="info-chip">Human Verification Required</span>
            </article>
          ))}
          {plan.impactPreviews.map((impact) => (
            <article className="execution-preview-card" key={impact.id}>
              <span className="info-chip">{impact.scope}</span>
              <h4>{impact.scope}</h4>
              <p>{impact.expectedOutcome}</p>
              <span className="info-chip">risk: {impact.riskLevel}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="organization-section">
        <div className="organization-section__heading">
          <p className="result-eyebrow">Governance approval chain preview</p>
          <h3>Owner -&gt; GENIO Governance -&gt; Alignment Layer -&gt; Safety Validation -&gt; Simulation Approval -&gt; Manual Human Execution</h3>
        </div>
        <div className="execution-chain">
          {plan.approvalChain.map((stage) => (
            <article className="execution-chain-card" key={stage.id}>
              <strong>{stage.actor}</strong>
              <p>{stage.responsibility}</p>
              <span className="info-chip">{stage.status}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="organization-section">
        <div className="organization-section__heading">
          <p className="result-eyebrow">Manual execution recommendations</p>
          <h3>Last step is always human</h3>
        </div>
        <div className="organization-checklist">
          {plan.manualRecommendations.map((item) => (
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
