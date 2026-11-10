import { located } from "@/content/derived"

/**
 * A drawn map, not a slippy one.
 *
 * This replaced a Leaflet map on CARTO's dark basemap, which now stamps
 * "API KEY REQUIRED" across every tile. Rather than swap in another tile
 * provider — another key, another attribution, another licence to read —
 * the outline is an inline path and the points are plotted from the content
 * module. No key, no network request, no third-party watermark, no Leaflet,
 * and it renders as a server component.
 *
 * Boundary: Natural Earth admin-0 (public domain), 1:110m, Zimbabwe only.
 */
const ZIMBABWE_OUTLINE: Array<[number, number]> = [
  [31.1914, -22.2515], [30.6599, -22.1516], [30.3229, -22.2716], [29.839, -22.1022],
  [29.4322, -22.0913], [28.7947, -21.6395], [28.0214, -21.486], [27.7272, -20.8518],
  [27.7247, -20.4991], [27.2965, -20.3915], [26.1648, -19.2931], [25.8504, -18.7144],
  [25.6492, -18.536], [25.2642, -17.7365], [26.3819, -17.846], [26.7068, -17.9612],
  [27.0444, -17.938], [27.5982, -17.2908], [28.4679, -16.4684], [28.8259, -16.3897],
  [28.9475, -16.0431], [29.5168, -15.6447], [30.2743, -15.5078], [30.339, -15.8808],
  [31.1731, -15.8609], [31.6365, -16.072], [31.852, -16.3194], [32.3282, -16.3921],
  [32.8476, -16.7134], [32.8499, -17.9791], [32.6549, -18.6721], [32.612, -19.4194],
  [32.7727, -19.7156], [32.6597, -20.3043], [32.5087, -20.3953], [32.245, -21.1165],
]

const W = 760
const H = 660
const PAD = 46

const LON = [25.0, 33.1] as const
const LAT = [-22.6, -15.2] as const

// Equirectangular with latitude-corrected longitude. At this extent anything
// fancier is invisible.
const COS_MEAN_LAT = Math.cos((((LAT[0] + LAT[1]) / 2) * Math.PI) / 180)
const spanX = (LON[1] - LON[0]) * COS_MEAN_LAT
const spanY = LAT[1] - LAT[0]
const scale = Math.min((W - PAD * 2) / spanX, (H - PAD * 2) / spanY)
const offsetX = (W - spanX * scale) / 2
const offsetY = (H - spanY * scale) / 2

function project(lon: number, lat: number): [number, number] {
  return [
    Number((offsetX + (lon - LON[0]) * COS_MEAN_LAT * scale).toFixed(1)),
    Number((offsetY + (LAT[1] - lat) * scale).toFixed(1)),
  ]
}

const outlinePath =
  ZIMBABWE_OUTLINE.map(([lon, lat], i) => {
    const [x, y] = project(lon, lat)
    return `${i === 0 ? "M" : "L"}${x} ${y}`
  }).join(" ") + " Z"

const graticule: string[] = []
for (let lon = 26; lon <= 32; lon += 2) {
  const [x] = project(lon, 0)
  graticule.push(`M${x} ${PAD / 2} L${x} ${H - PAD / 2}`)
}
for (let lat = -22; lat <= -16; lat += 2) {
  const [, y] = project(0, lat)
  graticule.push(`M${PAD / 2} ${y} L${W - PAD / 2} ${y}`)
}

/**
 * Most of this work happened in Harare, so plotting every project
 * individually draws six dots on top of each other and reads as one. Group
 * by place and size the marker by how much sits there.
 */
type Site = { label: string; lat: number; lng: number; x: number; y: number; titles: string[] }

/** ~0.35° ≈ 39 km. Mount Pleasant is inside Harare at this scale. */
const MERGE_DEGREES = 0.35

function groupByPlace(): Site[] {
  const sites: Site[] = []

  for (const p of located) {
    const { lat, lng, label } = p.location
    const near = sites.find(
      (s) => Math.abs(s.lat - lat) < MERGE_DEGREES && Math.abs(s.lng - lng) < MERGE_DEGREES
    )
    if (near) {
      near.titles.push(p.title)
      // Keep the shortest name — "Harare", not "Mount Pleasant, Harare".
      if (label.length < near.label.length) near.label = label
      continue
    }
    const [x, y] = project(lng, lat)
    sites.push({ label, lat, lng, x, y, titles: [p.title] })
  }

  return sites
}

export default function ProjectMap() {
  const sites = groupByPlace()

  return (
    <figure className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-10 lg:gap-14 items-center">
      <div className="relative rounded-md border border-line bg-card overflow-hidden">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="block w-full h-auto max-h-[460px] mx-auto"
          role="img"
          aria-label={`Outline map of Zimbabwe marking ${sites.length} locations where this work was delivered. Each is listed beside the map.`}
        >
          <path d={graticule.join(" ")} stroke="var(--color-line)" strokeWidth="1" fill="none" />
          <path
            d={outlinePath}
            fill="var(--color-card)"
            stroke="var(--color-line-strong)"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />

          {sites.map((s) => {
            const r = 4 + Math.min(s.titles.length, 6) * 1.1
            // Harare sits in the eastern third, so a right-hand label runs
            // off the frame. Flip it to the left past the midpoint.
            const flip = s.x > W * 0.55
            return (
              <g key={s.label}>
                <circle cx={s.x} cy={s.y} r={r * 3.1} fill="var(--color-accent)" opacity="0.14" />
                <circle cx={s.x} cy={s.y} r={r} fill="var(--color-accent)" />
                <text
                  x={flip ? s.x - r - 12 : s.x + r + 12}
                  y={s.y + 6}
                  textAnchor={flip ? "end" : "start"}
                  fill="var(--color-ink-muted)"
                  fontSize="18"
                  fontFamily="var(--font-jetbrains), monospace"
                >
                  {s.label}
                  {s.titles.length > 1 ? ` · ${s.titles.length}` : ""}
                </text>
              </g>
            )
          })}

          <text
            x={PAD}
            y={H - 20}
            fill="var(--color-ink-subtle)"
            fontSize="15"
            fontFamily="var(--font-jetbrains), monospace"
            letterSpacing="2.5"
          >
            ZIMBABWE
          </text>
        </svg>
      </div>

      <div className="space-y-5">
        {/* The text equivalent. Anything that exists only inside the graphic
            is information a screen-reader user does not have. */}
        <ul className="space-y-2.5">
          {located.map((p) => (
            <li key={p.slug} className="flex gap-3 text-[14px] text-ink-muted leading-snug">
              <span
                aria-hidden="true"
                className="shrink-0 mt-[7px] h-1.5 w-1.5 rounded-full bg-accent"
              />
              <span>
                {p.title}
                <span className="text-ink-subtle"> · {p.location.label}</span>
              </span>
            </li>
          ))}
        </ul>
        <figcaption className="font-mono text-[10px] text-ink-subtle pt-2 border-t border-line">
          Work with a fixed location. Boundary: Natural Earth 1:110m admin-0,
          public domain.
        </figcaption>
      </div>
    </figure>
  )
}
