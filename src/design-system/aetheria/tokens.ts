export const AETHERIA_COLORS = {
  void: "#050510",
  surface: "#0B0B1F",
  primary: "#6D28D9",
  accent: "#A855F7",
  signal: "#60A5FA",
  success: "#34D399",
  warning: "#FBBF24",
  danger: "#F87171",
} as const;

/** Glow intensities reduced ~40% from prior values. */
export const AETHERIA_GLOW = {
  primary: "0 0 14px rgba(109, 40, 217, 0.21), 0 0 29px rgba(168, 85, 247, 0.07)",
  accent: "0 0 12px rgba(168, 85, 247, 0.24)",
  signal: "0 0 10px rgba(96, 165, 250, 0.27)",
  panel: "0 0 19px rgba(109, 40, 217, 0.11), inset 0 1px 0 rgba(168, 85, 247, 0.05)",
  panelHover:
    "0 0 24px rgba(109, 40, 217, 0.17), 0 0 38px rgba(96, 165, 250, 0.05), inset 0 1px 0 rgba(168, 85, 247, 0.08)",
  chrome: "none",
} as const;

export const AETHERIA_MOTION = {
  ease: [0.22, 1, 0.36, 1] as const,
  duration: 0.55,
  stagger: 0.06,
} as const;

export const AETHERIA_LAYOUT = {
  topBarHeight: "3rem",
  bottomBarHeight: "2.5rem",
  leftRailWidth: "10.5rem",
  rightRailWidth: "12.5rem",
} as const;

/** Spacing scale — hierarchy through rhythm, not decoration. */
export const AETHERIA_SPACE = {
  xs: "0.375rem",
  sm: "0.625rem",
  md: "1rem",
  lg: "1.5rem",
  xl: "2rem",
  "2xl": "2.75rem",
  "3xl": "4rem",
  section: "5rem",
  hero: "6rem",
} as const;

export type SurfaceTier = "chrome" | "content" | "hero";

export const AETHERIA_SURFACE = {
  chrome: {
    background: "bg-[#050510]/35",
    border: "border border-[#A855F7]/12",
    blur: "backdrop-blur-sm",
    radius: "rounded-lg",
    padding: "p-3 sm:p-4",
    paddingCompact: "p-2.5 sm:p-3",
    shadow: AETHERIA_GLOW.chrome,
  },
  content: {
    background: "bg-[#0B0B1F]/42",
    border: "border border-[#6D28D9]/18",
    blur: "backdrop-blur-md",
    radius: "rounded-xl",
    padding: "p-6 sm:p-8 md:p-10",
    paddingCompact: "p-4 sm:p-5",
    shadow: AETHERIA_GLOW.panel,
  },
  hero: {
    background: "bg-transparent",
    border: "border-0",
    blur: "",
    radius: "rounded-none",
    padding: "p-0",
    paddingCompact: "p-0",
    shadow: AETHERIA_GLOW.chrome,
  },
} as const;
