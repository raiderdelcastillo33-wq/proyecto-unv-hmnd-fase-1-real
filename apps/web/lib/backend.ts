const DEFAULT_LOCAL_API_BASE_URL = 'http://127.0.0.1:3000'
export const MISSING_BACKEND_URL_ERROR = 'UNV_API_BASE_URL is not configured for production.'
const REQUEST_TIMEOUT_MS = 15_000
const LOCAL_FALLBACK_SERVICE = 'unv-hmnd-local-fallback'
const LOCAL_FALLBACK_BASE_URLS = new Set(['http://localhost:3000', 'http://127.0.0.1:3000'])

export type BackendMode = 'local' | 'external' | 'missing'

export type BackendRuntimeInfo = {
  configured: boolean
  mode: BackendMode
  baseUrl: string | null
  service: string
}

function normalizeBaseUrl(value: string): string {
  return value.endsWith('/') ? value.slice(0, -1) : value
}

function isProductionEnvironment(): boolean {
  return process.env.VERCEL === '1' || process.env.NODE_ENV === 'production'
}

function getConfiguredBackendBaseUrl(): string | null {
  const configuredBaseUrl = process.env.UNV_API_BASE_URL?.trim()
  return configuredBaseUrl ? normalizeBaseUrl(configuredBaseUrl) : null
}

export function getBackendRuntimeInfo(): BackendRuntimeInfo {
  const configuredBaseUrl = getConfiguredBackendBaseUrl()

  if (configuredBaseUrl) {
    return {
      configured: true,
      mode: 'external',
      baseUrl: configuredBaseUrl,
      service: 'api-server'
    }
  }

  if (!isProductionEnvironment()) {
    return {
      configured: false,
      mode: 'local',
      baseUrl: DEFAULT_LOCAL_API_BASE_URL,
      service: 'api-server'
    }
  }

  return {
    configured: false,
    mode: 'missing',
    baseUrl: null,
    service: 'backend-not-configured'
  }
}

export function getBackendBaseUrl(): string {
  return getBackendRuntimeInfo().baseUrl ?? ''
}

function requireBackendBaseUrl(): string {
  const runtimeInfo = getBackendRuntimeInfo()

  if (!runtimeInfo.baseUrl) {
    throw new Error(MISSING_BACKEND_URL_ERROR)
  }

  return runtimeInfo.baseUrl
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
    if (error instanceof Error && error.message === MISSING_BACKEND_URL_ERROR) {
      throw error
    }

    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error(`Timeout contacting backend at ${getBackendBaseUrl() || 'unconfigured-backend'}`)
    }

    throw new Error(`Backend unavailable at ${getBackendBaseUrl() || 'unconfigured-backend'}`)
  } finally {
    clearTimeout(timeout)
  }
}
