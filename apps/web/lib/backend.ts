const DEFAULT_LOCAL_API_BASE_URL = 'http://127.0.0.1:3000'
export const MISSING_BACKEND_URL_ERROR = 'UNV_API_BASE_URL is not configured for production.'
const REQUEST_TIMEOUT_MS = 15_000

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
  return configuredBaseUrl ? getSafeBackendBaseUrl(configuredBaseUrl) : null
}

function isLocalBackendUrl(url: URL): boolean {
  return url.hostname === 'localhost' || url.hostname === '127.0.0.1'
}

function getSafeBackendBaseUrl(value: string): string | null {
  try {
    const url = new URL(value)

    if (url.protocol !== 'http:' && url.protocol !== 'https:') {
      return null
    }

    if (isProductionEnvironment() && url.protocol !== 'https:' && !isLocalBackendUrl(url)) {
      return null
    }

    return normalizeBaseUrl(url.toString())
  } catch {
    return null
  }
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
