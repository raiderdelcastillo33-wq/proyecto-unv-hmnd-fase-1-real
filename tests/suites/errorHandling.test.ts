import assert from 'node:assert'
import { IncomingMessage } from 'node:http'
import { ApplicationContainer } from '../../src/app/ApplicationContainer'
import {
  getBodyReadErrorResponse,
  getCorsHeaders,
  getHealthPayload,
  MAX_REQUEST_BODY_BYTES,
  readBody
} from '../../src/api/server'
import { MAX_AI_INPUT_CHARS } from '../../src/interfaces/http/controllers/AIController'
import { ApiResponse } from '../../src/shared/types/ApiResponse'
import { ensureFailure, ensureSuccess } from '../helpers/apiAssertions'
import { TestCase } from '../helpers/testRunner'

function createRequestFromBody(body: string): IncomingMessage {
  return {
    async *[Symbol.asyncIterator]() {
      yield Buffer.from(body)
    }
  } as IncomingMessage
}

async function withEnv<T>(key: string, value: string | undefined, operation: () => Promise<T>): Promise<T> {
  const previous = process.env[key]

  if (value === undefined) {
    delete process.env[key]
  } else {
    process.env[key] = value
  }

  try {
    return await operation()
  } finally {
    if (previous === undefined) {
      delete process.env[key]
    } else {
      process.env[key] = previous
    }
  }
}

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
      name: 'Seguridad API: JSON invalido devuelve error controlado',
      run: async () => {
        let errorResponse: { statusCode: number; payload: unknown } | null = null
        try {
          await readBody(createRequestFromBody('{"input":'))
        } catch (error) {
          errorResponse = getBodyReadErrorResponse(error)
        }

        const payload = errorResponse?.payload as {
          success: boolean
          error?: { code: string; message: string; stack?: string }
        }

        assert.equal(errorResponse?.statusCode, 400)
        assert.equal(payload.success, false)
        assert.equal(payload.error?.code, 'INVALID_JSON')
        assert.equal('stack' in (payload.error ?? {}), false)
      }
    },
    {
      name: 'Seguridad API: payload demasiado grande devuelve 413',
      run: async () => {
        let errorResponse: { statusCode: number; payload: unknown } | null = null
        try {
          await readBody(createRequestFromBody('x'.repeat(MAX_REQUEST_BODY_BYTES + 1)))
        } catch (error) {
          errorResponse = getBodyReadErrorResponse(error)
        }

        const payload = errorResponse?.payload as {
          success: boolean
          error?: { code: string; message: string; stack?: string }
        }

        assert.equal(errorResponse?.statusCode, 413)
        assert.equal(payload.success, false)
        assert.equal(payload.error?.code, 'PAYLOAD_TOO_LARGE')
        assert.equal('stack' in (payload.error ?? {}), false)
      }
    },
    {
      name: 'Seguridad API: input largo se rechaza y input valido sigue funcionando',
      run: async () => {
        const app = new ApplicationContainer()
        await app.seedBaseResources()

        const tooLong = (await app.apiV1Router.handle('/api/v1/run', {
          input: 'a'.repeat(MAX_AI_INPUT_CHARS + 1)
        })) as ApiResponse<{ id: string; response: string }>

        ensureFailure(tooLong, 'VALIDATION_ERROR')

        const valid = (await app.apiV1Router.handle('/api/v1/run', {
          input: 'Necesito una guia segura para estudiar TypeScript'
        })) as ApiResponse<{ id: string; response: string }>

        const data = ensureSuccess(valid)
        assert.equal(typeof data.id, 'string')
        assert.equal(typeof data.response, 'string')
      }
    },
    {
      name: 'Seguridad API: health no filtra datos sensibles',
      run: async () => {
        const payload = getHealthPayload()
        const serialized = JSON.stringify(payload)

        assert.equal(payload.status, 'ok')
        assert.equal(payload.service, 'api-server')
        assert.equal(serialized.includes('OPENAI_API_KEY'), false)
        assert.equal(serialized.includes('sk-'), false)
        assert.equal(serialized.includes('token'), false)
      }
    },
    {
      name: 'Seguridad API: CORS permite origin configurado y no refleja origin no permitido',
      run: async () => {
        await withEnv('UNV_ALLOWED_ORIGINS', 'http://localhost:3001,https://app.unv-hmnd.example', async () => {
          const allowedHeaders = getCorsHeaders('http://localhost:3001')
          const blockedHeaders = getCorsHeaders('https://evil.example')

          assert.equal(allowedHeaders['Access-Control-Allow-Origin'], 'http://localhost:3001')
          assert.equal(allowedHeaders.Vary, 'Origin')
          assert.equal(allowedHeaders['Access-Control-Allow-Methods'], 'GET,POST,OPTIONS')
          assert.equal(allowedHeaders['Access-Control-Allow-Headers'], 'Content-Type')
          assert.equal(blockedHeaders['Access-Control-Allow-Origin'], undefined)
          assert.equal(blockedHeaders.Vary, undefined)
        })
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
