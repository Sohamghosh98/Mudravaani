import React from "react";
import { motion } from "framer-motion";

const techStack = [
  { name: "React", logo: "/assets/react.png" },
  { name: "Three.js", logo: "/assets/Threejs-logo.png" },
  { name: "Python", logo: "/assets/python-logo.png" },
  { name: "FastAPI", logo: "/assets/FastAPI.png" },
  { name: "TensorFlow", logo: "/assets/TensorFlow.png" },
  { name: "MediaPipe", logo: "/assets/mediapipe-dark-8x.png" },
  { name: "OpenCV", logo: "/assets/OpenCV.png" },
];

export default function TechStack() {
  return (
    <section id="tech" className="py-20 bg-transparent relative">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">
          Technology Stack Used
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8 justify-items-center">
          {techStack.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-6 w-28 h-28 flex flex-col items-center justify-center border border-white/20 hover:scale-110 transition-transform"
            >
              <img
                src={tech.logo}
                alt={tech.name}
                className="w-12 h-12 object-contain mb-2"
              />
              <p className="text-sm text-center">{tech.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
