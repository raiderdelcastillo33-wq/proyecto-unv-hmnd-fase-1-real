'use client'

import { FormEvent, useEffect, useRef, useState } from 'react'

type RuntimeMode = 'local' | 'external' | 'missing'

type RuntimeState = {
  status: 'checking' | 'ok' | 'error'
  configured: boolean
  service: string
  mode: RuntimeMode
  backend: string | null
  error?: string
}

type RunResult = {
  id: string
  response: string
}

const agentOptions = [
  { id: 'tutor-agent', label: 'Tutor', description: 'Learn technical ideas through clear, guided explanations.' },
  { id: 'architect-agent', label: 'Architect', description: 'Explore architecture, risks, and phased technical decisions.' },
  { id: 'reviewer-agent', label: 'Reviewer', description: 'Review bugs, security concerns, regressions, and missing tests.' },
  { id: 'debugger-agent', label: 'Debugger', description: 'Investigate errors, root causes, and verification steps.' },
  { id: 'operator-agent', label: 'Operator', description: 'Prepare safe operational plans without executing real actions.' }
] as const

const MAX_CONVERSATION_MESSAGES = 12
const MAX_CONTEXT_MESSAGES = 6
const MAX_CONTEXT_CHARS = 2_000
const TYPING_CHUNK_SIZE = 8
const TYPING_INTERVAL_MS = 20

type ConversationMessage = {
  id: string
  role: 'user' | 'assistant'
  content: string
  agentId: (typeof agentOptions)[number]['id']
  createdAt: string
}

const currentCapabilities = [
  {
    title: 'Guided conversations',
    description: 'Choose a specialist role and test focused responses in a simple conversational flow.'
  },
  {
    title: 'Visible runtime status',
    description: 'See whether the demo is using an available runtime or its controlled fallback.'
  },
  {
    title: 'Session conversation',
    description: 'Keep a short local conversation context with no database or persistent memory.'
  }
]

const safetyBoundaries = [
  'Proposal != Execution',
  'No terminal',
  'No automation',
  'No AGI',
  'No background agents',
  'No filesystem'
]

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : 'Unknown error'
}

async function readJson(response: Response): Promise<unknown> {
  const text = await response.text()

  if (text.trim().length === 0) {
    return null
  }

  try {
    return JSON.parse(text)
  } catch {
    throw new Error('The server response is not valid JSON.')
  }
}

async function requestJson<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...init,
    cache: 'no-store'
  })

  const payload = await readJson(response)

  if (!response.ok) {
    if (isRecord(payload) && typeof payload.error === 'string') {
      throw new Error(payload.error)
    }

    if (isRecord(payload) && isRecord(payload.error) && typeof payload.error.message === 'string') {
      throw new Error(payload.error.message)
    }

    throw new Error(`Request failed with status ${response.status}.`)
  }

  return payload as T
}

async function requestRuntimeState(): Promise<RuntimeState> {
  const response = await fetch('/api/health', {
    cache: 'no-store'
  })
  const payload = await readJson(response)

  if (response.ok || (isRecord(payload) && typeof payload.status === 'string')) {
    return parseRuntimeState(payload)
  }

  if (isRecord(payload) && typeof payload.error === 'string') {
    throw new Error(payload.error)
  }

  throw new Error(`Request failed with status ${response.status}.`)
}

function parseRuntimeState(payload: unknown): RuntimeState {
  if (!isRecord(payload) || typeof payload.status !== 'string') {
    throw new Error('Invalid backend runtime response.')
  }

  return {
    status: payload.status === 'ok' ? 'ok' : 'error',
    configured: payload.configured === true,
    service: typeof payload.service === 'string' ? payload.service : 'api-server',
    mode: payload.mode === 'external' || payload.mode === 'missing' ? payload.mode : 'local',
    backend: typeof payload.backend === 'string' ? payload.backend : null,
    error: typeof payload.error === 'string' ? payload.error : undefined
  }
}

