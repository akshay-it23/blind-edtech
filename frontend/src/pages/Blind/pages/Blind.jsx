import React, { useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { useNavigate } from "react-router-dom";
import { Book, Bot, Play, MessageSquare, Gamepad2, Code, Home, Mic } from "lucide-react";

export default function BlindHub() {
  const navigate = useNavigate();
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const speak = (text) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  const commands = [
    { command: ["learning", "reader", "pdf"], path: "/blindreader", label: "PDF Reader" },
    { command: ["tutor", "ai", "help"], path: "/aitutor", label: "AI Tutor" },
    { command: ["video", "lessons", "watch"], path: "/blindvideos", label: "Video Gallery" },
    { command: ["youtube", "summary"], path: "/youtubesummary", label: "YouTube Summary" },
    { command: ["game", "quiz", "play"], path: "/game1", label: "Audio Quiz Game" },
    { command: ["code", "viewer", "develop"], path: "/blindcode", label: "Accessibility Code Viewer" },
    { command: ["home", "main", "exit"], path: "/", label: "Home" },
  ];

  useEffect(() => {
    speak("Welcome to the Voice Navigation Hub. Say a command to navigate, or press space to hear options.");
    if (browserSupportsSpeechRecognition) {
      SpeechRecognition.startListening({ continuous: true });
    }
  }, [browserSupportsSpeechRecognition]);

  useEffect(() => {
    const text = transcript.toLowerCase();
    for (const cmd of commands) {
      if (cmd.command.some(trigger => text.includes(trigger))) {
        speak(`Navigating to ${cmd.label}`);
        resetTranscript();
        setTimeout(() => navigate(cmd.path), 1500);
        break;
      }
    }
  }, [transcript, navigate]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.code === "Space") {
        speak("Available commands are: PDF Reader, AI Tutor, Video Gallery, YouTube Summary, Audio Quiz, Code Viewer, and Home.");
      }
      if (e.code === "KeyM") {
        if (listening) {
          SpeechRecognition.stopListening();
          speak("Microphone off");
        } else {
          SpeechRecognition.startListening({ continuous: true });
          speak("Listening started");
        }
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [listening]);

  const navItems = [
    { icon: <Book className="w-12 h-12" />, label: "PDF Reader", path: "/blindreader", color: "bg-blue-600" },
    { icon: <Bot className="w-12 h-12" />, label: "AI Tutor", path: "/aitutor", color: "bg-purple-600" },
    { icon: <Play className="w-12 h-12" />, label: "Video Gallery", path: "/blindvideos", color: "bg-green-600" },
    { icon: <MessageSquare className="w-12 h-12" />, label: "YouTube Summary", path: "/youtubesummary", color: "bg-red-600" },
    { icon: <Gamepad2 className="w-12 h-12" />, label: "Audio Quiz", path: "/game1", color: "bg-yellow-600" },
    { icon: <Code className="w-12 h-12" />, label: "Code Viewer", path: "/blindcode", color: "bg-indigo-600" },
  ];

  if (!browserSupportsSpeechRecognition) {
    return <div className="h-screen bg-gray-900 text-white flex items-center justify-center p-8 text-center text-2xl font-bold">
      Speech Recognition NOT supported in this browser.
    </div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight">Voice Navigation Hub</h1>
          <div className={`flex items-center gap-3 px-6 py-3 rounded-full ${listening ? 'bg-green-500/20 text-green-400 border border-green-500' : 'bg-red-500/20 text-red-400 border border-red-500'}`}>
            <Mic className={listening ? 'animate-pulse' : ''} />
            <span className="font-bold text-lg uppercase tracking-wider">{listening ? "System Listening" : "Mic Inactive"}</span>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {navItems.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                speak(`Navigating to ${item.label}`);
                setTimeout(() => navigate(item.path), 1000);
              }}
              onFocus={() => speak(item.label)}
              onMouseEnter={() => speak(item.label)}
              className={`${item.color} p-10 rounded-2xl shadow-2xl transform transition-all duration-300 hover:scale-105 hover:brightness-110 active:scale-95 text-center flex flex-col items-center justify-center gap-6 group focus:ring-8 focus:ring-white focus:outline-none`}
            >
              <div className="p-4 bg-white/20 rounded-full group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <span className="text-3xl font-bold">{item.label}</span>
            </button>
          ))}
          
          <button
            onClick={() => navigate("/")}
            onFocus={() => speak("Go Home")}
            onMouseEnter={() => speak("Go Home")}
            className="bg-gray-800 p-10 rounded-2xl shadow-2xl transform transition-all hover:scale-105 flex flex-col items-center justify-center gap-6 focus:ring-8 focus:ring-white focus:outline-none"
          >
            <div className="p-4 bg-gray-700 rounded-full">
              <Home className="w-12 h-12" />
            </div>
            <span className="text-3xl font-bold">Go Home</span>
          </button>
        </div>

        <footer className="mt-16 bg-gray-800/50 p-8 rounded-2xl border border-gray-700 text-center">
            <p className="text-2xl text-gray-400 mb-4">You said: <span className="text-white italic">"{transcript || '...'}"</span></p>
            <p className="text-lg text-gray-500">Shortcut: Press <kbd className="bg-gray-700 px-2 py-1 rounded text-white">Space</kbd> for help • Press <kbd className="bg-gray-700 px-2 py-1 rounded text-white">M</kbd> to toggle mic</p>
        </footer>
      </div>
    </div>
  );
}
