import type { BootSequenceContent } from "@/features/boot-sequence/types/boot.types";

export const BOOT_SEQUENCE_CONTENT: BootSequenceContent = {
  brandTitle: "AETHERIA COMMAND CENTER",
  initMessage: "INITIALIZING AETHERIA CORE...",
  progressLabel: "CORE SYNCHRONIZATION",
  systemChecks: [
    {
      id: "neural-core",
      label: "Neural Core",
      code: "NC-01",
      description: "Cognitive matrix online",
    },
    {
      id: "project-galaxy",
      label: "Project Galaxy",
      code: "PG-07",
      description: "Portfolio star map loaded",
    },
    {
      id: "mission-archive",
      label: "Mission Archive",
      code: "MA-12",
      description: "Deployment history indexed",
    },
    {
      id: "aetheria-systems",
      label: "Aetheria Systems",
      code: "AS-00",
      description: "World engine synchronized",
    },
    {
      id: "security-grid",
      label: "Security Grid",
      code: "SG-44",
      description: "Perimeter shields active",
    },
    {
      id: "quantum-link",
      label: "Quantum Link",
      code: "QL-88",
      description: "Entanglement channel stable",
    },
    {
      id: "navigation-matrix",
      label: "Navigation Matrix",
      code: "NM-31",
      description: "Route lattice calibrated",
    },
  ],
  welcome: {
    name: "GAURAV THAKARE",
    titles: ["AI ENGINEER", "WORLD BUILDER"],
    subtitle: "AUTHENTICATION COMPLETE · CLEARANCE GRANTED",
  },
  timing: {
    blackHoldMs: 700,
    titleRevealMs: 900,
    titleHoldMs: 1100,
    typingCharMs: 38,
    typingPauseMs: 400,
    checkStaggerMs: 380,
    checkRunningMs: 260,
    checksCompletePauseMs: 450,
    progressDurationMs: 1600,
    progressCompletePauseMs: 350,
    welcomeHoldMs: 2400,
    fadeOutMs: 950,
  },
};
