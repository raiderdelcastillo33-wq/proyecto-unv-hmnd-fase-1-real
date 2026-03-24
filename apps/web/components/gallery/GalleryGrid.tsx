import { GalleryCard } from './GalleryCard'

interface GalleryItem {
  src: string
  alt: string
  description: string
}

interface GalleryGridProps {
  items: GalleryItem[]
}

export function GalleryGrid({ items }: GalleryGridProps) {
  return (
    <section className="gallery-grid">
      {items.map((item, index) => (
        <GalleryCard
          key={index}
          src={item.src}
          alt={item.alt}
          description={item.description}
        />
      ))}
    </section>
  )
}