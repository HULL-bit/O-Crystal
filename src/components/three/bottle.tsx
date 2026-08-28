"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  AdaptiveDpr,
  Environment,
  Lightformer,
  MeshTransmissionMaterial,
  Text,
} from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { PostFX } from "./post-fx";

/**
 * PLACEHOLDER — bouteille O'Crystal générée par révolution (LatheGeometry) :
 * verre réfractif (MeshTransmissionMaterial), eau à l'intérieur, bouchon,
 * bandeau argenté + wordmark. Rotation lente + réactions au drag / scroll.
 *
 * TODO : remplacer par le vrai `bottle.glb` (Draco + textures KTX2) fourni
 * par la marque — le montage (transmission, post-FX) reste identique.
 */
function BottleMesh({ spin }: { spin: React.RefObject<number> }) {
  const group = useRef<THREE.Group>(null);

  const glassGeo = useMemo(() => {
    const pts: THREE.Vector2[] = [
      [0.0, -1.45],
      [0.5, -1.45],
      [0.52, -1.4],
      [0.5, -1.1],
      [0.49, 0.3],
      [0.47, 0.55],
      [0.2, 0.9],
      [0.16, 0.95],
      [0.16, 1.2],
      [0.0, 1.2],
    ].map(([x, y]) => new THREE.Vector2(x, y));
    return new THREE.LatheGeometry(pts, 56);
  }, []);

  const waterGeo = useMemo(() => {
    const pts: THREE.Vector2[] = [
      [0.0, -1.4],
      [0.46, -1.4],
      [0.45, 0.15],
      [0.0, 0.15],
    ].map(([x, y]) => new THREE.Vector2(x, y));
    return new THREE.LatheGeometry(pts, 48);
  }, []);

  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.25 + (spin.current ?? 0) * delta * 6;
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.7) * 0.05;
  });

  return (
    <group ref={group} rotation={[0.05, 0, 0]}>
      {/* Verre */}
      <mesh geometry={glassGeo}>
        <MeshTransmissionMaterial
          transmission={1}
          thickness={0.35}
          roughness={0.05}
          ior={1.33}
          chromaticAberration={0.03}
          distortion={0.1}
          distortionScale={0.2}
          temporalDistortion={0.1}
          samples={4}
          resolution={256}
          background={new THREE.Color("#0b1c5e")}
          color="#eaf4ff"
        />
      </mesh>

      {/* Eau */}
      <mesh geometry={waterGeo}>
        <meshPhysicalMaterial
          color="#2E9FDF"
          transmission={0.6}
          thickness={1}
          roughness={0.15}
          ior={1.33}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Bouchon */}
      <mesh position={[0, 1.28, 0]}>
        <cylinderGeometry args={[0.17, 0.17, 0.22, 32]} />
        <meshStandardMaterial color="#0A1E7A" roughness={0.4} metalness={0.1} />
      </mesh>

      {/* Bandeau étiquette + wordmark */}
      <mesh position={[0, -0.45, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 1.1, 56, 1, true]} />
        <meshStandardMaterial
          color="#dbe3ec"
          metalness={0.6}
          roughness={0.35}
          side={THREE.DoubleSide}
          transparent
          opacity={0.92}
        />
      </mesh>
      <Text
        position={[0, -0.3, 0.55]}
        fontSize={0.16}
        letterSpacing={0.08}
        color="#0A1E7A"
        anchorX="center"
        anchorY="middle"
      >
        O&apos;CRYSTAL
      </Text>
    </group>
  );
}

export default function Bottle({ withPost = true }: { withPost?: boolean }) {
  const spin = useRef(0);
  const drag = useRef<number | null>(null);

  return (
    <Canvas
      camera={{ position: [0, 0.2, 4.2], fov: 40 }}
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      onPointerDown={(e) => (drag.current = e.clientX)}
      onPointerUp={() => {
        drag.current = null;
        spin.current = 0;
      }}
      onPointerMove={(e) => {
        if (drag.current == null) return;
        spin.current = (e.clientX - drag.current) * 0.0008;
        drag.current = e.clientX;
      }}
    >
      <AdaptiveDpr pixelated />
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 6, 5]} intensity={1.8} />
      <directionalLight position={[-5, 2, -4]} intensity={0.8} color="#7FD0F5" />
      <BottleMesh spin={spin} />
      <Environment resolution={128}>
        <Lightformer intensity={2.4} position={[0, 3, 4]} scale={[8, 6, 1]} color="#eaf4ff" />
        <Lightformer intensity={1.2} position={[-4, -1, 3]} scale={[4, 4, 1]} color="#2E9FDF" />
        <Lightformer intensity={1} position={[4, 2, -3]} scale={[3, 3, 1]} color="#ffffff" />
      </Environment>
      {withPost ? <PostFX /> : null}
    </Canvas>
  );
}
