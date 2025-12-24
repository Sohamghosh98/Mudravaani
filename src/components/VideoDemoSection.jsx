import React from "react";

export default function VideoDemo() {
  return (
    <section id="demo" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-3xl md:text-5xl font-semibold text-center">
          Realtime Sign Language Translator
        </h2>
        <p className="mt-4 text-neutral-300 text-center max-w-2xl mx-auto">
          Watch Mudravaani in action: translating hand gestures into text instantly with our trained AI model.
        </p>

        <div className="mt-12 grid lg:grid-cols-2 gap-8 items-center">
          {/* 🎥 Video Input */}
          <div className="rounded-2xl border border-white/10 bg-gradient-to-tr from-white/10 to-white/0 p-4 shadow-soft">
            <h3 className="text-xl font-medium text-center mb-4 text-white">
              
            </h3>
            <div className="rounded-xl overflow-hidden bg-indigo-900 h-[320px] flex items-center justify-center">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/uKKvNqA9N20?autoplay=1&loop=1&mute=1&playlist=uKKvNqA9N20"
                title="Realtime Sign Language Input"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
                allowFullScreen
                className="rounded-xl"
              ></iframe>
            </div>
          </div>

          {/* 🔊 Text and Voice Output */}
          <div className="rounded-2xl border border-white/10 bg-gradient-to-tr from-white/10 to-white/0 p-4 shadow-soft">
            <h3 className="text-xl font-medium text-center mb-4 text-white">
            
            </h3>
            <div className="rounded-xl overflow-hidden bg-black h-[320px] flex items-center justify-center">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/RhQvlq-mZtA?autoplay=1&loop=1&mute=1&playlist=RhQvlq-mZtA"
                title="Realtime Sign Language Output"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
                allowFullScreen
                className="rounded-xl"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
