import React, { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, MeshTransmissionMaterial } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

/** Internal glowing point for each droplet */
function InnerGlow({ position }) {
  const light = useRef();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (light.current) {
      light.current.position.set(
        position[0] + Math.sin(t * 0.5) * 0.3,
        position[1] + Math.cos(t * 0.7) * 0.2,
        position[2] + Math.cos(t * 0.4) * 0.3
      );
    }
  });
  return (
    <pointLight
      ref={light}
      color="#00ffff" // Bright cyan glow
      intensity={100}
      distance={1.5}
      decay={2}
    />
  );
}

/** Individual droplet mesh */
function DropletMesh({ position }) {
  const meshRef = useRef();
  const { mouse, viewport } = useThree();

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    const targetRotY = mouse.x * 0.4 + position[0] * 0.1;
    const targetRotX = -mouse.y * 0.3 + position[1] * 0.1;
    meshRef.current.rotation.y += (targetRotY - meshRef.current.rotation.y) * 0.05;
    meshRef.current.rotation.x += (targetRotX - meshRef.current.rotation.x) * 0.05;
    const s = 1 + Math.sin(t * 0.6 + position[2]) * 0.02;
    meshRef.current.scale.set(1.2 * s, 1.2 * s, 1.2 * s);
  });

  return (
    <mesh ref={meshRef} position={position}>
      <icosahedronGeometry args={[0.8, 64]} /> {/* Smaller size, high subdivisions */}
      <MeshTransmissionMaterial
        resolution={1024}
        samples={10}
        thickness={1.2}
        roughness={0.1}
        transmission={1}
        ior={1.4}
        chromaticAberration={0.03}
        anisotropy={0.1}
        distortion={0.2}
        distortionScale={0.3}
        temporalDistortion={0.4}
        color="#00aaff" // Blue color with glow
        metalness={0.2}
        reflectivity={1.0}
        clearcoat={1.0}
        clearcoatRoughness={0.05}
      />
      <InnerGlow position={position} />
    </mesh>
  );
}

/** Canvas with multiple droplets */
export default function MultipleDroplets({ className = "" }) {
  const dropletPositions = [
    [0, 0, 0],
    [1.5, 1, -1],
    [-1.5, -1, 1],
  ]; // Positions for three droplets

  return (
    <div className={`w-full h-[400px] ${className}`}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        {/* Background gradient effect */}
        <color attach="background" args={["#1a0033"]} />
        <ambientLight intensity={0.3} />
        <directionalLight position={[3, 4, 5]} intensity={1.2} color="#7c4dff" />
        <directionalLight position={[-4, -2, -3]} intensity={0.8} color="#00aaff" />

        {/* Render multiple droplets */}
        {dropletPositions.map((pos, index) => (
          <DropletMesh key={index} position={pos} />
        ))}

        <Environment preset="night" background={false} />
        <EffectComposer>
          <Bloom
            mipmapBlur
            intensity={1.5}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.1}
            radius={1.0}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}