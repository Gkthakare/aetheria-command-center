import * as THREE from "three";

import type { SpringConfig } from "@/camera/types/camera.types";

class SpringScalar {
  value: number;
  velocity = 0;

  constructor(initial: number) {
    this.value = initial;
  }

  step(
    target: number,
    delta: number,
    { stiffness, damping }: SpringConfig,
  ): number {
    const displacement = this.value - target;
    const acceleration = -stiffness * displacement - damping * this.velocity;

    this.velocity += acceleration * delta;
    this.value += this.velocity * delta;

    return Math.abs(displacement) + Math.abs(this.velocity);
  }

  set(value: number) {
    this.value = value;
    this.velocity = 0;
  }
}

export class SpringVector3 {
  private readonly x: SpringScalar;
  private readonly y: SpringScalar;
  private readonly z: SpringScalar;
  readonly output = new THREE.Vector3();

  constructor(initial = new THREE.Vector3()) {
    this.x = new SpringScalar(initial.x);
    this.y = new SpringScalar(initial.y);
    this.z = new SpringScalar(initial.z);
  }

  set(value: THREE.Vector3) {
    this.x.set(value.x);
    this.y.set(value.y);
    this.z.set(value.z);
  }

  step(
    target: THREE.Vector3,
    delta: number,
    config: SpringConfig,
  ): number {
    const error =
      this.x.step(target.x, delta, config) +
      this.y.step(target.y, delta, config) +
      this.z.step(target.z, delta, config);

    this.output.set(this.x.value, this.y.value, this.z.value);
    return error;
  }
}

export class SpringCameraRig {
  readonly position = new SpringVector3();
  readonly lookAt = new SpringVector3();
  private readonly fovSpring: SpringScalar;

  constructor(initialFov: number) {
    this.fovSpring = new SpringScalar(initialFov);
  }

  initialize(position: THREE.Vector3, lookAt: THREE.Vector3, fov: number) {
    this.position.set(position);
    this.lookAt.set(lookAt);
    this.fovSpring.set(fov);
  }

  step(
    targetPosition: THREE.Vector3,
    targetLookAt: THREE.Vector3,
    targetFov: number,
    delta: number,
    positionSpring: SpringConfig,
    lookAtSpring: SpringConfig,
    fovSpring: SpringConfig,
  ): number {
    const positionError = this.position.step(
      targetPosition,
      delta,
      positionSpring,
    );
    const lookAtError = this.lookAt.step(targetLookAt, delta, lookAtSpring);
    const fovError = this.fovSpring.step(targetFov, delta, fovSpring);

    return positionError + lookAtError + fovError;
  }

  get fov() {
    return this.fovSpring.value;
  }
}
