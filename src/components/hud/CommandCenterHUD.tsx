"use client";

import { motion } from "framer-motion";

import { NavigationBar } from "@/components/hud/NavigationBar";
import { OperatorPanel } from "@/components/hud/OperatorPanel";
import { ProjectsPanel } from "@/components/hud/ProjectsPanel";
import { TopStatusBar } from "@/components/hud/TopStatusBar";
import { useHudMetrics } from "@/hooks/useHudMetrics";
import { HUD_CONFIG } from "@/lib/hud.config";

interface CommandCenterHUDProps {
  visible?: boolean;
}

export function CommandCenterHUD({ visible = true }: CommandCenterHUDProps) {
  const metrics = useHudMetrics(visible);

  if (!visible) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="pointer-events-none fixed inset-0 z-40"
    >
      <TopStatusBar topBar={HUD_CONFIG.topBar} metrics={metrics} />

      <OperatorPanel operator={HUD_CONFIG.operator} />

      <ProjectsPanel
        projects={HUD_CONFIG.projects}
        className="absolute right-3 top-[5.5rem] hidden w-[280px] md:block md:top-1/2 md:right-6 md:-translate-y-1/2 lg:w-[300px]"
      />

      <ProjectsPanel
        projects={HUD_CONFIG.projects}
        compact
        className="absolute right-3 bottom-[5.5rem] w-[calc(100%-1.5rem)] max-w-[280px] md:hidden"
      />

      <NavigationBar navigation={HUD_CONFIG.navigation} />

      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[min(80vw,22rem)] w-[min(80vw,22rem)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet-500/10 sm:h-80 sm:w-80"
        animate={{ scale: [1, 1.025, 1], opacity: [0.12, 0.22, 0.12] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
}
