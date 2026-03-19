import { AIController } from '../controllers/AIController'
import { CourseController } from '../controllers/CourseController'
import { LearningRoomController } from '../controllers/LearningRoomController'
import { ProgressController } from '../controllers/ProgressController'
import { UserController } from '../controllers/UserController'
import { ValidationError } from '../../../shared/errors/AppError'
import { failure } from '../../../shared/types/ApiResponse'

type HttpMethod = 'GET' | 'POST'

type RouteDefinition = {
  method: HttpMethod
  requiresBody: boolean
  handler: (body: Record<string, unknown>) => Promise<unknown>
}

export class ApiV1Router {
  private readonly routes: Record<string, RouteDefinition>

  constructor(
    private readonly userController: UserController,
    private readonly courseController: CourseController,
    private readonly learningRoomController: LearningRoomController,
    private readonly progressController: ProgressController,
    private readonly aiController: AIController
  ) {
    this.routes = {
      '/api/v1/users/register': {
        method: 'POST',
        requiresBody: true,
        handler: (body) => this.userController.register(body as never)
      },
      '/api/v1/courses/create': {
        method: 'POST',
        requiresBody: true,
        handler: (body) => this.courseController.createCourse(body as never)
      },
      '/api/v1/modules/create': {
        method: 'POST',
        requiresBody: true,
        handler: (body) => this.courseController.createModule(body as never)
      },
      '/api/v1/lessons/create': {
        method: 'POST',
        requiresBody: true,
        handler: (body) => this.courseController.createLesson(body as never)
      },
      '/api/v1/lessons/steps/add': {
        method: 'POST',
        requiresBody: true,
        handler: (body) => this.courseController.addLessonStep(body as never)
      },
      '/api/v1/catalog/list': {
        method: 'GET',
        requiresBody: false,
        handler: () => this.courseController.catalog()
      },
      '/api/v1/progress/complete': {
        method: 'POST',
        requiresBody: true,
        handler: (body) => this.progressController.completeLesson(body as never)
      },
      '/api/v1/learning-room/posts/create': {
        method: 'POST',
        requiresBody: true,
        handler: (body) => this.learningRoomController.createPost(body as never)
      },
      '/api/v1/learning-room/comments/create': {
        method: 'POST',
        requiresBody: true,
        handler: (body) => this.learningRoomController.createComment(body as never)
      },
      '/api/v1/ai/ask': {
        method: 'POST',
        requiresBody: true,
        handler: (body) => this.aiController.ask(body as never)
      }
    }
  }

  async handle(path: string, body: unknown, method: HttpMethod = 'POST'): Promise<unknown> {
    try {
      const route = this.routes[path]
      if (!route) {
        return {
          success: false,
          error: {
            code: 'NOT_FOUND',
            message: `Route ${path} not found`
          }
        }
      }

      if (method !== route.method) {
        throw new ValidationError(`${path} only supports ${route.method}`, { method: 'invalid' })
      }

      const requestBody = route.requiresBody ? this.toBodyObject(body) : {}
      return route.handler(requestBody)
    } catch (error) {
      return failure(error)
    }
  }

  private toBodyObject(body: unknown): Record<string, unknown> {
    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      throw new ValidationError('Body must be a valid JSON object', { body: 'invalid_type' })
    }

    return body as Record<string, unknown>
  }
}
