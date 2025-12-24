import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles.css";

// Pages
import LandingPage from "./LandingPage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ContactPage from "./pages/ContactPage";
import AIModelPage from "./pages/AiModel";
import AboutUs from "./pages/AboutUs";
import Loader from "./components/Loader";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 10000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Router>
          <div className="font-display min-h-screen text-white relative overflow-hidden">

            {/* Content */}
            <div className="relative z-10">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/ai-model" element={<AIModelPage />} />
                <Route path="/about" element={<AboutUs />} />
              </Routes>
            </div>
          </div>
        </Router>
      )}
    </>
  );
}
