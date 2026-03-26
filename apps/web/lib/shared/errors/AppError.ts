export class AppError extends Error {
  constructor(message: string, public code: string) {
    super(message)
  }
}

export class ValidationError extends AppError {
  constructor(message: string, public details?: Record<string, unknown>) {
    super(message, 'VALIDATION_ERROR')
  }
}