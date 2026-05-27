export type AdapterCategory =
  | 'terminal'
  | 'filesystem'
  | 'email'
  | 'documents'
  | 'finance'
  | 'calendar'
  | 'browser'
  | 'local-computer'
  | 'cloud'
  | 'communication'

export type AdapterRiskLevel = 'low' | 'medium' | 'high' | 'critical'

export type AdapterPermissionScope =
  | 'read-only'
  | 'propose-only'
  | 'draft-only'
  | 'approval-required'
  | 'forbidden'
  | 'future-executable'

export type AdapterExecutionMode = 'metadata-only' | 'simulation-only' | 'proposal-only' | 'blocked'

export type AdapterApprovalRequirement = 'owner-approval-required' | 'always-blocked' | 'future-policy-required'

export interface AdapterCapability {
  id: string
  label: string
  permissionScope: AdapterPermissionScope
  simulationOnly: true
}

export interface AdapterSafetyBoundary {
  id: string
  label: string
  description: string
  simulationOnly: true
}

export interface AdapterProfile {
  id: string
  label: string
  description: string
  category: AdapterCategory
  capabilities: AdapterCapability[]
  riskLevel: AdapterRiskLevel
  executionMode: AdapterExecutionMode
  approvalRequirement: AdapterApprovalRequirement
  safetyBoundaries: AdapterSafetyBoundary[]
  forbiddenActions: string[]
  simulationOnly: true
  actionExecuted: false
}

export interface AdapterApprovalPolicy {
  readOnly: AdapterPermissionScope
  proposeOnly: AdapterPermissionScope
  draftOnly: AdapterPermissionScope
  approvalRequired: AdapterPermissionScope
  forbidden: AdapterPermissionScope
  futureExecutable: AdapterPermissionScope
  governanceRules: string[]
  simulationOnly: true
}

export interface ControlledAdapterBlueprint {
  id: 'controlled-adapter-blueprint'
  label: string
  status: 'metadata-only'
  adapters: AdapterProfile[]
  approvalPolicy: AdapterApprovalPolicy
  futureReadiness: AdapterCapability[]
  governanceRules: string[]
  simulationOnly: true
  actionExecuted: false
}

function capability(id: string, label: string, permissionScope: AdapterPermissionScope): AdapterCapability {
  return {
    id,
    label,
    permissionScope,
    simulationOnly: true
  }
}

function boundary(id: string, label: string, description: string): AdapterSafetyBoundary {
  return {
    id,
    label,
    description,
    simulationOnly: true
  }
}

