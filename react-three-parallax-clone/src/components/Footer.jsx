import React from "react";
import { FaFacebook, FaXTwitter, FaLinkedin, FaInstagram } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="w-full flex justify-center items-center py-6">
      <div className="w-[90%] max-w-5xl bg-black/80 rounded-2xl px-8 py-6 flex flex-col md:flex-row items-center justify-between shadow-lg border border-white/10">
        
        {/* Left Logo */}
        <div className="flex items-center gap-3">
          {/* Replace src with your logo path */}
          <img 
            src="./assets/logo.png"   // <-- put your image file path here
            alt="Mudravaani Logo" 
            className="w-10 h-10 object-contain rounded-lg"
          />
          <span className="text-white font-semibold text-lg">Mudravaani</span>
        </div>

        {/* Center Text */}
        <p className="text-neutral-400 text-sm my-4 md:my-0 text-center">
          Copyright 2025© Mudravaani
        </p>

        {/* Right Social Icons */}
        <div className="flex gap-5 text-neutral-400">
          <a href="#" className="hover:text-white transition">
            <FaFacebook size={18} />
          </a>
          <a href="#" className="hover:text-white transition">
            <FaXTwitter size={18} />
          </a>
          <a
            href="https://www.linkedin.com/in/soham-ghosh-97809a24b/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
          >
            <FaLinkedin size={18} />
          </a>
          <a href="#" className="hover:text-white transition">
            <FaInstagram size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
