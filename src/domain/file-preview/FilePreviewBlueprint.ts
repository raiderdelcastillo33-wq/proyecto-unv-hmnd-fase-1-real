export type FilePreviewType =
  | 'text'
  | 'markdown'
  | 'json'
  | 'yaml'
  | 'log'
  | 'code'
  | 'pdf-preview-future'
  | 'image-preview-future'
  | 'spreadsheet-preview-future'

export type FilePreviewPermission =
  | 'preview-only'
  | 'read-only'
  | 'no-write'
  | 'no-delete'
  | 'no-execute'
  | 'no-shell'
  | 'no-host-direct-access'
  | 'approval-required'
  | 'audit-required'
  | 'size-limited'
  | 'type-limited'

export type FilePreviewRiskLevel = 'low' | 'medium' | 'high' | 'critical'

export type FilePreviewVisibility = 'owner-only' | 'redacted-preview' | 'metadata-only' | 'blocked'

export type FilePreviewLifecycle = 'requested' | 'awaiting-approval' | 'approved-for-preview' | 'simulated-preview' | 'blocked' | 'expired'

export interface FilePreviewBoundary {
  id: string
  label: string
  permission: FilePreviewPermission
  description: string
  enforcedInThisPhase: boolean
}

export interface FilePreviewConstraint {
  id: string
  label: string
  permissions: FilePreviewPermission[]
  description: string
  simulationOnly: true
}

export interface FilePreviewAuditTrace {
  traceId: string
  correlationId: string
  proposalId: string
  requestedBy: 'owner'
  governanceSource: 'genio-central'
  adapterId: 'file-preview-adapter'
  capabilityId: 'safe-file-preview-capability'
  sandboxRouteId: string
  lifecycle: FilePreviewLifecycle
  simulationOnly: true
  actionExecuted: false
}

export interface FilePreviewRedactionPolicy {
  id: string
  label: string
  status: 'metadata-only'
  redactionModes: Array<'secret-masking' | 'token-masking' | 'env-redaction' | 'key-detection' | 'pii-redaction' | 'unsafe-content-blocking'>
  detectionImplemented: false
  simulationOnly: true
}

export interface FilePreviewProfile {
  id: string
  label: string
  description: string
  supportedTypes: FilePreviewType[]
  permissions: FilePreviewPermission[]
  riskLevel: FilePreviewRiskLevel
  visibility: FilePreviewVisibility
  lifecycle: FilePreviewLifecycle
  conceptualFileReference: string
  approvalRequired: true
  boundaries: FilePreviewBoundary[]
  constraints: FilePreviewConstraint[]
  redactionPolicy: FilePreviewRedactionPolicy
  auditTrace: FilePreviewAuditTrace
  simulationOnly: true
  actionExecuted: false
}

export interface FilePreviewBlueprint {
  id: 'read-only-file-preview-adapter-blueprint'
  label: 'Read-Only File Preview Adapter Blueprint'
  status: 'metadata-only'
  profile: FilePreviewProfile
  supportedFutureTypes: FilePreviewType[]
  lifecycleStates: FilePreviewLifecycle[]
  runtimeIntegration: {
    sandboxAware: true
    capabilityAware: true
    observabilityAware: true
    approvalAware: true
    authAware: true
    runtimeSandboxId: 'controlled-runtime-sandbox-blueprint'
    capabilityBlueprintId: 'controlled-practical-capability-blueprint'
    observabilityBlueprintId: 'persistent-audit-observability-blueprint'
    approvalFlow: 'owner-approval-required'
    authMode: 'owner-access-code-temporary'
    simulationOnly: true
  }
  governanceRules: string[]
  nonCapabilities: string[]
  roadmap: string[]
  simulationOnly: true
  actionExecuted: false
}

function boundary(
  id: string,
  label: string,
  permission: FilePreviewPermission,
  description: string
): FilePreviewBoundary {
  return {
    id,
    label,
    permission,
    description,
    enforcedInThisPhase: true
  }
}

