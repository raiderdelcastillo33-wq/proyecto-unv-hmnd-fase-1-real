import { NextResponse } from 'next/server'

const DEFAULT_LOCAL_API_BASE_URL = 'http://localhost:3000'

type RuntimeMode = 'local' | 'external' | 'missing'

function getApiBaseUrl(): string | null {
  const externalBaseUrl = process.env.UNV_API_BASE_URL?.trim()

  if (externalBaseUrl && externalBaseUrl.length > 0) {
    return externalBaseUrl.replace(/\/+$/, '')
  }

  return DEFAULT_LOCAL_API_BASE_URL
}

function getRuntimeMode(): RuntimeMode {
  const externalBaseUrl = process.env.UNV_API_BASE_URL?.trim()

  if (externalBaseUrl && externalBaseUrl.length > 0) {
    return 'external'
  }

  return 'local'
}

export async function GET(): Promise<NextResponse> {
  const backend = getApiBaseUrl()

  if (!backend) {
    return NextResponse.json(
      {
        status: 'error',
        configured: false,
        service: 'api-server',
        mode: 'missing',
        backend: null,
        error: 'UNV_API_BASE_URL is not configured.'
      },
      { status: 500 }
    )
  }

  try {
    const response = await fetch(`${backend}/health`, {
      method: 'OPTIONS',
      cache: 'no-store'
    })

    const backendAvailable =
      response.status < 500 || response.status === 404 || response.status === 405

    if (!backendAvailable) {
      return NextResponse.json(
        {
          status: 'error',
          configured: getRuntimeMode() === 'external',
          service: 'api-server',
          mode: getRuntimeMode(),
          backend,
          error: `Node API is reachable but returned status ${response.status}.`
        },
        { status: 502 }
      )
    }

    return NextResponse.json({
      status: 'ok',
      configured: getRuntimeMode() === 'external',
      service: 'api-server',
      mode: getRuntimeMode(),
      backend
    })
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : 'Unable to reach the Node API from Next.js.'

    return NextResponse.json(
      {
        status: 'error',
        configured: getRuntimeMode() === 'external',
        service: 'api-server',
        mode: getRuntimeMode(),
        backend,
        error: message
      },
      { status: 502 }
    )
  }
}