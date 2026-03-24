import { AskAssistantInput } from '../../../application/dto/AIDTO'
import { AskAIAssistantUseCase } from '../../../application/use-cases/AskAIAssistantUseCase'
import { DEMO_USER_ID } from '../../../shared/demoUser'
import { ApiResponse } from '../../../shared/types/ApiResponse'
import { ensureMinLength, ensureString } from '../../../shared/utils/validators'
import { handleController } from './ControllerHandler'

export class AIController {
  constructor(private readonly askAIAssistantUseCase: AskAIAssistantUseCase) {}

  async ask(input: AskAssistantInput): Promise<ApiResponse<{ id: string; response: string }>> {
    return handleController(async () => {
      const interaction = await this.askAIAssistantUseCase.execute(input)
      return { id: interaction.id, response: interaction.response }
    })
  }

  async run(input: { input: string }): Promise<ApiResponse<{ id: string; response: string }>> {
    return handleController(async () => {
      ensureString(input.input, 'input')

      const prompt = input.input.trim()
      ensureMinLength(prompt, 5, 'input')

      const interaction = await this.askAIAssistantUseCase.execute({
        userId: DEMO_USER_ID,
        feature: 'assistant',
        prompt
      })

      return { id: interaction.id, response: interaction.response }
    })
  }
}
