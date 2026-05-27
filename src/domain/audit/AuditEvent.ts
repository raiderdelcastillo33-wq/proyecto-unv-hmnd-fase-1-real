import type { ActionRiskLevel, ApprovalDecision, Permission } from '../security/PermissionProfile'
import type { OwnerApprovalStatus } from '../security/OwnerApproval'
import type { ToolRiskLevel } from '../tools/ToolProfile'
import type { AgentHierarchyLevel, GovernanceSource } from '../governance/GovernanceProfile'

export type AuditEventType =
  | 'tool-requested'
  | 'approval-evaluated'
  | 'tool-result-created'
  | 'tool-blocked'
  | 'approval-requested'
  | 'approval-approved'
  | 'approval-rejected'

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
  correlationId?: string
  sessionId?: string
  permission?: Permission
  decision?: ApprovalDecision
  approvalStatus?: ApprovalDecision | OwnerApprovalStatus
  riskLevel?: ActionRiskLevel | ToolRiskLevel
  governanceSource?: GovernanceSource
  hierarchyLevel?: AgentHierarchyLevel
  approvalDecision?: ApprovalDecision
  blockedReason?: string
  reviewedBy?: string
  reviewTimestamp?: string
  rejectionReason?: string
  requiresHumanApproval?: boolean
  inputPreview?: string
  summary?: string
  simulationOnly?: true
  metadata?: Record<string, string | number | boolean>
}
