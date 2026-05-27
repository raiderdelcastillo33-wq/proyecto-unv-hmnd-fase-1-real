'use client'

import { useState } from 'react'
import {
  privateLabOrganizationSimulation,
  type OrganizationSimulation
} from '@/lib/organization-simulation'

type OrganizationSimulationPanelProps = {
  simulation?: OrganizationSimulation
}

const guidedFlowSteps = [
  {
    id: 'intro',
    label: 'Introduction',
    title: 'A calm preview of organization chaos',
    description: 'The lab starts with simulated clutter so the value is visible before any real adapter exists.'
  },
  {
    id: 'what-is-happening',
    label: 'What is happening?',
    title: 'The system reads mock signals only',
    description: 'No host scanning occurs. The UI explains a conceptual organization pass using fake file metadata.'
  },
  {
    id: 'genio-analyzing',
    label: 'GENIO is analyzing organization patterns',
    title: 'Governance first',
    description: 'GENIO separates priorities, risk, and proposed groups without executing a file action.'
  },
  {
    id: 'genesis-observing',
    label: 'GENESIS is observing contextual overload',
    title: 'Reflection without intrusion',
    description: 'GENESIS mirrors context pressure without scoring the human or claiming real behavior analysis.'
  },
  {
    id: 'alignment-validates',
    label: 'Alignment Layer validates human-centered clarity',
    title: 'Human-centered guardrails',
    description: 'The alignment layer checks clarity, no overautomation, and safety boundaries.'
  },
  {
    id: 'proposal-generated',
    label: 'Organization proposal generated',
    title: 'A reversible checklist appears',
    description: 'The result is a proposal for review, not an automated cleanup.'
  },
  {
    id: 'clarity-improvement',
    label: 'Estimated clarity improvement',
    title: 'Impact is shown as an estimate',
    description: 'Scores and time saved are illustrative for the mock dataset, not measured from a real computer.'
  },
  {
    id: 'complete',
    label: 'Simulation complete',
    title: 'Ready for owner review',
    description: 'The demo ends with visible safety indicators and proposal-only boundaries.'
  }
] as const

