"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

import {
  BLACK_HOLE_COLORS,
  BLACK_HOLE_NEBULA,
} from "@/lib/black-hole.config";

const nebulaVertexShader = /* glsl */ `
  varying vec3 vDirection;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vDirection = normalize(worldPosition.xyz - cameraPosition);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const nebulaFragmentShader = /* glsl */ `
  uniform float uTime;
  uniform vec3 uDeepColor;
  uniform vec3 uMidColor;
  uniform vec3 uBrightColor;
  uniform vec3 uAccentColor;
  uniform float uOpacity;

  varying vec3 vDirection;
  varying vec2 vUv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 3; i++) {
      value += amplitude * noise(p);
      p *= 2.05;
      amplitude *= 0.5;
    }
    return value;
  }

  void main() {
    vec2 sphereUv = vec2(
      atan(vDirection.z, vDirection.x) / 6.2831853 + 0.5,
      asin(clamp(vDirection.y, -1.0, 1.0)) / 3.14159265 + 0.5
    );

    vec2 drift = vec2(uTime * 0.012, uTime * 0.008);
    float cloudA = fbm(sphereUv * 3.2 + drift);
    float cloudB = fbm(sphereUv * 5.8 - drift * 1.4 + 4.2);
    float cloudMix = cloudA * 0.65 + cloudB * 0.35;

    vec3 color = mix(uDeepColor, uMidColor, smoothstep(0.15, 0.55, cloudMix));
    color = mix(color, uBrightColor, smoothstep(0.45, 0.78, cloudMix));
    color = mix(color, uAccentColor, smoothstep(0.72, 0.95, cloudMix) * 0.35);

    float vignette = smoothstep(0.15, 0.95, length(sphereUv - 0.5));
    float alpha = uOpacity * (0.25 + cloudMix * 0.75) * vignette;

    gl_FragColor = vec4(color, alpha);
  }
`;

export function NebulaCloud() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const meshRef = useRef<THREE.Mesh>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uDeepColor: { value: new THREE.Color(BLACK_HOLE_COLORS.nebulaDeep) },
      uMidColor: { value: new THREE.Color(BLACK_HOLE_COLORS.nebulaMid) },
      uBrightColor: { value: new THREE.Color(BLACK_HOLE_COLORS.nebulaBright) },
      uAccentColor: { value: new THREE.Color(BLACK_HOLE_COLORS.nebulaAccent) },
      uOpacity: { value: BLACK_HOLE_NEBULA.opacity },
    }),
    [],
  );

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();

    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = elapsed;
    }

    if (meshRef.current) {
      meshRef.current.rotation.y = elapsed * BLACK_HOLE_NEBULA.rotationSpeed;
      meshRef.current.rotation.x = Math.sin(elapsed * 0.04) * 0.08;
    }
  });

  return (
    <mesh ref={meshRef} renderOrder={-2}>
      <sphereGeometry
        args={[
          BLACK_HOLE_NEBULA.radius,
          BLACK_HOLE_NEBULA.segments,
          BLACK_HOLE_NEBULA.segments,
        ]}
      />
      <shaderMaterial
        ref={materialRef}
        vertexShader={nebulaVertexShader}
        fragmentShader={nebulaFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        side={THREE.BackSide}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}
