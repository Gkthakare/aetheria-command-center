"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

import { GALAXY_CONFIG } from "@/features/project-galaxy/config/galaxy.config";
import { ProjectTooltip } from "@/features/project-galaxy/components/ProjectTooltip";
import { usePlanetOrbit } from "@/features/project-galaxy/hooks/usePlanetOrbit";
import { planetPositionRegistry } from "@/features/project-galaxy/lib/planet-position-registry";
import { PlanetAtmosphere } from "@/features/project-galaxy/scenes/PlanetAtmosphere";
import { useGalaxyStore } from "@/features/project-galaxy/stores/galaxy.store";
import type { GalaxyProject } from "@/features/project-galaxy/types/project.types";

const PLANET_MATERIAL: Record<
  GalaxyProject["planetType"],
  Partial<THREE.MeshStandardMaterialParameters>
> = {
  ice: { roughness: 0.25, metalness: 0.35 },
  gas: { roughness: 0.55, metalness: 0.2 },
  rocky: { roughness: 0.82, metalness: 0.12 },
  tech: { roughness: 0.4, metalness: 0.72 },
  neon: { roughness: 0.18, metalness: 0.65 },
};

interface ProjectPlanetProps {
  project: GalaxyProject;
}

export function ProjectPlanet({ project }: ProjectPlanetProps) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const scaleRef = useRef(1);
  const worldPosition = useMemo(() => new THREE.Vector3(), []);

  const { advance } = usePlanetOrbit(project);

  const hoveredProjectId = useGalaxyStore((state) => state.hoveredProjectId);
  const selectedProjectId = useGalaxyStore((state) => state.selectedProjectId);
  const setHoveredProject = useGalaxyStore((state) => state.setHoveredProject);
  const setSelectedProject = useGalaxyStore((state) => state.setSelectedProject);

  const isHovered = hoveredProjectId === project.id;
  const isSelected = selectedProjectId === project.id;
  const isActive = isHovered || isSelected;

  const surfaceParams = PLANET_MATERIAL[project.planetType];

  useFrame((_, delta) => {
    const group = groupRef.current;
    const mesh = meshRef.current;
    if (!group || !mesh) {
      return;
    }

    const position = advance(delta);
    group.position.copy(position);
    group.getWorldPosition(worldPosition);
    planetPositionRegistry.set(project.id, worldPosition);

    mesh.rotation.y += delta * (0.35 + project.orbitSpeed * 0.5);

    const targetScale = isActive ? GALAXY_CONFIG.hover.scaleMultiplier : 1;
    scaleRef.current = THREE.MathUtils.lerp(
      scaleRef.current,
      targetScale,
      1 - Math.exp(-GALAXY_CONFIG.hover.scaleLerp * delta),
    );
    mesh.scale.setScalar(scaleRef.current);

    const material = mesh.material as THREE.MeshStandardMaterial;
    material.emissiveIntensity = THREE.MathUtils.lerp(
      material.emissiveIntensity,
      isActive ? GALAXY_CONFIG.hover.emissiveBoost : 1.15,
      1 - Math.exp(-8 * delta),
    );
  });

  return (
    <group ref={groupRef}>
      <pointLight
        color={project.emissive}
        intensity={GALAXY_CONFIG.lighting.planetLightIntensity}
        distance={GALAXY_CONFIG.lighting.planetLightDistance}
        decay={2}
      />

      <mesh
        ref={meshRef}
        renderOrder={8}
        onPointerOver={(event) => {
          event.stopPropagation();
          document.body.style.cursor = "pointer";
          setHoveredProject(project.id);
        }}
        onPointerOut={(event) => {
          event.stopPropagation();
          document.body.style.cursor = "default";
          if (useGalaxyStore.getState().hoveredProjectId === project.id) {
            setHoveredProject(null);
          }
        }}
        onClick={(event) => {
          event.stopPropagation();
          setSelectedProject(project.id);
        }}
      >
        <sphereGeometry args={[project.size, 28, 28]} />
        <meshStandardMaterial
          color={project.color}
          emissive={project.emissive}
          emissiveIntensity={1.15}
          toneMapped={false}
          {...surfaceParams}
        />
      </mesh>

      <PlanetAtmosphere
        radius={project.size}
        color={project.color}
        emissive={project.emissive}
        active={isActive}
      />

      <ProjectTooltip project={project} />
    </group>
  );
}
