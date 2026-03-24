import { NextRequest, NextResponse } from 'next/server'
import { forwardJson, getBackendRuntimeInfo, MISSING_BACKEND_URL_ERROR } from '@/lib/backend'

export const dynamic = 'force-dynamic'

type BackendFailurePayload = {
  success: false
  error: {
    code: string
    message: string
    details?: Record<string, string>
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function readInput(body: unknown): string | null {
  if (!isRecord(body) || typeof body.input !== 'string') {
    return null
  }

  const trimmedInput = body.input.trim()
  return trimmedInput.length > 0 ? trimmedInput : null
}

function isBackendFailurePayload(payload: unknown): payload is BackendFailurePayload {
  return (
    isRecord(payload) &&
    payload.success === false &&
    isRecord(payload.error) &&
    typeof payload.error.code === 'string' &&
    typeof payload.error.message === 'string'
  )
}

function getStatusFromBackendPayload(status: number, payload: unknown): number {
  if (status !== 200 || !isBackendFailurePayload(payload)) {
    return status
  }

  switch (payload.error.code) {
    case 'VALIDATION_ERROR':
      return 400
    case 'NOT_FOUND':
      return 404
    case 'CONFLICT':
      return 409
    case 'UNAUTHORIZED':
      return 401
    case 'FORBIDDEN':
      return 403
    case 'INFRASTRUCTURE_ERROR':
      return 503
    default:
      return 500
  }
}

export async function POST(request: NextRequest) {
  let body: unknown

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid JSON body.' }, { status: 400 })
  }

  const input = readInput(body)

  if (!input) {
    return NextResponse.json({ success: false, error: 'Please enter a message before sending the demo request.' }, { status: 400 })
  }

  if (input.length < 5) {
    return NextResponse.json({ success: false, error: 'Please enter at least 5 characters before sending the demo request.' }, { status: 400 })
  }

  const runtimeInfo = getBackendRuntimeInfo()

  try {
    const { status, payload } = await forwardJson('/api/v1/run', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ input })
    })

    return NextResponse.json(payload ?? { success: false, error: 'Empty backend response.' }, { status: getStatusFromBackendPayload(status, payload) })
  } catch (error) {
    const isMissingConfiguration = error instanceof Error && error.message === MISSING_BACKEND_URL_ERROR

    return NextResponse.json(
      {
        success: false,
        error: isMissingConfiguration
          ? 'UNV_API_BASE_URL is required in production to connect the demo with the Node API.'
          : error instanceof Error
            ? error.message
            : 'Backend request failed.',
        code: isMissingConfiguration ? 'BACKEND_URL_MISSING' : 'BACKEND_UNAVAILABLE',
        mode: runtimeInfo.mode
      },
      { status: isMissingConfiguration ? 503 : 502 }
    )
  }
}
