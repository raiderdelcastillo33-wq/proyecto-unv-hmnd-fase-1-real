import Image from 'next/image'

interface GalleryCardProps {
  src: string
  alt: string
  description: string
}

export function GalleryCard({ src, alt, description }: GalleryCardProps) {
  return (
    <article className="gallery-card">
      <div className="gallery-media">
        <Image
          src={src}
          alt={alt}
          width={600}
          height={400}
          style={{ objectFit: 'cover' }}
          loading="lazy"
        />
      </div>
      <div className="gallery-copy">
        <p>{description}</p>
      </div>
    </article>
  )
}