function parseRunResult(payload: unknown): RunResult {
  if (!isRecord(payload) || payload.success !== true || !isRecord(payload.data)) {
    throw new Error('Unexpected response from /api/v1/run.')
  }

  const data = payload.data

  if (typeof data.id !== 'string' || typeof data.response !== 'string') {
    throw new Error('Unexpected response from /api/v1/run.')
  }

  return {
    id: data.id,
    response: data.response
  }
}

function isLocalBackend(backend: string | null): boolean {
  if (!backend) {
    return false
  }

  try {
    const url = new URL(backend)
    return url.hostname === 'localhost' || url.hostname === '127.0.0.1'
  } catch {
    return false
  }
}

function getRuntimePresentation(runtime: RuntimeState): { tone: 'success' | 'pending' | 'error'; label: string; message: string } {
  if (runtime.status === 'checking') {
    return {
      tone: 'pending',
      label: 'Checking runtime...',
      message: 'Confirming which safe response path is available.'
    }
  }

  if (runtime.status === 'ok' && runtime.mode === 'external') {
    return {
      tone: 'success',
      label: 'External runtime ready',
      message: 'The configured service is available for controlled demo responses.'
    }
  }

  if (runtime.status === 'ok') {
    return {
      tone: 'success',
      label: 'Local runtime ready',
      message: 'The local service is available. Responses remain limited to the public demo flow.'
    }
  }

  if (runtime.mode === 'missing') {
    return {
      tone: 'error',
      label: 'Safe fallback active',
      message:
        runtime.error ??
        'The external runtime is not configured. The demo remains available through a safe Next.js fallback.'
    }
  }

  if (runtime.mode === 'external') {
    if (isLocalBackend(runtime.backend)) {
      return {
        tone: 'error',
        label: 'Safe fallback active',
        message: runtime.error ?? 'The configured local runtime is unavailable. Requests use the safe fallback.'
      }
    }

    return {
      tone: 'error',
      label: 'Safe fallback active',
      message: runtime.error ?? 'The external runtime is unavailable. No autonomous action is executed.'
    }
  }

  return {
    tone: 'error',
    label: 'Safe fallback active',
    message:
      runtime.error ??
      'The local runtime is unavailable. The safe fallback can respond without executing autonomous actions.'
  }
}

const INITIAL_RUNTIME: RuntimeState = {
  status: 'checking',
  configured: false,
  service: 'api-server',
  mode: 'local',
  backend: null
}

function appendConversationMessage(messages: ConversationMessage[], message: ConversationMessage): ConversationMessage[] {
  return [...messages, message].slice(-MAX_CONVERSATION_MESSAGES)
}

function buildConversationContext(messages: ConversationMessage[]): string | undefined {
  const context = messages
    .slice(-MAX_CONTEXT_MESSAGES)
    .map((message) => `${message.role === 'user' ? 'User' : 'Assistant'}: ${message.content}`)
    .join('\n')
    .trim()

  if (!context) {
    return undefined
  }

  return context.slice(-MAX_CONTEXT_CHARS)
}

