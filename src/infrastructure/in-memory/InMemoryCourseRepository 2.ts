import { Course } from '../../domain/entities/Course'
import { Lesson } from '../../domain/entities/Lesson'
import { LessonStep } from '../../domain/entities/LessonStep'
import { CourseModule } from '../../domain/entities/Module'
import { CourseRepository } from '../../domain/repositories/CourseRepository'

const makeCoursePositionKey = (courseId: string, position: number): string => `${courseId}:${position}`
const makeModuleSlugKey = (moduleId: string, slug: string): string => `${moduleId}:${slug}`
const makeLessonPositionKey = (lessonId: string, position: number): string => `${lessonId}:${position}`

export class InMemoryCourseRepository implements CourseRepository {
  private readonly coursesById = new Map<string, Course>()
  private readonly courseIdBySlug = new Map<string, string>()

  private readonly modulesById = new Map<string, CourseModule>()
  private readonly moduleIdsByCourse = new Map<string, string[]>()
  private readonly moduleIdByCoursePosition = new Map<string, string>()

  private readonly lessonsById = new Map<string, Lesson>()
  private readonly lessonIdsByModule = new Map<string, string[]>()
  private readonly lessonIdByModuleSlug = new Map<string, string>()

  private readonly stepsById = new Map<string, LessonStep>()
  private readonly stepIdsByLesson = new Map<string, string[]>()
  private readonly stepIdByLessonPosition = new Map<string, string>()

  async createCourse(course: Course): Promise<Course> {
    this.coursesById.set(course.id, course)
    this.courseIdBySlug.set(course.slug, course.id)
    return course
  }

  async createModule(module: CourseModule): Promise<CourseModule> {
    this.modulesById.set(module.id, module)

    const moduleIds = this.moduleIdsByCourse.get(module.courseId) ?? []
    moduleIds.push(module.id)
    this.moduleIdsByCourse.set(module.courseId, moduleIds)

    this.moduleIdByCoursePosition.set(makeCoursePositionKey(module.courseId, module.position), module.id)
    return module
  }

  async createLesson(lesson: Lesson): Promise<Lesson> {
    this.lessonsById.set(lesson.id, lesson)

    const lessonIds = this.lessonIdsByModule.get(lesson.moduleId) ?? []
    lessonIds.push(lesson.id)
    this.lessonIdsByModule.set(lesson.moduleId, lessonIds)

    this.lessonIdByModuleSlug.set(makeModuleSlugKey(lesson.moduleId, lesson.slug), lesson.id)
    return lesson
  }

  async addLessonStep(step: LessonStep): Promise<LessonStep> {
    this.stepsById.set(step.id, step)

    const stepIds = this.stepIdsByLesson.get(step.lessonId) ?? []
    stepIds.push(step.id)
    this.stepIdsByLesson.set(step.lessonId, stepIds)

    this.stepIdByLessonPosition.set(makeLessonPositionKey(step.lessonId, step.position), step.id)
    return step
  }

  async findCourseBySlug(slug: string): Promise<Course | null> {
    const courseId = this.courseIdBySlug.get(slug)
    if (!courseId) {
      return null
    }

    return this.coursesById.get(courseId) ?? null
  }

  async findCourseById(courseId: string): Promise<Course | null> {
    return this.coursesById.get(courseId) ?? null
  }

  async findModuleById(moduleId: string): Promise<CourseModule | null> {
    return this.modulesById.get(moduleId) ?? null
  }

  async findModuleByCourseAndPosition(courseId: string, position: number): Promise<CourseModule | null> {
    const moduleId = this.moduleIdByCoursePosition.get(makeCoursePositionKey(courseId, position))
    if (!moduleId) {
      return null
    }

    return this.modulesById.get(moduleId) ?? null
  }

  async findLessonById(lessonId: string): Promise<Lesson | null> {
    return this.lessonsById.get(lessonId) ?? null
  }

  async findLessonByModuleAndSlug(moduleId: string, slug: string): Promise<Lesson | null> {
    const lessonId = this.lessonIdByModuleSlug.get(makeModuleSlugKey(moduleId, slug))
    if (!lessonId) {
      return null
    }

    return this.lessonsById.get(lessonId) ?? null
  }

  async findStepByLessonAndPosition(lessonId: string, position: number): Promise<LessonStep | null> {
    const stepId = this.stepIdByLessonPosition.get(makeLessonPositionKey(lessonId, position))
    if (!stepId) {
      return null
    }

    return this.stepsById.get(stepId) ?? null
  }

  async listModulesByCourse(courseId: string): Promise<CourseModule[]> {
    const moduleIds = this.moduleIdsByCourse.get(courseId) ?? []
    const modules = moduleIds
      .map((moduleId) => this.modulesById.get(moduleId))
      .filter((moduleItem): moduleItem is CourseModule => Boolean(moduleItem))

    modules.sort((a, b) => a.position - b.position)
    return modules
  }

  async listLessonsByModule(moduleId: string): Promise<Lesson[]> {
    const lessonIds = this.lessonIdsByModule.get(moduleId) ?? []

    return lessonIds
      .map((lessonId) => this.lessonsById.get(lessonId))
      .filter((lesson): lesson is Lesson => Boolean(lesson))
  }

  async listStepsByLesson(lessonId: string): Promise<LessonStep[]> {
    const stepIds = this.stepIdsByLesson.get(lessonId) ?? []
    const steps = stepIds
      .map((stepId) => this.stepsById.get(stepId))
      .filter((step): step is LessonStep => Boolean(step))

    steps.sort((a, b) => a.position - b.position)
    return steps
  }

  async listPublishedCourses(): Promise<Course[]> {
    return [...this.coursesById.values()].filter((course) => course.published)
  }
}
