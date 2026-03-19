import { AddLessonStepInput, CreateLessonInput } from '../dto/CourseDTO'
import { Lesson } from '../../domain/entities/Lesson'
import { LessonStep } from '../../domain/entities/LessonStep'
import { CourseRepository } from '../../domain/repositories/CourseRepository'
import { ConflictError, NotFoundError } from '../../shared/errors/AppError'
import {
  ensureMinLength,
  ensureNonEmpty,
  ensurePositiveInteger,
  ensureSlug,
  ensureString
} from '../../shared/utils/validators'
import { createId } from '../../shared/utils/id'

export class CreateLessonUseCase {
  constructor(private readonly courseRepository: CourseRepository) {}

  async createLesson(input: CreateLessonInput): Promise<Lesson> {
    ensureString(input.moduleId, 'moduleId')
    ensureString(input.slug, 'slug')
    ensureString(input.title, 'title')
    ensureString(input.objective, 'objective')
    ensureString(input.content, 'content')

    const normalizedSlug = input.slug.trim().toLowerCase()
    const normalizedTitle = input.title.trim()
    const normalizedObjective = input.objective.trim()
    const normalizedContent = input.content.trim()

    ensureNonEmpty(normalizedSlug, 'slug')
    ensureMinLength(normalizedSlug, 3, 'slug')
    ensureSlug(normalizedSlug, 'slug')
    ensureMinLength(normalizedTitle, 4, 'title')
    ensureMinLength(normalizedObjective, 8, 'objective')
    ensureMinLength(normalizedContent, 20, 'content')
    ensurePositiveInteger(input.durationMinutes, 'durationMinutes')

    const module = await this.courseRepository.findModuleById(input.moduleId)
    if (!module) {
      throw new NotFoundError('Module not found')
    }

    const existingLesson = await this.courseRepository.findLessonByModuleAndSlug(
      input.moduleId,
      normalizedSlug
    )
    if (existingLesson) {
      throw new ConflictError('Lesson slug already exists in this module')
    }

    const lesson: Lesson = {
      id: createId(),
      moduleId: input.moduleId,
      slug: normalizedSlug,
      title: normalizedTitle,
      objective: normalizedObjective,
      durationMinutes: input.durationMinutes,
      type: input.type,
      content: normalizedContent,
      createdAt: new Date()
    }

    return this.courseRepository.createLesson(lesson)
  }

  async addStep(input: AddLessonStepInput): Promise<LessonStep> {
    ensureString(input.lessonId, 'lessonId')
    ensureString(input.title, 'title')
    ensureString(input.instruction, 'instruction')

    const normalizedTitle = input.title.trim()
    const normalizedInstruction = input.instruction.trim()

    ensureMinLength(normalizedTitle, 3, 'title')
    ensureMinLength(normalizedInstruction, 10, 'instruction')
    ensurePositiveInteger(input.position, 'position')

    const lesson = await this.courseRepository.findLessonById(input.lessonId)
    if (!lesson) {
      throw new NotFoundError('Lesson not found')
    }

    const existingStep = await this.courseRepository.findStepByLessonAndPosition(
      input.lessonId,
      input.position
    )
    if (existingStep) {
      throw new ConflictError('Step position already exists in this lesson')
    }

    const step: LessonStep = {
      id: createId(),
      lessonId: input.lessonId,
      position: input.position,
      title: normalizedTitle,
      instruction: normalizedInstruction
    }

    return this.courseRepository.addLessonStep(step)
  }
}
