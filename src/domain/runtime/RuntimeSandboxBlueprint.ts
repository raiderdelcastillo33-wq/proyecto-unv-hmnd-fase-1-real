export type SandboxExecutionMode =
  | 'no-runtime'
  | 'simulation-only'
  | 'read-only-sandbox-future'
  | 'ephemeral-sandbox-future'
  | 'restricted-runtime-future'
  | 'isolated-runtime-future'

export type SandboxIsolationLevel =
  | 'no-runtime'
  | 'simulation-only'
  | 'read-only-sandbox'
  | 'ephemeral-sandbox'
  | 'restricted-runtime'
  | 'isolated-runtime-future'

export type SandboxPermissionScope =
  | 'no-host-access'
  | 'metadata-only'
  | 'read-only-future'
  | 'draft-only-future'
  | 'network-blocked'
  | 'filesystem-blocked'
  | 'terminal-blocked'
  | 'approval-required'

export type SandboxRiskLevel = 'low' | 'medium' | 'high' | 'critical'

export type SandboxLifecycleState =
  | 'planned'
  | 'requested'
  | 'awaiting-approval'
  | 'approved-for-simulation'
  | 'simulated'
  | 'blocked'
  | 'terminated'

export interface SandboxBoundary {
  id: string
  label: string
  permissionScope: SandboxPermissionScope
  description: string
  enforcedInThisPhase: boolean
}

export interface SandboxEmergencyStop {
  ownerStopRequired: true
  emergencyStopAvailable: 'metadata-only'
  killSwitchFuture: 'planned'
  maxRuntimeFuture: string
  rollbackRequired: true
  auditBeforeTermination: true
  simulationOnly: true
  actionExecuted: false
}

export interface SandboxRollbackPolicy {
  id: string
  label: string
  policies: Array<
    | 'no-write'
    | 'reversible-only'
    | 'snapshot-before-action'
    | 'dry-run-first'
    | 'approval-before-commit'
    | 'terminate-on-risk'
  >
  status: 'metadata-only'
  simulationOnly: true
}

export interface SandboxAuditChain {
  traceId: string
  correlationId: string
  approvalId: string
  capabilityRequestId: string
  adapterId: string
  governanceSource: 'genio-central'
  auditEvents: string[]
  simulationOnly: true
  actionExecuted: false
}

export interface SandboxCapabilityRoute {
  routeId: string
  requestedCapabilityId: string
  futureAdapterId: string
  approvalRequired: true
  approvalStatus: 'blocked'
  auditTraceId: string
  isolationLevel: SandboxIsolationLevel
  blockedPermissions: SandboxPermissionScope[]
  simulationOnly: true
  actionExecuted: false
}

export interface SandboxProfile {
  id: string
  label: string
  description: string
  executionMode: SandboxExecutionMode
  isolationLevel: SandboxIsolationLevel
  lifecycleState: SandboxLifecycleState
  permissionScopes: SandboxPermissionScope[]
  riskLevel: SandboxRiskLevel
  boundaries: SandboxBoundary[]
  simulationOnly: true
  actionExecuted: false
}

export interface RuntimeSandboxBlueprint {
  id: 'controlled-runtime-sandbox-blueprint'
  label: 'Controlled Runtime Sandbox Blueprint'
  status: 'metadata-only'
  hierarchy: string[]
  sandboxProfile: SandboxProfile
  lifecycleStates: SandboxLifecycleState[]
  isolationModel: Array<{
    level: SandboxIsolationLevel
    status: 'current' | 'future-only'
    description: string
    simulationOnly: true
  }>
  emergencyStop: SandboxEmergencyStop
  rollbackPolicy: SandboxRollbackPolicy
  auditChain: SandboxAuditChain
  capabilityRoutes: SandboxCapabilityRoute[]
  governanceRules: string[]
  nonCapabilities: string[]
  simulationOnly: true
  actionExecuted: false
}

