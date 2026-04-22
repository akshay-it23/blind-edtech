import React, { useState, useEffect } from "react";
import { Gamepad2, ArrowLeft, Trophy, RefreshCw, Volume2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Game1() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

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
    if (index === questions[currentQuestion].correct) {
      setScore(score + 1);
      speak("Correct! Well done.");
    } else {
      speak(`Incorrect. The correct answer was ${questions[currentQuestion].options[questions[currentQuestion].correct]}`);
    }

    if (currentQuestion + 1 < questions.length) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
        speak(`Next question: ${questions[currentQuestion + 1].q}`);
      }, 2000);
    } else {
      setTimeout(() => {
        setShowResult(true);
        speak(`Game Over. Your final score is ${score + (index === questions[currentQuestion].correct ? 1 : 0)} out of ${questions.length}.`);
      }, 2000);
    }
  };

  useEffect(() => {
    speak(`Welcome to Geography Quiz. Question 1: ${questions[0].q}`);
  }, []);

  if (showResult) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-8 text-center">
        <Trophy size={120} className="text-yellow-500 mb-8 animate-bounce" />
        <h1 className="text-6xl font-black mb-4">Quiz Complete!</h1>
        <p className="text-4xl mb-12 text-gray-400">Total Score: <span className="text-white font-mono">{score} / {questions.length}</span></p>
        <div className="flex gap-6">
          <button 
            onClick={() => window.location.reload()}
            className="flex items-center gap-4 px-10 py-5 bg-blue-600 rounded-2xl text-2xl font-bold hover:bg-blue-500"
            onFocus={() => speak("Play again")}
          >
            <RefreshCw size={32} /> Play Again
          </button>
          <button 
            onClick={() => navigate("/mainblind")}
            className="px-10 py-5 bg-gray-700 rounded-2xl text-2xl font-bold hover:bg-gray-600"
            onFocus={() => speak("Return to hub")}
          >
            Return to Hub
          </button>
        </div>
      </div>
    );
  }

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
          <Gamepad2 size={56} className="text-yellow-500" />
          Geography Quiz
        </h1>
      </header>

      <main className="max-w-4xl mx-auto flex flex-col gap-12">
        <section className="bg-gray-800 p-12 rounded-3xl border-l-8 border-yellow-500 shadow-2xl">
          <p className="text-2xl text-yellow-500 font-bold mb-4 uppercase tracking-widest">Question {currentQuestion + 1} of {questions.length}</p>
          <h2 className="text-5xl font-bold leading-tight">{questions[currentQuestion].q}</h2>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {questions[currentQuestion].options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(idx)}
              onFocus={() => speak(`Option ${idx + 1}: ${option}`)}
              className="p-8 bg-gray-800 rounded-2xl text-3xl font-bold border-4 border-transparent hover:border-blue-500 text-left transition-all focus:bg-blue-600 focus:border-white outline-none flex justify-between items-center group"
            >
              <span>{option}</span>
              <Volume2 className="opacity-0 group-focus:opacity-100 transition-opacity" />
            </button>
          ))}
        </div>
      </main>

      <footer className="mt-12 text-center text-2xl text-gray-500">
        Use <kbd className="bg-gray-700 px-3 py-1 rounded">Tab</kbd> to cycle options and <kbd className="bg-gray-700 px-3 py-1 rounded">Enter</kbd> to select.
      </footer>
    </div>
  );
}
