import { ValidationError } from '../errors/AppError'

export function ensureString(value: unknown, field: string): asserts value is string {
  if (typeof value !== 'string') {
    throw new ValidationError(`${field} must be a string`, { [field]: 'invalid_type' })
  }
}

export function ensureNonEmpty(value: string, field: string): void {
  if (!value || value.trim().length === 0) {
    throw new ValidationError(`${field} is required`, { [field]: 'required' })
  }
}

export function ensureMinLength(value: string, min: number, field: string): void {
  if (value.trim().length < min) {
    throw new ValidationError(`${field} must have at least ${min} characters`, {
      [field]: `min:${min}`
    })
  }
}

export function ensureEmail(email: string): void {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    throw new ValidationError('Invalid email format', { email: 'invalid' })
  }
}

export function ensurePositiveInteger(value: number, field: string): void {
  if (!Number.isInteger(value) || value <= 0) {
    throw new ValidationError(`${field} must be a positive integer`, {
      [field]: 'invalid_number'
    })
  }
}

export function ensureSlug(slug: string, field: string): void {
  const slugRegex = /^[a-z0-9-]+$/
  if (!slugRegex.test(slug)) {
    throw new ValidationError(`${field} must contain only lowercase letters, numbers, and dashes`, {
      [field]: 'invalid_slug'
    })
  }
}
