"use client";

import { motion } from "framer-motion";

import {
  BodyText,
  ChromeSurface,
  Label,
  StatusIndicator,
  SystemBadge,
} from "@/design-system/aetheria";
import type { ShowcaseSectionId } from "@/features/aetheria-showcase/types/showcase.types";

interface ShowcaseActivityFeedProps {
  activeSectionId: ShowcaseSectionId | "hero";
}

const FEED_BY_SECTION: Record<ShowcaseSectionId | "hero", string[]> = {
  hero: ["Director shell initialized", "Awaiting module selection"],
  vision: ["Universe manifest loading", "Narrative index synced"],
  "world-lore": ["Archipelago mapped", "Codex decrypting"],
  combat: ["Combat engine primed", "Resonance calibrated"],
  progression: ["Ascension paths indexed", "Relic tables synced"],
  "vr-systems": ["VR bridge active", "Hand-track enabled"],
  "tech-architecture": ["Simulation online", "Streaming connected"],
  roadmap: ["Launch trajectory computed", "Phase milestones validated"],
};

export function ShowcaseActivityFeed({ activeSectionId }: ShowcaseActivityFeedProps) {
  const messages = FEED_BY_SECTION[activeSectionId];

  return (
    <footer className="pointer-events-none absolute inset-x-0 bottom-0 z-40 px-3 pb-2 sm:px-4">
      <ChromeSurface compact className="pointer-events-auto">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <SystemBadge variant="signal">Feed</SystemBadge>
            <StatusIndicator label="Stream" value="LIVE" tone="online" compact />
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-0.5 overflow-hidden sm:mx-4">
            {messages.map((message, index) => (
              <motion.p
                key={`${activeSectionId}-${message}`}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.06 }}
                className="truncate"
              >
                <BodyText as="span" variant="muted" className="!max-w-none !text-xs">
                  <span className="text-[#60A5FA]/70">›</span> {message}
                </BodyText>
              </motion.p>
            ))}
          </div>

          <Label className="hidden shrink-0 sm:block">Secure Channel</Label>
        </div>
      </ChromeSurface>
    </footer>
  );
}
