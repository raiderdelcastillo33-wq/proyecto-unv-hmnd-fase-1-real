import { AddLessonStepInput, CreateCourseInput, CreateLessonInput, CreateModuleInput } from '../../../application/dto/CourseDTO'
import { CreateCourseUseCase } from '../../../application/use-cases/CreateCourseUseCase'
import { CreateLessonUseCase } from '../../../application/use-cases/CreateLessonUseCase'
import { CreateModuleUseCase } from '../../../application/use-cases/CreateModuleUseCase'
import { ListLearningCatalogUseCase } from '../../../application/use-cases/ListLearningCatalogUseCase'
import { ApiResponse } from '../../../shared/types/ApiResponse'
import { handleController } from './ControllerHandler'

export class CourseController {
  constructor(
    private readonly createCourseUseCase: CreateCourseUseCase,
    private readonly createModuleUseCase: CreateModuleUseCase,
    private readonly createLessonUseCase: CreateLessonUseCase,
    private readonly listLearningCatalogUseCase: ListLearningCatalogUseCase
  ) {}

  async createCourse(input: CreateCourseInput): Promise<ApiResponse<{ id: string }>> {
    return handleController(async () => {
      const course = await this.createCourseUseCase.execute(input)
      return { id: course.id }
    })
  }

  async createModule(input: CreateModuleInput): Promise<ApiResponse<{ id: string }>> {
    return handleController(async () => {
      const moduleItem = await this.createModuleUseCase.execute(input)
      return { id: moduleItem.id }
    })
  }

  async createLesson(input: CreateLessonInput): Promise<ApiResponse<{ id: string }>> {
    return handleController(async () => {
      const lesson = await this.createLessonUseCase.createLesson(input)
      return { id: lesson.id }
    })
  }

  async addLessonStep(input: AddLessonStepInput): Promise<ApiResponse<{ id: string }>> {
    return handleController(async () => {
      const step = await this.createLessonUseCase.addStep(input)
      return { id: step.id }
    })
  }

  async catalog(): Promise<ApiResponse<unknown>> {
    return handleController(async () => {
      const catalog = await this.listLearningCatalogUseCase.execute()
      return catalog
    })
  }
}
