import { UserRole } from '../value-objects/UserRole'

export interface User {
  id: string
  email: string
  displayName: string
  role: UserRole
  level: 'beginner' | 'intermediate' | 'advanced'
  goals: string[]
  createdAt: Date
}
