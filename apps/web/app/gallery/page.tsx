import type { Metadata } from 'next'
import { GalleryGrid } from '@/components/gallery/GalleryGrid'
import { captionFromFilename, galleryPublicUrl, listGalleryImageFiles } from '@/lib/gallery'

export const metadata: Metadata = {
  title: 'Galerie',
  description: 'Galerie visuelle du projet UNV-HMND.'
}

export default async function GalleryPage() {
  const files = await listGalleryImageFiles()
  const items = files.map((filename) => {
    const caption = captionFromFilename(filename)

    return {
      src: galleryPublicUrl(filename),
      alt: caption,
      description: caption
    }
  })

  return (
    <main className="page-shell">
      <section className="page-intro">
        <span className="hero-badge">Galerie</span>
        <h1>Galerie UNV-HMND</h1>
        <p>
          Une sélection d’images liées au projet, servies depuis les assets publics de l’application.
        </p>
      </section>

      {items.length > 0 ? (
        <GalleryGrid items={items} />
      ) : (
        <section className="panel">
          <p className="result-eyebrow">Galerie</p>
          <h2>Aucune image disponible</h2>
          <p>Ajoutez des images dans le dossier public/gallery pour alimenter cette page.</p>
        </section>
      )}
    </main>
  )
}
