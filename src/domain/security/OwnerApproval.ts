export type OwnerApprovalStatus = 'pending' | 'approved' | 'rejected' | 'blocked'

export interface ProposalIdentity {
  proposalId: string
  correlationId: string
  sessionId: string
}

export interface OwnerApprovalState extends ProposalIdentity {
  approvalStatus: OwnerApprovalStatus
  reviewedBy?: string
  reviewTimestamp?: string
  rejectionReason?: string
  simulationOnly: true
  actionExecuted: false
}

export function createPendingApproval(identity: ProposalIdentity, blocked = false): OwnerApprovalState {
  return {
    ...identity,
    approvalStatus: blocked ? 'blocked' : 'pending',
    simulationOnly: true,
    actionExecuted: false
  }
}

export function approveProposal(state: OwnerApprovalState, reviewedBy: string, reviewTimestamp: string): OwnerApprovalState {
  if (state.approvalStatus === 'blocked') {
    return state
  }

  return {
    ...state,
    approvalStatus: 'approved',
    reviewedBy,
    reviewTimestamp,
    simulationOnly: true,
    actionExecuted: false
  }
}

export function rejectProposal(
  state: OwnerApprovalState,
  reviewedBy: string,
  reviewTimestamp: string,
  rejectionReason: string
): OwnerApprovalState {
  if (state.approvalStatus === 'blocked') {
    return state
  }

  return {
    ...state,
    approvalStatus: 'rejected',
    reviewedBy,
    reviewTimestamp,
    rejectionReason,
    simulationOnly: true,
    actionExecuted: false
  }
}
