import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import VideoDemo from "./components/VideoDemoSection";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import TechStack from "./components/TechStack";
import DustySection from "./components/DustySection";
import SplineScene from "./components/SplineScene";
import Spline from "@splinetool/react-spline"; // ✅ use regular React Spline

function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Full-page Spline background */}
      <div className="absolute inset-0 -z-10 w-full h-full">
        <Spline scene="https://prod.spline.design/M1OwpapR7juKHaSc/scene.splinecode" />
      </div>

      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <DustySection>
        <Hero />
      </DustySection>

        {/* 🌀 Optional Spline Section (can remove if background covers it) */}
      { <DustySection>
        <SplineScene dynamicText="Mudravaani" />
      </DustySection>}

      <DustySection>
        <Features />
      </DustySection>

      <DustySection>
        <VideoDemo />
      </DustySection>

      <DustySection>
        <TechStack />
      </DustySection>

      <DustySection>
        <CTA />
      </DustySection>

      <Footer />
    </div>
  );
}

export default LandingPage;
