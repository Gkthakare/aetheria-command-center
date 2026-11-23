"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import { BodyText, ChromeSurface, SystemBadge } from "@/design-system/aetheria";
import type { HudConfig } from "@/lib/hud.config";

interface ProjectsPanelProps {
  projects: HudConfig["projects"];
  className?: string;
  compact?: boolean;
}

const statusVariant = {
  active: "primary" as const,
  dev: "signal" as const,
  standby: "neutral" as const,
};

const statusLabel = {
  active: "Active",
  dev: "In Dev",
  standby: "Standby",
} as const;

export function ProjectsPanel({
  projects,
  className = "",
  compact = false,
}: ProjectsPanelProps) {
  return (
    <aside className={className}>
      <ChromeSurface
        compact={compact}
        subtitle={projects.heading}
        title="Portfolio"
      >
        <ul className="space-y-2">
          {projects.items.map((project, index) => (
            <motion.li
              key={project.id}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 + index * 0.06, duration: 0.35 }}
              className="flex items-center justify-between gap-2 rounded-md border border-[#6D28D9]/12 bg-[#050510]/30 px-3 py-2"
            >
              <Link className="pointer-events-auto hover:underline focus-visible:underline" href={`/projects/${project.id}`}>
                <BodyText as="span" className="!max-w-none !text-sm">
                  {project.label}
                </BodyText>
              </Link>
              <SystemBadge variant={statusVariant[project.status]}>
                {statusLabel[project.status]}
              </SystemBadge>
            </motion.li>
          ))}
        </ul>
      </ChromeSurface>
    </aside>
  );
}
