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
          <span className="status-pill status-pill--pending">Private local lab</span>
          <h1>GENIO Central Governance Layer</h1>
          <p>
            Controlled workspace for central governance, private agent proposals, approval metadata, and in-memory audit
            events. Proposal does not mean execution.
          </p>

          <div className="tag-row">
            <span className="tech-pill">GENIO Central</span>
            <span className="tech-pill">Human-in-the-loop</span>
            <span className="tech-pill">proposal != execution</span>
            <span className="tech-pill">Proposals only</span>
            <span className="tech-pill">No real terminal</span>
          </div>
        </div>

        <aside className="hero-card hero-card--spotlight">
          <p className="result-eyebrow">{governance.centralProfile.governanceLevel}</p>
          <h2>{governance.centralProfile.label}</h2>
          <p className="meta-text">{governance.centralProfile.systemDescription}</p>
          <div className="response-meta">
            <span className="info-chip">{governance.centralProfile.hierarchyLevel}</span>
            <span className="info-chip">{governance.centralProfile.approvalAuthority}</span>
            <span className="info-chip">Simulation only</span>
          </div>
        </aside>
      </section>

      {!unlocked ? (
        <section className="workspace">
          <form className="panel" onSubmit={handleUnlock}>
            <div className="panel-heading">
              <p className="result-eyebrow">Locked</p>
              <h2>Owner access required</h2>
              <p>The access code stays in component state and is sent only to the server-side lab route.</p>
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
              <button className="primary-button" type="submit">
                {loading ? 'Checking...' : 'Unlock lab'}
              </button>
              <span className="meta-text">Requires server-side OWNER_ACCESS_CODE</span>
            </div>
          </form>

          <aside className="panel">
            <div className="panel-heading">
              <p className="result-eyebrow">Scope</p>
              <h2>Private core only</h2>
              <p>No database, no auth layer, no filesystem, no terminal execution, no Gmail integration.</p>
            </div>
            <div className="tag-row">
              {governance.centralProfile.safetyBoundaries.slice(0, 4).map((boundary) => (
                <span className="tech-pill" key={boundary}>
                  {boundary}
                </span>
              ))}
            </div>
          </aside>
        </section>
      ) : (
        <section className="workspace">
          <form className="panel" onSubmit={handleSubmit}>
            <div className="panel-heading">
              <p className="result-eyebrow">Governed tool request</p>
              <h2>Generate an auditable proposal</h2>
              <p>Select a subordinate agent and a controlled tool. GENIO metadata governs risk before future tool access.</p>
            </div>

            <section className="result-state">
              <p className="result-eyebrow">Central authority</p>
              <h3>{governance.centralProfile.label}</h3>
              <p>{governance.centralProfile.role}</p>
              <div className="response-meta">
                <span className="info-chip">Priority {governance.centralProfile.orchestrationPriority}</span>
                <span className="info-chip">Risk {governance.centralProfile.riskAwareness}</span>
                <span className="info-chip">{governance.ownership}</span>
              </div>
            </section>

            <section className="result-state">
              <p className="result-eyebrow">Auth blueprint</p>
              <h3>{governance.centralProfile.authBlueprint.label}</h3>
              <p>{governance.centralProfile.authBlueprint.ownerAccessCodeBoundary}</p>
              <div className="response-meta">
                <span className="info-chip">{governance.centralProfile.authBlueprint.currentAuthMode}</span>
                <span className="info-chip">Real auth not implemented</span>
                <span className="info-chip">Blueprint ready</span>
                <span className="info-chip">No sessions</span>
              </div>
              <div className="tag-row">
                {governance.centralProfile.authBlueprint.supportedFutureRoles.map((role) => (
                  <span className="tech-pill" key={role}>
                    {role}
                  </span>
                ))}
              </div>
            </section>

            <section className="result-state">
              <p className="result-eyebrow">Observability blueprint</p>
              <h3>{governance.centralProfile.observabilityBlueprint.label}</h3>
              <p>{governance.centralProfile.observabilityBlueprint.auditPersistenceReadiness.safetyBoundary}</p>
              <div className="response-meta">
                <span className="info-chip">{governance.centralProfile.observabilityBlueprint.status}</span>
                <span className="info-chip">{governance.centralProfile.observabilityBlueprint.auditTrace.traceId}</span>
                <span className="info-chip">{governance.centralProfile.observabilityBlueprint.auditTrace.correlationId}</span>
                <span className="info-chip">No telemetry</span>
                <span className="info-chip">No persistent audit</span>
              </div>
              <div className="tag-row">
                {governance.centralProfile.observabilityBlueprint.governanceCheckpoints.map((checkpoint) => (
                  <span className="tech-pill" key={checkpoint.id}>
                    {checkpoint.label}: {checkpoint.riskLevel}
                  </span>
                ))}
              </div>
            </section>

            <section className="result-state">
              <p className="result-eyebrow">Memory blueprint</p>
              <h3>{governance.centralProfile.memoryContextBlueprint.label}</h3>
              <p>{governance.centralProfile.memoryContextBlueprint.futureArchitecture.safetyBoundary}</p>
              <div className="response-meta">
                <span className="info-chip">{governance.centralProfile.memoryContextBlueprint.status}</span>
                <span className="info-chip">No persistent memory</span>
                <span className="info-chip">No embeddings</span>
                <span className="info-chip">Simulation only</span>
              </div>
              <div className="tag-row">
                {governance.centralProfile.memoryContextBlueprint.memoryCategories.slice(0, 6).map((category) => (
                  <span className="tech-pill" key={category}>
                    {category}
                  </span>
                ))}
              </div>
            </section>

            <section className="result-state">
              <p className="result-eyebrow">Orchestration blueprint</p>
              <h3>{governance.centralProfile.orchestrationBlueprint.label}</h3>
              <p>{governance.centralProfile.orchestrationBlueprint.defaultFlow.objective}</p>
              <div className="response-meta">
                <span className="info-chip">{governance.centralProfile.orchestrationBlueprint.status}</span>
                <span className="info-chip">{governance.centralProfile.orchestrationBlueprint.defaultFlow.pipelineId}</span>
                <span className="info-chip">No workers</span>
                <span className="info-chip">Simulation only</span>
              </div>
              <div className="tag-row">
                {governance.centralProfile.orchestrationBlueprint.supportedRoles.map((role) => (
                  <span className="tech-pill" key={role}>
                    {role}
                  </span>
                ))}
              </div>
            </section>

            <section className="result-state">
              <p className="result-eyebrow">Adapter blueprint</p>
              <h3>{governance.centralProfile.adapterBlueprint.label}</h3>
              <p>Future adapters are cataloged as approval-aware metadata only. No adapter can execute in this phase.</p>
              <div className="response-meta">
                <span className="info-chip">{governance.centralProfile.adapterBlueprint.status}</span>
                <span className="info-chip">Adapter blueprint != adapter real</span>
                <span className="info-chip">Approval required</span>
                <span className="info-chip">Simulation only</span>
              </div>
              <div className="tag-row">
                {governance.centralProfile.adapterBlueprint.adapters.slice(0, 5).map((adapter) => (
                  <span className="tech-pill" key={adapter.id}>
                    {adapter.label}: {adapter.riskLevel}
                  </span>
                ))}
              </div>
            </section>

            <label className="field-label" htmlFor="lab-agent">
              Agent
            </label>
            <select
              className="select-input"
              id="lab-agent"
              onChange={(event) => setAgentId(event.target.value)}
              value={agentId}
            >
              {agents.map((agent) => (
                <option key={agent.id} value={agent.id}>
                  {agent.label}
                </option>
              ))}
            </select>
            <p className="meta-text">{selectedAgent?.description}</p>
            <div className="response-meta">
              <span className="info-chip">Category {selectedAgent?.category}</span>
              <span className="info-chip">Risk {selectedAgent?.riskProfile}</span>
              <span className="info-chip">Hierarchy {selectedAgent?.hierarchyLevel ?? 'specialist'}</span>
              <span className="info-chip">Parent {selectedAgent?.parentAuthority ?? 'genio-central'}</span>
            </div>
            <div className="tag-row">
              {selectedAgent?.capabilities.map((capability) => (
                <span className="tech-pill" key={capability}>
                  {capability}
                </span>
              ))}
            </div>

            <label className="field-label" htmlFor="lab-tool">
              Tool
            </label>
            <select
              className="select-input"
              id="lab-tool"
              onChange={(event) => setToolId(event.target.value)}
              value={toolId}
            >
              {visibleTools.map((tool) => (
                <option key={tool.id} value={tool.id}>
                  {tool.label}
                </option>
              ))}
            </select>
            <p className="meta-text">{selectedTool?.description}</p>
            <div className="response-meta">
              <span className="info-chip">Category {selectedTool?.category}</span>
              <span className="info-chip">Risk {selectedTool?.riskLevel}</span>
              <span className="info-chip">{selectedTool?.requiresApproval ? 'Approval required' : 'Proposal safe'}</span>
              <span className="info-chip">{selectedTool?.outputType}</span>
              <span className="info-chip">Governed by GENIO</span>
            </div>

            <label className="field-label" htmlFor="lab-input">
              Input
            </label>
            <textarea
              className="prompt-input"
              id="lab-input"
              onChange={(event) => setInput(event.target.value)}
              placeholder="Describe the private lab proposal you want to generate..."
              value={input}
            />

            {error ? <p className="error-line">{error}</p> : null}

            <div className="actions">
              <button className="primary-button" disabled={loading} type="submit">
                {loading ? 'Generating...' : 'Generate proposal'}
              </button>
              <span className="meta-text">No real-world action will be performed</span>
            </div>
          </form>

          <aside className="panel">
            <div className="panel-heading">
              <p className="result-eyebrow">Private lab output</p>
              <h2>Proposal and audit trail</h2>
              <p>Structured output from the local tool executor and approval gate.</p>
            </div>

            {result ? (
              <>
                <section className="result-state">
                  <p className="result-eyebrow">{result.toolId}</p>
                  <h3>{result.title}</h3>
                  <p>{result.summary}</p>
                  <div className="response-meta">
                    <span className="info-chip">Risk {result.riskLevel}</span>
                    <span className="info-chip">
                      {result.requiresHumanApproval ? 'Human approval required' : 'Safe proposal'}
                    </span>
                    <span className="info-chip">Simulation only</span>
                  </div>
                </section>

                {ownerApproval ? (
                  <section className="result-state">
                    <p className="result-eyebrow">Owner approval flow</p>
                    <h3>{ownerApproval.approvalStatus}</h3>
                    <p>Approve records owner consent for the proposal metadata only. Approve does not execute anything.</p>
                    <div className="response-meta">
                      <span className="info-chip">{ownerApproval.proposalId}</span>
                      <span className="info-chip">{ownerApproval.correlationId}</span>
                      <span className="info-chip">{ownerApproval.sessionId}</span>
                      <span className="info-chip">Action performed: no</span>
                      <span className="info-chip">Simulation only</span>
                    </div>
                    {ownerApproval.reviewedBy ? (
                      <div className="response-meta">
                        <span className="info-chip">Reviewed by {ownerApproval.reviewedBy}</span>
                        <span className="info-chip">{ownerApproval.reviewTimestamp}</span>
                        {ownerApproval.rejectionReason ? (
                          <span className="info-chip">{ownerApproval.rejectionReason}</span>
                        ) : null}
                      </div>
                    ) : null}
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
                      <span className="meta-text">Approve != Execute</span>
                    </div>
                  </section>
                ) : null}

                {result.approval ? (
                  <section className="result-state">
                    <p className="result-eyebrow">Approval metadata</p>
                    <h3>{result.approval.decision}</h3>
                    <p>{result.approval.reason}</p>
                    <div className="response-meta">
                      <span className="info-chip">{result.approval.permission}</span>
                      <span className="info-chip">
                        {result.approval.requiresHumanApproval ? 'Needs owner review' : 'No owner review needed'}
                      </span>
                      <span className="info-chip">Action performed: no</span>
                      <span className="info-chip">GENIO observed</span>
                    </div>
                  </section>
                ) : null}

                {result.sections.map((section) => (
                  <section className="result-state" key={section.heading}>
                    <p className="result-eyebrow">{section.heading}</p>
                    <ul>
                      {section.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </section>
                ))}

                {result.commands && result.commands.length > 0 ? (
                  <section className="result-state">
                    <p className="result-eyebrow">Suggested commands as text only</p>
                    {result.commands.map((command) => (
                      <div className="code-block" key={command.command}>
                        <pre><code>{command.command}</code></pre>
                        <p>{command.purpose}</p>
                        <span className="info-chip">
                          {command.requiresConfirmation ? 'Requires human confirmation' : 'Informational'}
                        </span>
                      </div>
                    ))}
                  </section>
                ) : null}

                <section className="result-state">
                  <p className="result-eyebrow">Governance observability</p>
                  <h3>{auditEvents.length} events in memory</h3>
                  {auditEvents.slice(-6).map((event) => (
                    <div className="response-meta" key={event.id}>
                      <span className="info-chip">{event.actionType ?? event.type}</span>
                      {event.approvalDecision ?? event.approvalStatus ?? event.decision ? (
                        <span className="info-chip">{event.approvalDecision ?? event.approvalStatus ?? event.decision}</span>
                      ) : null}
                      {event.riskLevel ? <span className="info-chip">Risk {event.riskLevel}</span> : null}
                      {event.governanceSource ? <span className="info-chip">{event.governanceSource}</span> : null}
                      {event.hierarchyLevel ? <span className="info-chip">{event.hierarchyLevel}</span> : null}
                      {event.toolId ? <span className="info-chip">{event.toolId}</span> : null}
                      {event.reviewedBy ? <span className="info-chip">Owner {event.reviewedBy}</span> : null}
                      {event.reviewTimestamp ? <span className="info-chip">{event.reviewTimestamp}</span> : null}
                      <span className="info-chip">{event.simulationOnly ? 'Simulation only' : 'Proposal only'}</span>
                    </div>
                  ))}
                </section>
              </>
            ) : (
              <>
                <section className="result-state">
                  <p className="result-eyebrow">Waiting</p>
                  <h3>Private lab proposal will appear here</h3>
                  <p>Unlock the lab, choose an agent and tool, then submit a controlled request.</p>
                </section>
                <section className="result-state">
                  <p className="result-eyebrow">Future readiness</p>
                  <h3>Metadata only</h3>
                  <div className="tag-row">
                    {governance.centralProfile.futureCapabilities.map((capability) => (
                      <span className="tech-pill" key={capability.id}>
                        {capability.label}
                      </span>
                    ))}
                  </div>
                </section>
                <section className="result-state">
                  <p className="result-eyebrow">Auth readiness</p>
                  <h3>{governance.centralProfile.authBlueprint.currentAuthMode}</h3>
                  <div className="response-meta">
                    <span className="info-chip">Real auth not implemented</span>
                    <span className="info-chip">No persistent sessions</span>
                    <span className="info-chip">No user DB</span>
                  </div>
                </section>
                <section className="result-state">
                  <p className="result-eyebrow">Audit lineage</p>
                  <h3>{governance.centralProfile.observabilityBlueprint.auditTrace.traceId}</h3>
                  <div className="response-meta">
                    {governance.centralProfile.observabilityBlueprint.eventLineage.map((lineage) => (
                      <span className="info-chip" key={lineage.id}>
                        {lineage.label}: {lineage.riskLevel}
                      </span>
                    ))}
                  </div>
                </section>
                <section className="result-state">
                  <p className="result-eyebrow">Context architecture</p>
                  <h3>{governance.centralProfile.memoryContextBlueprint.retentionPolicies.join(' / ')}</h3>
                  <div className="response-meta">
                    {governance.centralProfile.memoryContextBlueprint.contextWindows.map((window) => (
                      <span className="info-chip" key={window.id}>
                        {window.label}
                      </span>
                    ))}
                  </div>
                </section>
                <section className="result-state">
                  <p className="result-eyebrow">Agent pipeline</p>
                  <h3>{governance.centralProfile.orchestrationBlueprint.defaultFlow.orchestrationId}</h3>
                  <div className="response-meta">
                    {governance.centralProfile.orchestrationBlueprint.defaultFlow.pipelineSteps.map((step) => (
                      <span className="info-chip" key={step.id}>
                        {step.stageId}: {step.assignedAgent}
                      </span>
                    ))}
                  </div>
                </section>
                <section className="result-state">
                  <p className="result-eyebrow">Adapter readiness</p>
                  <h3>{governance.centralProfile.adapterBlueprint.adapters.length} future adapters</h3>
                  <div className="response-meta">
                    {governance.centralProfile.adapterBlueprint.adapters.slice(0, 4).map((adapter) => (
                      <span className="info-chip" key={adapter.id}>
                        {adapter.id}: {adapter.executionMode}
                      </span>
                    ))}
                  </div>
                </section>
              </>
            )}
          </aside>
        </section>
      )}
    </main>
  )
}
