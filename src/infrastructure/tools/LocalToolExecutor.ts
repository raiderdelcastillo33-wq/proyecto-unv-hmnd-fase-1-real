import { AgentRegistry } from '../../domain/agents/AgentRegistry'
import { ApprovalGate } from '../../domain/security/ApprovalGate'
import { ToolRegistry } from '../../domain/tools/ToolRegistry'
import type { ActionProposal, ApprovalResult, Permission } from '../../domain/security/PermissionProfile'
import type { ToolId, ToolRequest, ToolResult } from '../../domain/tools/ToolProfile'

export class LocalToolExecutor {
  private readonly approvalGate = new ApprovalGate()

  async execute(request: ToolRequest): Promise<ToolResult> {
    const agent = AgentRegistry.resolve(request.agentId)
    const tool = ToolRegistry.resolve(request.toolId)
    const approval = this.approvalGate.evaluate(this.createActionProposal(request))

    if (!tool || !ToolRegistry.isAllowedForAgent(agent, request.toolId)) {
      return this.safeResult(
        request.toolId,
        'Tool not available',
        'The requested tool is not available for this agent.',
        ['Choose a tool allowed by the selected agent.', 'No action was run.'],
        approval
      )
    }

    const input = request.input.trim()
    if (!input) {
      return this.safeResult(
        tool.id,
        'Input required',
        'The tool needs a clear input before it can produce a useful proposal.',
        ['Provide a concise objective, error log, or change description.', 'No action was run.'],
        approval
      )
    }

    switch (tool.id) {
      case 'summarize-project-state':
        return this.summarizeProjectState(request, approval)
      case 'propose-terminal-command':
        return this.proposeTerminalCommand(request, approval)
      case 'explain-error-log':
        return this.explainErrorLog(request, approval)
      case 'generate-implementation-plan':
        return this.generateImplementationPlan(request, approval)
      case 'review-risk':
        return this.reviewRisk(request, approval)
      case 'create-checklist':
        return this.createChecklist(request, approval)
    }
  }

  private summarizeProjectState(request: ToolRequest, approval: ApprovalResult): ToolResult {
    return {
      toolId: 'summarize-project-state',
      title: 'Project State Summary',
      summary: `Summary proposal for: ${this.preview(request.input)}`,
      sections: [
        {
          heading: 'Current State',
          items: [this.preview(request.context ?? request.input), 'Identify confirmed facts before planning changes.']
        },
        {
          heading: 'Next Steps',
          items: ['Separate blockers from improvements.', 'Keep verification commands explicit and reversible.']
        }
      ],
      requiresHumanApproval: false,
      riskLevel: 'low',
      approval
    }
  }

  private proposeTerminalCommand(request: ToolRequest, approval: ApprovalResult): ToolResult {
    return {
      toolId: 'propose-terminal-command',
      title: 'Terminal Command Proposal',
      summary: `Verification commands proposed for: ${this.preview(request.input)}`,
      sections: [
        {
          heading: 'Safety',
          items: ['Commands are suggestions only.', 'Review and approve before running anything.']
        }
      ],
      requiresHumanApproval: true,
      riskLevel: 'medium',
      approval,
      commands: [
        {
          command: 'npm test',
          purpose: 'Run backend/domain test suite.',
          riskLevel: 'low',
          requiresConfirmation: true
        },
        {
          command: 'npm run build:api',
          purpose: 'Compile backend TypeScript.',
          riskLevel: 'low',
          requiresConfirmation: true
        },
        {
          command: 'npm --prefix apps/web run test',
          purpose: 'Run frontend test suite.',
          riskLevel: 'low',
          requiresConfirmation: true
        }
      ]
    }
  }

  private explainErrorLog(request: ToolRequest, approval: ApprovalResult): ToolResult {
    return {
      toolId: 'explain-error-log',
      title: 'Error Log Explanation',
      summary: `Debugging proposal for: ${this.preview(request.input)}`,
      sections: [
        {
          heading: 'Likely Cause',
          items: ['Identify the first failing frame or assertion.', 'Compare expected behavior against recent changes.']
        },
        {
          heading: 'Safe Verification',
          items: ['Reproduce with the smallest test or command.', 'Confirm the fix with the related build/test command.']
        }
      ],
      requiresHumanApproval: false,
      riskLevel: 'low',
      approval
    }
  }

