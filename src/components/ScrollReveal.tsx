"use client"

import { motion } from "motion/react"
import type { ReactNode } from "react"

interface ScrollRevealProps {
  children: ReactNode
  delay?: number
  className?: string
  y?: number
}

/**
 * Restrained entrance. Smaller travel and a slower curve than before —
 * motion that announces itself reads as a template.
 *
 * MotionProvider sets reducedMotion="user" globally, so this is already
 * neutralised for anyone who asked for less motion.
 *
 * The `data-reveal` hook exists so a <noscript> rule in the layout can
 * force these visible: the element starts at opacity 0, so without
 * JavaScript everything below the hero would never appear at all.
 */
export default function ScrollReveal({
  children,
  delay = 0,
  className = "",
  y = 14,
}: ScrollRevealProps) {
  return (
    <motion.div
      data-reveal
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, margin: "-40px" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
