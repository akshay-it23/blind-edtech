import React, { useState, useEffect } from "react";
import { MessageSquare, RefreshCw, CheckCircle, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
    setShuffled(words.map((w, i) => ({ id: `s-${i}-${Date.now()}`, word: w })).sort(() => Math.random() - 0.5));
    setSelected([]);
    setStatus("playing");
  };

  useEffect(() => {
    initGame(currentIdx);
  }, [currentIdx]);

  const handleWordClick = (item, index) => {
    if (status !== "playing") return;
    setSelected([...selected, item]);
    setShuffled(shuffled.filter((_, i) => i !== index));
  };

  const handleRemoveClick = (item, index) => {
    if (status !== "playing") return;
    setShuffled([...shuffled, item]);
    setSelected(selected.filter((_, i) => i !== index));
  };

  const checkResult = () => {
    const userSentence = selected.map(s => s.word).join(" ");
    if (userSentence === SENTENCES[currentIdx]) {
      setStatus("correct");
    } else {
      setStatus("wrong");
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col gap-8 text-white max-w-4xl mx-auto p-4"
    >
      <motion.header 
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        className="text-center"
      >
        <h2 className="text-4xl font-black mb-2 flex items-center justify-center gap-3">
          <MessageSquare className="text-indigo-400" />
          Sentence Unscramble
        </h2>
        <p className="text-gray-400">Put the words in the correct order</p>
      </motion.header>

      <motion.section 
        layout
        className={`bg-white/5 border border-white/10 p-10 rounded-[2rem] shadow-2xl min-h-[220px] flex flex-wrap items-center justify-center gap-3 transition-colors duration-500 ${
          status === "correct" ? "bg-emerald-500/10 border-emerald-500/30" : status === "wrong" ? "bg-rose-500/10 border-rose-500/30" : ""
        }`}
      >
        <AnimatePresence>
          {selected.length > 0 ? (
            selected.map((item, i) => (
              <motion.button
                key={item.id}
                layoutId={item.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleRemoveClick(item, i)}
                className={`px-6 py-3 rounded-2xl text-2xl font-bold transition-all shadow-lg ${
                  status === "correct" ? "bg-emerald-500" : status === "wrong" ? "bg-rose-500" : "bg-indigo-600 hover:bg-indigo-500"
                }`}
              >
                {item.word}
              </motion.button>
            ))
          ) : (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-gray-600 text-2xl italic"
            >
              Select words from below...
            </motion.p>
          )}
        </AnimatePresence>
      </motion.section>

      <section className="flex flex-wrap justify-center gap-3 py-8 min-h-[120px]">
        <AnimatePresence>
          {shuffled.map((item, i) => (
            <motion.button
              key={item.id}
              layoutId={item.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.05, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleWordClick(item, i)}
              className="px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-white/10 rounded-2xl text-2xl font-bold transition-all shadow-md"
            >
              {item.word}
            </motion.button>
          ))}
        </AnimatePresence>
      </section>

      <motion.footer 
        layout
        className="flex justify-center gap-4"
      >
        <AnimatePresence mode="wait">
          {status === "playing" ? (
            <motion.div 
              key="controls"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex gap-4"
            >
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => initGame(currentIdx)}
                className="px-8 py-4 bg-gray-800 rounded-2xl font-bold text-xl flex items-center gap-2 hover:bg-gray-700 transition-colors"
              >
                <RefreshCw size={24} /> Reset
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={checkResult}
                disabled={shuffled.length > 0}
                className="px-12 py-4 bg-indigo-600 disabled:bg-gray-700 rounded-2xl font-bold text-xl flex items-center gap-2 hover:bg-indigo-500 transition-colors shadow-lg"
              >
                <CheckCircle size={24} /> Check Answer
              </motion.button>
            </motion.div>
          ) : (
            <motion.button 
              key="next"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentIdx((currentIdx + 1) % SENTENCES.length)}
              className="px-12 py-4 bg-emerald-600 rounded-2xl font-bold text-2xl flex items-center gap-3 hover:bg-emerald-500 shadow-xl"
            >
              Next Sentence <ArrowRight size={32} />
            </motion.button>
          )}
        </AnimatePresence>
      </motion.footer>

      <AnimatePresence>
        {status === "wrong" && (
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-center text-rose-400 font-bold text-xl"
          >
            Not quite right. Try again!
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

