import { User } from '../domain/entities/User'

export const DEMO_USER_ID = 'demo-user'

export const DEMO_USER: User = {
  id: DEMO_USER_ID,
  email: 'demo@unv-hmnd.local',
  displayName: 'UNV Demo User',
  role: 'student',
  level: 'intermediate',
  goals: ['Validate the AI demo flow'],
  createdAt: new Date('2026-01-01T00:00:00.000Z')
}
