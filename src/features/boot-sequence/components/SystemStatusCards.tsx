"use client";

import { motion } from "framer-motion";

import { HudCard, Label, TerminalText } from "@/design-system/aetheria";
import { easeOut } from "@/features/boot-sequence/components/BootGlassFrame";
import type {
  BootSystemCheck,
  SystemCheckStatus,
} from "@/features/boot-sequence/types/boot.types";

interface SystemStatusCardsProps {
  checks: readonly BootSystemCheck[];
  statuses: SystemCheckStatus[];
  visible: boolean;
}

function statusTone(status: SystemCheckStatus): string {
  switch (status) {
    case "online":
      return "text-[#34D399]";
    case "running":
      return "text-[#60A5FA]";
    case "pending":
      return "text-[#A855F7]/40";
  }
}

export function SystemStatusCards({
  checks,
  statuses,
  visible,
}: SystemStatusCardsProps) {
  if (!visible) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: easeOut }}
      className="hidden lg:grid lg:grid-cols-2 lg:gap-2 xl:grid-cols-3"
    >
      {checks.map((check, index) => {
        const status = statuses[index];

        return (
          <HudCard
            key={check.id}
            accent={status === "running" ? "signal" : "primary"}
            className={status === "pending" ? "opacity-40" : ""}
          >
            <Label className="!text-[9px]">{check.code}</Label>
            <TerminalText as="p" className="mt-1 !max-w-none !text-xs">
              {check.label}
            </TerminalText>
            <p
              className={`mt-2 font-[family-name:var(--font-aetheria-terminal)] text-[10px] uppercase tracking-widest ${statusTone(status)}`}
            >
              {status === "online"
                ? "Online"
                : status === "running"
                  ? "Syncing"
                  : "Standby"}
            </p>
          </HudCard>
        );
      })}
    </motion.div>
  );
}
