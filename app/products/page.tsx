import type { Metadata } from "next"
import ProductsPage from "@/components/pages/products-page"
import { products } from "@/lib/products"
import { SITE_URL } from "@/lib/site"

export const metadata: Metadata = {
  title: "Каталог БАД: состав, цены, способ применения",
  description:
    "Каталог продукции FARMALECH: БАД для дыхательных путей, печени, суставов и костей, женского и мужского здоровья, пищеварения и детей. Состав, форма выпуска и цены в сумах.",
  alternates: { canonical: "/products" },
  openGraph: { url: "/products", title: "Каталог продукции FARMALECH" },
}

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ItemList",
        name: "Каталог продукции FARMALECH",
        itemListElement: products.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: `${SITE_URL}/products/${p.slug}`,
          name: p.name,
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Главная", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Продукция", item: `${SITE_URL}/products` },
        ],
      },
    ],
  }
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ProductsPage />
    </>
  )
}
