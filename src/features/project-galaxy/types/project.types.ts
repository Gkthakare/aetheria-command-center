export type ProjectStatus = "live" | "local" | "quest-build" | "cli-only";

export interface GalaxyProject {
  id: string;
  name: string;
  shortLabel: string;
  /** One-line summary for tooltip / panel lead */
  summary: string;
  description: string;
  architecture: string;
  techStack: readonly string[];
  githubUrl: string;
  liveDemoUrl?: string;
  /** How to run locally when no hosted demo exists */
  runLocally?: readonly string[];
  status: ProjectStatus;
  orbitRadius: number;
  orbitSpeed: number;
  orbitInclination: number;
  phase: number;
  size: number;
  color: string;
  emissive: string;
  ringColor: string;
  /** Visual variant for procedural surface detail */
  planetType: "ice" | "gas" | "rocky" | "tech" | "neon";
}

export interface PlanetWorldPosition {
  x: number;
  y: number;
  z: number;
}

export type GalaxyProjectId = GalaxyProject["id"];
