import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import VideoDemo from "./components/VideoDemoSection";
import Showcase3D from "./components/Showcase3D";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import BackgroundShader from "./components/BackgroundShader";
import SplineScene from "./components/SplineScene";
import TechStack from "./components/TechStack";

// Pages
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ContactPage from "./pages/ContactPage";
import AIModelPage from "./pages/AiModel";   // ✅ Import AI Model Page
import AboutUs from "./pages/AboutUs";

function LandingPage() {
  return (
    <>
      <Navbar />
      <Hero />

      <div className="mt-10">
        <SplineScene
          title="Clarity. Focus. Impact."
          subtitle="We turn complex ideas into effortless experiences"
        />
      </div>
      
      <Features />
      <VideoDemo />        
      <TechStack />        
      <Showcase3D />
      <CTA />
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <Router>
      <div className="font-display min-h-screen text-white relative overflow-hidden">
        {/* Background Image */}
        <div
          className="fixed inset-0 bg-cover bg-center -z-50"
          style={{ backgroundImage: "url('/assets/bg.png')" }}
        />

        {/* Shader Overlay
        <BackgroundShader />
        <div className="absolute inset-0 bg-black/40 -z-10" /> */}

        {/* Routes */}
        <div className="relative z-10">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/ai-model" element={<AIModelPage />} />
            <Route path="/about" element={<AboutUs />} />  {/* ✅ New AI Model Route */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}
