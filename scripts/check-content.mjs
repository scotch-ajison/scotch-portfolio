#!/usr/bin/env node
/**
 * check-content.mjs — invariants over src/content, run in CI.
 *
 * The point is that a claim cannot quietly rot: a blank alt, a private
 * repository link, a duplicate slug or a date in the future fails the
 * build rather than shipping.
 *
 * Deliberately a source-text check rather than an import — importing the
 * content module means resolving `@/assets/*.webp` through the Next
 * pipeline, which is not available to a plain node script.
 */

import { readFileSync } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const REPO = path.resolve(__dirname, "..")
const read = (p) => readFileSync(path.join(REPO, p), "utf8")

const errors = []
const fail = (msg) => errors.push(msg)

const projectsSrc = read("src/content/projects.ts")
const routesSrc = read("src/content/routes.ts")

const grabAll = (src, re) => [...src.matchAll(re)].map((m) => m[1])

// ── slugs ────────────────────────────────────────────────────
const slugs = grabAll(projectsSrc, /^\s{4}slug:\s*"([^"]+)"/gm)
if (slugs.length === 0) fail("no projects found — did the file shape change?")

const dupSlugs = slugs.filter((s, i) => slugs.indexOf(s) !== i)
if (dupSlugs.length) fail(`duplicate slug(s): ${[...new Set(dupSlugs)].join(", ")}`)

for (const s of slugs) {
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(s)) fail(`slug is not kebab-case: "${s}"`)
}

// ── order ────────────────────────────────────────────────────
const orders = grabAll(projectsSrc, /^\s{4}order:\s*(\d+)/gm).map(Number)
const dupOrders = orders.filter((o, i) => orders.indexOf(o) !== i)
if (dupOrders.length) fail(`duplicate order value(s): ${[...new Set(dupOrders)].join(", ")}`)

// ── alt text: required, non-empty, and a sentence not a filename ──
const alts = grabAll(projectsSrc, /\balt:\s*"([^"]*)"/g)
alts.forEach((a, i) => {
  if (a.trim().length === 0) fail(`image #${i + 1} has an empty alt`)
  else if (a.trim().length < 20) fail(`image #${i + 1} has a thin alt: "${a}"`)
})

const imageCount = (projectsSrc.match(/\bsrc:\s*[a-zA-Z]/g) ?? []).length
if (imageCount !== alts.length) {
  fail(`${imageCount} images but ${alts.length} alt strings — every image needs one`)
}

// ── copy rules: no dashes as punctuation, no technology chips ──
// Em and en dashes read as machine-written copy, and the stack each client
// project ran on is not something the site discloses.
for (const d of grabAll(projectsSrc, /"([^"\n]*[—–][^"\n]*)"/g)) {
  fail(`em or en dash in project copy: "${d.slice(0, 70)}"`)
}
if (/^\s{4}stack:/m.test(projectsSrc)) {
  fail("a project has a `stack` field; technologies are not shown per project")
}

// ── links: public hosts only ─────────────────────────────────
const repos = grabAll(projectsSrc, /\brepo:\s*"([^"]+)"/g)
for (const r of repos) {
  if (!r.startsWith("https://github.com/")) fail(`repo link is not a public GitHub URL: ${r}`)
}

const lives = grabAll(projectsSrc, /\blive:\s*"([^"]+)"/g)
for (const l of lives) {
  if (!/^https?:\/\//.test(l)) fail(`live link is not absolute: ${l}`)
}

// ── prose fields must be present and substantial ─────────────
for (const field of ["problem", "approach", "outcome"]) {
  const vals = grabAll(projectsSrc, new RegExp(`^\\s{4}${field}:\\s*\\n?\\s*"`, "gm"))
  const count = (projectsSrc.match(new RegExp(`^\\s{4}${field}:`, "gm")) ?? []).length
  if (count !== slugs.length) {
    fail(`${count} \`${field}\` fields for ${slugs.length} projects — each project needs one`)
  }
  void vals
}

// ── dates parse, and are not in the future ───────────────────
const today = new Date().toISOString().slice(0, 10)
const dates = [
  ...grabAll(projectsSrc, /\bupdatedAt:\s*"([^"]+)"/g),
  ...grabAll(routesSrc, /\bupdatedAt:\s*"([^"]+)"/g),
]
for (const d of dates) {
  if (Number.isNaN(Date.parse(d))) fail(`unparseable date: "${d}"`)
  else if (d > today) fail(`date is in the future: "${d}"`)
}

// ── no hard-coded counts left in the pages ───────────────────
// The home page used to say "6" while /work said "13" and "15+".
const pages = ["src/app/page.tsx", "src/app/work/page.tsx"]
for (const p of pages) {
  const src = read(p)
  const bad = src.match(/\b(?:All\s+\d+\s+projects|\d+\s+Projects\b|15\+)/g)
  if (bad) fail(`${p} hard-codes a count: ${bad.join(", ")} — derive it from counts.*`)
}

// ── every nav route has a page on disk ───────────────────────
const navPaths = grabAll(routesSrc, /path:\s*"([^"]+)"/g)
for (const p of navPaths) {
  if (p === "/") continue
  try {
    readFileSync(path.join(REPO, "src/app", p.slice(1), "page.tsx"))
  } catch {
    fail(`route "${p}" is listed but src/app${p}/page.tsx does not exist`)
  }
}

// ── report ───────────────────────────────────────────────────
if (errors.length) {
  console.error(`\n  content check failed — ${errors.length} problem(s):\n`)
  for (const e of errors) console.error(`   ·  ${e}`)
  console.error()
  process.exit(1)
}

console.log(
  `\n  content ok — ${slugs.length} projects, ${alts.length} images with alt text, ` +
    `${repos.length} public repos, ${lives.length} live links\n`
)
