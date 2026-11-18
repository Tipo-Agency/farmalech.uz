import type { Metadata } from "next"
import ContactsPage from "@/components/pages/contacts-page"

export const metadata: Metadata = {
  title: "Контакты: адрес, телефон, часы работы",
  description:
    "Контакты FARMALECH: Ташкент, Сергелийский район, ул. Нилуфар, 3 проезд, 2. Телефон +998 99 037 33 00, пн–пт 9:00–18:00. Форма для аптек, дистрибьюторов и покупателей.",
  alternates: { canonical: "/contacts" },
  openGraph: { url: "/contacts", title: "Контакты FARMALECH" },
}

export default function Page() {
  return <ContactsPage />
}
