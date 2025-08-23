import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SplineScene from "../components/SplineScene"; // 🔹 Import Spline

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Message Sent!");
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundImage: "url('/assets/bg.png')", // 🔹 your asset bg
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Navbar */}
      <Navbar />

      {/* Contact Form Section */}
      <div className="flex-1 flex items-center justify-center px-7 py-20">
        <div className="rounded-2xl shadow-xl w-[90%] max-w-6xl flex overflow-hidden">
          
          {/* 🔹 Left side → Transparent Spline Scene */}
          <div className="hidden md:block w-1/2 bg-transparent">
            <SplineScene dynamicText="Contact Us" />
          </div>

          {/* 🔹 Right side → Contact Form with solid bg */}
          <div className="w-full md:w-1/2 p-8 flex flex-col justify-center bg-white/80 backdrop-blur-md">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">
              Contact Us
            </h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full border-b border-gray-400 bg-transparent px-2 py-2 focus:outline-none"
                />
              </div>
              <div className="relative">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full border-b border-gray-400 bg-transparent px-2 py-2 focus:outline-none"
                />
              </div>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  placeholder="E-mail"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full border-b border-gray-400 bg-transparent px-2 py-2 focus:outline-none"
                />
              </div>
              <div className="relative">
                <textarea
                  name="message"
                  placeholder="Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full border-b border-gray-400 bg-transparent px-2 py-2 focus:outline-none resize-none"
                  rows="3"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 rounded-lg shadow-md"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
