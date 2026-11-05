"use client"

import dynamic from "next/dynamic"
import SceneGate from "./SceneGate"

const SpatialGrid = dynamic(() => import("./SpatialGrid"), { ssr: false })

export default function SpatialGridWrapper() {
  return (
    <SceneGate>
      <SpatialGrid />
    </SceneGate>
  )
}
