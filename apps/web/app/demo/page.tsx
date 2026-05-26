'use client'

import { FormEvent, useEffect, useState } from 'react'

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
  { id: 'tutor', label: 'Tutor' },
  { id: 'mentor', label: 'Mentor' },
  { id: 'architect', label: 'Architect' },
  { id: 'course-generator', label: 'Course generator' },
  { id: 'cuba-education-assistant', label: 'Cuba education assistant' }
] as const

const flowHighlights = [
  {
    title: 'Requête du navigateur',
    description: 'L’utilisateur envoie un message depuis un composant client avec validation d’entrée et gestion asynchrone des états.'
  },
  {
    title: 'Route interne Next.js',
    description: 'Le formulaire publie vers `/api/v1/run`, gardant le navigateur isolé des URLs backend et des détails de déploiement.'
  },
  {
    title: 'Réponse API Node',
    description: 'La requête est relayée vers la couche Node et la réponse finale est rendue dans l’interface.'
  }
]

const proofPoints = ['Gestion typée des requêtes', 'Visibilité de l’état runtime', 'Messages de fallback sûrs en production']

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : 'Erreur inconnue'
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

function getRuntimePresentation(runtime: RuntimeState): { tone: 'success' | 'pending' | 'error'; label: string; message: string } {
  if (runtime.status === 'checking') {
    return {
      tone: 'pending',
      label: 'Vérification du backend...',
      message: 'Validation de la connexion à l’API Node avant de lancer la démo.'
    }
  }

  if (runtime.status === 'ok' && runtime.mode === 'external') {
    return {
      tone: 'success',
      label: 'Backend externe prêt',
      message: 'Utilisation d’une API Node externe configurée.'
    }
  }

  if (runtime.status === 'ok') {
    return {
      tone: 'success',
      label: 'Backend local prêt',
      message: `Utilisation de l’API Node locale sur ${runtime.backend}. Exécutez npm run dev à la racine du repository.`
    }
  }

  return {
    tone: 'error',
    label: 'Action backend requise',
    message: runtime.error ?? 'Définissez UNV_API_BASE_URL dans Vercel pour connecter la démo à un backend Node externe.'
  }
}

const INITIAL_RUNTIME: RuntimeState = {
  status: 'checking',
  configured: false,
  service: 'api-server',
  mode: 'local',
  backend: null
}

