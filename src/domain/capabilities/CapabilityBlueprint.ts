export type CapabilityCategory =
  | 'analysis'
  | 'planning'
  | 'drafting'
  | 'documentation'
  | 'simulation'
  | 'filesystem-read-future'
  | 'filesystem-write-future'
  | 'terminal-read-future'
  | 'terminal-execution-future'
  | 'browser-future'
  | 'finance-simulation'
  | 'organization'
  | 'orchestration'
  | 'monitoring'
  | 'company-management'

export type CapabilityRiskLevel = 'low-risk' | 'medium-risk' | 'high-risk' | 'critical-risk'

export type CapabilityExecutionMode =
  | 'proposal-only'
  | 'simulation-only'
  | 'draft-only'
  | 'read-only-future'
  | 'blocked'
  | 'future-controlled-runtime'

export type CapabilityBoundary =
  | 'read-only'
  | 'draft-only'
  | 'simulation-only'
  | 'approval-required'
  | 'forbidden'
  | 'future-controlled-runtime'

export type CapabilityApprovalStatus = 'pending' | 'approved' | 'rejected' | 'blocked'

export interface CapabilityConstraint {
  id: string
  label: string
  boundary: CapabilityBoundary
  description: string
}

export interface CapabilityApprovalPolicy {
  required: boolean
  ownerFinalAuthority: true
  autoApprovalAllowed: false
  approvalChain: string[]
  blockedWithoutApproval: true
}

export interface CapabilitySimulation {
  simulationState: 'metadata-only' | 'simulated-route' | 'blocked-before-runtime'
  executionIntent: string
  executionBlockedReason: string
  simulationOnly: true
  actionExecuted: false
}

export interface CapabilityCheckpoint {
  id: string
  label: string
  governanceCheckpoint: string
  riskEscalation: boolean
  requiredBeforeRuntime: boolean
  simulationOnly: true
}

export interface CapabilityIncidentRisk {
  id: string
  label: string
  riskLevel: CapabilityRiskLevel
  trigger: string
  escalationRequired: boolean
  blockedByDefault: boolean
}

export interface CapabilityProfile {
  id: string
  label: string
  description: string
  category: CapabilityCategory
  riskLevel: CapabilityRiskLevel
  executionMode: CapabilityExecutionMode
  boundaries: CapabilityBoundary[]
  constraints: CapabilityConstraint[]
  approvalPolicy: CapabilityApprovalPolicy
  simulation: CapabilitySimulation
  checkpoints: CapabilityCheckpoint[]
  incidentRisks: CapabilityIncidentRisk[]
  simulationOnly: true
  actionExecuted: false
}

export interface CapabilityBlueprint {
  id: 'controlled-practical-capability-blueprint'
  label: 'Controlled Practical Capability Blueprint'
  status: 'metadata-only'
  capabilityProfiles: CapabilityProfile[]
  categories: CapabilityCategory[]
  riskLevels: CapabilityRiskLevel[]
  boundaries: CapabilityBoundary[]
  executionLifecycle: {
    capabilityRequestId: string
    capabilityTraceId: string
    requestedBy: 'owner'
    governanceCheckpoint: string
    approvalStatus: CapabilityApprovalStatus
    executionIntent: string
    executionBlockedReason: string
    riskEscalation: boolean
    simulationState: 'metadata-only'
    simulationOnly: true
    actionExecuted: false
  }
  problemSolverAgentBlueprint: {
    id: 'problem-solver-agent'
    label: 'Problem Solver Agent'
    hierarchy: string[]
    objectives: string[]
    boundaries: string[]
    simulationOnly: true
    actionExecuted: false
  }
  businessBuilderBlueprint: {
    id: 'business-builder-blueprint'
    label: 'Business Builder Blueprint'
    capabilities: string[]
    boundaries: string[]
    simulationOnly: true
    actionExecuted: false
  }
  roadmap: string[]
  governanceRules: string[]
  nonCapabilities: string[]
  simulationOnly: true
  actionExecuted: false
}

