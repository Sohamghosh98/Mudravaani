import React from "react"
import { motion } from "framer-motion"


export default function CTA() {
  return (
    <section id="contact" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-tr from-brand-500/15 to-white/5 p-10 text-center shadow-soft">
          <motion.h3
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-semibold text-white"
          >
            Bridging Communication with AI
          </motion.h3>

          <p className="mt-4 text-neutral-300 max-w-2xl mx-auto">
            Mudravaani translates sign language into text and speech in real
            time. Join us in making communication more inclusive and accessible
            for everyone.
          </p>

          

          <a
            href="mailto:contact@mudravaani.ai"
            className="mt-10 inline-flex items-center justify-center rounded-xl bg-white text-neutral-900 px-6 py-3 text-base font-medium shadow-soft hover:bg-neutral-100"
          >
            Get Involved
          </a>
        </div>
      </div>
    </section>
  )
}
