import { projects } from "./projects"
import type { Project } from "./types"

/** Everything that appears on /work, in display order. */
export const listed: Project[] = projects
  .filter((p) => p.visibility.listed)
  .sort((a, b) => a.order - b.order)

/** The subset the home page shows. */
export const featured: Project[] = listed.filter((p) => p.visibility.featured)

export const withImages: Project[] = listed.filter((p) => p.images.length > 0)

export const bySlug = (slug: string): Project | undefined =>
  projects.find((p) => p.slug === slug)

/** Projects that have a point on the map. */
export const located = listed.filter(
  (p): p is Project & { location: NonNullable<Project["location"]> } =>
    Boolean(p.location)
)

/**
 * Every number the site states about itself.
 *
 * These used to be typed by hand in four places and disagreed: the home
 * page said "6" and linked to "All 6 projects", /work said "13 Projects"
 * and "15+ Production Systems Built". Now a count cannot contradict the
 * list it counts.
 */
export const counts = {
  projects: listed.length,
  live: listed.filter((p) => p.status === "live").length,
  publicRepos: listed.filter((p) => Boolean(p.links.repo)).length,
  clients: new Set(
    listed
      .filter((p) => p.disclosure.kind === "named")
      .map((p) => (p.disclosure as { client: string }).client)
  ).size,
  /** 2020 is the first full year of professional GIS work on the CV. */
  years: new Date().getFullYear() - 2020,
} as const

/**
 * Card rhythm for the work grid: one full-width, then a pair, repeating.
 * Replaces nine hand-unrolled slice() calls and four duplicated JSX blocks.
 */
export function rhythm(items: Project[]): Array<"full" | "half"> {
  // A project with a real cover gets the full-width slot — a screenshot
  // squeezed into a half card is a thumbnail, and proves nothing.
  const out: Array<"full" | "half"> = items.map((p, i) =>
    p.images.length > 0 || p.cover ? "full" : i % 3 === 0 ? "full" : "half"
  )
  // Never leave a lone half-width card orphaned on its own row.
  if (out.at(-1) === "half" && out.at(-2) === "full") out[out.length - 1] = "full"
  return out
}

/** The client names shown in the marquee — derived, never a second list. */
export const clientNames: string[] = Array.from(
  new Set(
    listed
      .filter((p) => p.disclosure.kind === "named")
      .map((p) => (p.disclosure as { client: string }).client)
  )
)
