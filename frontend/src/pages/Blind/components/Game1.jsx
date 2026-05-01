import React, { useState, useEffect } from "react";
import { Gamepad2, ArrowLeft, Trophy, RefreshCw, Volume2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Game1() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [lastCorrect, setLastCorrect] = useState(null);

  const questions = [
    {
      q: "What is the capital of France?",
      options: ["London", "Berlin", "Paris", "Madrid"],
      correct: 2
    },
    {
      q: "Which ocean is the largest on Earth?",
      options: ["Atlantic", "Indian", "Arctic", "Pacific"],
      correct: 3
    },
    {
      q: "Which country is known as the Land of the Rising Sun?",
      options: ["China", "Japan", "South Korea", "Thailand"],
      correct: 1
    },
    {
      q: "What is the longest river in the world?",
      options: ["Amazon", "Nile", "Yangtze", "Mississippi"],
      correct: 1
    }
  ];

  const speak = (text) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  const handleAnswer = (index) => {
    const correct = index === questions[currentQuestion].correct;
    setLastCorrect(correct);
    if (correct) {
      setScore(score + 1);
      speak("Correct! Well done.");
    } else {
      speak(`Incorrect. The correct answer was ${questions[currentQuestion].options[questions[currentQuestion].correct]}`);
    }

    if (currentQuestion + 1 < questions.length) {
      setTimeout(() => {
        setLastCorrect(null);
        setCurrentQuestion(currentQuestion + 1);
        speak(`Next question: ${questions[currentQuestion + 1].q}`);
      }, 2000);
    } else {
      setTimeout(() => {
        setShowResult(true);
        speak(`Game Over. Your final score is ${score + (correct ? 1 : 0)} out of ${questions.length}.`);
      }, 2000);
    }
  };

  useEffect(() => {
    speak(`Welcome to Geography Quiz. Question 1: ${questions[0].q}`);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-900 text-white p-8 overflow-hidden"
    >
      <AnimatePresence mode="wait">
        {showResult ? (
          <motion.div 
            key="result"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="min-h-[80vh] flex flex-col items-center justify-center p-8 text-center"
          >
            <motion.div
              animate={{ rotate: [0, -10, 10, -10, 10, 0], scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <Trophy size={140} className="text-yellow-500 mb-8" />
            </motion.div>
            <h1 className="text-6xl font-black mb-4">Quiz Complete!</h1>
            <motion.p 
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              className="text-4xl mb-12 text-gray-400"
            >
              Total Score: <motion.span key={score} initial={{ scale: 1.5 }} animate={{ scale: 1 }} className="text-white font-mono">{score} / {questions.length}</motion.span>
            </motion.p>
            <div className="flex gap-6">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.reload()}
                className="flex items-center gap-4 px-10 py-5 bg-blue-600 rounded-2xl text-2xl font-bold hover:bg-blue-500 shadow-lg"
                onFocus={() => speak("Play again")}
              >
                <RefreshCw size={32} /> Play Again
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/mainblind")}
                className="px-10 py-5 bg-gray-700 rounded-2xl text-2xl font-bold hover:bg-gray-600"
                onFocus={() => speak("Return to hub")}
              >
                Return to Hub
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="game"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="max-w-6xl mx-auto"
          >
            <header className="flex items-center gap-6 mb-12">
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => navigate("/mainblind")}
                onFocus={() => speak("Go back to hub")}
                className="p-4 bg-gray-800 rounded-full"
              >
                <ArrowLeft size={40} />
              </motion.button>
              <h1 className="text-5xl font-black flex items-center gap-4">
                <Gamepad2 size={56} className="text-yellow-500" />
                Geography Quiz
              </h1>
              <div className="ml-auto text-3xl font-black bg-white/5 px-6 py-3 rounded-2xl border border-white/10">
                Score: <motion.span key={score} initial={{ scale: 1.5, color: "#eab308" }} animate={{ scale: 1, color: "#fff" }}>{score}</motion.span>
              </div>
            </header>

            <main className="max-w-4xl mx-auto flex flex-col gap-12">
              <motion.section 
                key={currentQuestion}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-800 p-12 rounded-3xl border-l-8 border-yellow-500 shadow-2xl"
              >
                <p className="text-2xl text-yellow-500 font-bold mb-4 uppercase tracking-widest">Question {currentQuestion + 1} of {questions.length}</p>
                <h2 className="text-5xl font-bold leading-tight">{questions[currentQuestion].q}</h2>
              </motion.section>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {questions[currentQuestion].options.map((option, idx) => (
                  <motion.button
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAnswer(idx)}
                    onFocus={() => speak(`Option ${idx + 1}: ${option}`)}
                    className="p-8 bg-gray-800 rounded-2xl text-3xl font-bold border-4 border-transparent hover:border-blue-500 text-left transition-all focus:bg-blue-600 focus:border-white outline-none flex justify-between items-center group shadow-lg"
                  >
                    <span>{option}</span>
                    <Volume2 className="opacity-0 group-focus:opacity-100 transition-opacity" />
                  </motion.button>
                ))}
              </div>
            </main>

            <footer className="mt-12 text-center text-2xl text-gray-500">
              Use <kbd className="bg-gray-700 px-3 py-1 rounded">Tab</kbd> to cycle options and <kbd className="bg-gray-700 px-3 py-1 rounded">Enter</kbd> to select.
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

