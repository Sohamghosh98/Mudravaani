import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import Navbar from "../components/Navbar";
import bgTexture from "/assets/bg.png";
import DustySection from "../components/DustySection";

// --- Configuration ---
const BACKEND_URL = "http://127.0.0.1:5000";
const FRAME_INTERVAL_MS = 100; // 10 FPS
const MAX_SOCKET_BUFFER = 5;   // Max frames to queue before dropping (client-side backpressure)

function AIModelPage() {
    const lastWordRef = useRef("");
    const [voiceEnabled, setVoiceEnabled] = useState(false);
    const [displayWord, setDisplayWord] = useState("");
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const socketRef = useRef(null);

    // 🔹 SSE + Socket Listener for Predictions (This part is perfect)
    useEffect(() => {
        // 1. Initialize Socket.IO connection for sending frames
        socketRef.current = io(BACKEND_URL);

        // 2. Initialize SSE connection for receiving predictions
        const evtSource = new EventSource(`${BACKEND_URL}/predictions`);

        evtSource.onmessage = (event) => {
            const word = event.data;

            if (word && word !== lastWordRef.current) {
                lastWordRef.current = word;
                setDisplayWord(word);

                // Text-to-Speech Output
                if (voiceEnabled) {
                    let msg = new SpeechSynthesisUtterance(word);
                    msg.rate = 1.1;
                    msg.pitch = 1.2;
                    window.speechSynthesis.cancel();
                    window.speechSynthesis.speak(msg);
                }
            }
        };

        // Cleanup: Close connections when component unmounts or voiceEnabled changes
        return () => {
            evtSource.close();
            if (socketRef.current) {
                socketRef.current.disconnect();
            }
        };
    }, [voiceEnabled]);

    // 🔹 Camera setup + frame streaming (Updated for Stability)
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
                            const video = videoRef.current;
                            const canvas = canvasRef.current;
                            const socket = socketRef.current;

                            if (video && canvas && socket && socket.connected) {
                                // --- Client-Side Backpressure Check (Crucial for stability) ---
                                // If the socket's outgoing buffer is too large, it means the network 
                                // or backend can't keep up. Drop the frame instead of queuing it.
                                if (socket.sendBuffer.length > MAX_SOCKET_BUFFER) {
                                    console.warn("Socket buffer full. Dropping frame to reduce lag.");
                                    return; 
                                }

                                const context = canvas.getContext("2d");

                                // Match canvas size to video frame size
                                canvas.width = video.videoWidth;
                                canvas.height = video.videoHeight;

                                // Draw the frame onto the canvas
                                context.drawImage(video, 0, 0, canvas.width, canvas.height);

                                // Convert to compressed JPEG data URL (smaller payload)
                                const imageData = canvas.toDataURL("image/jpeg", 0.8);

                                // Emit the frame to the backend worker
                                socket.emit("video_frame", imageData);
                            }
                        }, FRAME_INTERVAL_MS);
                    }
                } catch (err) {
                    console.error("Camera error:", err);
                    setDisplayWord("Camera access denied");
                    setVoiceEnabled(false);
                }
            } else {
                // Logic to stop camera when voiceEnabled is false
                if (videoRef.current && videoRef.current.srcObject) {
                    videoRef.current.srcObject
                        .getTracks()
                        .forEach((track) => track.stop()); // Stops all tracks (video/audio)
                    videoRef.current.srcObject = null;
                }
                clearInterval(intervalId); // Stop sending frames
            }
        };

        setupCameraAndStream();

        // Final cleanup on component unmount
        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
            }
            clearInterval(intervalId);
        };
    }, [voiceEnabled]);

    return (
        <div
            className="relative min-h-screen flex flex-col pt-10"
            style={{
                backgroundImage: `url(${bgTexture})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundAttachment: "fixed",
            }}
        >
            <Navbar />

            <DustySection>
                <div className="relative z-10 flex flex-col items-center justify-start py-24 px-4 pb-0 w-full pt-20">
                    <h1 className="text-4xl font-extrabold text-white mb-4 drop-shadow-lg">
                        Let The Magic Begin
                    </h1>
                    <p className="text-lg text-gray-200 mb-8 max-w-2xl text-center drop-shadow">
                        This page runs our proprietary sign language intelligence in
                        real-time. Enable the camera below and watch your signs being
                        translated live.
                    </p>

                    {/* Main Card */}
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
                        {/* Action Button */}
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

                        {/* Hidden canvas - Used to grab the frame image data */}
                        <canvas ref={canvasRef} style={{ display: "none" }}></canvas>

                        {/* Output Display */}
                        <div className="mt-4 text-xl font-medium text-white drop-shadow">
                            {voiceEnabled ? (
                                <span>
                                    Recognized Word:{" "}
                                    <span className="font-bold text-yellow-300">
                                        {displayWord}
                                    </span>
                                </span>
                            ) : (
                                <span className="italic text-gray-200">
                                    Model not running...
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </DustySection>
        </div>
    );
}

export default AIModelPage;