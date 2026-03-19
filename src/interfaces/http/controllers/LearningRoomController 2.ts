import { CreateCommentInput, CreatePostInput } from '../../../application/dto/LearningRoomDTO'
import { CreateLearningPostUseCase } from '../../../application/use-cases/CreateLearningPostUseCase'
import { ApiResponse } from '../../../shared/types/ApiResponse'
import { handleController } from './ControllerHandler'

export class LearningRoomController {
  constructor(private readonly createLearningPostUseCase: CreateLearningPostUseCase) {}

  async createPost(input: CreatePostInput): Promise<ApiResponse<{ id: string }>> {
    return handleController(async () => {
      const post = await this.createLearningPostUseCase.createPost(input)
      return { id: post.id }
    })
  }

  async createComment(input: CreateCommentInput): Promise<ApiResponse<{ id: string }>> {
    return handleController(async () => {
      const comment = await this.createLearningPostUseCase.createComment(input)
      return { id: comment.id }
    })
  }
}
