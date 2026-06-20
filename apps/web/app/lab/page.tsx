'use client'

import { FormEvent, useEffect, useState } from 'react'
import {
  privateLabAgents,
  privateLabGovernance,
  privateLabTools,
  type PrivateLabAgentCatalogItem,
  type PrivateLabGovernanceCatalog,
  type PrivateLabToolCatalogItem
} from '@/lib/private-lab'
import { ControlledEmailPreviewPanel } from './ControlledEmailPreviewPanel'
import { ControlledExecutionPlanningPanel } from './ControlledExecutionPlanningPanel'
import { ControlledReadOnlyPreviewPanel } from './ControlledReadOnlyPreviewPanel'
import { OrganizationSimulationPanel } from './OrganizationSimulationPanel'

type ToolResult = {
  toolId: string
  title: string
  summary: string
  sections: Array<{
    heading: string
    items: string[]
  }>
  requiresHumanApproval: boolean
  riskLevel: string
  approval?: {
    proposalId: string
    permission: string
    decision: string
    reason: string
    requiresHumanApproval: boolean
    actionExecuted: false
  }
  ownerApproval?: OwnerApprovalState
  commands?: Array<{
    command: string
    purpose: string
    riskLevel: string
    requiresConfirmation: boolean
  }>
}

type AuditEvent = {
  id: string
  eventId?: string
  type: string
  timestamp: string
  actionExecuted: false
  agentId?: string
  toolId?: string
  actionType?: string
  proposalId?: string
  correlationId?: string
  sessionId?: string
  riskLevel?: string
  decision?: string
  approvalStatus?: string
  approvalDecision?: string
  permission?: string
  governanceSource?: string
  hierarchyLevel?: string
  blockedReason?: string
  reviewedBy?: string
  reviewTimestamp?: string
  rejectionReason?: string
  requiresHumanApproval?: boolean
  simulationOnly?: true
  inputPreview?: string
  summary?: string
}

type OwnerApprovalStatus = 'pending' | 'approved' | 'rejected' | 'blocked'

type OwnerApprovalState = {
  proposalId: string
  correlationId: string
  sessionId: string
  approvalStatus: OwnerApprovalStatus
  reviewedBy?: string
  reviewTimestamp?: string
  rejectionReason?: string
  simulationOnly: true
  actionExecuted: false
}

type LabResponse = {
  success: true
  data: {
    result: ToolResult
    auditEvents: AuditEvent[]
  }
}

type LabCatalogResponse = {
  success: true
  data: {
    governance?: PrivateLabGovernanceCatalog
    agents: PrivateLabAgentCatalogItem[]
    tools: PrivateLabToolCatalogItem[]
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : 'Unexpected private lab error.'
}

function createFallbackApprovalState(result: ToolResult): OwnerApprovalState {
  const proposalId = result.approval?.proposalId ?? `tool-${result.toolId}`

  return {
    proposalId,
    correlationId: `corr-${proposalId}`,
    sessionId: 'private-lab-local-session',
    approvalStatus: result.approval?.decision === 'forbidden' ? 'blocked' : 'pending',
    simulationOnly: true,
    actionExecuted: false
  }
}

function createOwnerDecisionEvent(
  type: 'approval-approved' | 'approval-rejected',
  result: ToolResult,
  approvalState: OwnerApprovalState
): AuditEvent {
  const timestamp = approvalState.reviewTimestamp ?? new Date().toISOString()

  return {
    id: `${type}-${approvalState.proposalId}-${timestamp}`,
    eventId: `${type}-${approvalState.proposalId}-${timestamp}`,
    type,
    timestamp,
    actionExecuted: false,
    simulationOnly: true,
    actionType: type,
    proposalId: approvalState.proposalId,
    correlationId: approvalState.correlationId,
    sessionId: approvalState.sessionId,
    approvalStatus: approvalState.approvalStatus,
    governanceSource: 'genio-central',
    approvalDecision: result.approval?.decision,
    riskLevel: result.riskLevel,
    toolId: result.toolId,
    ...(approvalState.reviewedBy ? { reviewedBy: approvalState.reviewedBy } : {}),
    ...(approvalState.reviewTimestamp ? { reviewTimestamp: approvalState.reviewTimestamp } : {}),
    ...(approvalState.rejectionReason ? { rejectionReason: approvalState.rejectionReason } : {}),
    summary:
      type === 'approval-approved'
        ? 'Owner approved the proposal metadata. No action was executed.'
        : 'Owner rejected the proposal metadata. No action was executed.'
  }
}

function approveProposalState(state: OwnerApprovalState): OwnerApprovalState {
  if (state.approvalStatus === 'blocked') {
    return state
  }

  return {
    ...state,
    approvalStatus: 'approved',
    reviewedBy: 'owner',
    reviewTimestamp: new Date().toISOString(),
    simulationOnly: true,
    actionExecuted: false
  }
}

function rejectProposalState(state: OwnerApprovalState): OwnerApprovalState {
  if (state.approvalStatus === 'blocked') {
    return state
  }

  return {
    ...state,
    approvalStatus: 'rejected',
    reviewedBy: 'owner',
    reviewTimestamp: new Date().toISOString(),
    rejectionReason: 'Rejected by owner in proposal-only lab.',
    simulationOnly: true,
    actionExecuted: false
  }
}

async function readJson(response: Response): Promise<unknown> {
  const text = await response.text()

  if (!text.trim()) {
    return null
  }

  try {
    return JSON.parse(text)
  } catch {
    throw new Error('The private lab response is not valid JSON.')
  }
}

async function requestLabTool(body: Record<string, unknown>): Promise<LabResponse> {
  const response = await fetch('/api/lab/tool', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    cache: 'no-store',
    body: JSON.stringify(body)
  })

  const payload = await readJson(response)

  if (!response.ok) {
    if (isRecord(payload) && typeof payload.error === 'string') {
      throw new Error(payload.error)
    }

    throw new Error('Private lab access denied.')
  }

  if (!isRecord(payload) || payload.success !== true || !isRecord(payload.data)) {
    throw new Error('Unexpected private lab response.')
  }

  return payload as LabResponse
}

