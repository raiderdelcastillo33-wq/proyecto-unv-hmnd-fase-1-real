import { NextRequest, NextResponse } from 'next/server'
import { InMemoryAuditLog } from '../../../../../../src/infrastructure/audit/InMemoryAuditLog'
import { LocalToolExecutor } from '../../../../../../src/infrastructure/tools/LocalToolExecutor'
import type { AuditEvent } from '../../../../../../src/domain/audit/AuditEvent'
import type { ToolRequest, ToolResult } from '../../../../../../src/domain/tools/ToolProfile'

const auditLog = new InMemoryAuditLog()

type LabToolResponse =
  | {
      success: true
      data: {
        result: ToolResult
        auditEvents: AuditEvent[]
      }
    }
  | {
      success: false
      error: string
    }

function createErrorResponse(error: string, status: number): NextResponse<LabToolResponse> {
  return NextResponse.json({ success: false, error }, { status })
}

function hasValidOwnerAccessCode(body: Record<string, unknown>): boolean {
  const configuredCode = process.env.OWNER_ACCESS_CODE

  return Boolean(configuredCode) && typeof body.ownerAccessCode === 'string' && body.ownerAccessCode === configuredCode
}

function normalizeToolRequest(body: Record<string, unknown>): ToolRequest {
  return {
    toolId: typeof body.toolId === 'string' ? (body.toolId as ToolRequest['toolId']) : ('review-risk' as ToolRequest['toolId']),
    input: typeof body.input === 'string' ? body.input : '',
    ...(typeof body.agentId === 'string' ? { agentId: body.agentId as ToolRequest['agentId'] } : {}),
    ...(typeof body.proposalId === 'string' ? { proposalId: body.proposalId } : {}),
    ...(typeof body.correlationId === 'string' ? { correlationId: body.correlationId } : {}),
    ...(typeof body.sessionId === 'string' ? { sessionId: body.sessionId } : {})
  }
}

export async function POST(request: NextRequest): Promise<NextResponse<LabToolResponse>> {
  let body: unknown

  try {
    body = await request.json()
  } catch {
    return createErrorResponse('Invalid JSON body.', 400)
  }

  if (typeof body !== 'object' || body === null || Array.isArray(body)) {
    return createErrorResponse('Private lab access denied.', 403)
  }

  const recordBody = body as Record<string, unknown>

  if (!hasValidOwnerAccessCode(recordBody)) {
    return createErrorResponse('Private lab access denied.', 403)
  }

  const executor = new LocalToolExecutor(auditLog)
  const result = await executor.execute(normalizeToolRequest(recordBody))

  return NextResponse.json({
    success: true,
    data: {
      result,
      auditEvents: auditLog.list()
    }
  })
}
