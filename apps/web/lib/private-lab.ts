export type PrivateLabAgentCatalogItem = {
  id: string
  label: string
  description: string
  category: string
  capabilities: string[]
  riskProfile: string
  allowedTools: string[]
  hierarchyLevel?: string
  parentAuthority?: string
  escalationRules?: string[]
  approvalRequirements?: string[]
}

export type PrivateLabToolCatalogItem = {
  id: string
  label: string
  description: string
  category: string
  riskLevel: string
  requiresApproval: boolean
  outputType: string
  forbiddenActions?: string[]
}

export type PrivateLabFutureCapability = {
  id: string
  label: string
  status: string
  safetyBoundary: string
  simulationOnly: true
}

export type PrivateLabStrategicVision = {
  inspirationStyle: string[]
  personalityTraits: string[]
  reasoningPrinciples: string[]
  predictionBoundaries: string[]
  futureEngines: PrivateLabFutureCapability[]
}

export type PrivateLabMemoryContextBlueprint = {
  id: 'genio-memory-context-blueprint'
  label: string
  status: string
  memoryCategories: string[]
  retentionPolicies: string[]
  contextWindows: Array<{
    id: string
    label: string
    categories: string[]
    retentionPolicy: string
    maxFragments: number
    priorityFloor: string
    simulationOnly: true
  }>
  futureArchitecture: {
    vectorMemory: string
    semanticSearch: string
    embeddings: string
    persistentMemory: string
    memoryIndexing: string
    contextualRetrieval: string
    adaptiveSummarization: string
    safetyBoundary: string
    simulationOnly: true
  }
  lifeMapReadiness: string[]
  journalReadiness: string[]
  governanceRules: string[]
  simulationOnly: true
  actionExecuted: false
}

export type PrivateLabGenioProfile = {
  id: 'genio-central'
  label: string
  role: string
  governanceLevel: string
  approvalAuthority: string
  orchestrationPriority: number
  riskAwareness: string
  hierarchyLevel: 'central'
  systemDescription: string
  systemGoals: string[]
  capabilities: string[]
  futureCapabilities: PrivateLabFutureCapability[]
  strategicVision: PrivateLabStrategicVision
  memoryContextBlueprint: PrivateLabMemoryContextBlueprint
  lifeMapVision: PrivateLabFutureCapability[]
  financialStrategyVision: PrivateLabFutureCapability[]
  safetyBoundaries: string[]
  simulationOnly: true
  actionExecuted: false
}

export type PrivateLabGovernanceCatalog = {
  centralProfile: PrivateLabGenioProfile
  hierarchyLevels: string[]
  approvalFlows: string[]
  ownership: string
  proposalOnly: true
}

