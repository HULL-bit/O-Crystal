"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import { useRef } from "react";
import type { Mesh } from "three";

/**
 * PLACEHOLDER WebGL — activé uniquement via NEXT_PUBLIC_ENABLE_3D=true.
 * Version volontairement légère : pas d'Environment (aucun render target),
 * éclairage direct, matériaux simples. Rotation lente + flottaison.
 *
 * TODO (étape 5) : vrai modèle bottle.glb (Draco/KTX2), MeshTransmissionMaterial,
 * post-processing (bloom, god rays, aberration), morph goutte↔cristal au scroll,
 * LOD adaptatif + cibles Chromebook / Android XR (WebXR).
 */
function DropMesh() {
  const outer = useRef<Mesh>(null);
  const core = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (outer.current) outer.current.rotation.y += delta * 0.15;
    if (core.current) {
      core.current.rotation.y -= delta * 0.28;
      core.current.rotation.x += delta * 0.1;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.35} floatIntensity={0.8}>
      <mesh ref={outer} scale={1.35}>
        <icosahedronGeometry args={[1, 4]} />
        <MeshDistortMaterial
          color="#3fb0e8"
          roughness={0.15}
          metalness={0.08}
          transparent
          opacity={0.55}
          distort={0.42}
          speed={1}
        />
      </mesh>
      <mesh ref={core} scale={0.9}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial color="#c7ced8" wireframe transparent opacity={0.3} />
      </mesh>
      <mesh scale={0.52}>
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="#7fd0f5"
          emissive="#2e9fdf"
          emissiveIntensity={0.55}
          roughness={0.25}
          metalness={0.2}
        />
      </mesh>
    </Float>
  );
}

export default function CrystalDrop() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.6], fov: 42 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 4, 5]} intensity={1.8} />
      <directionalLight position={[-4, -2, -3]} intensity={0.7} color="#7fd0f5" />
      <pointLight position={[0, 0, 3]} intensity={2} color="#bfe8ff" />
      <DropMesh />
    </Canvas>
  );
}
