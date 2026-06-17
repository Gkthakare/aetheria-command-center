"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export const hudEase = [0.22, 1, 0.36, 1] as const;

export type PanelSlideFrom = "top" | "bottom" | "left" | "right";

interface HolographicPanelProps {
  title?: string;
  children: ReactNode;
  className?: string;
  delay?: number;
  compact?: boolean;
  slideFrom?: PanelSlideFrom;
}

const slideOffset: Record<PanelSlideFrom, { x?: number; y?: number }> = {
  top: { y: -24 },
  bottom: { y: 24 },
  left: { x: -28 },
  right: { x: 28 },
};

export function HolographicPanel({
  title,
  children,
  className = "",
  delay = 0,
  compact = false,
  slideFrom = "bottom",
}: HolographicPanelProps) {
  const offset = slideOffset[slideFrom];

  return (
    <motion.div
      initial={{ opacity: 0, ...offset }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.7, delay, ease: hudEase }}
      className={`relative ${className}`}
    >
      <div className="pointer-events-auto relative overflow-hidden rounded-lg">
        <motion.div
          aria-hidden
          className="absolute -inset-px rounded-lg opacity-60"
          style={{
            background:
              "conic-gradient(from 0deg, transparent, rgba(139,92,246,0.9), transparent, rgba(56,189,248,0.55), transparent)",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        />

        <motion.div
          className={`relative overflow-hidden rounded-lg border border-violet-500/30 bg-black/40 shadow-[0_0_32px_rgba(124,58,237,0.18)] backdrop-blur-xl ${
            compact ? "p-3" : "p-4 sm:p-5"
          }`}
          animate={{
            boxShadow: [
              "0 0 24px rgba(124,58,237,0.12)",
              "0 0 36px rgba(139,92,246,0.22)",
              "0 0 24px rgba(124,58,237,0.12)",
            ],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(167,139,250,0.45) 2px, rgba(167,139,250,0.45) 3px)",
            }}
          />

          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-300/70 to-transparent"
            animate={{ x: ["-120%", "120%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />

          <motion.span
            aria-hidden
            className="pointer-events-none absolute left-0 top-0 h-4 w-4 border-l-2 border-t-2 border-violet-400"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          />
          <motion.span
            aria-hidden
            className="pointer-events-none absolute right-0 top-0 h-4 w-4 border-r-2 border-t-2 border-violet-400"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 0.4 }}
          />
          <span className="absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-cyan-400/70" />
          <span className="absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-cyan-400/70" />

          {title && (
            <p className="mb-3 font-mono text-[10px] tracking-[0.35em] text-violet-400/75 sm:text-xs">
              {title}
            </p>
          )}

          <div className="relative z-10">{children}</div>
        </motion.div>
      </div>
    </motion.div>
  );
}

interface HudDataRowProps {
  label: string;
  value: string;
  flicker?: boolean;
}

export function HudDataRow({ label, value, flicker = false }: HudDataRowProps) {
  return (
    <div className="space-y-0.5">
      <p className="font-mono text-[9px] tracking-[0.25em] text-violet-500/60 sm:text-[10px]">
        {label}
      </p>
      <motion.p
        className="font-mono text-xs tracking-wide text-violet-100/90 sm:text-sm"
        animate={
          flicker
            ? { opacity: [0.88, 1, 0.92, 1] }
            : { opacity: 1 }
        }
        transition={
          flicker
            ? { duration: 2.8, repeat: Infinity, ease: "easeInOut" }
            : undefined
        }
      >
        {value}
      </motion.p>
    </div>
  );
}

interface HudStatusDotProps {
  label: string;
  value: string;
  tone?: "success" | "info" | "warning";
  pulse?: boolean;
}

const toneStyles = {
  success: {
    dot: "bg-emerald-400",
    text: "text-emerald-400/90",
    glow: "0 0 10px rgba(52,211,153,0.75)",
  },
  info: {
    dot: "bg-cyan-400",
    text: "text-cyan-400/90",
    glow: "0 0 10px rgba(34,211,238,0.65)",
  },
  warning: {
    dot: "bg-amber-400",
    text: "text-amber-400/90",
    glow: "0 0 10px rgba(251,191,36,0.65)",
  },
};

export function HudStatusDot({
  label,
  value,
  tone = "success",
  pulse = true,
}: HudStatusDotProps) {
  const styles = toneStyles[tone];

  return (
    <div className="flex min-w-0 flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
      <span className="font-mono text-[9px] tracking-[0.2em] text-violet-400/60 sm:text-[10px]">
        {label}
      </span>
      <span className="flex items-center gap-1.5">
        <motion.span
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
          className={`font-mono text-[10px] tracking-widest sm:text-xs ${styles.text}`}
          animate={{ opacity: [0.85, 1, 0.9, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          {value}
        </motion.span>
      </span>
    </div>
  );
}
