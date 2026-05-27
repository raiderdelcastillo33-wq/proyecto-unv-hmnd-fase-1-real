export type OrganizationSimulationStatus = 'simulation-only'

export type ChaosSignal = {
  id: string
  label: string
  severity: 'low' | 'medium' | 'high'
  description: string
}

export type SimulatedFileItem = {
  id: string
  name: string
  currentLocation: string
  suggestedLocation: string
  category: 'work' | 'finance' | 'personal' | 'temporary' | 'media' | 'notes'
  priority: 'low' | 'medium' | 'high'
  duplicateKey?: string
  simulationOnly: true
}

export type FileCluster = {
  id: string
  label: string
  suggestedFolder: string
  itemCount: number
  priority: SimulatedFileItem['priority']
  rationale: string
}

export type OrganizationSimulation = {
  id: string
  label: string
  status: OrganizationSimulationStatus
  scenario: string
  files: SimulatedFileItem[]
  chaosSignals: ChaosSignal[]
  genioAnalysis: {
    summary: string
    recommendedStrategy: string
    governanceBoundary: string
  }
  genesisReflections: Array<{
    id: string
    label: string
    observation: string
    boundary: string
    simulationOnly: true
  }>
  alignmentValidation: {
    finalAssessment: string
    checks: Array<{
      id: string
      label: string
      status: 'passed' | 'watch'
      reason: string
    }>
    simulationOnly: true
    actionExecuted: false
  }
  proposal: {
    title: string
    groups: FileCluster[]
    duplicateGroups: Array<{
      id: string
      label: string
      recommendation: string
      actionMode: 'proposal-only'
    }>
    checklist: string[]
    timeRecoveryEstimate: {
      minutesPerWeek: number
      confidence: 'low' | 'medium' | 'high'
      basis: string
      caveat: string
    }
    clarityEstimate: {
      beforeScore: number
      afterScore: number
      label: string
      caveat: string
    }
    simulationOnly: true
    actionExecuted: false
  }
  nonCapabilities: string[]
  simulationOnly: true
  actionExecuted: false
}

