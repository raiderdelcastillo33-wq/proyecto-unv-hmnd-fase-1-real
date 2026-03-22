const DEFAULT_API_BASE_URL = 'http://localhost:3000'
const MISSING_BACKEND_URL_ERROR = 'UNV_API_BASE_URL is required in production'
const REQUEST_TIMEOUT_MS = 15_000
const LOCAL_FALLBACK_SERVICE = 'unv-hmnd-local-fallback'
const LOCAL_FALLBACK_BASE_URLS = new Set(['http://localhost:3000', 'http://127.0.0.1:3000'])

function normalizeBaseUrl(value: string): string {
  return value.endsWith('/') ? value.slice(0, -1) : value
}

function getConfiguredBackendBaseUrl(): string | null {
  const configuredBaseUrl = process.env.UNV_API_BASE_URL?.trim()
  return configuredBaseUrl ? normalizeBaseUrl(configuredBaseUrl) : null
}

function requireBackendBaseUrl(): string {
  const configuredBaseUrl = getConfiguredBackendBaseUrl()

  if (configuredBaseUrl) {
    return configuredBaseUrl
  }

  if (process.env.NODE_ENV !== 'production') {
    return DEFAULT_API_BASE_URL
  }

  throw new Error(MISSING_BACKEND_URL_ERROR)
}

export function getBackendBaseUrl(): string {
  return getConfiguredBackendBaseUrl() || (process.env.NODE_ENV === 'production' ? 'UNV_API_BASE_URL is not configured' : DEFAULT_API_BASE_URL)
}

function getBackendUrl(path: string): string {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${requireBackendBaseUrl()}${normalizedPath}`
}

function shouldUseLocalFallback(): boolean {
  try {
    return LOCAL_FALLBACK_BASE_URLS.has(normalizeBaseUrl(requireBackendBaseUrl()))
  } catch {
    return false
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function parseJsonBody(body: BodyInit | null | undefined): unknown {
  if (typeof body !== 'string') {
    return {}
  }

  try {
    return JSON.parse(body)
  } catch {
    return {}
  }
}

function createLocalRunPayload(body: unknown): { status: number; payload: unknown } {
  const input = isRecord(body) && typeof body.input === 'string' ? body.input.trim() : ''

  if (!input) {
    return {
      status: 400,
      payload: {
        success: false,
        error: 'Input is required in local demo mode.'
      }
    }
  }

  return {
    status: 200,
    payload: {
      success: true,
      data: {
        id: `local-${Date.now()}`,
        response: `Local demo mode active. The app is running correctly on localhost:3000 and received: "${input}".`
      }
    }
  }
}

function getLocalFallbackPayload(path: string, init: RequestInit): { status: number; payload: unknown } | null {
  if (!shouldUseLocalFallback()) {
    return null
  }

  if (path === '/api/health') {
    return {
      status: 200,
      payload: {
        status: 'ok',
        service: LOCAL_FALLBACK_SERVICE
      }
    }
  }

  if (path === '/api/v1/run') {
    return createLocalRunPayload(parseJsonBody(init.body))
  }

  return null
}

async function readPayload(response: Response): Promise<unknown> {
  const text = await response.text()

  if (text.trim().length === 0) {
    return null
  }

  try {
    return JSON.parse(text)
  } catch {
    return { message: text }
  }
}

export async function forwardJson(path: string, init: RequestInit = {}): Promise<{ status: number; payload: unknown }> {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

  try {
    const fallbackPayload = getLocalFallbackPayload(path, init)

    if (fallbackPayload) {
      return fallbackPayload
    }

    const response = await fetch(getBackendUrl(path), {
      ...init,
      cache: 'no-store',
      signal: controller.signal,
      headers: {
        Accept: 'application/json',
        ...init.headers
      }
    })

    return {
      status: response.status,
      payload: await readPayload(response)
    }
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error(`Timeout contacting backend at ${getBackendBaseUrl()}`)
    }

    if (error instanceof Error && error.message === MISSING_BACKEND_URL_ERROR) {
      throw error
    }

    throw new Error(`Backend unavailable at ${getBackendBaseUrl()}`)
  } finally {
    clearTimeout(timeout)
  }
}
