import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://unv-hmnd.vercel.app'
  const routes = ['/', '/demo', '/lab', '/about', '/portfolio', '/gallery', '/cv', '/download']

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    changeFrequency: route === '/' ? 'weekly' : 'monthly',
    priority: route === '/' ? 1 : route === '/demo' || route === '/lab' ? 0.9 : 0.7
  }))
}
