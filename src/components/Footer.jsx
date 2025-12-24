import React from "react";
import { FaFacebook, FaXTwitter, FaLinkedin, FaInstagram } from "react-icons/fa6";
import DustySection from "./DustySection";

export default function Footer() {
  return (
    <DustySection>
    <footer className="w-full flex flex-col justify-center items-center">
      <div className="w-[90%] max-w-5xl bg-black/20 backdrop-blur-md rounded-2xl px-8 py-6 flex flex-col md:flex-row items-center justify-between shadow-lg border border-white/50">
        
        {/* Left Logo */}
        <div className="flex items-center gap-3">
          {/* Replace src with your logo path */}
          <img 
            src="./assets/logo.png"   // <-- put your image file path here
            alt="Mudravaani Logo" 
            className="w-10 h-10 object-contain rounded-3xl"
          />
          <span className="text-white font-semibold text-lg">Mudravaani</span>
        </div>

        {/* Right Social Icons */}
        <div className="flex gap-5 text-white">
          <a href="#" className="hover:text-blue-500 transition">
            <FaFacebook size={18} />
          </a>
          <a
            href="https://www.linkedin.com/in/soham-ghosh-97809a24b/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 transition"
          >
            <FaLinkedin size={18} />
          </a>
          <a href="#" className="hover:text-blue-500 transition">
            <FaInstagram size={18} />
          </a>
        </div>
      </div>
      <p className="text-sm text-white my-4 md:my-0 text-center p-3">
        Copyright 2025© Mudravaani
      </p>
    </footer>
    </DustySection>
  );
}
