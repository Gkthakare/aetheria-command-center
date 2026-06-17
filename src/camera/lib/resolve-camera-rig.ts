import * as THREE from "three";

import {
  CAMERA_MODE_PRESETS,
} from "@/camera/config/camera-director.config";
import type { CameraMode, CameraRig, CameraScene } from "@/camera/types/camera.types";
import { planetPositionRegistry } from "@/features/project-galaxy/lib/planet-position-registry";
import { BLACK_HOLE_CAMERA } from "@/lib/black-hole.config";

const scratch = {
  position: new THREE.Vector3(),
  lookAt: new THREE.Vector3(),
  offset: new THREE.Vector3(),
  basePosition: new THREE.Vector3(...BLACK_HOLE_CAMERA.position),
  baseLookAt: new THREE.Vector3(...BLACK_HOLE_CAMERA.lookAt),
};

export interface ResolveCameraRigInput {
  scene: CameraScene;
  mode: CameraMode;
  focusProjectId: string | null;
  elapsed: number;
  mouseX: number;
  mouseY: number;
  showcaseScrollProgress: number;
  allowAmbientDrift: boolean;
}

function applyAmbientDrift(
  base: readonly [number, number, number],
  lookAt: readonly [number, number, number],
  elapsed: number,
  mouseX: number,
  mouseY: number,
  drift: {
    amplitude: readonly [number, number, number];
    frequency: readonly [number, number, number];
    mouseInfluence: number;
  },
  breathing: {
    zoomAmplitude: number;
    zoomFrequency: number;
    fovAmplitude: number;
    fovFrequency: number;
    lookAtWobble: number;
  },
  targetPosition: THREE.Vector3,
  targetLookAt: THREE.Vector3,
) {
  const breath = Math.sin(elapsed * breathing.zoomFrequency);

  targetPosition.set(
    base[0] +
      Math.sin(elapsed * drift.frequency[0]) * drift.amplitude[0] +
      mouseX * drift.mouseInfluence,
    base[1] +
      Math.sin(elapsed * drift.frequency[1] + 1.7) * drift.amplitude[1] +
      mouseY * drift.mouseInfluence * 0.6,
    base[2] +
      Math.sin(elapsed * drift.frequency[2] + 2.4) * drift.amplitude[2] +
      breath * breathing.zoomAmplitude,
  );

  targetLookAt.set(
    lookAt[0] + Math.sin(elapsed * 0.11) * breathing.lookAtWobble,
    lookAt[1] + Math.sin(elapsed * 0.13) * breathing.lookAtWobble,
    lookAt[2],
  );
}

export function resolveEffectiveMode(
  scene: CameraScene,
  mode: CameraMode,
  focusProjectId: string | null,
): CameraMode {
  if (scene === "showcase") {
    return "aetheria-showcase";
  }

  if (focusProjectId) {
    return "project-focus";
  }

  if (mode === "aetheria-showcase") {
    return "command-center";
  }

  return mode;
}

export function resolveCameraRig(input: ResolveCameraRigInput): CameraRig {
  const effectiveMode = resolveEffectiveMode(
    input.scene,
    input.mode,
    input.focusProjectId,
  );

  switch (effectiveMode) {
    case "command-center": {
      const preset = CAMERA_MODE_PRESETS["command-center"];

      if (input.allowAmbientDrift) {
        applyAmbientDrift(
          preset.position,
          preset.lookAt,
          input.elapsed,
          input.mouseX,
          input.mouseY,
          preset.drift,
          preset.breathing,
          scratch.position,
          scratch.lookAt,
        );
      } else {
        scratch.position.set(...preset.position);
        scratch.lookAt.set(...preset.lookAt);
      }

      const fov =
        preset.fov +
        (input.allowAmbientDrift
          ? Math.sin(input.elapsed * preset.breathing.fovFrequency + 1.2) *
            preset.breathing.fovAmplitude
          : 0);

      return {
        position: scratch.position.toArray() as [number, number, number],
        lookAt: scratch.lookAt.toArray() as [number, number, number],
        fov,
      };
    }

    case "neural-core": {
      const preset = CAMERA_MODE_PRESETS["neural-core"];

      if (input.allowAmbientDrift) {
        applyAmbientDrift(
          preset.position,
          preset.lookAt,
          input.elapsed,
          input.mouseX,
          input.mouseY,
          preset.drift,
          preset.breathing,
          scratch.position,
          scratch.lookAt,
        );
      } else {
        scratch.position.set(...preset.position);
        scratch.lookAt.set(...preset.lookAt);
      }

      const fov =
        preset.fov +
        (input.allowAmbientDrift
          ? Math.sin(input.elapsed * preset.breathing.fovFrequency + 0.8) *
            preset.breathing.fovAmplitude
          : 0);

      return {
        position: scratch.position.toArray() as [number, number, number],
        lookAt: scratch.lookAt.toArray() as [number, number, number],
        fov,
      };
    }

    case "project-focus": {
      const preset = CAMERA_MODE_PRESETS["project-focus"];
      const planetPosition = input.focusProjectId
        ? planetPositionRegistry.get(input.focusProjectId)
        : undefined;

      if (planetPosition) {
        scratch.lookAt.copy(planetPosition);
        scratch.offset
          .copy(scratch.basePosition)
          .sub(scratch.baseLookAt)
          .normalize()
          .multiplyScalar(preset.focusDistance);
        scratch.position.copy(planetPosition).add(scratch.offset);
      } else {
        scratch.position.set(...preset.basePosition);
        scratch.lookAt.set(...preset.baseLookAt);
      }

      return {
        position: scratch.position.toArray() as [number, number, number],
        lookAt: scratch.lookAt.toArray() as [number, number, number],
        fov: preset.baseFov * preset.fovScale,
      };
    }

    case "aetheria-showcase": {
      const preset = CAMERA_MODE_PRESETS["aetheria-showcase"];
      const { verticalRange, depthRange } = preset.parallax;
      const scroll = input.showcaseScrollProgress;

      scratch.position.set(
        preset.position[0],
        preset.position[1] + scroll * verticalRange,
        preset.position[2] - scroll * depthRange,
      );
      scratch.lookAt.set(
        preset.lookAt[0],
        preset.lookAt[1] - scroll * 0.5,
        preset.lookAt[2],
      );

      return {
        position: scratch.position.toArray() as [number, number, number],
        lookAt: scratch.lookAt.toArray() as [number, number, number],
        fov: preset.fov,
      };
    }
  }
}
