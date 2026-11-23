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
    experience: "Python, LLM agents, and workflow automation",
    currentMission: "Local agents, asset tooling, and Quest interaction",
  },
  topBar: {
    systemStatus: "ONLINE",
    systemLabel: "ALL SYSTEMS NOMINAL",
  },
  projects: {
    heading: "ACTIVE PROJECTS",
    items: [
      { id: "document-rag", label: "Document Q&A", status: "active" },
      { id: "aethel", label: "AETHEL local agents", status: "dev" },
      { id: "aether-studio", label: "Aether Studio", status: "dev" },
    ],
  },
  navigation: {
    heading: "NAVIGATION",
    items: [
      { id: "portfolio", label: "PORTFOLIO", href: "/" },
      { id: "project-galaxy", label: "PROJECT GALAXY", href: "#project-galaxy" },
      { id: "neural-core", label: "NEURAL CORE", href: "#neural-core" },
      { id: "mission-log", label: "MISSION LOG", href: "#mission-log" },
      { id: "aetheria", label: "AETHERIA", href: "/aetheria" },
      { id: "transmission", label: "TRANSMISSION", href: "#transmission" },
    ],
  },
};
