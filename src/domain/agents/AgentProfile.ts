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

export interface AgentProfile {
  id: AgentId
  name: string
  purpose: string
  systemInstructions: string
  safetyRules: string[]
  defaultFeature: AIFeature
  allowedTools?: ToolId[]
}
