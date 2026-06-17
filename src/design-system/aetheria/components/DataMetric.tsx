"use client";

import { motion } from "framer-motion";

import { Label, TerminalText } from "@/design-system/aetheria/typography/AetheriaTypography";

interface DataMetricProps {
  label: string;
  value: string | number;
  unit?: string;
  trend?: "up" | "down" | "stable";
  accent?: "primary" | "signal";
}

const trendGlyph = {
  up: "▲",
  down: "▼",
  stable: "◆",
};

const trendColor = {
  up: "text-[#34D399]",
  down: "text-[#F87171]",
  stable: "text-[#A855F7]/60",
};

export function DataMetric({
  label,
  value,
  unit,
  trend,
  accent = "primary",
}: DataMetricProps) {
  const valueColor =
    accent === "signal" ? "text-[#60A5FA]" : "text-[#E9D5FF]";

  return (
    <div className="space-y-1.5">
      <Label as="p">{label}</Label>
      <div className="flex items-baseline gap-1.5">
        <motion.span
          className={`font-[family-name:var(--font-aetheria-terminal)] text-xl font-light tabular-nums tracking-wide sm:text-2xl ${valueColor}`}
          animate={{ opacity: [0.88, 1, 0.92, 1] }}
          transition={{ duration: 3.5, repeat: Infinity }}
        >
          {value}
        </motion.span>
        {unit && (
          <Label variant="signal" className="!text-[10px]">
            {unit}
          </Label>
        )}
        {trend && (
          <TerminalText
            as="span"
            variant="data"
            className={`!max-w-none !text-[9px] ${trendColor[trend]}`}
          >
            {trendGlyph[trend]}
          </TerminalText>
        )}
      </div>
      <div
        aria-hidden
        className="h-px w-full bg-gradient-to-r from-[#6D28D9]/50 via-[#60A5FA]/30 to-transparent"
      />
    </div>
  );
}
