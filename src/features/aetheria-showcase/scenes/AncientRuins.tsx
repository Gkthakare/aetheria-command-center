"use client";

import { useMemo } from "react";
import * as THREE from "three";

const RUIN_POSITIONS = [
  { position: [-4, -1.2, -2], rotation: 0.3, height: 2.2 },
  { position: [4.5, -1, -3], rotation: -0.5, height: 1.8 },
  { position: [-1, -1.4, -5], rotation: 0.8, height: 2.6 },
  { position: [3, -1.3, -6], rotation: -0.2, height: 2.0 },
] as const;

export function AncientRuins() {
  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#2d1b4e",
        roughness: 0.92,
        metalness: 0.08,
      }),
    [],
  );

  return (
    <group>
      {RUIN_POSITIONS.map((ruin, index) => (
        <group
          key={`ruin-${index}`}
          position={[ruin.position[0], ruin.position[1], ruin.position[2]]}
          rotation={[0, ruin.rotation, 0]}
        >
          <mesh material={material} position={[0, ruin.height * 0.5, 0]}>
            <boxGeometry args={[0.5, ruin.height, 0.5]} />
          </mesh>
          <mesh material={material} position={[0.35, ruin.height * 0.25, 0.2]} rotation={[0, 0, 0.4]}>
            <boxGeometry args={[0.35, ruin.height * 0.5, 0.35]} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
