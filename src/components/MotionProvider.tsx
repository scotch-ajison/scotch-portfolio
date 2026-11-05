"use client"

import { MotionConfig } from "motion/react"
import type { ReactNode } from "react"

/**
 * One switch for every animation on the site.
 *
 * `reducedMotion="user"` makes motion components honour the OS setting by
 * skipping transform and layout animation rather than snapping through it.
 * The CSS half of this lives in globals.css.
 */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
