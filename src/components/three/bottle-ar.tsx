"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { XR, createXRStore } from "@react-three/xr";
import { useEffect } from "react";
import { BottleModel } from "./bottle-model";

const store = createXRStore({
  hand: false,
  controller: false,
  // Passthrough AR : on n'affiche que la bouteille sur le monde réel.
  domOverlay: true,
});

/**
 * Vue « réalité augmentée » de la bouteille (WebXR `immersive-ar`).
 * Cible : Chrome Android (ARCore), navigateur Meta Quest, casques Android XR.
 * Chargé dynamiquement au clic ; entre en session immédiatement.
 *
 * PLACEHOLDER : modèle procédural — remplacer par `bottle.glb` (cf. bottle-model).
 */
export default function BottleAR({ onExit }: { onExit?: () => void }) {
  useEffect(() => {
    store.enterAR().catch(() => onExit?.());
    return store.subscribe((s) => {
      if (!s.session) onExit?.();
    });
  }, [onExit]);

  return (
    <Canvas
      className="fixed inset-0 z-[100]"
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 1.4, 0.6], fov: 50 }}
    >
      <XR store={store}>
        <ambientLight intensity={0.9} />
        <directionalLight position={[2, 4, 2]} intensity={1.4} />
        {/* ~24 cm de haut, posée ~40 cm devant, au niveau d'une table. */}
        <group position={[0, 0.9, -0.5]} scale={0.085}>
          <BottleModel autoRotate bob={false} transmissionBackground="#dfe9f5" />
        </group>
        <Environment resolution={64}>
          <Lightformer intensity={2} position={[0, 3, 2]} scale={[6, 6, 1]} color="#ffffff" />
        </Environment>
      </XR>
    </Canvas>
  );
}
