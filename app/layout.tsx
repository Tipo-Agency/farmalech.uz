import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { LanguageProvider } from "@/contexts/language-context"
import { DEFAULT_OG_IMAGE, ORGANIZATION_JSON_LD, SITE_URL } from "@/lib/site"

const inter = Inter({ subsets: ["latin", "cyrillic"], display: "swap" })

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "FARMALECH — производитель БАД в Узбекистане",
    template: "%s | FARMALECH",
  },
  description:
    "FARMALECH — производитель биологически активных добавок (БАД) в Ташкенте. Каталог продукции с составом и ценами, сотрудничество с аптеками и дистрибьюторами.",
  applicationName: "FARMALECH",
  authors: [{ name: "FARMALECH" }],
  creator: "FARMALECH",
  publisher: "FARMALECH",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    siteName: "FARMALECH",
    locale: "ru_RU",
    alternateLocale: ["uz_UZ"],
    type: "website",
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: "FARMALECH — производитель БАД" }],
  },
  twitter: {
    card: "summary_large_image",
    images: [DEFAULT_OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/favicon.ico" },
    ],
    apple: [{ url: "/favicon/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = ORGANIZATION_JSON_LD

  return (
    <html lang="ru">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>
        <LanguageProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  )
}
