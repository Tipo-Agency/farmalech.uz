"use client"

import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer id="contacts" className="bg-brand-dark text-white">
      <div className="container mx-auto grid grid-cols-1 gap-8 px-4 py-12 md:grid-cols-3 md:px-6">
        <div className="flex flex-col gap-4">
          <Link href="/">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-10 h-10 bg-brand-red rounded-full">
                <span className="text-white font-bold text-xl">AF</span>
              </div>
              <span className="font-bold text-2xl text-white tracking-tight">FARMALECH</span>
            </div>
          </Link>
          <p className="text-muted-foreground text-gray-300">{t("footer.description")}</p>
          <p className="text-sm text-white">
            &copy; {new Date().getFullYear()} FARMALECH. {t("footer.rights")}
          </p>
          <a style={{ display: "inline-flex", alignItems: "center", gap: 8, minHeight: 42, fontSize: 10, lineHeight: 1, letterSpacing: ".04em", textDecoration: "none", color: "inherit" }} href="https://tipa.uz/ru" target="_blank" rel="nofollow noopener noreferrer" aria-label="Сайт разработан агентством TIPA"><span>Сделано</span><img src="/media/tipa-agency-animated.svg" alt="TIPA" width={64} height={42} style={{ display: "block", width: 64, height: 42, objectFit: "contain" }} /></a>
        </div>
        <div className="grid gap-2">
          <h4 className="font-semibold text-lg">{t("footer.navigation")}</h4>
          <Link href="/#about" className="hover:text-primary transition-colors">
            {t("nav.about")}
          </Link>
          <Link href="/products" className="hover:text-primary transition-colors">
            {t("nav.products")}
          </Link>
          <Link href="/#partnership" className="hover:text-primary transition-colors">
            {t("nav.partnership")}
          </Link>
          <Link href="/contacts" className="hover:text-primary transition-colors">
            {t("nav.contacts")}
          </Link>
        </div>
        <div className="grid gap-2">
          <h4 className="font-semibold text-lg">{t("footer.contacts")}</h4>
          <p>{t("footer.address")}</p>
          <p>{t("footer.phone")}</p>
          <p>{t("footer.email")}</p>
        </div>
      </div>
    </footer>
  )
}
