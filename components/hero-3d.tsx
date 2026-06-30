'use client';

import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Icosahedron, Points, PointMaterial, MeshDistortMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

// ─── Brand colours ──────────────────────────────────────────────────
const CYAN   = '#00D4FF';
const PURPLE = '#6C63FF';

// ─── Mouse-follow rig — gently parallaxes the whole scene ────────────
function Rig({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  useFrame((_, delta) => {
    if (!group.current) return;
    // ease group toward a small offset based on cursor position
    const targetX = pointer.y * 0.18;
    const targetY = pointer.x * 0.35;
    group.current.rotation.x += (targetX - group.current.rotation.x) * Math.min(1, delta * 2.5);
    group.current.rotation.y += (targetY - group.current.rotation.y) * Math.min(1, delta * 2.5);
  });

  return <group ref={group}>{children}</group>;
}

// ─── The central AI "core" — distorted glowing sphere ────────────────
function Core() {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.getElapsedTime();
    mesh.current.rotation.y = t * 0.18;
    mesh.current.rotation.z = t * 0.06;
  });

  return (
    <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh ref={mesh} scale={0.95}>
        <icosahedronGeometry args={[1, 12]} />
        <MeshDistortMaterial
          color={PURPLE}
          emissive={CYAN}
          emissiveIntensity={0.3}
          roughness={0.2}
          metalness={0.85}
          distort={0.3}
          speed={1.6}
          transparent
          opacity={0.78}
        />
      </mesh>
    </Float>
  );
}

// ─── Wireframe shell around the core ─────────────────────────────────
function WireShell() {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.getElapsedTime();
    mesh.current.rotation.x = t * -0.12;
    mesh.current.rotation.y = t * 0.16;
  });

  return (
    <Icosahedron ref={mesh} args={[2.15, 1]}>
      <meshBasicMaterial color={CYAN} wireframe transparent opacity={0.18} />
    </Icosahedron>
  );
}

// ─── Orbiting particle field ─────────────────────────────────────────
function ParticleField() {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const count = 900;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // distribute points in a spherical shell
      const r = 3.2 + Math.random() * 3.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.04;
    ref.current.rotation.x += delta * 0.01;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={CYAN}
        size={0.035}
        sizeAttenuation
        depthWrite={false}
        opacity={0.7}
      />
    </Points>
  );
}

// ─── Full scene ──────────────────────────────────────────────────────
export default function Hero3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 45 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ pointerEvents: 'none' }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={2.2} color={CYAN} />
        <pointLight position={[-5, -3, 2]} intensity={1.6} color={PURPLE} />
        <Rig>
          <Core />
          <WireShell />
          <ParticleField />
        </Rig>
      </Suspense>
    </Canvas>
  );
}
