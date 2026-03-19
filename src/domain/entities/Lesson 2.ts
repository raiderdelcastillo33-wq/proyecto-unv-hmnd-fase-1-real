import { LessonType } from '../value-objects/LessonType'

export interface Lesson {
  id: string
  moduleId: string
  slug: string
  title: string
  objective: string
  durationMinutes: number
  type: LessonType
  content: string
  createdAt: Date
}
