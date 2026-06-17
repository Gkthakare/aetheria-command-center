export const STARTUP_CONFIG = {
  initMessage: "INITIALIZING AETHERIA CORE...",
  systemChecks: [
    { id: "neural-core", label: "Neural Core" },
    { id: "project-galaxy", label: "Project Galaxy" },
    { id: "mission-archive", label: "Mission Archive" },
    { id: "aetheria-systems", label: "Aetheria Systems" },
  ],
  welcome: {
    name: "GAURAV THAKARE",
    titles: ["AI ENGINEER", "WORLD BUILDER"] as const,
  },
  timing: {
    blackHoldMs: 600,
    typingCharMs: 42,
    typingPauseMs: 350,
    progressDurationMs: 1800,
    checkStaggerMs: 420,
    checkRevealMs: 280,
    welcomeHoldMs: 2200,
    fadeOutMs: 900,
  },
} as const;

export type StartupPhase =
  | "black"
  | "typing"
  | "progress"
  | "checks"
  | "welcome"
  | "fadeout"
  | "done";
