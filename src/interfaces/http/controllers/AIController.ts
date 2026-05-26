import { AskAssistantInput } from '../../../application/dto/AIDTO'
import { AskAIAssistantUseCase } from '../../../application/use-cases/AskAIAssistantUseCase'
import { DEMO_USER_ID } from '../../../shared/demoUser'
import { ValidationError } from '../../../shared/errors/AppError'
import { ApiResponse } from '../../../shared/types/ApiResponse'
import { ensureMinLength, ensureString } from '../../../shared/utils/validators'
import { handleController } from './ControllerHandler'

export const MAX_AI_INPUT_CHARS = 5_000

export class AIController {
  constructor(private readonly askAIAssistantUseCase: AskAIAssistantUseCase) {}

  async ask(input: AskAssistantInput): Promise<ApiResponse<{ id: string; response: string }>> {
    return handleController(async () => {
      ensureString(input.prompt, 'prompt')
      this.ensureMaxLength(input.prompt.trim(), 'prompt')

      const interaction = await this.askAIAssistantUseCase.execute(input)
      return { id: interaction.id, response: interaction.response }
    })
  }

  async run(input: { input: string }): Promise<ApiResponse<{ id: string; response: string }>> {
    return handleController(async () => {
      ensureString(input.input, 'input')

      const prompt = input.input.trim()
      ensureMinLength(prompt, 5, 'input')
      this.ensureMaxLength(prompt, 'input')

      const interaction = await this.askAIAssistantUseCase.execute({
        userId: DEMO_USER_ID,
        feature: 'assistant',
        prompt
      })

      return { id: interaction.id, response: interaction.response }
    })
  }

  private ensureMaxLength(value: string, field: string): void {
    if (value.length > MAX_AI_INPUT_CHARS) {
      throw new ValidationError(`${field} must be ${MAX_AI_INPUT_CHARS} characters or fewer`, {
        [field]: 'too_long'
      })
    }
  }
}
