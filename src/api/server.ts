import { createServer, IncomingMessage, ServerResponse } from 'node:http'
import { ApplicationContainer } from '../app/ApplicationContainer'

const API_PORT = 3000
const app = new ApplicationContainer()

void app.seedBaseResources()

function getAllowedOrigins(): Set<string> {
  const configuredOrigins = process.env.UNV_ALLOWED_ORIGINS
    ?.split(',')
    .map((origin) => origin.trim())
    .filter((origin) => origin.length > 0)

  return new Set(configuredOrigins && configuredOrigins.length > 0 ? configuredOrigins : ['http://localhost:3001'])
}

function setCorsHeaders(request: IncomingMessage, response: ServerResponse): void {
  const origin = request.headers.origin

  if (origin && getAllowedOrigins().has(origin)) {
    response.setHeader('Access-Control-Allow-Origin', origin)
    response.setHeader('Vary', 'Origin')
  }

  response.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type')
}

function sendJson(response: ServerResponse, statusCode: number, payload: unknown): void {
  response.statusCode = statusCode
  response.setHeader('Content-Type', 'application/json; charset=utf-8')
  response.end(JSON.stringify(payload))
}

function getApiStatusCode(payload: unknown): number {
  if (typeof payload !== 'object' || payload === null || !('success' in payload)) {
    return 200
  }

  const responsePayload = payload as {
    success?: unknown
    error?: { code?: unknown }
  }

  if (responsePayload.success === true) {
    return 200
  }

  const errorCode = responsePayload.error?.code

  switch (errorCode) {
    case 'VALIDATION_ERROR':
      return 400
    case 'NOT_FOUND':
      return 404
    case 'CONFLICT':
      return 409
    case 'UNAUTHORIZED':
      return 401
    case 'FORBIDDEN':
      return 403
    case 'INFRASTRUCTURE_ERROR':
      return 503
    default:
      return 500
  }
}

async function readBody(request: IncomingMessage): Promise<unknown> {
  const chunks: Buffer[] = []

  for await (const chunk of request) {
    chunks.push(Buffer.from(chunk))
  }

  if (chunks.length === 0) {
    return {}
  }

  const rawBody = Buffer.concat(chunks).toString('utf-8').trim()
  if (rawBody.length === 0) {
    return {}
  }

  return JSON.parse(rawBody)
}

const server = createServer(async (request, response) => {
  setCorsHeaders(request, response)

  if (!request.url || !request.method) {
    sendJson(response, 400, {
      success: false,
      error: {
        code: 'BAD_REQUEST',
        message: 'Invalid request'
      }
    })
    return
  }

  if (request.method === 'OPTIONS') {
    response.statusCode = 204
    response.end()
    return
  }

  if (request.url === '/health' && request.method === 'GET') {
    sendJson(response, 200, {
      status: 'ok',
      service: 'api-server'
    })
    return
  }

  if (request.url === '/api/health' && request.method === 'GET') {
    sendJson(response, 200, {
      status: 'ok',
      service: 'api-server'
    })
    return
  }

  if (request.url.startsWith('/api/v1/')) {
    try {
      const body = request.method === 'GET' ? {} : await readBody(request)
      const result = await app.apiV1Router.handle(request.url, body, request.method as 'GET' | 'POST')
      sendJson(response, getApiStatusCode(result), result)
      return
    } catch (error) {
      sendJson(response, 500, {
        success: false,
        error: {
          code: 'INTERNAL_SERVER_ERROR',
          message: error instanceof Error ? error.message : 'Unexpected server error'
        }
      })
      return
    }
  }

  sendJson(response, 404, {
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: 'Route not found'
    }
  })
})

server.on('error', (error: NodeJS.ErrnoException) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`API server failed to start (EADDRINUSE): http://localhost:${API_PORT} is already in use.`)
    process.exit(1)
  }

  console.error('API server error:', error)
  process.exit(1)
})

server.listen(API_PORT, '127.0.0.1', () => {
  console.log(`API server ready at http://localhost:${API_PORT}`)
})
