export type ApiFailure = {
  success: false
  error: {
    code: string
    message: string
  }
}

export type ApiSuccess<T> = {
  success: true
  data: T
}

export type ApiResponse<T> = ApiSuccess<T> | ApiFailure

export function success<T>(data: T): ApiSuccess<T> {
  return { success: true, data }
}

export function failure(error: unknown): ApiFailure {
  const message = error instanceof Error ? error.message : 'Unknown error'
  return { success: false, error: { code: 'INTERNAL_ERROR', message } }
}