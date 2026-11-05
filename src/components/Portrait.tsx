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
      <div className="relative overflow-hidden rounded-sm border border-line">
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
      </div>
      <p className="font-mono text-[10px] text-ink-subtle tracking-[0.14em] uppercase mt-3">
        {profile.coordinates.label}
      </p>
    </div>
  )
}
