import { ListLearningCatalogUseCase } from '../domain/use-cases/ListLearningCatalogUseCase'
import { InMemoryCourseRepository } from '../infrastructure/InMemoryCourseRepository'
import { InMemoryResourceRepository } from '../infrastructure/InMemoryResourceRepository'

export class CourseService {
  private readonly courseRepository = new InMemoryCourseRepository()
  private readonly resourceRepository = new InMemoryResourceRepository()
  private readonly listLearningCatalogUseCase = new ListLearningCatalogUseCase(
    this.courseRepository,
    this.resourceRepository
  )

  async listCatalog() {
    return this.listLearningCatalogUseCase.execute()
  }
}