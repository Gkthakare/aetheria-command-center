"use client";

import { Suspense } from "react";

import { CameraDirector } from "@/camera/CameraDirector";
import { SHOWCASE_VISUAL } from "@/features/aetheria-showcase/config/showcase.config";
import { AncientRuins } from "@/features/aetheria-showcase/scenes/AncientRuins";
import { EnergyPortal } from "@/features/aetheria-showcase/scenes/EnergyPortal";
import { FloatingIslands } from "@/features/aetheria-showcase/scenes/FloatingIslands";
import { MagicalParticles } from "@/features/aetheria-showcase/scenes/MagicalParticles";

interface ShowcaseWorldSceneProps {
  scrollProgress?: number;
}

export function ShowcaseWorldScene({ scrollProgress = 0 }: ShowcaseWorldSceneProps) {
  return (
    <>
      <CameraDirector scene="showcase" />
      <color attach="background" args={[SHOWCASE_VISUAL.background]} />
      <fogExp2 attach="fog" args={[SHOWCASE_VISUAL.fog, SHOWCASE_VISUAL.fogDensity]} />
      <ambientLight intensity={0.12} />
      <directionalLight position={[5, 8, 3]} intensity={0.45} color="#c4b5fd" />
      <directionalLight position={[-4, 2, -2]} intensity={0.25} color="#38bdf8" />

      <Suspense fallback={null}>
        <FloatingIslands scrollProgress={scrollProgress} />
        <AncientRuins />
        <EnergyPortal scrollProgress={scrollProgress} />
        <MagicalParticles />
      </Suspense>
    </>
  );
}
