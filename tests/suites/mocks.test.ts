import assert from 'node:assert'
import { AskAIAssistantUseCase } from '../../src/application/use-cases/AskAIAssistantUseCase'
import { AskAssistantInput } from '../../src/application/dto/AIDTO'
import { AIInteraction } from '../../src/domain/entities/AIInteraction'
import { User } from '../../src/domain/entities/User'
import { AIInteractionRepository } from '../../src/domain/repositories/AIInteractionRepository'
import { UserRepository } from '../../src/domain/repositories/UserRepository'
import { AIProvider, AIRequest, AIResult } from '../../src/domain/services/AIProvider'
import { FallbackAIProvider } from '../../src/infrastructure/ai/FallbackAIProvider'
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
        assert.equal(result.response, 'respuesta mock')
        assert.equal(interactions.saved.length, 1)
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
          prompt: 'Revisa este componente'
        })

        assert.equal(result.output, 'respuesta openai')
        assert.equal(result.model, 'test-model')
        assert.equal(result.estimatedCostUsd, 0.000015)
        assert.equal(calls.length, 1)
        assert.equal((calls[0]?.headers as Record<string, string>).Authorization, 'Bearer test-key')
      }
    }
  ]
}
