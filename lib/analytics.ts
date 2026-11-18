"use client"

/** Яндекс.Метрика: счётчик 113501577 подключается на сервере (nginx, /_taska-metrika.js). */
const COUNTER_ID = 113501577

export function trackGoal(goal: string) {
  try {
    const ym = (window as unknown as { ym?: (...args: unknown[]) => void }).ym
    if (typeof ym === "function") ym(COUNTER_ID, "reachGoal", goal)
  } catch {
    // analytics must never break the page
  }
}

/** Добавляет к заявке страницу и UTM-метки из адреса. */
export function withLeadContext(formData: FormData, source: string): FormData {
  formData.set("source", source)
  try {
    formData.set("page", window.location.href)
    const params = new URLSearchParams(window.location.search)
    const utm = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"]
      .filter((k) => params.get(k))
      .map((k) => `${k}=${params.get(k)}`)
      .join("&")
    if (utm) formData.set("utm", utm)
  } catch {
    // ignore
  }
  return formData
}
