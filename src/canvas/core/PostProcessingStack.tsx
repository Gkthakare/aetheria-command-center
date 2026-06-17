"use client";

import {
  Bloom,
  ChromaticAberration,
  DepthOfField,
  EffectComposer,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { useMemo } from "react";
import * as THREE from "three";

import { useExperienceStore } from "@/stores/experience.store";
import {
  BLACK_HOLE_BLOOM,
  BLACK_HOLE_CHROMATIC,
  BLACK_HOLE_DEPTH_OF_FIELD,
} from "@/lib/black-hole.config";

export function PostProcessingStack() {
  const qualityLevel = useExperienceStore((state) => state.qualityLevel);

  const chromaticOffset = useMemo(() => {
    const scale = qualityLevel === "medium" ? 0.65 : 1;
    return new THREE.Vector2(
      BLACK_HOLE_CHROMATIC.offset[0] * scale,
      BLACK_HOLE_CHROMATIC.offset[1] * scale,
    );
  }, [qualityLevel]);

  const dofTarget = useMemo(
    () =>
      new THREE.Vector3(
        BLACK_HOLE_DEPTH_OF_FIELD.target[0],
        BLACK_HOLE_DEPTH_OF_FIELD.target[1],
        BLACK_HOLE_DEPTH_OF_FIELD.target[2],
      ),
    [],
  );

  if (qualityLevel === "low") {
    return null;
  }

  const bloomIntensity =
    qualityLevel === "medium"
      ? BLACK_HOLE_BLOOM.intensity * 0.7
      : BLACK_HOLE_BLOOM.intensity;

  const dofScale = qualityLevel === "medium" ? 0.75 : 1;

  return (
    <EffectComposer multisampling={qualityLevel === "high" ? 4 : 0}>
      <DepthOfField
        target={dofTarget}
        focalLength={BLACK_HOLE_DEPTH_OF_FIELD.focalLength}
        bokehScale={BLACK_HOLE_DEPTH_OF_FIELD.bokehScale * dofScale}
        focusRange={BLACK_HOLE_DEPTH_OF_FIELD.focusRange}
        worldFocusRange={BLACK_HOLE_DEPTH_OF_FIELD.worldFocusRange}
      />
      <Bloom
        intensity={bloomIntensity}
        luminanceThreshold={BLACK_HOLE_BLOOM.luminanceThreshold}
        luminanceSmoothing={BLACK_HOLE_BLOOM.luminanceSmoothing}
        mipmapBlur={BLACK_HOLE_BLOOM.mipmapBlur}
      />
      <ChromaticAberration
        blendFunction={BlendFunction.NORMAL}
        offset={chromaticOffset}
        radialModulation
        modulationOffset={BLACK_HOLE_CHROMATIC.modulationOffset}
      />
    </EffectComposer>
  );
}
