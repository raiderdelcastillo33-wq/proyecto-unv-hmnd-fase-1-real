import { NextRequest, NextResponse } from 'next/server'
import { AgentRegistry } from '../../../../../../src/domain/agents/AgentRegistry'
import { GenioGovernanceRegistry } from '../../../../../../src/domain/governance/GenioCentralProfile'
import { ToolRegistry } from '../../../../../../src/domain/tools/ToolRegistry'

const PRIVATE_LAB_AGENT_IDS = new Set([
  'architect-agent',
  'coder-agent',
  'reviewer-agent',
  'debugger-agent',
  'tutor-agent',
  'operator-agent'
])

function createErrorResponse(error: string, status: number): NextResponse {
  return NextResponse.json({ success: false, error }, { status })
}

function hasValidOwnerAccessCode(body: Record<string, unknown>): boolean {
  const configuredCode = process.env.OWNER_ACCESS_CODE

  return Boolean(configuredCode) && typeof body.ownerAccessCode === 'string' && body.ownerAccessCode === configuredCode
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  let body: unknown

  try {
    body = await request.json()
  } catch {
    return createErrorResponse('Invalid JSON body.', 400)
  }

  if (typeof body !== 'object' || body === null || Array.isArray(body)) {
    return createErrorResponse('Private lab access denied.', 403)
  }

  if (!hasValidOwnerAccessCode(body as Record<string, unknown>)) {
    return createErrorResponse('Private lab access denied.', 403)
  }

  const agents = AgentRegistry.list()
    .filter((agent) => PRIVATE_LAB_AGENT_IDS.has(agent.id))
    .map((agent) => ({
      id: agent.id,
      label: agent.label ?? agent.name,
      description: agent.description ?? agent.purpose,
      category: agent.category,
      capabilities: agent.capabilities ?? [],
      riskProfile: agent.riskProfile ?? 'medium',
      allowedTools: agent.allowedTools ?? [],
      hierarchyLevel: agent.hierarchyLevel,
      parentAuthority: agent.parentAuthority,
      escalationRules: agent.escalationRules ?? [],
      approvalRequirements: agent.approvalRequirements ?? []
    }))

  const tools = ToolRegistry.list().map((tool) => ({
    id: tool.id,
    label: tool.label ?? tool.name,
    description: tool.description ?? tool.purpose,
    category: tool.category,
    riskLevel: tool.riskLevel,
    requiresApproval: tool.requiresApproval ?? tool.requiresHumanApproval,
    forbiddenActions: tool.forbiddenActions ?? [],
      outputType: tool.outputType
  }))
  const centralProfile = GenioGovernanceRegistry.centralProfile()
  const governance = {
    centralProfile: {
      id: centralProfile.id,
      label: centralProfile.label,
      role: centralProfile.role,
      governanceLevel: centralProfile.governanceLevel,
      approvalAuthority: centralProfile.approvalAuthority,
      orchestrationPriority: centralProfile.orchestrationPriority,
      riskAwareness: centralProfile.riskAwareness,
      hierarchyLevel: centralProfile.hierarchyLevel,
      systemDescription: centralProfile.systemDescription,
      systemGoals: centralProfile.systemGoals,
      capabilities: centralProfile.capabilities,
      futureCapabilities: centralProfile.futureCapabilities,
      strategicVision: centralProfile.strategicVision,
      memoryContextBlueprint: {
        id: centralProfile.memoryContextBlueprint.id,
        label: centralProfile.memoryContextBlueprint.label,
        status: centralProfile.memoryContextBlueprint.status,
        memoryCategories: centralProfile.memoryContextBlueprint.memoryCategories,
        retentionPolicies: centralProfile.memoryContextBlueprint.retentionPolicies,
        contextWindows: centralProfile.memoryContextBlueprint.contextProfile.contextWindows,
        futureArchitecture: centralProfile.memoryContextBlueprint.futureArchitecture,
        lifeMapReadiness: [
          'LifeObjective',
          'LifeRoadmap',
          'Milestone',
          'PersonalGrowthSignal',
          'OpportunitySignal',
          'RiskSignal'
        ],
        journalReadiness: ['JournalEntry', 'Reflection', 'DailySummary', 'MoodTag', 'FocusArea'],
        governanceRules: centralProfile.memoryContextBlueprint.governanceRules,
        simulationOnly: centralProfile.memoryContextBlueprint.simulationOnly,
        actionExecuted: centralProfile.memoryContextBlueprint.actionExecuted
      },
      orchestrationBlueprint: {
        id: centralProfile.orchestrationBlueprint.id,
        label: centralProfile.orchestrationBlueprint.label,
        status: centralProfile.orchestrationBlueprint.status,
        supportedRoles: centralProfile.orchestrationBlueprint.supportedRoles,
        supportedStages: centralProfile.orchestrationBlueprint.supportedStages,
        defaultFlow: {
          orchestrationId: centralProfile.orchestrationBlueprint.defaultFlow.orchestrationId,
          pipelineId: centralProfile.orchestrationBlueprint.defaultFlow.pipelineId,
          objective: centralProfile.orchestrationBlueprint.defaultFlow.objective,
          stages: centralProfile.orchestrationBlueprint.defaultFlow.stages,
          tasks: centralProfile.orchestrationBlueprint.defaultFlow.tasks.map((task) => ({
            id: task.id,
            title: task.title,
            role: task.role,
            assignedAgent: task.assignedAgent,
            priority: task.priority,
            status: task.status,
            estimatedComplexity: task.estimatedComplexity,
            estimatedRisk: task.estimatedRisk,
            simulationOnly: task.simulationOnly,
            actionExecuted: task.actionExecuted
          })),
          pipelineSteps: centralProfile.orchestrationBlueprint.defaultFlow.pipelineSteps.map((step) => ({
            id: step.id,
            stageId: step.stageId,
            assignedAgent: step.assignedAgent,
            taskId: step.taskId,
            estimatedRisk: step.estimatedRisk,
            simulationOnly: step.simulationOnly,
            actionExecuted: step.actionExecuted
          })),
          governanceCheckpoints: centralProfile.orchestrationBlueprint.defaultFlow.governanceCheckpoints,
          futureReadiness: centralProfile.orchestrationBlueprint.defaultFlow.futureReadiness.map((item) => ({
            id: item.id,
            label: item.label,
            status: 'metadata-only',
            safetyBoundary: item.safetyBoundary,
            simulationOnly: item.simulationOnly
          })),
          simulationOnly: centralProfile.orchestrationBlueprint.defaultFlow.simulationOnly,
          actionExecuted: centralProfile.orchestrationBlueprint.defaultFlow.actionExecuted
        },
        governanceRules: centralProfile.orchestrationBlueprint.governanceRules,
        simulationOnly: centralProfile.orchestrationBlueprint.simulationOnly,
        actionExecuted: centralProfile.orchestrationBlueprint.actionExecuted
      },
      adapterBlueprint: {
        id: centralProfile.adapterBlueprint.id,
        label: centralProfile.adapterBlueprint.label,
        status: centralProfile.adapterBlueprint.status,
        adapters: centralProfile.adapterBlueprint.adapters.map((adapter) => ({
          id: adapter.id,
          label: adapter.label,
          description: adapter.description,
          category: adapter.category,
          capabilities: adapter.capabilities,
          riskLevel: adapter.riskLevel,
          executionMode: adapter.executionMode,
          approvalRequirement: adapter.approvalRequirement,
          forbiddenActions: adapter.forbiddenActions,
          simulationOnly: adapter.simulationOnly,
          actionExecuted: adapter.actionExecuted
        })),
        governanceRules: centralProfile.adapterBlueprint.governanceRules,
        simulationOnly: centralProfile.adapterBlueprint.simulationOnly,
        actionExecuted: centralProfile.adapterBlueprint.actionExecuted
      },
      authBlueprint: {
        id: centralProfile.authBlueprint.id,
        label: centralProfile.authBlueprint.label,
        status: centralProfile.authBlueprint.status,
        currentAuthMode: centralProfile.authBlueprint.currentAuthMode,
        realAuthImplemented: centralProfile.authBlueprint.realAuthImplemented,
        authBlueprintReady: centralProfile.authBlueprint.authBlueprintReady,
        supportedFutureRoles: centralProfile.authBlueprint.supportedFutureRoles,
        protectedSurfaces: centralProfile.authBlueprint.protectedSurfaces,
        accessPolicies: centralProfile.authBlueprint.accessPolicies.map((policy) => ({
          id: policy.id,
          label: policy.label,
          roles: policy.roles,
          riskLevel: policy.riskLevel,
          approvalRequired: policy.approvalRequired,
          implemented: policy.implemented,
          futureOnly: policy.futureOnly,
          safetyBoundary: policy.safetyBoundary
        })),
        sessionPolicy: centralProfile.authBlueprint.sessionPolicy,
        roadmap: centralProfile.authBlueprint.roadmap,
        productionSecurityRisks: centralProfile.authBlueprint.productionSecurityRisks,
        futureSecurityRequirements: centralProfile.authBlueprint.futureSecurityRequirements,
        ownerAccessCodeBoundary: centralProfile.authBlueprint.ownerAccessCodeBoundary,
        simulationOnly: centralProfile.authBlueprint.simulationOnly,
        actionExecuted: centralProfile.authBlueprint.actionExecuted
      },
      observabilityBlueprint: {
        id: centralProfile.observabilityBlueprint.id,
        label: centralProfile.observabilityBlueprint.label,
        status: centralProfile.observabilityBlueprint.status,
        auditTrace: centralProfile.observabilityBlueprint.auditTrace,
        eventLineage: centralProfile.observabilityBlueprint.eventLineage.map((lineage) => ({
          id: lineage.id,
          label: lineage.label,
          traceId: lineage.traceId,
          parentEventId: lineage.parentEventId,
          childEventIds: lineage.childEventIds,
          correlationId: lineage.correlationId,
          approvalChain: lineage.approvalChain,
          governanceSource: lineage.governanceSource,
          riskLevel: lineage.riskLevel,
          simulationOnly: lineage.simulationOnly,
          actionExecuted: lineage.actionExecuted
        })),
        governanceCheckpoints: centralProfile.observabilityBlueprint.governanceCheckpoints.map((checkpoint) => ({
          id: checkpoint.id,
          label: checkpoint.label,
          description: checkpoint.description,
          riskLevel: checkpoint.riskLevel,
          escalationRequired: checkpoint.escalationRequired,
          simulationOnly: checkpoint.simulationOnly,
          actionExecuted: checkpoint.actionExecuted
        })),
        monitoringScopes: centralProfile.observabilityBlueprint.monitoringScopes,
        retentionPolicies: centralProfile.observabilityBlueprint.retentionPolicies,
        auditPersistenceReadiness: centralProfile.observabilityBlueprint.auditPersistenceReadiness,
        privacyPrinciples: centralProfile.observabilityBlueprint.privacyPrinciples,
        nonCapabilities: centralProfile.observabilityBlueprint.nonCapabilities,
        simulationOnly: centralProfile.observabilityBlueprint.simulationOnly,
        actionExecuted: centralProfile.observabilityBlueprint.actionExecuted
      },
      lifeMapVision: centralProfile.lifeMapVision,
      financialStrategyVision: centralProfile.financialStrategyVision,
      safetyBoundaries: centralProfile.governanceMetadata.safetyBoundaries,
      simulationOnly: centralProfile.simulationOnly,
      actionExecuted: centralProfile.actionExecuted
    },
    hierarchyLevels: ['central', 'supervisor', 'specialist', 'utility', 'observer'],
    approvalFlows: centralProfile.governanceMetadata.approvalFlows,
    ownership: centralProfile.governanceMetadata.ownership,
    proposalOnly: true
  }

  return NextResponse.json({
    success: true,
    data: {
      governance,
      agents,
      tools
    }
  })
}
