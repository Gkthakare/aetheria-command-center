"use client";

import { CameraDirector } from "@/camera/CameraDirector";

/** @deprecated Use CameraDirector from `@/camera` instead. */
export function GalaxyCameraController() {
  return <CameraDirector scene="command-center" />;
}
