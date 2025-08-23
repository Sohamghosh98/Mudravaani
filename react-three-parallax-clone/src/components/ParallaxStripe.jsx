import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function ParallaxStripe(){
  const { scrollY } = useScroll()
  const x = useTransform(scrollY, [0, 1500], [0, -300])
  return (
    <section aria-hidden className="relative overflow-hidden py-6 border-y border-white/5 bg-neutral-950">
      <motion.div style={{ x }} className="whitespace-nowrap">
        {Array.from({length: 20}).map((_,i)=>(
          <span key={i} className="inline-block mx-6 text-sm tracking-widest uppercase text-neutral-500">Strategy • Design • Engineering • WebGL • Parallax • Three.js</span>
        ))}
      </motion.div>
    </section>
  )
}