const ownerApprovalPolicy: CapabilityApprovalPolicy = {
  required: true,
  ownerFinalAuthority: true,
  autoApprovalAllowed: false,
  approvalChain: ['owner', 'genio-central', 'approval-gate'],
  blockedWithoutApproval: true
}

export const CONTROLLED_PRACTICAL_CAPABILITY_BLUEPRINT: CapabilityBlueprint = {
  id: 'controlled-practical-capability-blueprint',
  label: 'Controlled Practical Capability Blueprint',
  status: 'metadata-only',
  categories: [
    'analysis',
    'planning',
    'drafting',
    'documentation',
    'simulation',
    'filesystem-read-future',
    'filesystem-write-future',
    'terminal-read-future',
    'terminal-execution-future',
    'browser-future',
    'finance-simulation',
    'organization',
    'orchestration',
    'monitoring',
    'company-management'
  ],
  riskLevels: ['low-risk', 'medium-risk', 'high-risk', 'critical-risk'],
  boundaries: [
    'read-only',
    'draft-only',
    'simulation-only',
    'approval-required',
    'forbidden',
    'future-controlled-runtime'
  ],
  capabilityProfiles: [
    {
      id: 'safe-analysis-capability',
      label: 'Safe Analysis Capability',
      description: 'Analyze project state, risks, tradeoffs, and options as proposal metadata.',
      category: 'analysis',
      riskLevel: 'low-risk',
      executionMode: 'proposal-only',
      boundaries: ['simulation-only', 'approval-required'],
      constraints: [
        {
          id: 'analysis-no-execution',
          label: 'No execution',
          boundary: 'simulation-only',
          description: 'Analysis produces recommendations only.'
        }
      ],
      approvalPolicy: ownerApprovalPolicy,
      simulation: {
        simulationState: 'simulated-route',
        executionIntent: 'reasoning-only',
        executionBlockedReason: 'No runtime execution is attached to analysis capabilities.',
        simulationOnly: true,
        actionExecuted: false
      },
      checkpoints: [
        {
          id: 'checkpoint-safe-analysis',
          label: 'Safe analysis checkpoint',
          governanceCheckpoint: 'GENIO reviews risk before routing proposals.',
          riskEscalation: false,
          requiredBeforeRuntime: true,
          simulationOnly: true
        }
      ],
      incidentRisks: [],
      simulationOnly: true,
      actionExecuted: false
    },
    {
      id: 'controlled-draft-capability',
      label: 'Controlled Draft Capability',
      description: 'Prepare drafts for documents, emails, roadmaps, or plans without sending or writing.',
      category: 'drafting',
      riskLevel: 'medium-risk',
      executionMode: 'draft-only',
      boundaries: ['draft-only', 'approval-required'],
      constraints: [
        {
          id: 'draft-no-send',
          label: 'No send',
          boundary: 'forbidden',
          description: 'Drafting cannot send email, publish content, or modify external systems.'
        }
      ],
      approvalPolicy: ownerApprovalPolicy,
      simulation: {
        simulationState: 'simulated-route',
        executionIntent: 'draft-generation-only',
        executionBlockedReason: 'Drafts remain text proposals until future approval and adapter runtime exist.',
        simulationOnly: true,
        actionExecuted: false
      },
      checkpoints: [
        {
          id: 'checkpoint-draft-review',
          label: 'Draft review checkpoint',
          governanceCheckpoint: 'Owner reviews draft output before any future external action.',
          riskEscalation: true,
          requiredBeforeRuntime: true,
          simulationOnly: true
        }
      ],
      incidentRisks: [
        {
          id: 'draft-sensitive-content',
          label: 'Sensitive Draft Content',
          riskLevel: 'high-risk',
          trigger: 'draft includes private, legal, financial, or company-sensitive content',
          escalationRequired: true,
          blockedByDefault: true
        }
      ],
      simulationOnly: true,
      actionExecuted: false
    },
    {
      id: 'future-terminal-execution-capability',
      label: 'Future Terminal Execution Capability',
      description: 'Future controlled terminal execution concept. Blocked in this phase.',
      category: 'terminal-execution-future',
      riskLevel: 'critical-risk',
      executionMode: 'blocked',
      boundaries: ['forbidden', 'approval-required', 'future-controlled-runtime'],
      constraints: [
        {
          id: 'no-child-process',
          label: 'No child process',
          boundary: 'forbidden',
          description: 'No child_process, shell, terminal, or OS execution is implemented.'
        }
      ],
      approvalPolicy: ownerApprovalPolicy,
      simulation: {
        simulationState: 'blocked-before-runtime',
        executionIntent: 'terminal-execution-future',
        executionBlockedReason: 'Terminal execution is forbidden until auth, persistent audit, sandboxing, and owner approval exist.',
        simulationOnly: true,
        actionExecuted: false
      },
      checkpoints: [
        {
          id: 'checkpoint-critical-execution',
          label: 'Critical execution checkpoint',
          governanceCheckpoint: 'GENIO blocks execution intent before any runtime boundary.',
          riskEscalation: true,
          requiredBeforeRuntime: true,
          simulationOnly: true
        }
      ],
      incidentRisks: [
        {
          id: 'irreversible-command-risk',
          label: 'Irreversible Command Risk',
          riskLevel: 'critical-risk',
          trigger: 'request attempts shell execution, deletion, network command, or secret access',
          escalationRequired: true,
          blockedByDefault: true
        }
      ],
      simulationOnly: true,
      actionExecuted: false
    }
  ],
  executionLifecycle: {
    capabilityRequestId: 'cap-req-blueprint',
    capabilityTraceId: 'cap-trace-genio-blueprint',
    requestedBy: 'owner',
    governanceCheckpoint: 'genio-capability-governance-checkpoint',
    approvalStatus: 'blocked',
    executionIntent: 'future-controlled-capability',
    executionBlockedReason: 'Capability blueprint is not a capability runtime.',
    riskEscalation: true,
    simulationState: 'metadata-only',
    simulationOnly: true,
    actionExecuted: false
  },
  problemSolverAgentBlueprint: {
    id: 'problem-solver-agent',
    label: 'Problem Solver Agent',
    hierarchy: ['Owner', 'GENIO Central', 'problem-solver-agent', 'specialist agents/tools'],
    objectives: [
      'resolve complex problems',
      'analyze risks',
      'investigate scenarios',
      'build solution maps',
      'propose strategies',
      'analyze businesses',
      'generate roadmaps',
      'convert ideas into projects or apps'
    ],
    boundaries: [
      'does not replace real lawyers, investigators, doctors, accountants, or regulated professionals',
      'does not act outside GENIO governance',
      'does not act without owner authority',
      'does not execute real-world actions'
    ],
    simulationOnly: true,
    actionExecuted: false
  },
  businessBuilderBlueprint: {
    id: 'business-builder-blueprint',
    label: 'Business Builder Blueprint',
    capabilities: [
      'app generation planning',
      'website architecture planning',
      'startup simulation',
      'product opportunity analysis',
      'monetization strategy',
      'SaaS roadmap generation',
      'production scaling strategy'
    ],
    boundaries: [
      'conceptual and simulation-only',
      'not financial, legal, or investment advice',
      'no account creation, payments, deployment, or external execution',
      'owner approval required before any future controlled action'
    ],
    simulationOnly: true,
    actionExecuted: false
  },
  roadmap: [
    'Phase 1: Proposal-only',
    'Phase 2: Read-only capabilities',
    'Phase 3: Controlled draft generation',
    'Phase 4: Sandboxed execution',
    'Phase 5: Restricted local adapters',
    'Phase 6: Human-supervised execution',
    'Phase 7: Enterprise execution governance'
  ],
  governanceRules: [
    'Proposal != Execution.',
    'Capability blueprint != capability runtime.',
    'Owner remains maximum authority.',
    'GENIO governs capability routing but cannot execute irreversible actions.',
    'All future capabilities are simulation-only by default, approval-required, risk-classified, and audit-first.'
  ],
  nonCapabilities: [
    'No terminal execution.',
    'No filesystem write.',
    'No browser automation.',
    'No external API execution.',
    'No Gmail, trading, OS automation, self-modification, self-replication, or autonomous execution.'
  ],
  simulationOnly: true,
  actionExecuted: false
}
