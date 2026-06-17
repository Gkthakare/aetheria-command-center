"use client";

import { CameraDirector } from "@/camera/CameraDirector";

/** @deprecated Use CameraDirector from `@/camera` instead. */
export function CameraDrift() {
  return <CameraDirector scene="command-center" />;
}
