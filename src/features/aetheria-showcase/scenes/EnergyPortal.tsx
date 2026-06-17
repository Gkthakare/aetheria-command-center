"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const PORTALS = [
  { position: [-3, 0.5, -4] as const, color: "#c084fc" },
  { position: [3.5, 0.3, -5.5] as const, color: "#67e8f9" },
] as const;

export function EnergyPortal({ scrollProgress = 0 }: { scrollProgress?: number }) {
  const groupRef = useRef<THREE.Group>(null);

  const ringMaterial = useMemo(
    () =>
      PORTALS.map(
        (portal) =>
          new THREE.MeshBasicMaterial({
            color: portal.color,
            transparent: true,
            opacity: 0.55,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
          }),
      ),
    [],
  );

  useFrame(({ clock }) => {
    const group = groupRef.current;
    if (!group) return;
    group.children.forEach((child, index) => {
      child.rotation.z = clock.elapsedTime * (0.4 + index * 0.15);
      child.scale.setScalar(1 + scrollProgress * 0.15 + Math.sin(clock.elapsedTime * 2 + index) * 0.05);
    });
  });

  return (
    <group ref={groupRef}>
      {PORTALS.map((portal, index) => (
        <group key={`portal-${index}`} position={[...portal.position]}>
          <mesh material={ringMaterial[index]}>
            <torusGeometry args={[0.75, 0.06, 16, 64]} />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <circleGeometry args={[0.55, 32]} />
            <meshBasicMaterial
              color={portal.color}
              transparent
              opacity={0.12}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
              side={THREE.DoubleSide}
            />
          </mesh>
          <pointLight color={portal.color} intensity={1.2} distance={6} decay={2} />
        </group>
      ))}
    </group>
  );
}
