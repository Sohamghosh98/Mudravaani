// src/components/NavBarShader.jsx
import React, { useRef, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { motion } from "framer-motion"
import * as THREE from "three"

const frag = `
precision highp float;
uniform float u_time;
uniform vec2 u_res;
uniform vec2 u_mouse;
uniform float u_aspect;
uniform float u_audio; // 🎤 audio input
varying vec2 vUv;

float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453123);}
float n2(vec2 p){
  vec2 i=floor(p),f=fract(p);
  float a=h(i),b=h(i+vec2(1.,0.)),c=h(i+vec2(0.,1.)),d=h(i+vec2(1.,1.));
  vec2 u=f*f*(3.-2.*f);
  return mix(a,b,u.x)+(c-a)*u.y*(1.-u.x)+(d-b)*u.x*u.y;
}
float fbm(vec2 p){
  float v=0.,a=.5; mat2 m=mat2(1.6,1.2,-1.2,1.6);
  for(int i=0;i<5;i++){v+=a*n2(p); p=m*p*1.9; a*=.5;}
  return v;
}

void main(){
  vec2 uv=vUv;
  uv.x*=u_aspect;
  float t=u_time;
  vec2 wuv=uv;

  // 🔹 Animate bands based on audio
  wuv.y+=.08*sin(wuv.x*10.+t*1.6) * (1.0 + u_audio*1.5);
  wuv.y+=.04*sin(wuv.x*24.-t*2.3) * (1.0 + u_audio*2.0);

  float flow=fbm(vec2(wuv.x*2.+t*.2,wuv.y*4.-t*.15));
  float bands=.6+ .4*sin((wuv.x*12.-t*1.2)+flow*3.);

  float mask=smoothstep(.05,.25,abs(wuv.y-.5));
  float edge=smoothstep(.0,.12,uv.y)*smoothstep(1.,.88,uv.y);

  vec2 m=u_mouse;
  vec2 c=vec2(uv.x-0.5-m.x*0.15, uv.y-0.5-m.y*0.3);
  float glow=exp(-18.*dot(c,c));

  vec3 a=vec3(0.10,0.05,0.25);
  vec3 b=vec3(0.05,0.25,0.75);
  vec3 c1=vec3(0.95,0.35,0.6);

  vec3 col=mix(a,b,clamp(bands,0.,1.));
  col=mix(col,c1,smoothstep(.65,.95,flow));
  col+=glow*vec3(0.7,0.9,1.0);

  // 🔹 Boost brightness with audio
  col *= (1.0 + u_audio*1.5);

  col*=edge*(1.-mask);
  gl_FragColor=vec4(col,1.0);
}
`

const vert = `
varying vec2 vUv;
void main(){vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}
`

function Plane({ analyserRef }) {
  const matRef = useRef()
  const { size } = useThree()

  useFrame((s) => {
    if (!matRef.current) return
    matRef.current.uniforms.u_time.value = s.clock.elapsedTime
    matRef.current.uniforms.u_res.value.set(size.width, size.height)
    matRef.current.uniforms.u_mouse.value.set(s.mouse.x, s.mouse.y)
    matRef.current.uniforms.u_aspect.value = size.width / size.height

    // 🎤 Update audio uniform
    if (analyserRef.current) {
      const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount)
      analyserRef.current.getByteFrequencyData(dataArray)
      const avg =
        dataArray.reduce((a, b) => a + b, 0) / dataArray.length / 255.0
      matRef.current.uniforms.u_audio.value = avg
    }
  })

  const material = new THREE.ShaderMaterial({
    uniforms: {
      u_time: { value: 0 },
      u_res: { value: new THREE.Vector2(800, 600) },
      u_mouse: { value: new THREE.Vector2(0, 0) },
      u_aspect: { value: 1 },
      u_audio: { value: 0 }, // 🎤 audio input
    },
    vertexShader: vert,
    fragmentShader: frag,
    transparent: true,
  })

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <primitive ref={matRef} object={material} attach="material" />
    </mesh>
  )
}

export default function NavBarShader() {
  const analyserRef = useRef(null)

  useEffect(() => {
    async function setupAudio() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)()
        const source = audioCtx.createMediaStreamSource(stream)
        const analyser = audioCtx.createAnalyser()
        analyser.fftSize = 256
        source.connect(analyser)
        analyserRef.current = analyser
      } catch (err) {
        console.error("Mic access denied", err)
      }
    }
    setupAudio()
  }, [])

  return (
    <motion.div
      className="relative w-full h-[110px] overflow-hidden"
      initial={{ opacity: 0, y: -60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.1, ease: "easeOut" }}
    >
      <motion.div
        className="w-full h-full"
        animate={{ y: [0, -8, 0, 8, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        <Canvas camera={{ position: [0, 0, 1], fov: 50 }}>
          <Plane analyserRef={analyserRef} />
        </Canvas>
      </motion.div>
    </motion.div>
  )
}
