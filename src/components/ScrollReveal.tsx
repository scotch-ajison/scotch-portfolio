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
 */
export default function ScrollReveal({
  children,
  delay = 0,
  className = "",
  y = 14,
}: ScrollRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, margin: "-80px" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
