import type { MetadataRoute } from "next"
import { siteUrl } from "@/lib/site"
import { routes } from "@/content/routes"

export default function sitemap(): MetadataRoute.Sitemap {
  // Per-route dates, hand-maintained in src/content/routes.ts. This used to
  // be `new Date()`, which told crawlers every URL changed today on every
  // crawl — a signal they learn to ignore.
  return routes.map((r) => ({
    url: `${siteUrl}${r.path === "/" ? "" : r.path}`,
    lastModified: new Date(r.updatedAt),
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }))
}
