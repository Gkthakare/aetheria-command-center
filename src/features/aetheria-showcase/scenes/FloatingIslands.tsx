"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

const ISLANDS = [
  { position: [-2.2, -0.4, -3], scale: 1.2, rotation: 0.2 },
  { position: [2.6, 0.2, -4.5], scale: 0.9, rotation: -0.3 },
  { position: [0.3, 0.8, -6], scale: 1.5, rotation: 0.1 },
] as const;

export function FloatingIslands({ scrollProgress = 0 }: { scrollProgress?: number }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const group = groupRef.current;
    if (!group) return;
    const t = clock.elapsedTime;
    group.children.forEach((child, index) => {
      child.position.y =
        ISLANDS[index].position[1] +
        Math.sin(t * 0.35 + index) * 0.12 -
        scrollProgress * 0.8;
    });
  });

  return (
    <group ref={groupRef}>
      {ISLANDS.map((island, index) => (
        <group
          key={`island-${index}`}
          position={[island.position[0], island.position[1], island.position[2]]}
          rotation={[0, island.rotation, 0]}
          scale={island.scale}
        >
          <mesh castShadow receiveShadow>
            <cylinderGeometry args={[1.4, 1.8, 0.7, 8]} />
            <meshStandardMaterial color="#1e1035" roughness={0.85} metalness={0.15} />
          </mesh>
          <mesh position={[0, 0.45, 0]}>
            <cylinderGeometry args={[1.5, 1.2, 0.25, 8]} />
            <meshStandardMaterial
              color="#4c1d95"
              emissive="#7c3aed"
              emissiveIntensity={0.35}
              roughness={0.6}
            />
          </mesh>
          <mesh position={[0, 0.65, 0]}>
            <sphereGeometry args={[0.35, 12, 12]} />
            <meshStandardMaterial
              color="#a855f7"
              emissive="#c084fc"
              emissiveIntensity={0.8}
              transparent
              opacity={0.85}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}
