import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import SplineScene from "../components/SplineScene";
import BackgroundShader from "../components/BackgroundShader";
import Navbar from "../components/Navbar"; // 🔹 Import Navbar

function AIModelPage() {
  const lastWordRef = useRef("");
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [displayWord, setDisplayWord] = useState("");
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const socketRef = useRef(null);

  // 🔹 SSE + socket listener for predictions
  useEffect(() => {
    socketRef.current = io("http://127.0.0.1:5000");

    const evtSource = new EventSource("http://127.0.0.1:5000/predictions");

    evtSource.onmessage = (event) => {
      const word = event.data;

      if (word && word !== lastWordRef.current) {
        lastWordRef.current = word;
        setDisplayWord(word);

        if (voiceEnabled) {
          let msg = new SpeechSynthesisUtterance(word);
          msg.rate = 1.1;
          msg.pitch = 1.2;
          window.speechSynthesis.cancel();
          window.speechSynthesis.speak(msg);
        }
      }
    };

    return () => {
      evtSource.close();
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [voiceEnabled]);

  // 🔹 Camera setup + frame streaming
  useEffect(() => {
    let intervalId;
    const setupCameraAndStream = async () => {
      if (voiceEnabled) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
          });
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.play();

            intervalId = setInterval(() => {
              if (
                videoRef.current &&
                canvasRef.current &&
                socketRef.current &&
                socketRef.current.connected
              ) {
                const video = videoRef.current;
                const canvas = canvasRef.current;
                const context = canvas.getContext("2d");

                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;

                context.drawImage(video, 0, 0, canvas.width, canvas.height);

                const imageData = canvas.toDataURL("image/jpeg", 0.8);
                socketRef.current.emit("video_frame", imageData);
              }
            }, 100);
          }
        } catch (err) {
          console.error("Camera error:", err);
          setDisplayWord("Camera access denied");
          setVoiceEnabled(false);
        }
      } else {
        if (videoRef.current && videoRef.current.srcObject) {
          videoRef.current.srcObject
            .getTracks()
            .forEach((track) => track.stop());
          videoRef.current.srcObject = null;
        }
        clearInterval(intervalId);
      }
    };

    setupCameraAndStream();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
      clearInterval(intervalId);
    };
  }, [voiceEnabled]);

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* 🔹 Navbar at the top */}
      <Navbar />

      {/* 🔹 Background Spline Scene */}
      <div className="absolute inset-0 -z-10">
        <SplineScene dynamicText={displayWord || ""} />
      </div>

      {/* 🔹 Content */}
      <div className="relative z-10 flex flex-col items-center justify-start py-24 px-4 w-full">
        <h1 className="text-5xl font-extrabold text-white mb-4 drop-shadow-lg">
          AI Model
        </h1>
        <p className="text-lg text-gray-200 mb-8 max-w-2xl text-center drop-shadow">
          This page runs our trained sign language recognition model in
          real-time. Enable the camera below and watch your signs being
          translated live.
        </p>

        {/* 🔹 Main Card */}
        <div
          className="
            relative w-full max-w-3xl 
            rounded-2xl p-8 flex flex-col items-center space-y-6
            backdrop-blur-md shadow-2xl z-20
            bg-gradient-to-br from-red-600/90 via-purple-700/80 to-blue-800/90
            border border-white/20
          "
          style={{
            boxShadow: "0px 15px 40px rgba(0,0,0,0.45)",
          }}
        >
          {/* 🔹 Action Button with Shader beside */}
          <div className="flex items-center gap-6 relative">
            <button
              onClick={() => setVoiceEnabled(!voiceEnabled)}
              className={`px-6 py-3 rounded-xl font-semibold text-lg shadow-md transition duration-300 transform ${
                voiceEnabled
                  ? "bg-red-500/90 text-white hover:bg-red-600 hover:scale-105"
                  : "bg-blue-500/90 text-white hover:bg-blue-600 hover:scale-105"
              }`}
            >
              {voiceEnabled ? "🛑 Stop AI Model" : "🔊 Start AI Model"}
            </button>

            {/* 🔹 Shader Strip beside button */}
            {voiceEnabled && (
              <div className="w-32 h-20 flex items-center ">
                <BackgroundShader height="100%" isListening={voiceEnabled} />
              </div>
            )}
          </div>

          {/* Video Preview */}
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full rounded-xl border-4 border-white/30 shadow-lg"
            style={{ transform: "scaleX(-1)" }}
          ></video>

          {/* Hidden canvas */}
          <canvas ref={canvasRef} style={{ display: "none" }}></canvas>

          {/* Output Display */}
          <div className="mt-4 text-xl font-medium text-white drop-shadow">
            {voiceEnabled ? (
              <span>
                Recognized Word:{" "}
                <span className="font-bold text-yellow-300">{displayWord}</span>
              </span>
            ) : (
              <span className="italic text-gray-200">
                Model not running...
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AIModelPage;
