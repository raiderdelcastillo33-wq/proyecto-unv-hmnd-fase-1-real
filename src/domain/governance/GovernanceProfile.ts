import type { AgentRiskProfile } from '../agents/AgentProfile'
import type { ControlledAdapterBlueprint } from '../adapters/AdapterBlueprint'
import type { MemoryContextBlueprint } from '../context/ContextBlueprint'
import type { StrategicOrchestrationBlueprint } from '../orchestration/OrchestrationBlueprint'
import type { ApprovalDecision, Permission } from '../security/PermissionProfile'

export type AgentHierarchyLevel = 'central' | 'supervisor' | 'specialist' | 'utility' | 'observer'

export type GovernanceLevel = 'central-governance'

export type ApprovalAuthority = 'owner-final-authority' | 'proposal-governance-only'

export type GovernanceSource = 'genio-central' | 'agent-registry' | 'approval-gate' | 'tool-registry'

export interface AgentGovernanceMetadata {
  hierarchyLevel: AgentHierarchyLevel
  parentAuthority: string
  escalationRules: string[]
  approvalRequirements: string[]
}

export interface FutureCapabilityMetadata {
  id: string
  label: string
  status: 'metadata-only' | 'planned'
  safetyBoundary: string
  simulationOnly: true
}

export interface StrategicVisionMetadata {
  inspirationStyle: string[]
  personalityTraits: string[]
  reasoningPrinciples: string[]
  predictionBoundaries: string[]
  futureEngines: FutureCapabilityMetadata[]
}

export interface GovernanceMetadata {
  permissions: Permission[]
  approvalFlows: string[]
  riskClassification: AgentRiskProfile[]
  escalationLogic: string[]
  ownership: string
  safetyBoundaries: string[]
  futureAdapters: FutureCapabilityMetadata[]
  futureExecutionCapabilities: FutureCapabilityMetadata[]
}

export interface GenioCentralProfile {
  id: 'genio-central'
  label: 'GENIO Central'
  role: string
  capabilities: string[]
  governanceLevel: GovernanceLevel
  approvalAuthority: ApprovalAuthority
  orchestrationPriority: number
  riskAwareness: 'maximum'
  hierarchyLevel: 'central'
  systemDescription: string
  systemGoals: string[]
  futureCapabilities: FutureCapabilityMetadata[]
  strategicVision: StrategicVisionMetadata
  memoryContextBlueprint: MemoryContextBlueprint
  orchestrationBlueprint: StrategicOrchestrationBlueprint
  adapterBlueprint: ControlledAdapterBlueprint
  governanceMetadata: GovernanceMetadata
  lifeMapVision: FutureCapabilityMetadata[]
  financialStrategyVision: FutureCapabilityMetadata[]
  defaultApprovalDecision: ApprovalDecision
  simulationOnly: true
  actionExecuted: false
}
