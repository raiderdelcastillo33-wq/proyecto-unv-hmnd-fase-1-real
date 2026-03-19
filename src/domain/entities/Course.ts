export interface Course {
  id: string
  slug: string
  title: string
  description: string
  level: 'beginner' | 'intermediate' | 'advanced'
  published: boolean
  createdAt: Date
}
