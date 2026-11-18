import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/", "/_next/data/"] }],
    sitemap: "https://farmalech.uz/sitemap.xml",
    host: "https://farmalech.uz",
  }
}
