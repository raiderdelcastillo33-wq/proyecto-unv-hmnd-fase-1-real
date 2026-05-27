import type { ActionRiskLevel, ApprovalDecision, Permission } from '../security/PermissionProfile'
import type { ToolRiskLevel } from '../tools/ToolProfile'
import type { AgentHierarchyLevel, GovernanceSource } from '../governance/GovernanceProfile'

export type AuditEventType = 'tool-requested' | 'approval-evaluated' | 'tool-result-created' | 'tool-blocked'

export interface AuditEvent {
  id: string
  eventId?: string
  type: AuditEventType
  timestamp: string
  actionExecuted: false
  agentId?: string
  toolId?: string
  actionType?: string
  proposalId?: string
  permission?: Permission
  decision?: ApprovalDecision
  approvalStatus?: ApprovalDecision
  riskLevel?: ActionRiskLevel | ToolRiskLevel
  governanceSource?: GovernanceSource
  hierarchyLevel?: AgentHierarchyLevel
  approvalDecision?: ApprovalDecision
  blockedReason?: string
  requiresHumanApproval?: boolean
  inputPreview?: string
  summary?: string
  simulationOnly?: true
  metadata?: Record<string, string | number | boolean>
}
