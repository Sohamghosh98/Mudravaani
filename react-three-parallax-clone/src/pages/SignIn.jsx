// pages/LoginPage.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import SplineScene from "../components/SplineScene";
import Navbar from "../components/Navbar";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8000/api/auth/validate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // ✅ ensure cookies/session are included
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Invalid email or password");
      }

      setSuccess("Login successful! Redirecting...");
      setTimeout(() => navigate("/ai-model"), 2000); // ✅ redirect after login
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden">
      {/* 🔹 Navbar */}
      <Navbar />

      {/* 🔹 Fullscreen Spline Background */}
      <div className="absolute inset-0 -z-10">
        <SplineScene dynamicText="Sign In" />
      </div>

      {/* 🔹 Semi-transparent overlay (to make form readable) */}
      <div className="absolute inset-0 bg-black/40 -z-10" />

      {/* 🔹 Login Form */}
      <div className="flex-grow flex items-center justify-center px-4 mt-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-2xl shadow-2xl w-full max-w-md"
        >
          <h2 className="text-3xl font-bold text-white mb-6 text-center">
            Welcome Back
          </h2>

          {/* ✅ Error / Success messages */}
          {error && (
            <p className="text-red-400 text-sm text-center mb-3">{error}</p>
          )}
          {success && (
            <p className="text-green-400 text-sm text-center mb-3">{success}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            <div className="flex items-center justify-between text-sm text-gray-300">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="h-4 w-4" />
                <span>Remember me</span>
              </label>
              <a href="#" className="hover:text-purple-400 transition">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white font-semibold shadow-lg hover:opacity-90 transition disabled:opacity-50"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>

            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white hover:bg-white/10 transition"
            >
              <FcGoogle size={20} /> Sign in with Google
            </button>
          </form>

          <p className="text-sm text-gray-400 mt-6 text-center">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-purple-400 font-medium hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
