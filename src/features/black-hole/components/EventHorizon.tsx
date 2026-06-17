"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

import {
  BLACK_HOLE_COLORS,
  BLACK_HOLE_SINGULARITY,
} from "@/lib/black-hole.config";

const lensVertexShader = /* glsl */ `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const lensFragmentShader = /* glsl */ `
  uniform float uTime;
  uniform vec3 uPhotonColor;
  uniform vec3 uPurple;
  uniform vec3 uViolet;
  uniform vec3 uBlue;
  uniform float uRingOpacity;

  varying vec2 vUv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
      f.y
    );
  }

  void main() {
    float angle = vUv.x * 6.28318530718;
    float radiusT = vUv.y;

    float warp = noise(vec2(angle * 5.0 + uTime * 0.05, radiusT * 12.0)) * 0.12;
    float warpedR = radiusT + warp;

    float photonLine = exp(-pow((warpedR - 0.06) * 28.0, 2.0));
    float lensBand = smoothstep(0.55, 0.08, warpedR) * smoothstep(0.0, 0.15, warpedR);
    float distortion = noise(vec2(angle * 8.0, warpedR * 6.0 - uTime * 0.08));
    lensBand *= 0.35 + distortion * 0.65;

    float chromaPhase = angle + uTime * 0.14 + distortion * 4.0;
    vec3 rimColor = uPurple * (0.5 + 0.5 * sin(chromaPhase));
    rimColor += uViolet * (0.5 + 0.5 * sin(chromaPhase + 2.094));
    rimColor += uBlue * (0.5 + 0.5 * sin(chromaPhase + 4.188));

    vec3 color = rimColor * lensBand * 0.45;
    color += uPhotonColor * photonLine * (1.2 + distortion * 0.4);

    float alpha = lensBand * 0.5 + photonLine * 0.95;
    alpha *= smoothstep(1.0, 0.82, radiusT);

    gl_FragColor = vec4(color, alpha * uRingOpacity);
  }
`;

export function EventHorizon() {
  const lensMaterialRef = useRef<THREE.ShaderMaterial>(null);
  const groupRef = useRef<THREE.Group>(null);

  const lensUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPhotonColor: { value: new THREE.Color(BLACK_HOLE_COLORS.photonRing) },
      uPurple: { value: new THREE.Color(BLACK_HOLE_COLORS.chromaPurple) },
      uViolet: { value: new THREE.Color(BLACK_HOLE_COLORS.chromaViolet) },
      uBlue: { value: new THREE.Color(BLACK_HOLE_COLORS.chromaBlue) },
      uRingOpacity: { value: BLACK_HOLE_SINGULARITY.ringOpacity },
    }),
    [],
  );

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();

    if (lensMaterialRef.current) {
      lensMaterialRef.current.uniforms.uTime.value = elapsed;
    }

    if (groupRef.current) {
      groupRef.current.rotation.z = Math.sin(elapsed * 0.04) * 0.015;
    }
  });

  return (
    <group
      ref={groupRef}
      rotation={[1.28, 0, 0]}
      scale={BLACK_HOLE_SINGULARITY.scale}
    >
      {BLACK_HOLE_SINGULARITY.showLensRing && (
        <mesh renderOrder={2}>
          <ringGeometry
            args={[
              BLACK_HOLE_SINGULARITY.lensInnerRadius,
              BLACK_HOLE_SINGULARITY.lensOuterRadius,
              96,
              1,
            ]}
          />
          <shaderMaterial
            ref={lensMaterialRef}
            vertexShader={lensVertexShader}
            fragmentShader={lensFragmentShader}
            uniforms={lensUniforms}
            transparent
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}

      <mesh renderOrder={12}>
        <sphereGeometry
          args={[BLACK_HOLE_SINGULARITY.coreRadius, 64, 64]}
        />
        <meshBasicMaterial
          color={BLACK_HOLE_COLORS.singularity}
          depthWrite
          depthTest
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}
