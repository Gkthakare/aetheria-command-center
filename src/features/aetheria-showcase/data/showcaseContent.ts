import type { ShowcaseContent } from "@/features/aetheria-showcase/types/showcase.types";

export const SHOWCASE_CONTENT: ShowcaseContent = {
  hero: {
    title: "AETHERIA",
    subtitle: "ORIGIN REVEALED",
    tagline:
      "A next-generation sci-fantasy RPG where ancient ruins, quantum magic, and VR presence collide across a shattered stellar empire.",
  },
  sections: [
    {
      id: "vision",
      eyebrow: "01 · VISION",
      title: "A Living Universe Worth Exploring",
      lead: "Built as a persistent world simulation, not a menu of missions.",
      body:
        "Aetheria is designed as a cinematic universe-first RPG. Every region, faction, and relic connects to a larger mystery — the collapse of the Aether Gate network and the rebirth of civilizations among the stars.",
      highlights: [
        "Cinematic narrative arcs",
        "Player-driven faction allegiance",
        "Emergent world events",
      ],
      align: "left",
    },
    {
      id: "world-lore",
      eyebrow: "02 · WORLD LORE",
      title: "The Shattered Aether Gate",
      lead: "When the gates fell, gravity, memory, and magic fractured together.",
      body:
        "Floating archipelagos drift above a violet nebula sea. Ruins of the First Architects still hum with unstable quantum energy. Players uncover codex fragments that rewrite history in real time.",
      highlights: [
        "Archipelago world structure",
        "Codex-driven lore unlocks",
        "Dynamic faction history",
      ],
      align: "center",
    },
    {
      id: "combat",
      eyebrow: "03 · COMBAT",
      title: "Tactical Flow Combat",
      lead: "Readable, high-impact encounters with build-defining synergies.",
      body:
        "Combat blends third-person action readability with ability weaving, elemental resonance, and squad coordination. Enemy factions adapt to player tactics across repeated encounters.",
      highlights: [
        "Elemental resonance system",
        "Boss phase choreography",
        "Co-op tactical roles",
      ],
      align: "left",
    },
    {
      id: "progression",
      eyebrow: "04 · CHARACTER PROGRESSION",
      title: "Path of the Ascendant",
      lead: "Your build is a constellation, not a skill tree checkbox.",
      body:
        "Progression follows three axes — Arcane, Kinetic, and Neural — allowing hybrid ascension paths. Gear, relics, and neural implants reshape abilities instead of simply increasing numbers.",
      highlights: [
        "Tri-axis ascension paths",
        "Relic mutation mechanics",
        "Neural implant loadouts",
      ],
      align: "center",
    },
    {
      id: "vr-systems",
      eyebrow: "05 · VR SYSTEMS",
      title: "Presence-First Immersion",
      lead: "VR is not a mode. It is the command layer of the universe.",
      body:
        "Aetheria’s VR systems deliver bridge-scale interfaces, spatial mission planning, and direct manipulation of arcane constructs. Desktop and VR share progression with seamless session handoff.",
      highlights: [
        "Spatial command bridge",
        "Hand-tracked arcane casting",
        "Cross-platform continuity",
      ],
      align: "left",
    },
    {
      id: "tech-architecture",
      eyebrow: "06 · TECHNICAL ARCHITECTURE",
      title: "Engineered for Scale",
      lead: "A modular simulation stack built for world scale and rapid iteration.",
      body:
        "The backend uses event-sourced world state, procedural region streaming, and AI-driven NPC memory. The client leverages real-time rendering, predictive networking, and content pipelines for live seasons.",
      highlights: [
        "Event-sourced world simulation",
        "Procedural region streaming",
        "AI NPC memory graph",
      ],
      align: "center",
    },
    {
      id: "roadmap",
      eyebrow: "07 · FUTURE ROADMAP",
      title: "The Path to Launch",
      lead: "From vertical slice to galaxy-scale live service.",
      body:
        "Development proceeds in public milestones — each phase expanding systems, regions, and social infrastructure while maintaining a polished core experience.",
      highlights: [
        "Vertical slice demo",
        "Closed explorer program",
        "Season 1 live universe",
      ],
      align: "left",
    },
  ],
  roadmapPhases: [
    {
      phase: "PHASE I",
      title: "Vertical Slice",
      items: ["Combat prototype", "Hub island", "First portal questline"],
    },
    {
      phase: "PHASE II",
      title: "Explorer Alpha",
      items: ["Co-op missions", "VR bridge UI", "Faction reputation"],
    },
    {
      phase: "PHASE III",
      title: "Universe Beta",
      items: ["Open region streaming", "Seasonal events", "Creator tools"],
    },
    {
      phase: "PHASE IV",
      title: "Global Launch",
      items: ["Live seasons", "Cross-play", "Esports-ready PvP"],
    },
  ],
};

export function getShowcaseSection(id: string) {
  return SHOWCASE_CONTENT.sections.find((section) => section.id === id);
}
