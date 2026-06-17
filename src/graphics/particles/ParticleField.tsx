"use client";

import { BLACK_HOLE_PARTICLE_LAYERS } from "@/lib/black-hole.config";

import { ParticleOrbitLayer } from "./ParticleOrbitLayer";

interface ParticleFieldProps {
  orbitSpeed?: number;
}

export function ParticleField({ orbitSpeed = 1 }: ParticleFieldProps) {
  return (
    <>
      {BLACK_HOLE_PARTICLE_LAYERS.map((layer) => (
        <ParticleOrbitLayer
          key={layer.id}
          config={layer}
          orbitSpeed={orbitSpeed}
        />
      ))}
    </>
  );
}
