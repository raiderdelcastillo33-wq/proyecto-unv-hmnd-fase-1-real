import {
  AIResponse,
  ApiFailure,
  ApiResponse,
  AskAssistantPayload,
  CatalogResponse,
  HealthResponse,
  RegisterUserPayload,
  UserResponse
} from '../types'

function createFailure(code: string, message: string): ApiFailure {
  return {
    success: false,
    error: {
      code,
      message
    }
  }
}

async function requestJson<T>(url: string, options?: RequestInit): Promise<ApiResponse<T> | T> {
  const headers = new Headers(options?.headers)

  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }

  let response: Response

  try {
    response = await fetch(url, {
      ...options,
      headers
    })
  } catch (error) {
    return createFailure('NETWORK_ERROR', error instanceof Error ? error.message : 'Network request failed')
  }

  const contentType = response.headers.get('content-type') ?? ''
  const isJson = contentType.includes('application/json')

  const payload = isJson ? await response.json() : await response.text()

  if (!response.ok) {
    if (isFailure<T>(payload as ApiResponse<T> | T)) {
      return payload as ApiFailure
    }

    if (typeof payload === 'string' && payload.trim().length > 0) {
      return createFailure(`HTTP_${response.status}`, payload.trim())
    }

    return createFailure(`HTTP_${response.status}`, `Request failed with status ${response.status}`)
  }

  if (!isJson) {
    return createFailure('INVALID_RESPONSE', 'The server did not return JSON')
  }

  return payload as ApiResponse<T> | T
}

export function isFailure<T>(data: ApiResponse<T> | T): data is ApiFailure {
  return typeof data === 'object' && data !== null && 'success' in data && data.success === false
}

export const apiClient = {
  getHealth(): Promise<ApiResponse<HealthResponse> | HealthResponse> {
    return requestJson<HealthResponse>('/health')
  },

  registerUser(payload: RegisterUserPayload): Promise<ApiResponse<UserResponse>> {
    return requestJson<UserResponse>('/api/v1/users/register', {
      method: 'POST',
      body: JSON.stringify(payload)
    }) as Promise<ApiResponse<UserResponse>>
  },

  loadCatalog(): Promise<ApiResponse<CatalogResponse>> {
    return requestJson<CatalogResponse>('/api/v1/catalog/list', {
      method: 'GET'
    }) as Promise<ApiResponse<CatalogResponse>>
  },

  askAssistant(payload: AskAssistantPayload): Promise<ApiResponse<AIResponse>> {
    return requestJson<AIResponse>('/api/v1/ai/ask', {
      method: 'POST',
      body: JSON.stringify(payload)
    }) as Promise<ApiResponse<AIResponse>>
  }
}
