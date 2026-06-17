"use client";

import { AnimatePresence, motion } from "framer-motion";

import { Label, TerminalText } from "@/design-system/aetheria";
import { BootGlassFrame, easeOut } from "@/features/boot-sequence/components/BootGlassFrame";
import type { BootPhase } from "@/features/boot-sequence/types/boot.types";

interface BootTerminalProps {
  phase: BootPhase;
  brandTitle: string;
  initMessage: string;
  typedText: string;
}

export function BootTerminal({
  phase,
  brandTitle,
  initMessage,
  typedText,
}: BootTerminalProps) {
  const showTitle = phase !== "black";
  const showTyping =
    phase === "typing" ||
    phase === "checks" ||
    phase === "progress" ||
    phase === "welcome";

  return (
    <div className="space-y-4">
      <AnimatePresence>
        {showTitle && (
          <motion.div
            key="brand"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easeOut }}
            className="flex items-center gap-2"
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#A855F7]" />
            <Label>{brandTitle}</Label>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showTyping && (
          <motion.div
            key="terminal"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.35, ease: easeOut }}
          >
            <BootGlassFrame subtitle="Core Terminal · Boot Log">
              <TerminalText className="min-h-[1.6em] !max-w-none !text-sm sm:!text-base">
                {phase === "typing" ? typedText : initMessage}
                {phase === "typing" && (
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.75, repeat: Infinity }}
                    className="ml-0.5 text-[#60A5FA]"
                  >
                    ▌
                  </motion.span>
                )}
              </TerminalText>
            </BootGlassFrame>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
