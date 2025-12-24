import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 14 }}
      className="fixed top-4 inset-x-0 z-50 flex justify-center scroll-smooth"
    >
      <div className="flex items-center justify-between w-[90%] max-w-6xl rounded-full bg-[#1a0f0a] text-white px-8 py-3 shadow-lg">
        
        {/* Left Navigation */}
        <nav className="flex gap-6 text-sm text-neutral-300">
          <a className="hover:text-white" href="#about">
            What's Included
          </a>
          <a className="text-white font-medium" href="#demo">
            How To Use
          </a>
          <a className="hover:text-white" href="#tech">
            Tech
          </a>
          <Link className="hover:text-white" to="/contact">
            Contact
          </Link>
        </nav>

        {/* Brand Name + Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/assets/logo.png"
            alt="Superpower Logo"
            className="h-8 w-8 rounded-full object-cover shadow-md"
          />
          <span className="text-lg font-semibold tracking-tight">
            Mudravaani
          </span>
        </Link>

        {/* Right Navigation */}
        <div className="flex items-center gap-6 text-sm">
          <Link className="hover:text-white text-neutral-300" to="/signin">
            Login
          </Link>
          <Link
            to="/signup"
            className="inline-flex items-center rounded-full bg-blue-500 text-white px-5 py-2 font-medium shadow hover:bg-red-600"
          >
            Start Testing
          </Link>
        </div>
      </div>
    </motion.header>
  );
}
