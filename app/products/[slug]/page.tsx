import type { Metadata } from "next"
import { notFound } from "next/navigation"
import ProductDetail from "@/components/pages/product-detail"
import { getProductBySlug, products } from "@/lib/products"
import { getPostsForProduct } from "@/lib/blog"
import { SITE_URL } from "@/lib/site"

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

function plainName(name: string) {
  return name.replace(/\s*\((.+)\)\s*$/, " — $1")
}

function absoluteImage(src: string) {
  return src.startsWith("http") ? src : `${SITE_URL}${src}`
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) return {}
  const isBad = /БАД/i.test(product.dispensing || "") || /биологически активн/i.test(product.description)
  const title = `${plainName(product.name)}: состав, применение${product.price ? ", цена" : ""}`
  const description = `${product.tagline}. ${isBad ? "БАД от FARMALECH. " : ""}Состав, способ применения, противопоказания${
    product.price ? `, цена ${product.price.toLocaleString("ru-RU")} сум` : ""
  }.`
  return {
    title,
    description: description.slice(0, 200),
    alternates: { canonical: `/products/${slug}` },
    openGraph: {
      url: `/products/${slug}`,
      title: plainName(product.name),
      description: product.tagline,
      images: [{ url: product.image, alt: product.name }],
    },
  }
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) notFound()

  const articles = getPostsForProduct(slug, 4).map((p) => ({ slug: p.slug, title: p.title }))

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        name: product.name,
        description: product.description,
        image: absoluteImage(product.image),
        url: `${SITE_URL}/products/${slug}`,
        brand: { "@type": "Brand", name: "FARMALECH" },
        manufacturer: { "@id": `${SITE_URL}/#organization` },
        ...(product.price
          ? {
              offers: {
                "@type": "Offer",
                price: product.price,
                priceCurrency: "UZS",
                availability: "https://schema.org/InStock",
                url: `${SITE_URL}/products/${slug}`,
                seller: { "@id": `${SITE_URL}/#organization` },
              },
            }
          : {}),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Главная", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Продукция", item: `${SITE_URL}/products` },
          { "@type": "ListItem", position: 3, name: product.name, item: `${SITE_URL}/products/${slug}` },
        ],
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ProductDetail slug={slug} articles={articles} />
    </>
  )
}
