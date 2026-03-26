import assert from 'node:assert'
import { ApplicationContainer } from '../src/app/ApplicationContainer'
import { ApiResponse } from '../src/shared/types/ApiResponse'

function ensureSuccess<T>(response: ApiResponse<T>): T {
  assert.equal(response.success, true)
  return (response as Extract<ApiResponse<T>, { success: true }>).data
}

async function run(): Promise<void> {
  const app = new ApplicationContainer()
  await app.seedBaseResources()

  const userResponse = (await app.apiV1Router.handle('/api/v1/users/register', {
    email: 'test@example.com',
    displayName: 'Test User',
    level: 'beginner',
    goals: ['dominar fundamentos']
  })) as ApiResponse<{ id: string }>

  const user = ensureSuccess(userResponse)
  assert.ok(user.id)

  const aiResponse = (await app.apiV1Router.handle('/api/v1/ai/ask', {
    userId: user.id,
    feature: 'assistant',
    prompt: 'Como practico TypeScript cada dia?'
  })) as ApiResponse<{ id: string; response: string }>

  const ai = ensureSuccess(aiResponse)
  assert.ok(ai.response.length > 0)

  const courseResponse = (await app.apiV1Router.handle('/api/v1/courses/create', {
    slug: 'curso-test',
    title: 'Curso Test',
    description: 'Curso para validar reglas de consistencia.',
    level: 'beginner'
  })) as ApiResponse<{ id: string }>
  const course = ensureSuccess(courseResponse)

  const module1Response = (await app.apiV1Router.handle('/api/v1/modules/create', {
    courseId: course.id,
    title: 'Modulo Base',
    position: 1
  })) as ApiResponse<{ id: string }>
  ensureSuccess(module1Response)

  const duplicateModulePosition = (await app.apiV1Router.handle('/api/v1/modules/create', {
    courseId: course.id,
    title: 'Modulo Duplicado',
    position: 1
  })) as ApiResponse<{ id: string }>
  assert.equal(duplicateModulePosition.success, false)
  if (!duplicateModulePosition.success) {
    assert.equal(duplicateModulePosition.error.code, 'CONFLICT')
  }

  const invalidBodyResponse = (await app.apiV1Router.handle('/api/v1/users/register', 'invalid-body')) as ApiResponse<{
    id: string
  }>
  assert.equal(invalidBodyResponse.success, false)
  if (!invalidBodyResponse.success) {
    assert.equal(invalidBodyResponse.error.code, 'VALIDATION_ERROR')
  }

  const invalidCatalogMethod = (await app.apiV1Router.handle('/api/v1/catalog/list', {}, 'POST')) as ApiResponse<unknown>
  assert.equal(invalidCatalogMethod.success, false)
  if (!invalidCatalogMethod.success) {
    assert.equal(invalidCatalogMethod.error.code, 'VALIDATION_ERROR')
  }

  const notFoundRoute = (await app.apiV1Router.handle('/api/v1/unknown', {})) as {
    success: boolean
    error?: { code: string }
  }

  assert.equal(notFoundRoute.success, false)
  assert.equal(notFoundRoute.error?.code, 'NOT_FOUND')
}

run()
  .then(() => {
    console.log('Smoke test passed')
  })
  .catch((error: unknown) => {
    if (error instanceof Error) {
      console.error(error.message)
      process.exit(1)
      return
    }

    console.error('Unknown test failure')
    process.exit(1)
  })
