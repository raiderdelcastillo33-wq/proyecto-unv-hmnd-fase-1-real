import { AIProvider, AIRequest, AIResult } from '../../domain/services/AIProvider'

export class MockAIProvider implements AIProvider {
  async generate(request: AIRequest): Promise<AIResult> {
    const output = `Sugerencia para ${request.feature}: divide tu objetivo en pasos, valida cada paso y automatiza iteraciones.`

    return {
      output,
      estimatedCostUsd: 0.001,
      model: 'mock-gpt'
    }
  }
}
