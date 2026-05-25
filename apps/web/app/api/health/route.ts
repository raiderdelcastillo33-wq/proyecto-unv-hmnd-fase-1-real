import { NextResponse } from 'next/server'
import { forwardJson, getBackendRuntimeInfo } from '@/lib/backend'

const MISSING_BACKEND_HEALTH_ERROR =
  'UNV_API_BASE_URL is required in production to reach the external Node API.'

export async function GET(): Promise<NextResponse> {
  const runtime = getBackendRuntimeInfo()

  if (runtime.mode === 'missing') {
    return NextResponse.json({ error: MISSING_BACKEND_HEALTH_ERROR }, { status: 503 })
  }

  try {
    const { status } = await forwardJson('/health', { method: 'GET' })
    const backendAvailable = status < 500 || status === 404 || status === 405

    if (!backendAvailable) {
      return NextResponse.json(
        {
          status: 'error',
          configured: runtime.configured,
          service: runtime.service,
          mode: runtime.mode,
          backend: runtime.baseUrl,
          error: `Node API is reachable but returned status ${status}.`
        },
        { status: 502 }
      )
    }

    return NextResponse.json({
      status: 'ok',
      configured: runtime.configured,
      service: runtime.service,
      mode: runtime.mode,
      backend: runtime.baseUrl
    })
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Unable to reach the Node API from Next.js.'

    return NextResponse.json(
      {
        status: 'error',
        configured: runtime.configured,
        service: runtime.service,
        mode: runtime.mode,
        backend: runtime.baseUrl,
        error: message
      },
      { status: 502 }
    )
  }
}
