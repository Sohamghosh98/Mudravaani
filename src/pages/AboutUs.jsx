import React from "react";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import bgTexture from "/assets/bg.png";
import DustySection from "../components/DustySection";

const teamMembers = [
  {
    name: "Swarnava Bose",
    role: "Team Lead, AI Engineer",
    bio: "Used to work at IBM but quit because of robots",
    img: "/assets/swarnava.png",
  },
  {
    name: "Soham Ghosh",
    role: "Frontend Engineer",
    bio: "Hello, I like not doing anything at all. Let’s DM.",
    img: "/assets/soham.jpg",
  },
  {
    name: "Arnab Nath",
    role: "Backend Engineer",
    bio: "Prodigy with record-breaking 176 IQ and many awards.",
    img: "/assets/arnab.jpg",
  },
  {
    name: "Sharanya Mitra",
    role: "Cloud Engineer",
    bio: "Hello, I like money. It is the only purpose of my life.",
    img: "/assets/sharanya.jpg",
  },
  {
    name: "Sohini Sett",
    role: "Documentation Specialist, UI/UX Designer",
    bio: "I’m just here to clean the floor, that’s all. Nothing special.",
    img: "/assets/sohini.jpg",
  },
];

export default function AboutUs() {
  return (
    <div
      className="min-h-screen flex flex-col pt-7"
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
        <DustySection>
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white-900 mt-4">
            Let’s Meet Our Team
          </h2>
          <p className="mt-4 text-white-700 max-w-2xl mx-auto">
            Realtime Communication System Powered By A.I For Specially Abled
          </p>
        </div>
        </DustySection>

        {/* Team Grid */}
        <div className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto">
          {teamMembers.map((member, idx) => (
            <div
              key={idx}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 bg-white/80 backdrop-blur-md rounded-2xl shadow p-6 text-center hover:shadow-lg transition"
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