export default function DemoPage() {
  const [input, setInput] = useState('')
  const [selectedAgentId, setSelectedAgentId] = useState<(typeof agentOptions)[number]['id']>('tutor-agent')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [runtime, setRuntime] = useState<RuntimeState>(INITIAL_RUNTIME)
  const [conversation, setConversation] = useState<ConversationMessage[]>([])
  const [typing, setTyping] = useState(false)
  const typingTimerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  function cancelTyping(updateState = true): void {
    if (typingTimerRef.current) {
      clearInterval(typingTimerRef.current)
      typingTimerRef.current = null
    }

    if (updateState) {
      setTyping(false)
    }
  }

  async function refreshRuntime(): Promise<void> {
    setRuntime((current) => ({ ...current, status: 'checking', error: undefined }))

    try {
      setRuntime(await requestRuntimeState())
    } catch (currentError) {
      setRuntime({
        status: 'error',
        configured: false,
        service: 'api-server',
        mode: 'missing',
        backend: null,
        error: getErrorMessage(currentError)
      })
    }
  }

  useEffect(() => {
    void refreshRuntime()

    return () => {
      cancelTyping(false)
    }
  }, [])

  function revealAssistantMessage(message: ConversationMessage, fullText: string): void {
    cancelTyping()
    setTyping(true)

    let visibleCharacters = 0
    setConversation((messages) => appendConversationMessage(messages, { ...message, content: '' }))

    typingTimerRef.current = setInterval(() => {
      visibleCharacters = Math.min(visibleCharacters + TYPING_CHUNK_SIZE, fullText.length)
      const nextContent = fullText.slice(0, visibleCharacters)

      setConversation((messages) =>
        messages.map((currentMessage) =>
          currentMessage.id === message.id ? { ...currentMessage, content: nextContent } : currentMessage
        )
      )

      if (visibleCharacters >= fullText.length) {
        cancelTyping()
      }
    }, TYPING_INTERVAL_MS)
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault()
    cancelTyping()

    const trimmedInput = input.trim()

    if (trimmedInput.length < 5) {
      setError('Please enter at least 5 characters before sending the demo request.')
      return
    }

    setLoading(true)
    setError(null)
    const userMessage: ConversationMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: trimmedInput,
      agentId: selectedAgentId,
      createdAt: new Date().toISOString()
    }
    setConversation((messages) => appendConversationMessage(messages, userMessage))
    const context = buildConversationContext(conversation)

    try {
      const payload = await requestJson<unknown>('/api/v1/run', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          input: trimmedInput,
          agentId: selectedAgentId,
          ...(context ? { context } : {})
        })
      })

      const parsedResult = parseRunResult(payload)
      const assistantMessage: ConversationMessage = {
        id: parsedResult.id,
        role: 'assistant',
        content: '',
        agentId: selectedAgentId,
        createdAt: new Date().toISOString()
      }
      revealAssistantMessage(assistantMessage, parsedResult.response)
    } catch (currentError) {
      setError(getErrorMessage(currentError))
    } finally {
      setLoading(false)
    }
  }

  const runtimePresentation = getRuntimePresentation(runtime)
  const isSubmitDisabled = loading || typing
  const selectedAgent = agentOptions.find((agent) => agent.id === selectedAgentId) ?? agentOptions[0]

  return (
    <main className="page-shell">
      <section className="hero">
        <div className="hero-copy hero-copy--stacked">
          <span className="hero-badge">Humanity Guide OS · Public Experience</span>
          <h1>Try a responsible conversational product.</h1>
          <p>
            Explore guided conversations, specialist perspectives, safe fallbacks, and visible boundaries in a
            public demo built for humans—not autonomous execution.
          </p>

          <div className="tag-row">
            {['Human-Centered AI', 'Specialist roles', 'Safe fallback', 'Proposal-only', 'Runtime status'].map((item) => (
              <span className="tech-pill" key={item}>
                {item}
              </span>
            ))}
          </div>

          <div className="hero-actions">
            <a className="primary-button" href="#try-demo">
              Try the product
            </a>
            <a className="secondary-button" href="#agents">
              Choose an agent
            </a>
            <a className="tech-pill" href="#capabilities-heading">
              View current scope
            </a>
          </div>
        </div>
        <aside className="hero-card hero-card--spotlight">
          <p className="result-eyebrow">Runtime status</p>
          <span className={`status-pill status-pill--${runtimePresentation.tone}`}>{runtimePresentation.label}</span>
          <h2>Public demo service</h2>
          <p className="meta-text">{runtimePresentation.message}</p>

          <div className="response-meta">
            <span className="info-chip">Mode {runtime.mode}</span>
            <span className="info-chip">{runtime.configured ? 'Configured' : 'Fallback available'}</span>
          </div>

          <button className="secondary-button" onClick={() => void refreshRuntime()} type="button">
            Refresh status
          </button>
        </aside>
      </section>

      <section className="section-block" id="agents" aria-labelledby="agents-heading">
        <div className="section-head">
          <p className="result-eyebrow">Multi-agent demo</p>
          <h2 className="section-title" id="agents-heading">What you can test</h2>
          <p>Choose a focused perspective, then bring it a real question.</p>
        </div>

        <div className="showcase-grid">
          {agentOptions.map((agent) => (
            <article className="showcase-card" key={agent.id}>
              <h3>{agent.label}</h3>
              <p>{agent.description}</p>
              <button
                className={selectedAgentId === agent.id ? 'primary-button' : 'secondary-button'}
                onClick={() => setSelectedAgentId(agent.id)}
                type="button"
              >
                {selectedAgentId === agent.id ? 'Selected' : `Try ${agent.label}`}
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="workspace" id="try-demo">
        <form className="panel" onSubmit={handleSubmit}>
          <div className="panel-heading">
            <p className="result-eyebrow">Try the product</p>
            <h2>Ask {selectedAgent.label}</h2>
            <p>{selectedAgent.description}</p>
          </div>

          <label className="field-label" htmlFor="agent-select">
            Agent
          </label>
          <select
            className="select-input"
            id="agent-select"
            onChange={(event) => setSelectedAgentId(event.target.value as typeof selectedAgentId)}
            value={selectedAgentId}
          >
            {agentOptions.map((agent) => (
              <option key={agent.id} value={agent.id}>
                {agent.label}
              </option>
            ))}
          </select>

          <label className="field-label" htmlFor="demo-input">
            Your message
          </label>
          <textarea
            id="demo-input"
            className="prompt-input"
            onChange={(event) => setInput(event.target.value)}
            placeholder={`Ask ${selectedAgent.label} about a real learning or technical challenge...`}
            value={input}
          />

          {error ? <p className="error-line">{error}</p> : null}

          <div className="actions">
            <button className="primary-button" disabled={isSubmitDisabled} type="submit">
              {loading ? 'Sending...' : `Ask ${selectedAgent.label}`}
            </button>
            <span className="meta-text">Controlled response · No external action</span>
          </div>
        </form>

        <aside className="panel">
          <div className="panel-heading">
            <p className="result-eyebrow">Live result</p>
            <h2>Conversation</h2>
            <p>Current-session history only. No database or persistent memory.</p>
          </div>

          {loading && !typing ? (
            <section className="result-state">
              <p className="result-eyebrow">Thinking</p>
              <h3>Preparing a controlled response</h3>
            </section>
          ) : conversation.length > 0 ? (
            <>
              {conversation.map((message) => (
                <section className="result-state" key={message.id}>
                  <p className="result-eyebrow">{message.role === 'user' ? 'You' : 'Assistant'}</p>
                  <h3>{message.content}</h3>
                  <div className="response-meta">
                    <span className="info-chip">{message.agentId}</span>
                    <span className="info-chip">{new Date(message.createdAt).toLocaleTimeString()}</span>
                  </div>
                </section>
              ))}
              <div className="actions">
                <button
                  className="secondary-button"
                  onClick={() => {
                    cancelTyping()
                    setConversation([])
                  }}
                  type="button"
                >
                  Clear conversation
                </button>
                <span className="meta-text">
                  {typing ? 'Writing response...' : `Up to ${MAX_CONVERSATION_MESSAGES} local session messages`}
                </span>
              </div>
            </>
          ) : (
            <section className="result-state">
              <p className="result-eyebrow">Ready</p>
              <h3>Your conversation will appear here</h3>
              <p>Choose an agent and send a question to begin.</p>
            </section>
          )}
        </aside>
      </section>

      <section className="section-block" aria-labelledby="capabilities-heading">
        <div className="section-head">
          <p className="result-eyebrow">Available now</p>
          <h2 className="section-title" id="capabilities-heading">Current capabilities</h2>
        </div>

        <div className="signal-grid">
          {currentCapabilities.map((item) => (
            <article className="signal-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="governance-contract" aria-labelledby="safety-heading">
        <div className="governance-contract__intro">
          <p className="result-eyebrow">Safety boundaries</p>
          <h2 id="safety-heading">A conversation, not an autonomous system</h2>
          <p>The demo can explain and propose. Human approval remains mandatory for every real action.</p>
        </div>

        <div className="tag-row">
          {safetyBoundaries.map((item) => (
            <span className="tech-pill" key={item}>
              {item}
            </span>
          ))}
        </div>
      </section>
    </main>
  )
}
