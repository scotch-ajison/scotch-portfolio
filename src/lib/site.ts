/**
 * The one place the site URL is defined.
 *
 * It was hard-coded separately in layout.tsx, robots.ts, sitemap.ts and
 * og-image.tsx — four copies that could drift apart, and did.
 */

const raw =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000")

/** Absolute origin, never with a trailing slash. */
export const siteUrl = raw.replace(/\/+$/, "")

/** True only on the production deployment — preview builds must not be indexed. */
export const isProduction = process.env.VERCEL_ENV === "production"

export const siteName = "Scotch Ajison"
