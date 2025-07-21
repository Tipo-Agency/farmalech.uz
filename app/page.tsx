"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
// Импортировать хук
import { useTranslatedProducts } from "@/lib/translated-products"

export default function HomePage() {
  const { t } = useLanguage()
  // В компоненте заменить:
  // На:
  const translatedProducts = useTranslatedProducts()
  const featuredProducts = translatedProducts.slice(0, 3)

  return (
    <div className="flex flex-col min-h-dvh">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-20 md:py-32 lg:py-40 bg-brand-gray">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-brand-dark">
                  {t("hero.title")}
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">{t("hero.description")}</p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="#partnership">
                    <Button size="lg">{t("hero.partner")}</Button>
                  </Link>
                  <Link href="/products">
                    <Button size="lg" variant="outline">
                      {t("hero.products")}
                    </Button>
                  </Link>
                </div>
              </div>
              <Image
                src="/hero-image.jpeg"
                width="550"
                height="550"
                alt={t("hero.image.alt")}
                className="mx-auto aspect-square overflow-hidden rounded-xl object-cover sm:w-full"
              />
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="w-full py-12 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">{t("about.title")}</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {t("about.description")}
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 mt-12">
              <div className="grid gap-1 text-center">
                <CheckCircle className="h-10 w-10 mx-auto text-primary" />
                <h3 className="text-lg font-bold">{t("about.quality")}</h3>
                <p className="text-sm text-muted-foreground">{t("about.quality.desc")}</p>
              </div>
              <div className="grid gap-1 text-center">
                <CheckCircle className="h-10 w-10 mx-auto text-primary" />
                <h3 className="text-lg font-bold">{t("about.innovation")}</h3>
                <p className="text-sm text-muted-foreground">{t("about.innovation.desc")}</p>
              </div>
              <div className="grid gap-1 text-center">
                <CheckCircle className="h-10 w-10 mx-auto text-primary" />
                <h3 className="text-lg font-bold">{t("about.partnership")}</h3>
                <p className="text-sm text-muted-foreground">{t("about.partnership.desc")}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section id="products" className="w-full py-12 md:py-24 bg-brand-gray">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">{t("products.title")}</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">{t("products.description")}</p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredProducts.map((product) => (
                <Card key={product.slug} className="overflow-hidden">
                  <CardHeader className="p-0">
                    <div className="w-full h-60 bg-white flex items-center justify-center">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        width={400}
                        height={400}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold">{product.name}</h3>
                    <p className="text-muted-foreground mt-2">{product.tagline}</p>
                    <Link href={`/products/${product.slug}`} className="mt-4 inline-block">
                      <Button>{t("products.more")}</Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link href="/products">
                <Button size="lg" variant="outline">
                  {t("products.catalog")}
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Partnership Section */}
        <section id="partnership" className="w-full py-12 md:py-24">
          <div className="container mx-auto grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">{t("partnership.title")}</h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">{t("partnership.description")}</p>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>{t("partnership.form.title")}</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">{t("partnership.form.name")}</Label>
                      <Input id="name" placeholder={t("partnership.form.name.placeholder")} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">{t("partnership.form.company")}</Label>
                      <Input id="company" placeholder={t("partnership.form.company.placeholder")} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">{t("partnership.form.email")}</Label>
                    <Input id="email" type="email" placeholder={t("partnership.form.email.placeholder")} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">{t("partnership.form.phone")}</Label>
                    <Input id="phone" type="tel" placeholder={t("partnership.form.phone.placeholder")} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">{t("partnership.form.message")}</Label>
                    <Textarea id="message" placeholder={t("partnership.form.message.placeholder")} />
                  </div>
                  <Button type="submit" className="w-full">
                    {t("partnership.form.submit")}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  )
}
