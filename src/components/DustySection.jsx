import React from "react";
import { motion } from "framer-motion";

export default function DustySection({ children }) {
  const variants = {
    hidden: {
      opacity: 0,
      scale: 0.9,
      y: 40,
      transition: { duration: 0.8, ease: "easeOut" },
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: -30,
      transition: { duration: 0.6, ease: "easeIn" },
    },
  };

  return (
    <motion.section
      variants={variants}
      initial="hidden"
      whileInView="visible"
      exit="exit"
      viewport={{ once: false, amount: 0.3 }}
      className="relative"
    >
      {children}
      {/* ✨ Optional soft overlay particles */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.15, 0] }}
        transition={{ repeat: Infinity, duration: 4 }}
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "4px 4px",
        }}
      />
    </motion.section>
  );
}
