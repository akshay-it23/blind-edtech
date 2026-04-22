import React, { useState } from "react";
import { Play, ArrowLeft, Search, Volume2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Videos() {
  const navigate = useNavigate();
  const [activeVideo, setActiveVideo] = useState(null);

  const videoList = [
    { id: 1, title: "Introduction to Biology", duration: "15:00", description: "Learn about the basics of life and living organisms." },
    { id: 2, title: "History of Ancient Civilizations", duration: "25:30", description: "A deep dive into the Egyptian and Mesopotamian cultures." },
    { id: 3, title: "Physics: Laws of Motion", duration: "12:45", description: "Understanding Newton's three laws of motion with examples." },
    { id: 4, title: "Geography of World Continents", duration: "20:00", description: "Explore the diverse landscapes across the seven continents." }
  ];

  const speak = (text) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <header className="flex items-center gap-6 mb-12">
        <button 
          onClick={() => navigate("/mainblind")}
          onFocus={() => speak("Go back to hub")}
          className="p-4 bg-gray-800 rounded-full hover:bg-gray-700"
        >
          <ArrowLeft size={40} />
        </button>
        <h1 className="text-5xl font-black">Video Lessons</h1>
      </header>

      <div className="max-w-4xl mx-auto space-y-8">
        {videoList.map((video) => (
          <div 
            key={video.id}
            className="bg-gray-800 p-8 rounded-3xl border-4 border-transparent hover:border-green-500 transition-all cursor-pointer group flex flex-col gap-4"
            onFocus={() => speak(`${video.title}. Duration ${video.duration}. ${video.description}`)}
            onClick={() => {
              speak(`Now playing ${video.title}`);
              setActiveVideo(video);
            }}
            tabIndex={0}
          >
            <div className="flex justify-between items-start">
              <h2 className="text-4xl font-bold text-green-400">{video.title}</h2>
              <span className="bg-gray-700 px-4 py-2 rounded-xl text-xl font-mono">{video.duration}</span>
            </div>
            <p className="text-2xl text-gray-400 leading-relaxed">{video.description}</p>
            <div className="flex items-center gap-4 mt-2">
              <div className="p-4 bg-green-500 rounded-full text-black group-hover:scale-110 transition-transform">
                <Play size={32} fill="currentColor" />
              </div>
              <span className="text-2xl font-bold uppercase tracking-widest text-green-500">Play Lesson</span>
            </div>
          </div>
        ))}
      </div>

      {activeVideo && (
        <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center p-8">
          <div className="w-full max-w-5xl aspect-video bg-gray-800 rounded-3xl flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-green-500/5 animate-pulse flex items-center justify-center">
              <Volume2 size={200} className="text-green-500/20" />
            </div>
            <h2 className="text-6xl font-black text-center px-12 z-10">{activeVideo.title}</h2>
          </div>
          <button 
            onClick={() => {
                setActiveVideo(null);
                speak("Video stopped. Returning to gallery.");
            }}
            className="mt-12 px-12 py-6 bg-red-600 rounded-full text-4xl font-black hover:bg-red-500 shadow-2xl"
          >
            Stop Video
          </button>
        </div>
      )}
    </div>
  );
}
