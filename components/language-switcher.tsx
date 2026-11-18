"use client"

import { usePathname, useRouter } from "next/navigation"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()
  const pathname = usePathname() || "/"
  const router = useRouter()

  const choose = (lang: "ru" | "uz") => {
    setLanguage(lang)
    // Blog has separate URLs per language; the rest of the site switches in place.
    if (lang === "ru" && pathname.startsWith("/uz/")) router.push(pathname.replace(/^\/uz/, ""))
    if (lang === "uz" && pathname === "/blog") router.push("/uz/blog")
  }

  return (
    <div className="flex items-center gap-1" role="group" aria-label="Язык / Til">
      <Button
        variant={language === "ru" ? "default" : "ghost"}
        size="sm"
        onClick={() => choose("ru")}
        aria-pressed={language === "ru"}
        lang="ru"
        className="h-8 px-2 text-xs"
      >
        RU
      </Button>
      <Button
        variant={language === "uz" ? "default" : "ghost"}
        size="sm"
        onClick={() => choose("uz")}
        aria-pressed={language === "uz"}
        lang="uz"
        className="h-8 px-2 text-xs"
      >
        UZ
      </Button>
    </div>
  )
}
