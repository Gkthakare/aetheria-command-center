"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, type ReactNode } from "react";
import * as THREE from "three";

import { useExperienceStore } from "@/stores/experience.store";
import type { QualityLevel } from "@/stores/experience.store";
import { BLACK_HOLE_CAMERA } from "@/lib/black-hole.config";

interface CanvasRootProps {
  children: ReactNode;
  className?: string;
}

function resolveDpr(qualityLevel: QualityLevel): number | [number, number] {
  switch (qualityLevel) {
    case "low":
      return 1;
    case "medium":
      return [1, 1.25];
    case "high":
      return [1, 1.5];
  }
}

export function CanvasRoot({ children, className }: CanvasRootProps) {
  const qualityLevel = useExperienceStore((state) => state.qualityLevel);

  return (
    <Canvas
      className={className}
      camera={{
        position: [...BLACK_HOLE_CAMERA.position],
        fov: BLACK_HOLE_CAMERA.fov,
        near: 0.1,
        far: 100,
      }}
      dpr={resolveDpr(qualityLevel)}
      frameloop="always"
      flat
      resize={{ scroll: false, debounce: { scroll: 0, resize: 0 } }}
      gl={{
        antialias: qualityLevel !== "low",
        powerPreference: "high-performance",
        alpha: false,
        stencil: false,
        depth: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.05,
      }}
      onCreated={({ camera }) => {
        camera.up.set(0, 1, 0);
        camera.lookAt(0, 0, 0);

        if (camera instanceof THREE.PerspectiveCamera) {
          camera.updateProjectionMatrix();
        }
      }}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        display: "block",
        margin: 0,
        padding: 0,
      }}
    >
      <Suspense fallback={null}>{children}</Suspense>
    </Canvas>
  );
}
