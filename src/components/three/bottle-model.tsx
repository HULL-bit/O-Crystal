"use client";

import { useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial, Text } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/**
 * Modèle 3D de la bouteille O'Crystal (sans <Canvas>) — révolution
 * (LatheGeometry), verre réfractif, eau, bouchon, bandeau argent + wordmark.
 * Réutilisé par la scène produit et la vue réalité augmentée.
 *
 * PLACEHOLDER : à remplacer par le vrai `bottle.glb` (Draco + KTX2) fourni par
 * la marque — le montage (matériaux, post-FX) reste identique.
 */
export function BottleModel({
  spin,
  autoRotate = true,
  bob = true,
  transmissionBackground = "#0b1c5e",
}: {
  /** Impulsion de rotation externe (drag) — rad/frame environ. */
  spin?: React.RefObject<number>;
  autoRotate?: boolean;
  bob?: boolean;
  transmissionBackground?: string;
}) {
  const group = useRef<THREE.Group>(null);

  const glassGeo = useMemo(() => {
    const pts = (
      [
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
      ] as [number, number][]
    ).map(([x, y]) => new THREE.Vector2(x, y));
    return new THREE.LatheGeometry(pts, 56);
  }, []);

  const waterGeo = useMemo(() => {
    const pts = (
      [
        [0.0, -1.4],
        [0.46, -1.4],
        [0.45, 0.15],
        [0.0, 0.15],
      ] as [number, number][]
    ).map(([x, y]) => new THREE.Vector2(x, y));
    return new THREE.LatheGeometry(pts, 48);
  }, []);

  useFrame((state, delta) => {
    if (!group.current) return;
    if (autoRotate) group.current.rotation.y += delta * 0.25;
    if (spin?.current) group.current.rotation.y += spin.current * delta * 6;
    if (bob) group.current.position.y = Math.sin(state.clock.elapsedTime * 0.7) * 0.05;
  });

  return (
    <group ref={group} rotation={[0.05, 0, 0]}>
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
          background={new THREE.Color(transmissionBackground)}
          color="#eaf4ff"
        />
      </mesh>

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

      <mesh position={[0, 1.28, 0]}>
        <cylinderGeometry args={[0.17, 0.17, 0.22, 32]} />
        <meshStandardMaterial color="#0A1E7A" roughness={0.4} metalness={0.1} />
      </mesh>

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
