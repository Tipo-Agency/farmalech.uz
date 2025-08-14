import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { LanguageProvider } from "@/contexts/language-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "FARMALECH - Производство БАДов в Узбекистане | Биологически активные добавки",
  description: "FARMALECH — производитель высококачественных биологически активных добавок (БАДов) в Узбекистане. Партнерство с дистрибьюторами и аптеками.",
  keywords: "производство БАД, БАДы Узбекистан, FARMALECH, биологически активные добавки, дистрибьюторы БАД, аптечные сети",
  authors: [{ name: "FARMALECH" }],
  creator: "FARMALECH",
  publisher: "FARMALECH",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://farmalech.uz'),
  alternates: {
    canonical: '/',
    languages: {
      'ru': '/ru',
      'uz': '/uz',
    },
  },
  openGraph: {
    title: "FARMALECH - Производитель БАДов в Узбекистане",
    description: "Производитель качественных биологически активных добавок (БАДов). Партнерство с дистрибьюторами.",
    url: 'https://farmalech.uz',
    siteName: 'FARMALECH',
    locale: 'ru_RU',
    type: 'website',
    images: [
      {
        url: '/hero-image.jpeg',
        width: 1200,
        height: 630,
        alt: 'FARMALECH - Фармацевтическая компания',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "FARMALECH - Производитель БАДов",
    description: "Производитель качественных БАДов в Узбекистане",
    images: ['/hero-image.jpeg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-verification-code',
    yandex: 'yandex-verification-code',
  },
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon/favicon.ico' }
    ],
    apple: [
      { url: '/favicon/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ],
    other: [
      {
        rel: 'android-chrome-192x192',
        url: '/favicon/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        rel: 'android-chrome-512x512', 
        url: '/favicon/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png'
      }
    ]
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "FARMALECH",
    "alternateName": "AF FARMALECH",
    "description": "Производитель биологически активных добавок (БАДов) в Узбекистане. Инновационные решения для поддержания здоровья.",
    "url": "https://farmalech.uz",
    "logo": "https://farmalech.uz/placeholder-logo.png",
    "image": "https://farmalech.uz/hero-image.jpeg",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "ул. Нилуфар, 3 проезд, 2",
      "addressLocality": "Ташкент",
      "addressRegion": "Сергелийский район",
      "addressCountry": "UZ"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+998-99-037-33-00",
      "email": "info@farmalech.uz",
      "contactType": "customer service",
      "areaServed": "UZ",
      "availableLanguage": ["Russian", "Uzbek"]
    },
    "sameAs": [
      "https://t.me/farmalech",
      "https://instagram.com/farmalech"
    ],
    "foundingDate": "2020",
    "legalName": "OOO AF FARMALECH",
    "vatID": "UZ-VAT-123456789",
    "numberOfEmployees": "50-100",
    "industry": "Pharmaceutical Manufacturing",
    "keywords": "БАДы, биологически активные добавки, производство БАД, Узбекистан, дистрибьюция",
    "serviceArea": {
      "@type": "Country",
      "name": "Uzbekistan"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Каталог биологически активных добавок (БАДов)",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Седок L-arginin",
            "category": "Биологически активные добавки (БАД)"
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "Product",
            "name": "Altex",
            "category": "Биологически активные добавки (БАД)"
          }
        }
      ]
    }
  }

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