async function requestLabCatalog(ownerAccessCode: string): Promise<LabCatalogResponse> {
  const response = await fetch('/api/lab/catalog', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    cache: 'no-store',
    body: JSON.stringify({ ownerAccessCode })
  })

  const payload = await readJson(response)

  if (!response.ok) {
    if (isRecord(payload) && typeof payload.error === 'string') {
      throw new Error(payload.error)
    }

    throw new Error('Private lab access denied.')
  }

  if (!isRecord(payload) || payload.success !== true || !isRecord(payload.data)) {
    throw new Error('Unexpected private lab catalog response.')
  }

  return payload as LabCatalogResponse
}

export default function LabPage() {
  const [ownerAccessCode, setOwnerAccessCode] = useState('')
  const [unlocked, setUnlocked] = useState(false)
  const [agents, setAgents] = useState<PrivateLabAgentCatalogItem[]>([...privateLabAgents])
  const [governance, setGovernance] = useState<PrivateLabGovernanceCatalog>(privateLabGovernance)
  const [tools, setTools] = useState<PrivateLabToolCatalogItem[]>([...privateLabTools])
  const [agentId, setAgentId] = useState('operator-agent')
  const [toolId, setToolId] = useState('review-risk')
  const [input, setInput] = useState('')
  const [result, setResult] = useState<ToolResult | null>(null)
  const [ownerApproval, setOwnerApproval] = useState<OwnerApprovalState | null>(null)
  const [auditEvents, setAuditEvents] = useState<AuditEvent[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const selectedAgent = agents.find((agent) => agent.id === agentId) ?? agents[0]
  const availableTools = tools.filter((tool) => selectedAgent?.allowedTools.includes(tool.id))
  const visibleTools = availableTools.length > 0 ? availableTools : tools
  const selectedTool = visibleTools.find((tool) => tool.id === toolId) ?? visibleTools[0]

  useEffect(() => {
    if (selectedTool && selectedTool.id !== toolId) {
      setToolId(selectedTool.id)
    }
  }, [selectedTool, toolId])

  async function handleUnlock(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault()

    if (!ownerAccessCode.trim()) {
      setError('Owner access code is required.')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const catalog = await requestLabCatalog(ownerAccessCode)
      setGovernance(catalog.data.governance ?? privateLabGovernance)
      setAgents(catalog.data.agents)
      setTools(catalog.data.tools)
      setUnlocked(true)
    } catch (currentError) {
      setError(getErrorMessage(currentError))
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault()

    if (!input.trim()) {
      setError('Provide a private lab input before requesting a proposal.')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const payload = await requestLabTool({
        ownerAccessCode,
        agentId,
        toolId,
        input
      })

      setResult(payload.data.result)
      setOwnerApproval(payload.data.result.ownerApproval ?? createFallbackApprovalState(payload.data.result))
      setAuditEvents(payload.data.auditEvents)
    } catch (currentError) {
      setError(getErrorMessage(currentError))
    } finally {
      setLoading(false)
    }
  }

  function handleApproveProposal(): void {
    if (!result || !ownerApproval) {
      return
    }

    const nextApproval = approveProposalState(ownerApproval)
    setOwnerApproval(nextApproval)
    setAuditEvents((currentEvents) => [...currentEvents, createOwnerDecisionEvent('approval-approved', result, nextApproval)])
  }

  function handleRejectProposal(): void {
    if (!result || !ownerApproval) {
      return
    }

    const nextApproval = rejectProposalState(ownerApproval)
    setOwnerApproval(nextApproval)
    setAuditEvents((currentEvents) => [...currentEvents, createOwnerDecisionEvent('approval-rejected', result, nextApproval)])
  }

  return (
    <main className="page-shell">
      <section className="hero">
        <div className="hero-copy hero-copy--stacked">
          <span className="hero-badge">AI Engineering Laboratory</span>
          <h1>Private AI Lab</h1>
          <p>
            A governance-first environment for exploring future AI capabilities through safe simulations and
            controlled proposals.
          </p>

          <div className="tag-row">
            <span className="tech-pill">Governance-first</span>
            <span className="tech-pill">Owner approval</span>
            <span className="tech-pill">Proposal != Execution</span>
            <span className="tech-pill">Simulation-only</span>
          </div>
        </div>

        <aside className="hero-card hero-card--spotlight">
          <p className="result-eyebrow">Laboratory boundary</p>
          <h2>Explore {'->'} Propose {'->'} Review</h2>
          <p className="meta-text">
            The lab models engineering decisions and approval flows. It has no filesystem, terminal, autonomous
            execution, background workers, or AGI capability.
          </p>
          <span className="status-pill status-pill--pending">{unlocked ? 'Private lab unlocked' : 'Owner access required'}</span>
        </aside>
      </section>

      <section className="section-block" id="governance" aria-labelledby="governance-heading">
        <div className="section-head">
          <p className="result-eyebrow">01 · Governance</p>
          <h2 className="section-title" id="governance-heading">Human authority remains central</h2>
          <p>GENIO represents the policy and risk layer. It governs proposals but does not operate real systems.</p>
        </div>

        <div className="governance-contract__grid">
          <article className="governance-contract__item">
            <span>Authority</span>
            <strong>{governance.centralProfile.approvalAuthority}</strong>
            <p>Owner review is required wherever a proposal carries meaningful risk.</p>
          </article>
          <article className="governance-contract__item">
            <span>Execution</span>
            <strong>blocked</strong>
            <p>Approval records a decision. It never triggers a terminal, worker, adapter, or filesystem action.</p>
          </article>
          <article className="governance-contract__item">
            <span>Observability</span>
            <strong>in-memory</strong>
            <p>Audit events make proposal and approval states visible during the current lab session.</p>
          </article>
        </div>

        <div className="tag-row">
          {['No filesystem', 'No terminal', 'No AGI', 'No autonomous execution', 'No background workers'].map((boundary) => (
            <span className="tech-pill" key={boundary}>{boundary}</span>
          ))}
        </div>
      </section>

      {!unlocked ? (
        <section className="workspace">
          <form className="panel" onSubmit={handleUnlock}>
            <div className="panel-heading">
              <p className="result-eyebrow">Private access</p>
              <h2>Enter the engineering lab</h2>
              <p>Unlock the governed catalogs and proposal workspace with the owner access code.</p>
            </div>

            <label className="field-label" htmlFor="owner-access-code">
              Owner access code
            </label>
            <input
              className="prompt-input"
              id="owner-access-code"
              onChange={(event) => setOwnerAccessCode(event.target.value)}
              type="password"
              value={ownerAccessCode}
            />

            {error ? <p className="error-line">{error}</p> : null}

            <div className="actions">
              <button className="primary-button" disabled={loading} type="submit">
                {loading ? 'Checking...' : 'Unlock lab'}
              </button>
              <span className="meta-text">Private session · Proposal-only access</span>
            </div>
          </form>

          <aside className="panel">
            <div className="panel-heading">
              <p className="result-eyebrow">What opens</p>
              <h2>A controlled engineering workspace</h2>
              <p>Review governed agents, tools, simulations, approval states, audit events, and future blueprints.</p>
            </div>
            <div className="tag-row">
              <span className="tech-pill">Safe simulations</span>
              <span className="tech-pill">Risk metadata</span>
              <span className="tech-pill">Owner decisions</span>
              <span className="tech-pill">Audit trail</span>
            </div>
          </aside>
        </section>
      ) : (
        <>
          <section className="section-block" id="agent-catalog" aria-labelledby="agents-heading">
            <div className="section-head">
              <p className="result-eyebrow">02 · Agent catalog</p>
              <h2 className="section-title" id="agents-heading">Governed specialist roles</h2>
              <p>Each catalog entry describes a proposal role and its permitted tools—not an autonomous worker.</p>
            </div>
            <div className="showcase-grid">
              {agents.map((agent) => (
                <article className="showcase-card" key={agent.id}>
                  <p className="result-eyebrow">{agent.category}</p>
                  <h3>{agent.label}</h3>
                  <p>{agent.description}</p>
                  <div className="response-meta">
                    <span className="info-chip">Risk {agent.riskProfile}</span>
                    <span className="info-chip">{agent.hierarchyLevel ?? 'specialist'}</span>
                  </div>
                  <button
                    className={agentId === agent.id ? 'primary-button' : 'secondary-button'}
                    onClick={() => setAgentId(agent.id)}
                    type="button"
                  >
                    {agentId === agent.id ? 'Selected' : `Select ${agent.label}`}
                  </button>
                </article>
              ))}
            </div>
          </section>

          <section className="section-block" id="tool-catalog" aria-labelledby="tools-heading">
            <div className="section-head">
              <p className="result-eyebrow">03 · Tool catalog</p>
              <h2 className="section-title" id="tools-heading">Controlled proposal tools</h2>
              <p>Tools model analysis, previews, and planning. They do not connect to or modify real systems.</p>
            </div>
            <div className="showcase-grid">
              {visibleTools.map((tool) => (
                <article className="showcase-card" key={tool.id}>
                  <p className="result-eyebrow">{tool.category}</p>
                  <h3>{tool.label}</h3>
                  <p>{tool.description}</p>
                  <div className="response-meta">
                    <span className="info-chip">Risk {tool.riskLevel}</span>
                    <span className="info-chip">{tool.requiresApproval ? 'Owner approval' : 'Proposal safe'}</span>
                  </div>
                  <button
                    className={toolId === tool.id ? 'primary-button' : 'secondary-button'}
                    onClick={() => setToolId(tool.id)}
                    type="button"
                  >
                    {toolId === tool.id ? 'Selected' : `Select ${tool.label}`}
                  </button>
                </article>
              ))}
            </div>
          </section>

          <section className="section-block" aria-labelledby="simulations-heading">
            <div className="section-head">
              <p className="result-eyebrow">Controlled simulations</p>
              <h2 className="section-title" id="simulations-heading">Explore without touching real systems</h2>
            </div>
            <OrganizationSimulationPanel />
            <ControlledReadOnlyPreviewPanel />
            <ControlledEmailPreviewPanel />
            <ControlledExecutionPlanningPanel />
          </section>

          <section className="workspace" id="approval-flow">
            <form className="panel" onSubmit={handleSubmit}>
              <div className="panel-heading">
                <p className="result-eyebrow">04 · Owner approval flow</p>
                <h2>Generate a governed proposal</h2>
                <p>Use the selected agent and tool to prepare a reviewable plan.</p>
              </div>

              <label className="field-label" htmlFor="lab-agent">Agent</label>
              <select
                className="select-input"
                id="lab-agent"
                onChange={(event) => setAgentId(event.target.value)}
                value={agentId}
              >
                {agents.map((agent) => <option key={agent.id} value={agent.id}>{agent.label}</option>)}
              </select>

              <label className="field-label" htmlFor="lab-tool">Tool</label>
              <select
                className="select-input"
                id="lab-tool"
                onChange={(event) => setToolId(event.target.value)}
                value={toolId}
              >
                {visibleTools.map((tool) => <option key={tool.id} value={tool.id}>{tool.label}</option>)}
              </select>

              <div className="response-meta">
                <span className="info-chip">Agent risk {selectedAgent?.riskProfile}</span>
                <span className="info-chip">Tool risk {selectedTool?.riskLevel}</span>
                <span className="info-chip">{selectedTool?.requiresApproval ? 'Approval required' : 'Proposal safe'}</span>
              </div>

              <label className="field-label" htmlFor="lab-input">Proposal request</label>
              <textarea
                className="prompt-input"
                id="lab-input"
                onChange={(event) => setInput(event.target.value)}
                placeholder="Describe the engineering scenario you want to explore..."
                value={input}
              />

              {error ? <p className="error-line">{error}</p> : null}

              <div className="actions">
                <button className="primary-button" disabled={loading} type="submit">
                  {loading ? 'Generating...' : 'Generate proposal'}
                </button>
                <span className="meta-text">Proposal != Execution</span>
              </div>
            </form>

            <aside className="panel">
              <div className="panel-heading">
                <p className="result-eyebrow">Proposal review</p>
                <h2>{result ? result.title : 'Awaiting a proposal'}</h2>
                <p>{result ? result.summary : 'Generated proposal, risk, and approval metadata will appear here.'}</p>
              </div>

              {result ? (
                <>
                  <div className="response-meta">
                    <span className="info-chip">Risk {result.riskLevel}</span>
                    <span className="info-chip">{result.requiresHumanApproval ? 'Human approval required' : 'Proposal safe'}</span>
                    <span className="info-chip">Simulation only</span>
                  </div>

                  {result.sections.map((section) => (
                    <section className="result-state" key={section.heading}>
                      <p className="result-eyebrow">{section.heading}</p>
                      <ul>{section.items.map((item) => <li key={item}>{item}</li>)}</ul>
                    </section>
                  ))}

                  {result.commands && result.commands.length > 0 ? (
                    <section className="result-state">
                      <p className="result-eyebrow">Planning preview · Text only</p>
                      {result.commands.map((command) => (
                        <div className="code-block" key={command.command}>
                          <pre><code>{command.command}</code></pre>
                          <p>{command.purpose}</p>
                        </div>
                      ))}
                    </section>
                  ) : null}

                  {ownerApproval ? (
                    <section className="result-state">
                      <p className="result-eyebrow">Owner decision</p>
                      <h3>{ownerApproval.approvalStatus}</h3>
                      <p>Approval records consent for this proposal. It does not execute the plan.</p>
                      <div className="response-meta">
                        <span className="info-chip">{ownerApproval.proposalId}</span>
                        <span className="info-chip">Action executed: false</span>
                      </div>
                      <div className="actions">
                        <button
                          className="primary-button"
                          disabled={ownerApproval.approvalStatus === 'blocked'}
                          onClick={handleApproveProposal}
                          type="button"
                        >
                          Approve proposal
                        </button>
                        <button
                          className="secondary-button"
                          disabled={ownerApproval.approvalStatus === 'blocked'}
                          onClick={handleRejectProposal}
                          type="button"
                        >
                          Reject proposal
                        </button>
                      </div>
                    </section>
                  ) : null}
                </>
              ) : null}
            </aside>
          </section>

          <section className="section-block" id="audit-events" aria-labelledby="audit-heading">
            <div className="section-head">
              <p className="result-eyebrow">05 · Audit trail</p>
              <h2 className="section-title" id="audit-heading">Visible decisions, current session only</h2>
              <p>Audit events show proposal lineage and owner decisions without persistent storage or execution.</p>
            </div>
            <div className="signal-grid">
              {auditEvents.length > 0 ? auditEvents.slice(-6).map((event) => (
                <article className="signal-card" key={event.id}>
                  <p className="result-eyebrow">{event.actionType ?? event.type}</p>
                  <h3>{event.approvalStatus ?? event.approvalDecision ?? event.decision ?? 'Recorded'}</h3>
                  <div className="response-meta">
                    {event.riskLevel ? <span className="info-chip">Risk {event.riskLevel}</span> : null}
                    {event.toolId ? <span className="info-chip">{event.toolId}</span> : null}
                    <span className="info-chip">Not executed</span>
                  </div>
                </article>
              )) : (
                <article className="signal-card">
                  <p className="result-eyebrow">Ready</p>
                  <h3>No events yet</h3>
                  <p>Generate a proposal to see its in-memory audit trail.</p>
                </article>
              )}
            </div>
          </section>

          <section className="section-block" id="future-blueprints" aria-labelledby="blueprints-heading">
            <div className="section-head">
              <p className="result-eyebrow">06 · Future blueprints</p>
              <h2 className="section-title" id="blueprints-heading">Architecture ideas, not active capabilities</h2>
              <p>These profiles describe possible governed phases. No runtime, adapter, real auth, or persistent memory exists here.</p>
            </div>
            <div className="showcase-grid">
              {governance.centralProfile.futureCapabilities.map((capability) => (
                <article className="showcase-card" key={capability.id}>
                  <p className="result-eyebrow">Blueprint only</p>
                  <h3>{capability.label}</h3>
                  <div className="response-meta">
                    <span className="info-chip">Not implemented</span>
                    <span className="info-chip">Approval-aware</span>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </>
      )}
    </main>
  )
}
