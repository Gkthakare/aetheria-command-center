export const GALAXY_CONFIG = {
  hover: {
    scaleMultiplier: 1.18,
    emissiveBoost: 2.6,
    scaleLerp: 8,
  },
  atmosphere: {
    scaleMultiplier: 1.42,
    opacity: 0.14,
    pulseSpeed: 1.4,
  },
  orbitRing: {
    idleOpacity: 0.09,
    activeOpacity: 0.48,
    pulseAmplitude: 0.12,
  },
  camera: {
    focusDistance: 2.35,
    lerpSpeed: 2.8,
    returnSpeed: 2.2,
    focusFovScale: 0.82,
  },
  lighting: {
    planetLightIntensity: 1.65,
    planetLightDistance: 7,
  },
} as const;
