export type PersonalOrganizerArea = 'documents' | 'photos' | 'email' | 'priorities'
export type PersonalOrganizerRiskLevel = 'low' | 'medium'
export type PersonalOrganizerModeStatus = 'ready-for-owner-review'

export type PersonalOrganizerSafetyBoundary = {
  ownerControlled: true
  readOnlyFirst: true
  proposalFirst: true
  approvalRequired: true
  auditable: true
  reversible: true
  actionExecuted: false
  filesystemWriteAccess: false
  filesystemDeleteAccess: false
  filesystemMoveAccess: false
  emailSendAccess: false
  emailDeleteAccess: false
  emailMoveAccess: false
  backgroundAgents: false
}

export type PersonalOrganizerSignal = {
  id: string
  area: PersonalOrganizerArea
  title: string
  summary: string
  priority: 'today' | 'this-week' | 'later'
  riskLevel: PersonalOrganizerRiskLevel
}

export type PersonalOrganizerProposal = {
  id: string
  area: PersonalOrganizerArea
  title: string
  recommendation: string
  approvalMode: 'owner-review-required'
  actionMode: 'preview-only'
}

export type PersonalOrganizerDailyPlan = {
  id: string
  label: string
  status: PersonalOrganizerModeStatus
  safetyBoundary: PersonalOrganizerSafetyBoundary
  signals: PersonalOrganizerSignal[]
  proposals: PersonalOrganizerProposal[]
  checklist: string[]
}

export const personalOrganizerSafetyBoundary: PersonalOrganizerSafetyBoundary = {
  ownerControlled: true,
  readOnlyFirst: true,
  proposalFirst: true,
  approvalRequired: true,
  auditable: true,
  reversible: true,
  actionExecuted: false,
  filesystemWriteAccess: false,
  filesystemDeleteAccess: false,
  filesystemMoveAccess: false,
  emailSendAccess: false,
  emailDeleteAccess: false,
  emailMoveAccess: false,
  backgroundAgents: false
}

export function createPersonalOrganizerDailyPlan(): PersonalOrganizerDailyPlan {
  return {
    id: 'humanity-guide-personal-organizer-mode',
    label: 'Humanity Guide OS - Personal Organizer Mode',
    status: 'ready-for-owner-review',
    safetyBoundary: personalOrganizerSafetyBoundary,
    signals: [
      {
        id: 'signal-documents',
        area: 'documents',
        title: 'Documents need review',
        summary: 'Simulated work files, invoices, notes, and drafts are grouped into a calmer review queue.',
        priority: 'today',
        riskLevel: 'low'
      },
      {
        id: 'signal-photos',
        area: 'photos',
        title: 'Photos need lightweight grouping',
        summary: 'Screenshots, exports, and personal images are separated conceptually without moving files.',
        priority: 'this-week',
        riskLevel: 'low'
      },
      {
        id: 'signal-email',
        area: 'email',
        title: 'Inbox needs owner decisions',
        summary: 'Simulated urgent, finance, personal, and newsletter messages are prepared for manual review.',
        priority: 'today',
        riskLevel: 'medium'
      },
      {
        id: 'signal-priorities',
        area: 'priorities',
        title: 'Daily priorities can be reduced',
        summary: 'The system proposes a short owner-approved focus plan instead of an overwhelming task list.',
        priority: 'today',
        riskLevel: 'low'
      }
    ],
    proposals: [
      {
        id: 'proposal-documents',
        area: 'documents',
        title: 'Create a document review queue',
        recommendation: 'Review invoices first, then work drafts, then personal notes. No file operation is executed.',
        approvalMode: 'owner-review-required',
        actionMode: 'preview-only'
      },
      {
        id: 'proposal-photos',
        area: 'photos',
        title: 'Separate screenshots from memories',
        recommendation: 'Keep screenshots in a review group and personal photos in a separate conceptual cluster.',
        approvalMode: 'owner-review-required',
        actionMode: 'preview-only'
      },
      {
        id: 'proposal-email',
        area: 'email',
        title: 'Build a priority inbox proposal',
        recommendation: 'Review urgent work and finance messages before newsletters or low-priority updates.',
        approvalMode: 'owner-review-required',
        actionMode: 'preview-only'
      }
    ],
    checklist: [
      'Review today signals before any future action.',
      'Confirm every suggested group manually.',
      'Keep file and email changes blocked unless a future approved runtime exists.',
      'Use the plan as guidance, not automation.'
    ]
  }
}
