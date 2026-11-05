import Image from "next/image"
import portraitTall from "@/assets/images/portrait-tall.webp"
import { profile } from "@/content/profile"

/**
 * The hero's right-hand panel: the photograph running the full height of
 * the section and bleeding off the right edge of the viewport.
 *
 * Where it meets the text it is feathered out with the page colour rather
 * than cut off — a hard vertical edge beside a headline reads as two
 * things pasted together. The gradient does the joining, and a graduated
 * staff marks the seam.
 */
export default function HeroPortrait() {
  return (
    <div
      aria-hidden="false"
      className="pointer-events-none absolute inset-y-0 right-0 hidden lg:block w-[46%] xl:w-[44%]"
    >
      <div className="relative h-full w-full">
        <Image
          src={portraitTall}
          alt={`${profile.name}, ${profile.role}, at work in Harare.`}
          fill
          priority
          quality={86}
          sizes="46vw"
          className="object-cover object-[30%_center]"
        />

        {/* Feather into the page. Horizontal does the work where the
            headline runs alongside; the verticals stop the panel from
            butting hard against the nav and the section below. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, var(--color-paper) 0%, color-mix(in srgb, var(--color-paper) 72%, transparent) 11%, color-mix(in srgb, var(--color-paper) 26%, transparent) 23%, transparent 36%)",
          }}
        />
        <div
          className="absolute inset-x-0 top-0 h-28"
          style={{ background: "linear-gradient(to bottom, var(--color-paper), transparent)" }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-32"
          style={{ background: "linear-gradient(to top, var(--color-paper), transparent)" }}
        />

        {/* The seam, marked: a levelling staff down the join. */}
        <svg
          aria-hidden="true"
          className="absolute left-[7%] top-[14%] h-[72%]"
          width="34"
          viewBox="0 0 34 600"
          preserveAspectRatio="none"
        >
          <line x1="1" y1="0" x2="1" y2="600" stroke="var(--color-line-strong)" strokeWidth="1.4" />
          {Array.from({ length: 31 }, (_, i) => i).map((i) => {
            const y = i * 20
            const major = i % 5 === 0
            return (
              <line
                key={i}
                x1="1"
                y1={y}
                x2={major ? 15 : 8}
                y2={y}
                stroke={major ? "var(--color-ink-subtle)" : "var(--color-line-strong)"}
                strokeWidth={major ? 1.4 : 1}
              />
            )
          })}
          <line x1="1" y1="216" x2="22" y2="216" stroke="var(--color-accent)" strokeWidth="3" />
        </svg>

        <p className="absolute bottom-10 right-6 font-mono text-[10px] text-ink-subtle tracking-[0.16em] uppercase">
          {profile.coordinates.label}
        </p>
      </div>
    </div>
  )
}
