import type { ActionRiskLevel, ApprovalDecision, Permission } from '../security/PermissionProfile'
import type { ToolRiskLevel } from '../tools/ToolProfile'

export type AuditEventType = 'tool-requested' | 'approval-evaluated' | 'tool-result-created' | 'tool-blocked'

export interface AuditEvent {
  id: string
  type: AuditEventType
  timestamp: string
  actionExecuted: false
  agentId?: string
  toolId?: string
  proposalId?: string
  permission?: Permission
  decision?: ApprovalDecision
  riskLevel?: ActionRiskLevel | ToolRiskLevel
  requiresHumanApproval?: boolean
  inputPreview?: string
  metadata?: Record<string, string | number | boolean>
}
