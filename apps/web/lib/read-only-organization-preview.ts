export type ReadOnlyPreviewExecutionMode = 'read-only-preview'

export type ReadOnlyPreviewFileCategory = 'image' | 'screenshot' | 'document' | 'archive' | 'code' | 'data' | 'other'

export type ReadOnlyPreviewFileMetadata = {
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

export type ReadOnlyOrganizationPreview = {
  id: string
  label: string
  simulationOnly: false
  executionMode: ReadOnlyPreviewExecutionMode
  actionExecuted: false
  filesystemWriteAccess: false
  filesystemDeleteAccess: false
  filesystemMoveAccess: false
  filesystemReadMode: 'browser-selected-metadata-only'
  approvalRequired: true
  ownerControlled: true
  scannedFileCount: number
  analyzedFileCount: number
  blockedFileCount: number
  duplicateGroups: Array<{
    id: string
    label: string
    duplicateKey: string
    fileIds: string[]
    actionMode: 'proposal-only'
  }>
  screenshotCount: number
  imageCount: number
  problematicNameCount: number
  mixedCategoryCount: number
  suggestedGroups: Array<{
    id: string
    label: string
    category: ReadOnlyPreviewFileCategory
    itemCount: number
    suggestedFolder: string
  }>
  checklist: string[]
  analyzedFiles: ReadOnlyPreviewFileMetadata[]
}

type BrowserFile = File & {
  webkitRelativePath?: string
}

const MAX_PREVIEW_FILES = 250
const PROTECTED_PATH_SEGMENTS = new Set([
  '.git',
  '.ssh',
  '.env',
  'node_modules',
  'library',
  'system',
  'system32',
  'windows',
  'applications'
])

function getExtension(name: string): string {
  const lastDot = name.lastIndexOf('.')

  if (lastDot < 0 || lastDot === name.length - 1) {
    return ''
  }

  return name.slice(lastDot + 1).toLowerCase()
}

function normalizeName(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/\b(copy|copia|final|final_final|edited|edit)\b/g, '')
    .replace(/\(\d+\)/g, '')
    .trim()
}

function getBlockedReason(relativePath: string): string | undefined {
  const segments = relativePath
    .split(/[\\/]/)
    .map((segment) => segment.trim().toLowerCase())
    .filter(Boolean)

  const protectedSegment = segments.find((segment) => segment.startsWith('.') || PROTECTED_PATH_SEGMENTS.has(segment))

  if (protectedSegment) {
    return `Protected or hidden path segment blocked: ${protectedSegment}`
  }

  return undefined
}

function isImageFile(type: string, extension: string): boolean {
  return type.startsWith('image/') || ['jpg', 'jpeg', 'png', 'gif', 'webp', 'heic', 'avif', 'tiff'].includes(extension)
}

function isScreenshotName(name: string): boolean {
  return /(screenshot|screen shot|captura|capture|img_\d{4}|screen)/i.test(name)
}

function hasProblematicName(name: string): boolean {
  return /(\s{2,}|final.*final|copy|copia|untitled|sin ordenar|tmp|temp|new file|nuevo)/i.test(name)
}

function categorizeFile(file: BrowserFile, extension: string): ReadOnlyPreviewFileCategory {
  const type = file.type.toLowerCase()

  if (isScreenshotName(file.name) && isImageFile(type, extension)) {
    return 'screenshot'
  }

  if (isImageFile(type, extension)) {
    return 'image'
  }

  if (['pdf', 'doc', 'docx', 'txt', 'md', 'rtf'].includes(extension)) {
    return 'document'
  }

  if (['zip', 'rar', '7z', 'tar', 'gz'].includes(extension)) {
    return 'archive'
  }

  if (['ts', 'tsx', 'js', 'jsx', 'css', 'html', 'json', 'py', 'java', 'go', 'rs'].includes(extension)) {
    return 'code'
  }

  if (['csv', 'xlsx', 'xls', 'yaml', 'yml', 'xml'].includes(extension)) {
    return 'data'
  }

  return 'other'
}

