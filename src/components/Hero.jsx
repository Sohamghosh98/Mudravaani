import React, { useRef, useState } from "react";
import WordParticles from "./TextParticles"

import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import * as THREE from "three";
import { useNavigate } from "react-router-dom";

const tags = [
  "AI",
  "Machine Learning",
  "Computer Vision",
  "Sign Language Recognition",
  "Speech Synthesis",
  "Text-to-Speech",
  "Accessibility",
  "Inclusive Design",
  "Realtime Translation",
  "Gesture Detection",
  "Deep Learning",
  "Web & Interactive",
  "Responsive",
  "3D",
  "UI Design",
  "Next.js",
  "WebGL",
  "Three.js",
  "Tailwind",
];

function DropletMesh({ onClick }) {
  const meshRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    meshRef.current.rotation.y = t * 0.3;
    meshRef.current.rotation.x = Math.sin(t * 0.2) * 0.2;
  });

  return (
    <mesh ref={meshRef} onClick={onClick} className="cursor-pointer">
      <icosahedronGeometry args={[1.5, 64]} />
      <meshPhysicalMaterial
        color={"#8888ff"}
        metalness={1}
        roughness={0.2}
        transmission={0.95}
        thickness={1.5}
        clearcoat={1}
        clearcoatRoughness={0.05}
        reflectivity={1}
        envMapIntensity={1.2}
        displacementMap={new THREE.TextureLoader().load(
          "https://threejs.org/examples/textures/water/Water_1_M_Normal.jpg"
        )}
        displacementScale={0.4}
        normalMap={new THREE.TextureLoader().load(
          "https://threejs.org/examples/textures/water/Water_2_M_Normal.jpg"
        )}
      />
    </mesh>
  );
}

export default function Hero() {
  const ref = useRef(null);
  const navigate = useNavigate();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.6]);

  const handleClick = () => {
    setIsTransitioning(true);
  };

  const handleFadeComplete = () => {
    navigate("/ai-model");
  };

  return (
    <section
      ref={ref}
      className="relative min-h-[95vh] overflow-hidden flex items-center"
    >
      {/* Background glow */}
      <motion.div
        style={{ y, scale, opacity }}
        className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_35%,rgba(63,162,255,0.25),transparent_60%)]"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-28 pb-24 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* LEFT */}
          <div className="max-w-3xl">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-semibold tracking-tight leading-[1.05]"
            >
              MudraVaani
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="mt-6 text-lg text-neutral-300 max-w-xl"
            >
              A sign language is a way of communicating by using the hands and
              other parts of the body. Sign language are an important way for
              deaf people to communicate.
            </motion.p>
            {/* Word Particles */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
            >
              <WordParticles />
            </motion.div>
          </div>

          {/* RIGHT (droplet) */}
          <motion.div
            animate={{ scale: isTransitioning ? [1, 10] : 1 }}
            transition={{
              scale: {
                duration: 3,
                ease: "linear" // Changed to linear easing for uniform speed
              }
            }}
            className="h-[400px] md:h-[500px] cursor-pointer relative z-20"
          >
            <Canvas camera={{ position: [0, 0, 4] }}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[3, 3, 3]} intensity={1} />
              <DropletMesh onClick={handleClick} />
              <Environment preset="sunset" />
              <OrbitControls enableZoom={false} enablePan={false} />
            </Canvas>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 3, delay: 2, ease: "linear" }} // Changed to linear easing
            onAnimationComplete={handleFadeComplete}
            className="absolute inset-0 bg-black z-50"
          >
            <div className="absolute inset-0 flex items-center justify-center text-white text-3xl font-bold">
              Prepare To Be Amazed...
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background parallax circle */}
      <motion.div
        style={{ y }}
        className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[120vw] h-[120vw] rounded-full bg-gradient-to-tr from-brand-500/20 via-transparent to-transparent blur-3xl"
      />
    </section>
  );
}

