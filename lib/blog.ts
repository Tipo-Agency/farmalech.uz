import fs from "node:fs"
import path from "node:path"

export type BlogLang = "ru" | "uz"

export interface FaqItem {
  question: string
  answer: string
}

export interface BlogPost {
  slug: string
  lang: BlogLang
  title: string
  description: string
  date: string
  category: string
  products: string[]
  keywords: string[]
  html: string
  faq: FaqItem[]
  headings: { id: string; text: string }[]
  readingMinutes: number
}

const CONTENT_DIR = path.join(process.cwd(), "content", "blog")
const cache = new Map<BlogLang, BlogPost[]>()

function parseFrontmatter(raw: string): { meta: Record<string, string>; body: string } {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/)
  if (!match) return { meta: {}, body: raw }
  const meta: Record<string, string> = {}
  for (const line of match[1].split("\n")) {
    const idx = line.indexOf(":")
    if (idx === -1) continue
    meta[line.slice(0, idx).trim()] = line.slice(idx + 1).trim()
  }
  return { meta, body: match[2] }
}

function escapeHtml(text: string): string {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
}

function inline(text: string): string {
  let out = escapeHtml(text)
  out = out.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
  out = out.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_m, label: string, href: string) => {
    const safe = href.startsWith("/") || href.startsWith("https://") ? href : "#"
    const external = safe.startsWith("https://")
    return `<a href="${safe}"${external ? ' target="_blank" rel="noopener noreferrer"' : ""}>${label}</a>`
  })
  return out
}

function stripInline(text: string): string {
  return text.replace(/\*\*(.+?)\*\*/g, "$1").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
}

function slugifyHeading(text: string, index: number): string {
  return `section-${index + 1}`
}

const FAQ_HEADINGS = ["Частые вопросы", "Koʻp beriladigan savollar", "Ko'p beriladigan savollar"]

export function renderMarkdown(body: string) {
  const lines = body.replace(/\r/g, "").split("\n")
  const html: string[] = []
  const faq: FaqItem[] = []
  const headings: { id: string; text: string }[] = []
  let paragraph: string[] = []
  let list: { type: "ul" | "ol"; items: string[] } | null = null
  let inFaq = false
  let currentQuestion: FaqItem | null = null

  const flushParagraph = () => {
    if (!paragraph.length) return
    const text = paragraph.join(" ")
    html.push(`<p>${inline(text)}</p>`)
    if (inFaq && currentQuestion) {
      currentQuestion.answer = [currentQuestion.answer, stripInline(text)].filter(Boolean).join(" ")
    }
    paragraph = []
  }
  const flushList = () => {
    if (!list) return
    html.push(`<${list.type}>${list.items.map((i) => `<li>${inline(i)}</li>`).join("")}</${list.type}>`)
    if (inFaq && currentQuestion) {
      currentQuestion.answer = [currentQuestion.answer, list.items.map(stripInline).join("; ")].filter(Boolean).join(" ")
    }
    list = null
  }
  const flush = () => {
    flushParagraph()
    flushList()
  }

  for (const rawLine of lines) {
    const line = rawLine.trimEnd()
    if (!line.trim()) {
      flush()
      continue
    }
    const h2 = line.match(/^##\s+(.+)$/)
    const h3 = line.match(/^###\s+(.+)$/)
    const ul = line.match(/^\s*[-*]\s+(.+)$/)
    const ol = line.match(/^\s*\d+[.)]\s+(.+)$/)
    if (h3) {
      flush()
      html.push(`<h3>${inline(h3[1])}</h3>`)
      if (inFaq) {
        currentQuestion = { question: stripInline(h3[1]), answer: "" }
        faq.push(currentQuestion)
      }
    } else if (h2 && !line.startsWith("###")) {
      flush()
      const text = stripInline(h2[1])
      const id = slugifyHeading(text, headings.length)
      headings.push({ id, text })
      html.push(`<h2 id="${id}">${inline(h2[1])}</h2>`)
      inFaq = FAQ_HEADINGS.includes(text.trim())
      currentQuestion = null
    } else if (ul) {
      flushParagraph()
      if (!list || list.type !== "ul") {
        flushList()
        list = { type: "ul", items: [] }
      }
      list.items.push(ul[1])
    } else if (ol) {
      flushParagraph()
      if (!list || list.type !== "ol") {
        flushList()
        list = { type: "ol", items: [] }
      }
      list.items.push(ol[1])
    } else if (line.startsWith("# ")) {
      // H1 comes from frontmatter title
      flush()
    } else {
      flushList()
      paragraph.push(line.trim())
    }
  }
  flush()
  return { html: html.join("\n"), faq: faq.filter((f) => f.answer), headings }
}

function loadLang(lang: BlogLang): BlogPost[] {
  const cached = cache.get(lang)
  if (cached) return cached
  const dir = path.join(CONTENT_DIR, lang)
  if (!fs.existsSync(dir)) return []
  const posts = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf8")
      const { meta, body } = parseFrontmatter(raw)
      const { html, faq, headings } = renderMarkdown(body)
      const words = body.split(/\s+/).length
      return {
        slug: file.replace(/\.md$/, ""),
        lang,
        title: meta.title || file,
        description: meta.description || "",
        date: meta.date || "2026-11-18",
        category: meta.category || "",
        products: (meta.products || "")
          .split(",")
          .map((s) => s.trim())
          .filter((s) => s && s !== "-"),
        keywords: (meta.keywords || "")
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        html,
        faq,
        headings,
        readingMinutes: Math.max(2, Math.round(words / 180)),
      } satisfies BlogPost
    })
    .sort((a, b) => a.title.localeCompare(b.title, lang))
  cache.set(lang, posts)
  return posts
}

