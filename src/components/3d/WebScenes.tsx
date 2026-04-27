'use client';

import { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Environment, MeshTransmissionMaterial, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import RubiksCube from './RubiksCube';

// PREMIUM GOS_LEND: Elegant Opening Glass Pill
export function GosLendScene({ isHovered, clickSignal }: { isHovered: boolean; clickSignal: number }) {
  const groupRef = useRef<THREE.Group>(null);
  
  const topHalfRef = useRef<THREE.Group>(null);
  const bottomHalfRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const pedestalRef = useRef<THREE.Mesh>(null);
  const satsRef = useRef<THREE.Mesh[]>([]);

  // Damped state for buttery smooth transitions (no sharp snaps)
  const isOpened = useRef(false);
  const openProgress = useRef(0);
  const targetSpeed = useRef(1);

  // Generate background satellite capsules swarm
  const numSats = 12;
  const satData = useMemo(() => {
    const data = [];
    for (let i = 0; i < numSats; i++) {
      data.push({
        radius: 2.2 + Math.random() * 3.0, // spread between 2.2 to 5.2
        speed: 0.2 + Math.random() * 0.4,
        offset: Math.random() * Math.PI * 2,
        yDir: Math.random() > 0.5 ? 1 : -1,
        yAmplitude: 1.0 + Math.random() * 2.5,
        spinSpeedX: (Math.random() - 0.5) * 2,
        spinSpeedY: (Math.random() - 0.5) * 2,
        spinSpeedZ: (Math.random() - 0.5) * 2,
        scale: 0.2 + Math.random() * 0.6, // varies from very small to mid-sized
      });
    }
    return data;
  }, []);

  // Generate perfect half-pill cup geometry
  const halfPillGeo = useMemo(() => {
    const points = [];
    const radius = 0.7;
    const height = 0.6;
    for (let i = 0; i <= 32; i++) {
      const angle = (i / 32) * (Math.PI / 2);
      points.push(new THREE.Vector2(Math.sin(angle) * radius, height + Math.cos(angle) * radius));
    }
    points.push(new THREE.Vector2(radius, 0));
    points.push(new THREE.Vector2(0, 0));
    return new THREE.LatheGeometry(points, 64);
  }, []);

  // Elegant, perfect geometric primitives (No strange polyhedrons)
  const coreGeo = useMemo(() => new THREE.SphereGeometry(0.3, 64, 64), []);
  const satGeo = useMemo(() => new THREE.CapsuleGeometry(0.3, 0.5, 32, 64), []);
  const pedestalGeo = useMemo(() => new THREE.CylinderGeometry(0.25, 0.25, 0.4, 32), []);

  useEffect(() => {
    if (clickSignal > 0) {
      // Toggle open/close state gracefully
      isOpened.current = !isOpened.current;
    }
  }, [clickSignal]);

  useFrame((state, delta) => {
    // Elegant Spring/Damp interpolation for opening (NO TWITCHING)
    openProgress.current = THREE.MathUtils.damp(openProgress.current, isOpened.current ? 1 : 0, 3, delta);
    targetSpeed.current = THREE.MathUtils.damp(targetSpeed.current, isHovered ? 2 : 0.5, 4, delta);

    // Global rotation - flawless and smooth
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2 * targetSpeed.current;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      
      // Pull gently forward while opening
      groupRef.current.position.z = THREE.MathUtils.damp(groupRef.current.position.z, openProgress.current * 1.5, 3, delta);
    }

    // Top Half glides cleanly upward with a mechanical THREADING TWIST
    if (topHalfRef.current) {
      topHalfRef.current.position.y = openProgress.current * 1.35;
      topHalfRef.current.rotation.y = openProgress.current * (Math.PI / 1.5); // elegant magnetic screw unthreading
    }

    // The dark titanium pedestal stabilizes the scene
    if (pedestalRef.current) {
      // Pedestal sinks very slightly when activated
      pedestalRef.current.position.y = -0.15 - (openProgress.current * 0.1);
    }

    // The core gracefully ascends OFF the pedestal and expands slightly, shedding blinding light
    if (coreRef.current) {
      // Rises from resting on the pedestal (y=0.15) up into the center of the gap (y=0.7)
      coreRef.current.position.y = 0.15 + (openProgress.current * 0.55);
      coreRef.current.scale.setScalar(1 + openProgress.current * 0.4);

      const mat = coreRef.current.material as THREE.MeshPhysicalMaterial;
      if (mat) {
        // Deep elegant pulse when closed, absolute blinding neon flare when open
        const idlePulse = 0.3 + (Math.sin(state.clock.elapsedTime * 2.5) * 0.15);
        const targetGlow = isOpened.current ? 8.0 : idlePulse;
        mat.emissiveIntensity = THREE.MathUtils.damp(mat.emissiveIntensity, targetGlow, 4, delta);
      }
    }

    // Satellites gently drift in a majestic orbital swarm
    const t = state.clock.elapsedTime;
    const expand = openProgress.current * 1.5;

    satsRef.current.forEach((mesh, i) => {
      if (!mesh) return;
      const data = satData[i];
      const r = data.radius + expand;
      
      mesh.position.set(
        Math.cos(t * data.speed + data.offset) * r,
        Math.sin(t * data.speed * data.yDir + data.offset) * data.yAmplitude,
        Math.sin(t * data.speed + data.offset) * r - 1.0
      );
      
      mesh.rotation.x = t * data.spinSpeedX;
      mesh.rotation.y = t * data.spinSpeedY;
      mesh.rotation.z = t * data.spinSpeedZ;
      mesh.scale.setScalar(data.scale);
    });
  });

  return (
    <>
      <ambientLight intensity={1.5} color="#ffffff" />
      <directionalLight position={[5, 10, 5]} intensity={3.0} color="#ffffff" />
      <spotLight position={[-5, -5, 5]} intensity={2.0} color="#86efac" />
      <pointLight position={[0, 0, 0]} intensity={5} color="#a7f3d0" distance={8} />
      
      <group ref={groupRef}>
        <Environment preset="city" />

        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          {/* Top Half */}
          <group ref={topHalfRef}>
            <mesh geometry={halfPillGeo}>
              <MeshTransmissionMaterial
                backside={true}
                samples={8}
                thickness={3}
                roughness={0.02}
                clearcoat={1}
                transmission={1}
                ior={1.45}
                chromaticAberration={0.05}
                color="#ffffff"
              />
            </mesh>
          </group>

          {/* Bottom Half */}
          <group ref={bottomHalfRef} rotation={[Math.PI, 0, 0]}>
            <mesh geometry={halfPillGeo}>
              <MeshTransmissionMaterial
                backside={true}
                samples={8}
                thickness={3}
                roughness={0.02}
                clearcoat={1}
                transmission={1}
                ior={1.45}
                chromaticAberration={0.05}
                color="#ffffff"
              />
            </mesh>
          </group>

          {/* Glowing Perfect Orb Core */}
          <mesh ref={coreRef} geometry={coreGeo}>
            <meshPhysicalMaterial 
              color="#a7f3d0" 
              emissive="#10b981" 
              emissiveIntensity={0.2} 
              metalness={0.8}
              roughness={0.05}
              clearcoat={1.0}
            />
          </mesh>

          {/* Premium Dark Titanium Pedestal */}
          <mesh ref={pedestalRef} geometry={pedestalGeo}>
            <meshStandardMaterial 
              color="#050505" 
              metalness={1.0} 
              roughness={0.15} 
            />
          </mesh>
        </Float>

        {/* Orbiting Satellite Pills Swarm */}
        {satData.map((data, i) => (
          <mesh key={i} ref={(el) => { if(el) satsRef.current[i] = el; }} geometry={satGeo}>
            <MeshTransmissionMaterial 
              backside={true} 
              samples={4} 
              thickness={1.0} 
              roughness={0.05} 
              clearcoat={1} 
              transmission={1} 
              ior={1.45} 
              color="#ffffff" 
            />
          </mesh>
        ))}

      </group>

      {/* Cinematic Grounding Shadows (Apple Style) */}
      <ContactShadows position={[0, -3.0, 0]} opacity={0.6} scale={15} blur={2.5} far={5} color="#000000" />
    </>
  );
}