export const privateLabGovernance: PrivateLabGovernanceCatalog = {
  centralProfile: {
    id: 'genio-central',
    label: 'GENIO Central',
    role: 'Central governance, orchestration, approval, observability, and context coordination layer.',
    governanceLevel: 'central-governance',
    approvalAuthority: 'proposal-governance-only',
    orchestrationPriority: 100,
    riskAwareness: 'maximum',
    hierarchyLevel: 'central',
    systemDescription:
      'GENIO coordinates agents, approval logic, risk metadata, observability, and future AI operating system capabilities without executing real-world actions.',
    systemGoals: [
      'Keep the human owner as final authority.',
      'Route sensitive future tools through central governance first.',
      'Separate public demo, private lab, and future SaaS boundaries.',
      'Preserve proposal-only behavior until explicit execution layers are approved.'
    ],
    capabilities: [
      'coordinate specialist agents',
      'classify risk before tool access',
      'organize global context',
      'prioritize safe workflows',
      'prepare approval metadata',
      'observe proposal-only activity',
      'model probabilistic scenarios without claiming certainty',
      'prepare strategic life maps for owner review'
    ],
    futureCapabilities: [
      {
        id: 'memory-systems',
        label: 'Memory Systems',
        status: 'metadata-only',
        safetyBoundary: 'No persistent or vector memory exists in this phase.',
        simulationOnly: true
      },
      {
        id: 'orchestration-pipelines',
        label: 'Orchestration Pipelines',
        status: 'metadata-only',
        safetyBoundary: 'No autonomous workflow engine exists in this phase.',
        simulationOnly: true
      },
      {
        id: 'local-adapters',
        label: 'Local Adapters',
        status: 'metadata-only',
        safetyBoundary: 'No filesystem, terminal, email, SSH, or OS control adapter exists in this phase.',
        simulationOnly: true
      },
      {
        id: 'predictive-simulation-engine',
        label: 'Predictive Simulation Engine',
        status: 'metadata-only',
        safetyBoundary: 'Future forecasts must be probabilistic, evidence-based, and never presented as certainty.',
        simulationOnly: true
      },
      {
        id: 'strategic-planning-engine',
        label: 'Strategic Planning Engine',
        status: 'metadata-only',
        safetyBoundary: 'Future strategy outputs remain proposals requiring owner review.',
        simulationOnly: true
      }
    ],
    strategicVision: {
      inspirationStyle: [
        'Wise strategic guide inspired by broad fantasy and anime archetypes, without copying any protected character or IP.',
        'Calm observer that favors clarity, patience, and long-horizon reasoning.'
      ],
      personalityTraits: ['clear', 'strategic', 'emotionally controlled', 'empathetic', 'analytical', 'growth-oriented'],
      reasoningPrinciples: [
        'Use data, statistics, historical patterns, contextual reasoning, and simulations when estimating outcomes.',
        'Express forecasts as probabilities, scenarios, assumptions, and risk ranges.',
        'Preserve human control, transparency, auditability, and approval-first governance.'
      ],
      predictionBoundaries: [
        'GENIO does not know the future.',
        'GENIO does not guarantee outcomes.',
        'GENIO does not use magic, supernatural claims, control, or omniscience.',
        'GENIO must keep predictive features simulation-only, proposal-only, audit-first, and approval-required.'
      ],
      futureEngines: [
        {
          id: 'predictive-simulation-engine',
          label: 'Predictive Simulation Engine',
          status: 'metadata-only',
          safetyBoundary: 'Probabilistic scenario modeling only; no certainty claims.',
          simulationOnly: true
        },
        {
          id: 'life-map-intelligence',
          label: 'Life Map Intelligence',
          status: 'metadata-only',
          safetyBoundary: 'Future life maps remain strategic guidance under owner control.',
          simulationOnly: true
        },
        {
          id: 'financial-scenario-modeling',
          label: 'Financial Scenario Modeling',
          status: 'metadata-only',
          safetyBoundary: 'Financial scenarios remain simulations; no transactions or guarantees.',
          simulationOnly: true
        }
      ]
    },
    memoryContextBlueprint: {
      id: 'genio-memory-context-blueprint',
      label: 'GENIO Memory & Context Blueprint',
      status: 'metadata-only',
      memoryCategories: [
        'technical',
        'personal',
        'strategic',
        'project',
        'learning',
        'financial',
        'journal',
        'life-map',
        'company',
        'operational'
      ],
      retentionPolicies: ['short-term', 'mid-term', 'long-term', 'archived'],
      contextWindows: [
        {
          id: 'short-term-context-window',
          label: 'Short Term Context Window',
          categories: ['technical', 'project', 'operational'],
          retentionPolicy: 'short-term',
          maxFragments: 12,
          priorityFloor: 'low',
          simulationOnly: true
        },
        {
          id: 'strategic-context-window',
          label: 'Strategic Context Window',
          categories: ['strategic', 'life-map', 'financial', 'learning'],
          retentionPolicy: 'mid-term',
          maxFragments: 24,
          priorityFloor: 'medium',
          simulationOnly: true
        }
      ],
      futureArchitecture: {
        vectorMemory: 'placeholder-only',
        semanticSearch: 'placeholder-only',
        embeddings: 'placeholder-only',
        persistentMemory: 'placeholder-only',
        memoryIndexing: 'placeholder-only',
        contextualRetrieval: 'placeholder-only',
        adaptiveSummarization: 'placeholder-only',
        safetyBoundary: 'Architecture placeholder only. No data is stored, embedded, indexed, searched, or synchronized.',
        simulationOnly: true
      },
      lifeMapReadiness: ['LifeObjective', 'LifeRoadmap', 'Milestone', 'PersonalGrowthSignal', 'OpportunitySignal', 'RiskSignal'],
      journalReadiness: ['JournalEntry', 'Reflection', 'DailySummary', 'MoodTag', 'FocusArea'],
      governanceRules: [
        'Memory blueprint is metadata-only.',
        'No database, vector store, embeddings, localStorage, filesystem, or cloud sync is active.',
        'Future context creation, linking, and classification must remain audited and owner-controlled.',
        'Proposal != execution.'
      ],
      simulationOnly: true,
      actionExecuted: false
    },
    lifeMapVision: [
      {
        id: 'life-map-agent',
        label: 'Life Map Agent',
        status: 'metadata-only',
        safetyBoundary: 'No personal files, journal storage, or persistent memory access exists.',
        simulationOnly: true
      },
      {
        id: 'objective-tracking',
        label: 'Objective Tracking',
        status: 'metadata-only',
        safetyBoundary: 'Future objectives remain planning metadata until storage is approved.',
        simulationOnly: true
      }
    ],
    financialStrategyVision: [
      {
        id: 'finance-strategy-agent',
        label: 'Finance Strategy Agent',
        status: 'metadata-only',
        safetyBoundary: 'Financial strategy remains educational simulation, not advice or execution.',
        simulationOnly: true
      },
      {
        id: 'simulation-mode',
        label: 'Simulation Mode',
        status: 'metadata-only',
        safetyBoundary: 'All finance-related flows remain simulation-only.',
        simulationOnly: true
      }
    ],
    safetyBoundaries: [
      'Proposal != execution.',
      'No real terminal execution.',
      'No real filesystem access.',
      'No Gmail or account control.',
      'No financial transactions or trading.'
    ],
    simulationOnly: true,
    actionExecuted: false
  },
  hierarchyLevels: ['central', 'supervisor', 'specialist', 'utility', 'observer'],
  approvalFlows: ['safe', 'requires-approval', 'forbidden'],
  ownership: 'human-owner',
  proposalOnly: true
}

