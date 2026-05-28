import type { AgentId } from '../agents/AgentProfile'
import type { ContextPriority } from '../context/ContextBlueprint'

export type TaskPriority = 'low' | 'medium' | 'high' | 'critical'

export type TaskStatus = 'planned' | 'delegated' | 'review-required' | 'blocked' | 'completed'

export type OrchestrationRole = 'planner' | 'reviewer' | 'validator' | 'observer' | 'specialist'

export type OrchestrationStage = 'intake' | 'planning' | 'delegation' | 'review' | 'validation' | 'final-proposal'

export interface AgentTask {
  id: string
  title: string
  role: OrchestrationRole
  assignedAgent: AgentId
  priority: TaskPriority
  status: TaskStatus
  coordinationReason: string
  estimatedComplexity: ContextPriority
  estimatedRisk: ContextPriority
  blockedActions: string[]
  simulationOnly: true
  actionExecuted: false
}

export interface TaskAssignment {
  id: string
  taskId: string
  assignedAgent: AgentId
  delegationReason: string
  approvalRequired: boolean
  escalationRequired: boolean
  simulationOnly: true
  actionExecuted: false
}

export interface PipelineStep {
  id: string
  pipelineId: string
  stageId: OrchestrationStage
  assignedAgent: AgentId
  taskId: string
  coordinationReason: string
  estimatedComplexity: ContextPriority
  estimatedRisk: ContextPriority
  simulationOnly: true
  actionExecuted: false
}

export interface DelegationRule {
  id: string
  role: OrchestrationRole
  preferredAgents: AgentId[]
  delegationReason: string
  riskEscalation: boolean
  governanceCheck: boolean
  approvalRequired: boolean
  blockedActions: string[]
  simulationOnly: true
}

export interface CoordinationPolicy {
  approvalRequired: boolean
  escalationRequired: boolean
  riskEscalation: boolean
  governanceCheck: boolean
  blockedActions: string[]
  simulationOnly: true
}

export interface CoordinationPlan {
  id: string
  objective: string
  participatingAgents: AgentId[]
  assignments: TaskAssignment[]
  policies: CoordinationPolicy
  simulationOnly: true
  actionExecuted: false
}

export interface OrchestrationFlow {
  orchestrationId: string
  pipelineId: string
  objective: string
  stages: OrchestrationStage[]
  tasks: AgentTask[]
  pipelineSteps: PipelineStep[]
  delegationRules: DelegationRule[]
  coordinationPlan: CoordinationPlan
  governanceCheckpoints: string[]
  futureReadiness: Array<{
    id: string
    label: string
    status: 'placeholder-only'
    safetyBoundary: string
    simulationOnly: true
  }>
  simulationOnly: true
  actionExecuted: false
}

export interface StrategicOrchestrationBlueprint {
  id: 'strategic-multi-agent-orchestration-layer'
  label: string
  status: 'metadata-only'
  defaultFlow: OrchestrationFlow
  supportedRoles: OrchestrationRole[]
  supportedStages: OrchestrationStage[]
  governanceRules: string[]
  simulationOnly: true
  actionExecuted: false
}

