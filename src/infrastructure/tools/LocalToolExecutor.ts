import { AgentRegistry } from '../../domain/agents/AgentRegistry'
import { ApprovalGate } from '../../domain/security/ApprovalGate'
import { createPendingApproval, type ProposalIdentity } from '../../domain/security/OwnerApproval'
import { ToolRegistry } from '../../domain/tools/ToolRegistry'
import type { AuditEventType } from '../../domain/audit/AuditEvent'
import type { ActionProposal, ApprovalResult, Permission } from '../../domain/security/PermissionProfile'
import type { ToolId, ToolRequest, ToolResult } from '../../domain/tools/ToolProfile'
import type { InMemoryAuditLog } from '../audit/InMemoryAuditLog'

export class LocalToolExecutor {
  private readonly approvalGate = new ApprovalGate()
  private auditSequence = 0

  constructor(private readonly auditLog?: InMemoryAuditLog) {}

  async execute(request: ToolRequest): Promise<ToolResult> {
    const agent = AgentRegistry.resolve(request.agentId)
    const tool = ToolRegistry.resolve(request.toolId)
    const approval = this.approvalGate.evaluate(this.createActionProposal(request))

    this.recordAuditEvent('tool-requested', request)
    this.recordAuditEvent('approval-evaluated', request, approval)

    if (!tool || !ToolRegistry.isAllowedForAgent(agent, request.toolId)) {
      const result = this.safeResult(
        request,
        request.toolId,
        'Tool not available',
        'The requested tool is not available for this agent.',
        ['Choose a tool allowed by the selected agent.', 'No action was run.'],
        approval
      )
      this.recordAuditEvent('tool-blocked', request, result.approval, result)
      this.recordAuditEvent('approval-requested', request, result.approval, result)
      return result
    }

    const input = request.input.trim()
    if (!input) {
      const result = this.safeResult(
        request,
        tool.id,
        'Input required',
        'The tool needs a clear input before it can produce a useful proposal.',
        ['Provide a concise objective, error log, or change description.', 'No action was run.'],
        approval
      )
      this.recordAuditEvent('tool-result-created', request, result.approval, result)
      this.recordAuditEvent('approval-requested', request, result.approval, result)
      return result
    }

    let result: ToolResult
    switch (tool.id) {
      case 'summarize-project-state':
        result = this.summarizeProjectState(request, approval)
        break
      case 'propose-terminal-command':
        result = this.proposeTerminalCommand(request, approval)
        break
      case 'explain-error-log':
        result = this.explainErrorLog(request, approval)
        break
      case 'generate-implementation-plan':
        result = this.generateImplementationPlan(request, approval)
        break
      case 'review-risk':
        result = this.reviewRisk(request, approval)
        break
      case 'create-checklist':
        result = this.createChecklist(request, approval)
        break
    }

    this.recordAuditEvent('tool-result-created', request, result.approval, result)
    this.recordAuditEvent('approval-requested', request, result.approval, result)
    return result
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
      approval,
      ownerApproval: createPendingApproval(this.identityFor(request, approval.proposalId))
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
      ownerApproval: createPendingApproval(this.identityFor(request, approval.proposalId)),
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
      approval,
      ownerApproval: createPendingApproval(this.identityFor(request, approval.proposalId))
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
      approval,
      ownerApproval: createPendingApproval(this.identityFor(request, approval.proposalId))
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
      approval,
      ownerApproval: createPendingApproval(this.identityFor(request, approval.proposalId))
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
      approval,
      ownerApproval: createPendingApproval(this.identityFor(request, approval.proposalId))
    }
  }

  private safeResult(
    request: ToolRequest,
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
      },
      ownerApproval: createPendingApproval(this.identityFor(request, approval.proposalId), title === 'Tool not available')
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

  private identityFor(request: ToolRequest, proposalId: string): ProposalIdentity {
    const stableInput = this.preview(request.input || request.context || request.toolId)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
      .slice(0, 48)
    const suffix = stableInput || 'proposal'

    return {
      proposalId: request.proposalId ?? proposalId,
      correlationId: request.correlationId ?? `corr-${request.toolId}-${suffix}`,
      sessionId: request.sessionId ?? 'private-lab-local-session'
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

  private recordAuditEvent(
    type: AuditEventType,
    request: ToolRequest,
    approval?: ApprovalResult,
    result?: ToolResult
  ): void {
    const eventId = `audit-${Date.now()}-${++this.auditSequence}`
    const agent = AgentRegistry.resolve(request.agentId)
    const hierarchyLevel = agent.hierarchyLevel ?? 'utility'

    this.auditLog?.record({
      id: eventId,
      eventId,
      type,
      timestamp: new Date().toISOString(),
      actionExecuted: false,
      simulationOnly: true,
      actionType: type,
      inputPreview: request.input,
      summary: result?.summary ?? `Private lab event: ${type}`,
      governanceSource: approval ? 'approval-gate' : 'genio-central',
      hierarchyLevel,
      metadata: {
        hasContext: Boolean(request.context),
        simulationOnly: true,
        governanceSource: approval ? 'approval-gate' : 'genio-central',
        ...(result ? { sectionCount: result.sections.length, commandCount: result.commands?.length ?? 0 } : {})
      },
      ...(request.agentId ? { agentId: request.agentId } : {}),
      ...(request.toolId ? { toolId: request.toolId } : {}),
      ...(approval
        ? {
            proposalId: approval.proposalId,
            permission: approval.permission,
            decision: approval.decision,
            approvalDecision: approval.decision,
            approvalStatus: result?.ownerApproval?.approvalStatus ?? approval.decision,
            requiresHumanApproval: approval.requiresHumanApproval,
            ...((result?.ownerApproval?.correlationId ?? request.correlationId)
              ? { correlationId: result?.ownerApproval?.correlationId ?? request.correlationId }
              : {}),
            ...((result?.ownerApproval?.sessionId ?? request.sessionId)
              ? { sessionId: result?.ownerApproval?.sessionId ?? request.sessionId }
              : {}),
            ...(approval.decision === 'forbidden' ? { blockedReason: approval.reason } : {})
          }
        : {}),
      ...(result ? { riskLevel: result.riskLevel } : {})
    })
  }

  private preview(value: string): string {
    const normalized = value.trim().replace(/\s+/g, ' ')
    return normalized.length > 120 ? `${normalized.slice(0, 117)}...` : normalized
  }
}