export const privateLabAgents = [
  {
    id: 'architect-agent',
    label: 'Architect',
    description: 'Architecture, risks, and phased technical decisions.',
    category: 'architecture',
    capabilities: ['architecture design', 'risk mapping', 'technical phasing'],
    riskProfile: 'medium',
    allowedTools: ['generate-implementation-plan', 'review-risk', 'create-checklist', 'summarize-project-state'],
    hierarchyLevel: 'supervisor',
    parentAuthority: 'genio-central',
    escalationRules: ['Escalate sensitive architecture proposals to GENIO governance metadata.'],
    approvalRequirements: ['Owner approval required before any future real-world action.']
  },
  {
    id: 'coder-agent',
    label: 'Coder',
    description: 'Safe implementation proposals and code-oriented plans.',
    category: 'implementation',
    capabilities: ['implementation planning', 'typed code guidance', 'test planning'],
    riskProfile: 'medium',
    allowedTools: ['generate-implementation-plan', 'create-checklist', 'review-risk'],
    hierarchyLevel: 'specialist',
    parentAuthority: 'genio-central',
    escalationRules: ['Escalate write or execution intent before future adapter access.'],
    approvalRequirements: ['Proposal-only planning does not execute code changes.']
  },
  {
    id: 'reviewer-agent',
    label: 'Reviewer',
    description: 'Bug, security, regression, and test review.',
    category: 'review',
    capabilities: ['bug review', 'security review', 'test gap analysis'],
    riskProfile: 'medium',
    allowedTools: ['review-risk', 'explain-error-log', 'create-checklist'],
    hierarchyLevel: 'specialist',
    parentAuthority: 'genio-central',
    escalationRules: ['Escalate critical security or regression risk to GENIO.'],
    approvalRequirements: ['Reviews remain findings and proposals only.']
  },
  {
    id: 'debugger-agent',
    label: 'Debugger',
    description: 'Error analysis, logs, root causes, and verification steps.',
    category: 'debugging',
    capabilities: ['log analysis', 'root cause analysis', 'verification planning'],
    riskProfile: 'medium',
    allowedTools: ['explain-error-log', 'propose-terminal-command', 'create-checklist'],
    hierarchyLevel: 'specialist',
    parentAuthority: 'genio-central',
    escalationRules: ['Escalate command proposals to GENIO and owner approval metadata.'],
    approvalRequirements: ['Commands are rendered as text only.']
  },
  {
    id: 'tutor-agent',
    label: 'Tutor',
    description: 'Step-by-step explanations for learning and practice.',
    category: 'education',
    capabilities: ['technical explanation', 'learning support', 'practice guidance'],
    riskProfile: 'low',
    allowedTools: ['summarize-project-state', 'create-checklist', 'explain-error-log'],
    hierarchyLevel: 'utility',
    parentAuthority: 'genio-central',
    escalationRules: ['Escalate beyond education support when tools become sensitive.'],
    approvalRequirements: ['Educational outputs remain informational.']
  },
  {
    id: 'operator-agent',
    label: 'Operator',
    description: 'Operational planning and conservative command proposals.',
    category: 'operations',
    capabilities: ['task coordination', 'command proposal', 'runbook planning'],
    riskProfile: 'high',
    allowedTools: ['propose-terminal-command', 'create-checklist', 'summarize-project-state', 'review-risk'],
    hierarchyLevel: 'supervisor',
    parentAuthority: 'genio-central',
    escalationRules: ['Escalate command and operations proposals to GENIO governance metadata.'],
    approvalRequirements: ['Owner approval required before any future operational execution.']
  }
] as const satisfies readonly PrivateLabAgentCatalogItem[]

