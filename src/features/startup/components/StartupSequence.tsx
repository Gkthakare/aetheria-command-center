"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

import {
  STARTUP_CONFIG,
  type StartupPhase,
} from "@/lib/startup.config";

interface StartupSequenceProps {
  onComplete: () => void;
}

const easeOut = [0.22, 1, 0.36, 1] as const;

function SystemCheckRow({
  label,
  index,
  visible,
}: {
  label: string;
  index: number;
  visible: boolean;
}) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: STARTUP_CONFIG.timing.checkRevealMs / 1000,
            delay: index * 0.04,
            ease: easeOut,
          }}
          className="flex items-center gap-3 font-mono text-xs tracking-widest sm:text-sm"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.12, duration: 0.25 }}
            className="text-emerald-400"
          >
            [ONLINE]
          </motion.span>
          <span className="text-violet-200/90">{label}</span>
          <motion.span
            className="ml-auto h-px flex-1 max-w-16 bg-gradient-to-r from-violet-500/50 to-transparent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            style={{ originX: 0 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function StartupSequence({ onComplete }: StartupSequenceProps) {
  const { initMessage, systemChecks, welcome, timing } = STARTUP_CONFIG;

  const [phase, setPhase] = useState<StartupPhase>("black");
  const [typedText, setTypedText] = useState("");
  const [progress, setProgress] = useState(0);
  const [visibleChecks, setVisibleChecks] = useState(0);
  const skippedRef = useRef(false);

  const skip = useCallback(() => {
    if (skippedRef.current) {
      return;
    }
    skippedRef.current = true;
    setPhase("fadeout");
  }, []);

  useEffect(() => {
    if (phase !== "black") {
      return;
    }

    const timer = window.setTimeout(() => {
      if (!skippedRef.current) {
        setPhase("typing");
      }
    }, timing.blackHoldMs);

    return () => window.clearTimeout(timer);
  }, [phase, timing.blackHoldMs]);

  useEffect(() => {
    if (phase !== "typing") {
      return;
    }

    let index = 0;
    const interval = window.setInterval(() => {
      index += 1;
      setTypedText(initMessage.slice(0, index));

      if (index >= initMessage.length) {
        window.clearInterval(interval);
        window.setTimeout(() => {
          if (!skippedRef.current) {
            setPhase("progress");
          }
        }, timing.typingPauseMs);
      }
    }, timing.typingCharMs);

    return () => window.clearInterval(interval);
  }, [phase, initMessage, timing.typingCharMs, timing.typingPauseMs]);

  useEffect(() => {
    if (phase !== "progress") {
      return;
    }

    const start = performance.now();

    const tick = (now: number) => {
      if (skippedRef.current) {
        return;
      }

      const elapsed = now - start;
      const nextProgress = Math.min(elapsed / timing.progressDurationMs, 1);
      setProgress(nextProgress);

      if (nextProgress < 1) {
        requestAnimationFrame(tick);
      } else {
        window.setTimeout(() => {
          if (!skippedRef.current) {
            setPhase("checks");
          }
        }, 200);
      }
    };

    const frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [phase, timing.progressDurationMs]);

  useEffect(() => {
    if (phase !== "checks") {
      return;
    }

    if (visibleChecks >= systemChecks.length) {
      const timer = window.setTimeout(() => {
        if (!skippedRef.current) {
          setPhase("welcome");
        }
      }, 500);
      return () => window.clearTimeout(timer);
    }

    const timer = window.setTimeout(() => {
      setVisibleChecks((count) => count + 1);
    }, timing.checkStaggerMs);

    return () => window.clearTimeout(timer);
  }, [phase, visibleChecks, systemChecks.length, timing.checkStaggerMs]);

  useEffect(() => {
    if (phase !== "welcome") {
      return;
    }

    const timer = window.setTimeout(() => {
      if (!skippedRef.current) {
        setPhase("fadeout");
      }
    }, timing.welcomeHoldMs);

    return () => window.clearTimeout(timer);
  }, [phase, timing.welcomeHoldMs]);

  useEffect(() => {
    if (phase !== "fadeout") {
      return;
    }

    const timer = window.setTimeout(() => {
      setPhase("done");
      onComplete();
    }, timing.fadeOutMs);

    return () => window.clearTimeout(timer);
  }, [phase, timing.fadeOutMs, onComplete]);

  const showTyping = phase === "typing" || phase === "progress" || phase === "checks" || phase === "welcome";
  const showProgress = phase === "progress" || phase === "checks" || phase === "welcome";
  const showChecks = phase === "checks" || phase === "welcome";
  const showWelcome = phase === "welcome";

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black"
      initial={{ opacity: 1 }}
      animate={{ opacity: phase === "fadeout" || phase === "done" ? 0 : 1 }}
      transition={{ duration: timing.fadeOutMs / 1000, ease: easeOut }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(rgba(139,92,246,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.04) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <motion.div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.12)_0%,transparent_65%)]"
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      <button
        type="button"
        onClick={skip}
        className="absolute right-4 top-4 z-10 rounded border border-violet-500/30 bg-black/40 px-3 py-1.5 font-mono text-[10px] tracking-[0.2em] text-violet-300/80 backdrop-blur-sm transition-colors hover:border-violet-400/60 hover:text-violet-100 sm:right-6 sm:top-6 sm:text-xs"
      >
        SKIP ›
      </button>

      <div className="relative z-10 w-full max-w-lg px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8 flex items-center gap-2 font-mono text-[10px] tracking-[0.35em] text-violet-400/60 sm:text-xs"
        >
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-violet-400 shadow-[0_0_8px_rgba(167,139,250,0.8)]" />
          AETHERIA COMMAND CENTER
        </motion.div>

        <AnimatePresence mode="wait">
          {showTyping && !showWelcome && (
            <motion.div
              key="boot-log"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.35 }}
              className="space-y-5"
            >
              <p className="min-h-[1.5em] font-mono text-sm tracking-wide text-violet-100/90 sm:text-base">
                {typedText}
                {phase === "typing" && (
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="ml-0.5 text-violet-400"
                  >
                    ▌
                  </motion.span>
                )}
              </p>

              {showProgress && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-2"
                >
                  <div className="flex justify-between font-mono text-[10px] tracking-widest text-violet-400/50 sm:text-xs">
                    <span>SYSTEM BOOT</span>
                    <span>{Math.round(progress * 100).toString().padStart(3, "0")}%</span>
                  </div>
                  <div className="relative h-1 overflow-hidden rounded-full bg-violet-950/80">
                    <motion.div
                      className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-400 to-cyan-400 shadow-[0_0_12px_rgba(167,139,250,0.6)]"
                      style={{ width: `${progress * 100}%` }}
                    />
                  </div>
                </motion.div>
              )}

              {showChecks && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-3 pt-2"
                >
                  {systemChecks.map((check, index) => (
                    <SystemCheckRow
                      key={check.id}
                      label={check.label}
                      index={index}
                      visible={index < visibleChecks}
                    />
                  ))}
                </motion.div>
              )}
            </motion.div>
          )}

          {showWelcome && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.5, ease: easeOut }}
              className="space-y-4 text-center sm:text-left"
            >
              <motion.p
                initial={{ opacity: 0, letterSpacing: "0.5em" }}
                animate={{ opacity: 1, letterSpacing: "0.25em" }}
                transition={{ duration: 0.6 }}
                className="font-mono text-[10px] text-violet-400/70 sm:text-xs"
              >
                AUTHENTICATION COMPLETE
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.5 }}
                className="bg-gradient-to-r from-violet-100 via-fuchsia-200 to-cyan-200 bg-clip-text text-2xl font-light tracking-[0.12em] text-transparent sm:text-3xl"
              >
                WELCOME, {welcome.name}
              </motion.h1>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35, duration: 0.4 }}
                className="flex flex-col gap-1 font-mono text-xs tracking-[0.3em] text-violet-300/80 sm:text-sm"
              >
                {welcome.titles.map((title, index) => (
                  <motion.span
                    key={title}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.12 }}
                  >
                    {title}
                  </motion.span>
                ))}
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0.4] }}
                transition={{ delay: 0.8, duration: 1.2, repeat: Infinity }}
                className="pt-4 font-mono text-[10px] tracking-widest text-violet-500/50"
              >
                ENTERING SINGULARITY...
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
