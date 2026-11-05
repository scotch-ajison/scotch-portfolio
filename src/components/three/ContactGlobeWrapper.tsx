"use client"

import dynamic from "next/dynamic"
import SceneGate from "./SceneGate"

const ContactGlobe = dynamic(() => import("./ContactGlobe"), { ssr: false })

export default function ContactGlobeWrapper() {
  return (
    <SceneGate>
      <ContactGlobe />
    </SceneGate>
  )
}
