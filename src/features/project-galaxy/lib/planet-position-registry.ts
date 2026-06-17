import * as THREE from "three";

const positions = new Map<string, THREE.Vector3>();

export const planetPositionRegistry = {
  set(id: string, position: THREE.Vector3) {
    const existing = positions.get(id);
    if (existing) {
      existing.copy(position);
    } else {
      positions.set(id, position.clone());
    }
  },

  get(id: string): THREE.Vector3 | undefined {
    return positions.get(id);
  },

  clear() {
    positions.clear();
  },
};

export const cameraScratch = {
  target: new THREE.Vector3(),
  focus: new THREE.Vector3(),
  offset: new THREE.Vector3(),
};
