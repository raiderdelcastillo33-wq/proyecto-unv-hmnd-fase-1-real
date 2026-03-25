import { GalleryCard } from './GalleryCard'

export interface GalleryItem {
  src: string
  alt: string
  description: string
}

interface GalleryGridProps {
  items: GalleryItem[]
}

export function GalleryGrid({ items }: GalleryGridProps) {
  if (items.length === 0) {
    return (
      <section className="gallery-grid--empty" aria-live="polite">
        <p className="meta-text">
          No hay imágenes compatibles en la galería. Añade JPG, PNG, GIF, WebP o AVIF en{' '}
          <code>apps/web/public/gallery</code> y vuelve a desplegar. Los formatos HEIC/MP4 no se muestran aquí
          porque el navegador o el optimizador de Next no los tratan como imágenes estándar.
        </p>
      </section>
    )
  }

  return (
    <section className="gallery-grid">
      {items.map((item) => (
        <GalleryCard
          key={item.src}
          src={item.src}
          alt={item.alt}
          description={item.description}
        />
      ))}
    </section>
  )
}
