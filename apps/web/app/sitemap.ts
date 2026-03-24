import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['/', '/about', '/demo', '/portfolio', '/cv']

  return routes.map((route) => ({
    url: route,
    changeFrequency: route === '/' ? 'weekly' : 'monthly',
    priority: route === '/' ? 1 : 0.7
  }))
}
