const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions'
const DEFAULT_OPENAI_MODEL = 'gpt-4o-mini'
const REQUEST_TIMEOUT_MS = 30_000
const MAX_INPUT_CHARS = 5_000

export type AiTask = 'summary' | 'translation' | 'ideas'
export type TranslationLanguage = 'es' | 'en' | 'fr'

export type AiRunInput = {
  task: AiTask
  text: string
  targetLanguage?: TranslationLanguage
}

export type AiRunResult = {
  task: AiTask
  output: string
  model: string
  targetLanguage?: TranslationLanguage
}

export type AiRuntimeInfo = {
  configured: boolean
  provider: string
  model: string
  availableTasks: AiTask[]
  availableLanguages: TranslationLanguage[]
}

const AVAILABLE_TASKS: AiTask[] = ['summary', 'translation', 'ideas']
const AVAILABLE_LANGUAGES: TranslationLanguage[] = ['es', 'en', 'fr']
const LANGUAGE_LABELS: Record<TranslationLanguage, string> = {
  es: 'Spanish',
  en: 'English',
  fr: 'French'
}

class AiServiceError extends Error {
  status: number
  code: string

  constructor(message: string, status = 500, code = 'AI_SERVICE_ERROR') {
    super(message)
    this.name = 'AiServiceError'
    this.status = status
    this.code = code
  }
}

function getConfiguredOpenAiKey(): string | null {
  const apiKey = process.env.OPENAI_API_KEY?.trim()
  return apiKey ? apiKey : null
}

function getModel(): string {
  const configuredModel = process.env.OPENAI_MODEL?.trim()
  return configuredModel || DEFAULT_OPENAI_MODEL
}

function requireOpenAiKey(): string {
  const apiKey = getConfiguredOpenAiKey()

  if (!apiKey) {
    throw new AiServiceError('OPENAI_API_KEY is not configured on the server.', 500, 'OPENAI_KEY_MISSING')
  }

  return apiKey
}

function isTask(value: unknown): value is AiTask {
  return typeof value === 'string' && AVAILABLE_TASKS.includes(value as AiTask)
}

function isTranslationLanguage(value: unknown): value is TranslationLanguage {
  return typeof value === 'string' && AVAILABLE_LANGUAGES.includes(value as TranslationLanguage)
}

function normalizeInput(input: AiRunInput): AiRunInput {
  const text = input.text.trim()

  if (!isTask(input.task)) {
    throw new AiServiceError('Invalid AI task.', 400, 'INVALID_TASK')
  }

  if (!text) {
    throw new AiServiceError('Text input is required.', 400, 'TEXT_REQUIRED')
  }

  if (text.length > MAX_INPUT_CHARS) {
    throw new AiServiceError(`Text input must be ${MAX_INPUT_CHARS} characters or fewer.`, 400, 'TEXT_TOO_LONG')
  }

  if (input.task === 'translation') {
    if (!isTranslationLanguage(input.targetLanguage)) {
      throw new AiServiceError('A valid target language is required for translation.', 400, 'LANGUAGE_REQUIRED')
    }

    return {
      task: input.task,
      text,
      targetLanguage: input.targetLanguage
    }
  }

  return {
    task: input.task,
    text
  }
}

function buildDeveloperInstructions(task: AiTask, targetLanguage?: TranslationLanguage): string {
  switch (task) {
    case 'summary':
      return 'You summarize text clearly for a product demo. Return concise, high-signal prose with no bullet nesting and no prefatory filler.'
    case 'translation':
      return `You translate text faithfully into ${LANGUAGE_LABELS[targetLanguage ?? 'en']}. Keep meaning, tone, and formatting as much as possible.`
    case 'ideas':
      return 'You generate practical, original ideas for product, UX, growth, or technical exploration. Return a compact numbered list with actionable ideas.'
  }
}

function buildUserPrompt(input: AiRunInput): string {
  switch (input.task) {
    case 'summary':
      return `Summarize the following text for a professional product demo:\n\n${input.text}`
    case 'translation':
      return `Translate the following text into ${LANGUAGE_LABELS[input.targetLanguage ?? 'en']}:\n\n${input.text}`
    case 'ideas':
      return `Generate practical and original ideas based on the following topic or context:\n\n${input.text}`
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function extractOutputText(payload: unknown): string {
  if (!isRecord(payload)) {
    return ''
  }

  const choices = payload.choices

  if (!Array.isArray(choices) || choices.length === 0) {
    return ''
  }

  const message = choices[0]

  if (!isRecord(message) || !isRecord(message.message)) {
    return ''
  }

  const content = message.message.content

  if (typeof content === 'string' && content.trim().length > 0) {
    return content.trim()
  }

  return ''
}

async function readErrorMessage(response: Response): Promise<string> {
  try {
    const payload = (await response.json()) as unknown

    if (isRecord(payload) && isRecord(payload.error) && typeof payload.error.message === 'string') {
      return payload.error.message
    }
  } catch {
    // Ignore JSON parsing errors and fallback to status text below.
  }

  return `OpenAI request failed with status ${response.status}`
}

export function getAiRuntimeInfo(): AiRuntimeInfo {
  return {
    configured: getConfiguredOpenAiKey() !== null,
    provider: 'OpenAI Responses API',
    model: getModel(),
    availableTasks: AVAILABLE_TASKS,
    availableLanguages: AVAILABLE_LANGUAGES
  }
}

export function getAiErrorDetails(error: unknown): { message: string; status: number; code: string } {
  if (error instanceof AiServiceError) {
    return {
      message: error.message,
      status: error.status,
      code: error.code
    }
  }

  if (error instanceof Error) {
    return {
      message: error.message,
      status: 500,
      code: 'UNKNOWN_ERROR'
    }
  }

  return {
    message: 'Unknown AI service error.',
    status: 500,
    code: 'UNKNOWN_ERROR'
  }
}

export async function runAiTask(rawInput: AiRunInput): Promise<AiRunResult> {
  const input = normalizeInput(rawInput)
  const apiKey = requireOpenAiKey()
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

  try {
    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: getModel(),
        messages: [
          {
            role: 'system',
            content: buildDeveloperInstructions(input.task, input.targetLanguage)
          },
          {
            role: 'user',
            content: buildUserPrompt(input)
          }
        ],
        max_tokens: input.task === 'ideas' ? 500 : 350
      }),
      signal: controller.signal
    })

    if (!response.ok) {
      throw new AiServiceError(await readErrorMessage(response), response.status, 'OPENAI_REQUEST_FAILED')
    }

    const payload = (await response.json()) as unknown
    const output = extractOutputText(payload)

    if (!output) {
      throw new AiServiceError('OpenAI returned an empty response.', 502, 'EMPTY_OPENAI_RESPONSE')
    }

    return {
      task: input.task,
      output,
      model: getModel(),
      targetLanguage: input.targetLanguage
    }
  } catch (error) {
    if (error instanceof AiServiceError) {
      throw error
    }

    if (error instanceof Error && error.name === 'AbortError') {
      throw new AiServiceError('The AI request timed out.', 504, 'OPENAI_TIMEOUT')
    }

    throw new AiServiceError(
      error instanceof Error ? error.message : 'Failed to contact OpenAI.',
      502,
      'OPENAI_UNAVAILABLE'
    )
  } finally {
    clearTimeout(timeout)
  }
}