// PREMIUM ASP: The Acoustic Eradication Halo
export function AspScene({ isHovered, clickSignal }: { isHovered: boolean; clickSignal: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const blocksRef = useRef<THREE.Mesh[]>([]);
  
  const speed = useRef(1);
  
  // Damped state for flawless kinematics
  const isActive = useRef(false);
  const shiftProgress = useRef(0);

  useEffect(() => {
    if (clickSignal > 0) {
      isActive.current = !isActive.current;
    }
  }, [clickSignal]);

  const count = 36;
  const blockData = useMemo(() => {
    const data = [];
    for (let i = 0; i < count; i++) {
      // Distribute evenly around the circle
      const angle = (i / count) * Math.PI * 2;
      data.push({ angle });
    }
    return data;
  }, []);

  useFrame((state, delta) => {
    // Elegant dampening
    shiftProgress.current = THREE.MathUtils.damp(shiftProgress.current, isActive.current ? 1 : 0, 3, delta);
    
    // Bullet time when active
    const targetSpeed = isActive.current ? 0.3 : (isHovered ? 2.5 : 0.6);
    speed.current = THREE.MathUtils.damp(speed.current, targetSpeed, 3, delta);

    // Global flawless rotation
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2 * speed.current;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.15;
      groupRef.current.rotation.z -= delta * 0.1 * speed.current;
      
      // Slight scale pop
      const breath = 0.8 + Math.sin(state.clock.elapsedTime * 2) * 0.02 + (shiftProgress.current * 0.1);
      groupRef.current.scale.setScalar(breath);
    }

    // Mathematically perfect mechanical segment expansion
    blocksRef.current.forEach((mesh, i) => {
      if (!mesh) return;
      const data = blockData[i];
      
      // Radius smoothly expands outwards
      const radius = 1.4 + (shiftProgress.current * 1.5);
      
      mesh.position.x = Math.cos(data.angle) * radius;
      mesh.position.y = Math.sin(data.angle) * radius;
      
      // Deep mechanical interlocking (alternate segments push forward/backward)
      mesh.position.z = shiftProgress.current * (i % 2 === 0 ? 0.4 : -0.4);
      
      // When closed, they form a solid ring. When open, they pivot elegantly to expose their inner faces!
      mesh.rotation.z = data.angle;
      mesh.rotation.y = shiftProgress.current * (Math.PI / 2);
      mesh.rotation.x = shiftProgress.current * (Math.PI / 4);
    });

    // The blazing eradication core scales up and sheds intense light
    if (coreRef.current) {
      // Extremely satisfying smooth scale growth
      coreRef.current.scale.setScalar(0.01 + shiftProgress.current * 1.0);
      
      const mat = coreRef.current.material as THREE.MeshPhysicalMaterial;
      if (mat) {
         mat.emissiveIntensity = THREE.MathUtils.damp(mat.emissiveIntensity, isActive.current ? 6.0 : 0.0, 4, delta);
      }
    }
  });

  return (
    <>
      <ambientLight intensity={1.5} color="#ffffff" />
      <directionalLight position={[0, 10, -5]} intensity={5} color="#ffffff" />
      <pointLight position={[0, 0, 0]} intensity={3} color="#a7f3d0" distance={8} />
      <Environment preset="city" />
      
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <group ref={groupRef}>
          {/* Formidably dark titanium ring segments */}
          {blockData.map((data, i) => (
            <mesh 
              key={i} 
              ref={(el) => { if (el) blocksRef.current[i] = el; }}
            >
              {/* x=thickness, y=arc length to make it seamless, z=depth */}
              <boxGeometry args={[0.15, 0.25, 0.4]} />
              <meshStandardMaterial 
                color="#050505" 
                metalness={1.0} 
                roughness={0.15} 
              />
            </mesh>
          ))}

          {/* Hidden Sonic Core */}
          <mesh ref={coreRef}>
            <sphereGeometry args={[0.8, 64, 64]} />
            <meshPhysicalMaterial 
              color="#34d399" 
              emissive="#10b981" 
              emissiveIntensity={0} 
              roughness={0.1}
              metalness={0.5}
            />
          </mesh>
        </group>
      </Float>

      {/* Cinematic Grounding Shadows (Apple Style) */}
      <ContactShadows position={[0, -2.5, 0]} opacity={0.7} scale={15} blur={2.5} far={5} color="#000000" />
    </>
  );
}

