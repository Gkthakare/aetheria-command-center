export const BLACK_HOLE_COLORS = {
  background: "#000002",
  fog: "#0c0618",
  fogDeep: "#050210",
  singularity: "#000000",
  diskHot: "#fff4e8",
  diskWarm: "#c084fc",
  diskMid: "#7c3aed",
  diskDeep: "#3b0764",
  diskCold: "#120828",
  diskShadow: "#05010f",
  chromaPurple: "#9333ea",
  chromaViolet: "#a78bfa",
  chromaBlue: "#38bdf8",
  chromaElectric: "#6366f1",
  particleWhite: "#e2e8f0",
  particleViolet: "#8b5cf6",
  particleBlue: "#67e8f9",
  particleDeep: "#4c1d95",
  nebulaDeep: "#0a0414",
  nebulaMid: "#2e1065",
  nebulaBright: "#5b21b6",
  nebulaAccent: "#7c3aed",
  photonRing: "#f5f3ff",
  lensGlow: "#818cf8",
} as const;

export const BLACK_HOLE_CAMERA = {
  position: [0, 0, 8] as const,
  fov: 50,
  lookAt: [0, 0, 0] as const,
  drift: {
    amplitude: [0.028, 0.018, 0.012] as const,
    frequency: [0.022, 0.016, 0.011] as const,
    mouseInfluence: 0.06,
  },
  breathing: {
    zoomAmplitude: 0.025,
    zoomFrequency: 0.12,
    fovAmplitude: 0.08,
    fovFrequency: 0.09,
    lookAtWobble: 0.004,
  },
} as const;

export const BLACK_HOLE_SINGULARITY = {
  /** Visual scale applied to horizon + accretion disk (20% reduction). */
  scale: 0.8,
  coreRadius: 0.352,
  photonRingRadius: 0.432,
  lensInnerRadius: 0.416,
  lensOuterRadius: 0.84,
  viewportWidthFraction: 0.28,
  /** Photon lens ring removed — accretion disk is the sole orbital ring. */
  showLensRing: false,
  ringOpacity: 0.5,
} as const;

export const BLACK_HOLE_ACCRETION_DISK = {
  innerRadius: 0.624,
  outerRadius: 2.04,
  tiltX: 1.28,
  rotationSpeed: 0.08,
  segments: 96,
  opacity: 0.5,
} as const;

export const BLACK_HOLE_BLOOM = {
  intensity: 0.72,
  luminanceThreshold: 0.28,
  luminanceSmoothing: 0.9,
  mipmapBlur: true,
} as const;

export const BLACK_HOLE_CHROMATIC = {
  offset: [0.00035, 0.00065] as const,
  modulationOffset: 0.15,
  modulationFrequency: 0.08,
} as const;

export const BLACK_HOLE_NEBULA = {
  radius: 42,
  segments: 48,
  rotationSpeed: 0.008,
  opacity: 0.18,
} as const;

/** Depth-of-field tuned to keep project galaxy in focus; singularity falls off. */
export const BLACK_HOLE_DEPTH_OF_FIELD = {
  /** Autofocus target — mid-orbit band where planets live. */
  target: [3.6, 0.08, 0.4] as const,
  focalLength: 0.028,
  bokehScale: 4.2,
  focusRange: 0.18,
  worldFocusRange: 3.2,
} as const;

export interface StarfieldDefinition {
  id: string;
  count: number;
  radiusMin: number;
  radiusMax: number;
  particleSize: number;
  opacity: number;
  renderOrder: number;
  twinkle: boolean;
}

export const BLACK_HOLE_STARFIELD_LAYERS: StarfieldDefinition[] = [
  {
    id: "background",
    count: 260,
    radiusMin: 16,
    radiusMax: 28,
    particleSize: 0.042,
    opacity: 0.55,
    renderOrder: -1,
    twinkle: true,
  },
  {
    id: "foreground",
    count: 90,
    radiusMin: 5.5,
    radiusMax: 8.2,
    particleSize: 0.075,
    opacity: 0.72,
    renderOrder: 6,
    twinkle: true,
  },
] as const;

export interface ParticleLayerDefinition {
  id: string;
  count: number;
  radiusMin: number;
  radiusMax: number;
  orbitSpeedMin: number;
  orbitSpeedMax: number;
  particleSize: number;
  opacity: number;
  zSpread: number;
  inclinationSpread: number;
  colorStart: string;
  colorEnd: string;
  mode: "orbit" | "infall" | "outflow";
  infallRate?: number;
  outflowRate?: number;
  resetRadius?: number;
  twinkle?: boolean;
  idleDrift?: number;
  keplerian?: boolean;
  renderOrder?: number;
}

export const BLACK_HOLE_PARTICLE_LAYERS: ParticleLayerDefinition[] = [
  {
    id: "mid",
    count: 480,
    radiusMin: 1.5,
    radiusMax: 3.4,
    orbitSpeedMin: 0.35,
    orbitSpeedMax: 0.95,
    particleSize: 0.018,
    opacity: 0.42,
    zSpread: 0.85,
    inclinationSpread: 0.55,
    colorStart: BLACK_HOLE_COLORS.chromaViolet,
    colorEnd: BLACK_HOLE_COLORS.chromaBlue,
    mode: "orbit",
    idleDrift: 0.1,
    keplerian: true,
    renderOrder: 0,
  },
  {
    id: "outer",
    count: 420,
    radiusMin: 3.2,
    radiusMax: 6.2,
    orbitSpeedMin: 0.12,
    orbitSpeedMax: 0.38,
    particleSize: 0.013,
    opacity: 0.32,
    zSpread: 1.6,
    inclinationSpread: 0.78,
    colorStart: BLACK_HOLE_COLORS.particleDeep,
    colorEnd: BLACK_HOLE_COLORS.particleBlue,
    mode: "orbit",
    twinkle: true,
    idleDrift: 0.14,
    keplerian: true,
    renderOrder: 0,
  },
] as const;

export const BLACK_HOLE_PARTICLE_TOTAL = BLACK_HOLE_PARTICLE_LAYERS.reduce(
  (total, layer) => total + layer.count,
  0,
);

export const BLACK_HOLE_SCENE = {
  fogDensity: 0.048,
  ambientIntensity: 0.012,
  singularityLightScale: 0.55,
} as const;
