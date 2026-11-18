import Link from "next/link"
import Image from "next/image"
import type { BlogPost } from "@/lib/blog"
import { getProductBySlug } from "@/lib/products"
import { MEDICAL_DISCLAIMER_RU, MEDICAL_DISCLAIMER_UZ } from "@/lib/site"

const LABELS = {
  ru: {
    home: "Главная",
    blog: "Блог",
    minutes: "мин чтения",
    contents: "Содержание",
    products: "Продукция по теме",
    more: "Подробнее",
    related: "Читайте также",
    langSwitch: "Oʻzbekcha",
    date: "Опубликовано",
  },
  uz: {
    home: "Bosh sahifa",
    blog: "Blog",
    minutes: "daqiqa oʻqish",
    contents: "Mundarija",
    products: "Mavzuga oid mahsulotlar",
    more: "Batafsil",
    related: "Shuningdek oʻqing",
    langSwitch: "Русская версия",
    date: "Eʼlon qilingan",
  },
} as const

function formatDate(date: string, lang: "ru" | "uz") {
  try {
    return new Date(date).toLocaleDateString(lang === "uz" ? "uz-UZ" : "ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  } catch {
    return date
  }
}

interface Props {
  post: BlogPost
  related: BlogPost[]
  alternateHref?: string
}

export function ArticleView({ post, related, alternateHref }: Props) {
  const l = LABELS[post.lang]
  const blogHref = post.lang === "uz" ? "/uz/blog" : "/blog"
  const products = post.products.map((s) => getProductBySlug(s)).filter((p): p is NonNullable<typeof p> => Boolean(p))

  return (
    <div className="bg-white py-12 md:py-20" lang={post.lang}>
      <div className="container mx-auto px-4 md:px-6">
        <nav aria-label="breadcrumb" className="mb-6 text-sm text-muted-foreground">
          <ol className="flex flex-wrap items-center gap-1">
            <li>
              <Link href="/" className="hover:text-brand-dark">{l.home}</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href={blogHref} className="hover:text-brand-dark">{l.blog}</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-brand-dark" aria-current="page">{post.category}</li>
          </ol>
        </nav>

        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px]">
          <article className="min-w-0 max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-wide text-brand-blue">{post.category}</p>
            <h1 className="mt-3 text-3xl font-bold tracking-tighter text-brand-dark sm:text-4xl md:text-5xl">{post.title}</h1>
            <p className="mt-4 text-lg text-gray-600">{post.description}</p>
            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
              <span>
                {l.date}: <time dateTime={post.date}>{formatDate(post.date, post.lang)}</time>
              </span>
              <span>
                {post.readingMinutes} {l.minutes}
              </span>
              {alternateHref ? (
                <Link href={alternateHref} hrefLang={post.lang === "ru" ? "uz" : "ru"} className="text-brand-blue underline underline-offset-4">
                  {l.langSwitch}
                </Link>
              ) : null}
            </div>

            {post.headings.length > 2 ? (
              <nav aria-label={l.contents} className="mt-8 rounded-xl bg-brand-gray p-6">
                <p className="font-semibold text-brand-dark">{l.contents}</p>
                <ol className="mt-3 list-decimal space-y-1 pl-5 text-gray-700">
                  {post.headings.map((h) => (
                    <li key={h.id}>
                      <a href={`#${h.id}`} className="hover:text-brand-blue">{h.text}</a>
                    </li>
                  ))}
                </ol>
              </nav>
            ) : null}

            <div className="article-body mt-8" dangerouslySetInnerHTML={{ __html: post.html }} />

            <p className="mt-10 rounded-lg border border-gray-200 bg-brand-gray p-4 text-sm text-gray-600">
              {post.lang === "uz" ? MEDICAL_DISCLAIMER_UZ : MEDICAL_DISCLAIMER_RU}
            </p>
          </article>

          <aside className="space-y-8 lg:sticky lg:top-24 lg:self-start">
            {products.length > 0 ? (
              <div>
                <h2 className="text-lg font-bold text-brand-dark">{l.products}</h2>
                <div className="mt-4 space-y-4">
                  {products.map((p) => (
                    <Link
                      key={p.slug}
                      href={`/products/${p.slug}`}
                      className="flex items-center gap-4 rounded-xl border bg-white p-3 transition-shadow hover:shadow-md"
                    >
                      <div className="flex h-20 w-20 shrink-0 items-center justify-center bg-white">
                        {p.imageViewport ? (
                          <svg viewBox={p.imageViewport} width={80} height={80} role="img" aria-label={p.name}>
                            <image href={p.image} width="1000" height="1414" />
                          </svg>
                        ) : (
                          <Image src={p.image} alt={p.name} width={80} height={80} className="max-h-20 w-auto object-contain" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className={`font-semibold ${p.color || "text-brand-dark"}`}>{p.name}</p>
                        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{p.tagline}</p>
                        {p.price ? <p className="mt-1 text-sm font-semibold text-blue-600">{p.price.toLocaleString("ru-RU")} сум</p> : null}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}

            {related.length > 0 ? (
              <div>
                <h2 className="text-lg font-bold text-brand-dark">{l.related}</h2>
                <ul className="mt-4 space-y-3">
                  {related.map((r) => (
                    <li key={r.slug}>
                      <Link href={`${blogHref}/${r.slug}`} className="text-gray-700 underline-offset-4 hover:text-brand-blue hover:underline">
                        {r.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </aside>
        </div>
      </div>
    </div>
  )
}
