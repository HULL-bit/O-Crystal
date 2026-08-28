"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  AdaptiveDpr,
  Environment,
  Float,
  Lightformer,
  MeshTransmissionMaterial,
} from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import type { Mesh } from "three";
import { PostFX } from "./post-fx";

/**
 * Pièce maîtresse 3D du hero — goutte-cristal en verre réfractif, avec un cœur
 * facetté (la rosace de l'étiquette) qui capte la lumière. Rotation + flottaison.
 *
 * TODO (finition) : morph goutte↔cristal piloté au scroll, caustiques projetées.
 */
function DropMesh() {
  const outer = useRef<Mesh>(null);
  const core = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (outer.current) outer.current.rotation.y += delta * 0.16;
    if (core.current) {
      core.current.rotation.y -= delta * 0.3;
      core.current.rotation.x += delta * 0.12;
    }
  });

  return (
    <Float speed={1.1} rotationIntensity={0.35} floatIntensity={0.9}>
      <mesh ref={outer} scale={1.4}>
        <icosahedronGeometry args={[1, 8]} />
        <MeshTransmissionMaterial
          transmission={1}
          thickness={0.9}
          roughness={0.06}
          ior={1.4}
          chromaticAberration={0.06}
          distortion={0.3}
          distortionScale={0.4}
          temporalDistortion={0.15}
          samples={4}
          resolution={256}
          background={new THREE.Color("#0b1c5e")}
          color="#dff1ff"
        />
      </mesh>
      <mesh ref={core} scale={0.72}>
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="#7fd0f5"
          emissive="#2e9fdf"
          emissiveIntensity={0.6}
          roughness={0.15}
          metalness={0.3}
        />
      </mesh>
      <mesh scale={0.9}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial color="#dbe3ec" wireframe transparent opacity={0.18} />
      </mesh>
    </Float>
  );
}

export default function CrystalDrop() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.6], fov: 42 }}
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <AdaptiveDpr pixelated />
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 4, 5]} intensity={1.6} />
      <directionalLight position={[-4, -2, -3]} intensity={0.7} color="#7FD0F5" />
      <DropMesh />
      <Environment resolution={128}>
        <Lightformer intensity={2.2} position={[0, 2, 3]} scale={[6, 6, 1]} color="#dff1ff" />
        <Lightformer intensity={1.4} position={[-3, -1, 2]} scale={[4, 4, 1]} color="#2E9FDF" />
        <Lightformer intensity={1} position={[3, 1, -2]} scale={[3, 3, 1]} color="#ffffff" />
      </Environment>
      <PostFX />
    </Canvas>
  );
}
