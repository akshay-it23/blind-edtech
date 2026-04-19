import { useState, useEffect, useRef, useCallback } from "react";

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
    const isCorrect = answer === currentWord.toLowerCase();
    setScore((prev) => prev + (isCorrect ? 10 : -5));

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
      <div className="text-center text-white">
        <h2 className="text-3xl mb-4">Game Over</h2>
        <h3 className="text-xl mb-4">Score: {score}</h3>
        <button onClick={resetToMenu} className="bg-blue-500 px-4 py-2 rounded">
          Play Again
        </button>
      </div>
    );
  }

  if (!isPlaying) {
    return (
      <div className="text-center text-white">
        <h2 className="text-2xl mb-4">Choose Difficulty</h2>

        <button
          onClick={() => startGame("easy")}
          className="bg-green-500 px-4 py-2 m-2 rounded"
        >
          Easy
        </button>

        <button
          onClick={() => startGame("medium")}
          className="bg-yellow-500 px-4 py-2 m-2 rounded"
        >
          Medium
        </button>

        <button
          onClick={() => startGame("hard")}
          className="bg-red-500 px-4 py-2 m-2 rounded"
        >
          Hard
        </button>
      </div>
    );
  }

  return (
    <div className="text-center text-white">
      <h2 className="text-xl mb-2">Time Left: {timeLeft}s</h2>
      <h2 className="text-xl mb-2">Score: {score}</h2>
      <h2 className="text-xl mb-4">Round: {round}</h2>

      <h1 className="text-3xl mb-4">{currentWord}</h1>

      <input
        value={userInput}
        onChange={(e) => {
          setUserInput(e.target.value);
          userInputRef.current = e.target.value;
        }}
        className="p-2 text-black rounded"
        placeholder="Type spelling..."
      />

      <button onClick={handleSubmit} className="ml-2 bg-blue-500 px-4 py-2 rounded">
        Submit
      </button>
    </div>
  );
};

export default Fingerspell;