export const READ_ONLY_FILE_PREVIEW_BLUEPRINT: FilePreviewBlueprint = {
  id: 'read-only-file-preview-adapter-blueprint',
  label: 'Read-Only File Preview Adapter Blueprint',
  status: 'metadata-only',
  supportedFutureTypes: [
    'text',
    'markdown',
    'json',
    'yaml',
    'log',
    'code',
    'pdf-preview-future',
    'image-preview-future',
    'spreadsheet-preview-future'
  ],
  lifecycleStates: ['requested', 'awaiting-approval', 'approved-for-preview', 'simulated-preview', 'blocked', 'expired'],
  profile: {
    id: 'safe-file-preview-capability',
    label: 'Safe File Preview Capability',
    description:
      'Future owner-approved, read-only file preview adapter. No filesystem access, parsing, uploads, indexing, OCR, or host access exists in this phase.',
    supportedTypes: [
      'text',
      'markdown',
      'json',
      'yaml',
      'log',
      'code',
      'pdf-preview-future',
      'image-preview-future',
      'spreadsheet-preview-future'
    ],
    permissions: [
      'preview-only',
      'read-only',
      'no-write',
      'no-delete',
      'no-execute',
      'no-shell',
      'no-host-direct-access',
      'approval-required',
      'audit-required',
      'size-limited',
      'type-limited'
    ],
    riskLevel: 'high',
    visibility: 'metadata-only',
    lifecycle: 'blocked',
    conceptualFileReference: 'owner-selected-file-placeholder',
    approvalRequired: true,
    boundaries: [
      boundary('preview-only', 'Preview only', 'preview-only', 'Future adapter may preview scoped content only.'),
      boundary('read-only', 'Read only', 'read-only', 'Future preview must never write, modify, rename, or delete files.'),
      boundary('no-host-direct-access', 'No host direct access', 'no-host-direct-access', 'GENIO and agents cannot access the host directly.'),
      boundary('approval-required', 'Approval required', 'approval-required', 'Owner approval is required before any future preview.'),
      boundary('audit-required', 'Audit required', 'audit-required', 'Future preview requests must create audit lineage.')
    ],
    constraints: [
      {
        id: 'no-filesystem-runtime',
        label: 'No filesystem runtime',
        permissions: ['no-write', 'no-delete', 'no-execute', 'no-shell', 'no-host-direct-access'],
        description: 'No fs, upload, watcher, indexing, traversal, shell, or execution path exists.',
        simulationOnly: true
      },
      {
        id: 'preview-scope-limits',
        label: 'Preview scope limits',
        permissions: ['size-limited', 'type-limited', 'approval-required'],
        description: 'Future previews must be size-limited, type-limited, owner-selected, and approval-gated.',
        simulationOnly: true
      }
    ],
    redactionPolicy: {
      id: 'file-preview-redaction-policy',
      label: 'File Preview Redaction Policy',
      status: 'metadata-only',
      redactionModes: [
        'secret-masking',
        'token-masking',
        'env-redaction',
        'key-detection',
        'pii-redaction',
        'unsafe-content-blocking'
      ],
      detectionImplemented: false,
      simulationOnly: true
    },
    auditTrace: {
      traceId: 'file-preview-trace-blueprint',
      correlationId: 'file-preview-corr-blueprint',
      proposalId: 'proposal-file-preview-blueprint',
      requestedBy: 'owner',
      governanceSource: 'genio-central',
      adapterId: 'file-preview-adapter',
      capabilityId: 'safe-file-preview-capability',
      sandboxRouteId: 'route-capability-to-sandbox',
      lifecycle: 'blocked',
      simulationOnly: true,
      actionExecuted: false
    },
    simulationOnly: true,
    actionExecuted: false
  },
  runtimeIntegration: {
    sandboxAware: true,
    capabilityAware: true,
    observabilityAware: true,
    approvalAware: true,
    authAware: true,
    runtimeSandboxId: 'controlled-runtime-sandbox-blueprint',
    capabilityBlueprintId: 'controlled-practical-capability-blueprint',
    observabilityBlueprintId: 'persistent-audit-observability-blueprint',
    approvalFlow: 'owner-approval-required',
    authMode: 'owner-access-code-temporary',
    simulationOnly: true
  },
  governanceRules: [
    'Read-only preview blueprint != filesystem access real.',
    'Proposal != Execution.',
    'GENIO governs future preview adapters but does not access the host directly.',
    'Future previews must be owner-approved, sandbox-aware, audit-aware, redaction-aware, size-limited, and type-limited.'
  ],
  nonCapabilities: [
    'No fs runtime, filesystem traversal, uploads, watchers, indexing, embeddings, OCR, parsing, shell access, file execution, or host access exists.',
    'No file contents are read, stored, parsed, embedded, summarized, or displayed in this phase.',
    'No write, delete, modify, rename, or move capability exists.'
  ],
  roadmap: [
    'Phase 1: Preview blueprint metadata',
    'Phase 2: Owner-selected file reference model',
    'Phase 3: Redaction pipeline design',
    'Phase 4: Read-only sandboxed preview proof',
    'Phase 5: Persistent audit for previews',
    'Phase 6: Type-specific preview adapters',
    'Phase 7: Enterprise file access policy'
  ],
  simulationOnly: true,
  actionExecuted: false
}