export function createReadOnlyPreviewMetadata(files: FileList | File[]): ReadOnlyPreviewFileMetadata[] {
  return Array.from(files)
    .slice(0, MAX_PREVIEW_FILES)
    .map((file, index) => {
      const browserFile = file as BrowserFile
      const relativePath = browserFile.webkitRelativePath || browserFile.name
      const extension = getExtension(browserFile.name)
      const category = categorizeFile(browserFile, extension)
      const isImage = isImageFile(browserFile.type.toLowerCase(), extension)
      const isScreenshot = category === 'screenshot'
      const duplicateKey = `${normalizeName(browserFile.name)}:${browserFile.size}`

      return {
        id: `preview-file-${index}`,
        name: browserFile.name,
        relativePath,
        size: browserFile.size,
        type: browserFile.type || 'unknown',
        lastModified: browserFile.lastModified,
        extension,
        category,
        isScreenshot,
        isImage,
        hasProblematicName: hasProblematicName(browserFile.name),
        duplicateKey,
        blockedReason: getBlockedReason(relativePath)
      }
    })
}

export function analyzeReadOnlyOrganizationPreview(files: ReadOnlyPreviewFileMetadata[]): ReadOnlyOrganizationPreview {
  const analyzedFiles = files.filter((file) => !file.blockedReason)
  const categoryCounts = analyzedFiles.reduce<Record<ReadOnlyPreviewFileCategory, number>>(
    (counts, file) => ({
      ...counts,
      [file.category]: (counts[file.category] ?? 0) + 1
    }),
    {
      image: 0,
      screenshot: 0,
      document: 0,
      archive: 0,
      code: 0,
      data: 0,
      other: 0
    }
  )
  const duplicateBuckets = analyzedFiles.reduce<Record<string, ReadOnlyPreviewFileMetadata[]>>((buckets, file) => {
    return {
      ...buckets,
      [file.duplicateKey]: [...(buckets[file.duplicateKey] ?? []), file]
    }
  }, {})
  const duplicateGroups = Object.entries(duplicateBuckets)
    .filter(([, group]) => group.length > 1)
    .map(([duplicateKey, group], index) => ({
      id: `duplicate-group-${index}`,
      label: group[0]?.name ?? 'Duplicate candidate',
      duplicateKey,
      fileIds: group.map((file) => file.id),
      actionMode: 'proposal-only' as const
    }))
  const suggestedGroups = Object.entries(categoryCounts)
    .filter(([, count]) => count > 0)
    .map(([category, count]) => ({
      id: `group-${category}`,
      label: `${category} group`,
      category: category as ReadOnlyPreviewFileCategory,
      itemCount: count,
      suggestedFolder: `Preview/${category}`
    }))

  return {
    id: 'controlled-read-only-organization-preview',
    label: 'Controlled Read-Only Organization Preview',
    simulationOnly: false,
    executionMode: 'read-only-preview',
    actionExecuted: false,
    filesystemWriteAccess: false,
    filesystemDeleteAccess: false,
    filesystemMoveAccess: false,
    filesystemReadMode: 'browser-selected-metadata-only',
    approvalRequired: true,
    ownerControlled: true,
    scannedFileCount: files.length,
    analyzedFileCount: analyzedFiles.length,
    blockedFileCount: files.length - analyzedFiles.length,
    duplicateGroups,
    screenshotCount: analyzedFiles.filter((file) => file.isScreenshot).length,
    imageCount: analyzedFiles.filter((file) => file.isImage).length,
    problematicNameCount: analyzedFiles.filter((file) => file.hasProblematicName).length,
    mixedCategoryCount: suggestedGroups.length,
    suggestedGroups,
    checklist: [
      'Review duplicate candidates manually before any future cleanup.',
      'Separate screenshots and images from documents for faster visual search.',
      'Rename problematic files only after explicit owner approval in a future phase.',
      'Keep this result as a preview. No file operation has been executed.'
    ],
    analyzedFiles
  }
}
