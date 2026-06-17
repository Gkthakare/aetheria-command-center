export type CameraMode =
  | "command-center"
  | "project-focus"
  | "aetheria-showcase"
  | "neural-core";

export type CameraScene = "command-center" | "showcase";

export interface CameraRig {
  position: readonly [number, number, number];
  lookAt: readonly [number, number, number];
  fov: number;
}

export interface SpringConfig {
  stiffness: number;
  damping: number;
}
