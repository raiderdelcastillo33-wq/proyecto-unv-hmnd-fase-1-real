import { AIInteraction } from '../../domain/entities/AIInteraction'
import { AIInteractionRepository } from '../../domain/repositories/AIInteractionRepository'

export class InMemoryAIInteractionRepository implements AIInteractionRepository {
  private interactions: AIInteraction[] = []

  async create(interaction: AIInteraction): Promise<AIInteraction> {
    this.interactions.push(interaction)
    return interaction
  }

  async listByUser(userId: string): Promise<AIInteraction[]> {
    return this.interactions.filter((interaction) => interaction.userId === userId)
  }
}