  private generateImplementationPlan(request: ToolRequest, approval: ApprovalResult): ToolResult {
    return {
      toolId: 'generate-implementation-plan',
      title: 'Implementation Plan',
      summary: `Implementation plan proposal for: ${this.preview(request.input)}`,
      sections: [
        {
          heading: 'Scope',
          items: ['Keep changes within the approved files.', 'Preserve current public contracts.']
        },
        {
          heading: 'Verification',
          items: ['Run focused tests first.', 'Run full build/test matrix before handoff.']
        },
        {
          heading: 'Rollback',
          items: ['Revert only the files touched by this change.', 'Do not reset unrelated work.']
        }
      ],
      requiresHumanApproval: false,
      riskLevel: 'medium',
      approval
    }
  }

  private reviewRisk(request: ToolRequest, approval: ApprovalResult): ToolResult {
    return {
      toolId: 'review-risk',
      title: 'Risk Review',
      summary: `Risk review proposal for: ${this.preview(request.input)}`,
      sections: [
        {
          heading: 'Risks',
          items: ['Check compatibility with existing routes and tests.', 'Check security, payload size, and fallback behavior.']
        },
        {
          heading: 'Mitigations',
          items: ['Prefer small reversible changes.', 'Add tests around changed behavior.']
        }
      ],
      requiresHumanApproval: false,
      riskLevel: 'medium',
      approval
    }
  }

  private createChecklist(request: ToolRequest, approval: ApprovalResult): ToolResult {
    return {
      toolId: 'create-checklist',
      title: 'Execution Checklist',
      summary: `Checklist proposal for: ${this.preview(request.input)}`,
      sections: [
        {
          heading: 'Checklist',
          items: ['Confirm scope.', 'Apply minimal change.', 'Run verification.', 'Review diff.', 'Prepare commit message.']
        },
        {
          heading: 'Done Criteria',
          items: ['Tests pass.', 'Builds pass.', 'No unrelated files changed.']
        }
      ],
      requiresHumanApproval: false,
      riskLevel: 'low',
      approval
    }
  }

  private safeResult(
    toolId: ToolRequest['toolId'],
    title: string,
    summary: string,
    items: string[],
    approval: ApprovalResult
  ): ToolResult {
    return {
      toolId,
      title,
      summary,
      sections: [
        {
          heading: 'Safe Result',
          items
        }
      ],
      requiresHumanApproval: true,
      riskLevel: 'low',
      approval: {
        ...approval,
        decision: title === 'Tool not available' ? 'forbidden' : approval.decision,
        reason: title === 'Tool not available' ? 'The requested tool is not allowed for this agent.' : approval.reason,
        requiresHumanApproval: true,
        actionExecuted: false
      }
    }
  }

  private createActionProposal(request: ToolRequest): ActionProposal {
    const permission = this.permissionForTool(request.toolId)

    return {
      id: `tool-${request.toolId}`,
      permission,
      title: `Tool proposal: ${request.toolId}`,
      summary: this.preview(request.input || request.context || request.toolId),
      riskLevel: permission === 'propose-command' ? 'medium' : 'low',
      ...(request.agentId ? { requestedByAgentId: request.agentId } : {})
    }
  }

  private permissionForTool(toolId: ToolId | string): Permission {
    switch (toolId) {
      case 'summarize-project-state':
      case 'explain-error-log':
        return 'summarize-context'
      case 'propose-terminal-command':
        return 'propose-command'
      case 'generate-implementation-plan':
      case 'create-checklist':
        return 'create-checklist'
      case 'review-risk':
        return 'review-risk'
      default:
        return 'read-secret'
    }
  }

  private preview(value: string): string {
    const normalized = value.trim().replace(/\s+/g, ' ')
    return normalized.length > 120 ? `${normalized.slice(0, 117)}...` : normalized
  }
}
