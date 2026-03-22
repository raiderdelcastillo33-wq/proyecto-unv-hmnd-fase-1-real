const DEFAULT_API_BASE_URL = 'http://127.0.0.1:3000'
const MISSING_BACKEND_URL_ERROR = 'UNV_API_BASE_URL is required in production'
const REQUEST_TIMEOUT_MS = 15_000

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
