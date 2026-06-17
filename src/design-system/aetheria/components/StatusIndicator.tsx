"use client";

import { motion } from "framer-motion";

import { Label, TerminalText } from "@/design-system/aetheria/typography/AetheriaTypography";

export type StatusTone = "online" | "signal" | "warning" | "critical" | "idle";

interface StatusIndicatorProps {
  label: string;
  value: string;
  tone?: StatusTone;
  pulse?: boolean;
  compact?: boolean;
}

const toneStyles: Record<
  StatusTone,
  { dot: string; text: string; glow: string }
> = {
  online: {
    dot: "bg-[#34D399]",
    text: "text-[#34D399]",
    glow: "0 0 10px rgba(52, 211, 153, 0.75)",
  },
  signal: {
    dot: "bg-[#60A5FA]",
    text: "text-[#60A5FA]",
    glow: "0 0 10px rgba(96, 165, 250, 0.75)",
  },
  warning: {
    dot: "bg-[#FBBF24]",
    text: "text-[#FBBF24]",
    glow: "0 0 10px rgba(251, 191, 36, 0.65)",
  },
  critical: {
    dot: "bg-[#F87171]",
    text: "text-[#F87171]",
    glow: "0 0 10px rgba(248, 113, 113, 0.65)",
  },
  idle: {
    dot: "bg-[#A855F7]/60",
    text: "text-[#A855F7]/80",
    glow: "0 0 8px rgba(168, 85, 247, 0.4)",
  },
};

export function StatusIndicator({
  label,
  value,
  tone = "online",
  pulse = true,
  compact = false,
}: StatusIndicatorProps) {
  const styles = toneStyles[tone];

  return (
    <div
      className={`flex min-w-0 ${compact ? "flex-row items-center gap-2" : "flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-3"}`}
    >
      <Label as="span">{label}</Label>
      <span className="flex items-center gap-1.5">
        <motion.span
          aria-hidden
          className={`inline-block h-1.5 w-1.5 shrink-0 rounded-full ${styles.dot}`}
          style={{ boxShadow: styles.glow }}
          animate={
            pulse
              ? { opacity: [1, 0.35, 1], scale: [1, 0.88, 1] }
              : { opacity: 1 }
          }
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.span
          animate={{ opacity: [0.82, 1, 0.88, 1] }}
          transition={{ duration: 3.2, repeat: Infinity }}
        >
          <TerminalText
            as="span"
            className={`!max-w-none !text-[10px] uppercase sm:!text-[11px] ${styles.text}`}
          >
            {value}
          </TerminalText>
        </motion.span>
      </span>
    </div>
  );
}
