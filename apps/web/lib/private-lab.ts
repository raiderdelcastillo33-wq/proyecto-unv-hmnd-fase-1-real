export type PrivateLabAgentCatalogItem = {
  id: string
  label: string
  description: string
  category: string
  capabilities: string[]
  riskProfile: string
  allowedTools: string[]
}

export type PrivateLabToolCatalogItem = {
  id: string
  label: string
  description: string
  category: string
  riskLevel: string
  requiresApproval: boolean
  outputType: string
  forbiddenActions?: string[]
}

export const privateLabAgents = [
  {
    id: 'architect-agent',
    label: 'Architect',
    description: 'Architecture, risks, and phased technical decisions.',
    category: 'architecture',
    capabilities: ['architecture design', 'risk mapping', 'technical phasing'],
    riskProfile: 'medium',
    allowedTools: ['generate-implementation-plan', 'review-risk', 'create-checklist', 'summarize-project-state']
  },
  {
    id: 'coder-agent',
    label: 'Coder',
    description: 'Safe implementation proposals and code-oriented plans.',
    category: 'implementation',
    capabilities: ['implementation planning', 'typed code guidance', 'test planning'],
    riskProfile: 'medium',
    allowedTools: ['generate-implementation-plan', 'create-checklist', 'review-risk']
  },
  {
    id: 'reviewer-agent',
    label: 'Reviewer',
    description: 'Bug, security, regression, and test review.',
    category: 'review',
    capabilities: ['bug review', 'security review', 'test gap analysis'],
    riskProfile: 'medium',
    allowedTools: ['review-risk', 'explain-error-log', 'create-checklist']
  },
  {
    id: 'debugger-agent',
    label: 'Debugger',
    description: 'Error analysis, logs, root causes, and verification steps.',
    category: 'debugging',
    capabilities: ['log analysis', 'root cause analysis', 'verification planning'],
    riskProfile: 'medium',
    allowedTools: ['explain-error-log', 'propose-terminal-command', 'create-checklist']
  },
  {
    id: 'tutor-agent',
    label: 'Tutor',
    description: 'Step-by-step explanations for learning and practice.',
    category: 'education',
    capabilities: ['technical explanation', 'learning support', 'practice guidance'],
    riskProfile: 'low',
    allowedTools: ['summarize-project-state', 'create-checklist', 'explain-error-log']
  },
  {
    id: 'operator-agent',
    label: 'Operator',
    description: 'Operational planning and conservative command proposals.',
    category: 'operations',
    capabilities: ['task coordination', 'command proposal', 'runbook planning'],
    riskProfile: 'high',
    allowedTools: ['propose-terminal-command', 'create-checklist', 'summarize-project-state', 'review-risk']
  }
] as const satisfies readonly PrivateLabAgentCatalogItem[]

export const privateLabTools = [
  {
    id: 'summarize-project-state',
    label: 'Summarize Project State',
    description: 'Create a concise state summary.',
    category: 'analysis',
    riskLevel: 'low',
    requiresApproval: false,
    outputType: 'summary'
  },
  {
    id: 'propose-terminal-command',
    label: 'Propose Terminal Command',
    description: 'Suggest verification commands as text only.',
    category: 'operations',
    riskLevel: 'medium',
    requiresApproval: true,
    outputType: 'command-proposal'
  },
  {
    id: 'explain-error-log',
    label: 'Explain Error Log',
    description: 'Explain likely causes and safe verification steps.',
    category: 'debugging',
    riskLevel: 'low',
    requiresApproval: false,
    outputType: 'debug-explanation'
  },
  {
    id: 'generate-implementation-plan',
    label: 'Generate Implementation Plan',
    description: 'Prepare a scoped implementation plan.',
    category: 'planning',
    riskLevel: 'medium',
    requiresApproval: false,
    outputType: 'plan'
  },
  {
    id: 'review-risk',
    label: 'Review Risk',
    description: 'Review risks, mitigations, and test coverage.',
    category: 'review',
    riskLevel: 'medium',
    requiresApproval: false,
    outputType: 'risk-review'
  },
  {
    id: 'create-checklist',
    label: 'Create Checklist',
    description: 'Create a practical execution checklist.',
    category: 'planning',
    riskLevel: 'low',
    requiresApproval: false,
    outputType: 'checklist'
  }
] as const satisfies readonly PrivateLabToolCatalogItem[]

export type PrivateLabAgentId = (typeof privateLabAgents)[number]['id']
export type PrivateLabToolId = (typeof privateLabTools)[number]['id']
