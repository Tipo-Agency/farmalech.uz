export const SITE_URL = "https://farmalech.uz"
export const SITE_NAME = "FARMALECH"
export const LEGAL_NAME = "ООО «AF FARMALECH»"
export const PHONE = "+998 99 037 33 00"
export const PHONE_HREF = "tel:+998990373300"
export const EMAIL = "info@farmalech.uz"
export const LOGO_URL = `${SITE_URL}/favicon/android-chrome-512x512.png`
export const DEFAULT_OG_IMAGE = "/og-image.jpg"

export const MEDICAL_DISCLAIMER_RU =
  "Информация носит справочный характер и не заменяет консультацию врача. БАД не является лекарственным средством. Перед применением проконсультируйтесь со специалистом: есть противопоказания, особенно при беременности, кормлении грудью, у детей и при хронических заболеваниях."
export const MEDICAL_DISCLAIMER_UZ =
  "Maʼlumot maʼlumotnoma xarakteriga ega va shifokor maslahatining oʻrnini bosmaydi. Biologik faol qoʻshimcha dori vositasi hisoblanmaydi. Qoʻllashdan oldin mutaxassis bilan maslahatlashing: qarshi koʻrsatmalar bor, ayniqsa homiladorlik, emizish davrida, bolalarda va surunkali kasalliklarda."

export const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  alternateName: "AF FARMALECH",
  legalName: "OOO AF FARMALECH",
  url: SITE_URL,
  logo: LOGO_URL,
  description: "Производитель биологически активных добавок (БАД) в Узбекистане.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "ул. Нилуфар, 3 проезд, 2",
    addressLocality: "Ташкент",
    addressRegion: "Сергелийский район",
    addressCountry: "UZ",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+998-99-037-33-00",
    email: EMAIL,
    contactType: "customer service",
    areaServed: "UZ",
    availableLanguage: ["Russian", "Uzbek"],
  },
}