// PREMIUM PORTFOLIO: High-End Kinematic Armillary Sphere containing Rubik
export function PortfolioScene({ isHovered, clickSignal }: { isHovered: boolean; clickSignal: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);
  const ring3 = useRef<THREE.Mesh>(null);
  
  const speed = useRef(1);
  
  // Damped lock-in state 
  const isLocked = useRef(false);
  const lockProgress = useRef(0);

  useEffect(() => {
    if (clickSignal > 0) {
      isLocked.current = !isLocked.current;
    }
  }, [clickSignal]);

  useFrame((state, delta) => {
    // Extremely smooth spring/damp to target (slower lambda = 2.0 for buttery feel)
    lockProgress.current = THREE.MathUtils.damp(lockProgress.current, isLocked.current ? 1 : 0, 2.0, delta);
    
    // During lock, speed drops to an elegant "bullet-time" slow motion
    const targetSpeed = isLocked.current ? 0.3 : (isHovered ? 2.5 : 0.6);
    speed.current = THREE.MathUtils.damp(speed.current, targetSpeed, 3, delta);
    
    // Scale breathes slightly. When locked, the whole structure pulls closer.
    const baseScale = 0.55 + (Math.sin(state.clock.elapsedTime * 2) * 0.02) + (lockProgress.current * 0.1); 

    if (groupRef.current) {
      groupRef.current.scale.setScalar(baseScale);
      groupRef.current.position.z = THREE.MathUtils.damp(groupRef.current.position.z, lockProgress.current * 0.5, 2, delta);
    }
    
    // Constant rotation that NEVER jumps or rewinds, ensuring 100% buttery smoothness
    if (ring1.current) {
      ring1.current.rotation.x += delta * 0.4 * speed.current;
      ring1.current.rotation.y += delta * 0.2 * speed.current;
      // Outer glass ring expands drastically
      ring1.current.scale.setScalar(1 + lockProgress.current * 0.3);
    }
    
    if (ring2.current) {
      ring2.current.rotation.x -= delta * 0.3 * speed.current;
      ring2.current.rotation.y += delta * 0.5 * speed.current;
      // Titanium middle ring stays stable but pushes forward
      ring2.current.position.z = lockProgress.current * 0.8;
      ring2.current.scale.setScalar(1 + lockProgress.current * 0.1);
    }
    
    if (ring3.current) {
      ring3.current.rotation.x = Math.PI / 2;
      ring3.current.rotation.y = Math.PI / 4;
      ring3.current.rotation.z += delta * 0.8 * speed.current;
      
      // Inner neon ring shrinks to tightly hug the core
      ring3.current.scale.setScalar(1 - lockProgress.current * 0.3);
      
      const mat = ring3.current.material as THREE.MeshPhysicalMaterial;
      if (mat) {
         // Blinding acid yellow flare on lock-in
         mat.emissiveIntensity = THREE.MathUtils.damp(mat.emissiveIntensity, isLocked.current ? 8.0 : 0.5, 3, delta);
      }
    }
  });

  return (
    <group position={[0, 0, 0]}>
      <ambientLight intensity={1.5} color="#ffffff" />
      <pointLight position={[-4, 3, 2]} intensity={5} color="#ffffff" distance={15} />
      <pointLight position={[4, -3, -2]} intensity={5} color="#93c5fd" distance={15} />
      <Environment preset="city" />
      
      {/* Target Rubiks Hub */}
      <group ref={groupRef}>
        <RubiksCube />
      </group>
      
      {/* Premium Kinematic Gyroscope */}
      <group>
        {/* Outer Ring: Flawless Thick Optical Glass */}
        <mesh ref={ring1}>
          <torusGeometry args={[3.8, 0.12, 64, 128]} />
          <MeshTransmissionMaterial 
            backside={true} 
            samples={8} 
            thickness={1.5} 
            roughness={0.02} 
            ior={1.45} 
            chromaticAberration={0.15} 
            color="#ffffff" 
          />
        </mesh>
        
        {/* Middle Ring: Heavy Dark Titanium */}
        <mesh ref={ring2}>
          <torusGeometry args={[3.2, 0.05, 32, 128]} />
          <meshStandardMaterial color="#050505" metalness={1.0} roughness={0.15} />
        </mesh>

        {/* Inner Ring: Acid-Neon Energy Orbit */}
        <mesh ref={ring3}>
          <torusGeometry args={[2.6, 0.02, 16, 128]} />
          <meshPhysicalMaterial 
            color="#CCFF00" 
            emissive="#b3e600" 
            emissiveIntensity={0.5} 
            roughness={0.2} 
            metalness={0.8} 
          />
        </mesh>
      </group>
      
      {/* Cinematic Grounding Shadows (Apple Style) */}
      <ContactShadows position={[0, -4.5, 0]} opacity={0.5} scale={20} blur={3.0} far={6} color="#000000" />
    </group>
  );
}

