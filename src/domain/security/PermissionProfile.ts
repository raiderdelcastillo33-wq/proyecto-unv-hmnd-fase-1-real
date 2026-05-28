export type Permission =
  | 'create-checklist'
  | 'summarize-context'
  | 'review-risk'
  | 'propose-command'
  | 'execute-command'
  | 'delete-file'
  | 'send-email'
  | 'read-secret'

export type ActionRiskLevel = 'low' | 'medium' | 'high' | 'critical'

export type ApprovalDecision = 'safe' | 'requires-approval' | 'forbidden'

export interface ActionProposal {
  id: string
  permission: Permission
  title: string
  summary: string
  requestedByAgentId?: string
  riskLevel: ActionRiskLevel
}

export interface ApprovalResult {
  proposalId: string
  permission: Permission
  decision: ApprovalDecision
  reason: string
  requiresHumanApproval: boolean
  actionExecuted: false
}
