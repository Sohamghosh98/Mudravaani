// components/WordParticles.jsx
import React from "react"
import { motion } from "framer-motion"

const tags = [
  "AI", "Machine Learning", "Computer Vision", "Sign Language Recognition",
  "Speech Synthesis", "Text-to-Speech", "Accessibility", "Inclusive Design",
  "Realtime Translation", "Gesture Detection", "Deep Learning", "Web & Interactive",
  "Responsive", "3D", "UI Design", "Next.js", "WebGL", "Three.js", "Tailwind"
]

export default function WordParticles() {
  return (
    <div className="relative flex flex-wrap gap-3 mt-8 max-w-2xl">
      {tags.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 15 }}
          animate={{
            opacity: 1,
            y: [0, -6, 0], // smoother, slower float
          }}
          transition={{
            duration: 4 + Math.random() * 1.5, // subtle variation
            delay: i * 0.07, // stagger fade-in
            repeat: Infinity,
            repeatType: "mirror",
            ease: [0.4, 0, 0.2, 1], // smoother curve
          }}
          className="rounded-full border border-white/30 bg-white/80 px-3 py-1 text-xs text-black shadow-sm"
        >
          {word}
        </motion.span>
      ))}
    </div>
  )
}
