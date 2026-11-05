import Image from "next/image"
import workspace from "@/assets/images/workspace.webp"
import { profile } from "@/content/profile"

/**
 * The hero photograph on phones.
 *
 * A full-height panel has nowhere to go at 375px, and the square portrait
 * that used to sit here read as a snapshot dropped into the column. This
 * is the wider frame of the same photograph, run edge to edge — breaking
 * the page gutter on purpose — with the top feathered into the page so it
 * arrives rather than starts, and the graduated staff carried across so
 * the mobile layout belongs to the same document as the desktop one.
 */
export default function HeroPortraitMobile() {
  return (
    <figure className="lg:hidden relative -mx-6 mt-12">
      <div className="relative aspect-[3/2] w-full overflow-hidden bg-sunken">
        <Image
          src={workspace}
          alt={`${profile.name}, ${profile.role}, at work in Harare.`}
          fill
          sizes="100vw"
          quality={82}
          className="object-cover object-[42%_center]"
        />

        {/* Feather the top edge so the photograph meets the copy softly
            rather than butting against it. */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-24"
          style={{ background: "linear-gradient(to bottom, var(--color-paper), transparent)" }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-16"
          style={{ background: "linear-gradient(to top, var(--color-paper), transparent)" }}
        />

        {/* The staff, horizontal here — it reads as a scale bar on a sheet. */}
        <svg
          aria-hidden="true"
          className="absolute bottom-5 left-6 h-5"
          width="150"
          viewBox="0 0 150 20"
        >
          <line x1="0" y1="19" x2="150" y2="19" stroke="var(--color-line-strong)" strokeWidth="1.4" />
          {Array.from({ length: 16 }, (_, i) => i).map((i) => {
            const x = i * 10
            const major = i % 5 === 0
            return (
              <line
                key={i}
                x1={x}
                y1={19}
                x2={x}
                y2={major ? 7 : 13}
                stroke={major ? "var(--color-ink-subtle)" : "var(--color-line-strong)"}
                strokeWidth={major ? 1.4 : 1}
              />
            )
          })}
          <line x1="50" y1="19" x2="50" y2="3" stroke="var(--color-accent)" strokeWidth="2.4" />
        </svg>
      </div>

      <figcaption className="px-6 mt-3 font-mono text-[10px] text-ink-subtle tracking-[0.16em] uppercase">
        {profile.coordinates.label} · {profile.location}
      </figcaption>
    </figure>
  )
}
