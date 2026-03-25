interface GalleryCardProps {
  src: string
  alt: string
  description: string
}

export function GalleryCard({ src, alt, description }: GalleryCardProps) {
  return (
    <article className="gallery-card">
      <div className="gallery-media">
        <img
          src={src}
          alt={alt}
          width={600}
          height={400}
          loading="lazy"
          decoding="async"
          style={{ width: '100%', height: 'auto', objectFit: 'cover', aspectRatio: '3 / 2' }}
        />
      </div>
      <div className="gallery-copy">
        <p>{description}</p>
      </div>
    </article>
  )
}
