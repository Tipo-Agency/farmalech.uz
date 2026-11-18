import Link from "next/link"
import type { Metadata } from "next"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Страница не найдена",
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <section className="w-full bg-brand-gray py-20 md:py-32">
      <div className="container mx-auto flex flex-col items-center px-4 text-center md:px-6">
        <p className="text-7xl font-bold tracking-tighter text-brand-red">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tighter text-brand-dark sm:text-4xl">Страница не найдена</h1>
        <p className="mt-4 max-w-[560px] text-muted-foreground md:text-lg">
          Возможно, адрес изменился или страница была удалена. Посмотрите каталог продукции или статьи блога.
        </p>
        <p className="mt-1 max-w-[560px] text-muted-foreground">Sahifa topilmadi.</p>
        <div className="mt-8 flex flex-col gap-2 min-[400px]:flex-row">
          <Link href="/products">
            <Button size="lg">Каталог продукции</Button>
          </Link>
          <Link href="/blog">
            <Button size="lg" variant="outline">Блог</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
