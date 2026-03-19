import { Course } from '../../domain/entities/Course'
import { Lesson } from '../../domain/entities/Lesson'
import { CourseModule } from '../../domain/entities/Module'
import { Resource } from '../../domain/entities/Resource'
import { CourseRepository } from '../../domain/repositories/CourseRepository'
import { ResourceRepository } from '../../domain/repositories/ResourceRepository'

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
      this.resourceRepository.listByCategory()
    ])

    const items = await Promise.all(
      courses.map(async (course) => {
        const modules = await this.courseRepository.listModulesByCourse(course.id)

        const moduleItems = await Promise.all(
          modules.map(async (module) => {
            const lessons = await this.courseRepository.listLessonsByModule(module.id)
            return { module, lessons }
          })
        )

        return { course, modules: moduleItems }
      })
    )

    return {
      items,
      resources
    }
  }
}
