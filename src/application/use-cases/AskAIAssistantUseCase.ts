import { AskAssistantInput } from '../dto/AIDTO'
import { AIInteraction } from '../../domain/entities/AIInteraction'
import { AIInteractionRepository } from '../../domain/repositories/AIInteractionRepository'
import { UserRepository } from '../../domain/repositories/UserRepository'
import { AIProvider } from '../../domain/services/AIProvider'
import { NotFoundError } from '../../shared/errors/AppError'
import { ensureMinLength, ensureString } from '../../shared/utils/validators'
import { createId } from '../../shared/utils/id'

export class AskAIAssistantUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly aiProvider: AIProvider,
    private readonly interactionRepository: AIInteractionRepository
  ) {}

  async execute(input: AskAssistantInput): Promise<AIInteraction> {
    ensureString(input.userId, 'userId')
    ensureString(input.prompt, 'prompt')

    const normalizedPrompt = input.prompt.trim()

    const user = await this.userRepository.findById(input.userId)
    if (!user) {
      throw new NotFoundError('User not found')
    }

    ensureMinLength(normalizedPrompt, 5, 'prompt')

    const requestPayload = {
      feature: input.feature,
      prompt: normalizedPrompt
    } as const

    const generated = await this.aiProvider.generate(
      input.context
        ? {
            ...requestPayload,
            context: input.context
          }
        : requestPayload
    )

    const interaction: AIInteraction = {
      id: createId(),
      userId: input.userId,
      feature: input.feature,
      prompt: normalizedPrompt,
      response: generated.output,
      estimatedCostUsd: generated.estimatedCostUsd,
      createdAt: new Date()
    }

    return this.interactionRepository.create(interaction)
  }
}
