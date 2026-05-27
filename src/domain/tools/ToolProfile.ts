import type { AgentId } from '../agents/AgentProfile'
import type { ApprovalResult } from '../security/PermissionProfile'

export type ToolId =
  | 'summarize-project-state'
  | 'propose-terminal-command'
  | 'explain-error-log'
  | 'generate-implementation-plan'
  | 'review-risk'
  | 'create-checklist'

export type ToolRiskLevel = 'low' | 'medium' | 'high'
export type ToolCategory = 'analysis' | 'planning' | 'review' | 'debugging' | 'operations'
export type ToolOutputType = 'summary' | 'plan' | 'risk-review' | 'checklist' | 'command-proposal' | 'debug-explanation'

export interface ToolProfile {
  id: ToolId
  name: string
  label?: string
  purpose: string
  description?: string
  category?: ToolCategory
  requiresHumanApproval: boolean
  requiresApproval?: boolean
  riskLevel: ToolRiskLevel
  forbiddenActions?: string[]
  outputType?: ToolOutputType
}

export interface ToolRequest {
  toolId: ToolId
  agentId?: AgentId
  input: string
  context?: string
  constraints?: string[]
}

export interface ToolResult {
  toolId: ToolId
  title: string
  summary: string
  sections: Array<{
    heading: string
    items: string[]
  }>
  requiresHumanApproval: boolean
  riskLevel: ToolRiskLevel
  approval?: ApprovalResult
  commands?: Array<{
    command: string
    purpose: string
    riskLevel: ToolRiskLevel
    requiresConfirmation: boolean
  }>
}