export function OrganizationSimulationPanel({
  simulation = privateLabOrganizationSimulation
}: OrganizationSimulationPanelProps) {
  const [activeStepIndex, setActiveStepIndex] = useState(0)
  const [comparisonMode, setComparisonMode] = useState<'before' | 'after'>('before')
  const duplicateCount = simulation.proposal.duplicateGroups.length
  const highPriorityCount = simulation.files.filter((file) => file.priority === 'high').length
  const activeStep = guidedFlowSteps[activeStepIndex] ?? guidedFlowSteps[0]
  const clarityDelta = simulation.proposal.clarityEstimate.afterScore - simulation.proposal.clarityEstimate.beforeScore

  function goToPreviousStep(): void {
    setActiveStepIndex((currentIndex) => Math.max(currentIndex - 1, 0))
  }

  function goToNextStep(): void {
    setActiveStepIndex((currentIndex) => Math.min(currentIndex + 1, guidedFlowSteps.length - 1))
  }

  return (
    <section className="organization-panel" aria-labelledby="organization-simulation-heading">
      <div className="organization-hero">
        <div className="panel-heading">
          <p className="result-eyebrow">Organization Simulation Panel</p>
          <h2 id="organization-simulation-heading">{simulation.label}</h2>
          <p>{simulation.scenario}</p>
        </div>

        <div className="simulation-badge-system" aria-label="Simulation Badge System">
          <span className="info-chip">Demo mode</span>
          <span className="info-chip">Simulation only</span>
          <span className="info-chip">Proposal-only</span>
          <span className="info-chip">No execution</span>
        </div>
      </div>

      <section className="guided-flow" aria-labelledby="guided-flow-heading">
        <div className="organization-section__heading">
          <p className="result-eyebrow">Guided Flow Timeline</p>
          <h3 id="guided-flow-heading">Understand the value in under two minutes</h3>
        </div>

        <div className="guided-flow__layout">
          <ol className="guided-flow__steps" aria-label="Progressive Simulation Steps">
            {guidedFlowSteps.map((step, index) => (
              <li key={step.id}>
                <button
                  aria-current={index === activeStepIndex ? 'step' : undefined}
                  className={index === activeStepIndex ? 'guided-flow__step guided-flow__step--active' : 'guided-flow__step'}
                  onClick={() => setActiveStepIndex(index)}
                  type="button"
                >
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  {step.label}
                </button>
              </li>
            ))}
          </ol>

          <article className="guided-flow__active-card">
            <p className="result-eyebrow">Progressive Simulation Steps</p>
            <h3>{activeStep.title}</h3>
            <p>{activeStep.description}</p>
            <div className="actions">
              <button className="secondary-button" disabled={activeStepIndex === 0} onClick={goToPreviousStep} type="button">
                Previous
              </button>
              <button
                className="primary-button"
                disabled={activeStepIndex === guidedFlowSteps.length - 1}
                onClick={goToNextStep}
                type="button"
              >
                Next step
              </button>
              <span className="meta-text">{activeStep.label}</span>
            </div>
          </article>
        </div>
      </section>

      <div className="safety-indicator" aria-label="No real filesystem access safety indicator">
        <strong>No real filesystem access</strong>
        <span>No host scanning</span>
        <span>No automation</span>
        <span>No file movement</span>
        <span>Owner-controlled preview</span>
      </div>

      <div className="organization-metrics" aria-label="Organization Impact Metrics">
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
        <div>
          <span>+{clarityDelta}</span>
          <p>Estimated clarity improvement</p>
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
          <div className="thinking-state" aria-label="GENIO Thinking State">
            <span />
            <span />
            <span />
            GENIO Thinking State
          </div>
          <p>{simulation.genioAnalysis.summary}</p>
          <p>{simulation.genioAnalysis.recommendedStrategy}</p>
          <span className="info-chip">{simulation.genioAnalysis.governanceBoundary}</span>
        </article>

        <article className="organization-card">
          <p className="result-eyebrow">GENESIS Reflection Card</p>
          <h3>Contextual mirror</h3>
          <div className="reflection-feed" aria-label="GENESIS Reflection Feed">
            {simulation.genesisReflections.map((reflection) => (
              <div className="organization-note" key={reflection.id}>
                <strong>{reflection.label}</strong>
                <p>{reflection.observation}</p>
                <span>{reflection.boundary}</span>
              </div>
            ))}
          </div>
        </article>

        <article className="organization-card">
          <p className="result-eyebrow">Alignment Validation Card</p>
          <h3>Human-centered checks</h3>
          <div className="alignment-status" aria-label="Alignment Status Indicator">
            <span />
            Alignment Status Indicator: passed
          </div>
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

        <div className="comparison-toggle" aria-label="Interactive Before/After Toggle">
          <button
            aria-pressed={comparisonMode === 'before'}
            className={comparisonMode === 'before' ? 'comparison-toggle__button comparison-toggle__button--active' : 'comparison-toggle__button'}
            onClick={() => setComparisonMode('before')}
            type="button"
          >
            Before
          </button>
          <button
            aria-pressed={comparisonMode === 'after'}
            className={comparisonMode === 'after' ? 'comparison-toggle__button comparison-toggle__button--active' : 'comparison-toggle__button'}
            onClick={() => setComparisonMode('after')}
            type="button"
          >
            After
          </button>
        </div>

        <div className="before-after-grid">
          <div
            className={
              comparisonMode === 'before'
                ? 'file-column file-column--chaos file-column--active'
                : 'file-column file-column--chaos'
            }
          >
            <h4>Before: overloaded surface</h4>
            {simulation.files.map((file) => (
              <div className="file-row" key={file.id}>
                <span>{file.name}</span>
                <small>{file.currentLocation}</small>
              </div>
            ))}
          </div>
          <div
            className={
              comparisonMode === 'after'
                ? 'file-column file-column--calm file-column--active'
                : 'file-column file-column--calm'
            }
          >
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
          <p className="result-eyebrow">Clarity Score Visualization</p>
          <h3>{simulation.proposal.clarityEstimate.label}</h3>
          <p>{simulation.proposal.clarityEstimate.caveat}</p>
        </div>
        <div className="clarity-score" aria-label="Clarity Score Visualization">
          <div>
            <span>Before</span>
            <strong>{simulation.proposal.clarityEstimate.beforeScore}</strong>
            <div className="clarity-score__track">
              <span style={{ width: `${simulation.proposal.clarityEstimate.beforeScore}%` }} />
            </div>
          </div>
          <div>
            <span>After</span>
            <strong>{simulation.proposal.clarityEstimate.afterScore}</strong>
            <div className="clarity-score__track">
              <span style={{ width: `${simulation.proposal.clarityEstimate.afterScore}%` }} />
            </div>
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
