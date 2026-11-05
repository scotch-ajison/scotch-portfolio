"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"

function Terrain() {
  const groupRef = useRef<THREE.Group>(null!)
  const scanRef = useRef<THREE.Mesh>(null!)
  const t = useRef(0)

  const { solidGeo, wireGeo } = useMemo(() => {
    const seg = 72
    const size = 10

    const geo = new THREE.PlaneGeometry(size, size, seg, seg)
    geo.rotateX(-Math.PI / 2)

    const pos = geo.attributes.position.array as Float32Array
    for (let i = 0; i < pos.length; i += 3) {
      const x = pos[i], z = pos[i + 2]
      pos[i + 1] =
        Math.sin(x * 0.6) * Math.cos(z * 0.5) * 0.55 +
        Math.sin(x * 1.4 + 0.8) * Math.sin(z * 1.8) * 0.25 +
        Math.sin(x * 0.25 + z * 0.4) * 0.38 +
        Math.cos(x * 0.9 + z * 0.7) * 0.2
    }
    geo.computeVertexNormals()

    const wGeo = geo.clone()
    return { solidGeo: geo, wireGeo: wGeo }
  }, [])

  // Data-point pins on terrain peaks
  const pinGeo = useMemo(() => {
    const positions = [
      [1.8, 0, -1.2], [-2.5, 0, 1.0], [0.4, 0, 2.8],
      [-1.0, 0, -2.4], [3.2, 0, 0.6], [-3.5, 0, -1.8],
    ]
    const pos: number[] = []
    const plane = solidGeo
    const planePos = plane.attributes.position.array as Float32Array
    positions.forEach(([px, , pz]) => {
      let minDist = Infinity, py = 0
      for (let i = 0; i < planePos.length; i += 3) {
        const dx = planePos[i] - px, dz = planePos[i + 2] - pz
        const d = dx * dx + dz * dz
        if (d < minDist) { minDist = d; py = planePos[i + 1] }
      }
      pos.push(px, py + 0.25, pz)
    })
    const g = new THREE.BufferGeometry()
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3))
    return g
  }, [solidGeo])

  useFrame((_, delta) => {
    t.current += delta
    if (groupRef.current) groupRef.current.rotation.y += 0.0006
    if (scanRef.current) {
      const v = (((t.current * 0.35) % 1) * 10) - 5
      scanRef.current.position.z = v
      ;(scanRef.current.material as THREE.MeshBasicMaterial).opacity =
        0.2 + Math.abs(Math.sin(t.current * 1.2)) * 0.25
    }
  })

  return (
    <group ref={groupRef} rotation={[0.38, 0.3, 0]}>
      {/* Solid dark terrain */}
      <mesh geometry={solidGeo}>
        <meshLambertMaterial color="#07080F" />
      </mesh>

      {/* Violet wireframe overlay */}
      <mesh geometry={wireGeo}>
        <meshBasicMaterial wireframe color="#7C3AFF" transparent opacity={0.65} />
      </mesh>

      {/* Electric scan plane */}
      <mesh ref={scanRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <planeGeometry args={[10, 0.5]} />
        <meshBasicMaterial color="#06D6F0" transparent opacity={0.3} side={THREE.DoubleSide} />
      </mesh>

      {/* Data pins */}
      <points geometry={pinGeo}>
        <pointsMaterial color="#FF9F0A" size={0.12} transparent opacity={0.95} sizeAttenuation />
      </points>

      {/* Subtle contour glow light */}
      <pointLight position={[0, 4, 0]} color="#7C3AFF" intensity={0.4} distance={12} />
      <pointLight position={[3, 2, -2]} color="#06D6F0" intensity={0.25} distance={8} />
    </group>
  )
}

export default function TerrainScene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 4.5, 9], fov: 62 }}
      gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.05} />
      <Terrain />
    </Canvas>
  )
}
