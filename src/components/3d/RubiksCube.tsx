'use client';

import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

/* ────────────────────────────────────────────
   Single mini-cube with irradiance and wave physics
   ──────────────────────────────────────────── */
function MiniCube({
  position,
  index,
  totalCount,
  hoveredPosRef,
}: {
  position: [number, number, number];
  index: number;
  totalCount: number;
  hoveredPosRef: React.MutableRefObject<THREE.Vector3 | null>;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const localPos = useMemo(() => new THREE.Vector3(...position), [position]);

  const hue = useMemo(() => {
    const dist = Math.sqrt(
      position[0] ** 2 + position[1] ** 2 + position[2] ** 2
    );
    return (dist / 3.0 + index / totalCount) % 1.0;
  }, [position, index, totalCount]);

  const baseColor = useMemo(() => {
    return new THREE.Color().setHSL(hue, 0.1, 0.15);
  }, [hue]);

  const sheenColor = useMemo(() => {
    return new THREE.Color().setHSL((hue + 0.4) % 1.0, 1.0, 0.5);
  }, [hue]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    
    // Calculate distance from this cube's center to the raycasted hover point
    let dist = 999;
    if (hoveredPosRef.current) {
      dist = localPos.distanceTo(hoveredPosRef.current);
    }
    
    // Wave function: [0.5, 2.5] dist -> [1.0, 0.0] intensity
    const maxDist = 2.8;
    let waveIntensity = 0;
    if (dist < maxDist) {
      waveIntensity = Math.max(0, 1.0 - ((dist - 0.5) / 2.3));
      // Smooth out the falloff
      waveIntensity = THREE.MathUtils.smoothstep(waveIntensity, 0, 1);
    }

    // Apply scaling (presses in up to 30% for nearest)
    const targetScale = 1.0 - (waveIntensity * 0.35);
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 12);
    
    // Apply position translation (sucks into the center up to 30% of its distance)
    const targetPos = new THREE.Vector3(
      position[0] * (1.0 - waveIntensity * 0.3),
      position[1] * (1.0 - waveIntensity * 0.3),
      position[2] * (1.0 - waveIntensity * 0.3)
    );
    meshRef.current.position.lerp(targetPos, delta * 14);
  });

  return (
    <RoundedBox
      ref={meshRef as React.Ref<THREE.Mesh>}
      position={position}
      args={[0.95, 0.95, 0.95]}
      radius={0.04}
      smoothness={2}
      castShadow
      receiveShadow
    >
      <meshPhysicalMaterial
        color={baseColor}
        metalness={0.95}
        roughness={0.12}
        clearcoat={1.0}
        clearcoatRoughness={0.05}
        sheen={1.0}
        sheenRoughness={0.2}
        sheenColor={sheenColor}
        envMapIntensity={1.5}
        reflectivity={1.0}
      />
    </RoundedBox>
  );
}

/* ────────────────────────────────────────────
   Rubik's Cube Group — 3×3×3 = 26 cubes
   ──────────────────────────────────────────── */
export default function RubiksCube() {
  const groupRef = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const hoveredPosRef = useRef<THREE.Vector3 | null>(null);

  const positions = useMemo(() => {
    const pos: [number, number, number][] = [];
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          if (x === 0 && y === 0 && z === 0) continue;
          pos.push([x, y, z]);
        }
      }
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;

    const t = state.clock.getElapsedTime();

    // Track mouse for parallax rotation
    mouse.current.x = THREE.MathUtils.lerp(
      mouse.current.x,
      (state.pointer.x * Math.PI) / 8,
      0.05
    );
    mouse.current.y = THREE.MathUtils.lerp(
      mouse.current.y,
      (state.pointer.y * Math.PI) / 8,
      0.05
    );

    groupRef.current.rotation.y = t * 0.15 + mouse.current.x;
    groupRef.current.rotation.x = Math.sin(t * 0.08) * 0.3 + mouse.current.y;

    const breathe = 1.0 + Math.sin(t * 0.5) * 0.01;
    groupRef.current.scale.setScalar(breathe);
  });

  return (
    <group
      ref={groupRef}
      onPointerMove={(e) => {
        e.stopPropagation();
        if (groupRef.current) {
          // Track exact world intersection and convert to our local rotated space
          // This allows us to find exactly which cubes are closest to the intersection surface
          hoveredPosRef.current = groupRef.current.worldToLocal(e.point.clone());
        }
      }}
      onPointerLeave={() => {
        hoveredPosRef.current = null;
      }}
    >
      {positions.map((pos, i) => (
        <MiniCube
          key={i}
          position={pos}
          index={i}
          totalCount={positions.length}
          hoveredPosRef={hoveredPosRef}
        />
      ))}
    </group>
  );
}
