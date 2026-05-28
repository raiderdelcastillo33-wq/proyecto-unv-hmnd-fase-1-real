export type ReadOnlyPreviewExecutionMode = 'read-only-preview'

export type ReadOnlyPreviewAccessPolicy = {
  simulationOnly: false
  executionMode: ReadOnlyPreviewExecutionMode
  actionExecuted: false
  filesystemWriteAccess: false
  filesystemDeleteAccess: false
  filesystemMoveAccess: false
  filesystemReadMode: 'browser-selected-metadata-only'
  approvalRequired: true
  ownerControlled: true
}

export type ReadOnlyPreviewFileCategory = 'image' | 'screenshot' | 'document' | 'archive' | 'code' | 'data' | 'other'

export type ReadOnlyPreviewMetadata = {
  id: string
  name: string
  relativePath: string
  size: number
  type: string
  lastModified: number
  extension: string
  category: ReadOnlyPreviewFileCategory
  isScreenshot: boolean
  isImage: boolean
  hasProblematicName: boolean
  duplicateKey: string
  blockedReason?: string
}

export type ReadOnlyPreviewDuplicateGroup = {
  id: string
  label: string
  duplicateKey: string
  fileIds: string[]
  actionMode: 'proposal-only'
}

export type ReadOnlyOrganizationProposal = {
  id: string
  title: string
  suggestedGroups: Array<{
    id: string
    label: string
    category: ReadOnlyPreviewFileCategory
    itemCount: number
    suggestedFolder: string
  }>
  checklist: string[]
  simulationOnly: false
  executionMode: ReadOnlyPreviewExecutionMode
  actionExecuted: false
}

export type ReadOnlyOrganizationPreview = {
  id: string
  label: string
  accessPolicy: ReadOnlyPreviewAccessPolicy
  scannedFileCount: number
  analyzedFileCount: number
  blockedFileCount: number
  duplicateGroups: ReadOnlyPreviewDuplicateGroup[]
  screenshotCount: number
  imageCount: number
  problematicNameCount: number
  mixedCategoryCount: number
  proposal: ReadOnlyOrganizationProposal
}

export const READ_ONLY_ORGANIZATION_PREVIEW_POLICY: ReadOnlyPreviewAccessPolicy = {
  simulationOnly: false,
  executionMode: 'read-only-preview',
  actionExecuted: false,
  filesystemWriteAccess: false,
  filesystemDeleteAccess: false,
  filesystemMoveAccess: false,
  filesystemReadMode: 'browser-selected-metadata-only',
  approvalRequired: true,
  ownerControlled: true
}
