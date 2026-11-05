"use client"

import { useEffect, useState, type ReactNode } from "react"

/**
 * Decides whether a 3D scene is mounted at all.
 *
 * The scenes used to sit inside `hidden md:block` containers, which sets
 * display:none on a phone — but display:none does not stop a WebGL frame
 * loop. The canvas kept rendering, invisibly, on the devices least able to
 * spare the battery. Gate on the media query, not on visibility.
 *
 * Also declines to mount for anyone who asked for reduced motion: these
 * scenes are continuous animation with no still state worth showing.
 */
export default function SceneGate({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const wide = window.matchMedia("(min-width: 768px)")
    const still = window.matchMedia("(prefers-reduced-motion: reduce)")

    const evaluate = () => setEnabled(wide.matches && !still.matches)
    evaluate()

    wide.addEventListener("change", evaluate)
    still.addEventListener("change", evaluate)
    return () => {
      wide.removeEventListener("change", evaluate)
      still.removeEventListener("change", evaluate)
    }
  }, [])

  if (!enabled) return null
  return <>{children}</>
}
