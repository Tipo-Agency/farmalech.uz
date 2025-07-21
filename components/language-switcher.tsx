"use client"

import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="flex items-center gap-1">
      <Globe className="h-4 w-4 text-muted-foreground" />
      <Button
        variant={language === "ru" ? "default" : "ghost"}
        size="sm"
        onClick={() => setLanguage("ru")}
        className="h-8 px-2 text-xs"
      >
        RU
      </Button>
      <Button
        variant={language === "uz" ? "default" : "ghost"}
        size="sm"
        onClick={() => setLanguage("uz")}
        className="h-8 px-2 text-xs"
      >
        UZ
      </Button>
    </div>
  )
}
