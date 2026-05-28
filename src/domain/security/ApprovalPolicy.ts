import type { ApprovalDecision, Permission } from './PermissionProfile'

const FORBIDDEN_PERMISSIONS: Permission[] = ['delete-file', 'send-email', 'read-secret']
const APPROVAL_REQUIRED_PERMISSIONS: Permission[] = ['execute-command', 'propose-command']
const SAFE_PERMISSIONS: Permission[] = ['create-checklist', 'summarize-context', 'review-risk']

export class ApprovalPolicy {
  static classify(permission: Permission): ApprovalDecision {
    if (FORBIDDEN_PERMISSIONS.includes(permission)) {
      return 'forbidden'
    }

    if (APPROVAL_REQUIRED_PERMISSIONS.includes(permission)) {
      return 'requires-approval'
    }

    if (SAFE_PERMISSIONS.includes(permission)) {
      return 'safe'
    }

    return 'forbidden'
  }
}
