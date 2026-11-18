import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ArticleView } from "@/components/blog/article-view"
import { getPost, getRelatedPosts, hasTranslation, type BlogLang } from "@/lib/blog"
import { DEFAULT_OG_IMAGE, SITE_URL } from "@/lib/site"

const path = (slug: string, lang: BlogLang) => (lang === "uz" ? `/uz/blog/${slug}` : `/blog/${slug}`)

export function articleMetadata(slug: string, lang: BlogLang): Metadata {
  const post = getPost(slug, lang)
  if (!post) return {}
  const other: BlogLang = lang === "ru" ? "uz" : "ru"
  const languages: Record<string, string> = { [lang]: path(slug, lang) }
  if (hasTranslation(slug, other)) languages[other] = path(slug, other)
  if (languages.ru) languages["x-default"] = languages.ru
  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: path(slug, lang), languages: Object.keys(languages).length > 1 ? languages : undefined },
    openGraph: {
      type: "article",
      url: path(slug, lang),
      title: post.title,
      description: post.description,
      locale: lang === "uz" ? "uz_UZ" : "ru_RU",
      publishedTime: post.date,
      images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: post.title }],
    },
  }
}

export function ArticlePage({ slug, lang }: { slug: string; lang: BlogLang }) {
  const post = getPost(slug, lang)
  if (!post) notFound()
  const other: BlogLang = lang === "ru" ? "uz" : "ru"
  const url = `${SITE_URL}${path(slug, lang)}`
  const blogUrl = `${SITE_URL}${lang === "uz" ? "/uz/blog" : "/blog"}`

  const graph: Record<string, unknown>[] = [
    {
      "@type": "Article",
      headline: post.title,
      description: post.description,
      inLanguage: lang,
      datePublished: post.date,
      dateModified: post.date,
      mainEntityOfPage: url,
      url,
      image: `${SITE_URL}${DEFAULT_OG_IMAGE}`,
      articleSection: post.category,
      keywords: post.keywords.join(", "),
      author: { "@type": "Organization", name: "FARMALECH", url: SITE_URL },
      publisher: { "@id": `${SITE_URL}/#organization` },
      about: post.products.map((p) => ({ "@type": "Product", url: `${SITE_URL}/products/${p}` })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: lang === "uz" ? "Bosh sahifa" : "Главная", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Блог", item: blogUrl },
        { "@type": "ListItem", position: 3, name: post.title, item: url },
      ],
    },
  ]
  if (post.faq.length) {
    graph.push({
      "@type": "FAQPage",
      mainEntity: post.faq.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    })
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }) }}
      />
      <ArticleView
        post={post}
        related={getRelatedPosts(post, 4)}
        alternateHref={hasTranslation(slug, other) ? path(slug, other) : undefined}
      />
    </>
  )
}
