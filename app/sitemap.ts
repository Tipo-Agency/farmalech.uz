import type { MetadataRoute } from "next"
import { products } from "@/lib/products"
import { getAllPosts, hasTranslation } from "@/lib/blog"
import { SITE_URL } from "@/lib/site"

const SITE_UPDATED = "2026-11-18"

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: SITE_UPDATED, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE_URL}/products`, lastModified: SITE_UPDATED, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/contacts`, lastModified: SITE_UPDATED, changeFrequency: "monthly", priority: 0.7 },
    {
      url: `${SITE_URL}/blog`,
      lastModified: SITE_UPDATED,
      changeFrequency: "weekly",
      priority: 0.7,
      alternates: { languages: { ru: `${SITE_URL}/blog`, uz: `${SITE_URL}/uz/blog` } },
    },
    { url: `${SITE_URL}/uz/blog`, lastModified: SITE_UPDATED, changeFrequency: "weekly", priority: 0.5 },
  ]

  const productPages: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${SITE_URL}/products/${product.slug}`,
    lastModified: SITE_UPDATED,
    changeFrequency: "monthly",
    priority: 0.8,
  }))

  const ruPosts: MetadataRoute.Sitemap = getAllPosts("ru").map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: post.date,
    changeFrequency: "monthly",
    priority: 0.6,
    ...(hasTranslation(post.slug, "uz")
      ? { alternates: { languages: { ru: `${SITE_URL}/blog/${post.slug}`, uz: `${SITE_URL}/uz/blog/${post.slug}` } } }
      : {}),
  }))

  const uzPosts: MetadataRoute.Sitemap = getAllPosts("uz").map((post) => ({
    url: `${SITE_URL}/uz/blog/${post.slug}`,
    lastModified: post.date,
    changeFrequency: "monthly",
    priority: 0.5,
    alternates: { languages: { ru: `${SITE_URL}/blog/${post.slug}`, uz: `${SITE_URL}/uz/blog/${post.slug}` } },
  }))

  return [...staticPages, ...productPages, ...ruPosts, ...uzPosts]
}
