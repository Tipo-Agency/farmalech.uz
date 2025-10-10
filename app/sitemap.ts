import { MetadataRoute } from 'next'
import { products } from '@/lib/products'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://farmalech.uz'
  const currentDate = new Date().toISOString()

  // Статические страницы
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contacts`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]

  // Динамические страницы продуктов
  const productPages: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [...staticPages, ...productPages]
}

