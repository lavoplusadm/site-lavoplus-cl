import { MetadataRoute } from 'next'
import { getSiteUrl } from '@/config/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date()

  return [
    // Página principal
    {
      url: getSiteUrl('/'),
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1,
    },
    // Páginas informativas
    {
      url: getSiteUrl('/nosotros'),
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: getSiteUrl('/precios'),
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ]
}
