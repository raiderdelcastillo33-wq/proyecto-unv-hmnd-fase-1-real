/** @jest-environment node */

import { getBackendRuntimeInfo } from '@/lib/backend'

type EnvPatch = {
  NODE_ENV?: string
  UNV_API_BASE_URL?: string
  VERCEL?: string
}

function withEnv<T>(patch: EnvPatch, operation: () => T): T {
  const previous = {
    NODE_ENV: process.env.NODE_ENV,
    UNV_API_BASE_URL: process.env.UNV_API_BASE_URL,
    VERCEL: process.env.VERCEL
  }

  for (const [key, value] of Object.entries(patch)) {
    if (value === undefined) {
      delete process.env[key]
    } else {
      process.env[key] = value
    }
  }

  try {
    return operation()
  } finally {
    for (const [key, value] of Object.entries(previous)) {
      if (value === undefined) {
        delete process.env[key]
      } else {
        process.env[key] = value
      }
    }
  }
}

describe('backend runtime URL policy', () => {
  it('keeps localhost available when no backend URL is configured outside production', () => {
    const runtime = withEnv(
      {
        NODE_ENV: 'development',
        UNV_API_BASE_URL: undefined,
        VERCEL: undefined
      },
      () => getBackendRuntimeInfo()
    )

    expect(runtime).toEqual({
      configured: false,
      mode: 'local',
      baseUrl: 'http://127.0.0.1:3000',
      service: 'api-server'
    })
  })

  it('rejects malformed backend URLs and reports missing backend in production', () => {
    const runtime = withEnv(
      {
        NODE_ENV: 'production',
        UNV_API_BASE_URL: 'not-a-url',
        VERCEL: undefined
      },
      () => getBackendRuntimeInfo()
    )

    expect(runtime).toEqual({
      configured: false,
      mode: 'missing',
      baseUrl: null,
      service: 'backend-not-configured'
    })
  })

  it('rejects insecure external backend URLs in production', () => {
    const runtime = withEnv(
      {
        NODE_ENV: 'production',
        UNV_API_BASE_URL: 'http://api.example.com',
        VERCEL: undefined
      },
      () => getBackendRuntimeInfo()
    )

    expect(runtime.mode).toBe('missing')
    expect(runtime.baseUrl).toBeNull()
  })

  it('allows HTTPS backend URLs in production', () => {
    const runtime = withEnv(
      {
        NODE_ENV: 'production',
        UNV_API_BASE_URL: 'https://api.example.com/',
        VERCEL: undefined
      },
      () => getBackendRuntimeInfo()
    )

    expect(runtime).toEqual({
      configured: true,
      mode: 'external',
      baseUrl: 'https://api.example.com',
      service: 'api-server'
    })
  })

  it('allows localhost backend URLs in production-like environments for controlled previews', () => {
    const runtime = withEnv(
      {
        NODE_ENV: 'production',
        UNV_API_BASE_URL: 'http://127.0.0.1:3000',
        VERCEL: undefined
      },
      () => getBackendRuntimeInfo()
    )

    expect(runtime).toEqual({
      configured: true,
      mode: 'external',
      baseUrl: 'http://127.0.0.1:3000',
      service: 'api-server'
    })
  })
})
