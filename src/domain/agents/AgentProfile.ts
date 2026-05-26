import type { AIFeature } from '../services/AIProvider'

export type AgentId =
  | 'tutor'
  | 'mentor'
  | 'architect'
  | 'course-generator'
  | 'cuba-education-assistant'

export interface AgentProfile {
  id: AgentId
  name: string
  purpose: string
  systemInstructions: string
  safetyRules: string[]
  defaultFeature: AIFeature
}
