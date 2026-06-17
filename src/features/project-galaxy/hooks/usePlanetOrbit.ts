import { useRef } from "react";
import * as THREE from "three";

import type { GalaxyProject } from "@/features/project-galaxy/types/project.types";

export function computeOrbitPosition(
  project: Pick<GalaxyProject, "orbitRadius" | "orbitInclination">,
  angle: number,
  target = new THREE.Vector3(),
) {
  const x = Math.cos(angle) * project.orbitRadius;
  const z = Math.sin(angle) * project.orbitRadius;
  const y = Math.sin(angle * 0.65) * project.orbitInclination;
  return target.set(x, y, z);
}

export function usePlanetOrbit(project: GalaxyProject) {
  const angleRef = useRef(project.phase);
  const positionRef = useRef(new THREE.Vector3());

  const advance = (delta: number) => {
    angleRef.current += project.orbitSpeed * delta;
    return computeOrbitPosition(project, angleRef.current, positionRef.current);
  };

  return { angleRef, positionRef, advance };
}
