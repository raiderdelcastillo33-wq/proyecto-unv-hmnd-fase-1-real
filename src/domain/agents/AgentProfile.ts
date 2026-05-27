import type { AIFeature } from '../services/AIProvider'
import type { ToolId } from '../tools/ToolProfile'

export type AgentId =
  | 'tutor'
  | 'mentor'
  | 'architect'
  | 'course-generator'
  | 'cuba-education-assistant'
  | 'architect-agent'
  | 'coder-agent'
  | 'reviewer-agent'
  | 'debugger-agent'
  | 'tutor-agent'
  | 'operator-agent'

export type AgentCategory = 'education' | 'strategy' | 'architecture' | 'implementation' | 'review' | 'debugging' | 'operations'
export type AgentRiskProfile = 'low' | 'medium' | 'high'

export interface AgentProfile {
  id: AgentId
  name: string
  label?: string
  purpose: string
  description?: string
  category?: AgentCategory
  capabilities?: string[]
  riskProfile?: AgentRiskProfile
  behaviorSummary?: string
  systemPrompt?: string
  systemInstructions: string
  safetyRules: string[]
  defaultFeature: AIFeature
  allowedTools?: ToolId[]
}
