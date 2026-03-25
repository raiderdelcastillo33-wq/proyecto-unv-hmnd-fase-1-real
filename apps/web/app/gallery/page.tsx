import type { Metadata } from 'next'
import { GalleryGrid } from '@/components/gallery/GalleryGrid'
import { captionFromFilename, galleryPublicUrl, listGalleryImageFiles } from '@/lib/gallery'

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'Professional image gallery served as static assets from public/gallery.'
}

export default async function GalleryPage() {
  const files = await listGalleryImageFiles()
  const galleryItems = files.map((file) => {
    const caption = captionFromFilename(file)
    return {
      src: galleryPublicUrl(file),
      alt: caption,
      description: caption
    }
  })

  return (
    <main className="page-shell">
      <section className="page-intro">
        <span className="status-pill status-pill--success">Galería de Imágenes</span>
        <h1>Galería Profesional</h1>
        <p>
          Colección de visuales que ilustran conceptos tecnológicos, interfaces y momentos capturados.
          Las imágenes se sirven como archivos estáticos desde <code>public/gallery</code> (sin rutas API
          intermedias), optimizado para Vercel y <code>next/image</code>.
        </p>
      </section>

      <GalleryGrid items={galleryItems} />
    </main>
  )
}
