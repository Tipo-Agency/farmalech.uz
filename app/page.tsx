"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { CheckCircle, Award, Users, Shield, Factory } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { useTranslatedProducts } from "@/lib/translated-products"
import { cn } from "@/lib/utils"

export default function HomePage() {
  const { t } = useLanguage()
  const translatedProducts = useTranslatedProducts()

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
              <div className="space-y-2 flex flex-col items-center">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center">{t("about.expanded.title")}</h2>
                <p className="max-w-[900px] text-muted-foreground text-lg md:text-xl font-medium text-center mx-auto">
                  {t("about.expanded.subtitle")}
                </p>
                <p className="max-w-[1000px] text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed mt-6 text-center mx-auto">
                  {t("about.expanded.main")}
                </p>
                <p className="max-w-[900px] text-primary font-semibold md:text-lg/relaxed mt-4 text-center mx-auto">
                  {t("about.expanded.mission")}
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-6xl items-start gap-8 sm:grid-cols-2 lg:grid-cols-4 mt-16">
              <div className="grid gap-3 text-center">
                <Factory className="h-12 w-12 mx-auto text-primary" />
                <h3 className="text-lg font-bold">{t("about.expanded.production")}</h3>
              </div>
              <div className="grid gap-3 text-center">
                <Award className="h-12 w-12 mx-auto text-primary" />
                <h3 className="text-lg font-bold">{t("about.expanded.research")}</h3>
              </div>
              <div className="grid gap-3 text-center">
                <Shield className="h-12 w-12 mx-auto text-primary" />
                <h3 className="text-lg font-bold">{t("about.expanded.quality")}</h3>
              </div>
              <div className="grid gap-3 text-center">
                <Users className="h-12 w-12 mx-auto text-primary" />
                <h3 className="text-lg font-bold">{t("about.expanded.distribution")}</h3>
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
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {translatedProducts.map((product) => (
                <Card key={product.slug} className="overflow-hidden">
                  <CardHeader className="p-0">
                    <div className="w-full h-60 bg-white flex items-center justify-center">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={`${product.name} - БАД FARMALECH`}
                        width={400}
                        height={400}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <h3 className={cn("text-xl font-bold", product.color || "text-brand-dark")}>{product.name}</h3>
                    <p className="text-muted-foreground mt-2">{product.tagline}</p>
                    <Link href={`/products/${product.slug}`} className="mt-4 inline-block">
                      <Button>{t("products.more")}</Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
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

        {/* FAQ Section */}
        <section id="faq" className="w-full py-12 md:py-24 bg-brand-gray">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">{t("faq.title")}</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">{t("faq.subtitle")}</p>
            </div>
            <div className="mx-auto max-w-4xl">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1" className="bg-white rounded-lg mb-4 px-6">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    {t("faq.question1")}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base">
                    {t("faq.answer1")}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2" className="bg-white rounded-lg mb-4 px-6">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    {t("faq.question2")}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base">
                    {t("faq.answer2")}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3" className="bg-white rounded-lg mb-4 px-6">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    {t("faq.question3")}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base">
                    {t("faq.answer3")}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4" className="bg-white rounded-lg mb-4 px-6">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    {t("faq.question4")}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base">
                    {t("faq.answer4")}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5" className="bg-white rounded-lg mb-4 px-6">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    {t("faq.question5")}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base">
                    {t("faq.answer5")}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
