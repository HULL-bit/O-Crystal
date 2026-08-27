"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  AdaptiveDpr,
  Environment,
  Float,
  Lightformer,
  MeshDistortMaterial,
} from "@react-three/drei";
import { useRef } from "react";
import type { Mesh } from "three";

/**
 * PLACEHOLDER — pièce maîtresse 3D du hero.
 * Une forme unique qui oscille entre goutte (surface liquide, distorsion haute)
 * et cristal (facettes nettes, distorsion basse), capte la lumière et flotte.
 *
 * TODO (étape 5) : remplacer par le vrai modèle (bottle.glb / drop.glb) avec
 * MeshTransmissionMaterial (réfraction), post-processing (bloom, god rays,
 * aberration chromatique) et morph goutte↔cristal piloté au scroll.
 */
function DropMesh() {
  const mesh = useRef<Mesh>(null);
  const inner = useRef<Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (mesh.current) mesh.current.rotation.y = t * 0.18;
    if (inner.current) {
      inner.current.rotation.y = -t * 0.3;
      inner.current.rotation.x = t * 0.1;
    }
  });

  return (
    <Float speed={1.1} rotationIntensity={0.4} floatIntensity={0.9}>
      <mesh ref={mesh} scale={1.35}>
        <icosahedronGeometry args={[1, 5]} />
        <MeshDistortMaterial
          color="#3Fb0e8"
          roughness={0.12}
          metalness={0.1}
          transparent
          opacity={0.6}
          distort={0.45}
          speed={1.2}
          envMapIntensity={1.6}
        />
      </mesh>
      {/* Rosace « cristal » : structure interne facettée bien lisible */}
      <mesh ref={inner} scale={0.9}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial color="#C7CED8" wireframe transparent opacity={0.35} />
      </mesh>
      <mesh scale={0.55}>
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="#7FD0F5"
          emissive="#2E9FDF"
          emissiveIntensity={0.5}
          roughness={0.2}
          metalness={0.3}
        />
      </mesh>
    </Float>
  );
}

export default function CrystalDrop() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.6], fov: 42 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      frameloop="always"
    >
      <AdaptiveDpr pixelated />
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 4, 5]} intensity={1.6} color="#ffffff" />
      <directionalLight position={[-4, -2, -3]} intensity={0.8} color="#7FD0F5" />
      <DropMesh />
      {/* Environnement procédural (aucun HDR téléchargé — CSP / offline safe) */}
      <Environment resolution={128}>
        <Lightformer intensity={2} position={[0, 2, 3]} scale={[6, 6, 1]} color="#7FD0F5" />
        <Lightformer intensity={1.4} position={[-3, -1, 2]} scale={[4, 4, 1]} color="#0A1E7A" />
        <Lightformer intensity={1} position={[3, 1, -2]} scale={[3, 3, 1]} color="#ffffff" />
      </Environment>
    </Canvas>
  );
}