// import React, { useRef, useState, useEffect } from "react";
// import {
//   motion,
//   useScroll,
//   useTransform,
//   AnimatePresence,
// } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import * as THREE from "three";
// import WordParticles from "./TextParticles";

// // Pass `numParticles` as a prop
// const ParticleWave = ({ onClick, numParticles, sizeParticle=1 }) => {
//   const canvasRef = useRef(null);
//   const animationRef = useRef();

//   useEffect(() => {
//     let renderer, scene, camera, particles, uniforms;
//     const clock = new THREE.Clock();

//     const init = () => {
//       const canvas = canvasRef.current;
//       const width = canvas.offsetWidth;
//       const height = canvas.offsetHeight;

//       renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
//       renderer.setPixelRatio(window.devicePixelRatio);
//       renderer.setSize(width, height);

//       scene = new THREE.Scene();
//       camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
//       camera.position.z = 5;

//       // Particle geometry
//       const geometry = new THREE.BufferGeometry();
//       const positions = new Float32Array(numParticles * 3);
//       const colors = new Float32Array(numParticles * 3);
//       const sizes = new Float32Array(numParticles);
//       const offsets = new Float32Array(numParticles * 2);

//       // Generate particles inside a sphere
//       const sphereRadius = 1.5;
//       for (let i = 0; i < numParticles; i++) {
//         const p = new THREE.Vector3().randomDirection().multiplyScalar(Math.cbrt(Math.random()) * sphereRadius);
//         positions[i * 3] = p.x;
//         positions[i * 3 + 1] = p.y;
//         positions[i * 3 + 2] = p.z;

//         colors[i * 3] = Math.random() * 0.1 + 0.5;
//         colors[i * 3 + 1] = Math.random() * 0.5 + 0.5;
//         colors[i * 3 + 2] = Math.random() * 0.9 + 0.5;
//         sizes[i] = Math.random() * sizeParticle + 2;
//         offsets[i * 2] = Math.random();
//         offsets[i * 2 + 1] = Math.random();
//       }
//       geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
//       geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
//       geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
//       geometry.setAttribute('offset', new THREE.BufferAttribute(offsets, 2));

//       // Shader material
//       uniforms = {
//         time: { value: 0 },
//         pointSize: { value: window.devicePixelRatio },
//         waveSpeed: { value: 2.0 },
//         waveIntensity: { value: 0.15 },
//         screenHeight: { value: window.innerHeight }
//       };

//       const material = new THREE.ShaderMaterial({
//         uniforms,
//         vertexShader: `
//           uniform float time;
//           uniform float waveSpeed;
//           uniform float waveIntensity;
//           uniform float screenHeight;
//           attribute float size;
//           attribute vec3 color;
//           attribute vec2 offset;
//           varying vec3 vColor;
//           void main() {
//             vColor = color;
//             vec3 newPosition = position;
//             float dist = length(newPosition);
//             float wave = sin(dist * 10.0 + time * waveSpeed) * waveIntensity;
//             vec3 direction = normalize(newPosition);
//             newPosition += direction * wave;
//             vec4 mvPosition = modelViewMatrix * vec4(newPosition, 1.0);

//             gl_Position = projectionMatrix * mvPosition;
//             gl_PointSize = size;
//           }
//         `,
//         fragmentShader: `
//           varying vec3 vColor;
//           void main() {
//             vec2 cxy = 2.0 * gl_PointCoord - 1.0;
//             if (dot(cxy, cxy) > 1.0) discard;
//             gl_FragColor = vec4(vColor, 1.0);
//           }
//         `,
//         transparent: true,
//         blending: THREE.AdditiveBlending,
//       });

//       particles = new THREE.Points(geometry, material);
//       scene.add(particles);

//       window.addEventListener('resize', onResize);
//     };

