import type { AgentProfile } from '../agents/AgentProfile'
import { ToolId, ToolProfile } from './ToolProfile'

const TOOLS: Record<ToolId, ToolProfile> = {
  'summarize-project-state': {
    id: 'summarize-project-state',
    name: 'Summarize Project State',
    label: 'Summarize Project State',
    purpose: 'Summarize known project status, constraints, risks, and next useful steps.',
    description: 'Creates a bounded project state summary without reading files or secrets.',
    category: 'analysis',
    requiresHumanApproval: false,
    requiresApproval: false,
    riskLevel: 'low',
    forbiddenActions: ['read-secrets', 'read-filesystem', 'execute-command'],
    outputType: 'summary'
  },
  'propose-terminal-command': {
    id: 'propose-terminal-command',
    name: 'Propose Terminal Command',
    label: 'Propose Terminal Command',
    purpose: 'Prepare terminal commands with explanation and explicit confirmation requirements.',
    description: 'Suggests conservative verification commands as text only.',
    category: 'operations',
    requiresHumanApproval: true,
    requiresApproval: true,
    riskLevel: 'medium',
    forbiddenActions: ['execute-command', 'delete-file', 'write-filesystem', 'read-secrets'],
    outputType: 'command-proposal'
  },
  'explain-error-log': {
    id: 'explain-error-log',
    name: 'Explain Error Log',
    label: 'Explain Error Log',
    purpose: 'Analyze errors or logs and propose likely causes with verification steps.',
    description: 'Explains pasted errors or logs and proposes safe verification steps.',
    category: 'debugging',
    requiresHumanApproval: false,
    requiresApproval: false,
    riskLevel: 'low',
    forbiddenActions: ['read-filesystem', 'execute-command', 'read-secrets'],
    outputType: 'debug-explanation'
  },
  'generate-implementation-plan': {
    id: 'generate-implementation-plan',
    name: 'Generate Implementation Plan',
    label: 'Generate Implementation Plan',
    purpose: 'Create phased implementation plans with files, tests, risks, and rollback notes.',
    description: 'Creates scoped implementation plans with risks, tests, and rollback notes.',
    category: 'planning',
    requiresHumanApproval: false,
    requiresApproval: false,
    riskLevel: 'medium',
    forbiddenActions: ['write-filesystem', 'execute-command', 'change-dependencies'],
    outputType: 'plan'
  },
  'review-risk': {
    id: 'review-risk',
    name: 'Review Risk',
    label: 'Review Risk',
    purpose: 'Assess technical, security, operational, and regression risk for a proposed change.',
    description: 'Reviews technical, security, operational, and regression risks.',
    category: 'review',
    requiresHumanApproval: false,
    requiresApproval: false,
    riskLevel: 'medium',
    forbiddenActions: ['execute-command', 'write-filesystem', 'read-secrets'],
    outputType: 'risk-review'
  },
  'create-checklist': {
    id: 'create-checklist',
    name: 'Create Checklist',
    label: 'Create Checklist',
    purpose: 'Create ordered checklists for controlled execution and verification.',
    description: 'Creates ordered checklists for safe execution and verification.',
    category: 'planning',
    requiresHumanApproval: false,
    requiresApproval: false,
    riskLevel: 'low',
    forbiddenActions: ['execute-command', 'write-filesystem', 'send-email'],
    outputType: 'checklist'
  }
}

export class ToolRegistry {
  static list(): ToolProfile[] {
    return Object.values(TOOLS)
  }

  static resolve(toolId?: string): ToolProfile | null {
    if (this.isToolId(toolId)) {
      return TOOLS[toolId]
    }

    return null
  }

  static isAllowedForAgent(agent: AgentProfile, toolId?: string): boolean {
    const tool = this.resolve(toolId)

    if (!tool || !agent.allowedTools) {
      return false
    }

    return agent.allowedTools.includes(tool.id)
  }

  private static isToolId(toolId: unknown): toolId is ToolId {
    return typeof toolId === 'string' && Object.prototype.hasOwnProperty.call(TOOLS, toolId)
  }
}
