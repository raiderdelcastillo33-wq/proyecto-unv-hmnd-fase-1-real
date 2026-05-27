'use client'

import { FormEvent, useState } from 'react'
import { privateLabAgents, privateLabTools, type PrivateLabAgentId, type PrivateLabToolId } from '@/lib/private-lab'

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
  commands?: Array<{
    command: string
    purpose: string
    riskLevel: string
    requiresConfirmation: boolean
  }>
}

type AuditEvent = {
  id: string
  type: string
  timestamp: string
  actionExecuted: false
  agentId?: string
  toolId?: string
  decision?: string
  permission?: string
  requiresHumanApproval?: boolean
  inputPreview?: string
}

type LabResponse = {
  success: true
  data: {
    result: ToolResult
    auditEvents: AuditEvent[]
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : 'Unexpected private lab error.'
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

export default function LabPage() {
  const [ownerAccessCode, setOwnerAccessCode] = useState('')
  const [unlocked, setUnlocked] = useState(false)
  const [agentId, setAgentId] = useState<PrivateLabAgentId>('operator-agent')
  const [toolId, setToolId] = useState<PrivateLabToolId>('review-risk')
  const [input, setInput] = useState('')
  const [result, setResult] = useState<ToolResult | null>(null)
  const [auditEvents, setAuditEvents] = useState<AuditEvent[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const selectedAgent = privateLabAgents.find((agent) => agent.id === agentId) ?? privateLabAgents[5]
  const selectedTool = privateLabTools.find((tool) => tool.id === toolId) ?? privateLabTools[4]

  function handleUnlock(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault()

    if (!ownerAccessCode.trim()) {
      setError('Owner access code is required.')
      return
    }

    setUnlocked(true)
    setError(null)
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
      setAuditEvents(payload.data.auditEvents)
    } catch (currentError) {
      setError(getErrorMessage(currentError))
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="page-shell">
      <section className="hero">
        <div className="hero-copy hero-copy--stacked">
          <span className="status-pill status-pill--pending">Private local lab</span>
          <h1>Private AI Lab</h1>
          <p>
            Controlled workspace for private agent proposals, approval metadata, and in-memory audit events. Proposal
            does not mean execution.
          </p>

          <div className="tag-row">
            <span className="tech-pill">Human-in-the-loop</span>
            <span className="tech-pill">Proposals only</span>
            <span className="tech-pill">No real terminal</span>
          </div>
        </div>

        <aside className="hero-card hero-card--spotlight">
          <p className="result-eyebrow">Security boundary</p>
          <h2>proposal != execution</h2>
          <p className="meta-text">
            Tools can suggest structured plans and commands as text. They cannot run commands, move files, read Gmail, or
            access secrets.
          </p>
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
                Unlock lab
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
          </aside>
        </section>
      ) : (
        <section className="workspace">
          <form className="panel" onSubmit={handleSubmit}>
            <div className="panel-heading">
              <p className="result-eyebrow">Tool request</p>
              <h2>Generate an auditable proposal</h2>
              <p>Select an agent and a controlled tool. Commands are rendered as text only.</p>
            </div>

            <label className="field-label" htmlFor="lab-agent">
              Agent
            </label>
            <select
              className="select-input"
              id="lab-agent"
              onChange={(event) => setAgentId(event.target.value as PrivateLabAgentId)}
              value={agentId}
            >
              {privateLabAgents.map((agent) => (
                <option key={agent.id} value={agent.id}>
                  {agent.label}
                </option>
              ))}
            </select>
            <p className="meta-text">{selectedAgent.description}</p>

            <label className="field-label" htmlFor="lab-tool">
              Tool
            </label>
            <select
              className="select-input"
              id="lab-tool"
              onChange={(event) => setToolId(event.target.value as PrivateLabToolId)}
              value={toolId}
            >
              {privateLabTools.map((tool) => (
                <option key={tool.id} value={tool.id}>
                  {tool.label}
                </option>
              ))}
            </select>
            <p className="meta-text">{selectedTool.description}</p>

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
                  </div>
                </section>

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
                  <p className="result-eyebrow">Audit events</p>
                  <h3>{auditEvents.length} events in memory</h3>
                  {auditEvents.slice(-6).map((event) => (
                    <div className="response-meta" key={event.id}>
                      <span className="info-chip">{event.type}</span>
                      {event.decision ? <span className="info-chip">{event.decision}</span> : null}
                      {event.toolId ? <span className="info-chip">{event.toolId}</span> : null}
                    </div>
                  ))}
                </section>
              </>
            ) : (
              <section className="result-state">
                <p className="result-eyebrow">Waiting</p>
                <h3>Private lab proposal will appear here</h3>
                <p>Unlock the lab, choose an agent and tool, then submit a controlled request.</p>
              </section>
            )}
          </aside>
        </section>
      )}
    </main>
  )
}
