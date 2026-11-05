"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"

const RNG = (seed: number) => {
  let s = seed
  return () => { s = (s * 9301 + 49297) % 233280; return s / 233280 }
}

function Network() {
  const groupRef = useRef<THREE.Group>(null!)
  const flowRef = useRef<THREE.Points>(null!)
  const t = useRef(0)

  const rng = useMemo(() => RNG(42), [])

  const nodes = useMemo(() =>
    Array.from({ length: 24 }, () => new THREE.Vector3(
      (rng() - 0.5) * 7,
      (rng() - 0.5) * 4.5,
      (rng() - 0.5) * 3
    )), [rng])

  const { edgeGeo, edgePairs } = useMemo(() => {
    const verts: number[] = []
    const pairs: [number, number][] = []
    nodes.forEach((a, i) => {
      nodes.forEach((b, j) => {
        if (i >= j) return
        if (a.distanceTo(b) < 2.6) {
          verts.push(a.x, a.y, a.z, b.x, b.y, b.z)
          pairs.push([i, j])
        }
      })
    })
    const g = new THREE.BufferGeometry()
    g.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3))
    return { edgeGeo: g, edgePairs: pairs }
  }, [nodes])

  const nodeGeo = useMemo(() => {
    const pos: number[] = []
    nodes.forEach(n => pos.push(n.x, n.y, n.z))
    const g = new THREE.BufferGeometry()
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3))
    return g
  }, [nodes])

  const accentGeo = useMemo(() => {
    // A few highlighted nodes (amber) — the "active" ones
    const indices = [0, 5, 12, 18]
    const pos: number[] = []
    indices.forEach(i => {
      const n = nodes[i]
      pos.push(n.x, n.y, n.z)
    })
    const g = new THREE.BufferGeometry()
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3))
    return g
  }, [nodes])

  // Animated flow dots travelling along edges
  const flowGeo = useMemo(() => new THREE.BufferGeometry(), [])

  useFrame((_, delta) => {
    t.current += delta
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.003
      groupRef.current.rotation.x = Math.sin(t.current * 0.18) * 0.08
    }

    // Update flow dots (one per edge, animated along the edge)
    if (flowRef.current) {
      const pos: number[] = []
      edgePairs.forEach(([i, j], idx) => {
        const a = nodes[i], b = nodes[j]
        const progress = ((t.current * 0.5 + idx * 0.37) % 1)
        pos.push(
          a.x + (b.x - a.x) * progress,
          a.y + (b.y - a.y) * progress,
          a.z + (b.z - a.z) * progress
        )
      })
      // Write into the live geometry on the mesh and dispose the previous
      // one, rather than mutating the memoised value — mutating a value
      // passed to a hook is what the immutability rule is guarding against,
      // and leaking geometries here would grow every frame.
      const next = new THREE.BufferGeometry()
      next.setAttribute("position", new THREE.Float32BufferAttribute(new Float32Array(pos), 3))
      const previous = flowRef.current.geometry
      flowRef.current.geometry = next
      if (previous && previous !== flowGeo) previous.dispose()
    }
  })

  return (
    <group ref={groupRef}>
      {/* Edges */}
      <lineSegments geometry={edgeGeo}>
        <lineBasicMaterial color="#7C3AFF" transparent opacity={0.55} />
      </lineSegments>

      {/* Node dots — electric */}
      <points geometry={nodeGeo}>
        <pointsMaterial color="#06D6F0" size={0.1} transparent opacity={0.85} sizeAttenuation />
      </points>

      {/* Accent nodes — amber */}
      <points geometry={accentGeo}>
        <pointsMaterial color="#FF9F0A" size={0.18} transparent opacity={0.95} sizeAttenuation />
      </points>

      {/* Animated flow particles */}
      <points ref={flowRef} geometry={flowGeo}>
        <pointsMaterial color="#06D6F0" size={0.07} transparent opacity={0.9} sizeAttenuation />
      </points>
    </group>
  )
}

export default function DataNetwork() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 8], fov: 50 }}
      gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
      style={{ background: "transparent" }}
    >
      <Network />
    </Canvas>
  )
}
