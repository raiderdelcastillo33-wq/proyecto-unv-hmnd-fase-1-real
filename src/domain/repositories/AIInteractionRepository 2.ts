import { AIInteraction } from '../entities/AIInteraction'

export interface AIInteractionRepository {
  create(interaction: AIInteraction): Promise<AIInteraction>
  listByUser(userId: string): Promise<AIInteraction[]>
}
