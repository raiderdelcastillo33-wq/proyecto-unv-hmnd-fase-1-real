export type PersonalOrganizerArea = 'documents' | 'photos' | 'email' | 'priorities'
export type PersonalOrganizerTarget =
  | 'Documents'
  | 'Downloads'
  | 'Desktop'
  | 'Pictures'
  | 'Screenshots'
  | 'Emails'
  | 'Project files'
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
  organizeFirst: string
  rationale: string
  estimatedTime: string
  expectedImpact: string
  approvalMode: 'owner-review-required'
  actionMode: 'preview-only'
}

export type PersonalFirstUseStep = {
  id: string
  step: string
  title: string
  description: string
}

export type PersonalOrganizationFocus = {
  doToday: string[]
  doNotTouch: string[]
  reviewManually: string[]
  startHere: string
}

export type PersonalOrganizerDailyPlan = {
  id: string
  label: string
  status: PersonalOrganizerModeStatus
  safetyBoundary: PersonalOrganizerSafetyBoundary
  firstUseWorkflow: PersonalFirstUseStep[]
  organizationTargets: PersonalOrganizerTarget[]
  signals: PersonalOrganizerSignal[]
  proposals: PersonalOrganizerProposal[]
  todayFocus: PersonalOrganizationFocus
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
    firstUseWorkflow: [
      {
        id: 'workflow-choose',
        step: 'Step 1',
        title: 'Choose what to organize',
        description: 'Select the area that feels most noisy today. The system only prepares a plan.'
      },
      {
        id: 'workflow-preview',
        step: 'Step 2',
        title: 'Preview chaos',
        description: 'Review simulated clutter signals before deciding what deserves attention.'
      },
      {
        id: 'workflow-proposals',
        step: 'Step 3',
        title: 'Review proposals',
        description: 'Compare low-risk manual organization proposals without triggering actions.'
      },
      {
        id: 'workflow-checklist',
        step: 'Step 4',
        title: 'Generate manual checklist',
        description: 'Turn the proposal into a calm checklist the owner can follow outside the app.'
      },
      {
        id: 'workflow-owner-executes',
        step: 'Step 5',
        title: 'Owner executes manually outside the app',
        description: 'The app stops at guidance. The owner performs any real-world change manually.'
      }
    ],
    organizationTargets: ['Documents', 'Downloads', 'Desktop', 'Pictures', 'Screenshots', 'Emails', 'Project files'],
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
        organizeFirst: 'Downloads and Documents',
        rationale: 'Financial and work documents usually create the most urgent decision pressure.',
        estimatedTime: '20 minutes',
        expectedImpact: 'High clarity, lower search time, fewer forgotten documents.',
        approvalMode: 'owner-review-required',
        actionMode: 'preview-only'
      },
      {
        id: 'proposal-photos',
        area: 'photos',
        title: 'Separate screenshots from memories',
        recommendation: 'Keep screenshots in a review group and personal photos in a separate conceptual cluster.',
        organizeFirst: 'Screenshots',
        rationale: 'Screenshots accumulate quickly and often mix temporary references with important records.',
        estimatedTime: '15 minutes',
        expectedImpact: 'Cleaner picture review and less visual noise.',
        approvalMode: 'owner-review-required',
        actionMode: 'preview-only'
      },
      {
        id: 'proposal-email',
        area: 'email',
        title: 'Build a priority inbox proposal',
        recommendation: 'Review urgent work and finance messages before newsletters or low-priority updates.',
        organizeFirst: 'Emails waiting reply',
        rationale: 'Reply-needed messages carry social and operational risk if they stay hidden.',
        estimatedTime: '12 minutes',
        expectedImpact: 'Lower communication stress and clearer next actions.',
        approvalMode: 'owner-review-required',
        actionMode: 'preview-only'
      }
    ],
    todayFocus: {
      doToday: [
        'Start with Downloads and email replies.',
        'Review invoices and work drafts before personal cleanup.',
        'Create one short manual checklist before touching anything.'
      ],
      doNotTouch: [
        'Do not delete files today.',
        'Do not move project folders until reviewed.',
        'Do not send email replies from inside the app.'
      ],
      reviewManually: [
        'Invoices and finance messages.',
        'Screenshots that may contain important references.',
        'Project files with unclear names.'
      ],
      startHere: 'Begin with 20 minutes on Downloads, then stop and review the checklist.'
    },
    checklist: [
      'Review today signals before any future action.',
      'Confirm every suggested group manually.',
      'Keep file and email changes blocked unless a future approved runtime exists.',
      'Use the plan as guidance, not automation.'
    ]
  }
}
