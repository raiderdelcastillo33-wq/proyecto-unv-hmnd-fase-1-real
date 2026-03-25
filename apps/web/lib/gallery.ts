import { promises as fs } from 'fs'
import path from 'path'

/**
 * Extensions that work reliably with next/image in browsers (excludes HEIC, MP4, etc.).
 */
const GALLERY_IMAGE_EXT = /\.(jpe?g|png|gif|webp|avif|bmp|tif{1,2})$/i

const GALLERY_DIR_SEGMENTS = ['public', 'gallery'] as const

export function getGalleryAbsolutePath(cwd: string = process.cwd()): string {
  return path.join(cwd, ...GALLERY_DIR_SEGMENTS)
}

/**
 * Public URL for a file inside `public/gallery`. Encodes each path segment for spaces/special chars.
 */
export function galleryPublicUrl(filename: string): string {
  const safeName = path.basename(filename)
  return `/gallery/${encodeURIComponent(safeName)}`
}

export function captionFromFilename(filename: string): string {
  const base = path.basename(filename, path.extname(filename))
  const cleaned = base.replace(/[-_]/g, ' ').replace(/\s+/g, ' ').trim()
  if (!cleaned) {
    return filename
  }
  return cleaned.replace(/\b\w/g, (c) => c.toUpperCase())
}

/**
 * Lists image files from `apps/web/public/gallery` (or `{cwd}/public/gallery`).
 * Returns [] if the directory is missing or unreadable (e.g. local clone without assets).
 */
export async function listGalleryImageFiles(cwd: string = process.cwd()): Promise<string[]> {
  const galleryPath = getGalleryAbsolutePath(cwd)

  try {
    const entries = await fs.readdir(galleryPath, { withFileTypes: true })
    return entries
      .filter((entry) => entry.isFile() && !entry.name.startsWith('.') && GALLERY_IMAGE_EXT.test(entry.name))
      .map((entry) => entry.name)
      .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }))
  } catch {
    return []
  }
}
