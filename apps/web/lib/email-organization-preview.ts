export type EmailPreviewExecutionMode = 'email-preview-only'
export type EmailDraftMode = 'preview-only'

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

export type EmailPrioritySignal = {
  id: string
  label: string
  category: EmailCategorySuggestion
  severity: 'low' | 'medium' | 'high'
  rationale: string
}

export type EmailDraftSuggestion = {
  id: string
  emailId: string
  title: string
  draftPreview: string
  emailDraftMode: EmailDraftMode
  actionExecuted: false
}

export type EmailOrganizationPreview = {
  id: string
  label: string
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
  emails: EmailMetadataPreview[]
  inboxChaosSummary: Array<{
    id: string
    label: string
    count: number
    severity: 'low' | 'medium' | 'high'
  }>
  prioritySignals: EmailPrioritySignal[]
  categorySuggestions: Array<{
    category: EmailCategorySuggestion
    count: number
    rationale: string
  }>
  draftSuggestions: EmailDraftSuggestion[]
  checklist: string[]
}

export const simulatedEmailInbox: EmailMetadataPreview[] = [
  {
    id: 'email-001',
    from: 'finance@acme.example',
    subject: 'Invoice May 2026 - payment due',
    receivedAt: '2026-05-27T08:40:00.000Z',
    snippet: 'Attached is the invoice for May. Please review before Friday.',
    categoryHints: ['Finance', 'Invoices', 'Urgent', 'Review Needed'],
    requiresReply: false,
    hasInvoiceSignal: true,
    isNewsletter: false,
    isWorkRelated: true,
    priority: 'high',
    simulationOnly: true
  },
  {
    id: 'email-002',
    from: 'lead@client.example',
    subject: 'Can you confirm the implementation timeline?',
    receivedAt: '2026-05-27T09:15:00.000Z',
    snippet: 'We need a short confirmation before planning the next sprint.',
    categoryHints: ['Work', 'Waiting Reply', 'Urgent'],
    requiresReply: true,
    hasInvoiceSignal: false,
    isNewsletter: false,
    isWorkRelated: true,
    priority: 'high',
    simulationOnly: true
  },
  {
    id: 'email-003',
    from: 'newsletter@product.example',
    subject: 'Weekly AI product trends',
    receivedAt: '2026-05-26T17:30:00.000Z',
    snippet: 'A curated list of product and AI articles for this week.',
    categoryHints: ['Newsletters', 'Low Priority'],
    requiresReply: false,
    hasInvoiceSignal: false,
    isNewsletter: true,
    isWorkRelated: false,
    priority: 'low',
    simulationOnly: true
  },
  {
    id: 'email-004',
    from: 'family@example.com',
    subject: 'Dinner this weekend',
    receivedAt: '2026-05-26T20:10:00.000Z',
    snippet: 'Let me know if Saturday works for you.',
    categoryHints: ['Personal', 'Waiting Reply'],
    requiresReply: true,
    hasInvoiceSignal: false,
    isNewsletter: false,
    isWorkRelated: false,
    priority: 'medium',
    simulationOnly: true
  },
  {
    id: 'email-005',
    from: 'noreply@tool.example',
    subject: 'Your export is ready',
    receivedAt: '2026-05-25T11:02:00.000Z',
    snippet: 'The export you requested is now available for download.',
    categoryHints: ['Review Needed', 'Low Priority'],
    requiresReply: false,
    hasInvoiceSignal: false,
    isNewsletter: false,
    isWorkRelated: true,
    priority: 'medium',
    simulationOnly: true
  }
]

function countByCategory(emails: EmailMetadataPreview[]): Map<EmailCategorySuggestion, number> {
  const counts = new Map<EmailCategorySuggestion, number>()

  emails.forEach((email) => {
    email.categoryHints.forEach((category) => {
      counts.set(category, (counts.get(category) ?? 0) + 1)
    })
  })

  return counts
}

export function createEmailOrganizationPreview(emails: EmailMetadataPreview[] = simulatedEmailInbox): EmailOrganizationPreview {
  const categoryCounts = countByCategory(emails)
  const invoiceCount = emails.filter((email) => email.hasInvoiceSignal).length
  const replyCount = emails.filter((email) => email.requiresReply).length
  const newsletterCount = emails.filter((email) => email.isNewsletter).length
  const urgentCount = emails.filter((email) => email.categoryHints.includes('Urgent')).length

  return {
    id: 'controlled-email-organization-preview',
    label: 'Controlled Email Organization Preview',
    simulationOnly: true,
    executionMode: 'email-preview-only',
    actionExecuted: false,
    emailSendAccess: false,
    emailDeleteAccess: false,
    emailMoveAccess: false,
    emailReplyAccess: false,
    emailDraftMode: 'preview-only',
    approvalRequired: true,
    ownerControlled: true,
    emails,
    inboxChaosSummary: [
      {
        id: 'chaos-urgent',
        label: 'Urgent mixed with low priority',
        count: urgentCount,
        severity: urgentCount > 0 ? 'high' : 'low'
      },
      {
        id: 'chaos-replies',
        label: 'Messages waiting reply',
        count: replyCount,
        severity: replyCount > 1 ? 'high' : 'medium'
      },
      {
        id: 'chaos-newsletters',
        label: 'Newsletters in primary flow',
        count: newsletterCount,
        severity: newsletterCount > 0 ? 'medium' : 'low'
      },
      {
        id: 'chaos-invoices',
        label: 'Invoice review needed',
        count: invoiceCount,
        severity: invoiceCount > 0 ? 'high' : 'low'
      }
    ],
    prioritySignals: [
      {
        id: 'signal-invoice',
        label: 'Invoice detected',
        category: 'Invoices',
        severity: invoiceCount > 0 ? 'high' : 'low',
        rationale: 'Financial messages should be separated from general work communication.'
      },
      {
        id: 'signal-waiting-reply',
        label: 'Reply needed',
        category: 'Waiting Reply',
        severity: replyCount > 0 ? 'high' : 'low',
        rationale: 'Messages requiring response should be surfaced for owner review.'
      },
      {
        id: 'signal-newsletter',
        label: 'Newsletter flow',
        category: 'Newsletters',
        severity: newsletterCount > 0 ? 'medium' : 'low',
        rationale: 'Newsletters can be separated to reduce inbox noise.'
      }
    ],
    categorySuggestions: Array.from(categoryCounts.entries()).map(([category, count]) => ({
      category,
      count,
      rationale: `${count} simulated email(s) match ${category}.`
    })),
    draftSuggestions: emails
      .filter((email) => email.requiresReply)
      .map((email) => ({
        id: `draft-${email.id}`,
        emailId: email.id,
        title: `Draft response for ${email.subject}`,
        draftPreview:
          'Thanks for the message. I will review the context and respond with a confirmed next step. This is a preview-only draft.',
        emailDraftMode: 'preview-only' as const,
        actionExecuted: false
      })),
    checklist: [
      'Review urgent work and invoice messages first.',
      'Confirm every suggested draft before any future email action.',
      'Keep newsletters separate from priority inbox items.',
      'Do not send, move, delete, archive, label, reply, or forward anything in this phase.'
    ]
  }
}
