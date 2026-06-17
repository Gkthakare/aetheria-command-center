"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

import { GALAXY_CONFIG } from "@/features/project-galaxy/config/galaxy.config";
import { useGalaxyStore } from "@/features/project-galaxy/stores/galaxy.store";
import type { GalaxyProject } from "@/features/project-galaxy/types/project.types";

interface ProjectOrbitRingProps {
  project: GalaxyProject;
}

export function ProjectOrbitRing({ project }: ProjectOrbitRingProps) {
  const ringRef = useRef<THREE.Mesh>(null);
  const hoveredProjectId = useGalaxyStore((state) => state.hoveredProjectId);
  const selectedProjectId = useGalaxyStore((state) => state.selectedProjectId);

  const isActive =
    hoveredProjectId === project.id || selectedProjectId === project.id;

  const rotation = useMemo(
    () =>
      new THREE.Euler(
        project.orbitInclination * 0.85,
        project.phase,
        project.orbitInclination * 0.4,
      ),
    [project.orbitInclination, project.phase],
  );

  useFrame(({ clock }, delta) => {
    const ring = ringRef.current;
    if (!ring) {
      return;
    }

    const material = ring.material as THREE.MeshBasicMaterial;
    const pulse =
      Math.sin(clock.elapsedTime * 2 + project.phase) *
      GALAXY_CONFIG.orbitRing.pulseAmplitude;

    const targetOpacity = isActive
      ? GALAXY_CONFIG.orbitRing.activeOpacity + pulse
      : GALAXY_CONFIG.orbitRing.idleOpacity + pulse * 0.25;

    material.opacity = THREE.MathUtils.lerp(
      material.opacity,
      targetOpacity,
      1 - Math.exp(-10 * delta),
    );

    const targetScale = isActive ? 1.015 : 1;
    ring.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      1 - Math.exp(-8 * delta),
    );
  });

  return (
    <mesh ref={ringRef} rotation={rotation} frustumCulled={false}>
      <ringGeometry
        args={[project.orbitRadius - 0.025, project.orbitRadius + 0.025, 128, 1]}
      />
      <meshBasicMaterial
        color={project.ringColor}
        transparent
        opacity={GALAXY_CONFIG.orbitRing.idleOpacity}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