// PREMIUM KOMEGA: Industrial PLC Controller Constellation
export function KomegaScene({ isHovered, clickSignal }: { isHovered: boolean; clickSignal: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const modulesRef = useRef<THREE.Mesh[]>([]);
  const screenRef = useRef<THREE.Mesh>(null);

  const speed = useRef(1);
  const isActive = useRef(false);
  const activeProgress = useRef(0);

  useEffect(() => {
    if (clickSignal > 0) {
      isActive.current = !isActive.current;
    }
  }, [clickSignal]);

  const moduleCount = 8;
  const moduleData = useMemo(() => {
    const data = [];
    for (let i = 0; i < moduleCount; i++) {
      const angle = (i / moduleCount) * Math.PI * 2;
      data.push({
        angle,
        radius: 2.0 + Math.random() * 0.8,
        yOffset: (Math.random() - 0.5) * 1.5,
        rotSpeed: 0.2 + Math.random() * 0.3,
        scale: 0.3 + Math.random() * 0.4,
      });
    }
    return data;
  }, []);

  useFrame((state, delta) => {
    activeProgress.current = THREE.MathUtils.damp(
      activeProgress.current,
      isActive.current ? 1 : 0,
      3,
      delta
    );

    const targetSpeed = isActive.current ? 0.4 : isHovered ? 2.0 : 0.5;
    speed.current = THREE.MathUtils.damp(speed.current, targetSpeed, 3, delta);

    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.25 * speed.current;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.08;
    }

    // Core PLC box — elegant slow rotation with slight levitation
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.15 * speed.current;
      coreRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.1;
    }

    // HMI Screen glow
    if (screenRef.current) {
      const mat = screenRef.current.material as THREE.MeshPhysicalMaterial;
      if (mat) {
        const pulse = 1.5 + Math.sin(state.clock.elapsedTime * 3) * 0.5;
        mat.emissiveIntensity = THREE.MathUtils.damp(
          mat.emissiveIntensity,
          isActive.current ? 6.0 : pulse,
          4,
          delta
        );
      }
    }

    // Orbiting satellite modules
    const t = state.clock.elapsedTime;
    const expand = activeProgress.current * 1.2;

    modulesRef.current.forEach((mesh, i) => {
      if (!mesh) return;
      const data = moduleData[i];
      const r = data.radius + expand;

      mesh.position.x = Math.cos(t * data.rotSpeed + data.angle) * r;
      mesh.position.y = data.yOffset + Math.sin(t * data.rotSpeed * 0.7) * 0.3;
      mesh.position.z = Math.sin(t * data.rotSpeed + data.angle) * r;

      mesh.rotation.x = t * 0.3;
      mesh.rotation.z = t * 0.2;
      mesh.scale.setScalar(data.scale);
    });
  });

  return (
    <>
      <ambientLight intensity={1.5} color="#ffffff" />
      <directionalLight position={[5, 8, 5]} intensity={4.0} color="#ffffff" />
      <spotLight position={[-3, -5, 5]} intensity={2.0} color="#60a5fa" />
      <pointLight position={[0, 0, 0]} intensity={3} color="#38bdf8" distance={8} />
      <Environment preset="city" />

      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.4}>
        <group ref={groupRef}>
          {/* Main PLC Body — dark industrial box */}
          <mesh ref={coreRef}>
            <boxGeometry args={[1.2, 1.8, 0.6]} />
            <meshStandardMaterial
              color="#0a0a0a"
              metalness={0.95}
              roughness={0.12}
            />
          </mesh>

          {/* HMI Display Screen */}
          <mesh ref={screenRef} position={[0, 0.2, 0.31]}>
            <planeGeometry args={[0.8, 0.5]} />
            <meshPhysicalMaterial
              color="#0ea5e9"
              emissive="#0284c7"
              emissiveIntensity={1.5}
              roughness={0.1}
              metalness={0.3}
            />
          </mesh>

          {/* Terminal Strip — bottom accent */}
          <mesh position={[0, -0.7, 0.31]}>
            <boxGeometry args={[1.0, 0.15, 0.05]} />
            <meshStandardMaterial
              color="#22c55e"
              emissive="#16a34a"
              emissiveIntensity={0.5}
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>

          {/* Orbiting IO Modules */}
          {moduleData.map((_, i) => (
            <mesh
              key={i}
              ref={(el) => {
                if (el) modulesRef.current[i] = el;
              }}
            >
              <boxGeometry args={[0.5, 0.7, 0.25]} />
              <meshStandardMaterial
                color="#111111"
                metalness={0.9}
                roughness={0.15}
              />
            </mesh>
          ))}
        </group>
      </Float>

      <ContactShadows
        position={[0, -3.0, 0]}
        opacity={0.6}
        scale={15}
        blur={2.5}
        far={5}
        color="#000000"
      />
    </>
  );
}
