import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Humanity Guide OS | UNV-HMND',
    short_name: 'UNV-HMND',
    description:
      'Governed AI organization demo with public multi-agent flow and simulation-only Private Lab.',
    start_url: '/',
    display: 'standalone',
    background_color: '#070b11',
    theme_color: '#070b11',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml'
      }
    ]
  }
}
