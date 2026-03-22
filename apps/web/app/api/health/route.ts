import { NextResponse } from 'next/server'
import { forwardJson } from '@/lib/backend'

export const dynamic = 'force-dynamic'

export async function GET() {
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

    return NextResponse.json({ status: 'ok', service }, { status })
  } catch (error) {
    return NextResponse.json(
      {
        status: 'error',
        error: error instanceof Error ? error.message : 'Impossible de consulter le backend'
      },
      { status: 503 }
    )
  }
}
