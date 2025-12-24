// components/RoboSplineScene.jsx
import React from "react";
import Spline from "@splinetool/react-spline";

export default function RoboSplineScene({ dynamicText }) {
  return (
    <div className="relative w-full h-full">
      {/* 🔹 3D Robot Scene */}
      <Spline
        scene="https://prod.spline.design/n7ouqeHyBXEpMQB0/scene.splinecode"
        className="w-full h-full"
      />

      {/* 🔹 Optional overlay text */}
      {dynamicText && (
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white/70 drop-shadow-lg">
            {dynamicText}
          </h1>
        </div>
      )}
    </div>
  );
}
