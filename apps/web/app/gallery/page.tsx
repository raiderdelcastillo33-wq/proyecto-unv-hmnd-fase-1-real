import type { Metadata } from 'next'
import { GalleryGrid } from '@/components/gallery/GalleryGrid'
import type { GalleryItem } from '@/components/gallery/GalleryGrid'

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'Professional image gallery served as static assets from public/gallery.'
}

const galleryItems: GalleryItem[] = [
  {
    src: '/gallery/paisajes-1.jpg',
    alt: 'Paisajes 1',
    description: 'Paisajes 1'
  },
  {
    src: '/gallery/paisajes-2.jpg',
    alt: 'Paisajes 2',
    description: 'Paisajes 2'
  }
]

export default function GalleryPage() {
  return (
    <main className="page-shell">
      <section className="page-intro">
        <span className="status-pill status-pill--success">Galería de Imágenes</span>
        <h1>Galería Profesional</h1>
        <p>
          Colección de visuales que ilustran conceptos tecnológicos, interfaces y momentos capturados.
          Las imágenes se sirven como archivos estáticos desde <code>public/gallery</code> (sin rutas API
          intermedias), optimizado para Vercel y carga directa con <code>{'<img src="/gallery/..." />'}</code>.
        </p>
      </section>

      <GalleryGrid items={galleryItems} />
    </main>
  )
}
