import assert from 'node:assert'
import { AskAIAssistantUseCase } from '../../src/application/use-cases/AskAIAssistantUseCase'
import { AskAssistantInput } from '../../src/application/dto/AIDTO'
import { AIInteraction } from '../../src/domain/entities/AIInteraction'
import { User } from '../../src/domain/entities/User'
import { AIInteractionRepository } from '../../src/domain/repositories/AIInteractionRepository'
import { UserRepository } from '../../src/domain/repositories/UserRepository'
import { AIProvider, AIRequest, AIResult } from '../../src/domain/services/AIProvider'
import { AgentRegistry } from '../../src/domain/agents/AgentRegistry'
import { GenioGovernanceRegistry } from '../../src/domain/governance/GenioCentralProfile'
import { approveProposal, createPendingApproval, rejectProposal } from '../../src/domain/security/OwnerApproval'
import { ToolRegistry } from '../../src/domain/tools/ToolRegistry'
import { ApprovalGate } from '../../src/domain/security/ApprovalGate'
import { AIController } from '../../src/interfaces/http/controllers/AIController'
import { FallbackAIProvider } from '../../src/infrastructure/ai/FallbackAIProvider'
import { InMemoryAuditLog } from '../../src/infrastructure/audit/InMemoryAuditLog'
import { LocalToolExecutor } from '../../src/infrastructure/tools/LocalToolExecutor'
import { OpenAIProvider } from '../../src/infrastructure/ai/OpenAIProvider'
import { TestCase } from '../helpers/testRunner'

class FakeUserRepository implements UserRepository {
  constructor(private readonly users: User[]) {}

  async create(user: User): Promise<User> {
    this.users.push(user)
    return user
  }

  async findById(id: string): Promise<User | null> {
    return this.users.find((user) => user.id === id) ?? null
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find((user) => user.email === email) ?? null
  }
}

class FakeInteractionRepository implements AIInteractionRepository {
  public readonly saved: AIInteraction[] = []

  async create(interaction: AIInteraction): Promise<AIInteraction> {
    this.saved.push(interaction)
    return interaction
  }

  async listByUser(userId: string): Promise<AIInteraction[]> {
    return this.saved.filter((item) => item.userId === userId)
  }
}

class SpyAIProvider implements AIProvider {
  public calls: AIRequest[] = []

  constructor(private readonly response: AIResult, private readonly shouldThrow = false) {}

  async generate(request: AIRequest): Promise<AIResult> {
    this.calls.push(request)
    if (this.shouldThrow) {
      throw new Error('provider_down')
    }
    return this.response
  }
}

function createInput(userId: string): AskAssistantInput {
  return {
    userId,
    feature: 'assistant',
    prompt: '  Construye un plan de estudio de TypeScript  '
  }
}

