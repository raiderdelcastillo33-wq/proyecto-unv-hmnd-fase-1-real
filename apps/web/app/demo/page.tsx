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
  return error instanceof Error ? error.message : 'Error desconocido'
}

async function readJson(response: Response): Promise<unknown> {
  const text = await response.text()

  if (text.trim().length === 0) {
    return null
  }

  try {
    return JSON.parse(text)
  } catch {
    throw new Error('La respuesta del servidor no es JSON válido')
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

    throw new Error(`La solicitud falló con estado ${response.status}`)
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
        throw new Error('Health check inválido')
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
        throw new Error('Respuesta inesperada del backend')
      }

      const data = payload.data

      if (typeof data.id !== 'string' || typeof data.response !== 'string') {
        throw new Error('Respuesta inesperada del backend')
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
  const statusLabel = health.status === 'ok' ? 'Conectado' : health.status === 'connecting' ? 'Conectando...' : 'Error'

  return (
    <main className="page-shell">
      <section className="hero">
        <div className="hero-copy">
          <span className={`status-pill status-pill--${statusTone}`}>{statusLabel}</span>
          <h1>Demo Next.js local</h1>
          <p>Esta vista usa la API interna de Next.js en `localhost:3000` y activa un fallback local si no hay backend externo.</p>
        </div>

        <aside className="hero-card">
          <p className="result-eyebrow">Servicio</p>
          <h2>{health.service}</h2>
          <p className="meta-text">{health.error ?? 'La API interna de Next.js está respondiendo correctamente.'}</p>
          <button className="secondary-button" onClick={() => void refreshHealth()} type="button">
            Revalidar
          </button>
        </aside>
      </section>

      <section className="workspace">
        <form className="panel" onSubmit={handleSubmit}>
          <div className="panel-heading">
            <h2>Llamada a /api/v1/run</h2>
            <p>El cliente usa la ruta interna de Next.js y mantiene el flujo local estable.</p>
          </div>

          <label className="field-label" htmlFor="agent-input">
            Mensaje
          </label>
          <textarea
            id="agent-input"
            className="prompt-input"
            onChange={(event) => setInput(event.target.value)}
            placeholder="Describe la solicitud que quieres ejecutar en el sistema..."
            value={input}
          />

          {error ? <p className="error-line">{error}</p> : null}

          <div className="actions">
            <button className="primary-button" disabled={loading} type="submit">
              {loading ? 'Procesando...' : 'Ejecutar'}
            </button>
            <span className="meta-text">Cliente {'>'} /api/v1/run</span>
          </div>
        </form>

        <aside className="panel">
          <div className="panel-heading">
            <h2>Respuesta</h2>
            <p>Validación funcional del flujo Browser {'>'} Next {'>'} API.</p>
          </div>

          {loading ? (
            <section className="result-state">
              <p className="result-eyebrow">Procesando</p>
              <h3>El sistema está trabajando</h3>
              <p>La solicitud se está enviando a través de la API interna de Next.js.</p>
            </section>
          ) : result ? (
            <section className="result-state">
              <p className="result-eyebrow">Respuesta generada</p>
              <h3>{result.response}</h3>
              <div className="response-meta">
                <span className="info-chip">ID {result.id}</span>
              </div>
            </section>
          ) : (
            <section className="result-state">
              <p className="result-eyebrow">En espera</p>
              <h3>La respuesta aparecerá aquí</h3>
              <p>Envía un mensaje para validar la conexión local con la API.</p>
            </section>
          )}
        </aside>
      </section>
    </main>
  )
}
