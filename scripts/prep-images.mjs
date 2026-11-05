#!/usr/bin/env node
/**
 * prep-images.mjs — condition source imagery once, offline.
 *
 * Reads originals from outside the repo (read-only), strips EXIF/GPS,
 * resizes to a sane master, and writes WebP into src/assets/images/ where
 * next/image picks them up as static imports (automatic width/height +
 * blurDataURL, so no layout shift and no runtime surprise).
 *
 * Never runs at build time. `npm run prep:images` — and only on a machine
 * that has the source folders.
 *
 *   node scripts/prep-images.mjs [--force]
 */

import sharp from "sharp"
import { mkdir, stat, writeFile } from "node:fs/promises"
import { existsSync } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const REPO = path.resolve(__dirname, "..")
const OUT = path.join(REPO, "src", "assets", "images")

const FORCE = process.argv.includes("--force")

const HOME = "C:/Users/Scotch"
const DOCS = `${HOME}/Documents`
const PROJ = `${HOME}/Desktop/Desktop/Projects`
const QGIS = `${PROJ}/QGIS Plugin/docs`
const ZRP = `${PROJ}/Techsys/ZRP/zrp screenshots`
/** Photographs the owner supplied, kept in the repo so CI is not required
 *  to reach a folder that only exists on one machine. */
const REPO_PHOTOS = path.join(REPO, "source-photos")

/** @type {Array<{slug:string,source:string,maxWidth:number,quality?:number,portrait?:boolean}>} */
const MANIFEST = [
  // ── Portrait ──────────────────────────────────────────────
  // 1080x992 environmental portrait at the desk. Two crops from one frame:
  // a square for the portrait slots, and a wider one that keeps the
  // monitors in shot for the hero band. No upscale needed and no colour
  // correction — it is well lit and already professional.
  {
    slug: "portrait",
    source: `${REPO_PHOTOS}/scotch-desk.jpg`,
    maxWidth: 760,
    quality: 88,
    crop: { left: 170, top: 130, width: 680, height: 680 },
  },
  {
    slug: "workspace",
    source: `${REPO_PHOTOS}/scotch-desk.jpg`,
    maxWidth: 1400,
    quality: 82,
    crop: { left: 0, top: 96, width: 1080, height: 720 },
  },

  // ── Field Pack — QGIS plugin (his own, MIT, public) ───────
  { slug: "field-pack-standalone", source: `${QGIS}/standalone.png`, maxWidth: 1600, quality: 72 },
  { slug: "field-pack-panel", source: `${QGIS}/fieldpack.png`, maxWidth: 1600, quality: 72 },
  { slug: "field-pack-basemap", source: `${QGIS}/basemap.png`, maxWidth: 1400, quality: 72 },
  { slug: "field-pack-site", source: `${QGIS}/lion_site.png`, maxWidth: 1400, quality: 72 },
  { slug: "field-pack-road", source: `${QGIS}/lion_road.png`, maxWidth: 1400, quality: 72 },
  { slug: "field-pack-demo", source: `${QGIS}/demo.png`, maxWidth: 1200, quality: 72 },

  // ── Cartography ───────────────────────────────────────────
  { slug: "ward-density", source: `${DOCS}/map-export.png`, maxWidth: 1800, quality: 74 },

  // ── Operational policing platform (synthetic demo data) ───
  { slug: "ops-heatmap", source: `${ZRP}/crime_heat_map.png`, maxWidth: 1600, quality: 72 },
  { slug: "ops-records", source: `${ZRP}/criminal_records.png`, maxWidth: 1600, quality: 74 },
  { slug: "ops-landing", source: `${ZRP}/landing page.png`, maxWidth: 1600, quality: 72 },
  { slug: "ops-deployment", source: `${ZRP}/deployment.png`, maxWidth: 1400, quality: 74 },
  { slug: "ops-reporting", source: `${ZRP}/Crime_reporting.png`, maxWidth: 1400, quality: 74 },
]

const kb = (n) => `${(n / 1024).toFixed(0)} KB`

async function newer(src, dest) {
  if (FORCE || !existsSync(dest)) return true
  const [a, b] = await Promise.all([stat(src), stat(dest)])
  return a.mtimeMs > b.mtimeMs
}

async function run() {
  await mkdir(OUT, { recursive: true })

  const rows = []
  let skipped = 0

  for (const item of MANIFEST) {
    const dest = path.join(OUT, `${item.slug}.webp`)

    if (!existsSync(item.source)) {
      rows.push([item.slug, "MISSING SOURCE", item.source])
      continue
    }
    if (!(await newer(item.source, dest))) {
      skipped++
      continue
    }

    const srcStat = await stat(item.source)
    let pipe = sharp(item.source)
      .rotate() // apply EXIF orientation...
      .withMetadata({}) // ...then drop EXIF/GPS/comments entirely

    const meta = await sharp(item.source).metadata()
    const upscale = Boolean(item.portrait)

    if (item.crop) pipe = pipe.extract(item.crop)

    pipe = pipe.resize({
      width: item.maxWidth,
      fit: "inside",
      withoutEnlargement: !upscale,
      kernel: "lanczos3",
    })

    if (item.portrait) {
      // Lanczos invents no detail, so a light unsharp mask is what removes
      // the mushy-interpolation tell. Anything heavier haloes the collar
      // and turns the leaves into gravel.
      pipe = pipe
        .sharpen({ sigma: 0.5, m1: 0, m2: 1.2 })
        .modulate({ saturation: 0.62, brightness: 1.05 })
        .linear(1.06, -8) // a touch of contrast so it holds on a dark page
    }

    const buf = await pipe.webp({ quality: item.quality ?? 74, effort: 6 }).toBuffer()
    await writeFile(dest, buf)

    const outMeta = await sharp(buf).metadata()
    rows.push([
      item.slug,
      `${meta.width}x${meta.height} ${kb(srcStat.size)}`,
      `${outMeta.width}x${outMeta.height} ${kb(buf.length)}`,
      `${Math.round((1 - buf.length / srcStat.size) * 100)}%`,
    ])
  }

  const w = [26, 24, 24, 6]
  console.log("\n  slug".padEnd(w[0]) + "source".padEnd(w[1]) + "output".padEnd(w[2]) + "saved")
  console.log("  " + "─".repeat(w[0] + w[1] + w[2] + w[3]))
  for (const r of rows) {
    console.log(
      "  " +
        String(r[0]).padEnd(w[0] - 2) +
        String(r[1] ?? "").padEnd(w[1]) +
        String(r[2] ?? "").padEnd(w[2]) +
        String(r[3] ?? "")
    )
  }
  if (skipped) console.log(`\n  ${skipped} up to date, skipped. Use --force to rebuild.`)
  console.log()
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
