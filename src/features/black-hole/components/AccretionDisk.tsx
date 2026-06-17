"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

import {
  BLACK_HOLE_ACCRETION_DISK,
  BLACK_HOLE_COLORS,
  BLACK_HOLE_SINGULARITY,
} from "@/lib/black-hole.config";

const diskVertexShader = /* glsl */ `
  varying vec2 vUv;
  varying float vRadiusT;

  void main() {
    vUv = uv;
    vRadiusT = uv.y;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const diskFragmentShader = /* glsl */ `
  uniform float uTime;
  uniform vec3 uHotColor;
  uniform vec3 uWarmColor;
  uniform vec3 uMidColor;
  uniform vec3 uDeepColor;
  uniform vec3 uColdColor;
  uniform vec3 uBlueColor;
  uniform vec3 uVioletColor;
  uniform float uRingOpacity;

  varying vec2 vUv;
  varying float vRadiusT;

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
    for (int i = 0; i < 5; i++) {
      value += amplitude * noise(p);
      p *= 2.03;
      amplitude *= 0.48;
    }
    return value;
  }

  void main() {
    float angle = vUv.x * 6.28318530718;
    float radiusT = vRadiusT;

    float innerMask = smoothstep(0.0, 0.08, radiusT);
    float outerMask = smoothstep(1.0, 0.72, radiusT);
    float radial = innerMask * outerMask;

    float keplerSpin = uTime / (0.35 + radiusT * 1.8);
    float spin = angle + keplerSpin + radiusT * 6.0;

    vec2 turbCoord = vec2(cos(spin), sin(spin)) * (1.5 + radiusT * 3.5);
    turbCoord += vec2(fbm(vec2(angle * 2.1, radiusT * 4.0 + uTime * 0.04)));

    float turbulence = fbm(turbCoord + uTime * 0.06);
    float filaments = fbm(turbCoord * 2.4 - uTime * 0.09);
    float chaos = fbm(vec2(spin * 0.7, radiusT * 8.0 + uTime * 0.03));

    float coldZone = smoothstep(0.62, 0.28, turbulence);
    float hotZone = smoothstep(0.58, 0.88, filaments) * smoothstep(0.45, 0.95, chaos);
    float warmZone = smoothstep(0.35, 0.72, turbulence) * (1.0 - hotZone * 0.6);

    float doppler = 0.48 + 0.52 * sin(angle + uTime * 0.11 + filaments * 3.0);
    float brightness = radial * doppler * (0.25 + turbulence * 0.55 + hotZone * 0.65);
    brightness *= mix(0.35, 1.0, 1.0 - coldZone * 0.7);

    vec3 color = mix(uColdColor, uDeepColor, smoothstep(0.0, 0.4, brightness));
    color = mix(color, uMidColor, warmZone * radial * 0.85);
    color = mix(color, uVioletColor, warmZone * 0.6);
    color = mix(color, uWarmColor, smoothstep(0.4, 0.75, brightness));
    color = mix(color, uHotColor, hotZone * 0.9);
    color = mix(color, uBlueColor, hotZone * filaments * 0.55);

    float alpha = radial * (0.2 + turbulence * 0.35 + hotZone * 0.45);
    alpha *= smoothstep(1.0, 0.78, radiusT);
    alpha *= 1.0 - coldZone * 0.35;

    gl_FragColor = vec4(color * (0.85 + hotZone * 1.2), alpha * uRingOpacity);
  }
`;

interface AccretionDiskProps {
  rotationSpeed?: number;
}

export function AccretionDisk({ rotationSpeed }: AccretionDiskProps) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const groupRef = useRef<THREE.Group>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uHotColor: { value: new THREE.Color(BLACK_HOLE_COLORS.diskHot) },
      uWarmColor: { value: new THREE.Color(BLACK_HOLE_COLORS.diskWarm) },
      uMidColor: { value: new THREE.Color(BLACK_HOLE_COLORS.diskMid) },
      uDeepColor: { value: new THREE.Color(BLACK_HOLE_COLORS.diskDeep) },
      uColdColor: { value: new THREE.Color(BLACK_HOLE_COLORS.diskCold) },
      uBlueColor: { value: new THREE.Color(BLACK_HOLE_COLORS.chromaBlue) },
      uVioletColor: { value: new THREE.Color(BLACK_HOLE_COLORS.chromaViolet) },
      uRingOpacity: { value: BLACK_HOLE_ACCRETION_DISK.opacity },
    }),
    [],
  );

  const speed =
    rotationSpeed ?? BLACK_HOLE_ACCRETION_DISK.rotationSpeed;

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();

    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = elapsed;
    }

    if (groupRef.current) {
      groupRef.current.rotation.z += speed * 0.0018;
    }
  });

  return (
    <group
      ref={groupRef}
      rotation={[BLACK_HOLE_ACCRETION_DISK.tiltX, 0, 0]}
      scale={BLACK_HOLE_SINGULARITY.scale}
    >
      <mesh renderOrder={1}>
        <ringGeometry
          args={[
            BLACK_HOLE_ACCRETION_DISK.innerRadius,
            BLACK_HOLE_ACCRETION_DISK.outerRadius,
            BLACK_HOLE_ACCRETION_DISK.segments,
            1,
          ]}
        />
        <shaderMaterial
          ref={materialRef}
          vertexShader={diskVertexShader}
          fragmentShader={diskFragmentShader}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}
