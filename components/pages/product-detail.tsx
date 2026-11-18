"use client"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Pill, FileText, AlertTriangle, Package, Thermometer, Factory, ClipboardList, TestTube2 } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { useTranslatedProduct } from "@/lib/translated-products"
import { cn } from "@/lib/utils"
import { ProductImage } from "@/components/product-image"
import { MEDICAL_DISCLAIMER_RU, MEDICAL_DISCLAIMER_UZ } from "@/lib/site"

interface Props {
  slug: string
  articles: { slug: string; title: string }[]
}

export default function ProductDetailPage({ slug, articles }: Props) {
  const { t, language } = useLanguage()
  const product = useTranslatedProduct(slug)

  if (!product) {
    notFound()
  }

  const sections = [
    {
      title: t("product.composition"),
      content: product.composition ? (
        <ul className="list-disc list-inside space-y-1">
          {product.composition.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      ) : null,
      icon: <Pill />,
    },
    { title: t("product.pharmacology"), content: product.pharmacology, icon: <TestTube2 /> },
    {
      title: t("product.indications"),
      content: (
        <ul className="list-disc list-inside space-y-1">
          {product.indications.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      ),
      icon: <FileText />,
    },
    { title: t("product.usage"), content: product.usage, icon: <ClipboardList /> },
    { title: t("product.contraindications"), content: product.contraindications, icon: <AlertTriangle /> },
    { title: t("product.overdose"), content: product.overdose, icon: <AlertTriangle /> },
    { title: t("product.releaseForm"), content: product.releaseForm, icon: <Package /> },
    {
      title: t("product.storage"),
      content: [product.storage, product.shelfLife].filter(Boolean).join(" "),
      icon: <Thermometer />,
    },
    { title: t("product.manufacturer"), content: product.manufacturer, icon: <Factory /> },
  ].filter((section) => section.content)

  return (
    <div className="bg-white py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <nav aria-label="breadcrumb" className="mb-6 text-sm text-muted-foreground">
          <ol className="flex flex-wrap items-center gap-1">
            <li>
              <Link href="/" className="hover:text-brand-dark">{language === "uz" ? "Bosh sahifa" : "Главная"}</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/products" className="hover:text-brand-dark">{t("nav.products")}</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-brand-dark" aria-current="page">{product.name}</li>
          </ol>
        </nav>
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
          <div className="flex flex-col items-center">
            <div className="sticky top-24 w-full bg-white rounded-xl p-4 md:p-8 flex justify-center items-center">
              <ProductImage product={product} size={500} className="max-w-full h-auto object-contain max-h-[450px]" />
            </div>
          </div>
          <div className="flex flex-col">
            <h1 className={cn("text-3xl md:text-4xl lg:text-5xl font-bold", product.color || "text-brand-dark")}>
              {product.name}
            </h1>
            {product.price ? (
              <p className="mt-3 text-2xl font-semibold text-blue-600">
                {product.price.toLocaleString("ru-RU")} сум
              </p>
            ) : null}
            <p className="mt-4 text-lg text-gray-600">{product.description}</p>
            <Badge  className="mt-6 w-fit text-base">
              {product.dispensing || "БАД"}
            </Badge>

            {product.brochure && (
              <a href={product.brochure} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex w-fit items-center gap-2 rounded-md border border-primary px-4 py-3 font-medium text-primary hover:bg-primary/5">
                <FileText className="h-5 w-5" aria-hidden="true" />
                {t("product.brochure")}
              </a>
            )}

            <div className="mt-10">
              <Accordion type="single" collapsible className="w-full" defaultValue="item-0">
                {sections.map((section, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-lg hover:no-underline">
                      <div className="flex items-center gap-3">
                        <div className="text-primary">{section.icon}</div>
                        <span className="font-semibold">{section.title}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-base text-gray-700 pt-2 pl-11">
                      {typeof section.content === "string" ? <p>{section.content}</p> : section.content}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            <p className="mt-8 rounded-lg bg-brand-gray p-4 text-sm text-gray-600">
              {language === "uz" ? MEDICAL_DISCLAIMER_UZ : MEDICAL_DISCLAIMER_RU}
            </p>

            {articles.length > 0 && language === "ru" ? (
              <div className="mt-10">
                <h2 className="text-xl font-bold text-brand-dark">Полезно почитать</h2>
                <ul className="mt-4 space-y-2">
                  {articles.map((a) => (
                    <li key={a.slug}>
                      <Link href={`/blog/${a.slug}`} className="text-brand-blue underline underline-offset-4 hover:text-brand-red">
                        {a.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}
