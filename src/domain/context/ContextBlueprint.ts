export type ContextCategory =
  | 'technical'
  | 'personal'
  | 'strategic'
  | 'project'
  | 'learning'
  | 'financial'
  | 'journal'
  | 'life-map'
  | 'company'
  | 'operational'

export type ContextPriority = 'low' | 'medium' | 'high' | 'critical'

export type ContextSource =
  | 'owner-input'
  | 'agent-proposal'
  | 'tool-output'
  | 'journal-draft'
  | 'project-note'
  | 'future-adapter'
  | 'manual-import'

export type ContextRetentionPolicy = 'short-term' | 'mid-term' | 'long-term' | 'archived'

export interface TimelineMetadata {
  createdAt?: string
  updatedAt?: string
  relevantFrom?: string
  relevantUntil?: string
}

export interface MemoryFragment {
  id: string
  title: string
  category: ContextCategory
  priority: ContextPriority
  source: ContextSource
  retentionPolicy: ContextRetentionPolicy
  summary: string
  linkedMemories: string[]
  relatedGoals: string[]
  relatedProjects: string[]
  contextTags: string[]
  timelineMetadata: TimelineMetadata
  importanceScore: number
  simulationOnly: true
  actionExecuted: false
}

export interface ContextWindow {
  id: string
  label: string
  categories: ContextCategory[]
  retentionPolicy: ContextRetentionPolicy
  maxFragments: number
  priorityFloor: ContextPriority
  simulationOnly: true
}

export interface ContextProfile {
  id: string
  ownerScope: 'human-owner'
  categories: ContextCategory[]
  retentionPolicies: ContextRetentionPolicy[]
  contextWindows: ContextWindow[]
  governanceNotes: string[]
  simulationOnly: true
  actionExecuted: false
}

export interface FutureMemoryArchitecture {
  vectorMemory: 'placeholder-only'
  semanticSearch: 'placeholder-only'
  embeddings: 'placeholder-only'
  persistentMemory: 'placeholder-only'
  memoryIndexing: 'placeholder-only'
  contextualRetrieval: 'placeholder-only'
  adaptiveSummarization: 'placeholder-only'
  safetyBoundary: string
  simulationOnly: true
}

export interface Milestone {
  id: string
  title: string
  targetWindow: string
  relatedObjectives: string[]
  riskSignals: string[]
  opportunitySignals: string[]
  simulationOnly: true
}

export interface LifeObjective {
  id: string
  title: string
  category: ContextCategory
  priority: ContextPriority
  relatedProjects: string[]
  contextTags: string[]
  simulationOnly: true
}

export interface LifeRoadmap {
  id: string
  title: string
  objectives: LifeObjective[]
  milestones: Milestone[]
  simulationOnly: true
}

export interface PersonalGrowthSignal {
  id: string
  label: string
  category: ContextCategory
  evidenceRequired: string[]
  simulationOnly: true
}

export interface OpportunitySignal {
  id: string
  label: string
  probabilityModel: 'future-probabilistic-model'
  assumptions: string[]
  simulationOnly: true
}

export interface RiskSignal {
  id: string
  label: string
  severity: ContextPriority
  mitigationIdeas: string[]
  simulationOnly: true
}

export type MoodTag = 'focused' | 'calm' | 'stressed' | 'curious' | 'blocked' | 'energized' | 'reflective'

export type FocusArea = 'study' | 'building' | 'health' | 'career' | 'finance' | 'relationships' | 'operations'

export interface Reflection {
  id: string
  prompt: string
  summary: string
  contextTags: string[]
  simulationOnly: true
}

export interface JournalEntry {
  id: string
  title: string
  moodTags: MoodTag[]
  focusAreas: FocusArea[]
  reflections: Reflection[]
  retentionPolicy: ContextRetentionPolicy
  simulationOnly: true
  actionExecuted: false
}

export interface DailySummary {
  id: string
  dateLabel: string
  focusAreas: FocusArea[]
  moodTags: MoodTag[]
  keySignals: string[]
  simulationOnly: true
}

export interface MemoryContextBlueprint {
  id: 'genio-memory-context-blueprint'
  label: string
  status: 'metadata-only'
  contextProfile: ContextProfile
  memoryCategories: ContextCategory[]
  retentionPolicies: ContextRetentionPolicy[]
  futureArchitecture: FutureMemoryArchitecture
  lifeMapPreparation: {
    objectives: LifeObjective[]
    roadmap: LifeRoadmap
    personalGrowthSignals: PersonalGrowthSignal[]
    opportunitySignals: OpportunitySignal[]
    riskSignals: RiskSignal[]
  }
  journalBlueprint: {
    entries: JournalEntry[]
    dailySummaries: DailySummary[]
  }
  governanceRules: string[]
  simulationOnly: true
  actionExecuted: false
}

export const GENIO_MEMORY_CONTEXT_BLUEPRINT: MemoryContextBlueprint = {
  id: 'genio-memory-context-blueprint',
  label: 'GENIO Memory & Context Blueprint',
  status: 'metadata-only',
  contextProfile: {
    id: 'owner-context-profile-blueprint',
    ownerScope: 'human-owner',
    categories: [
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
    governanceNotes: [
      'No persistence exists in this phase.',
      'No vector memory, embeddings, semantic search, or remote sync exists in this phase.',
      'Future memory must be owner-controlled, reversible, auditable, and approval-gated.'
    ],
    simulationOnly: true,
    actionExecuted: false
  },
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
  lifeMapPreparation: {
    objectives: [
      {
        id: 'life-objective-blueprint',
        title: 'Future owner-defined life objective',
        category: 'life-map',
        priority: 'medium',
        relatedProjects: [],
        contextTags: ['future', 'owner-controlled'],
        simulationOnly: true
      }
    ],
    roadmap: {
      id: 'life-roadmap-blueprint',
      title: 'Future life roadmap blueprint',
      objectives: [],
      milestones: [],
      simulationOnly: true
    },
    personalGrowthSignals: [
      {
        id: 'growth-signal-blueprint',
        label: 'Future personal growth signal',
        category: 'personal',
        evidenceRequired: ['owner-approved context', 'explicit reflection input'],
        simulationOnly: true
      }
    ],
    opportunitySignals: [
      {
        id: 'opportunity-signal-blueprint',
        label: 'Future opportunity signal',
        probabilityModel: 'future-probabilistic-model',
        assumptions: ['requires owner-approved context', 'requires uncertainty disclosure'],
        simulationOnly: true
      }
    ],
    riskSignals: [
      {
        id: 'risk-signal-blueprint',
        label: 'Future risk signal',
        severity: 'medium',
        mitigationIdeas: ['surface assumptions', 'request owner review'],
        simulationOnly: true
      }
    ]
  },
  journalBlueprint: {
    entries: [
      {
        id: 'journal-entry-blueprint',
        title: 'Future journal entry blueprint',
        moodTags: ['reflective'],
        focusAreas: ['study', 'building'],
        reflections: [],
        retentionPolicy: 'short-term',
        simulationOnly: true,
        actionExecuted: false
      }
    ],
    dailySummaries: [
      {
        id: 'daily-summary-blueprint',
        dateLabel: 'future-date',
        focusAreas: ['study'],
        moodTags: ['focused'],
        keySignals: [],
        simulationOnly: true
      }
    ]
  },
  governanceRules: [
    'Memory blueprint is metadata-only.',
    'No database, vector store, embeddings, localStorage, filesystem, or cloud sync is active.',
    'Future context creation, linking, and classification must remain audited and owner-controlled.',
    'Proposal != execution.'
  ],
  simulationOnly: true,
  actionExecuted: false
}
