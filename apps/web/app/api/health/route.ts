import { NextResponse } from 'next/server'
import { forwardJson, getBackendRuntimeInfo, MISSING_BACKEND_URL_ERROR } from '@/lib/backend'

export const dynamic = 'force-dynamic'

export async function GET() {
  const runtimeInfo = getBackendRuntimeInfo()

  try {
    const { status, payload } = await forwardJson('/api/health', {
      method: 'GET'
    })

    const service =
      typeof payload === 'object' &&
      payload !== null &&
      'service' in payload &&
      typeof (payload as { service?: unknown }).service === 'string'
        ? (payload as { service: string }).service
        : 'unv-hmnd-api'

    return NextResponse.json(
      {
        status: 'ok',
        service,
        configured: runtimeInfo.configured,
        mode: runtimeInfo.mode,
        backend: runtimeInfo.mode === 'local' ? runtimeInfo.baseUrl : null
      },
      { status }
    )
  } catch (error) {
    const errorMessage =
      error instanceof Error && error.message === MISSING_BACKEND_URL_ERROR
        ? 'UNV_API_BASE_URL is required in production to reach the external Node API.'
        : error instanceof Error
          ? error.message
          : 'Backend health check failed.'

    return NextResponse.json(
      {
        status: 'error',
        service: runtimeInfo.service,
        configured: runtimeInfo.configured,
        mode: runtimeInfo.mode,
        backend: runtimeInfo.mode === 'local' ? runtimeInfo.baseUrl : null,
        error: errorMessage
      },
      { status: runtimeInfo.mode === 'missing' ? 503 : 502 }
    )
  }
}
