"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface ViewportFrameProps {
  children: ReactNode;
}

function applyViewportBounds(node: HTMLDivElement) {
  const viewport = window.visualViewport;
  const width = viewport?.width ?? window.innerWidth;
  const height = viewport?.height ?? window.innerHeight;
  const top = viewport?.offsetTop ?? 0;
  const left = viewport?.offsetLeft ?? 0;

  node.style.position = "fixed";
  node.style.width = `${width}px`;
  node.style.height = `${height}px`;
  node.style.top = `${top}px`;
  node.style.left = `${left}px`;
  node.style.margin = "0";
  node.style.padding = "0";
}

export function ViewportFrame({ children }: ViewportFrameProps) {
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = frameRef.current;
    if (!node) {
      return;
    }

    const syncViewport = () => {
      applyViewportBounds(node);
    };

    syncViewport();

    window.visualViewport?.addEventListener("resize", syncViewport);
    window.visualViewport?.addEventListener("scroll", syncViewport);
    window.addEventListener("resize", syncViewport);
    window.addEventListener("orientationchange", syncViewport);

    return () => {
      window.visualViewport?.removeEventListener("resize", syncViewport);
      window.visualViewport?.removeEventListener("scroll", syncViewport);
      window.removeEventListener("resize", syncViewport);
      window.removeEventListener("orientationchange", syncViewport);
    };
  }, []);

  return (
    <div
      ref={frameRef}
      className="touch-none overflow-hidden"
      style={{ zIndex: 0 }}
    >
      {children}
    </div>
  );
}
