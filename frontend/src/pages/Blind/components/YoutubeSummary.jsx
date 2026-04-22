import React, { useState } from "react";
import { Play, ArrowLeft, Send, Sparkles, Volume2, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function YoutubeSummary() {
  const navigate = useNavigate();
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState("");

  const speak = (text) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  const handleSummarize = () => {
    if (!url.includes("youtube.com") && !url.includes("youtu.be")) {
        speak("Invalid YouTube URL. Please provide a valid link.");
        return;
    }

    setLoading(true);
    speak("Summarizing video. This will take a moment.");

    // Mock summary generation
    setTimeout(() => {
      setLoading(false);
      const mockSummary = "This video discusses the impact of artificial intelligence on modern education. Key points include personalized learning paths, automated grading systems, and the new role of teachers as facilitators. The speaker concludes that AI will complement rather than replace human educators.";
      setSummary(mockSummary);
      speak(`Summary ready: ${mockSummary}`);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 flex flex-col">
      <header className="flex items-center gap-6 mb-12">
        <button 
          onClick={() => navigate("/mainblind")}
          onFocus={() => speak("Go back to hub")}
          className="p-4 bg-gray-800 rounded-full hover:bg-gray-700"
        >
          <ArrowLeft size={40} />
        </button>
        <h1 className="text-5xl font-black flex items-center gap-4">
          <Play size={56} className="text-red-500" />
          YouTube Summary
        </h1>
      </header>

      <div className="flex-1 max-w-4xl mx-auto w-full flex flex-col gap-12">
        <section className="bg-gray-800 p-10 rounded-3xl shadow-2xl border border-gray-700">
          <label className="block text-3xl font-bold mb-6">Enter YouTube URL</label>
          <div className="flex gap-4">
            <input 
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              className="flex-1 bg-gray-900 border-2 border-gray-700 rounded-2xl p-6 text-2xl outline-none focus:border-red-500"
              tabIndex={0}
            />
            <button 
              onClick={handleSummarize}
              disabled={loading}
              className={`px-8 rounded-2xl flex items-center justify-center transition-all ${
                loading ? 'bg-gray-700 text-gray-500' : 'bg-red-600 hover:bg-red-500 text-white'
              }`}
              onFocus={() => speak("Summarize video")}
            >
              {loading ? <RefreshCw size={40} className="animate-spin" /> : <Send size={40} />}
            </button>
          </div>
        </section>

        {loading && (
          <div className="text-center animate-pulse">
            <div className="inline-block p-8 bg-gray-800 rounded-full border-4 border-red-500 mb-6">
              <Sparkles size={64} className="text-red-500" />
            </div>
            <h2 className="text-4xl font-bold">AI is thinking...</h2>
          </div>
        )}

        {summary && !loading && (
          <section className="bg-gray-800 p-10 rounded-3xl shadow-2xl border-l-8 border-red-500 animate-in fade-in slide-in-from-bottom-8 duration-500">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-4xl font-bold text-red-500 uppercase tracking-tighter">AI Summary</h2>
              <button 
                onClick={() => speak(summary)}
                className="p-4 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors"
                onFocus={() => speak("Repeat summary")}
              >
                <Volume2 size={40} />
              </button>
            </div>
            <p className="text-3xl leading-relaxed text-gray-200">
              {summary}
            </p>
          </section>
        )}
      </div>

      <footer className="mt-12 text-center text-xl text-gray-500">
          Paste any educational video link to get an instant audio overview.
      </footer>
    </div>
  );
}
