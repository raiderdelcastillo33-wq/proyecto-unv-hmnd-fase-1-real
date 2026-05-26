import { AIProvider, AIRequest, AIResult } from '../../domain/services/AIProvider'
import { InfrastructureError } from '../../shared/errors/AppError'

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions'
const DEFAULT_MODEL = 'gpt-4o-mini'
const DEFAULT_TIMEOUT_MS = 30_000

type FetchLike = typeof fetch

export interface OpenAIProviderOptions {
  apiKey: string
  model?: string
  timeoutMs?: number
  fetchFn?: FetchLike
}

export class OpenAIProvider implements AIProvider {
  private readonly apiKey: string
  private readonly model: string
  private readonly timeoutMs: number
  private readonly fetchFn: FetchLike

  constructor(options: OpenAIProviderOptions) {
    const normalizedApiKey = options.apiKey.trim()

    if (!normalizedApiKey) {
      throw new InfrastructureError('OPENAI_API_KEY is required to use OpenAIProvider')
    }

    this.apiKey = normalizedApiKey
    this.model = options.model?.trim() || DEFAULT_MODEL
    this.timeoutMs = options.timeoutMs ?? DEFAULT_TIMEOUT_MS
    this.fetchFn = options.fetchFn ?? fetch
  }

  async generate(request: AIRequest): Promise<AIResult> {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), this.timeoutMs)

    try {
      const response = await this.fetchFn(OPENAI_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: this.model,
          messages: [
            {
              role: 'system',
              content: this.buildSystemInstructions(request)
            },
            {
              role: 'user',
              content: request.context ? `${request.context}\n\n${request.prompt}` : request.prompt
            }
          ],
          max_tokens: 500
        }),
        signal: controller.signal
      })

      if (!response.ok) {
        throw new InfrastructureError(await this.readErrorMessage(response))
      }

      const payload = (await response.json()) as unknown
      const output = this.extractOutputText(payload)

      if (!output) {
        throw new InfrastructureError('OpenAI returned an empty response')
      }

      return {
        output,
        estimatedCostUsd: this.estimateCost(payload),
        model: this.model
      }
    } catch (error) {
      if (error instanceof InfrastructureError) {
        throw error
      }

      if (error instanceof Error && error.name === 'AbortError') {
        throw new InfrastructureError('OpenAI request timed out')
      }

      throw new InfrastructureError(
        error instanceof Error ? error.message : 'Unable to generate OpenAI response'
      )
    } finally {
      clearTimeout(timeout)
    }
  }

  private buildSystemInstructions(request: AIRequest): string {
    const featureInstructions = this.buildFeatureInstructions(request.feature)

    if (request.agent) {
      const safetyRules = request.agent.safetyRules.map((rule) => `- ${rule}`).join('\n')

      return [
        request.agent.systemInstructions,
        `Agent purpose: ${request.agent.purpose}`,
        safetyRules ? `Safety rules:\n${safetyRules}` : '',
        `Task mode: ${featureInstructions}`
      ]
        .filter(Boolean)
        .join('\n\n')
    }

    return featureInstructions
  }

  private buildFeatureInstructions(feature: AIRequest['feature']): string {
    switch (feature) {
      case 'prompt-improver':
        return 'Improve the user prompt with clarity, structure, constraints, and a concise rationale.'
      case 'code-feedback':
        return 'Review code or technical context as a senior engineer. Prioritize correctness, maintainability, and safe next steps.'
      case 'assistant':
        return 'Act as a helpful educational AI assistant for UNV-HMND. Be practical, ethical, concise, and human-centered.'
    }
  }

  private async readErrorMessage(response: Response): Promise<string> {
    try {
      const payload = (await response.json()) as unknown

      if (this.isRecord(payload) && this.isRecord(payload.error) && typeof payload.error.message === 'string') {
        return payload.error.message
      }
    } catch {
      // Fall back to status text below.
    }

    return `OpenAI request failed with status ${response.status}`
  }

  private extractOutputText(payload: unknown): string {
    if (!this.isRecord(payload) || !Array.isArray(payload.choices) || payload.choices.length === 0) {
      return ''
    }

    const choice = payload.choices[0]
    if (!this.isRecord(choice) || !this.isRecord(choice.message)) {
      return ''
    }

    const content = choice.message.content
    return typeof content === 'string' ? content.trim() : ''
  }

  private estimateCost(payload: unknown): number {
    if (!this.isRecord(payload) || !this.isRecord(payload.usage)) {
      return 0
    }

    const totalTokens = payload.usage.total_tokens
    if (typeof totalTokens !== 'number' || !Number.isFinite(totalTokens)) {
      return 0
    }

    return Number((totalTokens * 0.00000015).toFixed(6))
  }

  private isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null && !Array.isArray(value)
  }
}
