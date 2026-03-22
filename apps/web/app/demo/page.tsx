'use client'

import { FormEvent, useEffect, useState } from 'react'

type HealthState = {
  status: 'connecting' | 'ok' | 'error'
  service: string
  error?: string
}

type RunResult = {
  id: string
  response: string
}

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
    throw new Error('La réponse du serveur n’est pas un JSON valide')
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

    throw new Error(`La requête a échoué avec le statut ${response.status}`)
  }

  return payload as T
}

export default function DemoPage() {
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [health, setHealth] = useState<HealthState>({
    status: 'connecting',
    service: 'unv-hmnd-api'
  })
  const [result, setResult] = useState<RunResult | null>(null)

  async function refreshHealth(): Promise<void> {
    setHealth((current) => ({ ...current, status: 'connecting', error: undefined }))

    try {
      const payload = await requestJson<unknown>('/api/health')

      if (!isRecord(payload) || typeof payload.status !== 'string') {
        throw new Error('Health check invalide')
      }

      setHealth({
        status: payload.status === 'ok' ? 'ok' : 'error',
        service: typeof payload.service === 'string' ? payload.service : 'unv-hmnd-api',
        error: typeof payload.error === 'string' ? payload.error : undefined
      })
    } catch (currentError) {
      setHealth({
        status: 'error',
        service: 'unv-hmnd-api',
        error: getErrorMessage(currentError)
      })
    }
  }

  useEffect(() => {
    void refreshHealth()
  }, [])

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault()

    const trimmedInput = input.trim()

    if (!trimmedInput) {
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
        body: JSON.stringify({ input: trimmedInput })
      })

      if (!isRecord(payload) || payload.success !== true || !isRecord(payload.data)) {
        throw new Error('Réponse inattendue du backend')
      }

      const data = payload.data

      if (typeof data.id !== 'string' || typeof data.response !== 'string') {
        throw new Error('Réponse inattendue du backend')
      }

      setResult({
        id: data.id,
        response: data.response
      })

      await refreshHealth()
    } catch (currentError) {
      setError(getErrorMessage(currentError))
    } finally {
      setLoading(false)
    }
  }

  const statusTone = health.status === 'ok' ? 'success' : health.status === 'connecting' ? 'pending' : 'error'
  const statusLabel = health.status === 'ok' ? 'Connecté' : health.status === 'connecting' ? 'Connexion...' : 'Erreur'

  return (
    <main className="page-shell">
      <section className="hero">
        <div className="hero-copy">
          <span className={`status-pill status-pill--${statusTone}`}>{statusLabel}</span>
          <h1>Démo Next.js</h1>
          <p>Cette page passe exclusivement par Next.js sur `3001`, puis appelle le backend Node via l’API interne.</p>
        </div>

        <aside className="hero-card">
          <p className="result-eyebrow">Service</p>
          <h2>{health.service}</h2>
          <p className="meta-text">{health.error ?? 'Le backend est accessible via la route interne de Next.'}</p>
          <button className="secondary-button" onClick={() => void refreshHealth()} type="button">
            Revalider
          </button>
        </aside>
      </section>

      <section className="workspace">
        <form className="panel" onSubmit={handleSubmit}>
          <div className="panel-heading">
            <h2>Requête vers /api/v1/run</h2>
            <p>Le client n’utilise pas `localhost:3000` directement.</p>
          </div>

          <label className="field-label" htmlFor="agent-input">
            Message
          </label>
          <textarea
            id="agent-input"
            className="prompt-input"
            onChange={(event) => setInput(event.target.value)}
            placeholder="Décrivez le cas que vous souhaitez envoyer au système..."
            value={input}
          />

          {error ? <p className="error-line">Erreur réelle: {error}</p> : null}

          <div className="actions">
            <button className="primary-button" disabled={loading} type="submit">
              {loading ? 'Traitement...' : 'Exécuter'}
            </button>
            <span className="meta-text">Client → /api/v1/run</span>
          </div>
        </form>

        <aside className="panel">
          <div className="panel-heading">
            <h2>Réponse</h2>
            <p>Validation fonctionnelle du flux Browser → Next → API.</p>
          </div>

          {loading ? (
            <section className="result-state">
              <p className="result-eyebrow">Traitement</p>
              <h3>Le système travaille</h3>
              <p>La requête est en cours d’envoi via l’API interne de Next.</p>
            </section>
          ) : result ? (
            <section className="result-state">
              <p className="result-eyebrow">Réponse générée</p>
              <h3>{result.response}</h3>
              <div className="response-meta">
                <span className="info-chip">ID {result.id}</span>
              </div>
            </section>
          ) : (
            <section className="result-state">
              <p className="result-eyebrow">En attente</p>
              <h3>La réponse apparaîtra ici</h3>
              <p>Soumettez un message pour valider la connexion avec le backend Node.</p>
            </section>
          )}
        </aside>
      </section>
    </main>
  )
}
