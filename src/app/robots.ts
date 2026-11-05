import type { MetadataRoute } from "next"
import { siteUrl, isProduction } from "@/lib/site"

export default function robots(): MetadataRoute.Robots {
  // Preview deployments must not compete with the real domain in the index.
  if (!isProduction) {
    return { rules: { userAgent: "*", disallow: "/" } }
  }

  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  }
}
