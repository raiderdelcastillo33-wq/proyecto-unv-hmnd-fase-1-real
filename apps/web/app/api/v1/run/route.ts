import { NextRequest, NextResponse } from 'next/server'

const DEFAULT_LOCAL_API_BASE_URL = 'http://localhost:3000'

function getApiBaseUrl(): string {
  const externalBaseUrl = process.env.UNV_API_BASE_URL?.trim()

  if (externalBaseUrl && externalBaseUrl.length > 0) {
    return externalBaseUrl.replace(/\/+$/, '')
  }

  return DEFAULT_LOCAL_API_BASE_URL
}

async function readBackendJson(response: Response): Promise<unknown> {
  const text = await response.text()

  if (text.trim().length === 0) {
    return null
  }

  try {
    return JSON.parse(text)
  } catch {
    throw new Error('The backend response is not valid JSON.')
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json()
    const apiBaseUrl = getApiBaseUrl()

    const backendResponse = await fetch(`${apiBaseUrl}/api/v1/run`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      cache: 'no-store',
      body: JSON.stringify(body)
    })

    const payload = await readBackendJson(backendResponse)

    if (!backendResponse.ok) {
      return NextResponse.json(
        payload ?? {
          success: false,
          error: {
            code: 'UPSTREAM_ERROR',
            message: `Node API responded with status ${backendResponse.status}.`
          }
        },
        { status: backendResponse.status }
      )
    }

    return NextResponse.json(payload, { status: backendResponse.status })
  } catch (error) {
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
