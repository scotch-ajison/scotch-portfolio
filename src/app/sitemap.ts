import type { MetadataRoute } from "next"

const siteUrl = "https://scotchajison.com"

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  const routes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "/", priority: 1.0, changeFrequency: "monthly" },
    { path: "/work", priority: 0.9, changeFrequency: "monthly" },
    { path: "/services", priority: 0.8, changeFrequency: "monthly" },
    { path: "/about", priority: 0.7, changeFrequency: "yearly" },
    { path: "/research", priority: 0.7, changeFrequency: "monthly" },
    { path: "/writing", priority: 0.6, changeFrequency: "weekly" },
    { path: "/contact", priority: 0.5, changeFrequency: "yearly" },
  ]

  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${siteUrl}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }))
}
