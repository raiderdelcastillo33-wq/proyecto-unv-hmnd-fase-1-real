export const privateLabAgents = [
  { id: 'architect-agent', label: 'Architect', description: 'Architecture, risks, and phased technical decisions.' },
  { id: 'coder-agent', label: 'Coder', description: 'Safe implementation proposals and code-oriented plans.' },
  { id: 'reviewer-agent', label: 'Reviewer', description: 'Bug, security, regression, and test review.' },
  { id: 'debugger-agent', label: 'Debugger', description: 'Error analysis, logs, root causes, and verification steps.' },
  { id: 'tutor-agent', label: 'Tutor', description: 'Step-by-step explanations for learning and practice.' },
  { id: 'operator-agent', label: 'Operator', description: 'Operational planning and conservative command proposals.' }
] as const

export const privateLabTools = [
  { id: 'summarize-project-state', label: 'Summarize Project State', description: 'Create a concise state summary.' },
  { id: 'propose-terminal-command', label: 'Propose Terminal Command', description: 'Suggest verification commands as text only.' },
  { id: 'explain-error-log', label: 'Explain Error Log', description: 'Explain likely causes and safe verification steps.' },
  { id: 'generate-implementation-plan', label: 'Generate Implementation Plan', description: 'Prepare a scoped implementation plan.' },
  { id: 'review-risk', label: 'Review Risk', description: 'Review risks, mitigations, and test coverage.' },
  { id: 'create-checklist', label: 'Create Checklist', description: 'Create a practical execution checklist.' }
] as const

export type PrivateLabAgentId = (typeof privateLabAgents)[number]['id']
export type PrivateLabToolId = (typeof privateLabTools)[number]['id']