export function mockTests(): TestCase[] {
  return [
    {
      name: 'Mocks: AskAIAssistantUseCase normaliza prompt y guarda interaccion',
      run: async () => {
        const userId = 'user-1'
        const userRepo = new FakeUserRepository([
          {
            id: userId,
            email: 'mock@example.com',
            displayName: 'Mock User',
            role: 'student',
            level: 'beginner',
            goals: ['goal'],
            createdAt: new Date()
          }
        ])

        const interactions = new FakeInteractionRepository()
        const provider = new SpyAIProvider({
          output: 'respuesta mock',
          estimatedCostUsd: 0.42,
          model: 'fake-model'
        })

        const useCase = new AskAIAssistantUseCase(userRepo, provider, interactions)
        const result = await useCase.execute(createInput(userId))

        assert.equal(provider.calls.length, 1)
        assert.equal(provider.calls[0]?.prompt, 'Construye un plan de estudio de TypeScript')
        assert.equal(provider.calls[0]?.agent?.id, 'tutor')
        assert.equal(result.response, 'respuesta mock')
        assert.equal(interactions.saved.length, 1)
      }
    },
    {
      name: 'Agents: AgentRegistry resuelve agentes y fallback default',
      run: async () => {
        assert.equal(AgentRegistry.defaultAgent().id, 'tutor')
        assert.equal(AgentRegistry.resolve('architect').id, 'architect')
        assert.equal(AgentRegistry.resolve('architect-agent').id, 'architect-agent')
        assert.equal(AgentRegistry.resolve('coder-agent').id, 'coder-agent')
        assert.equal(AgentRegistry.resolve('reviewer-agent').id, 'reviewer-agent')
        assert.equal(AgentRegistry.resolve('debugger-agent').id, 'debugger-agent')
        assert.equal(AgentRegistry.resolve('tutor-agent').id, 'tutor-agent')
        assert.equal(AgentRegistry.resolve('operator-agent').id, 'operator-agent')
        assert.equal(AgentRegistry.resolve('agente-inexistente').id, 'tutor')
        assert.equal(AgentRegistry.list().length, 11)
        assert.deepEqual(
          AgentRegistry.list().map((agent) => agent.id),
          [
            'tutor',
            'mentor',
            'architect',
            'course-generator',
            'cuba-education-assistant',
            'architect-agent',
            'coder-agent',
            'reviewer-agent',
            'debugger-agent',
            'tutor-agent',
            'operator-agent'
          ]
        )
        assert.match(AgentRegistry.resolve('operator-agent').systemInstructions, /Never execute/)
        assert.equal(AgentRegistry.resolve('operator-agent').label, 'Operator')
        assert.equal(AgentRegistry.resolve('operator-agent').category, 'operations')
        assert.equal(AgentRegistry.resolve('operator-agent').riskProfile, 'high')
        assert.equal(AgentRegistry.resolve('operator-agent').hierarchyLevel, 'supervisor')
        assert.equal(AgentRegistry.resolve('operator-agent').parentAuthority, 'genio-central')
        assert.ok(AgentRegistry.resolve('operator-agent').approvalRequirements?.some((item) => item.includes('Owner approval')))
        assert.ok(AgentRegistry.resolve('operator-agent').capabilities?.includes('command proposal'))
        assert.equal(AgentRegistry.resolve('operator-agent').behaviorSummary?.includes('no automatic execution'), true)
      }
    },
    {
      name: 'Governance: GENIO central profile coordinates hierarchy as metadata only',
      run: async () => {
        const genio = GenioGovernanceRegistry.centralProfile()

        assert.equal(genio.id, 'genio-central')
        assert.equal(genio.hierarchyLevel, 'central')
        assert.equal(genio.governanceLevel, 'central-governance')
        assert.equal(genio.approvalAuthority, 'proposal-governance-only')
        assert.equal(genio.simulationOnly, true)
        assert.equal(genio.actionExecuted, false)
        assert.ok(genio.capabilities.includes('coordinate specialist agents'))
        assert.ok(genio.futureCapabilities.some((capability) => capability.id === 'memory-systems'))
        assert.ok(genio.futureCapabilities.some((capability) => capability.id === 'predictive-simulation-engine'))
        assert.ok(genio.strategicVision.personalityTraits.includes('strategic'))
        assert.ok(genio.strategicVision.futureEngines.some((engine) => engine.id === 'life-map-intelligence'))
        assert.ok(genio.strategicVision.reasoningPrinciples.some((principle) => principle.includes('probabilities')))
        assert.ok(genio.strategicVision.predictionBoundaries.includes('GENIO does not know the future.'))
        assert.ok(genio.strategicVision.predictionBoundaries.includes('GENIO does not guarantee outcomes.'))
        assert.ok(genio.lifeMapVision.some((capability) => capability.id === 'life-map-agent'))
        assert.ok(genio.financialStrategyVision.some((capability) => capability.id === 'finance-strategy-agent'))
        assert.ok(genio.governanceMetadata.safetyBoundaries.includes('Proposal != execution.'))
      }
    },
    {
      name: 'Approvals: owner proposal lifecycle remains simulation only',
      run: async () => {
        const pending = createPendingApproval({
          proposalId: 'tool-propose-terminal-command',
          correlationId: 'corr-local',
          sessionId: 'session-local'
        })
        const approved = approveProposal(pending, 'owner', '2026-05-27T00:00:00.000Z')
        const rejected = rejectProposal(approved, 'owner', '2026-05-27T00:01:00.000Z', 'Not safe enough.')
        const blocked = createPendingApproval(
          {
            proposalId: 'tool-blocked',
            correlationId: 'corr-blocked',
            sessionId: 'session-local'
          },
          true
        )

        assert.equal(pending.approvalStatus, 'pending')
        assert.equal(approved.approvalStatus, 'approved')
        assert.equal(rejected.approvalStatus, 'rejected')
        assert.equal(rejected.rejectionReason, 'Not safe enough.')
        assert.equal(approveProposal(blocked, 'owner', '2026-05-27T00:00:00.000Z').approvalStatus, 'blocked')
        assert.equal([pending, approved, rejected, blocked].every((state) => state.actionExecuted === false), true)
        assert.equal([pending, approved, rejected, blocked].every((state) => state.simulationOnly === true), true)
      }
    },
    {
      name: 'Tools: ToolRegistry lista, resuelve y valida permisos por agente',
      run: async () => {
        const tools = ToolRegistry.list()
        const operator = AgentRegistry.resolve('operator-agent')
        const tutor = AgentRegistry.resolve('tutor-agent')

        assert.equal(tools.length, 6)
        assert.deepEqual(
          tools.map((tool) => tool.id),
          [
            'summarize-project-state',
            'propose-terminal-command',
            'explain-error-log',
            'generate-implementation-plan',
            'review-risk',
            'create-checklist'
          ]
        )
        assert.equal(ToolRegistry.resolve('review-risk')?.id, 'review-risk')
        assert.equal(ToolRegistry.resolve('tool-invalida'), null)
        assert.equal(ToolRegistry.isAllowedForAgent(operator, 'propose-terminal-command'), true)
        assert.equal(ToolRegistry.isAllowedForAgent(tutor, 'propose-terminal-command'), false)
        assert.equal(ToolRegistry.isAllowedForAgent(operator, 'tool-invalida'), false)
        assert.equal(ToolRegistry.resolve('propose-terminal-command')?.requiresHumanApproval, true)
        assert.equal(ToolRegistry.resolve('propose-terminal-command')?.requiresApproval, true)
        assert.equal(ToolRegistry.resolve('propose-terminal-command')?.category, 'operations')
        assert.equal(ToolRegistry.resolve('propose-terminal-command')?.outputType, 'command-proposal')
        assert.ok(ToolRegistry.resolve('propose-terminal-command')?.forbiddenActions?.includes('execute-command'))
        assert.equal('executed' in ToolRegistry.resolve('propose-terminal-command')!, false)
      }
    },
    {
      name: 'Audit: InMemoryAuditLog registra eventos seguros en memoria',
      run: async () => {
        const auditLog = new InMemoryAuditLog()

        const first = auditLog.record({
          id: 'audit-1',
          type: 'tool-requested',
          timestamp: '2026-05-27T00:00:00.000Z',
          actionExecuted: false,
          agentId: 'operator-agent',
          toolId: 'propose-terminal-command',
          inputPreview:
            'Analizar sk-test123456 ghp_abcdef token=abc OPENAI_API_KEY=xyz password=123 secret=hidden ' +
            'y continuar con texto largo '.repeat(10)
        })

        const storedEvents = auditLog.list()
        assert.equal(auditLog.list().length, 1)
        assert.equal(storedEvents[0]!.id, first.id)
        assert.equal(storedEvents[0]!.eventId, first.id)
        assert.ok(first.inputPreview)
        assert.ok(first.inputPreview.length <= 120)
        assert.equal(first.inputPreview.includes('sk-test123456'), false)
        assert.equal(first.inputPreview.includes('ghp_abcdef'), false)
        assert.equal(first.inputPreview.includes('OPENAI_API_KEY=xyz'), false)
        assert.equal(first.inputPreview.includes('password=123'), false)
        assert.equal(first.inputPreview.includes('secret=hidden'), false)
        assert.equal(first.actionExecuted, false)
        assert.equal(first.simulationOnly, true)

        for (let index = 0; index < 105; index += 1) {
          auditLog.record({
            id: `audit-overflow-${index}`,
            type: 'tool-result-created',
            timestamp: '2026-05-27T00:00:00.000Z',
            actionExecuted: false
          })
        }

        assert.equal(auditLog.list().length, 100)
        assert.equal(auditLog.list()[0]!.id, 'audit-overflow-5')

        auditLog.clear()
        assert.equal(auditLog.list().length, 0)
      }
    },
    {
      name: 'Tools: LocalToolExecutor devuelve propuestas seguras sin ejecucion',
      run: async () => {
        const auditLog = new InMemoryAuditLog()
        const executor = new LocalToolExecutor(auditLog)

        const allowed = await executor.execute({
          toolId: 'review-risk',
          agentId: 'reviewer-agent',
          input: 'Revisar cambio de seguridad en API'
        })
        const commandProposal = await executor.execute({
          toolId: 'propose-terminal-command',
          agentId: 'operator-agent',
          input: 'Verificar build y tests'
        })
        const blocked = await executor.execute({
          toolId: 'propose-terminal-command',
          agentId: 'tutor-agent',
          input: 'Quiero comandos'
        })
        const invalid = await executor.execute({
          toolId: 'review-risk',
          agentId: 'operator-agent',
          input: '   '
        })
        const invalidTool = await executor.execute({
          toolId: 'tool-invalida' as never,
          agentId: 'operator-agent',
          input: 'Intentar usar una tool inexistente'
        })

        assert.equal(allowed.toolId, 'review-risk')
        assert.equal(allowed.approval?.decision, 'safe')
        assert.equal(allowed.approval?.actionExecuted, false)
        assert.equal(allowed.ownerApproval?.approvalStatus, 'pending')
        assert.equal(allowed.ownerApproval?.actionExecuted, false)
        assert.equal(allowed.commands, undefined)
        assert.equal(commandProposal.approval?.decision, 'requires-approval')
        assert.equal(commandProposal.approval?.actionExecuted, false)
        assert.equal(commandProposal.ownerApproval?.approvalStatus, 'pending')
        assert.equal(commandProposal.ownerApproval?.simulationOnly, true)
        assert.equal(commandProposal.requiresHumanApproval, true)
        assert.ok(commandProposal.commands)
        assert.equal(commandProposal.commands.every((command) => command.requiresConfirmation), true)
        assert.equal(commandProposal.commands.every((command) => !('executed' in command)), true)
        assert.equal(blocked.title, 'Tool not available')
        assert.equal(blocked.approval?.decision, 'forbidden')
        assert.equal(blocked.ownerApproval?.approvalStatus, 'blocked')
        assert.equal(blocked.approval?.actionExecuted, false)
        assert.equal(blocked.commands, undefined)
        assert.equal(blocked.requiresHumanApproval, true)
        assert.equal(invalid.title, 'Input required')
        assert.equal(invalid.approval?.actionExecuted, false)
        assert.equal(invalidTool.title, 'Tool not available')
        assert.equal(invalidTool.approval?.decision, 'forbidden')
        assert.equal(invalidTool.commands, undefined)
        assert.equal(invalidTool.approval?.actionExecuted, false)
        const auditEvents = auditLog.list()
        assert.ok(auditEvents.some((event) => event.type === 'tool-requested'))
        assert.ok(auditEvents.some((event) => event.type === 'approval-evaluated'))
        assert.ok(auditEvents.some((event) => event.type === 'tool-result-created'))
        assert.ok(auditEvents.some((event) => event.type === 'tool-blocked'))
        assert.ok(auditEvents.some((event) => event.type === 'approval-requested'))
        assert.equal(auditEvents.every((event) => event.actionExecuted === false), true)
        assert.equal(auditEvents.every((event) => event.simulationOnly === true), true)
        assert.equal(auditEvents.every((event) => Boolean(event.eventId)), true)
        assert.ok(auditEvents.some((event) => event.actionType === 'approval-evaluated'))
        assert.ok(auditEvents.some((event) => event.approvalStatus === 'requires-approval'))
        assert.ok(auditEvents.some((event) => event.governanceSource === 'approval-gate'))
        assert.ok(auditEvents.some((event) => event.hierarchyLevel === 'supervisor'))
        assert.equal(auditEvents.every((event) => !event.inputPreview || event.inputPreview.length <= 120), true)
        assert.equal(JSON.stringify(auditEvents).includes('executed'), false)
        assert.equal(JSON.stringify([allowed, commandProposal, blocked, invalid, invalidTool]).includes('executed'), false)
      }
    },
    {
      name: 'Security: ApprovalGate clasifica acciones privadas sin ejecutar nada',
      run: async () => {
        const gate = new ApprovalGate()

        const command = gate.evaluate({
          id: 'proposal-command',
          permission: 'execute-command',
          title: 'Run tests',
          summary: 'Request to execute a terminal command.',
          riskLevel: 'high'
        })
        const deleteFile = gate.evaluate({
          id: 'proposal-delete',
          permission: 'delete-file',
          title: 'Delete file',
          summary: 'Request to delete a file.',
          riskLevel: 'critical'
        })
        const sendEmail = gate.evaluate({
          id: 'proposal-email',
          permission: 'send-email',
          title: 'Send email',
          summary: 'Request to send an email.',
          riskLevel: 'critical'
        })
        const checklist = gate.evaluate({
          id: 'proposal-checklist',
          permission: 'create-checklist',
          title: 'Create checklist',
          summary: 'Request to create a checklist.',
          riskLevel: 'low'
        })
        const readSecret = gate.evaluate({
          id: 'proposal-secret',
          permission: 'read-secret',
          title: 'Read secret',
          summary: 'Request to read a secret.',
          riskLevel: 'critical'
        })

        assert.equal(command.decision, 'requires-approval')
        assert.equal(command.requiresHumanApproval, true)
        assert.equal(deleteFile.decision, 'forbidden')
        assert.equal(sendEmail.decision, 'forbidden')
        assert.equal(checklist.decision, 'safe')
        assert.equal(readSecret.decision, 'forbidden')
        assert.equal([command, deleteFile, sendEmail, checklist, readSecret].every((result) => result.actionExecuted === false), true)
      }
    },
    {
      name: 'Agents: AskAIAssistantUseCase pasa agente explicito al proveedor',
      run: async () => {
        const userId = 'user-agent'
        const userRepo = new FakeUserRepository([
          {
            id: userId,
            email: 'agent@example.com',
            displayName: 'Agent User',
            role: 'student',
            level: 'beginner',
            goals: ['architecture'],
            createdAt: new Date()
          }
        ])

        const interactions = new FakeInteractionRepository()
        const provider = new SpyAIProvider({
          output: 'respuesta architect',
          estimatedCostUsd: 0.2,
          model: 'fake-model'
        })

        const useCase = new AskAIAssistantUseCase(userRepo, provider, interactions)
        await useCase.execute({
          ...createInput(userId),
          agentId: 'architect'
        })

        assert.equal(provider.calls.length, 1)
        assert.equal(provider.calls[0]?.agent?.id, 'architect')
      }
    },
    {
      name: 'Agents: AIController.run acepta agentId opcional con fallback seguro',
      run: async () => {
        const userId = 'demo-user'
        const userRepo = new FakeUserRepository([
          {
            id: userId,
            email: 'demo@example.com',
            displayName: 'Demo User',
            role: 'student',
            level: 'beginner',
            goals: ['demo'],
            createdAt: new Date()
          }
        ])
        const interactions = new FakeInteractionRepository()
        const provider = new SpyAIProvider({
          output: 'respuesta controller',
          estimatedCostUsd: 0.1,
          model: 'fake-model'
        })
        const useCase = new AskAIAssistantUseCase(userRepo, provider, interactions)
        const controller = new AIController(useCase)

        await controller.run({
          input: 'Necesito revisar una arquitectura de backend',
          agentId: 'architect',
          context: 'User: contexto previo'
        })
        await controller.run({
          input: 'Necesito ayuda general con mi aprendizaje',
          agentId: 'agente-invalido',
          context: 123
        })
        await controller.run({
          input: 'Necesito ayuda sin agente explicito',
          context: `${'a'.repeat(2100)}tail`
        })

        assert.equal(provider.calls[0]?.agent?.id, 'architect')
        assert.equal(provider.calls[0]?.context, 'User: contexto previo')
        assert.equal(provider.calls[1]?.agent?.id, 'tutor')
        assert.equal(provider.calls[1]?.context, undefined)
        assert.equal(provider.calls[2]?.agent?.id, 'tutor')
        assert.equal(provider.calls[2]?.context?.length, 2000)
        assert.equal(provider.calls[2]?.context?.endsWith('tail'), true)
      }
    },
    {
      name: 'Mocks: AskAIAssistantUseCase propaga error de proveedor externo',
      run: async () => {
        const userId = 'user-2'
        const userRepo = new FakeUserRepository([
          {
            id: userId,
            email: 'mock2@example.com',
            displayName: 'Mock User 2',
            role: 'student',
            level: 'beginner',
            goals: ['goal'],
            createdAt: new Date()
          }
        ])

        const interactions = new FakeInteractionRepository()
        const provider = new SpyAIProvider(
          {
            output: 'unused',
            estimatedCostUsd: 0.1,
            model: 'fake-model'
          },
          true
        )

        const useCase = new AskAIAssistantUseCase(userRepo, provider, interactions)

        let failed = false
        try {
          await useCase.execute(createInput(userId))
        } catch (error) {
          failed = true
          if (!(error instanceof Error)) {
            throw new Error('Expected Error instance')
          }
          assert.equal(error.message, 'provider_down')
        }

        assert.equal(failed, true)
        assert.equal(interactions.saved.length, 0)
      }
    },
    {
      name: 'Providers: FallbackAIProvider usa fallback cuando proveedor primario falla',
      run: async () => {
        const primary = new SpyAIProvider(
          {
            output: 'unused',
            estimatedCostUsd: 0.1,
            model: 'primary'
          },
          true
        )
        const fallback = new SpyAIProvider({
          output: 'respuesta fallback',
          estimatedCostUsd: 0,
          model: 'mock'
        })

        const provider = new FallbackAIProvider(primary, fallback)
        const result = await provider.generate({
          feature: 'assistant',
          prompt: 'Necesito ayuda con TypeScript'
        })

        assert.equal(primary.calls.length, 1)
        assert.equal(fallback.calls.length, 1)
        assert.equal(result.output, 'respuesta fallback')
        assert.equal(result.model, 'mock')
      }
    },
    {
      name: 'Providers: OpenAIProvider normaliza respuesta exitosa',
      run: async () => {
        const calls: RequestInit[] = []
        const fetchFn = (async (_url: string | URL | Request, init?: RequestInit) => {
          calls.push(init ?? {})

          return {
            ok: true,
            json: async () => ({
              choices: [
                {
                  message: {
                    content: '  respuesta openai  '
                  }
                }
              ],
              usage: {
                total_tokens: 100
              }
            })
          } as Response
        }) as typeof fetch

        const provider = new OpenAIProvider({
          apiKey: 'test-key',
          model: 'test-model',
          fetchFn
        })

        const result = await provider.generate({
          feature: 'code-feedback',
          prompt: 'Revisa este componente',
          agent: AgentRegistry.resolve('architect')
        })

        assert.equal(result.output, 'respuesta openai')
        assert.equal(result.model, 'test-model')
        assert.equal(result.estimatedCostUsd, 0.000015)
        assert.equal(calls.length, 1)
        assert.equal((calls[0]?.headers as Record<string, string>).Authorization, 'Bearer test-key')
        const body = JSON.parse(calls[0]?.body as string) as {
          messages: Array<{ role: string; content: string }>
        }
        assert.match(body.messages[0]?.content ?? '', /senior software architect/i)
        assert.match(body.messages[0]?.content ?? '', /Task mode:/)
      }
    }
  ]
}
