import React, { useState } from "react";
import { Send, Trash2, RefreshCw } from "lucide-react";

export default function SignLanguageTranslator() {
  const [text, setText] = useState("");
  const [translated, setTranslated] = useState([]);

  const handleTranslate = () => {
    if (!text.trim()) return;
    // Map each character to its sign language letter reference
    const chars = text.toUpperCase().replace(/[^A-Z ]/g, "").split("");
    setTranslated(chars);
  };

  return (
    <div className="space-y-6 text-white">
      <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <RefreshCw className="text-indigo-400" />
          Text to Sign Visualizer
        </h3>
        <div className="flex gap-3">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type a word or sentence..."
            className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 text-lg"
          />
          <button
            onClick={handleTranslate}
            className="bg-indigo-600 hover:bg-indigo-500 px-6 py-3 rounded-xl flex items-center gap-2 transition-all"
          >
            <Send size={20} />
            Translate
          </button>
        </div>
      </div>

      <div className="bg-white/5 p-6 rounded-2xl border border-white/10 min-h-[300px]">
        {translated.length > 0 ? (
          <div className="flex flex-wrap gap-4 justify-center">
            {translated.map((char, idx) => (
              <div 
                key={idx}
                className={`flex flex-col items-center gap-2 animate-in fade-in zoom-in duration-300`}
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                {char === " " ? (
                  <div className="w-16 h-24 flex items-center justify-center border-b-2 border-white/30 text-gray-500">
                    SPACE
                  </div>
                ) : (
                  <>
                    <div className="w-20 h-24 bg-white/20 rounded-xl flex items-center justify-center text-4xl font-bold border border-white/30 text-indigo-300">
                      {char}
                    </div>
                    <span className="text-xs text-gray-400 font-mono">Sign {char}</span>
                  </>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-gray-500 gap-4">
            <div className="text-6xl text-white/5">👋</div>
            <p>Your translation will appear here. Each letter will be shown as a visual sign guide.</p>
          </div>
        )}
      </div>

      {translated.length > 0 && (
        <button
          onClick={() => { setTranslated([]); setText(""); }}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mx-auto"
        >
          <Trash2 size={18} />
          Clear All
        </button>
      )}
    </div>
  );
}
