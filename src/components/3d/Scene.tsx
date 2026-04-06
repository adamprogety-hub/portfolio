'use client';

import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import { Suspense } from 'react';
import RubiksCube from './RubiksCube';

export default function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 45 }}
      style={{
        width: '100%',
        height: '100%',
        background: 'transparent',
      }}
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 2]}
    >
      <Suspense fallback={null}>
        {/* Ambient fill */}
        <ambientLight intensity={0.3} />

        {/* Key light — cool white from top-right */}
        <directionalLight
          position={[5, 5, 5]}
          intensity={1.2}
          color="#ffffff"
        />

        {/* Accent lights for the iridescent gradient reflections */}
        <pointLight position={[-4, 3, 2]} intensity={3} color="#CCFF00" distance={15} />
        <pointLight position={[4, -3, 2]} intensity={2.5} color="#FF00FF" distance={15} />
        <pointLight position={[0, 4, -3]} intensity={2} color="#00FFFF" distance={15} />

        {/* HDRI environment for realistic metallic reflections */}
        <Environment preset="city" environmentIntensity={0.6} />

        <RubiksCube />
      </Suspense>
    </Canvas>
  );
}
