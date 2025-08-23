import React, { useRef, useState } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"
import * as THREE from "three"
import { useNavigate } from "react-router-dom"

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
]

function DropletMesh({ onClick }) {
  const meshRef = useRef()

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    meshRef.current.rotation.y = t * 0.3
    meshRef.current.rotation.x = Math.sin(t * 0.2) * 0.2
  })

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
  )
}

export default function Hero() {
  const ref = useRef(null)
  const navigate = useNavigate()
  const [scaleState, setScaleState] = useState("normal") // "normal", "zoomIn", "zoomOut"
  const [showNext, setShowNext] = useState(false)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.6])

  const handleClick = () => {
    setScaleState("zoomIn")
    setTimeout(() => {
      setScaleState("zoomOut")
      setShowNext(true) // show next page while fading
      setTimeout(() => {
        navigate("/ai-model")
      }, 2200) // let fade + slide finish
    }, 3000) // expand for 3s before contracting
  }

  const getScale = () => {
    if (scaleState === "zoomIn") return 20
    if (scaleState === "zoomOut") return 1
    return 1
  }

  const getDuration = () => {
    if (scaleState === "zoomIn") return 3
    if (scaleState === "zoomOut") return 2
    return 0
  }

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
              Mudravaani
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
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="mt-8 flex flex-wrap gap-2"
            >
              {tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-neutral-300"
                >
                  {t}
                </span>
              ))}
            </motion.div>
          </div>

          {/* RIGHT (droplet) */}
          <motion.div
            initial={{ scale: 1, opacity: 1 }}
            animate={{
              scale: getScale(),
              opacity: scaleState === "zoomOut" ? 0 : 1,
            }}
            transition={{ duration: getDuration(), ease: "easeInOut" }}
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

      {/* Next Page Sliding In */}
      <AnimatePresence>
        {showNext && (
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="absolute inset-0 bg-black z-10 flex items-center justify-center text-white text-3xl font-bold"
          >
            AI Model Page Loading...
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background parallax circle */}
      <motion.div
        style={{ y }}
        className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[120vw] h-[120vw] rounded-full bg-gradient-to-tr from-brand-500/20 via-transparent to-transparent blur-3xl"
      />
    </section>
  )
}
