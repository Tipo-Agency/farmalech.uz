import Link from "next/link"
import type { BlogPost } from "@/lib/blog"

interface Props {
  lang: "ru" | "uz"
  title: string
  description: string
  categories: { name: string; posts: BlogPost[] }[]
}

export function BlogIndex({ lang, title, description, categories }: Props) {
  const base = lang === "uz" ? "/uz/blog" : "/blog"
  return (
    <div className="bg-brand-gray" lang={lang}>
      <div className="container mx-auto px-4 py-12 md:px-6 md:py-20">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tighter text-brand-dark sm:text-5xl">{title}</h1>
          <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground md:text-xl">{description}</p>
        </div>

        {categories.length > 1 ? (
          <nav aria-label="Рубрики" className="mb-12 flex flex-wrap justify-center gap-2">
            {categories.map((c, i) => (
              <a
                key={c.name}
                href={`#cat-${i + 1}`}
                className="rounded-full border bg-white px-4 py-2 text-sm font-medium text-brand-dark transition-colors hover:border-brand-blue hover:text-brand-blue"
              >
                {c.name} <span className="text-muted-foreground">{c.posts.length}</span>
              </a>
            ))}
          </nav>
        ) : null}

        <div className="space-y-16">
          {categories.map((c, i) => (
            <section key={c.name} id={`cat-${i + 1}`} className="scroll-mt-24">
              <h2 className="mb-6 text-2xl font-bold tracking-tight text-brand-dark sm:text-3xl">{c.name}</h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {c.posts.map((p) => (
                  <Link
                    key={p.slug}
                    href={`${base}/${p.slug}`}
                    className="group flex h-full flex-col rounded-xl border bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <h3 className="text-lg font-bold text-brand-dark group-hover:text-brand-blue">{p.title}</h3>
                    <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{p.description}</p>
                    <span className="mt-auto pt-4 text-sm font-medium text-brand-dark">
                      {lang === "uz" ? "Oʻqish" : "Читать"} →
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}
