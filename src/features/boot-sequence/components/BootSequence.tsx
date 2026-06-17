"use client";

import { AnimatePresence, motion } from "framer-motion";

import { NeonButton } from "@/design-system/aetheria";
import { BootProgress } from "@/features/boot-sequence/components/BootProgress";
import { BootTerminal } from "@/features/boot-sequence/components/BootTerminal";
import { easeOut } from "@/features/boot-sequence/components/BootGlassFrame";
import { SystemCheckList } from "@/features/boot-sequence/components/SystemCheckList";
import { SystemStatusCards } from "@/features/boot-sequence/components/SystemStatusCards";
import { WelcomeScreen } from "@/features/boot-sequence/components/WelcomeScreen";
import { useBootSequence } from "@/features/boot-sequence/hooks/useBootSequence";

interface BootSequenceProps {
  onComplete: () => void;
}

export function BootSequence({ onComplete }: BootSequenceProps) {
  const boot = useBootSequence(onComplete);
  const { content, phase, isExiting } = boot;
  const { brandTitle, initMessage, progressLabel, systemChecks, welcome, timing } =
    content;

  const showChecks =
    phase === "checks" || phase === "progress" || phase === "welcome";
  const showProgress = phase === "progress" || phase === "welcome";
  const showWelcome = phase === "welcome";

  return (
    <motion.div
      className="fixed inset-0 z-50 overflow-hidden bg-[#050510]"
      initial={{ opacity: 1 }}
      animate={{ opacity: isExiting ? 0 : 1 }}
      transition={{ duration: timing.fadeOutMs / 1000, ease: easeOut }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(96,165,250,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(96,165,250,0.3) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="absolute right-4 top-4 z-20 sm:right-6 sm:top-6">
        <NeonButton type="button" onClick={boot.skip} variant="ghost">
          Skip ›
        </NeonButton>
      </div>

      <div className="relative z-10 flex h-full w-full items-center justify-center p-4 sm:p-6 md:p-10">
        <div className="grid w-full max-w-5xl gap-6 lg:grid-cols-[1fr_280px] lg:gap-10">
          <div className="flex flex-col justify-center space-y-4">
            <AnimatePresence mode="wait">
              {!showWelcome ? (
                <motion.div
                  key="boot-flow"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="space-y-4"
                >
                  <BootTerminal
                    phase={phase}
                    brandTitle={brandTitle}
                    initMessage={initMessage}
                    typedText={boot.typedText}
                  />

                  <SystemCheckList
                    checks={systemChecks}
                    statuses={boot.checkStatuses}
                    visibleCount={boot.visibleCheckCount}
                    activeIndex={boot.activeCheckIndex}
                    visible={showChecks && !showWelcome}
                  />

                  <BootProgress
                    progress={boot.progress}
                    label={progressLabel}
                    visible={showProgress && !showWelcome}
                  />
                </motion.div>
              ) : (
                <WelcomeScreen welcome={welcome} visible={showWelcome} />
              )}
            </AnimatePresence>
          </div>

          <div className="hidden lg:flex lg:flex-col lg:justify-center">
            <SystemStatusCards
              checks={systemChecks}
              statuses={boot.checkStatuses}
              visible={showChecks && !showWelcome}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
