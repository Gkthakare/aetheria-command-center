"use client";

import { motion } from "framer-motion";

import {
  Heading,
  HeroSurface,
  Label,
  Subheading,
  TerminalText,
} from "@/design-system/aetheria";
import { easeOut } from "@/features/boot-sequence/components/BootGlassFrame";
import type { BootWelcomeProfile } from "@/features/boot-sequence/types/boot.types";

interface WelcomeScreenProps {
  welcome: BootWelcomeProfile;
  visible: boolean;
}

export function WelcomeScreen({ welcome, visible }: WelcomeScreenProps) {
  if (!visible) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: easeOut }}
      className="w-full"
    >
      <HeroSurface align="left" animate={false}>
        <Label variant="signal">{welcome.subtitle}</Label>

        <Heading as="h1" className="mt-4 !text-2xl sm:!text-3xl">
          Welcome, {welcome.name}
        </Heading>

        <div className="mt-4 space-y-1">
          {welcome.titles.map((title, index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 + index * 0.08, duration: 0.35 }}
            >
              <Subheading className="!max-w-none !text-sm">{title}</Subheading>
            </motion.div>
          ))}
        </div>

        <TerminalText
          variant="muted"
          className="mt-8 !max-w-none !text-xs uppercase tracking-[0.2em]"
        >
          Deploying command interface...
        </TerminalText>
      </HeroSurface>
    </motion.div>
  );
}