export const privateLabOrganizationSimulation: OrganizationSimulation = {
  id: 'humanity-guide-intelligent-organization-simulation',
  label: 'Humanity Guide OS - Intelligent Organization MVP',
  status: 'simulation-only',
  scenario: 'Mock Downloads folder with mixed work, finance, personal notes, media, and temporary files.',
  files: [
    {
      id: 'file-001',
      name: 'Screenshot 2026-05-01 at 10.12.44.png',
      currentLocation: 'Downloads',
      suggestedLocation: 'Media/Screenshots/2026-05',
      category: 'media',
      priority: 'low',
      duplicateKey: 'screenshot-homepage',
      simulationOnly: true
    },
    {
      id: 'file-002',
      name: 'Screenshot 2026-05-01 at 10.12.44 copy.png',
      currentLocation: 'Downloads',
      suggestedLocation: 'Media/Screenshots/Review duplicates',
      category: 'media',
      priority: 'low',
      duplicateKey: 'screenshot-homepage',
      simulationOnly: true
    },
    {
      id: 'file-003',
      name: 'invoice_final_FINAL_may.pdf',
      currentLocation: 'Downloads',
      suggestedLocation: 'Finance/Invoices/2026',
      category: 'finance',
      priority: 'high',
      simulationOnly: true
    },
    {
      id: 'file-004',
      name: 'client-notes-random.txt',
      currentLocation: 'Desktop',
      suggestedLocation: 'Work/Clients/Notes',
      category: 'work',
      priority: 'high',
      simulationOnly: true
    },
    {
      id: 'file-005',
      name: 'idea app nueva sin ordenar.md',
      currentLocation: 'Downloads',
      suggestedLocation: 'Personal/Ideas/Product concepts',
      category: 'notes',
      priority: 'medium',
      simulationOnly: true
    },
    {
      id: 'file-006',
      name: 'tmp-export-7.zip',
      currentLocation: 'Downloads',
      suggestedLocation: 'Temporary/Review before deletion',
      category: 'temporary',
      priority: 'low',
      simulationOnly: true
    }
  ],
  chaosSignals: [
    {
      id: 'signal-mixed',
      label: 'Mixed categories',
      severity: 'high',
      description: 'Work, finance, personal notes, screenshots, and temporary exports appear in the same surface.'
    },
    {
      id: 'signal-duplicates',
      label: 'Duplicate screenshots',
      severity: 'medium',
      description: 'Two screenshot names share the same conceptual duplicate key.'
    },
    {
      id: 'signal-priority',
      label: 'Priority blur',
      severity: 'high',
      description: 'High-priority invoices and client notes are visually mixed with low-priority temporary files.'
    }
  ],
  genioAnalysis: {
    summary:
      'GENIO classifies this as a high-clarity opportunity: separate urgent work and finance items first, then isolate low-risk clutter.',
    recommendedStrategy:
      'Create proposal-only clusters by human intent: Work, Finance, Media, Personal Ideas, and Temporary Review.',
    governanceBoundary:
      'GENIO may propose organization. It cannot read, move, rename, delete, or execute files in this phase.'
  },
  genesisReflections: [
    {
      id: 'reflection-context-switching',
      label: 'Context switching pressure',
      observation:
        'The simulated chaos suggests mental load comes from switching between money, clients, ideas, and disposable files.',
      boundary: 'Observation only; no psychological scoring and no claim of real user behavior analysis.',
      simulationOnly: true
    },
    {
      id: 'reflection-creative-signal',
      label: 'Creative signal preservation',
      observation:
        'The product idea note should be preserved as a creative signal instead of treated as disposable clutter.',
      boundary: 'Reflection only; the Owner decides whether the suggestion matters.',
      simulationOnly: true
    }
  ],
  alignmentValidation: {
    finalAssessment: 'The organization proposal is safe to review as a reversible preview.',
    checks: [
      {
        id: 'check-clarity',
        label: 'Human clarity',
        status: 'passed',
        reason: 'The proposal reduces visual overload without hiding decision points.'
      },
      {
        id: 'check-overautomation',
        label: 'No overautomation',
        status: 'passed',
        reason: 'All actions remain suggestions. No file operation is performed.'
      },
      {
        id: 'check-boundaries',
        label: 'Safe limits',
        status: 'passed',
        reason: 'The dataset is fake, local to the UI, and marked simulation-only.'
      }
    ],
    simulationOnly: true,
    actionExecuted: false
  },
  proposal: {
    title: 'Calm folder reset proposal',
    groups: [
      {
        id: 'cluster-work',
        label: 'Work focus',
        suggestedFolder: 'Work/Clients/Notes',
        itemCount: 1,
        priority: 'high',
        rationale: 'Client notes should be visible and separated from disposable downloads.'
      },
      {
        id: 'cluster-finance',
        label: 'Finance review',
        suggestedFolder: 'Finance/Invoices/2026',
        itemCount: 1,
        priority: 'high',
        rationale: 'Invoices need predictable retrieval and review priority.'
      },
      {
        id: 'cluster-media',
        label: 'Screenshots',
        suggestedFolder: 'Media/Screenshots/2026-05',
        itemCount: 2,
        priority: 'low',
        rationale: 'Screenshots are useful but should not compete with active work.'
      },
      {
        id: 'cluster-temporary',
        label: 'Temporary review',
        suggestedFolder: 'Temporary/Review before deletion',
        itemCount: 1,
        priority: 'low',
        rationale: 'Temporary exports need owner review before any future cleanup flow.'
      }
    ],
    duplicateGroups: [
      {
        id: 'duplicate-screenshot-homepage',
        label: 'Screenshot homepage pair',
        recommendation: 'Mark as duplicate candidates for owner review. Do not delete automatically.',
        actionMode: 'proposal-only'
      }
    ],
    checklist: [
      'Review high-priority Work and Finance groups first.',
      'Confirm duplicate screenshot candidates manually.',
      'Move creative notes into Personal Ideas only if the Owner agrees.',
      'Keep temporary files in review state before any future cleanup.',
      'Re-run the simulation after the Owner approves a real read-only adapter in a future phase.'
    ],
    timeRecoveryEstimate: {
      minutesPerWeek: 42,
      confidence: 'medium',
      basis: 'Estimated from fewer context switches and clearer high-priority grouping in the mock dataset.',
      caveat: 'This is a demo estimate, not measured from a real computer.'
    },
    clarityEstimate: {
      beforeScore: 38,
      afterScore: 82,
      label: 'Estimated clarity gain',
      caveat: 'Scores are illustrative for the simulated dataset only.'
    },
    simulationOnly: true,
    actionExecuted: false
  },
  nonCapabilities: [
    'No real filesystem access.',
    'No host scanning.',
    'No file movement, deletion, rename, upload, or indexing.',
    'No user behavior scoring.',
    'No AGI or consciousness claim.'
  ],
  simulationOnly: true,
  actionExecuted: false
}
