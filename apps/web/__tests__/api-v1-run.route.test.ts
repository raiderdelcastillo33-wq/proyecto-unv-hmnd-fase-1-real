/** @jest-environment node */

import { POST } from '@/app/api/v1/run/route'
import { forwardJson, getBackendRuntimeInfo, MISSING_BACKEND_URL_ERROR } from '@/lib/backend'

jest.mock('@/lib/backend', () => ({
  forwardJson: jest.fn(),
  getBackendRuntimeInfo: jest.fn(),
  MISSING_BACKEND_URL_ERROR: 'UNV_API_BASE_URL is not configured for production.'
}))

const mockedForwardJson = forwardJson as jest.MockedFunction<typeof forwardJson>
const mockedGetBackendRuntimeInfo = getBackendRuntimeInfo as jest.MockedFunction<typeof getBackendRuntimeInfo>

function createJsonRequest(body: string): Request {
  return new Request('http://localhost/api/v1/run', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body
  })
}

describe('POST /api/v1/run', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockedGetBackendRuntimeInfo.mockReturnValue({
      configured: false,
      mode: 'local',
      baseUrl: 'http://127.0.0.1:3000',
      service: 'api-server'
    })
  })

  it('returns the backend payload on the happy path', async () => {
    mockedForwardJson.mockResolvedValue({
      status: 200,
      payload: {
        success: true,
        data: {
          id: 'run-1',
          response: 'Mocked backend response'
        }
      }
    })

    const response = await POST(createJsonRequest(JSON.stringify({ input: 'hello demo flow' })) as never)
    const payload = await response.json()

    expect(response.status).toBe(200)
    expect(payload).toEqual({
      success: true,
      data: {
        id: 'run-1',
        response: 'Mocked backend response'
      }
    })
    expect(mockedForwardJson).toHaveBeenCalledWith(
      '/api/v1/run',
      expect.objectContaining({
        method: 'POST'
      })
    )
  })

  it('forwards optional agentId when provided', async () => {
    mockedForwardJson.mockResolvedValue({
      status: 200,
      payload: {
        success: true,
        data: {
          id: 'run-agent',
          response: 'Agent response'
        }
      }
    })

    const response = await POST(
      createJsonRequest(
        JSON.stringify({
          input: 'hello agent flow',
          agentId: 'architect'
        })
      ) as never
    )

    expect(response.status).toBe(200)
    const forwardedInit = mockedForwardJson.mock.calls[0]?.[1] as RequestInit
    expect(JSON.parse(forwardedInit.body as string)).toEqual({
      input: 'hello agent flow',
      agentId: 'architect'
    })
  })

  it('keeps compatibility when agentId is not provided or is not a string', async () => {
    mockedForwardJson.mockResolvedValue({
      status: 200,
      payload: {
        success: true,
        data: {
          id: 'run-basic',
          response: 'Basic response'
        }
      }
    })

    const response = await POST(
      createJsonRequest(
        JSON.stringify({
          input: 'hello basic flow',
          agentId: 123
        })
      ) as never
    )

    expect(response.status).toBe(200)
    const forwardedInit = mockedForwardJson.mock.calls[0]?.[1] as RequestInit
    expect(JSON.parse(forwardedInit.body as string)).toEqual({
      input: 'hello basic flow'
    })
  })

  it('rejects invalid JSON bodies', async () => {
    const response = await POST(createJsonRequest('{') as never)
    const payload = await response.json()

    expect(response.status).toBe(400)
    expect(payload).toEqual({
      success: false,
      error: 'Invalid JSON body.'
    })
  })

  it('rejects empty or too-short input', async () => {
    const emptyResponse = await POST(createJsonRequest(JSON.stringify({ input: '   ' })) as never)
    const emptyPayload = await emptyResponse.json()

    expect(emptyResponse.status).toBe(400)
    expect(emptyPayload.error).toContain('Please enter a message')

    const shortResponse = await POST(createJsonRequest(JSON.stringify({ input: 'test' })) as never)
    const shortPayload = await shortResponse.json()

    expect(shortResponse.status).toBe(400)
    expect(shortPayload.error).toContain('at least 5 characters')
    expect(mockedForwardJson).not.toHaveBeenCalled()
  })

  it('maps backend domain failures into HTTP errors', async () => {
    mockedForwardJson.mockResolvedValue({
      status: 200,
      payload: {
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'prompt must have at least 5 characters'
        }
      }
    })

    const response = await POST(createJsonRequest(JSON.stringify({ input: 'hello demo flow' })) as never)
    const payload = await response.json()

    expect(response.status).toBe(400)
    expect(payload).toEqual({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'prompt must have at least 5 characters'
      }
    })
  })

  it('returns a safe demo fallback when production backend configuration is missing', async () => {
    mockedGetBackendRuntimeInfo.mockReturnValue({
      configured: false,
      mode: 'missing',
      baseUrl: null,
      service: 'backend-not-configured'
    })
    mockedForwardJson.mockRejectedValue(new Error(MISSING_BACKEND_URL_ERROR))

    const response = await POST(createJsonRequest(JSON.stringify({ input: 'hello demo flow' })) as never)
    const payload = await response.json()

    expect(response.status).toBe(200)
    expect(payload.success).toBe(true)
    expect(payload.data.id).toContain('demo-fallback-')
    expect(payload.data.response).toContain('Mode demo/fallback actif')
    expect(payload.data.response).toContain('aucun backend Node externe')
    expect(payload.meta).toEqual({
      mode: 'demo-fallback',
      reason: 'UNV_API_BASE_URL is not configured for an external Node API.',
      agentId: 'tutor'
    })
    expect(JSON.stringify(payload)).not.toContain('OPENAI_API_KEY')
  })

  it('preserves agentId in the safe demo fallback', async () => {
    mockedGetBackendRuntimeInfo.mockReturnValue({
      configured: false,
      mode: 'missing',
      baseUrl: null,
      service: 'backend-not-configured'
    })
    mockedForwardJson.mockRejectedValue(new Error(MISSING_BACKEND_URL_ERROR))

    const response = await POST(
      createJsonRequest(
        JSON.stringify({
          input: 'hello fallback agent flow',
          agentId: 'architect'
        })
      ) as never
    )
    const payload = await response.json()

    expect(response.status).toBe(200)
    expect(payload.success).toBe(true)
    expect(payload.data.response).toContain('agent architect')
    expect(payload.meta.agentId).toBe('architect')
  })
})
