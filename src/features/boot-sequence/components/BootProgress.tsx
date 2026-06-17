"use client";

import { motion } from "framer-motion";

import { Label, TerminalText } from "@/design-system/aetheria";
import { BootGlassFrame, easeOut } from "@/features/boot-sequence/components/BootGlassFrame";

interface BootProgressProps {
  progress: number;
  label: string;
  visible: boolean;
}

export function BootProgress({ progress, label, visible }: BootProgressProps) {
  if (!visible) {
    return null;
  }

  const percent = Math.round(progress * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: easeOut }}
    >
      <BootGlassFrame subtitle={label}>
        <div className="mb-3 flex items-end justify-between gap-4">
          <Label as="p" className="!normal-case !tracking-wide">
            Synchronizing quantum stack
          </Label>
          <TerminalText
            as="p"
            variant="data"
            className="!max-w-none !text-lg sm:!text-xl"
          >
            {percent.toString().padStart(3, "0")}%
          </TerminalText>
        </div>

        <div className="relative h-1 overflow-hidden rounded-full bg-[#0B0B1F]">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#6D28D9] to-[#60A5FA]"
            style={{ width: `${percent}%` }}
          />
        </div>

        {percent >= 100 && (
          <Label variant="signal" className="mt-3 block">
            Core synchronization complete
          </Label>
        )}
      </BootGlassFrame>
    </motion.div>
  );
}
