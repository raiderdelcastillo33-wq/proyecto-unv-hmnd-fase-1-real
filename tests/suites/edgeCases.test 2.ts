import { ApplicationContainer } from '../../src/app/ApplicationContainer'
import { ApiResponse } from '../../src/shared/types/ApiResponse'
import { ensureFailure, ensureSuccess } from '../helpers/apiAssertions'
import { TestCase } from '../helpers/testRunner'

export function edgeCaseTests(): TestCase[] {
  return [
    {
      name: 'Edge: normaliza email y detecta duplicados por mayusculas/espacios',
      run: async () => {
        const app = new ApplicationContainer()

        ensureSuccess(
          (await app.apiV1Router.handle('/api/v1/users/register', {
            email: '  EDGE@Example.com ',
            displayName: 'Edge User',
            level: 'beginner',
            goals: ['goal']
          })) as ApiResponse<{ id: string }>
        )

        const duplicate = (await app.apiV1Router.handle('/api/v1/users/register', {
          email: 'edge@example.com',
          displayName: 'Otro nombre',
          level: 'beginner',
          goals: ['otra meta']
        })) as ApiResponse<{ id: string }>

        ensureFailure(duplicate, 'CONFLICT')
      }
    },
    {
      name: 'Edge: previene posicion duplicada de modulo y paso duplicado de leccion',
      run: async () => {
        const app = new ApplicationContainer()

        const course = ensureSuccess(
          (await app.apiV1Router.handle('/api/v1/courses/create', {
            slug: 'edge-course',
            title: 'Edge Course',
            description: 'Descripcion valida para edge cases de posicion.',
            level: 'beginner'
          })) as ApiResponse<{ id: string }>
        )

        const moduleA = ensureSuccess(
          (await app.apiV1Router.handle('/api/v1/modules/create', {
            courseId: course.id,
            title: 'Modulo A',
            position: 1
          })) as ApiResponse<{ id: string }>
        )

        const duplicateModule = (await app.apiV1Router.handle('/api/v1/modules/create', {
          courseId: course.id,
          title: 'Modulo B',
          position: 1
        })) as ApiResponse<{ id: string }>

        ensureFailure(duplicateModule, 'CONFLICT')

        const lesson = ensureSuccess(
          (await app.apiV1Router.handle('/api/v1/lessons/create', {
            moduleId: moduleA.id,
            slug: 'edge-lesson',
            title: 'Leccion Edge',
            objective: 'Objetivo suficientemente largo',
            durationMinutes: 25,
            type: 'project',
            content: 'Contenido amplio para superar validacion y probar pasos duplicados.'
          })) as ApiResponse<{ id: string }>
        )

        ensureSuccess(
          (await app.apiV1Router.handle('/api/v1/lessons/steps/add', {
            lessonId: lesson.id,
            position: 1,
            title: 'Paso 1',
            instruction: 'Instruccion larga para pasar la validacion minima requerida.'
          })) as ApiResponse<{ id: string }>
        )

        const duplicateStep = (await app.apiV1Router.handle('/api/v1/lessons/steps/add', {
          lessonId: lesson.id,
          position: 1,
          title: 'Paso repetido',
          instruction: 'Otra instruccion larga para validar conflicto de posicion.'
        })) as ApiResponse<{ id: string }>

        ensureFailure(duplicateStep, 'CONFLICT')
      }
    }
  ]
}
