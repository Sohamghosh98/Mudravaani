// components/SplineScene.jsx
import React, { useEffect, useRef } from "react";
import Spline from "@splinetool/react-spline";
import { Application } from "@splinetool/runtime";

export default function SplineScene({ dynamicText }) {
  const appRef = useRef(null);

  function onLoad(splineApp) {
    appRef.current = splineApp;

    // 🔹 Set background transparent
    splineApp.setBackgroundColor("rgba(0,0,0,0)");

    // 🔹 Update text object if exists
    const textObj = splineApp.findObjectByName("MyText");
    if (textObj) {
      textObj.text = dynamicText;
    }
  }

  useEffect(() => {
    if (!appRef.current) return;
    const textObj = appRef.current.findObjectByName("MyText");
    if (textObj) {
      textObj.text = dynamicText;
    }
  }, [dynamicText]);

  return (
    <div className="relative w-full h-[600px] overflow-hidden">
      {/* 🔹 Background layer (glowing texture) */}
      <div
        className="absolute inset-0 bg-cover bg-center blur-2xl opacity-80 -z-10"
        style={{ backgroundImage: "url('/assets/website-bg.png')" }}
      />

      {/* 🔹 Overlay gradient for depth */}
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/70 via-black/50 to-pink-800/70 -z-10" />

      {/* 🔹 Transparent Spline Scene */}
      <Spline
        scene="https://prod.spline.design/hK6hDXiXpEQ-Jozj/scene.splinecode"
        onLoad={onLoad}
        className="w-full h-full"
        style={{ background: "transparent" }}
      />
    </div>
  );
}
