import { RegisterUserInput } from '../dto/UserDTO'
import { User } from '../../domain/entities/User'
import { UserRepository } from '../../domain/repositories/UserRepository'
import { ConflictError, ValidationError } from '../../shared/errors/AppError'
import { ensureEmail, ensureMinLength, ensureNonEmpty, ensureString } from '../../shared/utils/validators'
import { createId } from '../../shared/utils/id'

export class RegisterUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: RegisterUserInput): Promise<User> {
    ensureString(input.email, 'email')
    ensureString(input.displayName, 'displayName')

    const normalizedEmail = input.email.trim().toLowerCase()
    const normalizedDisplayName = input.displayName.trim()

    ensureEmail(normalizedEmail)
    ensureNonEmpty(normalizedDisplayName, 'displayName')
    ensureMinLength(normalizedDisplayName, 3, 'displayName')

    if (!Array.isArray(input.goals)) {
      throw new ValidationError('goals must be an array', { goals: 'invalid_type' })
    }

    const normalizedGoals = input.goals
      .filter((goal): goal is string => typeof goal === 'string')
      .map((goal) => goal.trim())
      .filter((goal) => goal.length > 0)

    if (normalizedGoals.length === 0) {
      throw new ValidationError('goals must include at least one valid value', { goals: 'empty' })
    }

    const existing = await this.userRepository.findByEmail(normalizedEmail)
    if (existing) {
      throw new ConflictError('User already exists with this email')
    }

    const user: User = {
      id: createId(),
      email: normalizedEmail,
      displayName: normalizedDisplayName,
      role: 'student',
      level: input.level,
      goals: normalizedGoals,
      createdAt: new Date()
    }

    return this.userRepository.create(user)
  }
}
