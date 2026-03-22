import { NextRequest, NextResponse } from 'next/server'
import { forwardJson, getBackendBaseUrl } from '@/lib/backend'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  let body: unknown

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Corps JSON invalide' }, { status: 400 })
  }

  try {
    const { status, payload } = await forwardJson('/api/v1/run', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })

    return NextResponse.json(payload ?? { error: 'Réponse vide du backend' }, { status })
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Impossible de contacter le backend',
        backend: getBackendBaseUrl()
      },
      { status: 502 }
    )
  }
}