export const CONTROLLED_RUNTIME_SANDBOX_BLUEPRINT: RuntimeSandboxBlueprint = {
  id: 'controlled-runtime-sandbox-blueprint',
  label: 'Controlled Runtime Sandbox Blueprint',
  status: 'metadata-only',
  hierarchy: [
    'Owner',
    'GENIO Central',
    'Governance Layer',
    'Runtime Sandbox',
    'Specialized Agents',
    'Controlled Capabilities'
  ],
  sandboxProfile: {
    id: 'genio-future-runtime-sandbox',
    label: 'GENIO Future Runtime Sandbox',
    description:
      'Future isolated runtime zone governed by GENIO. No real sandbox, terminal, filesystem, worker, VM, or Docker runtime exists in this phase.',
    executionMode: 'no-runtime',
    isolationLevel: 'simulation-only',
    lifecycleState: 'blocked',
    permissionScopes: [
      'no-host-access',
      'metadata-only',
      'network-blocked',
      'filesystem-blocked',
      'terminal-blocked',
      'approval-required'
    ],
    riskLevel: 'critical',
    boundaries: [
      {
        id: 'boundary-no-host-access',
        label: 'No host access',
        permissionScope: 'no-host-access',
        description: 'Agents must never access the host machine directly.',
        enforcedInThisPhase: true
      },
      {
        id: 'boundary-terminal-blocked',
        label: 'Terminal blocked',
        permissionScope: 'terminal-blocked',
        description: 'No shell, child_process, terminal, OS, Docker, VM, or worker runtime is implemented.',
        enforcedInThisPhase: true
      },
      {
        id: 'boundary-approval-required',
        label: 'Approval required',
        permissionScope: 'approval-required',
        description: 'Future runtime requests require Owner approval, audit chain, rollback policy, and GENIO governance.',
        enforcedInThisPhase: true
      }
    ],
    simulationOnly: true,
    actionExecuted: false
  },
  lifecycleStates: [
    'planned',
    'requested',
    'awaiting-approval',
    'approved-for-simulation',
    'simulated',
    'blocked',
    'terminated'
  ],
  isolationModel: [
    {
      level: 'no-runtime',
      status: 'current',
      description: 'No executable runtime exists.',
      simulationOnly: true
    },
    {
      level: 'simulation-only',
      status: 'current',
      description: 'Runtime behavior can be described as metadata only.',
      simulationOnly: true
    },
    {
      level: 'read-only-sandbox',
      status: 'future-only',
      description: 'Future read-only sandbox for non-destructive inspection after auth, audit, and scoped approval.',
      simulationOnly: true
    },
    {
      level: 'ephemeral-sandbox',
      status: 'future-only',
      description: 'Future short-lived sandbox with no durable side effects.',
      simulationOnly: true
    },
    {
      level: 'restricted-runtime',
      status: 'future-only',
      description: 'Future restricted runtime with explicit permission scopes and rollback controls.',
      simulationOnly: true
    },
    {
      level: 'isolated-runtime-future',
      status: 'future-only',
      description: 'Future isolated runtime only after full owner auth, persistent audit, threat model, and kill switch design.',
      simulationOnly: true
    }
  ],
  emergencyStop: {
    ownerStopRequired: true,
    emergencyStopAvailable: 'metadata-only',
    killSwitchFuture: 'planned',
    maxRuntimeFuture: 'not-implemented',
    rollbackRequired: true,
    auditBeforeTermination: true,
    simulationOnly: true,
    actionExecuted: false
  },
  rollbackPolicy: {
    id: 'sandbox-rollback-policy',
    label: 'Sandbox Rollback & Safety Policy',
    policies: [
      'no-write',
      'reversible-only',
      'snapshot-before-action',
      'dry-run-first',
      'approval-before-commit',
      'terminate-on-risk'
    ],
    status: 'metadata-only',
    simulationOnly: true
  },
  auditChain: {
    traceId: 'sandbox-trace-genio-blueprint',
    correlationId: 'sandbox-corr-genio-blueprint',
    approvalId: 'approval-runtime-sandbox-blueprint',
    capabilityRequestId: 'cap-req-blueprint',
    adapterId: 'controlled-adapter-blueprint',
    governanceSource: 'genio-central',
    auditEvents: [
      'sandbox-requested',
      'sandbox-approval-required',
      'sandbox-blocked',
      'sandbox-simulated',
      'sandbox-terminated'
    ],
    simulationOnly: true,
    actionExecuted: false
  },
  capabilityRoutes: [
    {
      routeId: 'route-capability-to-sandbox',
      requestedCapabilityId: 'future-terminal-execution-capability',
      futureAdapterId: 'terminal-adapter',
      approvalRequired: true,
      approvalStatus: 'blocked',
      auditTraceId: 'sandbox-trace-genio-blueprint',
      isolationLevel: 'simulation-only',
      blockedPermissions: ['terminal-blocked', 'filesystem-blocked', 'network-blocked', 'no-host-access'],
      simulationOnly: true,
      actionExecuted: false
    }
  ],
  governanceRules: [
    'Sandbox blueprint != runtime real.',
    'Proposal != Execution.',
    'GENIO governs future runtime; GENIO does not execute directly.',
    'Agents must never access the host machine directly.',
    'Future runtime requires Owner approval, scoped permissions, persistent audit, rollback policy, and emergency stop design.'
  ],
  nonCapabilities: [
    'No terminal, shell, child_process, filesystem, Docker, VM, worker, queue, browser automation, or OS automation runtime exists.',
    'No autonomous loops, self-modification, self-replication, unrestricted execution, or direct host access exists.',
    'No kill switch is implemented because no runtime exists.'
  ],
  simulationOnly: true,
  actionExecuted: false
}