//     const onResize = () => {
//       const canvas = canvasRef.current;
//       const width = canvas.offsetWidth;
//       const height = canvas.offsetHeight;
//       camera.aspect = width / height;
//       camera.updateProjectionMatrix();
//       renderer.setSize(width, height);
//       uniforms.pointSize.value = window.devicePixelRatio;
//       uniforms.screenHeight.value = window.innerHeight;
//     };

//     const animate = () => {
//       animationRef.current = requestAnimationFrame(animate);
//       const elapsedTime = clock.getElapsedTime();
//       uniforms.time.value = elapsedTime;
//       particles.rotation.y = elapsedTime * 0.05;
//       particles.rotation.x = Math.sin(elapsedTime * 0.02) * 0.1;
//       renderer.render(scene, camera);
//     };

//     init();
//     animate();

//     return () => {
//       cancelAnimationFrame(animationRef.current);
//       window.removeEventListener('resize', onResize);
//     };
//   }, [numParticles]);

//   return (
//     <div
//       className="absolute inset-0 cursor-pointer"
//       onClick={onClick}
//     >
//       <canvas ref={canvasRef} className="w-full h-full" />
//     </div>
//   );
// };

// export default function Hero() {
//   const ref = useRef(null);
//   const navigate = useNavigate();
//   const [isClicked, setIsClicked] = useState(false);
//   const [isTransitioning, setIsTransitioning] = useState(false);

//   const { scrollYProgress } = useScroll({
//     target: ref,
//     offset: ["start start", "end start"],
//   });

//   const y = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
//   const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
//   const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.6]);

//   const handleClick = () => {
//     setIsClicked(true);
//     // Start the transition animation after a small delay to let the zoom begin
//     setTimeout(() => {
//         setIsTransitioning(true);
//     }, 500);
//   };

//   const handleFadeComplete = () => {
//     // Only navigate after the fade-in animation has completed
//     navigate("/ai-model");
//   };

//   return (
//     <section
//       ref={ref}
//       className="relative min-h-[95vh] overflow-hidden flex items-center"
//     >
//       <motion.div
//         style={{ y, scale, opacity }}
//         className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_35%,rgba(63,162,255,0.25),transparent_60%)]"
//       />

//       <motion.div
//         className="relative z-10 mx-auto max-w-7xl px-6 pt-28 pb-24 w-full"
//       >
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
//           <div className="max-w-3xl">
//             <motion.h1
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.1 }}
//               className="text-5xl md:text-7xl font-semibold tracking-tight leading-[1.05]"
//             >
//               Mudravaani
//             </motion.h1>
//             <motion.p
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.25 }}
//               className="mt-6 text-lg text-neutral-300 max-w-xl"
//             >
//               A sign language is a way of communicating by using the hands and
//               other parts of the body. Sign language are an important way for
//               deaf people to communicate.
//             </motion.p>
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.35 }}
//             >
//               <WordParticles />
//             </motion.div>
//           </div>

//           <motion.div
//             animate={{ scale: isClicked ? 2 : 1 }}
//             transition={{
//               scale: {
//                 duration: 1.5,
//                 ease: "easeInOut"
//               }
//             }}
//             className="h-[400px] md:h-[500px] cursor-pointer relative z-20"
//           >
//             <ParticleWave onClick={handleClick} numParticles={5000} sizeParticle={2} />
//           </motion.div>
//         </div>
//       </motion.div>

//       <AnimatePresence>
//         {isTransitioning && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 1.5, ease: "easeInOut" }}
//             onAnimationComplete={handleFadeComplete}
//             className="absolute inset-0 bg-black z-50 flex items-center justify-center text-white text-3xl font-bold"
//           >
//             Prepare To Be Amazed...
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <motion.div
//         style={{ y }}
//         className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[120vw] h-[120vw] rounded-full bg-gradient-to-tr from-brand-500/20 via-transparent to-transparent blur-3xl"
//       />
//     </section>
//   );
// }
