import { CompleteLessonInput } from '../dto/ProgressDTO'
import { Progress } from '../../domain/entities/Progress'
import { CourseRepository } from '../../domain/repositories/CourseRepository'
import { ProgressRepository } from '../../domain/repositories/ProgressRepository'
import { UserRepository } from '../../domain/repositories/UserRepository'
import { NotFoundError } from '../../shared/errors/AppError'
import { ensureString } from '../../shared/utils/validators'
import { createId } from '../../shared/utils/id'

export class CompleteLessonUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly courseRepository: CourseRepository,
    private readonly progressRepository: ProgressRepository
  ) {}

  async execute(input: CompleteLessonInput): Promise<Progress> {
    ensureString(input.userId, 'userId')
    ensureString(input.lessonId, 'lessonId')

    const user = await this.userRepository.findById(input.userId)
    if (!user) {
      throw new NotFoundError('User not found')
    }

    const lesson = await this.courseRepository.findLessonById(input.lessonId)
    if (!lesson) {
      throw new NotFoundError('Lesson not found')
    }

    const existing = await this.progressRepository.findByUserAndLesson(input.userId, input.lessonId)

    const record: Progress = {
      id: existing?.id ?? createId(),
      userId: input.userId,
      lessonId: input.lessonId,
      completed: true,
      completedAt: new Date()
    }

    return this.progressRepository.upsert(record)
  }
}
