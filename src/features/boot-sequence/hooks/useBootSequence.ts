"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { BOOT_SEQUENCE_CONTENT } from "@/features/boot-sequence/data/bootSteps";
import type {
  BootPhase,
  SystemCheckStatus,
  UseBootSequenceReturn,
} from "@/features/boot-sequence/types/boot.types";

function createInitialCheckStatuses(count: number): SystemCheckStatus[] {
  return Array.from({ length: count }, () => "pending");
}

export function useBootSequence(onComplete: () => void): UseBootSequenceReturn {
  const { initMessage, systemChecks, timing } = BOOT_SEQUENCE_CONTENT;
  const checkCount = systemChecks.length;

  const [phase, setPhase] = useState<BootPhase>("black");
  const [typedText, setTypedText] = useState("");
  const [visibleCheckCount, setVisibleCheckCount] = useState(0);
  const [activeCheckIndex, setActiveCheckIndex] = useState(-1);
  const [checkStatuses, setCheckStatuses] = useState<SystemCheckStatus[]>(() =>
    createInitialCheckStatuses(checkCount),
  );
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  const skippedRef = useRef(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const skip = useCallback(() => {
    if (skippedRef.current || phase === "complete") {
      return;
    }
    skippedRef.current = true;
    setIsExiting(true);
    setPhase("fadeout");
  }, [phase]);

  useEffect(() => {
    if (phase !== "black") {
      return;
    }

    const timer = window.setTimeout(() => {
      if (!skippedRef.current) {
        setPhase("title");
      }
    }, timing.blackHoldMs);

    return () => window.clearTimeout(timer);
  }, [phase, timing.blackHoldMs]);

  useEffect(() => {
    if (phase !== "title") {
      return;
    }

    const timer = window.setTimeout(() => {
      if (!skippedRef.current) {
        setPhase("typing");
      }
    }, timing.titleHoldMs + timing.titleRevealMs);

    return () => window.clearTimeout(timer);
  }, [phase, timing.titleHoldMs, timing.titleRevealMs]);

  useEffect(() => {
    if (phase !== "typing") {
      return;
    }

    let index = 0;
    setTypedText("");

    const interval = window.setInterval(() => {
      index += 1;
      setTypedText(initMessage.slice(0, index));

      if (index >= initMessage.length) {
        window.clearInterval(interval);
        window.setTimeout(() => {
          if (!skippedRef.current) {
            setPhase("checks");
          }
        }, timing.typingPauseMs);
      }
    }, timing.typingCharMs);

    return () => window.clearInterval(interval);
  }, [phase, initMessage, timing.typingCharMs, timing.typingPauseMs]);

  useEffect(() => {
    if (phase !== "checks") {
      return;
    }

    if (visibleCheckCount >= checkCount) {
      const timer = window.setTimeout(() => {
        if (!skippedRef.current) {
          setActiveCheckIndex(-1);
          setPhase("progress");
        }
      }, timing.checksCompletePauseMs);

      return () => window.clearTimeout(timer);
    }

    const checkIndex = visibleCheckCount;
    setActiveCheckIndex(checkIndex);
    setCheckStatuses((previous) => {
      const next = [...previous];
      next[checkIndex] = "running";
      return next;
    });

    let staggerTimer: number | undefined;

    const runningTimer = window.setTimeout(() => {
      setCheckStatuses((previous) => {
        const next = [...previous];
        next[checkIndex] = "online";
        return next;
      });

      staggerTimer = window.setTimeout(() => {
        if (!skippedRef.current) {
          setVisibleCheckCount((count) => count + 1);
        }
      }, timing.checkStaggerMs);
    }, timing.checkRunningMs);

    return () => {
      window.clearTimeout(runningTimer);
      if (staggerTimer !== undefined) {
        window.clearTimeout(staggerTimer);
      }
    };
  }, [
    phase,
    visibleCheckCount,
    checkCount,
    timing.checkStaggerMs,
    timing.checkRunningMs,
    timing.checksCompletePauseMs,
  ]);

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
            setPhase("welcome");
          }
        }, timing.progressCompletePauseMs);
      }
    };

    const frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [phase, timing.progressDurationMs, timing.progressCompletePauseMs]);

  useEffect(() => {
    if (phase !== "welcome") {
      return;
    }

    const timer = window.setTimeout(() => {
      if (!skippedRef.current) {
        setIsExiting(true);
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
      setPhase("complete");
      onCompleteRef.current();
    }, timing.fadeOutMs);

    return () => window.clearTimeout(timer);
  }, [phase, timing.fadeOutMs]);

  return {
    content: BOOT_SEQUENCE_CONTENT,
    phase,
    typedText,
    visibleCheckCount,
    activeCheckIndex,
    checkStatuses,
    progress,
    isExiting,
    skip,
  };
}
