import { ApplicationContainer } from '../../src/app/ApplicationContainer'
import { ApiResponse } from '../../src/shared/types/ApiResponse'
import { ensureFailure } from '../helpers/apiAssertions'
import { TestCase } from '../helpers/testRunner'

export function errorHandlingTests(): TestCase[] {
  return [
    {
      name: 'Errores: body invalido y metodo invalido',
      run: async () => {
        const app = new ApplicationContainer()

        const invalidBody = (await app.apiV1Router.handle('/api/v1/users/register', 'not-an-object')) as ApiResponse<{
          id: string
        }>
        ensureFailure(invalidBody, 'VALIDATION_ERROR')

        const invalidMethod = (await app.apiV1Router.handle('/api/v1/catalog/list', {}, 'POST')) as ApiResponse<unknown>
        ensureFailure(invalidMethod, 'VALIDATION_ERROR')
      }
    },
    {
      name: 'Errores: ruta inexistente devuelve NOT_FOUND',
      run: async () => {
        const app = new ApplicationContainer()
        const notFound = (await app.apiV1Router.handle('/api/v1/does-not-exist', {})) as {
          success: boolean
          error?: { code: string }
        }

        if (notFound.success) {
          throw new Error('Expected failure for unknown route')
        }

        if (notFound.error?.code !== 'NOT_FOUND') {
          throw new Error(`Expected NOT_FOUND, got ${notFound.error?.code}`)
        }
      }
    },
    {
      name: 'Errores: validacion de prompt corto en AI',
      run: async () => {
        const app = new ApplicationContainer()

        const user = (await app.apiV1Router.handle('/api/v1/users/register', {
          email: 'errors@example.com',
          displayName: 'Errors User',
          level: 'beginner',
          goals: ['aprender']
        })) as ApiResponse<{ id: string }>

        if (!user.success) {
          throw new Error('Unable to prepare user for AI test')
        }

        const shortPrompt = (await app.apiV1Router.handle('/api/v1/ai/ask', {
          userId: user.data.id,
          feature: 'assistant',
          prompt: 'hey'
        })) as ApiResponse<{ id: string; response: string }>

        ensureFailure(shortPrompt, 'VALIDATION_ERROR')
      }
    },
    {
      name: 'Errores: slug invalido y duracion invalida en leccion',
      run: async () => {
        const app = new ApplicationContainer()

        const course = (await app.apiV1Router.handle('/api/v1/courses/create', {
          slug: 'errores-curso',
          title: 'Errores Curso',
          description: 'Descripcion valida para pruebas de errores de leccion.',
          level: 'beginner'
        })) as ApiResponse<{ id: string }>

        if (!course.success) {
          throw new Error('Unable to prepare course for lesson validation')
        }

        const moduleData = (await app.apiV1Router.handle('/api/v1/modules/create', {
          courseId: course.data.id,
          title: 'Modulo Errores',
          position: 1
        })) as ApiResponse<{ id: string }>

        if (!moduleData.success) {
          throw new Error('Unable to prepare module for lesson validation')
        }

        const invalidSlug = (await app.apiV1Router.handle('/api/v1/lessons/create', {
          moduleId: moduleData.data.id,
          slug: 'Slug Invalido',
          title: 'Leccion con slug malo',
          objective: 'Objetivo suficientemente largo',
          durationMinutes: 20,
          type: 'tutorial',
          content: 'Contenido suficientemente largo para pasar otras validaciones.'
        })) as ApiResponse<{ id: string }>
        ensureFailure(invalidSlug, 'VALIDATION_ERROR')

        const invalidDuration = (await app.apiV1Router.handle('/api/v1/lessons/create', {
          moduleId: moduleData.data.id,
          slug: 'slug-valido',
          title: 'Leccion duracion mala',
          objective: 'Objetivo suficientemente largo',
          durationMinutes: 0,
          type: 'tutorial',
          content: 'Contenido suficientemente largo para pasar otras validaciones.'
        })) as ApiResponse<{ id: string }>
        ensureFailure(invalidDuration, 'VALIDATION_ERROR')
      }
    }
  ]
}
