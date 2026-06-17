"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useState } from "react";

import { CommandCenterHUD } from "@/components/hud/CommandCenterHUD";
import { BlackHoleCanvas } from "@/features/black-hole/components/BlackHoleCanvas";

import { StartupSequence } from "./StartupSequence";

export function StartupExperience() {
  const [bootComplete, setBootComplete] = useState(false);

  const handleComplete = useCallback(() => {
    setBootComplete(true);
  }, []);

  return (
    <>
      <motion.div
        className="fixed inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: bootComplete ? 1 : 0 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <BlackHoleCanvas />
      </motion.div>

      <CommandCenterHUD visible={bootComplete} />

      <AnimatePresence>
        {!bootComplete && (
          <StartupSequence key="startup" onComplete={handleComplete} />
        )}
      </AnimatePresence>
    </>
  );
}
