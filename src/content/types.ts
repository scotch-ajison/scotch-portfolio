import type { StaticImageData } from "next/image"

export type TagVariant = "violet" | "electric" | "amber"

/**
 * Who the client was and what may be printed about them.
 *
 * A discriminated union, so `client` is only reachable when naming them is
 * allowed. Rendering the wrong one is a type error rather than a leak.
 */
export type Disclosure =
  | { kind: "named"; client: string }
  | { kind: "anonymised"; clientDescriptor: string }
  | { kind: "self"; client: string }

export type ProjectImage = {
  src: StaticImageData
  /** Required. `check:content` fails the build on an empty alt. */
  alt: string
  caption?: string
  /** Basemap / imagery attribution, where the frame contains someone else's tiles. */
  credit?: string
}

export type Metric = {
  label: string
  value: string
  note?: string
}

export type Links = {
  /** A public, reachable URL. Verified before it goes in. */
  live?: string
  /** A PUBLIC repository only. */
  repo?: string
}

export type Visibility = {
  /** Appears on /work and counts toward every derived total. */
  listed: boolean
  /** Appears on the home page. */
  featured: boolean
}

export type ProjectStatus = "live" | "delivered" | "research" | "ongoing"

export type Project = {
  slug: string
  order: number
  title: string
  /**
   * What he actually did. This field is what keeps the ownership framing
   * honest — "on the team that delivered", not "I built".
   */
  role: string
  period: string
  scale: string
  status: ProjectStatus
  disclosure: Disclosure
  links: Links
  /** Why no live link, where a reader would expect one. */
  accessNote?: string
  problem: string
  approach: string
  outcome: string
  metrics: Metric[]
  stack: { label: string; variant: TagVariant }[]
  images: ProjectImage[]
  location?: { lat: number; lng: number; label: string }
  visibility: Visibility
  /** ISO date. Drives sitemap lastModified — never `new Date()`. */
  updatedAt: string
}

export type Service = {
  number: string
  title: string
  description: string
  audience: string
  deliverables: string[]
}

export type Milestone = { year: string; label: string }
