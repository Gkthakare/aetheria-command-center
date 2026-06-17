"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

import type { ParticleLayerDefinition } from "@/lib/black-hole.config";
import { fractalNoise, hash1 } from "@/lib/procedural";

interface ParticleOrbitLayerProps {
  config: ParticleLayerDefinition;
  orbitSpeed?: number;
}

interface LayerSimulation {
  angles: Float32Array;
  radii: Float32Array;
  baseRadii: Float32Array;
  speeds: Float32Array;
  inclinations: Float32Array;
  phases: Float32Array;
  twinkleSpeeds: Float32Array;
  baseColors: Float32Array;
  seeds: Float32Array;
}

function createLayerSimulation(config: ParticleLayerDefinition): LayerSimulation {
  const {
    count,
    radiusMin,
    radiusMax,
    orbitSpeedMin,
    orbitSpeedMax,
    inclinationSpread,
    twinkle,
  } = config;

  const angles = new Float32Array(count);
  const radii = new Float32Array(count);
  const baseRadii = new Float32Array(count);
  const speeds = new Float32Array(count);
  const inclinations = new Float32Array(count);
  const phases = new Float32Array(count);
  const twinkleSpeeds = new Float32Array(count);
  const baseColors = new Float32Array(count * 3);
  const seeds = new Float32Array(count);

  const startColor = new THREE.Color(config.colorStart);
  const endColor = new THREE.Color(config.colorEnd);
  const tempColor = new THREE.Color();

  for (let index = 0; index < count; index += 1) {
    const seed = index + 1;
    seeds[index] = seed;

    angles[index] = hash1(seed * 1.9) * Math.PI * 2;
    const radius = radiusMin + hash1(seed * 2.7) * (radiusMax - radiusMin);
    radii[index] = radius;
    baseRadii[index] = radius;
    speeds[index] =
      orbitSpeedMin + hash1(seed * 3.3) * (orbitSpeedMax - orbitSpeedMin);
    inclinations[index] = (hash1(seed * 4.1) - 0.5) * inclinationSpread;
    phases[index] = hash1(seed * 5.2) * Math.PI * 2;
    twinkleSpeeds[index] = twinkle ? 0.5 + hash1(seed * 6.4) * 2.8 : 0;

    const radiusT = (radius - radiusMin) / (radiusMax - radiusMin);
    tempColor
      .copy(startColor)
      .lerp(endColor, radiusT * 0.75 + hash1(seed * 7.8) * 0.25);

    baseColors[index * 3] = tempColor.r;
    baseColors[index * 3 + 1] = tempColor.g;
    baseColors[index * 3 + 2] = tempColor.b;
  }

  return {
    angles,
    radii,
    baseRadii,
    speeds,
    inclinations,
    phases,
    twinkleSpeeds,
    baseColors,
    seeds,
  };
}

function createLayerGeometry(
  config: ParticleLayerDefinition,
  simulation: LayerSimulation,
): THREE.BufferGeometry {
  const { count } = config;
  const colors = new Float32Array(count * 3);
  const positions = new Float32Array(count * 3);

  colors.set(simulation.baseColors);

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  return geometry;
}

