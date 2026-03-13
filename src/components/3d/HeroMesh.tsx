"use client";
import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function MorphingMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { pointer, viewport } = useThree();
  const isTouchDevice =
    typeof window !== "undefined" &&
    window.matchMedia("(hover: none)").matches;

  useFrame((state) => {
    if (!meshRef.current) return;
    if (isTouchDevice) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    } else {
      meshRef.current.rotation.x =
        state.clock.elapsedTime * 0.1 + pointer.y * 0.3;
      meshRef.current.rotation.y =
        state.clock.elapsedTime * 0.15 + pointer.x * 0.3;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef} scale={viewport.width > 10 ? 2.5 : 1.8}>
        <icosahedronGeometry args={[1, 4]} />
        <MeshDistortMaterial
          color="#22D3EE"
          wireframe
          distort={0.3}
          speed={2}
          transparent
          opacity={0.6}
        />
      </mesh>
      <mesh scale={viewport.width > 10 ? 2 : 1.4}>
        <icosahedronGeometry args={[1, 4]} />
        <MeshDistortMaterial
          color="#22D3EE"
          distort={0.2}
          speed={1.5}
          transparent
          opacity={0.08}
        />
      </mesh>
    </Float>
  );
}

export default function HeroMesh() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      className="absolute inset-0"
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#22D3EE" />
      <MorphingMesh />
    </Canvas>
  );
}
