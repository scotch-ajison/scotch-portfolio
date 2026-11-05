"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"

function Grid() {
  const groupRef = useRef<THREE.Group>(null!)
  const ringsRef = useRef<THREE.Group>(null!)
  const t = useRef(0)

  const gridGeo = useMemo(() => {
    const verts: number[] = []
    const size = 14, step = 1

    for (let x = -size; x <= size; x += step) {
      verts.push(x, 0, -size, x, 0, size)
    }
    for (let z = -size; z <= size; z += step) {
      verts.push(-size, 0, z, size, 0, z)
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3))
    return g
  }, [])

  const axisGeo = useMemo(() => {
    const verts: number[] = []
    // Highlight center cross axes
    verts.push(-14, 0, 0, 14, 0, 0)
    verts.push(0, 0, -14, 0, 0, 14)
    const g = new THREE.BufferGeometry()
    g.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3))
    return g
  }, [])

  const pinGeo = useMemo(() => {
    const positions = [
      [2, 0, -3], [-4, 0, 1], [0, 0, 4], [5, 0, 2],
      [-2, 0, -5], [4, 0, -1], [-5, 0, 3],
    ]
    const pos: number[] = []
    positions.forEach(([x, , z]) => pos.push(x, 0.05, z))
    const g = new THREE.BufferGeometry()
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3))
    return g
  }, [])

  // Expanding ring geometries (3 rings at different phases)
  const ringGeos = useMemo(() =>
    [0, 1, 2].map(i => {
      const verts: number[] = []
      for (let a = 0; a < 360; a += 3) {
        const r = 1
        const t1 = (a * Math.PI) / 180, t2 = ((a + 3) * Math.PI) / 180
        verts.push(r * Math.cos(t1), 0, r * Math.sin(t1))
        verts.push(r * Math.cos(t2), 0, r * Math.sin(t2))
      }
      const g = new THREE.BufferGeometry()
      g.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3))
      return { geo: g, phase: i / 3 }
    }), [])

  useFrame((_, delta) => {
    t.current += delta

    if (ringsRef.current) {
      ringsRef.current.children.forEach((child, i) => {
        const progress = ((t.current * 0.4 + ringGeos[i].phase) % 1)
        child.scale.setScalar(1 + progress * 5)
        const material = (child as THREE.LineSegments).material as
          | THREE.LineBasicMaterial
          | undefined
        if (material && "opacity" in material) {
          material.opacity = (1 - progress) * 0.4
        }
      })
    }

    if (groupRef.current) {
      // Subtle tilt oscillation
      groupRef.current.rotation.z = Math.sin(t.current * 0.1) * 0.02
    }
  })

  return (
    <group ref={groupRef} rotation={[-1.1, 0.2, 0.1]}>
      {/* Base grid */}
      <lineSegments geometry={gridGeo}>
        <lineBasicMaterial color="#7C3AFF" transparent opacity={0.55} />
      </lineSegments>

      {/* Bright center axes */}
      <lineSegments geometry={axisGeo}>
        <lineBasicMaterial color="#06D6F0" transparent opacity={0.9} />
      </lineSegments>

      {/* Data pins */}
      <points geometry={pinGeo}>
        <pointsMaterial color="#06D6F0" size={0.14} transparent opacity={0.9} sizeAttenuation />
      </points>

      {/* Amber origin pin */}
      <mesh position={[0, 0.05, 0]}>
        <sphereGeometry args={[0.1, 12, 12]} />
        <meshBasicMaterial color="#FF9F0A" />
      </mesh>

      {/* Expanding signal rings */}
      <group ref={ringsRef} position={[0, 0.01, 0]}>
        {ringGeos.map((r, i) => (
          <lineSegments key={i} geometry={r.geo}>
            <lineBasicMaterial color="#FF9F0A" transparent opacity={0.35} />
          </lineSegments>
        ))}
      </group>
    </group>
  )
}

export default function SpatialGrid() {
  return (
    <Canvas
      camera={{ position: [0, 6, 10], fov: 44 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <Grid />
    </Canvas>
  )
}
