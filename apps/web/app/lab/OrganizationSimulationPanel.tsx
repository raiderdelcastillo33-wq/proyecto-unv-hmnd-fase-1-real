import {
  privateLabOrganizationSimulation,
  type OrganizationSimulation
} from '@/lib/organization-simulation'

type OrganizationSimulationPanelProps = {
  simulation?: OrganizationSimulation
}

export function OrganizationSimulationPanel({
  simulation = privateLabOrganizationSimulation
}: OrganizationSimulationPanelProps) {
  const duplicateCount = simulation.proposal.duplicateGroups.length
  const highPriorityCount = simulation.files.filter((file) => file.priority === 'high').length

  return (
    <section className="organization-panel" aria-labelledby="organization-simulation-heading">
      <div className="panel-heading">
        <p className="result-eyebrow">Organization Simulation Panel</p>
        <h2 id="organization-simulation-heading">{simulation.label}</h2>
        <p>{simulation.scenario}</p>
      </div>

      <div className="response-meta">
        <span className="info-chip">Demo mode</span>
        <span className="info-chip">Simulation only</span>
        <span className="info-chip">Mock dataset</span>
        <span className="info-chip">No real filesystem access</span>
      </div>

      <div className="organization-metrics" aria-label="Organization simulation metrics">
        <div>
          <span>{simulation.files.length}</span>
          <p>Simulated files</p>
        </div>
        <div>
          <span>{duplicateCount}</span>
          <p>Duplicate groups</p>
        </div>
        <div>
          <span>{highPriorityCount}</span>
          <p>High priority items</p>
        </div>
        <div>
          <span>{simulation.proposal.timeRecoveryEstimate.minutesPerWeek}m</span>
          <p>Estimated time saved</p>
        </div>
      </div>

      <section className="organization-section">
        <div className="organization-section__heading">
          <p className="result-eyebrow">Chaos Detection Summary</p>
          <h3>Signals found in the simulated workspace</h3>
        </div>
        <div className="organization-card-grid">
          {simulation.chaosSignals.map((signal) => (
            <article className="organization-card" key={signal.id}>
              <span className={`status-pill status-pill--${signal.severity === 'high' ? 'error' : 'pending'}`}>
                {signal.severity}
              </span>
              <h4>{signal.label}</h4>
              <p>{signal.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="organization-card-grid organization-card-grid--three">
        <article className="organization-card organization-card--accent">
          <p className="result-eyebrow">GENIO Analysis Card</p>
          <h3>Governed organization strategy</h3>
          <p>{simulation.genioAnalysis.summary}</p>
          <p>{simulation.genioAnalysis.recommendedStrategy}</p>
          <span className="info-chip">{simulation.genioAnalysis.governanceBoundary}</span>
        </article>

        <article className="organization-card">
          <p className="result-eyebrow">GENESIS Reflection Card</p>
          <h3>Contextual mirror</h3>
          {simulation.genesisReflections.map((reflection) => (
            <div className="organization-note" key={reflection.id}>
              <strong>{reflection.label}</strong>
              <p>{reflection.observation}</p>
              <span>{reflection.boundary}</span>
            </div>
          ))}
        </article>

        <article className="organization-card">
          <p className="result-eyebrow">Alignment Validation Card</p>
          <h3>Human-centered checks</h3>
          {simulation.alignmentValidation.checks.map((check) => (
            <div className="organization-check" key={check.id}>
              <span>{check.status}</span>
              <div>
                <strong>{check.label}</strong>
                <p>{check.reason}</p>
              </div>
            </div>
          ))}
          <p>{simulation.alignmentValidation.finalAssessment}</p>
        </article>
      </section>

      <section className="organization-section">
        <div className="organization-section__heading">
          <p className="result-eyebrow">Before / After Visualization</p>
          <h3>{simulation.proposal.title}</h3>
        </div>
        <div className="before-after-grid">
          <div className="file-column file-column--chaos">
            <h4>Before: overloaded surface</h4>
            {simulation.files.map((file) => (
              <div className="file-row" key={file.id}>
                <span>{file.name}</span>
                <small>{file.currentLocation}</small>
              </div>
            ))}
          </div>
          <div className="file-column file-column--calm">
            <h4>After: proposed groups</h4>
            {simulation.proposal.groups.map((group) => (
              <div className="file-row" key={group.id}>
                <span>{group.suggestedFolder}</span>
                <small>
                  {group.label} · {group.itemCount} item(s) · {group.priority}
                </small>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="organization-section">
        <div className="organization-section__heading">
          <p className="result-eyebrow">Organization Proposal Checklist</p>
          <h3>
            {simulation.proposal.clarityEstimate.label}: {simulation.proposal.clarityEstimate.beforeScore} to{' '}
            {simulation.proposal.clarityEstimate.afterScore}
          </h3>
          <p>{simulation.proposal.timeRecoveryEstimate.basis}</p>
        </div>
        <div className="organization-checklist">
          {simulation.proposal.checklist.map((item) => (
            <label key={item}>
              <input checked readOnly type="checkbox" />
              <span>{item}</span>
            </label>
          ))}
        </div>
        <div className="response-meta">
          {simulation.proposal.duplicateGroups.map((group) => (
            <span className="info-chip" key={group.id}>
              {group.label}: {group.actionMode}
            </span>
          ))}
          <span className="info-chip">{simulation.proposal.timeRecoveryEstimate.caveat}</span>
          <span className="info-chip">{simulation.proposal.clarityEstimate.caveat}</span>
        </div>
      </section>
    </section>
  )
}
