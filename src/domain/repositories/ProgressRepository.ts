import { Progress } from '../entities/Progress'

export interface ProgressRepository {
  upsert(progress: Progress): Promise<Progress>
  findByUserAndLesson(userId: string, lessonId: string): Promise<Progress | null>
  listByUser(userId: string): Promise<Progress[]>
}
