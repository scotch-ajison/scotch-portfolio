"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Stars } from "@react-three/drei"
import * as THREE from "three"

const DEG = Math.PI / 180

function latLon(lat: number, lon: number, r: number): THREE.Vector3 {
  const phi = (90 - lat) * DEG
  const theta = (lon + 180) * DEG
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta)
  )
}

function orbitPos(angle: number, radius: number, inc: number, raan: number): THREE.Vector3 {
  const x0 = Math.cos(angle) * radius
  const y0 = Math.sin(angle) * radius
  const x1 = x0
  const y1 = y0 * Math.cos(inc)
  const z1 = y0 * Math.sin(inc)
  return new THREE.Vector3(
    x1 * Math.cos(raan) - y1 * Math.sin(raan),
    x1 * Math.sin(raan) + y1 * Math.cos(raan),
    z1
  )
}

// ── Constellation definitions ──────────────────────────────────────
const CONSTELLATIONS = [
  // GPS MEO – 3 planes, 55° inclination, ~20,000 km equiv
  { inc: 55 * DEG, raan: 0,          radius: 3.6, speed: 0.09, count: 4, phase: 0,    trackColor: "#06D6F0" },
  { inc: 55 * DEG, raan: 60  * DEG,  radius: 3.6, speed: 0.09, count: 4, phase: 1.57, trackColor: "#06D6F0" },
  { inc: 55 * DEG, raan: 120 * DEG,  radius: 3.6, speed: 0.09, count: 4, phase: 3.14, trackColor: "#06D6F0" },
  // Sun-synchronous polar – Earth observation
  { inc: 92 * DEG, raan: 25  * DEG,  radius: 2.9, speed: 0.18, count: 3, phase: 0,    trackColor: "#7C3AFF" },
  { inc: 92 * DEG, raan: 115 * DEG,  radius: 2.9, speed: 0.18, count: 3, phase: 2.09, trackColor: "#7C3AFF" },
  // GEO belt – communications / weather
  { inc: 1  * DEG, raan: 0,          radius: 4.4, speed: 0.03, count: 6, phase: 0,    trackColor: "#FF9F0A" },
]

// ── Single satellite model ──────────────────────────────────────────
interface SatProps {
  inc: number; raan: number; radius: number; speed: number; phase: number
}

function Satellite({ inc, raan, radius, speed, phase }: SatProps) {
  const ref = useRef<THREE.Group>(null!)
  const t = useRef(phase)

  useFrame((_, delta) => {
    t.current += delta * speed
    const a = t.current
    const pos = orbitPos(a, radius, inc, raan)
    const nxt = orbitPos(a + 0.002, radius, inc, raan)

    if (ref.current) {
      ref.current.position.copy(pos)
      const fwd = new THREE.Vector3().subVectors(nxt, pos).normalize()
      if (fwd.lengthSq() > 0.0001) {
        ref.current.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), fwd)
      }
    }
  })

  return (
    <group ref={ref}>
      {/* ─ Main bus body ─ */}
      <mesh>
        <boxGeometry args={[0.09, 0.055, 0.13]} />
        <meshBasicMaterial color="#D6E4F0" />
      </mesh>

      {/* ─ Solar array left ─ */}
      <mesh position={[-0.19, 0, 0.01]}>
        <boxGeometry args={[0.2, 0.007, 0.1]} />
        <meshBasicMaterial color="#1A3A82" />
      </mesh>
      {/* left panel grid lines */}
      <mesh position={[-0.19, 0.005, 0.01]}>
        <boxGeometry args={[0.19, 0.001, 0.095]} />
        <meshBasicMaterial color="#2250B4" wireframe />
      </mesh>

      {/* ─ Solar array right ─ */}
      <mesh position={[0.19, 0, 0.01]}>
        <boxGeometry args={[0.2, 0.007, 0.1]} />
        <meshBasicMaterial color="#1A3A82" />
      </mesh>
      <mesh position={[0.19, 0.005, 0.01]}>
        <boxGeometry args={[0.19, 0.001, 0.095]} />
        <meshBasicMaterial color="#2250B4" wireframe />
      </mesh>

      {/* ─ Boom connectors ─ */}
      <mesh position={[-0.095, 0, 0.01]}>
        <boxGeometry args={[0.01, 0.008, 0.015]} />
        <meshBasicMaterial color="#999" />
      </mesh>
      <mesh position={[0.095, 0, 0.01]}>
        <boxGeometry args={[0.01, 0.008, 0.015]} />
        <meshBasicMaterial color="#999" />
      </mesh>

      {/* ─ Comm dish ─ */}
      <mesh position={[0, 0.045, -0.04]} rotation={[0.5, 0, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.004, 10]} />
        <meshBasicMaterial color="#EEF2F8" />
      </mesh>
      <mesh position={[0, 0.055, -0.045]} rotation={[0.5, 0, 0]}>
        <cylinderGeometry args={[0.001, 0.001, 0.025, 4]} />
        <meshBasicMaterial color="#CCC" />
      </mesh>

      {/* ─ Glow halo ─ */}
      <mesh>
        <sphereGeometry args={[0.14, 8, 8]} />
        <meshBasicMaterial color="#06D6F0" transparent opacity={0.08} />
      </mesh>
    </group>
  )
}

