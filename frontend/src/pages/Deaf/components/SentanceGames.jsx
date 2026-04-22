import React, { useState, useEffect } from "react";
import { MessageSquare, RefreshCw, CheckCircle, ArrowRight } from "lucide-react";

const SENTENCES = [
  "I love learning sign language",
  "The weather is beautiful today",
  "Technology makes life easier",
  "Inclusive education is important",
  "Communication is a human right"
];

export default function SentanceGames() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [shuffled, setShuffled] = useState([]);
  const [selected, setSelected] = useState([]);
  const [status, setStatus] = useState("playing"); // playing, correct, wrong

  const initGame = (idx) => {
    const words = SENTENCES[idx].split(" ");
    setShuffled([...words].sort(() => Math.random() - 0.5));
    setSelected([]);
    setStatus("playing");
  };

  useEffect(() => {
    initGame(currentIdx);
  }, [currentIdx]);

  const handleWordClick = (word, index) => {
    if (status !== "playing") return;
    setSelected([...selected, word]);
    setShuffled(shuffled.filter((_, i) => i !== index));
  };

  const handleRemoveClick = (word, index) => {
    if (status !== "playing") return;
    setShuffled([...shuffled, word]);
    setSelected(selected.filter((_, i) => i !== index));
  };

  const checkResult = () => {
    const userSentence = selected.join(" ");
    if (userSentence === SENTENCES[currentIdx]) {
      setStatus("correct");
    } else {
      setStatus("wrong");
    }
  };

  return (
    <div className="flex flex-col gap-8 text-white max-w-4xl mx-auto p-4">
      <header className="text-center">
        <h2 className="text-4xl font-black mb-2 flex items-center justify-center gap-3">
          <MessageSquare className="text-indigo-400" />
          Sentence Unscramble
        </h2>
        <p className="text-gray-400">Put the words in the correct order</p>
      </header>

      <section className="bg-white/5 border border-white/10 p-10 rounded-[2rem] shadow-2xl min-h-[200px] flex flex-wrap items-center justify-center gap-3">
        {selected.length > 0 ? (
          selected.map((word, i) => (
            <button
              key={i}
              onClick={() => handleRemoveClick(word, i)}
              className={`px-6 py-3 rounded-2xl text-2xl font-bold transition-all ${
                status === "correct" ? "bg-emerald-500" : status === "wrong" ? "bg-rose-500" : "bg-indigo-600 hover:bg-indigo-500"
              }`}
            >
              {word}
            </button>
          ))
        ) : (
          <p className="text-gray-600 text-2xl italic">Select words from below...</p>
        )}
      </section>

      <section className="flex flex-wrap justify-center gap-3 py-8">
        {shuffled.map((word, i) => (
          <button
            key={i}
            onClick={() => handleWordClick(word, i)}
            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-white/10 rounded-2xl text-2xl font-bold transition-all active:scale-95"
          >
            {word}
          </button>
        ))}
      </section>

      <footer className="flex justify-center gap-4">
        {status === "playing" ? (
          <>
            <button 
              onClick={() => initGame(currentIdx)}
              className="px-8 py-4 bg-gray-800 rounded-2xl font-bold text-xl flex items-center gap-2"
            >
              <RefreshCw size={24} /> Reset
            </button>
            <button 
              onClick={checkResult}
              disabled={shuffled.length > 0}
              className="px-12 py-4 bg-indigo-600 disabled:bg-gray-700 rounded-2xl font-bold text-xl flex items-center gap-2"
            >
              <CheckCircle size={24} /> Check Answer
            </button>
          </>
        ) : (
          <button 
            onClick={() => setCurrentIdx((currentIdx + 1) % SENTENCES.length)}
            className="px-12 py-4 bg-emerald-600 rounded-2xl font-bold text-2xl flex items-center gap-3 hover:bg-emerald-500 animate-pulse"
          >
            Next Sentence <ArrowRight size={32} />
          </button>
        )}
      </footer>

      {status === "wrong" && (
        <p className="text-center text-rose-400 font-bold text-xl">Not quite right. Try again!</p>
      )}
    </div>
  );
}
