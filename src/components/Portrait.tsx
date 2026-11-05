import Image from "next/image"
import portrait from "@/assets/images/portrait.webp"
import { profile } from "@/content/profile"

/**
 * The source is a 592px photograph — the only one that exists — cropped to
 * head and shoulders and upscaled once, offline. It is never displayed
 * above 340px, which keeps it comfortably inside a 2x render.
 */
export default function Portrait({
  size = 320,
  className = "",
  priority = false,
}: {
  size?: number
  className?: string
  priority?: boolean
}) {
  return (
    <div className={`relative shrink-0 ${className}`} style={{ width: size }}>
      <div className="relative overflow-hidden rounded-sm border border-border-strong">
        <Image
          src={portrait}
          alt={`${profile.name}, ${profile.role}, in Harare.`}
          width={size}
          height={size}
          quality={90}
          priority={priority}
          sizes={`${size}px`}
          className="block w-full h-auto"
        />
        {/* Grounds the photograph on the dark page rather than letting it
            float as a bright square. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(11,11,12,0.55) 0%, rgba(11,11,12,0.06) 38%, transparent 70%)",
          }}
        />
      </div>
      <p className="font-mono text-[10px] text-fg-subtle tracking-[0.14em] uppercase mt-3">
        {profile.coordinates.label}
      </p>
    </div>
  )
}
