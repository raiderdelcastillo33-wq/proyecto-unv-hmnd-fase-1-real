import { CreateCourseInput } from '../dto/CourseDTO'
import { Course } from '../../domain/entities/Course'
import { CourseRepository } from '../../domain/repositories/CourseRepository'
import { ConflictError } from '../../shared/errors/AppError'
import { ensureMinLength, ensureNonEmpty, ensureSlug, ensureString } from '../../shared/utils/validators'
import { createId } from '../../shared/utils/id'

export class CreateCourseUseCase {
  constructor(private readonly courseRepository: CourseRepository) {}

  async execute(input: CreateCourseInput): Promise<Course> {
    ensureString(input.slug, 'slug')
    ensureString(input.title, 'title')
    ensureString(input.description, 'description')

    const normalizedSlug = input.slug.trim().toLowerCase()
    const normalizedTitle = input.title.trim()
    const normalizedDescription = input.description.trim()

    ensureNonEmpty(normalizedSlug, 'slug')
    ensureMinLength(normalizedSlug, 3, 'slug')
    ensureSlug(normalizedSlug, 'slug')
    ensureMinLength(normalizedTitle, 4, 'title')
    ensureMinLength(normalizedDescription, 10, 'description')

    const existingCourse = await this.courseRepository.findCourseBySlug(normalizedSlug)
    if (existingCourse) {
      throw new ConflictError('A course with this slug already exists')
    }

    const course: Course = {
      id: createId(),
      slug: normalizedSlug,
      title: normalizedTitle,
      description: normalizedDescription,
      level: input.level,
      published: true,
      createdAt: new Date()
    }

    return this.courseRepository.createCourse(course)
  }
}
