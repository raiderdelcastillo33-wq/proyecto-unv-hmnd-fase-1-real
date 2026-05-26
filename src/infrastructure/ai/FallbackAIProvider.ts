import { AIProvider, AIRequest, AIResult } from '../../domain/services/AIProvider'

export class FallbackAIProvider implements AIProvider {
  constructor(
    private readonly primaryProvider: AIProvider,
    private readonly fallbackProvider: AIProvider
  ) {}

  async generate(request: AIRequest): Promise<AIResult> {
    try {
      return await this.primaryProvider.generate(request)
    } catch {
      return this.fallbackProvider.generate(request)
    }
  }
}
