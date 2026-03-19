export type ErrorCode =
  | 'VALIDATION_ERROR'
  | 'NOT_FOUND'
  | 'CONFLICT'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'INFRASTRUCTURE_ERROR'
  | 'UNKNOWN_ERROR'

export class AppError extends Error {
  public readonly code: ErrorCode
  public readonly details: Record<string, string> | undefined

  constructor(code: ErrorCode, message: string, details?: Record<string, string>) {
    super(message)
    this.name = 'AppError'
    this.code = code
    this.details = details
  }
}

export class ValidationError extends AppError {
  constructor(message: string, details?: Record<string, string>) {
    super('VALIDATION_ERROR', message, details)
    this.name = 'ValidationError'
  }
}

export class NotFoundError extends AppError {
  constructor(message: string) {
    super('NOT_FOUND', message)
    this.name = 'NotFoundError'
  }
}

export class ConflictError extends AppError {
  constructor(message: string) {
    super('CONFLICT', message)
    this.name = 'ConflictError'
  }
}

export class InfrastructureError extends AppError {
  constructor(message: string) {
    super('INFRASTRUCTURE_ERROR', message)
    this.name = 'InfrastructureError'
  }
}
