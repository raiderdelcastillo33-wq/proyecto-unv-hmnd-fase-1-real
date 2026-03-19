import { CompleteLessonInput } from '../../../application/dto/ProgressDTO'
import { CompleteLessonUseCase } from '../../../application/use-cases/CompleteLessonUseCase'
import { ApiResponse } from '../../../shared/types/ApiResponse'
import { handleController } from './ControllerHandler'

export class ProgressController {
  constructor(private readonly completeLessonUseCase: CompleteLessonUseCase) {}

  async completeLesson(input: CompleteLessonInput): Promise<ApiResponse<{ id: string }>> {
    return handleController(async () => {
      const result = await this.completeLessonUseCase.execute(input)
      return { id: result.id }
    })
  }
}
