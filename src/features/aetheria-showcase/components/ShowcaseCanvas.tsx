"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";

import { SHOWCASE_VISUAL } from "@/features/aetheria-showcase/config/showcase.config";
import { ShowcaseWorldScene } from "@/features/aetheria-showcase/scenes/ShowcaseWorldScene";

interface ShowcaseCanvasProps {
  scrollProgress?: number;
}

export function ShowcaseCanvas({ scrollProgress = 0 }: ShowcaseCanvasProps) {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <Canvas
        camera={{
          position: [...SHOWCASE_VISUAL.camera.position],
          fov: SHOWCASE_VISUAL.camera.fov,
          near: 0.1,
          far: 80,
        }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          alpha: false,
        }}
        style={{ width: "100%", height: "100%" }}
      >
        <Suspense fallback={null}>
          <ShowcaseWorldScene scrollProgress={scrollProgress} />
        </Suspense>
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-[#050510]/15 via-transparent to-[#050510]/60" />
    </div>
  );
}
