import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SplineScene from "../components/SplineScene";
import DustySection from "../components/DustySection";

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
        backgroundImage: "url('/assets/bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Navbar */}
      <Navbar />

      {/* Contact Form Section */}
      <div className="flex-1 flex items-center justify-center px-6 pt-32 pb-16">
        <DustySection>
          <div className="rounded-2xl shadow-xl w-full max-w-5xl flex overflow-hidden border-[1px] border-blue-950">
            {/* Left side → Spline */}
            <div className="hidden md:block w-1/2 bg-transparent p-6">
              <SplineScene dynamicText="Contact Us" />
            </div>

            {/* Right side → Contact Form */}
            <div className="w-full md:w-1/2 p-6 flex flex-col justify-center bg-white/80 backdrop-blur-md text-black">
              <h2 className="text-2xl font-semibold text-gray-700 mb-6">
                Contact Us
              </h2>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full border-b border-gray-400 bg-transparent px-2 py-2 focus:outline-none"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full border-b border-gray-400 bg-transparent px-2 py-2 focus:outline-none"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="E-mail"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full border-b border-gray-400 bg-transparent px-2 py-2 focus:outline-none"
                />
                <textarea
                  name="message"
                  placeholder="Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full border-b border-gray-400 bg-transparent px-2 py-2 focus:outline-none resize-none"
                  rows="3"
                ></textarea>
                <button
                  type="submit"
                  className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 rounded-lg shadow-md"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </DustySection>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
}
