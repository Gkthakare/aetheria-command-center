"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

import { AETHERIA_FONT } from "@/design-system/aetheria/typography/tokens";

type BadgeVariant = "primary" | "signal" | "neutral" | "outline";

interface SystemBadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  pulse?: boolean;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  primary: "border-[#6D28D9]/30 bg-[#6D28D9]/10 text-[#C4B5FD]",
  signal: "border-[#60A5FA]/28 bg-[#60A5FA]/8 text-[#93C5FD]",
  neutral: "border-[#A855F7]/18 bg-[#0B0B1F]/50 text-[#DDD6FE]/80",
  outline: "border-[#A855F7]/22 bg-transparent text-[#E9D5FF]/75",
};

export function SystemBadge({
  children,
  variant = "neutral",
  className = "",
}: SystemBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 ${AETHERIA_FONT.terminal} text-[9px] uppercase tracking-[0.18em] sm:text-[10px] ${variantStyles[variant]} ${className}`}
    >
      <span aria-hidden className="h-1 w-1 rounded-full bg-current opacity-70" />
      {children}
    </span>
  );
}
