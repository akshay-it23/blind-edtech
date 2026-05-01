import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WORDS = {
  easy: ["cat", "dog", "sun", "hat"],
  medium: ["apple", "chair", "table", "water"],
  hard: ["computer", "elephant", "keyboard", "internet"],
};

const Fingerspell = () => {
  const MAX_ROUNDS = 5;

  const [difficulty, setDifficulty] = useState(null);
  const [currentWord, setCurrentWord] = useState("");
  const [userInput, setUserInput] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isPlaying, setIsPlaying] = useState(false);
  const [round, setRound] = useState(1);
  const [isCorrect, setIsCorrect] = useState(null);
  const userInputRef = useRef("");

  const getTimeForDifficulty = (level) => {
    if (level === "easy") return 30;
    if (level === "medium") return 20;
    return 10;
  };

  const pickWord = useCallback((level) => {
    const list = WORDS[level] || [];
    const randomWord = list[Math.floor(Math.random() * list.length)] || "";
    setCurrentWord(randomWord);
  }, []);

  const startGame = (level) => {
    setDifficulty(level);
    setIsPlaying(true);
    setScore(0);
    setRound(1);
    setUserInput("");
    userInputRef.current = "";
    setTimeLeft(getTimeForDifficulty(level));
    pickWord(level);
  };

  const resetToMenu = () => {
    setIsPlaying(false);
    setDifficulty(null);
    setCurrentWord("");
    setUserInput("");
    userInputRef.current = "";
    setScore(0);
    setRound(1);
    setTimeLeft(30);
  };

  const handleSubmit = useCallback(() => {
    const answer = userInputRef.current.trim().toLowerCase();
    const correct = answer === currentWord.toLowerCase();
    setIsCorrect(correct);
    setScore((prev) => prev + (correct ? 10 : -5));

    setTimeout(() => {
      setIsCorrect(null);
      if (round >= MAX_ROUNDS) {
        setRound(MAX_ROUNDS + 1);
        setUserInput("");
        userInputRef.current = "";
        return;
      }

      setUserInput("");
      userInputRef.current = "";
      setRound((prev) => prev + 1);
      setTimeLeft(getTimeForDifficulty(difficulty));
      pickWord(difficulty);
    }, 1000);
  }, [currentWord, round, difficulty, pickWord]);

  useEffect(() => {
    if (!isPlaying || round > MAX_ROUNDS) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, round, handleSubmit]);

  if (round > MAX_ROUNDS) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center text-white"
      >
        <h2 className="text-3xl mb-4">Game Over</h2>
        <motion.h3 
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          className="text-xl mb-4"
        >
          Final Score: {score}
        </motion.h3>
        <button onClick={resetToMenu} className="bg-indigo-600 hover:bg-indigo-500 px-6 py-3 rounded-xl font-bold transition-colors">
          Play Again
        </button>
      </motion.div>
    );
  }

  if (!isPlaying) {
    return (
      <div className="text-center text-white">
        <motion.h2 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-2xl mb-6"
        >
          Choose Difficulty
        </motion.h2>

        <div className="flex justify-center gap-4">
          {["easy", "medium", "hard"].map((level) => (
            <motion.button
              key={level}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => startGame(level)}
              className={`${
                level === "easy" ? "bg-green-500" : level === "medium" ? "bg-yellow-500" : "bg-red-500"
              } px-6 py-2 rounded-xl font-bold capitalize shadow-lg`}
            >
              {level}
            </motion.button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="text-center text-white max-w-md mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div className="text-left">
          <p className="text-slate-400 text-sm uppercase font-bold">Round</p>
          <p className="text-2xl font-black">{round} / {MAX_ROUNDS}</p>
        </div>
        <div className="text-center">
          <p className="text-slate-400 text-sm uppercase font-bold">Time</p>
          <p className={`text-2xl font-black ${timeLeft < 5 ? "text-red-500 animate-pulse" : ""}`}>{timeLeft}s</p>
        </div>
        <div className="text-right">
          <p className="text-slate-400 text-sm uppercase font-bold">Score</p>
          <AnimatePresence mode="wait">
            <motion.p 
              key={score}
              initial={{ scale: 1.5, color: "#fff" }}
              animate={{ scale: 1, color: isCorrect === true ? "#4ade80" : isCorrect === false ? "#f87171" : "#fff" }}
              className="text-2xl font-black"
            >
              {score}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentWord}
          initial={{ rotateY: 90, opacity: 0 }}
          animate={{ rotateY: 0, opacity: 1 }}
          exit={{ rotateY: -90, opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white/10 p-8 rounded-3xl border border-white/20 mb-8"
        >
          <h1 className="text-5xl font-black tracking-widest uppercase">{currentWord}</h1>
        </motion.div>
      </AnimatePresence>

      <div className="flex gap-2">
        <input
          value={userInput}
          autoFocus
          onChange={(e) => {
            setUserInput(e.target.value);
            userInputRef.current = e.target.value;
          }}
          className="flex-1 p-4 bg-white/10 border border-white/20 rounded-2xl text-white text-xl outline-none focus:border-indigo-500 transition-colors"
          placeholder="Type spelling..."
          onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
        />

        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSubmit} 
          className="bg-indigo-600 px-8 py-4 rounded-2xl font-bold shadow-lg hover:bg-indigo-500 transition-colors"
        >
          Submit
        </motion.button>
      </div>
    </div>
  );
};

export default Fingerspell;

