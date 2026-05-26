import type { AgentProfile } from '../agents/AgentProfile'
import { ToolId, ToolProfile } from './ToolProfile'

const TOOLS: Record<ToolId, ToolProfile> = {
  'summarize-project-state': {
    id: 'summarize-project-state',
    name: 'Summarize Project State',
    purpose: 'Summarize known project status, constraints, risks, and next useful steps.',
    requiresHumanApproval: false,
    riskLevel: 'low'
  },
  'propose-terminal-command': {
    id: 'propose-terminal-command',
    name: 'Propose Terminal Command',
    purpose: 'Prepare terminal commands with explanation and explicit confirmation requirements.',
    requiresHumanApproval: true,
    riskLevel: 'medium'
  },
  'explain-error-log': {
    id: 'explain-error-log',
    name: 'Explain Error Log',
    purpose: 'Analyze errors or logs and propose likely causes with verification steps.',
    requiresHumanApproval: false,
    riskLevel: 'low'
  },
  'generate-implementation-plan': {
    id: 'generate-implementation-plan',
    name: 'Generate Implementation Plan',
    purpose: 'Create phased implementation plans with files, tests, risks, and rollback notes.',
    requiresHumanApproval: false,
    riskLevel: 'medium'
  },
  'review-risk': {
    id: 'review-risk',
    name: 'Review Risk',
    purpose: 'Assess technical, security, operational, and regression risk for a proposed change.',
    requiresHumanApproval: false,
    riskLevel: 'medium'
  },
  'create-checklist': {
    id: 'create-checklist',
    name: 'Create Checklist',
    purpose: 'Create ordered checklists for controlled execution and verification.',
    requiresHumanApproval: false,
    riskLevel: 'low'
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