export const STRATEGIC_ORCHESTRATION_BLUEPRINT: StrategicOrchestrationBlueprint = {
  id: 'strategic-multi-agent-orchestration-layer',
  label: 'Strategic Multi-Agent Orchestration Layer',
  status: 'metadata-only',
  supportedRoles: ['planner', 'reviewer', 'validator', 'observer', 'specialist'],
  supportedStages: ['intake', 'planning', 'delegation', 'review', 'validation', 'final-proposal'],
  defaultFlow: {
    orchestrationId: 'orch-genio-default-flow',
    pipelineId: 'pipe-genio-safe-proposal',
    objective: 'Simulate a safe multi-agent path from owner objective to final proposal.',
    stages: ['intake', 'planning', 'delegation', 'review', 'validation', 'final-proposal'],
    tasks: [
      {
        id: 'task-architect-plan',
        title: 'Create strategic implementation plan',
        role: 'planner',
        assignedAgent: 'architect-agent',
        priority: 'high',
        status: 'planned',
        coordinationReason: 'Architecture agent frames scope, risks, and phases before any specialist proposal.',
        estimatedComplexity: 'high',
        estimatedRisk: 'medium',
        blockedActions: ['execute-command', 'write-filesystem', 'start-workflow'],
        simulationOnly: true,
        actionExecuted: false
      },
      {
        id: 'task-coder-propose',
        title: 'Prepare implementation proposal',
        role: 'specialist',
        assignedAgent: 'coder-agent',
        priority: 'medium',
        status: 'delegated',
        coordinationReason: 'Coder agent converts approved scope into proposal-only implementation steps.',
        estimatedComplexity: 'medium',
        estimatedRisk: 'medium',
        blockedActions: ['write-filesystem', 'execute-command'],
        simulationOnly: true,
        actionExecuted: false
      },
      {
        id: 'task-reviewer-check',
        title: 'Review risk and regressions',
        role: 'reviewer',
        assignedAgent: 'reviewer-agent',
        priority: 'high',
        status: 'review-required',
        coordinationReason: 'Reviewer agent checks safety, test gaps, and regression risk before final proposal.',
        estimatedComplexity: 'medium',
        estimatedRisk: 'high',
        blockedActions: ['approve-execution', 'bypass-owner'],
        simulationOnly: true,
        actionExecuted: false
      },
      {
        id: 'task-debugger-validate',
        title: 'Validate failure modes',
        role: 'validator',
        assignedAgent: 'debugger-agent',
        priority: 'medium',
        status: 'planned',
        coordinationReason: 'Debugger agent identifies likely failure paths and safe verification ideas.',
        estimatedComplexity: 'medium',
        estimatedRisk: 'medium',
        blockedActions: ['run-terminal', 'read-filesystem'],
        simulationOnly: true,
        actionExecuted: false
      },
      {
        id: 'task-operator-observe',
        title: 'Prepare owner-facing final proposal',
        role: 'observer',
        assignedAgent: 'operator-agent',
        priority: 'medium',
        status: 'planned',
        coordinationReason: 'Operator agent summarizes chain status for owner approval without running anything.',
        estimatedComplexity: 'low',
        estimatedRisk: 'high',
        blockedActions: ['execute-automation', 'start-background-job'],
        simulationOnly: true,
        actionExecuted: false
      }
    ],
    pipelineSteps: [
      {
        id: 'step-intake',
        pipelineId: 'pipe-genio-safe-proposal',
        stageId: 'intake',
        assignedAgent: 'tutor-agent',
        taskId: 'task-architect-plan',
        coordinationReason: 'Clarify objective and owner intent before planning.',
        estimatedComplexity: 'low',
        estimatedRisk: 'low',
        simulationOnly: true,
        actionExecuted: false
      },
      {
        id: 'step-planning',
        pipelineId: 'pipe-genio-safe-proposal',
        stageId: 'planning',
        assignedAgent: 'architect-agent',
        taskId: 'task-architect-plan',
        coordinationReason: 'Design phased path and constraints.',
        estimatedComplexity: 'high',
        estimatedRisk: 'medium',
        simulationOnly: true,
        actionExecuted: false
      },
      {
        id: 'step-delegation',
        pipelineId: 'pipe-genio-safe-proposal',
        stageId: 'delegation',
        assignedAgent: 'coder-agent',
        taskId: 'task-coder-propose',
        coordinationReason: 'Convert plan into implementation proposal.',
        estimatedComplexity: 'medium',
        estimatedRisk: 'medium',
        simulationOnly: true,
        actionExecuted: false
      },
      {
        id: 'step-review',
        pipelineId: 'pipe-genio-safe-proposal',
        stageId: 'review',
        assignedAgent: 'reviewer-agent',
        taskId: 'task-reviewer-check',
        coordinationReason: 'Review risks before final owner proposal.',
        estimatedComplexity: 'medium',
        estimatedRisk: 'high',
        simulationOnly: true,
        actionExecuted: false
      },
      {
        id: 'step-validation',
        pipelineId: 'pipe-genio-safe-proposal',
        stageId: 'validation',
        assignedAgent: 'debugger-agent',
        taskId: 'task-debugger-validate',
        coordinationReason: 'Validate likely failure modes as text-only checks.',
        estimatedComplexity: 'medium',
        estimatedRisk: 'medium',
        simulationOnly: true,
        actionExecuted: false
      },
      {
        id: 'step-final-proposal',
        pipelineId: 'pipe-genio-safe-proposal',
        stageId: 'final-proposal',
        assignedAgent: 'operator-agent',
        taskId: 'task-operator-observe',
        coordinationReason: 'Prepare final owner-facing proposal and approval metadata.',
        estimatedComplexity: 'low',
        estimatedRisk: 'high',
        simulationOnly: true,
        actionExecuted: false
      }
    ],
    delegationRules: [
      {
        id: 'rule-planner',
        role: 'planner',
        preferredAgents: ['architect-agent'],
        delegationReason: 'Architecture-first planning reduces blast radius.',
        riskEscalation: true,
        governanceCheck: true,
        approvalRequired: false,
        blockedActions: ['rewrite-system', 'skip-review'],
        simulationOnly: true
      },
      {
        id: 'rule-specialist',
        role: 'specialist',
        preferredAgents: ['coder-agent', 'debugger-agent', 'tutor-agent'],
        delegationReason: 'Specialists handle scoped analysis after GENIO frames the objective.',
        riskEscalation: true,
        governanceCheck: true,
        approvalRequired: true,
        blockedActions: ['execute-code', 'write-filesystem'],
        simulationOnly: true
      },
      {
        id: 'rule-reviewer',
        role: 'reviewer',
        preferredAgents: ['reviewer-agent'],
        delegationReason: 'Reviewer validates safety, regressions, and missing tests.',
        riskEscalation: true,
        governanceCheck: true,
        approvalRequired: false,
        blockedActions: ['auto-approve', 'hide-risk'],
        simulationOnly: true
      }
    ],
    coordinationPlan: {
      id: 'coord-plan-safe-proposal',
      objective: 'Route owner objective through planner, specialist, reviewer, validator, and final proposal stages.',
      participatingAgents: [
        'architect-agent',
        'coder-agent',
        'reviewer-agent',
        'debugger-agent',
        'tutor-agent',
        'operator-agent'
      ],
      assignments: [
        {
          id: 'assign-architect',
          taskId: 'task-architect-plan',
          assignedAgent: 'architect-agent',
          delegationReason: 'Start with architecture and risk boundaries.',
          approvalRequired: false,
          escalationRequired: true,
          simulationOnly: true,
          actionExecuted: false
        },
        {
          id: 'assign-coder',
          taskId: 'task-coder-propose',
          assignedAgent: 'coder-agent',
          delegationReason: 'Create implementation proposal only after planning.',
          approvalRequired: true,
          escalationRequired: true,
          simulationOnly: true,
          actionExecuted: false
        },
        {
          id: 'assign-reviewer',
          taskId: 'task-reviewer-check',
          assignedAgent: 'reviewer-agent',
          delegationReason: 'Review before owner-facing proposal.',
          approvalRequired: false,
          escalationRequired: true,
          simulationOnly: true,
          actionExecuted: false
        }
      ],
      policies: {
        approvalRequired: true,
        escalationRequired: true,
        riskEscalation: true,
        governanceCheck: true,
        blockedActions: [
          'terminal-execution',
          'filesystem-write',
          'background-job',
          'queue-dispatch',
          'autonomous-run',
          'approval-bypass'
        ],
        simulationOnly: true
      },
      simulationOnly: true,
      actionExecuted: false
    },
    governanceCheckpoints: [
      'GENIO must review objective before delegation.',
      'Sensitive tasks require owner approval metadata.',
      'Any request for execution is blocked in this phase.',
      'Pipeline output is a proposal, not an action.'
    ],
    futureReadiness: [
      {
        id: 'adaptive-orchestration',
        label: 'Adaptive Orchestration',
        status: 'placeholder-only',
        safetyBoundary: 'No adaptive runtime or autonomous planning exists in this phase.',
        simulationOnly: true
      },
      {
        id: 'async-workflows',
        label: 'Async Workflows',
        status: 'placeholder-only',
        safetyBoundary: 'No queues, workers, cron, threads, or background jobs exist in this phase.',
        simulationOnly: true
      },
      {
        id: 'memory-aware-delegation',
        label: 'Memory-Aware Delegation',
        status: 'placeholder-only',
        safetyBoundary: 'No real memory retrieval or embeddings exist in this phase.',
        simulationOnly: true
      },
      {
        id: 'execution-adapters',
        label: 'Execution Adapters',
        status: 'placeholder-only',
        safetyBoundary: 'No terminal, filesystem, email, OS, or company workflow execution exists in this phase.',
        simulationOnly: true
      }
    ],
    simulationOnly: true,
    actionExecuted: false
  },
  governanceRules: [
    'Orchestration is simulation-only.',
    'No agent task can execute tools, terminal commands, filesystem writes, queues, workers, or background jobs.',
    'GENIO can route, block, prioritize, and propose, but cannot bypass owner approval.',
    'Proposal != execution.'
  ],
  simulationOnly: true,
  actionExecuted: false
}
