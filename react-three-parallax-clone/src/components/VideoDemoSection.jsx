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
          {/* Video Output */}
          <div className="rounded-2xl border border-white/10 bg-gradient-to-tr from-white/10 to-white/0 p-4 shadow-soft">
            <h3 className="text-xl font-medium text-center mb-4 text-white">
              Video Output
            </h3>
            <div className="rounded-xl overflow-hidden bg-black h-[320px] flex items-center justify-center">
              {/* Replace this <video> src with your actual webcam stream or demo */}
              <video
                src="./assets/test.mp4"
                autoPlay
                loop
                muted
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Predicted Text */}
          <div className="rounded-2xl border border-white/10 bg-gradient-to-tr from-white/10 to-white/0 p-4 shadow-soft">
            <h3 className="text-xl font-medium text-center mb-4 text-white">
              Video Output
            </h3>
            <div className="rounded-xl flex items-center justify-center h-[320px] bg-indigo-900">
              <video
                src="./assets/test.mp4"
                autoPlay
                loop
                muted
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Footer note + button */}
        <p className="mt-6 text-center text-neutral-400">
          The above program predicts sign language gestures with our trained CNN model.
        </p>
        <div className="text-center mt-6">
          <button className="px-6 py-3 rounded-xl bg-cyan-500 text-black font-medium hover:bg-cyan-400 transition">
            Stop Translate
          </button>
        </div>
      </div>
    </section>
  );
}
