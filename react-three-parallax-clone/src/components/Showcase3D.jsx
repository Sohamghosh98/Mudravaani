import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Float, Environment } from '@react-three/drei'

function Shape({ type='box', ...props }){
  return (
    <Float floatIntensity={1.8} rotationIntensity={1.2}>
      {type==='box' && <mesh {...props}>
        <boxGeometry args={[1.2,1.2,1.2]} />
        <meshStandardMaterial metalness={0.6} roughness={0.2} color={'#3fa2ff'} />
      </mesh>}
      {type==='icosa' && <mesh {...props}>
        <icosahedronGeometry args={[0.9, 1]} />
        <meshStandardMaterial metalness={0.2} roughness={0.35} color={'#ffffff'} />
      </mesh>}
      {type==='torus' && <mesh {...props}>
        <torusKnotGeometry args={[0.6, 0.18, 180, 12]} />
        <meshStandardMaterial metalness={0.5} roughness={0.25} color={'#1f8bff'} />
      </mesh>}
    </Float>
  )
}

export default function Showcase3D(){
  return (
    <section id="work" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <div>
            <h2 className="text-3xl md:text-5xl font-semibold leading-tight text-white">
              Real-time AI. Accessible Communication. Immersive Design.
            </h2>
            <p className="mt-6 text-neutral-300">
              Mudravaani blends AI, sign-language recognition, and interactive 3D visuals 
              to make conversations inclusive and engaging for everyone.
            </p>
            <ul className="mt-6 space-y-3 text-neutral-300">
              <li>• Sign language translated instantly into text & speech</li>
              <li>• AI-powered gesture recognition</li>
              <li>• Interactive 3D elements that respond in real time</li>
              <li>• Fully responsive & accessible UI</li>
            </ul>
          </div>

          {/* 3D Canvas */}
          <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-white/0 p-4">
            <div className="h-[420px] rounded-2xl overflow-hidden bg-neutral-950">
              <Canvas camera={{ position: [3.5, 2.5, 3.5], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[5,5,5]} intensity={1.2} />
                <Suspense fallback={null}>
                  <Environment preset="city" />
                </Suspense>
                <Shape type="box" position={[-1.6, 0, 0]} />
                <Shape type="icosa" position={[0.6, 0.2, 0.2]} />
                <Shape type="torus" position={[2, -0.1, -0.3]} />
                <OrbitControls enablePan={false} enableZoom={false} />
              </Canvas>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
