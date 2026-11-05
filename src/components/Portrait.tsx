import Image from "next/image"
import portrait from "@/assets/images/portrait.webp"
import { profile } from "@/content/profile"

/**
 * The portrait, composed rather than placed.
 *
 * Three layers: a blurred, over-scaled copy of the photograph behind it so
 * the colour bleeds into the page instead of stopping at a hard edge; the
 * sharp frame itself; and a graduated scale down the right-hand side that
 * does the separating — a levelling staff, which is the instrument the
 * whole site's language comes from.
 */

/** Ticks every 2 units, labelled every 10, like a levelling staff. */
function SurveyScale({ height }: { height: number }) {
  const UNITS = 50
  const step = height / UNITS
  const ticks = Array.from({ length: UNITS + 1 }, (_, i) => i)

  return (
    <svg
      aria-hidden="true"
      width="46"
      height={height}
      viewBox={`0 0 46 ${height}`}
      className="shrink-0 overflow-visible"
    >
      {/* spine */}
      <line x1="0.5" y1="0" x2="0.5" y2={height} stroke="var(--color-line-strong)" strokeWidth="1" />

      {ticks.map((i) => {
        const y = i * step
        const major = i % 10 === 0
        const mid = i % 5 === 0
        const len = major ? 13 : mid ? 8 : 4
        return (
          <g key={i}>
            <line
              x1="0.5"
              y1={y}
              x2={0.5 + len}
              y2={y}
              stroke={major ? "var(--color-ink-subtle)" : "var(--color-line-strong)"}
              strokeWidth={major ? 1.2 : 1}
            />
            {major && i > 0 && i < UNITS && (
              <text
                x={len + 6}
                y={y + 3.5}
                fill="var(--color-ink-subtle)"
                fontSize="9"
                fontFamily="var(--font-jetbrains), monospace"
                letterSpacing="0.5"
              >
                {String(i * 2).padStart(3, "0")}
              </text>
            )}
          </g>
        )
      })}

      {/* One index mark in the accent — a station, read off the staff. */}
      <g>
        <line
          x1="0.5"
          y1={height * 0.36}
          x2="17"
          y2={height * 0.36}
          stroke="var(--color-accent)"
          strokeWidth="2"
        />
        <circle cx="0.5" cy={height * 0.36} r="2.6" fill="var(--color-accent)" />
      </g>
    </svg>
  )
}

export default function Portrait({
  size = 320,
  className = "",
  priority = false,
  showScale = true,
}: {
  size?: number
  className?: string
  priority?: boolean
  showScale?: boolean
}) {
  return (
    // The outer element carries the caller's display classes (`hidden
    // lg:block` and friends), which would otherwise override the flex row.
    // The row lives one level in, where nothing can clobber it.
    <div className={`relative shrink-0 ${className}`}>
      <div className="flex items-start gap-4">
      <div className="relative" style={{ width: size }}>
        {/* Blurred backdrop — the photograph's own colour, bled into the page.
            Inert and decorative, so it is hidden from assistive tech. */}
        <div
          aria-hidden="true"
          className="absolute -inset-6 -z-10 opacity-45"
          style={{ filter: "blur(36px) saturate(1.5)" }}
        >
          <Image
            src={portrait}
            alt=""
            width={size}
            height={size}
            quality={70}
            sizes="200px"
            className="w-full h-full object-cover rounded-full"
          />
        </div>

        <div className="relative overflow-hidden rounded-sm border border-line bg-card">
          <Image
            src={portrait}
            alt={`${profile.name}, ${profile.role}, at work in Harare.`}
            width={size}
            height={size}
            quality={88}
            priority={priority}
            sizes={`${size}px`}
            className="block w-full h-auto"
          />
          {/* Registration marks, the corner ticks of a plotted sheet */}
          <span aria-hidden="true" className="absolute top-2 left-2 h-3 w-px bg-white/70" />
          <span aria-hidden="true" className="absolute top-2 left-2 h-px w-3 bg-white/70" />
          <span aria-hidden="true" className="absolute bottom-2 right-2 h-3 w-px bg-white/70" />
          <span aria-hidden="true" className="absolute bottom-2 right-2 h-px w-3 bg-white/70" />
        </div>

        <p className="font-mono text-[10px] text-ink-subtle tracking-[0.14em] uppercase mt-3">
          {profile.coordinates.label}
        </p>
      </div>

        {showScale && (
          <div className="hidden sm:block shrink-0 pt-1" style={{ height: size }}>
            <SurveyScale height={size} />
          </div>
        )}
      </div>
    </div>
  )
}
