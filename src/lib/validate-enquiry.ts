export const PROJECT_LABELS: Record<string, string> = {
  "software-dev": "Software Development",
  "ai-integration": "AI Integration",
  "gis-system": "GIS System Architecture",
  "spatial-consulting": "Spatial Data Consulting",
  "drone-gis": "Drone Data & GIS Integration",
  "ai-gis": "AI + GIS Research",
  other: "Other",
}

export const BUDGET_LABELS: Record<string, string> = {
  "under-5k": "Under $5,000",
  "5k-20k": "$5,000 – $20,000",
  "20k-50k": "$20,000 – $50,000",
  "50k-plus": "$50,000+",
}

export type Enquiry = {
  name: string
  email: string
  organization: string
  projectType: string
  budget: string
  message: string
}

export type ValidationResult =
  | { ok: true; data: Enquiry }
  | { ok: false; reason: "bot"; errors: Record<string, never> }
  | { ok: false; reason: "invalid"; errors: Partial<Record<keyof Enquiry, string>> }

const str = (v: unknown): string => (typeof v === "string" ? v.trim() : "")

/**
 * Hand-written rather than a schema library: six fields and nine rules do
 * not justify a runtime dependency in a single route handler. Revisit if a
 * third endpoint needs validation.
 */
export function validateEnquiry(body: unknown): ValidationResult {
  const b = (body ?? {}) as Record<string, unknown>

  // Honeypot: a real browser leaves this empty — it is off-screen, not
  // display:none, which some bots check for.
  if (str(b.website).length > 0) return { ok: false, reason: "bot", errors: {} }

  // Time trap: a human takes more than three seconds to fill this in, and
  // a stale form (over a day) is a replayed payload.
  const startedAt = Number(b.startedAt)
  if (Number.isFinite(startedAt) && startedAt > 0) {
    const elapsed = Date.now() - startedAt
    if (elapsed < 3_000 || elapsed > 86_400_000) {
      return { ok: false, reason: "bot", errors: {} }
    }
  }

  const name = str(b.name)
  const email = str(b.email)
  const organization = str(b.organization)
  const projectType = str(b.projectType)
  const budget = str(b.budget)
  const message = str(b.message)

  const errors: Partial<Record<keyof Enquiry, string>> = {}

  if (name.length < 2 || name.length > 100) errors.name = "Please give your name."

  // Deliberately conservative rather than a full RFC 5322 regex: one @, no
  // whitespace, no CR/LF, a dot in the domain.
  if (
    email.length > 254 ||
    email.split("@").length !== 2 ||
    /[\s\r\n]/.test(email) ||
    !/^[^@]+@[^@]+\.[^@]{2,}$/.test(email)
  ) {
    errors.email = "That email address doesn't look right."
  }

  if (organization.length < 2 || organization.length > 120) {
    errors.organization = "Please add your organisation."
  }

  if (!Object.hasOwn(PROJECT_LABELS, projectType)) {
    errors.projectType = "Please choose a project type."
  }

  if (budget.length > 0 && !Object.hasOwn(BUDGET_LABELS, budget)) {
    errors.budget = "Please choose a budget range."
  }

  if (message.length < 20) errors.message = "A sentence or two about the project, please."
  else if (message.length > 5000) errors.message = "That's longer than this form can take."

  if (Object.keys(errors).length > 0) return { ok: false, reason: "invalid", errors }

  return { ok: true, data: { name, email, organization, projectType, budget, message } }
}
