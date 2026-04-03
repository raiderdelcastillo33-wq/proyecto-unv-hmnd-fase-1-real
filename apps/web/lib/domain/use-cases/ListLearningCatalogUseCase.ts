import { Course } from '../entities/Course'
import { Lesson } from '../entities/Lesson'
import { CourseModule } from '../entities/Module'
import { Resource } from '../entities/Resource'
import { CourseRepository } from '../repositories/CourseRepository'
import { ResourceRepository } from '../repositories/ResourceRepository'

export interface LearningCatalogItem {
  course: Course
  modules: Array<{
    module: CourseModule
    lessons: Lesson[]
  }>
}

export interface LearningCatalog {
  items: LearningCatalogItem[]
  resources: Resource[]
}

export class ListLearningCatalogUseCase {
  constructor(
    private readonly courseRepository: CourseRepository,
    private readonly resourceRepository: ResourceRepository
  ) {}

  async execute(): Promise<LearningCatalog> {
    const [courses, resources] = await Promise.all([
      this.courseRepository.listPublishedCourses(),
      this.resourceRepository.listAllResources()
    ])

    const courseIds = courses.map(c => c.id)
    const modules = await this.courseRepository.listModulesByCourseBatch(courseIds)

    const moduleIds = modules.map(m => m.id)
    const lessons = await this.courseRepository.listLessonsByModuleBatch(moduleIds)

    // Group lessons by moduleId
    const lessonsByModule = lessons.reduce((acc, lesson) => {
      if (!acc[lesson.moduleId]) {
        acc[lesson.moduleId] = []
      }
      acc[lesson.moduleId].push(lesson)
      return acc
    }, {} as Record<string, Lesson[]>)

    // Group modules by courseId
    const modulesByCourse = modules.reduce((acc, module) => {
      if (!acc[module.courseId]) {
        acc[module.courseId] = []
      }
      acc[module.courseId].push(module)
      return acc
    }, {} as Record<string, CourseModule[]>)

    const items = courses.map(course => ({
      course,
      modules: (modulesByCourse[course.id] || []).map(module => ({
        module,
        lessons: lessonsByModule[module.id] || []
      }))
    }))

    return {
      items,
      resources
    }
  }
}