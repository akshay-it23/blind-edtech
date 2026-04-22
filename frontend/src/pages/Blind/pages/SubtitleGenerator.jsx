import React, { useState, useEffect } from "react";
import { Type, ArrowLeft, Mic, Volume2, Settings, History } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

export default function SubtitleGenerator() {
  const navigate = useNavigate();
  const { transcript, listening, resetTranscript } = useSpeechRecognition();
  const [subtitles, setSubtitles] = useState([]);

  const speak = (text) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    if (transcript) {
        // Debounced subtitle update
        const timer = setTimeout(() => {
            setSubtitles(prev => [...prev, transcript].slice(-5));
            resetTranscript();
        }, 3000);
        return () => clearTimeout(timer);
    }
  }, [transcript]);

  useEffect(() => {
    speak("Subtitle Generator ready. Whatever you say will be converted to text and stored in history.");
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <header className="flex items-center gap-6 mb-12">
        <button 
          onClick={() => navigate("/mainblind")}
          onFocus={() => speak("Go back to hub")}
          className="p-4 bg-gray-800 rounded-full"
        >
          <ArrowLeft size={40} />
        </button>
        <h1 className="text-5xl font-black flex items-center gap-4">
          <Type size={56} className="text-blue-500" />
          Subtitle Generator
        </h1>
      </header>

      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        <section className="flex flex-col gap-8">
            <div className="bg-gray-800 p-10 rounded-3xl border-4 border-dashed border-gray-700 flex flex-col items-center justify-center min-h-[300px]">
                <button
                    onClick={() => listening ? SpeechRecognition.stopListening() : SpeechRecognition.startListening({ continuous: true })}
                    className={`p-12 rounded-full mb-6 transition-all ${
                        listening ? 'bg-red-500 animate-pulse' : 'bg-blue-600'
                    }`}
                    onFocus={() => speak(listening ? "Stop listening" : "Start listening")}
                >
                    <Mic size={64} />
                </button>
                <p className="text-3xl font-bold uppercase tracking-widest text-gray-400">
                    {listening ? "Capturing Audio..." : "Tap to Start"}
                </p>
            </div>

            <div className="bg-blue-600/10 border border-blue-500/30 p-8 rounded-3xl min-h-[200px]">
                <h2 className="text-2xl font-bold text-blue-400 uppercase tracking-widest mb-4">Live Transcription</h2>
                <p className="text-4xl font-black leading-tight">
                    {transcript || "Waiting for speech..."}
                </p>
            </div>
        </section>

        <section className="bg-gray-800 p-10 rounded-3xl shadow-2xl flex flex-col">
            <h2 className="text-3xl font-bold flex items-center gap-3 mb-8">
                <History size={32} className="text-blue-500" />
                Transcription History
            </h2>
            <div className="flex-1 space-y-4 overflow-y-auto max-h-[500px] pr-4">
                {subtitles.length === 0 ? (
                    <div className="text-center py-20 text-gray-600 text-2xl italic">
                        No subtitles generated yet.
                    </div>
                ) : (
                    subtitles.map((sub, idx) => (
                        <div 
                            key={idx}
                            className="bg-gray-900/50 p-6 rounded-2xl border-l-4 border-blue-500 hover:bg-gray-700 transition-colors cursor-pointer group"
                            onClick={() => speak(sub)}
                            onFocus={() => speak(`Recorded: ${sub}`)}
                            tabIndex={0}
                        >
                            <div className="flex justify-between items-start gap-4">
                                <p className="text-2xl text-gray-200">{sub}</p>
                                <Volume2 className="text-gray-500 group-hover:text-blue-400 transition-colors shrink-0" size={32} />
                            </div>
                        </div>
                    ))
                )}
            </div>
            <button 
                onClick={() => {
                    setSubtitles([]);
                    speak("History cleared.");
                }}
                className="mt-8 py-5 border-2 border-gray-700 rounded-2xl text-2xl font-bold text-gray-500 hover:text-white hover:border-white transition-all"
            >
                Clear History
            </button>
        </section>
      </div>

      <footer className="mt-16 text-center">
          <div className="inline-flex items-center gap-4 bg-gray-800 px-8 py-4 rounded-full border border-gray-700">
              <Settings className="text-blue-500" />
              <span className="text-xl font-bold uppercase tracking-widest text-gray-400">Settings: Auto-Read Enabled</span>
          </div>
      </footer>
    </div>
  );
}
