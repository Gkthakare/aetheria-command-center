"use client";

import { GALAXY_PROJECTS } from "@/features/project-galaxy/data/projects";
import { ProjectOrbitRing } from "@/features/project-galaxy/components/ProjectOrbitRing";
import { ProjectPlanet } from "@/features/project-galaxy/components/ProjectPlanet";

export function ProjectGalaxyScene() {
  return (
    <group>
      {GALAXY_PROJECTS.map((project) => (
        <group key={project.id}>
          <ProjectOrbitRing project={project} />
          <ProjectPlanet project={project} />
        </group>
      ))}
    </group>
  );
}
