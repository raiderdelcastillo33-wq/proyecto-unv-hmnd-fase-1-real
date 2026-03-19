import { AskAIAssistantUseCase } from '../application/use-cases/AskAIAssistantUseCase'
import { AddResourceUseCase } from '../application/use-cases/AddResourceUseCase'
import { CompleteLessonUseCase } from '../application/use-cases/CompleteLessonUseCase'
import { CreateCourseUseCase } from '../application/use-cases/CreateCourseUseCase'
import { CreateLearningPostUseCase } from '../application/use-cases/CreateLearningPostUseCase'
import { CreateLessonUseCase } from '../application/use-cases/CreateLessonUseCase'
import { CreateModuleUseCase } from '../application/use-cases/CreateModuleUseCase'
import { ListLearningCatalogUseCase } from '../application/use-cases/ListLearningCatalogUseCase'
import { RegisterUserUseCase } from '../application/use-cases/RegisterUserUseCase'
import { MockAIProvider } from '../infrastructure/ai/MockAIProvider'
import { InMemoryAIInteractionRepository } from '../infrastructure/in-memory/InMemoryAIInteractionRepository'
import { InMemoryCourseRepository } from '../infrastructure/in-memory/InMemoryCourseRepository'
import { InMemoryLearningRoomRepository } from '../infrastructure/in-memory/InMemoryLearningRoomRepository'
import { InMemoryProgressRepository } from '../infrastructure/in-memory/InMemoryProgressRepository'
import { InMemoryResourceRepository } from '../infrastructure/in-memory/InMemoryResourceRepository'
import { InMemoryUserRepository } from '../infrastructure/in-memory/InMemoryUserRepository'
import { ConsoleLogger } from '../infrastructure/logging/ConsoleLogger'
import { AIController } from '../interfaces/http/controllers/AIController'
import { CourseController } from '../interfaces/http/controllers/CourseController'
import { LearningRoomController } from '../interfaces/http/controllers/LearningRoomController'
import { ProgressController } from '../interfaces/http/controllers/ProgressController'
import { UserController } from '../interfaces/http/controllers/UserController'
import { ApiV1Router } from '../interfaces/http/routing/ApiV1Router'

export class ApplicationContainer {
  readonly logger = new ConsoleLogger()

  private readonly userRepository = new InMemoryUserRepository()
  private readonly courseRepository = new InMemoryCourseRepository()
  private readonly progressRepository = new InMemoryProgressRepository()
  private readonly learningRoomRepository = new InMemoryLearningRoomRepository()
  private readonly resourceRepository = new InMemoryResourceRepository()
  private readonly interactionRepository = new InMemoryAIInteractionRepository()

  private readonly aiProvider = new MockAIProvider()

  private readonly registerUserUseCase = new RegisterUserUseCase(this.userRepository)
  private readonly createCourseUseCase = new CreateCourseUseCase(this.courseRepository)
  private readonly createModuleUseCase = new CreateModuleUseCase(this.courseRepository)
  private readonly createLessonUseCase = new CreateLessonUseCase(this.courseRepository)
  private readonly completeLessonUseCase = new CompleteLessonUseCase(
    this.userRepository,
    this.courseRepository,
    this.progressRepository
  )

  private readonly createLearningPostUseCase = new CreateLearningPostUseCase(
    this.userRepository,
    this.learningRoomRepository
  )

  private readonly listLearningCatalogUseCase = new ListLearningCatalogUseCase(
    this.courseRepository,
    this.resourceRepository
  )

  private readonly askAIAssistantUseCase = new AskAIAssistantUseCase(
    this.userRepository,
    this.aiProvider,
    this.interactionRepository
  )
  private readonly addResourceUseCase = new AddResourceUseCase(this.resourceRepository)

  readonly userController = new UserController(this.registerUserUseCase)

  readonly courseController = new CourseController(
    this.createCourseUseCase,
    this.createModuleUseCase,
    this.createLessonUseCase,
    this.listLearningCatalogUseCase
  )

  readonly learningRoomController = new LearningRoomController(this.createLearningPostUseCase)
  readonly progressController = new ProgressController(this.completeLessonUseCase)
  readonly aiController = new AIController(this.askAIAssistantUseCase)

  readonly apiV1Router = new ApiV1Router(
    this.userController,
    this.courseController,
    this.learningRoomController,
    this.progressController,
    this.aiController
  )

  async seedBaseResources(): Promise<void> {
    await this.addResourceUseCase.execute({
      title: 'Prompt Base para Debug',
      category: 'prompt',
      description: 'Plantilla rápida para detectar errores y proponer pasos de solución.',
      content:
        'Actúa como senior dev. Analiza el error, causa raíz, parche mínimo, prueba rápida y refactor recomendado.'
    })

    await this.addResourceUseCase.execute({
      title: 'Snippet Fetch Seguro',
      category: 'snippet',
      description: 'Ejemplo de fetch con control explícito de errores.',
      content: 'try/catch + validación de status + retorno tipado.'
    })
  }
}
