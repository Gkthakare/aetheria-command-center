"use client";

import { Html } from "@react-three/drei";
import { motion } from "framer-motion";

import { Label, Subheading } from "@/design-system/aetheria";
import { useGalaxyStore } from "@/features/project-galaxy/stores/galaxy.store";
import type { GalaxyProject } from "@/features/project-galaxy/types/project.types";

interface ProjectTooltipProps {
  project: GalaxyProject;
}

export function ProjectTooltip({ project }: ProjectTooltipProps) {
  const hoveredProjectId = useGalaxyStore((state) => state.hoveredProjectId);
  const selectedProjectId = useGalaxyStore((state) => state.selectedProjectId);

  const isVisible =
    hoveredProjectId === project.id && selectedProjectId !== project.id;

  if (!isVisible) {
    return null;
  }

  return (
    <Html
      center
      distanceFactor={9}
      style={{ pointerEvents: "none", userSelect: "none" }}
      zIndexRange={[40, 0]}
    >
      <motion.div
        initial={{ opacity: 0, y: 8, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.94 }}
        className="max-w-[11rem] rounded-md border border-[#6D28D9]/25 bg-[#050510]/85 px-3 py-2 backdrop-blur-sm"
      >
        <Label variant="signal" className="!text-[9px]">
          {project.shortLabel}
        </Label>
        <Subheading className="mt-1 !max-w-none !text-[11px] !leading-snug">
          {project.summary}
        </Subheading>
      </motion.div>
    </Html>
  );
}
