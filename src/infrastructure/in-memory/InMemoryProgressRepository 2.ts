import { Progress } from '../../domain/entities/Progress'
import { ProgressRepository } from '../../domain/repositories/ProgressRepository'

const makeProgressKey = (userId: string, lessonId: string): string => `${userId}:${lessonId}`

export class InMemoryProgressRepository implements ProgressRepository {
  private readonly progressByKey = new Map<string, Progress>()
  private readonly progressKeysByUser = new Map<string, string[]>()

  async upsert(item: Progress): Promise<Progress> {
    const key = makeProgressKey(item.userId, item.lessonId)
    const exists = this.progressByKey.has(key)

    this.progressByKey.set(key, item)

    if (!exists) {
      const userKeys = this.progressKeysByUser.get(item.userId) ?? []
      userKeys.push(key)
      this.progressKeysByUser.set(item.userId, userKeys)
    }

    return item
  }

  async findByUserAndLesson(userId: string, lessonId: string): Promise<Progress | null> {
    return this.progressByKey.get(makeProgressKey(userId, lessonId)) ?? null
  }

  async listByUser(userId: string): Promise<Progress[]> {
    const userKeys = this.progressKeysByUser.get(userId) ?? []

    return userKeys
      .map((key) => this.progressByKey.get(key))
      .filter((item): item is Progress => Boolean(item))
  }
}
