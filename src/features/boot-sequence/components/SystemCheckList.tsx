"use client";

import { AnimatePresence, motion } from "framer-motion";

import { BodyText, Label, TerminalText } from "@/design-system/aetheria";
import { BootGlassFrame, easeOut } from "@/features/boot-sequence/components/BootGlassFrame";
import type {
  BootSystemCheck,
  SystemCheckStatus,
} from "@/features/boot-sequence/types/boot.types";

interface SystemCheckListProps {
  checks: readonly BootSystemCheck[];
  statuses: SystemCheckStatus[];
  visibleCount: number;
  activeIndex: number;
  visible: boolean;
}

function statusLabel(status: SystemCheckStatus): string {
  switch (status) {
    case "pending":
      return "WAIT";
    case "running":
      return "SYNC";
    case "online":
      return "ONLINE";
  }
}

function statusColor(status: SystemCheckStatus): string {
  switch (status) {
    case "pending":
      return "text-[#A855F7]/40";
    case "running":
      return "text-[#60A5FA]";
    case "online":
      return "text-[#34D399]";
  }
}

export function SystemCheckList({
  checks,
  statuses,
  visibleCount,
  activeIndex,
  visible,
}: SystemCheckListProps) {
  if (!visible) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: easeOut }}
    >
      <BootGlassFrame subtitle="System Diagnostics">
        <ul className="space-y-2">
          {checks.map((check, index) => {
            const isVisible = index < visibleCount || statuses[index] !== "pending";
            const status = statuses[index];
            const isActive = index === activeIndex;

            return (
              <AnimatePresence key={check.id}>
                {isVisible && (
                  <motion.li
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, ease: easeOut }}
                    className={`flex items-start gap-3 rounded-md border px-3 py-2 ${
                      isActive
                        ? "border-[#60A5FA]/25 bg-[#60A5FA]/5"
                        : "border-[#6D28D9]/10 bg-[#050510]/30"
                    }`}
                  >
                    <TerminalText
                      as="span"
                      variant="data"
                      className={`shrink-0 !max-w-none !text-[10px] uppercase ${statusColor(status)}`}
                    >
                      {statusLabel(status)}
                    </TerminalText>
                    <div className="min-w-0 flex-1">
                      <BodyText as="p" className="!max-w-none !text-sm">
                        {check.label}
                      </BodyText>
                      <Label className="mt-0.5 !text-[9px]">
                        {check.code} · {check.description}
                      </Label>
                    </div>
                  </motion.li>
                )}
              </AnimatePresence>
            );
          })}
        </ul>
      </BootGlassFrame>
    </motion.div>
  );
}
