export const SHOWCASE_VISUAL = {
  background: "#050510",
  fog: "#0B0B1F",
  fogDensity: 0.055,
  accent: "#c084fc",
  accentCyan: "#67e8f9",
  accentGold: "#fbbf24",
  particleCount: 420,
  camera: {
    position: [0, 1.2, 10] as const,
    fov: 52,
  },
  parallax: {
    verticalRange: 2.4,
    depthRange: 1.8,
  },
} as const;

export const SHOWCASE_TRANSITION = {
  sectionDuration: 0.75,
  stagger: 0.08,
  ease: [0.22, 1, 0.36, 1] as const,
} as const;