const CATEGORY_ORDER = [
  "Дыхательные пути",
  "Железо и кровь",
  "Печень",
  "Суставы и кости",
  "Женское здоровье",
  "Мужское здоровье и сердце",
  "Пищеварение",
  "Витамины и энергия",
  "Почки и мочевые пути",
  "Как выбирать БАД",
]

function rank(order: string[], name: string) {
  const i = order.indexOf(name)
  return i === -1 ? order.length : i
}

export function getAllPosts(lang: BlogLang = "ru"): BlogPost[] {
  return loadLang(lang)
}

export function getPost(slug: string, lang: BlogLang = "ru"): BlogPost | undefined {
  return loadLang(lang).find((p) => p.slug === slug)
}

export function hasTranslation(slug: string, lang: BlogLang): boolean {
  return Boolean(getPost(slug, lang))
}

export function getCategories(lang: BlogLang = "ru"): { name: string; posts: BlogPost[] }[] {
  const map = new Map<string, BlogPost[]>()
  for (const post of loadLang(lang)) {
    const list = map.get(post.category) || []
    list.push(post)
    map.set(post.category, list)
  }
  const order = CATEGORY_ORDER
  return [...map.entries()]
    .map(([name, posts]) => ({ name, posts }))
    .sort((a, b) => rank(order, a.name) - rank(order, b.name))
}

/** Articles that share products or category with the given one. */
export function getRelatedPosts(post: BlogPost, limit = 3): BlogPost[] {
  const all = loadLang(post.lang).filter((p) => p.slug !== post.slug)
  const scored = all
    .map((p) => {
      const shared = p.products.filter((s) => post.products.includes(s)).length
      return { p, score: shared * 2 + (p.category === post.category ? 1 : 0) }
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || a.p.slug.localeCompare(b.p.slug))
  return scored.slice(0, limit).map((x) => x.p)
}

/** Articles that mention a product, for product pages. */
export function getPostsForProduct(productSlug: string, limit = 4): BlogPost[] {
  return loadLang("ru")
    .filter((p) => p.products.includes(productSlug))
    .slice(0, limit)
}