// ── Earth globe ────────────────────────────────────────────────────
function Globe() {
  const globeRef = useRef<THREE.Group>(null!)
  const pulseRef = useRef<THREE.Mesh>(null!)
  const t = useRef(0)

  const R = 2.4

  const gridGeo = useMemo(() => {
    const v: number[] = []
    for (let lat = -80; lat <= 80; lat += 15) {
      for (let lon = 0; lon < 360; lon += 2) {
        const a = latLon(lat, lon, R), b = latLon(lat, lon + 2, R)
        v.push(a.x, a.y, a.z, b.x, b.y, b.z)
      }
    }
    for (let lon = 0; lon < 360; lon += 15) {
      for (let lat = -88; lat < 90; lat += 2) {
        const a = latLon(lat, lon, R), b = latLon(lat + 2, lon, R)
        v.push(a.x, a.y, a.z, b.x, b.y, b.z)
      }
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute("position", new THREE.Float32BufferAttribute(v, 3))
    return g
  }, [])

  const keyLineGeo = useMemo(() => {
    const v: number[] = []
    const r = R + 0.01
    // Equator
    for (let lon = 0; lon < 360; lon++) {
      const a = latLon(0, lon, r), b = latLon(0, lon + 1, r)
      v.push(a.x, a.y, a.z, b.x, b.y, b.z)
    }
    // Tropic of Capricorn
    for (let lon = 0; lon < 360; lon++) {
      const a = latLon(-23.5, lon, r), b = latLon(-23.5, lon + 1, r)
      v.push(a.x, a.y, a.z, b.x, b.y, b.z)
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute("position", new THREE.Float32BufferAttribute(v, 3))
    return g
  }, [])

  const cityGeo = useMemo(() => {
    const cities = [
      [-17.83, 31.05], [-20.15, 28.58], [-25.74, 28.18],
      [-1.29, 36.82], [9.05, 7.49], [-33.93, 18.42],
      [30.04, 31.24], [51.51, -0.12], [48.85, 2.35],
      [40.71, -74.01], [35.68, 139.69], [-33.87, 151.21],
      [-4.32, 15.32], [15.55, 32.53], [-26.2, 28.04],
    ]
    const pos: number[] = []
    cities.forEach(([lat, lon]) => {
      const v = latLon(lat, lon, R + 0.04)
      pos.push(v.x, v.y, v.z)
    })
    const g = new THREE.BufferGeometry()
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3))
    return g
  }, [])

  const hararePos = useMemo(() => latLon(-17.83, 31.05, R + 0.06), [])
  const harareGlow = useMemo(() => latLon(-17.83, 31.05, R + 0.07), [])

  // Orbital track lines (in world space, don't rotate with globe)
  const trackGeos = useMemo(() =>
    CONSTELLATIONS.map(c => {
      const v: number[] = []
      for (let i = 0; i < 360; i += 2) {
        const pa = orbitPos(i * DEG, c.radius, c.inc, c.raan)
        const pb = orbitPos((i + 2) * DEG, c.radius, c.inc, c.raan)
        v.push(pa.x, pa.y, pa.z, pb.x, pb.y, pb.z)
      }
      const g = new THREE.BufferGeometry()
      g.setAttribute("position", new THREE.Float32BufferAttribute(v, 3))
      return g
    }), [])

  const satellites = useMemo(() =>
    CONSTELLATIONS.flatMap(c =>
      Array.from({ length: c.count }, (_, i) => ({
        inc: c.inc, raan: c.raan, radius: c.radius, speed: c.speed,
        phase: c.phase + (i / c.count) * Math.PI * 2,
      }))
    ), [])

  useFrame((_, delta) => {
    t.current += delta
    if (globeRef.current) globeRef.current.rotation.y += 0.0015
    if (pulseRef.current) {
      const s = 1 + Math.sin(t.current * 2.5) * 0.65
      pulseRef.current.scale.setScalar(s)
      ;(pulseRef.current.material as THREE.MeshBasicMaterial).opacity =
        0.5 - Math.sin(t.current * 2.5) * 0.22
    }
  })

  return (
    <>
      {/* ── Globe (rotates) ── */}
      <group ref={globeRef} rotation={[0.12, -0.3, 0]}>
        {/* Dark core */}
        <mesh>
          <sphereGeometry args={[R - 0.02, 64, 64]} />
          <meshBasicMaterial color="#02030A" />
        </mesh>

        {/* Grid lines — VIVID */}
        <lineSegments geometry={gridGeo}>
          <lineBasicMaterial color="#06D6F0" transparent opacity={0.5} />
        </lineSegments>

        {/* Key lines brighter */}
        <lineSegments geometry={keyLineGeo}>
          <lineBasicMaterial color="#06D6F0" transparent opacity={0.9} />
        </lineSegments>

        {/* City dots */}
        <points geometry={cityGeo}>
          <pointsMaterial color="#FFFFFF" size={0.06} transparent opacity={0.9} sizeAttenuation />
        </points>

        {/* Harare — amber pin */}
        <mesh position={hararePos.toArray() as [number,number,number]}>
          <sphereGeometry args={[0.055, 12, 12]} />
          <meshBasicMaterial color="#FF9F0A" />
        </mesh>
        <mesh ref={pulseRef} position={harareGlow.toArray() as [number,number,number]}>
          <sphereGeometry args={[0.13, 12, 12]} />
          <meshBasicMaterial color="#FF9F0A" transparent opacity={0.4} />
        </mesh>

        {/* Atmosphere */}
        <mesh>
          <sphereGeometry args={[R + 0.12, 64, 64]} />
          <meshBasicMaterial color="#06D6F0" transparent opacity={0.045} side={THREE.BackSide} />
        </mesh>
        <mesh>
          <sphereGeometry args={[R + 0.45, 64, 64]} />
          <meshBasicMaterial color="#7C3AFF" transparent opacity={0.02} side={THREE.BackSide} />
        </mesh>
      </group>

      {/* ── Orbital tracks (world space) ── */}
      {trackGeos.map((geo, i) => (
        <lineSegments key={i} geometry={geo}>
          <lineBasicMaterial
            color={CONSTELLATIONS[i].trackColor}
            transparent
            opacity={0.18}
          />
        </lineSegments>
      ))}

      {/* ── Satellites ── */}
      {satellites.map((s, i) => (
        <Satellite key={i} {...s} />
      ))}
    </>
  )
}

export default function HeroGlobe() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0.8, 6.2], fov: 52 }}
      gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
      style={{ background: "transparent", width: "100%", height: "100%" }}
    >
      <Stars radius={220} depth={70} count={6000} factor={4} saturation={0} fade speed={0.18} />
      <Globe />
    </Canvas>
  )
}
