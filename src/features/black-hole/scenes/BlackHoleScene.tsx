"use client";

import { useMemo } from "react";

import { AccretionDisk } from "@/features/black-hole/components/AccretionDisk";
import { EventHorizon } from "@/features/black-hole/components/EventHorizon";
import { CameraDirector } from "@/camera/CameraDirector";
import { PostProcessingStackLoader } from "@/canvas/core/PostProcessingStackLoader";
import { NebulaCloud } from "@/graphics/particles/NebulaCloud";
import { ParticleField } from "@/graphics/particles/ParticleField";
import { StarfieldLayers } from "@/graphics/particles/Starfield";
import { ProjectGalaxyScene } from "@/features/project-galaxy/scenes/ProjectGalaxyScene";
import {
  BLACK_HOLE_COLORS,
  BLACK_HOLE_SCENE,
} from "@/lib/black-hole.config";
import { useExperienceStore } from "@/stores/experience.store";

export function BlackHoleScene() {
  const mouseX = useExperienceStore((state) => state.mouseX);
  const mouseY = useExperienceStore((state) => state.mouseY);

  const orbitSpeed = useMemo(() => {
    const pointerInfluence = Math.min(Math.hypot(mouseX, mouseY), 1);
    const verticalInfluence = (mouseY + 1) * 0.5;

    return 0.55 + pointerInfluence * 0.35 + verticalInfluence * 0.12;
  }, [mouseX, mouseY]);

  const diskRotationSpeed = useMemo(
    () => 0.7 + orbitSpeed * 0.18,
    [orbitSpeed],
  );

  return (
    <>
      <color attach="background" args={[BLACK_HOLE_COLORS.background]} />
      <fogExp2
        attach="fog"
        args={[BLACK_HOLE_COLORS.fog, BLACK_HOLE_SCENE.fogDensity]}
      />

      <CameraDirector scene="command-center" />
      <ambientLight intensity={BLACK_HOLE_SCENE.ambientIntensity} />
      <pointLight
        position={[4, 3, 5]}
        intensity={0.35 * BLACK_HOLE_SCENE.singularityLightScale}
        color="#c084fc"
      />
      <pointLight
        position={[-4, -2, 3]}
        intensity={0.2 * BLACK_HOLE_SCENE.singularityLightScale}
        color="#38bdf8"
      />

      <group position={[0, 0, 0]}>
        <NebulaCloud />
        <StarfieldLayers />
        <ParticleField orbitSpeed={orbitSpeed} />
        <AccretionDisk rotationSpeed={diskRotationSpeed} />
        <EventHorizon />
        <ProjectGalaxyScene />
      </group>

      <PostProcessingStackLoader />
    </>
  );
}
