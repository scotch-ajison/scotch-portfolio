"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"

function latLon(lat: number, lon: number, r: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lon + 180) * (Math.PI / 180)
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta)
  )
}

const AFRICA_CITIES = [
  [-17.83, 31.05], [-20.15, 28.58], [-25.74, 28.18],
  [-15.42, 28.28], [-13.96, 33.79], [-8.90, 13.18],
  [-1.29, 36.82], [9.05, 7.49], [-33.93, 18.42],
  [-4.32, 15.32], [15.55, 32.53], [3.85, 11.51],
]

function MiniGlobe() {
  const groupRef = useRef<THREE.Group>(null!)
  const pinRef = useRef<THREE.Mesh>(null!)
  const t = useRef(0)

  const gridGeo = useMemo(() => {
    const verts: number[] = []
    const r = 1.4
    for (let lat = -75; lat <= 75; lat += 20) {
      for (let lon = 0; lon < 360; lon += 3) {
        const a = latLon(lat, lon, r), b = latLon(lat, lon + 3, r)
        verts.push(a.x, a.y, a.z, b.x, b.y, b.z)
      }
    }
    for (let lon = 0; lon < 360; lon += 20) {
      for (let lat = -88; lat < 90; lat += 3) {
        const a = latLon(lat, lon, r), b = latLon(lat + 3, lon, r)
        verts.push(a.x, a.y, a.z, b.x, b.y, b.z)
      }
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3))
    return g
  }, [])

  const equatorGeo = useMemo(() => {
    const verts: number[] = []
    const r = 1.41
    for (let lon = 0; lon < 360; lon += 2) {
      const a = latLon(0, lon, r), b = latLon(0, lon + 2, r)
      verts.push(a.x, a.y, a.z, b.x, b.y, b.z)
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3))
    return g
  }, [])

  const cityGeo = useMemo(() => {
    const pos: number[] = []
    AFRICA_CITIES.forEach(([lat, lon]) => {
      const v = latLon(lat, lon, 1.43)
      pos.push(v.x, v.y, v.z)
    })
    const g = new THREE.BufferGeometry()
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3))
    return g
  }, [])

  const hararePos = useMemo(() => latLon(-17.83, 31.05, 1.45), [])
  const harareGlow = useMemo(() => latLon(-17.83, 31.05, 1.46), [])

  useFrame((_, delta) => {
    t.current += delta
    if (groupRef.current) groupRef.current.rotation.y += 0.004
    if (pinRef.current) {
      const s = 1 + Math.sin(t.current * 3) * 0.45
      pinRef.current.scale.setScalar(s)
      ;(pinRef.current.material as THREE.MeshBasicMaterial).opacity =
        0.5 - Math.sin(t.current * 3) * 0.2
    }
  })

  return (
    <group ref={groupRef} rotation={[0.1, -0.4, 0]}>
      <mesh>
        <sphereGeometry args={[1.38, 48, 48]} />
        <meshBasicMaterial color="#05060C" />
      </mesh>

      <lineSegments geometry={gridGeo}>
        <lineBasicMaterial color="#7C3AFF" transparent opacity={0.22} />
      </lineSegments>

      <lineSegments geometry={equatorGeo}>
        <lineBasicMaterial color="#06D6F0" transparent opacity={0.5} />
      </lineSegments>

      <points geometry={cityGeo}>
        <pointsMaterial color="#06D6F0" size={0.045} transparent opacity={0.85} sizeAttenuation />
      </points>

      {/* Harare pin */}
      <mesh position={hararePos.toArray() as [number, number, number]}>
        <sphereGeometry args={[0.035, 10, 10]} />
        <meshBasicMaterial color="#FF9F0A" />
      </mesh>

      {/* Pulsing glow */}
      <mesh ref={pinRef} position={harareGlow.toArray() as [number, number, number]}>
        <sphereGeometry args={[0.08, 10, 10]} />
        <meshBasicMaterial color="#FF9F0A" transparent opacity={0.4} />
      </mesh>

      <mesh>
        <sphereGeometry args={[1.48, 48, 48]} />
        <meshBasicMaterial color="#7C3AFF" transparent opacity={0.028} side={THREE.BackSide} />
      </mesh>
    </group>
  )
}

export default function ContactGlobe() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0.3, 4], fov: 38 }}
      gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
      style={{ background: "transparent" }}
    >
      <MiniGlobe />
    </Canvas>
  )
}
