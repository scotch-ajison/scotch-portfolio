import type { MetadataRoute } from "next"

type Route = {
  path: string
  label: string
  priority: number
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>
  /** Hand-maintained. Never `new Date()` — that tells crawlers everything
   *  changed today, every crawl, and trains them to ignore the signal. */
  updatedAt: string
  inNav: boolean
}

export const routes: Route[] = [
  { path: "/", label: "Home", priority: 1.0, changeFrequency: "monthly", updatedAt: "2026-11-05", inNav: false },
  { path: "/work", label: "Work", priority: 0.9, changeFrequency: "monthly", updatedAt: "2026-11-05", inNav: true },
  { path: "/about", label: "About", priority: 0.8, changeFrequency: "yearly", updatedAt: "2026-11-05", inNav: true },
  { path: "/research", label: "Research", priority: 0.7, changeFrequency: "monthly", updatedAt: "2026-11-05", inNav: true },
  { path: "/services", label: "Services", priority: 0.7, changeFrequency: "monthly", updatedAt: "2026-11-05", inNav: true },
  { path: "/contact", label: "Contact", priority: 0.6, changeFrequency: "yearly", updatedAt: "2026-11-05", inNav: false },
]

export const navRoutes = routes.filter((r) => r.inNav)
