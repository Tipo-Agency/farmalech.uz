"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"
import { useTranslatedProducts } from "@/lib/translated-products"

export default function ProductsPage() {
  const { t } = useLanguage()
  const products = useTranslatedProducts()

  return (
    <div className="bg-brand-gray">
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl text-brand-dark">
            {t("products.page.title")}
          </h1>
          <p className="max-w-[600px] mx-auto mt-4 text-muted-foreground md:text-xl">
            {t("products.page.description")}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <Link key={product.slug} href={`/products/${product.slug}`} className="group">
              <Card className="h-full overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-2">
                <CardHeader className="p-0">
                  <div className="w-full h-52 bg-white flex items-center justify-center">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={400}
                      height={400}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <h3 className="text-lg font-bold text-brand-dark">{product.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{product.tagline}</p>
                  <Button variant="link" className="p-0 mt-4">
                    {t("products.more")} →
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
