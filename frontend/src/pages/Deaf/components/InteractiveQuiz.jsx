import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import bgquiz from "../assets/quiz.png"

const quizData = [
  {
    question: "What is the sign for 'Hello'?",
    options: ["Wave hand", "Clap", "Jump", "Point"],
    answer: "Wave hand",
  },
  {
    question: "Which letter is shown by a fist?",
    options: ["A", "B", "C", "D"],
    answer: "A",
  },
  {
    question: "Sign for 'Thank You' involves?",
    options: ["Touch chin", "Clap", "Wave", "Jump"],
    answer: "Touch chin",
  },
  {
    question: "How many fingers used in letter 'W'?",
    options: ["2", "3", "4", "5"],
    answer: "3",
  },
  {
    question: "Which sign means 'Yes'?",
    options: ["Nod fist", "Shake head", "Jump", "Clap"],
    answer: "Nod fist",
  },
  {
    question: "Which letter is open palm?",
    options: ["B", "A", "C", "D"],
    answer: "B",
  },
  {
    question: "Sign for 'No' is?",
    options: ["Pinch fingers", "Wave", "Clap", "Jump"],
    answer: "Pinch fingers",
  },
  {
    question: "Which uses 2 fingers?",
    options: ["V", "A", "B", "C"],
    answer: "V",
  },
  {
    question: "Sign for 'Sorry' involves?",
    options: ["Circle chest", "Clap", "Jump", "Wave"],
    answer: "Circle chest",
  },
  {
    question: "Which letter is curved hand?",
    options: ["C", "A", "B", "D"],
    answer: "C",
  },
];

const InteractiveQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (option) => {
    setSelectedAnswer(option);
    if (option === quizData[currentQuestion].answer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    if (currentQuestion + 1 < quizData.length) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  if (showResult) {
    const percentage = ((score / quizData.length) * 100).toFixed(0);

    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center text-white bg-slate-900/80 p-12 rounded-3xl backdrop-blur-md border border-white/10"
      >
        <h2 className="text-5xl font-black mb-6">Quiz Completed 🎉</h2>
        <motion.p 
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          className="text-3xl mb-4"
        >
          Score: <motion.span key={score} initial={{ scale: 1.5 }} animate={{ scale: 1 }} className="text-indigo-400 font-mono">{score} / {quizData.length}</motion.span>
        </motion.p>
        <p className="text-2xl text-gray-400">Percentage: {percentage}%</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-8 bg-indigo-600 px-8 py-3 rounded-xl font-bold hover:bg-indigo-500 transition-colors shadow-lg"
        >
          Try Again
        </button>
      </motion.div>
    );
  }

  const current = quizData[currentQuestion];

  return ( 
    <div
      className="min-h-screen bg-cover bg-center relative flex items-center justify-center p-4"
      style={{ backgroundImage: `url(${bgquiz})` }}
    >
      <div className="absolute inset-0 bg-black/60" />

      <motion.div 
        key={currentQuestion}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        className="relative z-10 text-white bg-slate-900/90 p-8 rounded-3xl border border-white/10 shadow-2xl max-w-xl w-full backdrop-blur-md"
      >
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-end mb-2">
            <p className="text-indigo-400 font-bold uppercase tracking-widest text-sm">
              Question {currentQuestion + 1} / {quizData.length}
            </p>
            <p className="text-sm text-gray-400 font-mono">
              Score: {score}
            </p>
          </div>
          <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
            <motion.div
              className="bg-indigo-500 h-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentQuestion + 1) / quizData.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            ></motion.div>
          </div>
        </div>

        {/* Question */}
        <h2 className="text-3xl font-bold mb-8 leading-tight">{current.question}</h2>

        {/* Options */}
        <div className="flex flex-col gap-4">
          <AnimatePresence>
            {current.options.map((option, index) => {
              let state = "idle";
              if (selectedAnswer) {
                if (option === current.answer) state = "correct";
                else if (option === selectedAnswer) state = "wrong";
                else state = "disabled";
              }

              return (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={!selectedAnswer ? { scale: 1.02, x: 10 } : {}}
                  whileTap={!selectedAnswer ? { scale: 0.98 } : {}}
                  onClick={() => handleAnswer(option)}
                  className={`p-5 rounded-2xl text-xl font-bold text-left transition-colors border ${
                    state === "correct" ? "bg-emerald-500/20 border-emerald-500 text-emerald-400" :
                    state === "wrong" ? "bg-rose-500/20 border-rose-500 text-rose-400" :
                    state === "disabled" ? "bg-white/5 border-white/5 opacity-50 text-gray-500" :
                    "bg-white/5 border-white/10 hover:border-indigo-500/50"
                  }`}
                  disabled={selectedAnswer}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {state === "correct" && <span>✓</span>}
                    {state === "wrong" && <span>✗</span>}
                  </div>
                </motion.button>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Next */}
        <AnimatePresence>
          {selectedAnswer && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={handleNext}
              className="mt-8 w-full bg-indigo-600 px-4 py-4 rounded-2xl font-black text-xl hover:bg-indigo-500 shadow-lg"
            >
              Next Question
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default InteractiveQuiz;

