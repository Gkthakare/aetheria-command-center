"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";

import {
  CAMERA_DIRECTOR_SPRING,
  CAMERA_DIRECTOR_TRANSITION,
} from "@/camera/config/camera-director.config";
import { SpringCameraRig } from "@/camera/lib/spring-camera";
import {
  resolveCameraRig,
  resolveEffectiveMode,
} from "@/camera/lib/resolve-camera-rig";
import { useCameraDirectorStore } from "@/camera/stores/camera.director.store";
import type { CameraScene } from "@/camera/types/camera.types";
import { useGalaxyStore } from "@/features/project-galaxy/stores/galaxy.store";
import { BLACK_HOLE_CAMERA } from "@/lib/black-hole.config";
import { useExperienceStore } from "@/stores/experience.store";

const targetPosition = new THREE.Vector3();
const targetLookAt = new THREE.Vector3();

interface CameraDirectorProps {
  scene?: CameraScene;
}

export function CameraDirector({ scene = "command-center" }: CameraDirectorProps) {
  const { camera, size } = useThree();

  const mode = useCameraDirectorStore((state) => state.mode);
  const focusProjectId = useCameraDirectorStore((state) => state.focusProjectId);
  const showcaseScrollProgress = useCameraDirectorStore(
    (state) => state.showcaseScrollProgress,
  );
  const setTransitioning = useCameraDirectorStore(
    (state) => state.setTransitioning,
  );

  const mouseX = useExperienceStore((state) => state.mouseX);
  const mouseY = useExperienceStore((state) => state.mouseY);
  const setGalaxyCameraTransitioning = useGalaxyStore(
    (state) => state.setCameraTransitioning,
  );

  const mouseRef = useRef({ x: 0, y: 0 });
  const springRig = useRef<SpringCameraRig | null>(null);
  const initialized = useRef(false);
  const settledFrames = useRef(0);
  const effectiveModeRef = useRef(resolveEffectiveMode(scene, mode, focusProjectId));

  mouseRef.current.x = mouseX;
  mouseRef.current.y = mouseY;

  const baseFov = useMemo(
    () =>
      camera instanceof THREE.PerspectiveCamera
        ? camera.fov
        : BLACK_HOLE_CAMERA.fov,
    [camera],
  );

  useLayoutEffect(() => {
    if (!(camera instanceof THREE.PerspectiveCamera)) {
      return;
    }

    if (!springRig.current) {
      springRig.current = new SpringCameraRig(baseFov);
    }

    if (!initialized.current) {
      springRig.current.initialize(
        camera.position,
        new THREE.Vector3(...BLACK_HOLE_CAMERA.lookAt),
        baseFov,
      );
      initialized.current = true;
    }

    camera.aspect = size.width / Math.max(size.height, 1);
    camera.updateProjectionMatrix();
  }, [camera, size.width, size.height, baseFov]);

  useFrame(({ clock }, delta) => {
    if (!(camera instanceof THREE.PerspectiveCamera) || !springRig.current) {
      return;
    }

    const clampedDelta = Math.min(delta, CAMERA_DIRECTOR_TRANSITION.maxDelta);
    const effectiveMode = resolveEffectiveMode(scene, mode, focusProjectId);
    const modeChanged = effectiveModeRef.current !== effectiveMode;
    effectiveModeRef.current = effectiveMode;

    if (modeChanged) {
      settledFrames.current = 0;
    }

    const allowAmbientDrift =
      effectiveMode === "command-center" || effectiveMode === "neural-core";

    const rig = resolveCameraRig({
      scene,
      mode,
      focusProjectId,
      elapsed: clock.getElapsedTime(),
      mouseX: mouseRef.current.x,
      mouseY: mouseRef.current.y,
      showcaseScrollProgress,
      allowAmbientDrift,
    });

    targetPosition.set(...rig.position);
    targetLookAt.set(...rig.lookAt);

    const springError = springRig.current.step(
      targetPosition,
      targetLookAt,
      rig.fov,
      clampedDelta,
      CAMERA_DIRECTOR_SPRING.position,
      CAMERA_DIRECTOR_SPRING.lookAt,
      CAMERA_DIRECTOR_SPRING.fov,
    );

    camera.position.copy(springRig.current.position.output);
    camera.lookAt(springRig.current.lookAt.output);
    camera.aspect = size.width / Math.max(size.height, 1);
    camera.fov = springRig.current.fov;
    camera.updateProjectionMatrix();

    const isSettled = springError < CAMERA_DIRECTOR_TRANSITION.settleThreshold;

    if (isSettled) {
      settledFrames.current += 1;
    } else {
      settledFrames.current = 0;
    }

    const isTransitioning = !isSettled || settledFrames.current < 3;
    const progress = isSettled
      ? Math.min(settledFrames.current / 12, 1)
      : Math.max(0, 1 - springError * 4);

    setTransitioning(isTransitioning, progress);

    if (scene === "command-center") {
      setGalaxyCameraTransitioning(isTransitioning);
    }
  });

  return null;
}
