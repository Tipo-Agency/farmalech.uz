import type { Metadata } from "next"
import { ArticlePage, articleMetadata } from "@/components/blog/article-page"
import { getAllPosts } from "@/lib/blog"

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return getAllPosts("uz").map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  return articleMetadata(slug, "uz")
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  return <ArticlePage slug={slug} lang="uz" />
}
