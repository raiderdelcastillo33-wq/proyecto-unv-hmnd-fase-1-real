import assert from 'node:assert'
import { ApplicationContainer } from '../../src/app/ApplicationContainer'
import { ApiResponse } from '../../src/shared/types/ApiResponse'
import { ensureSuccess } from '../helpers/apiAssertions'
import { TestCase } from '../helpers/testRunner'

export function happyPathTests(): TestCase[] {
  return [
    {
      name: 'Happy path: flujo completo de usuario, contenido, progreso y catalogo',
      run: async () => {
        const app = new ApplicationContainer()
        await app.seedBaseResources()

        const user = ensureSuccess(
          (await app.apiV1Router.handle('/api/v1/users/register', {
            email: 'happy@example.com',
            displayName: 'Happy User',
            level: 'beginner',
            goals: ['aprender rapido']
          })) as ApiResponse<{ id: string }>
        )

        const course = ensureSuccess(
          (await app.apiV1Router.handle('/api/v1/courses/create', {
            slug: 'happy-path-course',
            title: 'Happy Path Course',
            description: 'Curso completo para validar el camino principal.',
            level: 'beginner'
          })) as ApiResponse<{ id: string }>
        )

        const moduleData = ensureSuccess(
          (await app.apiV1Router.handle('/api/v1/modules/create', {
            courseId: course.id,
            title: 'Modulo Inicial',
            position: 1
          })) as ApiResponse<{ id: string }>
        )

        const lesson = ensureSuccess(
          (await app.apiV1Router.handle('/api/v1/lessons/create', {
            moduleId: moduleData.id,
            slug: 'leccion-principal',
            title: 'Leccion Principal',
            objective: 'Entender flujo completo de aprendizaje.',
            durationMinutes: 30,
            type: 'tutorial',
            content: 'Contenido suficientemente largo para pasar la validacion del sistema base.'
          })) as ApiResponse<{ id: string }>
        )

        ensureSuccess(
          (await app.apiV1Router.handle('/api/v1/lessons/steps/add', {
            lessonId: lesson.id,
            position: 1,
            title: 'Paso Inicial',
            instruction: 'Define objetivos y revisa la estructura del proyecto.'
          })) as ApiResponse<{ id: string }>
        )

        ensureSuccess(
          (await app.apiV1Router.handle('/api/v1/progress/complete', {
            userId: user.id,
            lessonId: lesson.id
          })) as ApiResponse<{ id: string }>
        )

        const ai = ensureSuccess(
          (await app.apiV1Router.handle('/api/v1/ai/ask', {
            userId: user.id,
            feature: 'assistant',
            prompt: 'Dame un plan de estudio semanal'
          })) as ApiResponse<{ id: string; response: string }>
        )

        assert.ok(ai.response.length > 0)

        const catalog = ensureSuccess(
          (await app.apiV1Router.handle('/api/v1/catalog/list', {}, 'GET')) as ApiResponse<{
            items: Array<{ course: { id: string } }>
            resources: Array<{ id: string }>
          }>
        )

        assert.ok(catalog.items.length >= 1)
        assert.ok(catalog.resources.length >= 2)
      }
    }
  ]
}
