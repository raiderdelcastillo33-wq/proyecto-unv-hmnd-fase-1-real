import { ApplicationContainer } from './app/ApplicationContainer'
import { ApiFailure, ApiResponse } from './shared/types/ApiResponse'

type SuccessResponse<T> = Extract<ApiResponse<T>, { success: true }>

function unwrap<T>(response: ApiResponse<T>): SuccessResponse<T>['data'] {
  if (!response.success) {
    const error = response as ApiFailure
    throw new Error(`${error.error.code}: ${error.error.message}`)
  }

  return response.data
}

async function main(): Promise<void> {
  const app = new ApplicationContainer()

  await app.seedBaseResources()

  const userResponse = (await app.apiV1Router.handle('/api/v1/users/register', {
    email: 'dreamer@example.com',
    displayName: 'El Sonador',
    level: 'beginner',
    goals: ['aprender con IA', 'conseguir empleo web']
  })) as ApiResponse<{ id: string }>

  const user = unwrap(userResponse)

  const courseResponse = (await app.apiV1Router.handle('/api/v1/courses/create', {
    slug: 'aprende-web-con-ia',
    title: 'Aprende Desarrollo Web con IA',
    description: 'Ruta completa para construir proyectos web con ayuda de IA.',
    level: 'beginner'
  })) as ApiResponse<{ id: string }>

  const course = unwrap(courseResponse)

  const moduleResponse = (await app.apiV1Router.handle('/api/v1/modules/create', {
    courseId: course.id,
    title: 'Fundamentos y Flujo de Trabajo',
    position: 1
  })) as ApiResponse<{ id: string }>

  const moduleItem = unwrap(moduleResponse)

  const lessonResponse = (await app.apiV1Router.handle('/api/v1/lessons/create', {
    moduleId: moduleItem.id,
    slug: 'primer-proyecto-con-ia',
    title: 'Crea tu Primer Proyecto con IA',
    objective: 'Construir una pagina inicial con estructura profesional.',
    durationMinutes: 45,
    type: 'project',
    content: 'Define objetivo, divide tareas, genera primer boceto, refina arquitectura y valida resultados.'
  })) as ApiResponse<{ id: string }>

  const lesson = unwrap(lessonResponse)

  await app.apiV1Router.handle('/api/v1/lessons/steps/add', {
    lessonId: lesson.id,
    position: 1,
    title: 'Define objetivo',
    instruction: 'Escribe alcance, usuario objetivo y resultado esperado del proyecto.'
  })

  await app.apiV1Router.handle('/api/v1/progress/complete', {
    userId: user.id,
    lessonId: lesson.id
  })

  await app.apiV1Router.handle('/api/v1/learning-room/posts/create', {
    userId: user.id,
    title: 'Como mejorar prompts para frontend',
    body: 'Compartan prompts que les ayuden a estructurar mejores componentes y estilos.'
  })

  const aiResponse = (await app.apiV1Router.handle('/api/v1/ai/ask', {
    userId: user.id,
    feature: 'assistant',
    prompt: 'Dame una estrategia para aprender React con IA en 30 dias'
  })) as ApiResponse<{ id: string; response: string }>

  const ai = unwrap(aiResponse)

  const catalogResponse = (await app.apiV1Router.handle('/api/v1/catalog/list', {}, 'GET')) as ApiResponse<unknown>

  console.log('=== DEMO SISTEMA FASE CONSTRUCTOR ===')
  console.log('Usuario ID:', user.id)
  console.log('Leccion ID:', lesson.id)
  console.log('Respuesta IA:', ai.response)
  console.log('Catalogo:', JSON.stringify(catalogResponse, null, 2))
}

main().catch((error: unknown) => {
  if (error instanceof Error) {
    console.error('Fatal error:', error.message)
    process.exitCode = 1
    return
  }

  console.error('Fatal unknown error')
  process.exitCode = 1
})
