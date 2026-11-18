import type { Metadata } from "next"
import { BlogIndex } from "@/components/blog/blog-index"
import { getAllPosts, getCategories } from "@/lib/blog"
import { SITE_URL } from "@/lib/site"

export const metadata: Metadata = {
  title: "Блог о здоровье: витамины, БАД, профилактика",
  description:
    "Статьи FARMALECH простым языком: кашель и простуда, дефицит железа, печень, суставы, женское и мужское здоровье, пищеварение и здоровье детей. Когда нужен врач и как выбирать БАД.",
  alternates: { canonical: "/blog", languages: { ru: "/blog", uz: "/uz/blog", "x-default": "/blog" } },
  openGraph: { url: "/blog", title: "Блог FARMALECH о здоровье" },
}

export default function Page() {
  const posts = getAllPosts("ru")
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Блог FARMALECH",
    url: `${SITE_URL}/blog`,
    inLanguage: "ru",
    publisher: { "@id": `${SITE_URL}/#organization` },
    blogPost: posts.map((p) => ({ "@type": "BlogPosting", headline: p.title, url: `${SITE_URL}/blog/${p.slug}` })),
  }
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BlogIndex
        lang="ru"
        title="Блог о здоровье"
        description="Понятные статьи о витаминах, минералах и растительных компонентах, о профилактике и о том, когда пора к врачу."
        categories={getCategories("ru")}
      />
    </>
  )
}
