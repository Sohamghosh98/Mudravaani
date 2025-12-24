// pages/SignUpPage.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import RoboSplineScene from "../components/RoboSplineScene"; // ✅ renamed spline scene
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function SignUpPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    disability: "",
    role: "",
    gender: "",
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

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          disability: formData.disability,
          role: formData.role,
          gender: formData.gender,
        }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.detail || "Registration failed");

      setSuccess("Account created successfully! Redirecting...");
      setTimeout(() => navigate("/signin"), 2000);
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

      {/* 🔹 Main content area: Split layout */}
      <div className="flex-grow flex flex-col md:flex-row items-center justify-center px-6 mt-20 gap-10">
        
        {/* ✅ Left: Signup Form */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-2xl shadow-2xl w-full max-w-md"
        >
          <h2 className="text-3xl font-bold text-white mb-6 text-center">
            Create Your Account
          </h2>

          {error && (
            <p className="text-red-400 text-sm text-center mb-3">{error}</p>
          )}
          {success && (
            <p className="text-green-400 text-sm text-center mb-3">{success}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />

            <select
              name="disability"
              value={formData.disability}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            >
              <option value="">Select Disability</option>
              <option value="none">None</option>
              <option value="hearing">Hearing</option>
              <option value="visual">Visual</option>
              <option value="physical">Physical</option>
            </select>

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            >
              <option value="">Select Role</option>
              <option value="user">User</option>
              <option value="creator">Creator</option>
              <option value="admin">Admin</option>
            </select>

            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white font-semibold shadow-lg hover:opacity-90 transition disabled:opacity-50"
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>

          <p className="text-gray-300 text-sm mt-4 text-center">
            Already have an account?{" "}
            <Link to="/signin" className="text-purple-400 hover:underline">
              Sign In
            </Link>
          </p>
        </motion.div>

        {/* ✅ Right: Robo Spline Scene */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="hidden md:flex w-full max-w-lg h-[600px] items-center justify-center"
        >
          <RoboSplineScene dynamicText="" />
        </motion.div>
      </div>
    </div>
  );
}
