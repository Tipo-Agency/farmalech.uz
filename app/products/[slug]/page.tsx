"use client"
import { use } from "react"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Pill, FileText, AlertTriangle, Package, Thermometer, Factory, ClipboardList, TestTube2 } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
// Импортировать хук
import { useTranslatedProduct } from "@/lib/translated-products"
import { cn } from "@/lib/utils"
import { ProductImage } from "@/components/product-image"

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { t } = useLanguage()
  // Получаем slug из Promise с помощью use()
  const { slug } = use(params)
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
    { title: t("product.storage"), content: product.storage, icon: <Thermometer /> },
    { title: t("product.manufacturer"), content: product.manufacturer, icon: <Factory /> },
  ].filter((section) => section.content)

  return (
    <div className="bg-white py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-6">
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
          </div>
        </div>
      </div>
    </div>
  )
}
