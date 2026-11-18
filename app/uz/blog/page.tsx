import type { Metadata } from "next"
import { BlogIndex } from "@/components/blog/blog-index"
import { getCategories } from "@/lib/blog"

export const metadata: Metadata = {
  title: "Salomatlik haqida blog: vitaminlar, BFQ, profilaktika",
  description:
    "FARMALECH maqolalari oddiy tilda: temir yetishmasligi, yoʻtal, jigar, boʻgʻimlar, ayollar va erkaklar salomatligi, ovqat hazm qilish va bolalar salomatligi.",
  alternates: { canonical: "/uz/blog", languages: { ru: "/blog", uz: "/uz/blog", "x-default": "/blog" } },
  openGraph: { url: "/uz/blog", locale: "uz_UZ", title: "FARMALECH salomatlik blogi" },
}

export default function Page() {
  return (
    <BlogIndex
      lang="uz"
      title="Salomatlik haqida blog"
      description="Vitaminlar, minerallar va oʻsimlik komponentlari, profilaktika hamda qachon shifokorga murojaat qilish kerakligi haqida tushunarli maqolalar."
      categories={getCategories("uz")}
    />
  )
}
