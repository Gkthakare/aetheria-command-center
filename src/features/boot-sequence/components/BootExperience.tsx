"use client";

import { AnimatePresence, motion } from "framer-motion";
import { lazy, Suspense, useCallback, useState } from "react";

import { CommandCenterHUD } from "@/components/hud/CommandCenterHUD";
import { BootSequence } from "@/features/boot-sequence/components/BootSequence";
import { ProjectGalaxyOverlay } from "@/features/project-galaxy/components/ProjectGalaxyOverlay";

const BlackHoleCanvas = lazy(() =>
  import("@/features/black-hole/components/BlackHoleCanvas").then((module) => ({
    default: module.BlackHoleCanvas,
  })),
);

export function BootExperience() {
  const [bootComplete, setBootComplete] = useState(false);

  const handleBootComplete = useCallback(() => {
    setBootComplete(true);
  }, []);

  return (
    <>
      <motion.div
        className="fixed inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: bootComplete ? 1 : 0 }}
        transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
      >
        <Suspense fallback={null}>
          <BlackHoleCanvas />
        </Suspense>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(5,2,16,0.55)_100%)]"
        />
      </motion.div>

      <CommandCenterHUD visible={bootComplete} />
      <ProjectGalaxyOverlay />

      <AnimatePresence>
        {!bootComplete && (
          <BootSequence key="aetheria-boot" onComplete={handleBootComplete} />
        )}
      </AnimatePresence>
    </>
  );
}
