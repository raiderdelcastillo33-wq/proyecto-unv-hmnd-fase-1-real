export interface AskAssistantInput {
  userId: string
  feature: 'assistant' | 'prompt-improver' | 'code-feedback'
  prompt: string
  context?: string
}
