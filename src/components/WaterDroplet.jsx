// src/components/WaterDroplet.jsx
import * as THREE from "three";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function WaterDroplet() {
  const mesh = useRef();

  // Animate the droplet
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    mesh.current.morphTargetInfluences[0] = (Math.sin(t * 2) + 1) / 2;
  });

  // Create geometry with morph targets
  const geometry = new THREE.IcosahedronGeometry(1, 5);
  const sphere = geometry.clone();
  const distorted = geometry.clone();

  // Apply "droplet wobble" distortion
  distorted.attributes.position.array = distorted.attributes.position.array.map(
    (v, i) => v + 0.25 * Math.sin(i * 0.5)
  );

  geometry.morphAttributes.position = [distorted.attributes.position];

  return (
    <mesh ref={mesh} geometry={geometry}>
      <meshPhysicalMaterial
        color={"#00bfff"}
        metalness={0.1}
        roughness={0.05}
        transmission={1} // makes it glassy
        thickness={0.8}
        clearcoat={1}
        clearcoatRoughness={0}
      />
    </mesh>
  );
}
