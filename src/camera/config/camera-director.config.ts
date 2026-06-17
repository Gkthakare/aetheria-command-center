import { GALAXY_CONFIG } from "@/features/project-galaxy/config/galaxy.config";
import { SHOWCASE_VISUAL } from "@/features/aetheria-showcase/config/showcase.config";
import { BLACK_HOLE_CAMERA } from "@/lib/black-hole.config";

export const CAMERA_DIRECTOR_SPRING = {
  position: { stiffness: 34, damping: 11.5 },
  lookAt: { stiffness: 44, damping: 13.5 },
  fov: { stiffness: 30, damping: 11 },
} as const;

export const CAMERA_DIRECTOR_TRANSITION = {
  settleThreshold: 0.0035,
  maxDelta: 0.033,
} as const;

export const CAMERA_MODE_PRESETS = {
  "command-center": {
    position: BLACK_HOLE_CAMERA.position,
    lookAt: BLACK_HOLE_CAMERA.lookAt,
    fov: BLACK_HOLE_CAMERA.fov,
    drift: BLACK_HOLE_CAMERA.drift,
    breathing: BLACK_HOLE_CAMERA.breathing,
  },
  "neural-core": {
    position: [0, 0.14, 3.35] as const,
    lookAt: [0, 0, 0] as const,
    fov: 38,
    drift: {
      amplitude: [0.016, 0.01, 0.009] as const,
      frequency: [0.02, 0.015, 0.013] as const,
      mouseInfluence: 0.045,
    },
    breathing: {
      zoomAmplitude: 0.018,
      zoomFrequency: 0.1,
      fovAmplitude: 0.05,
      fovFrequency: 0.08,
      lookAtWobble: 0.006,
    },
  },
  "project-focus": {
    focusDistance: GALAXY_CONFIG.camera.focusDistance,
    fovScale: GALAXY_CONFIG.camera.focusFovScale,
    baseFov: BLACK_HOLE_CAMERA.fov,
    basePosition: BLACK_HOLE_CAMERA.position,
    baseLookAt: BLACK_HOLE_CAMERA.lookAt,
  },
  "aetheria-showcase": {
    position: SHOWCASE_VISUAL.camera.position,
    lookAt: [0, 0.5, -4] as const,
    fov: SHOWCASE_VISUAL.camera.fov,
    parallax: SHOWCASE_VISUAL.parallax,
  },
} as const;
