export interface RegisterUserInput {
  email: string
  displayName: string
  level: 'beginner' | 'intermediate' | 'advanced'
  goals: string[]
}
