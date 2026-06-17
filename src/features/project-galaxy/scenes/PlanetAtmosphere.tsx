"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

import { GALAXY_CONFIG } from "@/features/project-galaxy/config/galaxy.config";

interface PlanetAtmosphereProps {
  radius: number;
  color: string;
  emissive: string;
  active: boolean;
}

export function PlanetAtmosphere({
  radius,
  color,
  emissive,
  active,
}: PlanetAtmosphereProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const scaleTarget = useRef(1);

  useFrame(({ clock }, delta) => {
    const mesh = meshRef.current;
    if (!mesh) {
      return;
    }

    const pulse =
      1 +
      Math.sin(clock.elapsedTime * GALAXY_CONFIG.atmosphere.pulseSpeed) * 0.04;
    scaleTarget.current = active
      ? GALAXY_CONFIG.atmosphere.scaleMultiplier * pulse
      : GALAXY_CONFIG.atmosphere.scaleMultiplier * 0.92;

    mesh.scale.lerp(
      new THREE.Vector3(
        scaleTarget.current,
        scaleTarget.current,
        scaleTarget.current,
      ),
      1 - Math.exp(-4 * delta),
    );

    const material = mesh.material as THREE.MeshBasicMaterial;
    material.opacity = THREE.MathUtils.lerp(
      material.opacity,
      active
        ? GALAXY_CONFIG.atmosphere.opacity * 1.35
        : GALAXY_CONFIG.atmosphere.opacity,
      1 - Math.exp(-6 * delta),
    );
  });

  return (
    <mesh ref={meshRef} scale={GALAXY_CONFIG.atmosphere.scaleMultiplier}>
      <sphereGeometry args={[radius, 24, 24]} />
      <meshBasicMaterial
        color={emissive}
        transparent
        opacity={GALAXY_CONFIG.atmosphere.opacity}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        side={THREE.BackSide}
      />
    </mesh>
  );
}
