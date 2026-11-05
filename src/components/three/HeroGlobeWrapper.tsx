"use client"

import dynamic from "next/dynamic"
import SceneGate from "./SceneGate"

const HeroGlobe = dynamic(() => import("./HeroGlobe"), { ssr: false })

export default function HeroGlobeWrapper() {
  return (
    <SceneGate>
      <HeroGlobe />
    </SceneGate>
  )
}
