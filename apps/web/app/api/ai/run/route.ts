import { NextRequest, NextResponse } from 'next/server'
import { getAiErrorDetails, getAiRuntimeInfo, runAiTask } from '@/services/ai'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET() {
  const runtimeInfo = getAiRuntimeInfo()

  return NextResponse.json({
    status: runtimeInfo.configured ? 'ok' : 'error',
    ...runtimeInfo
  })
}

export async function POST(request: NextRequest) {
  let body: unknown

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 })
  }

  try {
    const data = await runAiTask({
      task: typeof (body as { task?: unknown })?.task === 'string' ? ((body as { task: string }).task as 'summary' | 'translation' | 'ideas') : 'summary',
      text: typeof (body as { text?: unknown })?.text === 'string' ? (body as { text: string }).text : '',
      targetLanguage:
        typeof (body as { targetLanguage?: unknown })?.targetLanguage === 'string'
          ? ((body as { targetLanguage: string }).targetLanguage as 'es' | 'en' | 'fr')
          : undefined
    })

    return NextResponse.json({
      success: true,
      data
    })
  } catch (error) {
    const details = getAiErrorDetails(error)

    return NextResponse.json(
      {
        error: details.message,
        code: details.code
      },
      { status: details.status }
    )
  }
}
