"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

import {
  BLACK_HOLE_COLORS,
  BLACK_HOLE_STARFIELD_LAYERS,
  type StarfieldDefinition,
} from "@/lib/black-hole.config";
import { hash1 } from "@/lib/procedural";

interface StarfieldProps {
  config?: StarfieldDefinition;
}

function createStarfieldGeometry(config: StarfieldDefinition) {
  const { count, radiusMin, radiusMax, twinkle } = config;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const phases = new Float32Array(count);
  const speeds = new Float32Array(count);
  const bases = new Float32Array(count * 3);

  const white = new THREE.Color(BLACK_HOLE_COLORS.particleWhite);
  const violet = new THREE.Color(BLACK_HOLE_COLORS.chromaViolet);
  const blue = new THREE.Color(BLACK_HOLE_COLORS.chromaBlue);
  const purple = new THREE.Color(BLACK_HOLE_COLORS.chromaPurple);
  const tempColor = new THREE.Color();

  for (let index = 0; index < count; index += 1) {
    const seed = index + config.id.length * 100;
    const theta = hash1(seed * 1.7) * Math.PI * 2;
    const phi = Math.acos(2 * hash1(seed * 2.3) - 1);
    const radius = radiusMin + hash1(seed * 3.1) * (radiusMax - radiusMin);

    positions[index * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[index * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[index * 3 + 2] = radius * Math.cos(phi);

    const colorMix = hash1(seed * 4.7);
    if (colorMix > 0.75) {
      tempColor.copy(blue);
    } else if (colorMix > 0.5) {
      tempColor.copy(violet);
    } else if (colorMix > 0.28) {
      tempColor.copy(purple);
    } else {
      tempColor.copy(white);
    }

    bases[index * 3] = tempColor.r;
    bases[index * 3 + 1] = tempColor.g;
    bases[index * 3 + 2] = tempColor.b;

    colors[index * 3] = tempColor.r;
    colors[index * 3 + 1] = tempColor.g;
    colors[index * 3 + 2] = tempColor.b;

    phases[index] = hash1(seed * 5.9) * Math.PI * 2;
    speeds[index] = twinkle ? 0.4 + hash1(seed * 6.7) * 1.8 : 0;
  }

  const bufferGeometry = new THREE.BufferGeometry();
  bufferGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positions, 3),
  );
  bufferGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  return {
    geometry: bufferGeometry,
    twinklePhases: phases,
    twinkleSpeeds: speeds,
    baseColors: bases,
    count,
    twinkle,
  };
}

export function Starfield({ config = BLACK_HOLE_STARFIELD_LAYERS[0] }: StarfieldProps) {
  const pointsRef = useRef<THREE.Points>(null);

  const starData = useMemo(
    () => createStarfieldGeometry(config),
    [config],
  );

  useFrame(({ clock }) => {
    const points = pointsRef.current;
    if (!points || !starData.twinkle) {
      return;
    }

    const colorAttribute = points.geometry.getAttribute(
      "color",
    ) as THREE.BufferAttribute;
    const elapsed = clock.getElapsedTime();
    const { count, twinklePhases, twinkleSpeeds, baseColors } = starData;

    for (let index = 0; index < count; index += 1) {
      const twinkle =
        0.35 +
        0.65 *
          Math.sin(elapsed * twinkleSpeeds[index] + twinklePhases[index]) ** 2;
      const colorIndex = index * 3;

      colorAttribute.array[colorIndex] = baseColors[colorIndex] * twinkle;
      colorAttribute.array[colorIndex + 1] =
        baseColors[colorIndex + 1] * twinkle;
      colorAttribute.array[colorIndex + 2] =
        baseColors[colorIndex + 2] * twinkle;
    }

    colorAttribute.needsUpdate = true;
  });

  return (
    <points
      ref={pointsRef}
      geometry={starData.geometry}
      frustumCulled={false}
      renderOrder={config.renderOrder}
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

export function StarfieldLayers() {
  return (
    <>
      {BLACK_HOLE_STARFIELD_LAYERS.map((layer) => (
        <Starfield key={layer.id} config={layer} />
      ))}
    </>
  );
}
