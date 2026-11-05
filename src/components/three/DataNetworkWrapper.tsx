"use client"

import dynamic from "next/dynamic"
import SceneGate from "./SceneGate"

const DataNetwork = dynamic(() => import("./DataNetwork"), { ssr: false })

export default function DataNetworkWrapper() {
  return (
    <SceneGate>
      <DataNetwork />
    </SceneGate>
  )
}
