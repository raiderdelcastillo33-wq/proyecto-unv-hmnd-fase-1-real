import { NextResponse } from 'next/server'
import { forwardJson } from '@/lib/backend'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const { status } = await forwardJson('/api/health', {
      method: 'GET'
    })

    return NextResponse.json({ status: 'ok' }, { status })
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
