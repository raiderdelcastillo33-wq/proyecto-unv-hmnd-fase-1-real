import { NextRequest, NextResponse } from 'next/server'
import { AgentRegistry } from '../../../../../../src/domain/agents/AgentRegistry'
import { ToolRegistry } from '../../../../../../src/domain/tools/ToolRegistry'

const PRIVATE_LAB_AGENT_IDS = new Set([
  'architect-agent',
  'coder-agent',
  'reviewer-agent',
  'debugger-agent',
  'tutor-agent',
  'operator-agent'
])

function createErrorResponse(error: string, status: number): NextResponse {
  return NextResponse.json({ success: false, error }, { status })
}

function hasValidOwnerAccessCode(body: Record<string, unknown>): boolean {
  const configuredCode = process.env.OWNER_ACCESS_CODE

  return Boolean(configuredCode) && typeof body.ownerAccessCode === 'string' && body.ownerAccessCode === configuredCode
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  let body: unknown

  try {
    body = await request.json()
  } catch {
    return createErrorResponse('Invalid JSON body.', 400)
  }

  if (typeof body !== 'object' || body === null || Array.isArray(body)) {
    return createErrorResponse('Private lab access denied.', 403)
  }

  if (!hasValidOwnerAccessCode(body as Record<string, unknown>)) {
    return createErrorResponse('Private lab access denied.', 403)
  }

  const agents = AgentRegistry.list()
    .filter((agent) => PRIVATE_LAB_AGENT_IDS.has(agent.id))
    .map((agent) => ({
      id: agent.id,
      label: agent.label ?? agent.name,
      description: agent.description ?? agent.purpose,
      category: agent.category,
      capabilities: agent.capabilities ?? [],
      riskProfile: agent.riskProfile ?? 'medium',
      allowedTools: agent.allowedTools ?? []
    }))

  const tools = ToolRegistry.list().map((tool) => ({
    id: tool.id,
    label: tool.label ?? tool.name,
    description: tool.description ?? tool.purpose,
    category: tool.category,
    riskLevel: tool.riskLevel,
    requiresApproval: tool.requiresApproval ?? tool.requiresHumanApproval,
    forbiddenActions: tool.forbiddenActions ?? [],
    outputType: tool.outputType
  }))

  return NextResponse.json({
    success: true,
    data: {
      agents,
      tools
    }
  })
}