export const privateLabTools = [
  {
    id: 'summarize-project-state',
    label: 'Summarize Project State',
    description: 'Create a concise state summary.',
    category: 'analysis',
    riskLevel: 'low',
    requiresApproval: false,
    outputType: 'summary'
  },
  {
    id: 'propose-terminal-command',
    label: 'Propose Terminal Command',
    description: 'Suggest verification commands as text only.',
    category: 'operations',
    riskLevel: 'medium',
    requiresApproval: true,
    outputType: 'command-proposal'
  },
  {
    id: 'explain-error-log',
    label: 'Explain Error Log',
    description: 'Explain likely causes and safe verification steps.',
    category: 'debugging',
    riskLevel: 'low',
    requiresApproval: false,
    outputType: 'debug-explanation'
  },
  {
    id: 'generate-implementation-plan',
    label: 'Generate Implementation Plan',
    description: 'Prepare a scoped implementation plan.',
    category: 'planning',
    riskLevel: 'medium',
    requiresApproval: false,
    outputType: 'plan'
  },
  {
    id: 'review-risk',
    label: 'Review Risk',
    description: 'Review risks, mitigations, and test coverage.',
    category: 'review',
    riskLevel: 'medium',
    requiresApproval: false,
    outputType: 'risk-review'
  },
  {
    id: 'create-checklist',
    label: 'Create Checklist',
    description: 'Create a practical execution checklist.',
    category: 'planning',
    riskLevel: 'low',
    requiresApproval: false,
    outputType: 'checklist'
  }
] as const satisfies readonly PrivateLabToolCatalogItem[]

export type PrivateLabAgentId = (typeof privateLabAgents)[number]['id']
export type PrivateLabToolId = (typeof privateLabTools)[number]['id']
