"use client";

import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr, Environment, Lightformer } from "@react-three/drei";
import { useRef } from "react";
import { BottleModel } from "./bottle-model";
import { PostFX } from "./post-fx";

/**
 * Packshot 3D de la bouteille O'Crystal — rotation lente + drag.
 * Modèle procédural (voir `bottle-model.tsx`), à remplacer par le `bottle.glb`.
 */
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
      <BottleModel spin={spin} />
      <Environment resolution={128}>
        <Lightformer intensity={2.4} position={[0, 3, 4]} scale={[8, 6, 1]} color="#eaf4ff" />
        <Lightformer intensity={1.2} position={[-4, -1, 3]} scale={[4, 4, 1]} color="#2E9FDF" />
        <Lightformer intensity={1} position={[4, 2, -3]} scale={[3, 3, 1]} color="#ffffff" />
      </Environment>
      {withPost ? <PostFX /> : null}
    </Canvas>
  );
}
