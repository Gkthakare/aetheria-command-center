"use client";

import { useEffect, useRef, useState } from "react";

export interface HudMetrics {
  fps: number;
  coreStability: number;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function useHudMetrics(enabled = true): HudMetrics {
  const [fps, setFps] = useState(60);
  const [coreStability, setCoreStability] = useState(98.6);

  const frameTimesRef = useRef<number[]>([]);
  const lastTickRef = useRef(performance.now());

  useEffect(() => {
    if (!enabled) {
      return;
    }

    let frameId = 0;

    const tick = (now: number) => {
      const delta = now - lastTickRef.current;
      lastTickRef.current = now;

      if (delta > 0) {
        const samples = frameTimesRef.current;
        samples.push(1000 / delta);

        if (samples.length > 30) {
          samples.shift();
        }

        const average =
          samples.reduce((total, sample) => total + sample, 0) / samples.length;

        setFps(Math.round(average));

        const targetStability = clamp(96 + average / 60, 96, 99.9);
        setCoreStability((previous) => {
          const drift = (Math.random() - 0.5) * 0.08;
          const next = previous * 0.92 + (targetStability + drift) * 0.08;
          return clamp(Number(next.toFixed(1)), 94, 99.9);
        });
      }

      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frameId);
  }, [enabled]);

  return { fps, coreStability };
}