export default function DemoPage() {
  const [input, setInput] = useState('')
  const [selectedAgentId, setSelectedAgentId] = useState<(typeof agentOptions)[number]['id']>('tutor')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [runtime, setRuntime] = useState<RuntimeState>(INITIAL_RUNTIME)
  const [result, setResult] = useState<RunResult | null>(null)

  async function refreshRuntime(): Promise<void> {
    setRuntime((current) => ({ ...current, status: 'checking', error: undefined }))

    try {
      const payload = await requestJson<unknown>('/api/health')
      setRuntime(parseRuntimeState(payload))
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
  }, [])

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault()

    const trimmedInput = input.trim()

    if (trimmedInput.length < 5) {
      setError('Please enter at least 5 characters before sending the demo request.')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const payload = await requestJson<unknown>('/api/v1/run', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          input: trimmedInput,
          agentId: selectedAgentId
        })
      })

      setResult(parseRunResult(payload))
    } catch (currentError) {
      setResult(null)
      setError(getErrorMessage(currentError))
    } finally {
      setLoading(false)
    }
  }

  const runtimePresentation = getRuntimePresentation(runtime)
  const isSubmitDisabled = loading

  return (
    <main className="page-shell">
      <section className="hero">
        <div className="hero-copy hero-copy--stacked">
          <span className={`status-pill status-pill--${runtimePresentation.tone}`}>{runtimePresentation.label}</span>
          <h1>Démo interactive du système</h1>
          <p>
            Un recruteur peut utiliser cette page pour valider le flux exact du produit : envoi de message,
            routage interne, exécution backend et rendu de la réponse dans l’UI.
          </p>

          <div className="tag-row">
            {proofPoints.map((item) => (
              <span className="tech-pill" key={item}>
                {item}
              </span>
            ))}
          </div>

          <div className="timeline-grid">
            {flowHighlights.map((item, index) => (
              <article className="timeline-card" key={item.title}>
                <span className="step-index">{String(index + 1).padStart(2, '0')}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>

          <div className="code-explanation">
            <h3>Comment fonctionne le système ?</h3>
            <div className="code-blocks">
              <div className="code-block">
                <h4>1. Validation Frontend</h4>
                <pre><code>{`// Validation de l’entrée avant envoi
if (input.length < 5) {
  setError('Au moins 5 caractères requis');
  return;
}`}</code></pre>
              </div>

              <div className="code-block">
                <h4>2. Requête vers API interne</h4>
                <pre><code>{`// Next.js gère la route /api/v1/run
POST /api/v1/run
{
  "input": "message de l’utilisateur"
}`}</code></pre>
              </div>

              <div className="code-block">
                <h4>3. Traitement Backend</h4>
                <pre><code>{`// API Node.js traite la requête
const result = await aiProvider.generate({
  feature: 'assistant',
  prompt: input
});`}</code></pre>
              </div>

              <div className="code-block">
                <h4>4. Réponse typée</h4>
                <pre><code>{`// Réponse structurée
{
  "success": true,
  "data": {
    "id": "interaction-123",
    "response": "Réponse IA..."
  }
}`}</code></pre>
              </div>
            </div>

            <p className="code-summary">
              <strong>Architecture clé :</strong> Séparation claire entre UI (React), routes API (Next.js) et services backend (Node.js).
              Chaque couche a des responsabilités bien définies avec validation typée en TypeScript.
            </p>
          </div>
        </div>
        <aside className="hero-card hero-card--spotlight">
          <p className="result-eyebrow">État du backend</p>
          <h2>{runtime.service}</h2>
          <p className="meta-text">{runtimePresentation.message}</p>

          <div className="response-meta">
            <span className="info-chip">Mode {runtime.mode}</span>
            <span className="info-chip">{runtime.configured ? 'Environnement configuré' : 'Par défaut ou environnement manquant'}</span>
          </div>

          <button className="secondary-button" onClick={() => void refreshRuntime()} type="button">
            Actualiser le backend
          </button>
        </aside>
      </section>

      <section className="workspace">
        <form className="panel" onSubmit={handleSubmit}>
          <div className="panel-heading">
            <p className="result-eyebrow">Requête</p>
            <h2>Envoyer un message</h2>
            <p>Utilisez le formulaire pour vérifier le flux Browser → Next.js → API Node avec une réponse réelle.</p>
          </div>

          <label className="field-label" htmlFor="demo-input">
            Message
          </label>
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

          <textarea
            id="demo-input"
            className="prompt-input"
            onChange={(event) => setInput(event.target.value)}
            placeholder="Décrivez ce que vous souhaitez que le backend de démo traite..."
            value={input}
          />

          {error ? <p className="error-line">{error}</p> : null}

          <div className="actions">
            <button className="primary-button" disabled={isSubmitDisabled} type="submit">
              {loading ? 'Envoi...' : 'Exécuter la démo'}
            </button>
            <span className="meta-text">Client → /api/v1/run → API Node</span>
          </div>
        </form>

        <aside className="panel">
          <div className="panel-heading">
            <p className="result-eyebrow">Sortie</p>
            <h2>Réponse</h2>
            <p>Sortie du serveur rendue directement depuis la réponse de la route interne.</p>
          </div>

          {loading ? (
            <section className="result-state">
              <p className="result-eyebrow">Traitement</p>
              <h3>En attente du backend</h3>
              <p>La requête passe par Next.js vers l’API Node.</p>
            </section>
          ) : result ? (
            <section className="result-state">
              <p className="result-eyebrow">Réponse reçue</p>
              <h3>{result.response}</h3>
              <div className="response-meta">
                <span className="info-chip">Interaction {result.id}</span>
              </div>
            </section>
          ) : (
            <section className="result-state">
              <p className="result-eyebrow">En attente</p>
              <h3>Votre réponse apparaîtra ici</h3>
              <p>Commencez par envoyer un message via le formulaire de démo.</p>
            </section>
          )}
        </aside>
      </section>
    </main>
  )
}
