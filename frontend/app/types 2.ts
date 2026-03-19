export type ApiSuccess<T> = { success: true; data: T }
export type ApiFailure = { success: false; error: { code: string; message: string } }
export type ApiResponse<T> = ApiSuccess<T> | ApiFailure

export interface HealthResponse {
  status: 'ok'
  service: string
}

export interface UserResponse {
  id: string
}

export interface AIResponse {
  id: string
  response: string
}

export interface CatalogLesson {
  id: string
  title: string
  objective: string
  durationMinutes: number
  type: string
}

export interface CatalogModule {
  module: {
    id: string
    title: string
    position: number
  }
  lessons: CatalogLesson[]
}

export interface CatalogItem {
  course: {
    id: string
    title: string
    description: string
    level: 'beginner' | 'intermediate' | 'advanced'
  }
  modules: CatalogModule[]
}

export interface CatalogResource {
  id: string
  title: string
  category: 'snippet' | 'tool' | 'prompt' | 'guide'
  description: string
  content?: string
  url?: string
}

export interface CatalogResponse {
  items: CatalogItem[]
  resources: CatalogResource[]
}

export interface RegisterUserPayload {
  email: string
  displayName: string
  level: 'beginner'
  goals: string[]
}

export interface AskAssistantPayload {
  userId: string
  feature: 'assistant'
  prompt: string
}
