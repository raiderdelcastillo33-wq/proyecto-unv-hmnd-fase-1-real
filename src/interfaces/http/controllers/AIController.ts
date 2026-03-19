import { AskAssistantInput } from '../../../application/dto/AIDTO'
import { AskAIAssistantUseCase } from '../../../application/use-cases/AskAIAssistantUseCase'
import { ApiResponse } from '../../../shared/types/ApiResponse'
import { handleController } from './ControllerHandler'

export class AIController {
  constructor(private readonly askAIAssistantUseCase: AskAIAssistantUseCase) {}

  async ask(input: AskAssistantInput): Promise<ApiResponse<{ id: string; response: string }>> {
    return handleController(async () => {
      const interaction = await this.askAIAssistantUseCase.execute(input)
      return { id: interaction.id, response: interaction.response }
    })
  }
}