export function ParticleOrbitLayer({
  config,
  orbitSpeed = 1,
}: ParticleOrbitLayerProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const orbitSpeedRef = useRef(orbitSpeed);
  orbitSpeedRef.current = orbitSpeed;

  const simulation = useMemo(
    () => createLayerSimulation(config),
    [config],
  );

  const geometry = useMemo(
    () => createLayerGeometry(config, simulation),
    [config, simulation],
  );

  useFrame(({ clock }, delta) => {
    const points = pointsRef.current;
    if (!points) {
      return;
    }

    const positionAttribute = points.geometry.getAttribute(
      "position",
    ) as THREE.BufferAttribute;
    const colorAttribute = points.geometry.getAttribute(
      "color",
    ) as THREE.BufferAttribute;
    const {
      angles,
      radii,
      baseRadii,
      speeds,
      inclinations,
      phases,
      twinkleSpeeds,
      baseColors,
      seeds,
    } = simulation;
    const speedMultiplier = orbitSpeedRef.current;
    const clampedDelta = Math.min(delta, 0.033);
    const elapsed = clock.getElapsedTime();
    const {
      count,
      zSpread,
      mode,
      infallRate = 0.1,
      outflowRate = 0.05,
      resetRadius = config.radiusMax,
      twinkle = false,
      idleDrift = 0,
      keplerian = false,
    } = config;

    for (let index = 0; index < count; index += 1) {
      const seed = seeds[index];
      const chaos = fractalNoise(
        seed * 0.13,
        elapsed * 0.05 + phases[index],
        2,
      );
      const idleWave =
        Math.sin(elapsed * (0.25 + hash1(seed * 8.1) * 0.3) + phases[index]) *
        idleDrift;

      let radius = radii[index];
      const keplerFactor = keplerian ? 1.35 / Math.sqrt(Math.max(radius, 0.45)) : 1;
      const orbitalSpeed =
        (speeds[index] + idleWave + chaos * 0.08) *
        speedMultiplier *
        keplerFactor *
        clampedDelta;

      angles[index] += orbitalSpeed;

      if (mode === "infall") {
        const pull =
          infallRate *
          (1.2 + 2.8 / Math.max(radius, 0.55)) *
          (0.7 + hash1(seed * 9.3) * 0.6);
        radii[index] -= pull * clampedDelta;

        if (radii[index] <= config.radiusMin) {
          radii[index] =
            resetRadius * (0.85 + hash1(seed * 10.7 + elapsed) * 0.15);
          baseRadii[index] = radii[index];
          angles[index] = hash1(seed * 11.2 + elapsed) * Math.PI * 2;
        }
      } else if (mode === "outflow") {
        const escape =
          outflowRate *
          (0.5 + hash1(seed * 12.4) * 0.9) *
          (1.0 + radius * 0.08);
        radii[index] += escape * clampedDelta;

        if (radii[index] >= resetRadius) {
          radii[index] =
            config.radiusMin + hash1(seed * 13.8 + elapsed) * 0.35;
          baseRadii[index] = radii[index];
          angles[index] = hash1(seed * 14.1) * Math.PI * 2;
        }
      } else {
        const wobble =
          fractalNoise(seed * 0.09, elapsed * 0.07 + phases[index], 2) - 0.5;
        radii[index] = baseRadii[index] + wobble * 0.08;
      }

      radius = radii[index];
      const orbitX = Math.cos(angles[index]) * radius;
      const orbitZ = Math.sin(angles[index]) * radius;
      const inclination = inclinations[index];
      const depthChaos = fractalNoise(
        angles[index] * 0.5,
        elapsed * 0.04 + seed,
        2,
      );
      const depthWave =
        Math.sin(angles[index] * 1.6 + phases[index]) * zSpread +
        (depthChaos - 0.5) * zSpread * 0.4;

      positionAttribute.setXYZ(
        index,
        orbitX,
        orbitZ * Math.sin(inclination) + depthWave * 0.2,
        orbitZ * Math.cos(inclination) + depthWave,
      );

      if (twinkle) {
        const twinkleStrength =
          0.4 +
          0.6 *
            Math.sin(elapsed * twinkleSpeeds[index] + phases[index]) ** 2;
        const colorIndex = index * 3;
        colorAttribute.array[colorIndex] =
          baseColors[colorIndex] * twinkleStrength;
        colorAttribute.array[colorIndex + 1] =
          baseColors[colorIndex + 1] * twinkleStrength;
        colorAttribute.array[colorIndex + 2] =
          baseColors[colorIndex + 2] * twinkleStrength;
      }
    }

    positionAttribute.needsUpdate = true;

    if (twinkle) {
      colorAttribute.needsUpdate = true;
    }
  });

  return (
    <points
      ref={pointsRef}
      geometry={geometry}
      frustumCulled={false}
      renderOrder={config.renderOrder ?? 0}
    >
      <pointsMaterial
        size={config.particleSize}
        vertexColors
        transparent
        opacity={config.opacity}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}
