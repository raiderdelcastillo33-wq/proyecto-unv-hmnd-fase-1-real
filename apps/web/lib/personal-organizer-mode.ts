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
  recommendedFirstAction: string
  estimatedManualSessionTime: string
  focusPrinciple: string
}

export type PersonalDashboardMetric = {
  id: string
  label: string
  value: string
  helper: string
  tone: 'calm' | 'attention' | 'safe'
}

export type PersonalScoreMetric = {
  id: string
  label: string
  score: number
  helper: string
}

export type PersonalOrganizationZone = {
  id: string
  label: 'Work' | 'Personal' | 'Finance' | 'Learning' | 'Projects' | 'Archive later'
  summary: string
  suggestedAction: string
  riskLevel: PersonalOrganizerRiskLevel
}

export type SmartManualChecklist = {
  startHere: string[]
  doNotTouchYet: string[]
  reviewManually: string[]
  lowRiskCleanup: string[]
  highAttentionFiles: string[]
}

export type PersonalOrganizerDailyPlan = {
  id: string
  label: string
  status: PersonalOrganizerModeStatus
  dayStatus: string
  clarityEstimate: string
  focusLevel: string
  organizationReadiness: string
  safetyBoundary: PersonalOrganizerSafetyBoundary
  dashboardMetrics: PersonalDashboardMetric[]
  scoreMetrics: PersonalScoreMetric[]
  todayImprovement: string
  organizationZones: PersonalOrganizationZone[]
  smartManualChecklist: SmartManualChecklist
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
    dayStatus: 'Ready for a calm first pass',
    clarityEstimate: '72%',
    focusLevel: 'Focused but gentle',
    organizationReadiness: 'Manual review ready',
    safetyBoundary: personalOrganizerSafetyBoundary,
    dashboardMetrics: [
      {
        id: 'documents-review',
        label: 'Documents to review',
        value: '18',
        helper: 'Invoices, drafts, notes, and exports queued for manual review.',
        tone: 'attention'
      },
      {
        id: 'screenshots-classify',
        label: 'Screenshots to classify',
        value: '11',
        helper: 'Visual clutter candidates, no file movement performed.',
        tone: 'calm'
      },
      {
        id: 'downloads-clean',
        label: 'Downloads to clean',
        value: '24',
        helper: 'Best place to start because it has low emotional friction.',
        tone: 'attention'
      },
      {
        id: 'emails-review',
        label: 'Emails pending review',
        value: '7',
        helper: 'Reply-needed and finance-related messages remain preview-only.',
        tone: 'safe'
      },
      {
        id: 'projects-attention',
        label: 'Projects requiring attention',
        value: '3',
        helper: 'Project folders should be reviewed manually before any future action.',
        tone: 'calm'
      }
    ],
    scoreMetrics: [
      {
        id: 'chaos-score',
        label: 'Chaos score',
        score: 64,
        helper: 'Moderate clutter pressure, mostly from Downloads and screenshots.'
      },
      {
        id: 'clarity-score',
        label: 'Clarity score',
        score: 72,
        helper: 'Enough structure exists to start without a full reorganization.'
      },
      {
        id: 'focus-score',
        label: 'Focus score',
        score: 81,
        helper: 'One small manual session can create visible progress.'
      }
    ],
    todayImprovement: '+18% expected clarity after one 20-minute manual pass',
    organizationZones: [
      {
        id: 'zone-work',
        label: 'Work',
        summary: 'Drafts, client notes, exports, and project references.',
        suggestedAction: 'Review active work files before archiving anything.',
        riskLevel: 'medium'
      },
      {
        id: 'zone-personal',
        label: 'Personal',
        summary: 'Photos, personal notes, and non-urgent life admin.',
        suggestedAction: 'Separate personal memories from temporary screenshots.',
        riskLevel: 'low'
      },
      {
        id: 'zone-finance',
        label: 'Finance',
        summary: 'Invoices, receipts, and payment-related messages.',
        suggestedAction: 'Review manually before moving or renaming in any future phase.',
        riskLevel: 'medium'
      },
      {
        id: 'zone-learning',
        label: 'Learning',
        summary: 'Courses, references, notes, and saved articles.',
        suggestedAction: 'Group by topic, not by download date.',
        riskLevel: 'low'
      },
      {
        id: 'zone-projects',
        label: 'Projects',
        summary: 'Active folders and files tied to ongoing builds.',
        suggestedAction: 'Do not touch project structure until reviewed.',
        riskLevel: 'medium'
      },
      {
        id: 'zone-archive',
        label: 'Archive later',
        summary: 'Old exports and low-priority reference material.',
        suggestedAction: 'Leave for a later pass after high-attention items are reviewed.',
        riskLevel: 'low'
      }
    ],
    smartManualChecklist: {
      startHere: ['Open Downloads manually.', 'Sort only obvious invoices and exports.', 'Stop after 20 minutes.'],
      doNotTouchYet: ['Project folders.', 'Unknown documents.', 'Old photo libraries.'],
      reviewManually: ['Finance files.', 'Emails waiting reply.', 'Screenshots with useful references.'],
      lowRiskCleanup: ['Temporary exports.', 'Duplicate screenshots.', 'Newsletters and low-priority email previews.'],
      highAttentionFiles: ['Invoices.', 'Client documents.', 'Project configuration files.']
    },
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
      startHere: 'Begin with 20 minutes on Downloads, then stop and review the checklist.',
      recommendedFirstAction: 'Open Downloads manually and review only obvious invoices, exports, and duplicate screenshots.',
      estimatedManualSessionTime: '20 minutes',
      focusPrinciple: 'One small step at a time. Do not reorganize your whole life today.'
    },
    checklist: [
      'Review today signals before any future action.',
      'Confirm every suggested group manually.',
      'Keep file and email changes blocked unless a future approved runtime exists.',
      'Use the plan as guidance, not automation.'
    ]
  }
}
