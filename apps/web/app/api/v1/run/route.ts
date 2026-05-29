import { NextRequest, NextResponse } from 'next/server'
import { forwardJson, getBackendRuntimeInfo, MISSING_BACKEND_URL_ERROR } from '@/lib/backend'

const MAX_CONTEXT_CHARS = 2_000

function mapPayloadToHttpStatus(upstreamStatus: number, payload: unknown): number {
  if (typeof payload !== 'object' || payload === null || !('success' in payload)) {
    return upstreamStatus
  }

  const responsePayload = payload as {
    success?: unknown
    error?: { code?: unknown }
  }

  if (responsePayload.success === true) {
    return upstreamStatus
  }

  const errorCode = responsePayload.error?.code

  switch (errorCode) {
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
      return upstreamStatus >= 400 ? upstreamStatus : 500
  }
}

function normalizeContext(context: unknown): string | undefined {
  if (typeof context !== 'string') {
    return undefined
  }

  const trimmed = context.trim()

  return trimmed ? trimmed.slice(-MAX_CONTEXT_CHARS) : undefined
}

function validateRunBody(body: unknown): { ok: true; input: string; agentId?: string; context?: string } | { ok: false; error: string } {
  if (typeof body !== 'object' || body === null) {
    return { ok: false, error: 'Please enter a message before sending the demo request.' }
  }

  const input = (body as { input?: unknown }).input
  const agentId = (body as { agentId?: unknown }).agentId
  const context = normalizeContext((body as { context?: unknown }).context)

  if (typeof input !== 'string') {
    return { ok: false, error: 'Please enter a message before sending the demo request.' }
  }

  const trimmed = input.trim()

  if (!trimmed) {
    return { ok: false, error: 'Please enter a message before sending the demo request.' }
  }

  if (trimmed.length < 5) {
    return { ok: false, error: 'Please enter at least 5 characters before sending the demo request.' }
  }

  return {
    ok: true,
    input: trimmed,
    ...(typeof agentId === 'string' ? { agentId } : {}),
    ...(context ? { context } : {})
  }
}

function createDemoFallbackPayload(validation: { input: string; agentId?: string; context?: string }) {
  const agentLabel = validation.agentId ?? 'tutor'

  return {
    success: true,
    data: {
      id: `demo-fallback-${Date.now()}`,
      response: `Mode demo/fallback actif: aucun backend Node disponible pour cette instance de demo. Votre message a ete transforme en reponse de demonstration par la route Next.js locale avec l'agent ${agentLabel}. Aucune action externe n'a ete executee.`
    },
    meta: {
      mode: 'demo-fallback',
      reason: 'No reachable Node API is available for this demo route.',
      agentId: agentLabel,
      contextReceived: Boolean(validation.context)
    }
  }
}

function isLocalConfiguredBackend(baseUrl: string | null): boolean {
  if (!baseUrl) {
    return false
  }

  try {
    const url = new URL(baseUrl)
    return url.hostname === 'localhost' || url.hostname === '127.0.0.1'
  } catch {
    return false
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  let body: unknown

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid JSON body.' }, { status: 400 })
  }

  const validation = validateRunBody(body)

  if (!validation.ok) {
    return NextResponse.json({ success: false, error: validation.error }, { status: 400 })
  }

  try {
    const { status, payload } = await forwardJson('/api/v1/run', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        validation.agentId
          ? {
              input: validation.input,
              agentId: validation.agentId,
              ...(validation.context ? { context: validation.context } : {})
            }
          : {
              input: validation.input,
              ...(validation.context ? { context: validation.context } : {})
            }
      )
    })

    const responseStatus = mapPayloadToHttpStatus(status, payload)

    return NextResponse.json(payload, { status: responseStatus })
  } catch (error) {
    if (error instanceof Error && error.message === MISSING_BACKEND_URL_ERROR) {
      return NextResponse.json(createDemoFallbackPayload(validation), { status: 200 })
    }

    const runtime = getBackendRuntimeInfo()

    if ((!runtime.configured && runtime.mode === 'local') || isLocalConfiguredBackend(runtime.baseUrl)) {
      return NextResponse.json(createDemoFallbackPayload(validation), { status: 200 })
    }

    const message =
      error instanceof Error
        ? error.message
        : 'Unexpected error while forwarding the request to the Node API.'

    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'PROXY_ERROR',
          message
        }
      },
      { status: 500 }
    )
  }
}