export const CONTROLLED_ADAPTER_BLUEPRINT: ControlledAdapterBlueprint = {
  id: 'controlled-adapter-blueprint',
  label: 'Controlled Adapter Blueprint',
  status: 'metadata-only',
  adapters: [
    {
      id: 'terminal-adapter',
      label: 'Terminal Adapter',
      description: 'Future adapter for proposing terminal commands under strict owner approval.',
      category: 'terminal',
      capabilities: [capability('terminal-command-proposal', 'Terminal command proposal', 'propose-only')],
      riskLevel: 'critical',
      executionMode: 'blocked',
      approvalRequirement: 'always-blocked',
      safetyBoundaries: [
        boundary('no-child-process', 'No child process', 'No terminal process can be spawned in this phase.'),
        boundary('text-only-commands', 'Text-only commands', 'Commands remain proposal text only.')
      ],
      forbiddenActions: ['child_process', 'shell-execution', 'process-spawn', 'env-secret-reading'],
      simulationOnly: true,
      actionExecuted: false
    },
    {
      id: 'filesystem-adapter',
      label: 'Filesystem Adapter',
      description: 'Future adapter for scoped filesystem operations after explicit approval.',
      category: 'filesystem',
      capabilities: [
        capability('filesystem-read-proposal', 'Filesystem read proposal', 'approval-required'),
        capability('filesystem-write-proposal', 'Filesystem write proposal', 'forbidden')
      ],
      riskLevel: 'critical',
      executionMode: 'blocked',
      approvalRequirement: 'always-blocked',
      safetyBoundaries: [
        boundary('no-real-fs', 'No real filesystem', 'No files are read, written, moved, or deleted in this phase.')
      ],
      forbiddenActions: ['fs-read', 'fs-write', 'delete-file', 'move-file', 'read-secrets'],
      simulationOnly: true,
      actionExecuted: false
    },
    {
      id: 'file-preview-adapter',
      label: 'File Preview Adapter',
      description: 'Future read-only preview adapter for owner-selected files.',
      category: 'documents',
      capabilities: [capability('file-preview-proposal', 'File preview proposal', 'read-only')],
      riskLevel: 'medium',
      executionMode: 'metadata-only',
      approvalRequirement: 'future-policy-required',
      safetyBoundaries: [
        boundary('owner-selected-only', 'Owner-selected only', 'Future previews must be scoped to owner-selected files.')
      ],
      forbiddenActions: ['read-unapproved-file', 'read-secret', 'bulk-scan'],
      simulationOnly: true,
      actionExecuted: false
    },
    {
      id: 'email-draft-adapter',
      label: 'Email Draft Adapter',
      description: 'Future adapter for drafting email text without sending messages.',
      category: 'email',
      capabilities: [capability('email-draft', 'Email draft', 'draft-only')],
      riskLevel: 'high',
      executionMode: 'proposal-only',
      approvalRequirement: 'owner-approval-required',
      safetyBoundaries: [
        boundary('no-send', 'No send', 'Future email support may draft only until explicit send policy exists.')
      ],
      forbiddenActions: ['send-email', 'read-inbox', 'modify-mailbox', 'contact-external-service'],
      simulationOnly: true,
      actionExecuted: false
    },
    {
      id: 'finance-simulation-adapter',
      label: 'Finance Simulation Adapter',
      description: 'Future adapter for financial scenario modeling without transactions.',
      category: 'finance',
      capabilities: [capability('finance-scenario', 'Finance scenario simulation', 'propose-only')],
      riskLevel: 'critical',
      executionMode: 'simulation-only',
      approvalRequirement: 'owner-approval-required',
      safetyBoundaries: [
        boundary('no-money-movement', 'No money movement', 'No trading, transfers, banking, or brokerage actions exist.')
      ],
      forbiddenActions: ['trade', 'transfer-money', 'connect-bank', 'investment-order'],
      simulationOnly: true,
      actionExecuted: false
    },
    {
      id: 'local-computer-adapter',
      label: 'Local Computer Adapter',
      description: 'Future adapter for local device coordination with strict safety gates.',
      category: 'local-computer',
      capabilities: [capability('local-device-plan', 'Local device plan', 'approval-required')],
      riskLevel: 'critical',
      executionMode: 'blocked',
      approvalRequirement: 'always-blocked',
      safetyBoundaries: [
        boundary('no-os-control', 'No OS control', 'No operating system automation or device control exists.')
      ],
      forbiddenActions: ['os-automation', 'keyboard-control', 'mouse-control', 'install-software'],
      simulationOnly: true,
      actionExecuted: false
    },
    {
      id: 'document-organization-adapter',
      label: 'Document Organization Adapter',
      description: 'Future adapter for classifying and organizing document metadata.',
      category: 'documents',
      capabilities: [capability('document-classifier', 'Document classifier proposal', 'propose-only')],
      riskLevel: 'medium',
      executionMode: 'metadata-only',
      approvalRequirement: 'future-policy-required',
      safetyBoundaries: [
        boundary('metadata-only', 'Metadata only', 'No files are opened, moved, renamed, or rewritten in this phase.')
      ],
      forbiddenActions: ['rename-file', 'move-file', 'write-file', 'bulk-index'],
      simulationOnly: true,
      actionExecuted: false
    }
  ],
  approvalPolicy: {
    readOnly: 'read-only',
    proposeOnly: 'propose-only',
    draftOnly: 'draft-only',
    approvalRequired: 'approval-required',
    forbidden: 'forbidden',
    futureExecutable: 'future-executable',
    governanceRules: [
      'Adapter blueprint is not an adapter runtime.',
      'Future adapters must be approval-required, audit-first, permission-scoped, and owner-controlled.',
      'No adapter can execute real-world actions in this phase.'
    ],
    simulationOnly: true
  },
  futureReadiness: [
    capability('terminal-command-adapter', 'Terminal command adapter', 'future-executable'),
    capability('filesystem-read-adapter', 'Filesystem read adapter', 'future-executable'),
    capability('filesystem-write-adapter', 'Filesystem write adapter', 'forbidden'),
    capability('email-draft-adapter', 'Email draft adapter', 'draft-only'),
    capability('finance-scenario-adapter', 'Finance scenario adapter', 'propose-only'),
    capability('local-device-adapter', 'Local device adapter', 'approval-required'),
    capability('document-classifier-adapter', 'Document classifier adapter', 'propose-only')
  ],
  governanceRules: [
    'Adapter blueprint != adapter real.',
    'Proposal != execution.',
    'No child_process, fs, Gmail API, banking API, trading API, browser automation, OS automation, credentials, env secret reading, or external HTTP action is active.',
    'Any future executable adapter must require owner approval and audit metadata before consideration.'
  ],
  simulationOnly: true,
  actionExecuted: false
}
