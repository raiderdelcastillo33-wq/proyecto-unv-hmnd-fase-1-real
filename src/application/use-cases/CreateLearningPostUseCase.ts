import { CreateCommentInput, CreatePostInput } from '../dto/LearningRoomDTO'
import { LearningComment } from '../../domain/entities/LearningComment'
import { LearningPost } from '../../domain/entities/LearningPost'
import { LearningRoomRepository } from '../../domain/repositories/LearningRoomRepository'
import { UserRepository } from '../../domain/repositories/UserRepository'
import { NotFoundError } from '../../shared/errors/AppError'
import { ensureMinLength, ensureString } from '../../shared/utils/validators'
import { createId } from '../../shared/utils/id'

export class CreateLearningPostUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly learningRoomRepository: LearningRoomRepository
  ) {}

  async createPost(input: CreatePostInput): Promise<LearningPost> {
    ensureString(input.title, 'title')
    ensureString(input.body, 'body')

    const normalizedTitle = input.title.trim()
    const normalizedBody = input.body.trim()

    const user = await this.userRepository.findById(input.userId)
    if (!user) {
      throw new NotFoundError('User not found')
    }

    ensureMinLength(normalizedTitle, 5, 'title')
    ensureMinLength(normalizedBody, 15, 'body')

    const post: LearningPost = {
      id: createId(),
      userId: input.userId,
      title: normalizedTitle,
      body: normalizedBody,
      createdAt: new Date()
    }

    return this.learningRoomRepository.createPost(post)
  }

  async createComment(input: CreateCommentInput): Promise<LearningComment> {
    ensureString(input.body, 'body')
    const normalizedBody = input.body.trim()

    const user = await this.userRepository.findById(input.userId)
    if (!user) {
      throw new NotFoundError('User not found')
    }

    const post = await this.learningRoomRepository.findPostById(input.postId)
    if (!post) {
      throw new NotFoundError('Post not found')
    }

    ensureMinLength(normalizedBody, 3, 'body')

    const comment: LearningComment = {
      id: createId(),
      postId: input.postId,
      userId: input.userId,
      body: normalizedBody,
      createdAt: new Date()
    }

    return this.learningRoomRepository.createComment(comment)
  }
}
