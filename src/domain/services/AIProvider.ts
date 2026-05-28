import type { AgentProfile } from '../agents/AgentProfile'

export type AIFeature = 'assistant' | 'prompt-improver' | 'code-feedback'

export interface AIRequest {
  feature: AIFeature
  prompt: string
  context?: string
  agent?: AgentProfile
}

export interface AIResult {
  output: string
  estimatedCostUsd: number
  model: string
}

export interface AIProvider {
  generate(request: AIRequest): Promise<AIResult>
}
