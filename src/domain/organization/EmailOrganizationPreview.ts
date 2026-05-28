export type EmailPreviewExecutionMode = 'email-preview-only'
export type EmailDraftMode = 'preview-only'

export type EmailSafetyBoundary = {
  simulationOnly: true
  executionMode: EmailPreviewExecutionMode
  actionExecuted: false
  emailSendAccess: false
  emailDeleteAccess: false
  emailMoveAccess: false
  emailReplyAccess: false
  emailDraftMode: EmailDraftMode
  approvalRequired: true
  ownerControlled: true
}

export type EmailCategorySuggestion =
  | 'Work'
  | 'Personal'
  | 'Finance'
  | 'Invoices'
  | 'Urgent'
  | 'Waiting Reply'
  | 'Newsletters'
  | 'Low Priority'
  | 'Review Needed'

export type EmailPrioritySignal = {
  id: string
  label: string
  category: EmailCategorySuggestion
  severity: 'low' | 'medium' | 'high'
  rationale: string
}

export type EmailMetadataPreview = {
  id: string
  from: string
  subject: string
  receivedAt: string
  snippet: string
  categoryHints: EmailCategorySuggestion[]
  requiresReply: boolean
  hasInvoiceSignal: boolean
  isNewsletter: boolean
  isWorkRelated: boolean
  priority: 'low' | 'medium' | 'high'
  simulationOnly: true
}

export type EmailDraftSuggestion = {
  id: string
  emailId: string
  title: string
  draftPreview: string
  emailDraftMode: EmailDraftMode
  actionExecuted: false
}

export type EmailPreviewAuditEvent = {
  id: string
  eventType: 'email-preview-generated' | 'draft-preview-created' | 'email-action-blocked'
  actionExecuted: false
  simulationOnly: true
  governanceSource: 'genio-central'
}

export type EmailOrganizationPreview = {
  id: string
  label: string
  safetyBoundary: EmailSafetyBoundary
  emails: EmailMetadataPreview[]
  prioritySignals: EmailPrioritySignal[]
  categorySuggestions: EmailCategorySuggestion[]
  draftSuggestions: EmailDraftSuggestion[]
  auditEvents: EmailPreviewAuditEvent[]
}

export const EMAIL_ORGANIZATION_PREVIEW_SAFETY: EmailSafetyBoundary = {
  simulationOnly: true,
  executionMode: 'email-preview-only',
  actionExecuted: false,
  emailSendAccess: false,
  emailDeleteAccess: false,
  emailMoveAccess: false,
  emailReplyAccess: false,
  emailDraftMode: 'preview-only',
  approvalRequired: true,
  ownerControlled: true
}
