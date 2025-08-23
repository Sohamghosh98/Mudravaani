import React from 'react'
import { motion } from 'framer-motion'

const items = [
  { 
    title: 'AI Sign Language Recognition', 
    body: 'Accurately detects and interprets hand gestures using deep learning models.' 
  },
  { 
    title: 'Real-time Translation', 
    body: 'Instantly converts signs into readable text and natural-sounding voice output.' 
  },
  { 
    title: 'Voice & Text Output', 
    body: 'Communicate seamlessly through both spoken words and written text.' 
  },
  { 
    title: 'Accessibility First', 
    body: 'Designed to bridge communication gaps for the deaf and hard-of-hearing community.' 
  },
  { 
    title: 'Cross-Platform Support', 
    body: 'Works on web and mobile, making conversations inclusive anywhere.' 
  },
  { 
    title: 'Continuous Learning', 
    body: 'AI improves over time, adapting to diverse signing styles and regional variations.' 
  },
]

export default function Features(){
  return (
    <section id="about" className="mx-auto max-w-7xl px-6 py-24">
      
      {/* Section Heading */}
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
          What's Included
        </h2>
        <p className="mt-4 text-neutral-400 max-w-2xl mx-auto">
          Explore the powerful features designed to make communication seamless and inclusive.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-10">
        {items.map((it, idx)=> (
          <motion.div
            key={it.title}
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ delay: idx * 0.05 }}
            className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-soft">
            <h3 className="text-xl font-semibold">{it.title}</h3>
            <p className="mt-3 text-neutral-300">{it.body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
