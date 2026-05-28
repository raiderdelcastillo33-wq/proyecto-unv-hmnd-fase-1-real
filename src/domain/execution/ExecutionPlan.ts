export type ExecutionRiskLevel = 'low' | 'medium' | 'high' | 'critical'
export type ExecutionCategory = 'analysis' | 'organization' | 'email-preview' | 'file-preview' | 'manual-operation'
export type ExecutionPlanStatus =
  | 'planned'
  | 'review-required'
  | 'awaiting-approval'
  | 'approved-for-simulation'
  | 'simulation-complete'
  | 'blocked'
  | 'cancelled'

export type ExecutionBoundary = {
  simulationOnly: true
  actionExecuted: false
  executionBlockedByDefault: true
  manualExecutionOnly: true
  filesystemRuntime: false
  terminalExecution: false
  gmailIntegration: false
  browserAutomation: false
  autonomousExecution: false
  backgroundExecution: false
}

export type ExecutionStep = {
  id: string
  label: string
  description: string
  status: ExecutionPlanStatus
  category: ExecutionCategory
  riskLevel: ExecutionRiskLevel
  simulationOnly: true
  actionExecuted: false
}

export type ExecutionRollback = {
  id: string
  label: string
  preview: string
  rollbackReady: true
  requiresHumanVerification: true
  simulationOnly: true
  actionExecuted: false
}

export type ExecutionApprovalStage = {
  id: string
  actor: string
  responsibility: string
  required: true
  status: 'preview-only' | 'required' | 'blocked'
  simulationOnly: true
  actionExecuted: false
}

export type ExecutionSimulation = {
  id: string
  label: string
  status: 'preview-only'
  summary: string
  simulationOnly: true
  actionExecuted: false
}

export type ExecutionImpact = {
  id: string
  scope: string
  expectedOutcome: string
  riskLevel: ExecutionRiskLevel
  verificationRequired: true
  simulationOnly: true
  actionExecuted: false
}

export type ExecutionPlan = {
  id: string
  label: string
  status: ExecutionPlanStatus
  category: ExecutionCategory
  boundary: ExecutionBoundary
  steps: ExecutionStep[]
  rollbackPreviews: ExecutionRollback[]
  approvalChain: ExecutionApprovalStage[]
  simulation: ExecutionSimulation
  impactPreviews: ExecutionImpact[]
  manualRecommendations: string[]
  simulationOnly: true
  actionExecuted: false
}

export const CONTROLLED_EXECUTION_BOUNDARY: ExecutionBoundary = {
  simulationOnly: true,
  actionExecuted: false,
  executionBlockedByDefault: true,
  manualExecutionOnly: true,
  filesystemRuntime: false,
  terminalExecution: false,
  gmailIntegration: false,
  browserAutomation: false,
  autonomousExecution: false,
  backgroundExecution: false
}
