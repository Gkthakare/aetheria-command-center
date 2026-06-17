"use client";

import { motion } from "framer-motion";

interface ScanlineOverlayProps {
  intensity?: "subtle" | "medium";
  animated?: boolean;
  className?: string;
}

export function ScanlineOverlay({
  intensity = "subtle",
  animated = true,
  className = "",
}: ScanlineOverlayProps) {
  const opacity = intensity === "subtle" ? 0.06 : 0.1;

  return (
    <>
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 ${className}`}
        style={{
          opacity,
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(168, 85, 247, 0.55) 2px, rgba(168, 85, 247, 0.55) 3px)",
        }}
      />
      {animated && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#60A5FA]/70 to-transparent"
          animate={{ x: ["-120%", "120%"] }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        />
      )}
    </>
  );
}

export function NoiseOverlay({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 opacity-[0.035] mix-blend-overlay ${className}`}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: "128px 128px",
      }}
    />
  );
}

export function GridOverlay({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 opacity-[0.04] ${className}`}
      style={{
        backgroundImage: `
          linear-gradient(rgba(96, 165, 250, 0.35) 1px, transparent 1px),
          linear-gradient(90deg, rgba(96, 165, 250, 0.35) 1px, transparent 1px)
        `,
        backgroundSize: "48px 48px",
      }}
    />
  );
}

export function HolographicFlicker({ className = "" }: { className?: string }) {
  return (
    <motion.div
      aria-hidden
      className={`pointer-events-none absolute inset-0 bg-[#A855F7] ${className}`}
      animate={{ opacity: [0, 0.025, 0, 0.015, 0] }}
      transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}
    />
  );
}
