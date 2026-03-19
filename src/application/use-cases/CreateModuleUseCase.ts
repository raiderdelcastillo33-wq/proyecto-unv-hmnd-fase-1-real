import { CreateModuleInput } from '../dto/CourseDTO'
import { CourseRepository } from '../../domain/repositories/CourseRepository'
import { CourseModule } from '../../domain/entities/Module'
import { ConflictError, NotFoundError } from '../../shared/errors/AppError'
import { ensureMinLength, ensurePositiveInteger, ensureString } from '../../shared/utils/validators'
import { createId } from '../../shared/utils/id'

export class CreateModuleUseCase {
  constructor(private readonly courseRepository: CourseRepository) {}

  async execute(input: CreateModuleInput): Promise<CourseModule> {
    ensureString(input.courseId, 'courseId')
    ensureString(input.title, 'title')
    const normalizedTitle = input.title.trim()

    ensureMinLength(normalizedTitle, 4, 'title')
    ensurePositiveInteger(input.position, 'position')

    const course = await this.courseRepository.findCourseById(input.courseId)
    if (!course) {
      throw new NotFoundError('Course not found')
    }

    const existingPosition = await this.courseRepository.findModuleByCourseAndPosition(
      input.courseId,
      input.position
    )
    if (existingPosition) {
      throw new ConflictError('Module position already used in this course')
    }

    const moduleEntity: CourseModule = {
      id: createId(),
      courseId: input.courseId,
      title: normalizedTitle,
      position: input.position
    }

    return this.courseRepository.createModule(moduleEntity)
  }
}
