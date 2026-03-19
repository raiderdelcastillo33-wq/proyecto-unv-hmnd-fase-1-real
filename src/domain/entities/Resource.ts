export interface Resource {
  id: string
  title: string
  category: 'snippet' | 'tool' | 'prompt' | 'guide'
  description: string
  url?: string
  content?: string
}
