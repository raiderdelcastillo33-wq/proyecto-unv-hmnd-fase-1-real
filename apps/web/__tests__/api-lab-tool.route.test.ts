/** @jest-environment node */

import { POST } from '@/app/api/lab/tool/route'
import { POST as CATALOG_POST } from '@/app/api/lab/catalog/route'

const ORIGINAL_ENV = process.env

function createJsonRequest(body: string): Request {
  return new Request('http://localhost/api/lab/tool', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body
  })
}

describe('POST /api/lab/tool', () => {
  beforeEach(() => {
    jest.resetModules()
    process.env = {
      ...ORIGINAL_ENV,
      OWNER_ACCESS_CODE: 'owner-code'
    }
  })

  afterAll(() => {
    process.env = ORIGINAL_ENV
  })

  it('blocks missing or incorrect owner access code', async () => {
    const missingResponse = await POST(
      createJsonRequest(
        JSON.stringify({
          agentId: 'operator-agent',
          toolId: 'review-risk',
          input: 'review private lab risk'
        })
      ) as never
    )
    const missingPayload = await missingResponse.json()

    expect(missingResponse.status).toBe(403)
    expect(missingPayload).toEqual({
      success: false,
      error: 'Private lab access denied.'
    })

    const wrongResponse = await POST(
      createJsonRequest(
        JSON.stringify({
          ownerAccessCode: 'wrong-code',
          agentId: 'operator-agent',
          toolId: 'review-risk',
          input: 'review private lab risk'
        })
      ) as never
    )

    expect(wrongResponse.status).toBe(403)
  })

  it('blocks when OWNER_ACCESS_CODE is not configured server-side', async () => {
    delete process.env.OWNER_ACCESS_CODE

    const response = await POST(
      createJsonRequest(
        JSON.stringify({
          ownerAccessCode: 'owner-code',
          agentId: 'operator-agent',
          toolId: 'review-risk',
          input: 'review private lab risk'
        })
      ) as never
    )

    expect(response.status).toBe(403)
  })

  it('returns a ToolResult and audit events for valid owner access code', async () => {
    const response = await POST(
      createJsonRequest(
        JSON.stringify({
          ownerAccessCode: 'owner-code',
          agentId: 'reviewer-agent',
          toolId: 'review-risk',
          input: 'review private lab risk'
        })
      ) as never
    )
    const payload = await response.json()

    expect(response.status).toBe(200)
    expect(payload.success).toBe(true)
    expect(payload.data.result.toolId).toBe('review-risk')
    expect(payload.data.result.approval.decision).toBe('safe')
    expect(payload.data.result.approval.actionExecuted).toBe(false)
    expect(payload.data.result.ownerApproval.approvalStatus).toBe('pending')
    expect(payload.data.result.ownerApproval.actionExecuted).toBe(false)
    expect(payload.data.result.ownerApproval.simulationOnly).toBe(true)
    expect(payload.data.auditEvents.some((event: { type: string }) => event.type === 'tool-requested')).toBe(true)
    expect(payload.data.auditEvents.some((event: { type: string }) => event.type === 'approval-evaluated')).toBe(true)
    expect(payload.data.auditEvents.some((event: { type: string }) => event.type === 'tool-result-created')).toBe(true)
    expect(payload.data.auditEvents.some((event: { type: string }) => event.type === 'approval-requested')).toBe(true)
    expect(JSON.stringify(payload)).not.toContain('systemInstructions')
    expect(JSON.stringify(payload)).not.toContain('"executed"')
  })

  it('returns safe dynamic catalog metadata without system instructions', async () => {
    const response = await CATALOG_POST(
      createJsonRequest(
        JSON.stringify({
          ownerAccessCode: 'owner-code'
        })
      ) as never
    )
    const payload = await response.json()

    expect(response.status).toBe(200)
    expect(payload.success).toBe(true)
    expect(payload.data.governance.centralProfile.id).toBe('genio-central')
    expect(payload.data.governance.centralProfile.hierarchyLevel).toBe('central')
    expect(payload.data.governance.centralProfile.simulationOnly).toBe(true)
    expect(payload.data.governance.centralProfile.actionExecuted).toBe(false)
    expect(payload.data.governance.centralProfile.strategicVision.personalityTraits).toContain('strategic')
    expect(payload.data.governance.centralProfile.strategicVision.predictionBoundaries).toContain(
      'GENIO does not know the future.'
    )
    expect(payload.data.governance.centralProfile.strategicVision.futureEngines).toEqual(
      expect.arrayContaining([expect.objectContaining({ id: 'predictive-simulation-engine', simulationOnly: true })])
    )
    expect(payload.data.governance.centralProfile.memoryContextBlueprint.id).toBe('genio-memory-context-blueprint')
    expect(payload.data.governance.centralProfile.memoryContextBlueprint.memoryCategories).toEqual(
      expect.arrayContaining(['technical', 'life-map', 'company'])
    )
    expect(payload.data.governance.centralProfile.memoryContextBlueprint.futureArchitecture.vectorMemory).toBe(
      'placeholder-only'
    )
    expect(payload.data.governance.centralProfile.memoryContextBlueprint.futureArchitecture.safetyBoundary).toContain(
      'No data is stored'
    )
    expect(payload.data.governance.centralProfile.memoryContextBlueprint.simulationOnly).toBe(true)
    expect(payload.data.governance.centralProfile.orchestrationBlueprint.id).toBe(
      'strategic-multi-agent-orchestration-layer'
    )
    expect(payload.data.governance.centralProfile.orchestrationBlueprint.defaultFlow.tasks).toEqual(
      expect.arrayContaining([expect.objectContaining({ assignedAgent: 'architect-agent', actionExecuted: false })])
    )
    expect(payload.data.governance.centralProfile.orchestrationBlueprint.defaultFlow.pipelineSteps).toEqual(
      expect.arrayContaining([expect.objectContaining({ stageId: 'review', assignedAgent: 'reviewer-agent' })])
    )
    expect(payload.data.governance.centralProfile.orchestrationBlueprint.simulationOnly).toBe(true)
    expect(payload.data.governance.centralProfile.adapterBlueprint.id).toBe('controlled-adapter-blueprint')
    expect(payload.data.governance.centralProfile.adapterBlueprint.adapters).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: 'terminal-adapter',
          executionMode: 'blocked',
          actionExecuted: false
        }),
        expect.objectContaining({
          id: 'finance-simulation-adapter',
          executionMode: 'simulation-only',
          actionExecuted: false
        })
      ])
    )
    expect(payload.data.governance.centralProfile.adapterBlueprint.simulationOnly).toBe(true)
    expect(payload.data.governance.centralProfile.authBlueprint.id).toBe('real-owner-auth-blueprint')
    expect(payload.data.governance.centralProfile.authBlueprint.currentAuthMode).toBe('owner-access-code')
    expect(payload.data.governance.centralProfile.authBlueprint.realAuthImplemented).toBe(false)
    expect(payload.data.governance.centralProfile.authBlueprint.authBlueprintReady).toBe(true)
    expect(payload.data.governance.centralProfile.authBlueprint.supportedFutureRoles).toEqual(
      expect.arrayContaining(['owner', 'admin', 'operator', 'guest'])
    )
    expect(payload.data.governance.centralProfile.authBlueprint.accessPolicies).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: 'execute_controlled_action_future',
          futureOnly: true,
          implemented: false,
          approvalRequired: true,
          riskLevel: 'critical'
        })
      ])
    )
    expect(payload.data.governance.centralProfile.authBlueprint.ownerAccessCodeBoundary).toContain(
      'not real authentication'
    )
    expect(payload.data.governance.centralProfile.observabilityBlueprint.id).toBe(
      'persistent-audit-observability-blueprint'
    )
    expect(payload.data.governance.centralProfile.observabilityBlueprint.auditTrace.traceId).toBe(
      'trace-genio-blueprint'
    )
    expect(payload.data.governance.centralProfile.observabilityBlueprint.auditTrace.actionExecuted).toBe(false)
    expect(payload.data.governance.centralProfile.observabilityBlueprint.eventLineage).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: 'lineage-approval-evaluated',
          parentEventId: 'lineage-proposal-requested',
          actionExecuted: false
        })
      ])
    )
    expect(payload.data.governance.centralProfile.observabilityBlueprint.monitoringScopes).toContain(
      'audit-anomaly-detection'
    )
    expect(payload.data.governance.centralProfile.observabilityBlueprint.auditPersistenceReadiness.persistentAudit).toBe(
      'placeholder-only'
    )
    expect(payload.data.governance.centralProfile.observabilityBlueprint.nonCapabilities).toEqual(
      expect.arrayContaining([expect.stringContaining('No OpenTelemetry')])
    )
    expect(payload.data.governance.proposalOnly).toBe(true)
    expect(payload.data.agents.some((agent: { id: string }) => agent.id === 'operator-agent')).toBe(true)
    expect(payload.data.tools.some((tool: { id: string }) => tool.id === 'propose-terminal-command')).toBe(true)
    expect(payload.data.agents[0]).toEqual(
      expect.objectContaining({
        label: expect.any(String),
        category: expect.any(String),
        capabilities: expect.any(Array),
        riskProfile: expect.any(String),
        allowedTools: expect.any(Array),
        hierarchyLevel: expect.any(String),
        parentAuthority: 'genio-central',
        escalationRules: expect.any(Array),
        approvalRequirements: expect.any(Array)
      })
    )
    expect(payload.data.tools[0]).toEqual(
      expect.objectContaining({
        label: expect.any(String),
        category: expect.any(String),
        riskLevel: expect.any(String),
        requiresApproval: expect.any(Boolean),
        outputType: expect.any(String)
      })
    )
    expect(JSON.stringify(payload)).not.toContain('systemInstructions')
    expect(JSON.stringify(payload)).not.toContain('systemPrompt')
    expect(JSON.stringify(payload)).not.toContain('execute terminal')
  })

  it('keeps propose-terminal-command behind approval and text-only commands', async () => {
    const response = await POST(
      createJsonRequest(
        JSON.stringify({
          ownerAccessCode: 'owner-code',
          agentId: 'operator-agent',
          toolId: 'propose-terminal-command',
          input: 'prepare conservative verification commands'
        })
      ) as never
    )
    const payload = await response.json()

    expect(response.status).toBe(200)
    expect(payload.data.result.approval.decision).toBe('requires-approval')
    expect(payload.data.result.requiresHumanApproval).toBe(true)
    expect(payload.data.result.ownerApproval.approvalStatus).toBe('pending')
    expect(payload.data.result.ownerApproval.correlationId).toEqual(expect.any(String))
    expect(payload.data.result.ownerApproval.sessionId).toEqual(expect.any(String))
    expect(payload.data.result.commands.length).toBeGreaterThan(0)
    expect(payload.data.auditEvents.every((event: { actionExecuted: boolean; simulationOnly: boolean }) => event.actionExecuted === false && event.simulationOnly === true)).toBe(true)
    expect(payload.data.auditEvents.some((event: { governanceSource?: string }) => event.governanceSource === 'approval-gate')).toBe(true)
    expect(payload.data.result.commands.every((command: { requiresConfirmation: boolean }) => command.requiresConfirmation)).toBe(
      true
    )
    expect(JSON.stringify(payload)).not.toContain('"executed"')
  })
})
