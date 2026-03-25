'use client'

import Image from 'next/image'
import { useCallback, useState } from 'react'

interface GalleryCardProps {
  src: string
  alt: string
  description: string
}

export function GalleryCard({ src, alt, description }: GalleryCardProps) {
  const [useNativeImg, setUseNativeImg] = useState(false)

  const handleImageError = useCallback(() => {
    setUseNativeImg(true)
  }, [])

  return (
    <article className="gallery-card">
      <div className="gallery-media">
        {useNativeImg ? (
          // Fallback if the optimizer cannot process this asset (avoids broken layout).
          <img
            src={src}
            alt={alt}
            width={600}
            height={400}
            loading="lazy"
            decoding="async"
            style={{ width: '100%', height: 'auto', objectFit: 'cover', aspectRatio: '3 / 2' }}
          />
        ) : (
          <Image
            src={src}
            alt={alt}
            width={600}
            height={400}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
            loading="lazy"
            onError={handleImageError}
          />
        )}
      </div>
      <div className="gallery-copy">
        <p>{description}</p>
      </div>
    </article>
  )
}
