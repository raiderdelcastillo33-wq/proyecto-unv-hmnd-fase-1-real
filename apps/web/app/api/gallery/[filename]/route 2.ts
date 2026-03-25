import { promises as fs } from 'fs'
import path from 'path'
import { NextRequest } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  const { filename } = await params
  const filePath = path.join(process.cwd(), 'public/gallery', filename)

  try {
    const fileBuffer = await fs.readFile(filePath)
    const ext = path.extname(filename).toLowerCase()
    const mimeTypes: Record<string, string> = {
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.png': 'image/png',
      '.gif': 'image/gif',
      '.webp': 'image/webp',
      '.mp4': 'video/mp4'
    }
    const contentType = mimeTypes[ext] || 'application/octet-stream'

    return new Response(fileBuffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000'
      }
    })
  } catch (error) {
    return new Response('File not found', { status: 404 })
  }
}