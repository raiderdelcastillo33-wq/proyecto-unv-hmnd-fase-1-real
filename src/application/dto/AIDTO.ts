import type { AgentId } from '../../domain/agents/AgentProfile'
import type { AIFeature } from '../../domain/services/AIProvider'

export interface AskAssistantInput {
  userId: string
  feature: AIFeature
  prompt: string
  context?: string
  agentId?: AgentId
}
