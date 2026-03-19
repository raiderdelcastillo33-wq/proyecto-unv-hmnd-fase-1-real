import { AppError } from '../errors/AppError'

export interface ApiSuccess<T> {
  success: true
  data: T
}

export interface ApiFailure {
  success: false
  error: {
    code: string
    message: string
    details?: Record<string, string>
  }
}

export type ApiResponse<T> = ApiSuccess<T> | ApiFailure

export function success<T>(data: T): ApiSuccess<T> {
  return { success: true, data }
}

export function failure(error: unknown): ApiFailure {
  if (error instanceof AppError) {
    const errorPayload: ApiFailure['error'] = {
      code: error.code,
      message: error.message
    }

    if (error.details) {
      errorPayload.details = error.details
    }

    return {
      success: false,
      error: errorPayload
    }
  }

  if (error instanceof Error) {
    return {
      success: false,
      error: {
        code: 'UNKNOWN_ERROR',
        message: error.message
      }
    }
  }

  return {
    success: false,
    error: {
      code: 'UNKNOWN_ERROR',
      message: 'Unexpected error'
    }
  }
}
