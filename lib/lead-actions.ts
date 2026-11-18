"use server"

/**
 * Приём заявок с форм сайта (страница «Контакты» и блок «Партнёрство» на главной).
 *
 * Куда уходит заявка, настраивается переменными окружения на сервере:
 * - LEADS_WEBHOOK_URL — адрес приёма заявок (например, эндпоинт Таски
 *   https://<тенант>/api/integrations/site/leads);
 * - LEADS_API_KEY — ключ, передаётся в заголовке X-Api-Key;
 * - LEADS_FUNNEL_ID — воронка (если нужна приёмнику).
 * Если адрес не задан, заявка только пишется в лог сервера (так было и раньше):
 * назначение должен выбрать владелец сайта, см. AUDIT-2026-11-18.md.
 */

export interface LeadResult {
  success: boolean
  message: string
}

const clean = (value: FormDataEntryValue | null, max = 2000) =>
  typeof value === "string" ? value.trim().slice(0, max) : ""

export async function submitLead(formData: FormData): Promise<LeadResult> {
  // honeypot: real users never fill this hidden field
  if (clean(formData.get("website"))) return { success: true, message: "ok" }

  const lead = {
    source: clean(formData.get("source"), 50) || "contacts",
    name: [clean(formData.get("firstName"), 100), clean(formData.get("lastName"), 100)].filter(Boolean).join(" "),
    company: clean(formData.get("company"), 200),
    email: clean(formData.get("email"), 200),
    phone: clean(formData.get("phone"), 50),
    subject: clean(formData.get("subject"), 200),
    message: clean(formData.get("message")),
    page: clean(formData.get("page"), 500),
    utm: clean(formData.get("utm"), 500),
  }

  if (!lead.name || (!lead.phone && !lead.email)) {
    return { success: false, message: "Укажите имя и телефон или email" }
  }

  const url = process.env.LEADS_WEBHOOK_URL
  if (!url) {
    console.log("[lead] LEADS_WEBHOOK_URL is not set, lead logged only:", JSON.stringify(lead))
    return { success: true, message: "logged" }
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.LEADS_API_KEY ? { "X-Api-Key": process.env.LEADS_API_KEY } : {}),
      },
      body: JSON.stringify({
        ...lead,
        funnel_id: process.env.LEADS_FUNNEL_ID || undefined,
        site: "farmalech.uz",
        comment: [lead.subject, lead.message, lead.company && `Компания: ${lead.company}`].filter(Boolean).join("\n"),
      }),
      cache: "no-store",
    })
    if (!res.ok) {
      console.error("[lead] webhook responded", res.status, JSON.stringify(lead))
      return { success: false, message: "Не удалось отправить заявку, позвоните нам" }
    }
    return { success: true, message: "sent" }
  } catch (error) {
    console.error("[lead] webhook failed", error, JSON.stringify(lead))
    return { success: false, message: "Не удалось отправить заявку, позвоните нам" }
  }
}
