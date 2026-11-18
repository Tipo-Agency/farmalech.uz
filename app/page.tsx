import type { Metadata } from "next"
import HomePage from "@/components/pages/home-page"

export const metadata: Metadata = {
  title: { absolute: "FARMALECH — производитель БАД в Узбекистане | Каталог и партнёрство" },
  description:
    "FARMALECH — производитель биологически активных добавок в Ташкенте: 20 продуктов для дыхательных путей, печени, суставов, женского и детского здоровья. Сотрудничество с аптеками и дистрибьюторами.",
  alternates: { canonical: "/" },
  openGraph: { url: "/", title: "FARMALECH — производитель БАД в Узбекистане" },
}

export default function Page() {
  return <HomePage />
}
