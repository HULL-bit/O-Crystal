"use client";

import { EffectComposer, Bloom, ChromaticAberration, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";

/**
 * Post-processing léger : bloom (éclat de l'eau / god rays), aberration
 * chromatique très subtile, vignette. Monté uniquement sur appareil haut de gamme
 * (voir la porte `NEXT_PUBLIC_ENABLE_3D` + tier dans SceneCanvas).
 */
export function PostFX() {
  return (
    <EffectComposer multisampling={0}>
      <Bloom
        intensity={0.6}
        luminanceThreshold={0.7}
        luminanceSmoothing={0.3}
        mipmapBlur
      />
      <ChromaticAberration
        offset={new THREE.Vector2(0.0006, 0.0009)}
        radialModulation={false}
        modulationOffset={0}
      />
      <Vignette eskil={false} offset={0.2} darkness={0.55} />
    </EffectComposer>
  );
}
