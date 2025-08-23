import React from "react";
import { FaGithub, FaInstagram, FaLinkedin} from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import bgTexture from "/assets/bg.png";

const teamMembers = [
  {
    name: "Soham Ghosh",
    role: "Founder & CEO",
    bio: "Used to work at IBM but quit because of robots",
    img: "https://via.placeholder.com/100",
  },
  {
    name: "Swarnavo Bose",
    role: "Lead Design",
    bio: "Hello, I like not doing anything at all. Let’s DM.",
    img: "https://via.placeholder.com/100",
  },
  {
    name: "Arnab Nath",
    role: "Lead Engineering",
    bio: "Prodigy with record-breaking 176 IQ and many awards.",
    img: "https://via.placeholder.com/100",
  },
  {
    name: "Sharanya Mitra",
    role: "Lead Finance",
    bio: "Hello, I like money. It is the only purpose of my life.",
    img: "https://via.placeholder.com/100",
  },
  {
    name: "Sohini",
    role: "Janitor",
    bio: "I’m just here to clean the floor, that’s all. Nothing special.",
    img: "https://via.placeholder.com/100",
  },
];

export default function AboutUs() {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundImage: `url(${bgTexture})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Navbar */}
      <Navbar />

      {/* Content */}
      <div className="flex-1 py-16 px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white-900 mt-4">
            Let’s Meet Our Team
          </h2>
          <p className="mt-4 text-white-700 max-w-2xl mx-auto">
            Realtime Communication System Powered By A.I For Specially Abled
          </p>

          {/* Buttons */}
          <div className="mt-6 flex justify-center gap-4">
            <button className="px-5 py-2 rounded-lg bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition">
              About Us
            </button>
          </div>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {teamMembers.map((member, idx) => (
            <div
              key={idx}
              className="bg-white/80 backdrop-blur-md rounded-2xl shadow p-6 text-center hover:shadow-lg transition"
            >
              <img
                src={member.img}
                alt={member.name}
                className="w-20 h-20 mx-auto rounded-full object-cover"
              />
              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                {member.name}
              </h3>
              <p className="text-indigo-600 font-medium">{member.role}</p>
              <p className="mt-2 text-gray-600 text-sm">{member.bio}</p>

              {/* Social Icons */}
              <div className="flex justify-center gap-4 mt-4 text-gray-500">
                <a href="#">
                  <FaGithub className="hover:text-indigo-600" />
                </a>
                <a href="#">
                  <FaInstagram className="hover:text-indigo-600" />
                </a>
                <a href="#">
                  <FaLinkedin className="hover:text-indigo-600" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
