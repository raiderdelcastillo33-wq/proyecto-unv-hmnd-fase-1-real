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

const flowHighlights = [
  {
    title: 'Petición del browser',
    description: 'El usuario envía un mensaje desde un componente cliente con validación de input y manejo asíncrono de estados.'
  },
  {
    title: 'Ruta interna Next.js',
    description: 'El formulario publica a `/api/v1/run`, manteniendo el browser aislado de URLs de backend y detalles de despliegue.'
  },
  {
    title: 'Respuesta API Node',
    description: 'La petición es retransmitida a la capa Node y la respuesta final se renderiza de vuelta en la UI.'
  }
]

const proofPoints = ['Manejo tipado de peticiones', 'Visibilidad de estado de runtime', 'Mensajes fallback seguros para producción']

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
      label: 'Checking backend...',
      message: 'Validating the Node API connection before running the demo.'
    }
  }

  if (runtime.status === 'ok' && runtime.mode === 'external') {
    return {
      tone: 'success',
      label: 'External backend ready',
      message: 'Using a configured external Node API.'
    }
  }

  if (runtime.status === 'ok') {
    return {
      tone: 'success',
      label: 'Local backend ready',
      message: `Using local Node API at ${runtime.backend}. Run npm run dev from the repo root.`
    }
  }

  return {
    tone: 'error',
    label: 'Backend action required',
    message: runtime.error ?? 'Set UNV_API_BASE_URL in Vercel to connect the demo with the external Node API.'
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
        body: JSON.stringify({ input: trimmedInput })
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
  const isSubmitDisabled = loading || (runtime.status === 'error' && runtime.mode === 'missing')

  return (
    <main className="page-shell">
      <section className="hero">
        <div className="hero-copy hero-copy--stacked">
          <span className={`status-pill status-pill--${runtimePresentation.tone}`}>{runtimePresentation.label}</span>
          <h1>Demo Interactiva del Sistema</h1>
          <p>
            Un reclutador puede usar esta página para validar el flujo exacto del producto: envío de mensaje,
            enrutamiento interno, ejecución backend y renderizado de respuesta en la UI.
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
            <h3>¿Cómo funciona el sistema?</h3>
            <div className="code-blocks">
              <div className="code-block">
                <h4>1. Validación Frontend</h4>
                <pre><code>{`// Validación de input antes del envío
if (input.length < 5) {
  setError('Mínimo 5 caracteres requeridos');
  return;
}`}</code></pre>
              </div>

              <div className="code-block">
                <h4>2. Petición a API Interna</h4>
                <pre><code>{`// Next.js maneja la ruta /api/v1/run
POST /api/v1/run
{
  "input": "mensaje del usuario"
}`}</code></pre>
              </div>

              <div className="code-block">
                <h4>3. Procesamiento Backend</h4>
                <pre><code>{`// Node.js API procesa la solicitud
const result = await aiProvider.generate({
  feature: 'assistant',
  prompt: input
});`}</code></pre>
              </div>

              <div className="code-block">
                <h4>4. Respuesta Tipada</h4>
                <pre><code>{`// Respuesta estructurada
{
  "success": true,
  "data": {
    "id": "interaction-123",
    "response": "Respuesta de IA..."
  }
}`}</code></pre>
              </div>
            </div>

            <p className="code-summary">
              <strong>Arquitectura clave:</strong> Separación clara entre UI (React), rutas API (Next.js) y servicios backend (Node.js).
              Cada capa tiene responsabilidades bien definidas con validación tipada en TypeScript.
            </p>
          </div>
        </div>

        <aside className="hero-card hero-card--spotlight">
          <p className="result-eyebrow">Estado del backend</p>
          <h2>{runtime.service}</h2>
          <p className="meta-text">{runtimePresentation.message}</p>

          <div className="response-meta">
            <span className="info-chip">Modo {runtime.mode}</span>
            <span className="info-chip">{runtime.configured ? 'Entorno configurado' : 'Por defecto o entorno faltante'}</span>
          </div>

          <button className="secondary-button" onClick={() => void refreshRuntime()} type="button">
            Refrescar Backend
          </button>
        </aside>
      </section>

      <section className="workspace">
        <form className="panel" onSubmit={handleSubmit}>
          <div className="panel-heading">
            <p className="result-eyebrow">Petición</p>
            <h2>Enviar un mensaje</h2>
            <p>Usa el formulario para verificar el flujo Browser → Next.js → API Node con una respuesta real.</p>
          </div>

          <label className="field-label" htmlFor="demo-input">
            Mensaje
          </label>
          <textarea
            id="demo-input"
            className="prompt-input"
            onChange={(event) => setInput(event.target.value)}
            placeholder="Describe qué quieres que procese el backend de demo..."
            value={input}
          />

          {error ? <p className="error-line">{error}</p> : null}

          <div className="actions">
            <button className="primary-button" disabled={isSubmitDisabled} type="submit">
              {loading ? 'Enviando...' : 'Ejecutar Demo'}
            </button>
            <span className="meta-text">Cliente → /api/v1/run → API Node</span>
          </div>
        </form>

        <aside className="panel">
          <div className="panel-heading">
            <p className="result-eyebrow">Salida</p>
            <h2>Respuesta</h2>
            <p>Salida del servidor renderizada directamente desde la respuesta de la ruta interna.</p>
          </div>

          {loading ? (
            <section className="result-state">
              <p className="result-eyebrow">Procesando</p>
              <h3>Esperando al backend</h3>
              <p>La petición se está moviendo a través de Next.js y hacia la API Node.</p>
            </section>
          ) : result ? (
            <section className="result-state">
              <p className="result-eyebrow">Respuesta recibida</p>
              <h3>{result.response}</h3>
              <div className="response-meta">
                <span className="info-chip">Interacción {result.id}</span>
              </div>
            </section>
          ) : (
            <section className="result-state">
              <p className="result-eyebrow">Esperando</p>
              <h3>Tu respuesta aparecerá aquí</h3>
              <p>Comienza enviando un mensaje a través del formulario de demo.</p>
            </section>
          )}
        </aside>
      </section>
    </main>
  )
}
