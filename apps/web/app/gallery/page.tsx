import { promises as fs } from 'fs'
import path from 'path'
import { GalleryGrid } from '../../components/gallery/GalleryGrid'
import { runAiTask } from '../../services/ai'

async function getImageFiles(): Promise<string[]> {
  const galleryPath = path.join(process.cwd(), 'public/gallery')
  const files = await fs.readdir(galleryPath)
  return files.filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
}

async function generateDescription(filename: string): Promise<string> {
  try {
    const result = await runAiTask({
      task: 'summary',
      text: `Generate a short, descriptive caption for an image file named "${filename}". Make it professional and concise.`
    })
    return result.output
  } catch (error) {
    // Fallback: clean filename
    return filename.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ").replace(/\b\w/g, l => l.toUpperCase())
  }
}

export default async function GalleryPage() {
  const imageFiles = await getImageFiles()
  const galleryItems = await Promise.all(
    imageFiles.map(async (file) => ({
      src: `/gallery/${encodeURI(file)}`,
      alt: file,
      description: await generateDescription(file)
    }))
  )

  return (
    <main className="page-shell">
      <section className="page-intro">
        <span className="status-pill status-pill--success">Galería de Imágenes</span>
        <h1>Galería Profesional</h1>
        <p>
          Colección de visuales que ilustran conceptos tecnológicos, interfaces y momentos capturados.
          Optimizada para presentaciones y revisiones técnicas.
        </p>
      </section>

      <GalleryGrid items={galleryItems} />
    </main>
  )
}