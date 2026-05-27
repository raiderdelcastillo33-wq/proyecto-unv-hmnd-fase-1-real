import { ApprovalPolicy } from './ApprovalPolicy'
import type { ActionProposal, ApprovalResult } from './PermissionProfile'

export class ApprovalGate {
  evaluate(proposal: ActionProposal): ApprovalResult {
    const decision = ApprovalPolicy.classify(proposal.permission)

    return {
      proposalId: proposal.id,
      permission: proposal.permission,
      decision,
      reason: this.reasonFor(decision, proposal.permission),
      requiresHumanApproval: decision === 'requires-approval',
      actionExecuted: false
    }
  }

  private reasonFor(decision: ApprovalResult['decision'], permission: ActionProposal['permission']): string {
    switch (decision) {
      case 'safe':
        return `${permission} is allowed as a proposal-only action.`
      case 'requires-approval':
        return `${permission} requires explicit human approval before any real-world action.`
      case 'forbidden':
        return `${permission} is forbidden in the private lab safety policy.`
    }
  }
}
