export type HudSystemState = "ONLINE" | "STABLE" | "ACTIVE" | "NOMINAL";

export interface HudOperator {
  name: string;
  role: string;
  experience: string;
  currentMission: string;
}

export interface HudProject {
  id: string;
  label: string;
  status: "active" | "standby" | "dev";
}

export interface HudNavItem {
  id: string;
  label: string;
  href: string;
}

export interface HudConfig {
  operator: HudOperator;
  topBar: {
    systemStatus: HudSystemState;
    systemLabel: string;
  };
  projects: {
    heading: string;
    items: readonly HudProject[];
  };
  navigation: {
    heading: string;
    items: readonly HudNavItem[];
  };
}

export const HUD_CONFIG: HudConfig = {
  operator: {
    name: "GAURAV THAKARE",
    role: "AI ENGINEER · WORLD BUILDER",
    experience: "5+ YEARS",
    currentMission: "Aetheria Command Center Deployment",
  },
  topBar: {
    systemStatus: "ONLINE",
    systemLabel: "ALL SYSTEMS NOMINAL",
  },
  projects: {
    heading: "ACTIVE PROJECTS",
    items: [
      { id: "ai-eng", label: "AI Engineering", status: "active" },
      { id: "aetheria-rpg", label: "Aetheria RPG", status: "dev" },
      { id: "agent-systems", label: "Agent Systems", status: "active" },
    ],
  },
  navigation: {
    heading: "NAVIGATION",
    items: [
      { id: "command-center", label: "COMMAND CENTER", href: "#command-center" },
      { id: "project-galaxy", label: "PROJECT GALAXY", href: "#project-galaxy" },
      { id: "neural-core", label: "NEURAL CORE", href: "#neural-core" },
      { id: "mission-log", label: "MISSION LOG", href: "#mission-log" },
      { id: "aetheria", label: "AETHERIA", href: "/aetheria" },
      { id: "transmission", label: "TRANSMISSION", href: "#transmission" },
    ],
  },
};
