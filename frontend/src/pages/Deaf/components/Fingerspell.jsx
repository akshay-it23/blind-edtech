import { useState, useEffect } from "react";

const Fingerspell = () => {
const [difficulty, setDifficulty] = useState(null);
const [currentWord, setCurrentWord] = useState("");
const [userInput, setUserInput] = useState("");
const [score, setScore] = useState(0);
const [timeLeft, setTimeLeft] = useState(30);
const [isPlaying, setIsPlaying] = useState(false);
const [round, setRound] = useState(1);

// word lists
const words = {
easy: ["cat", "dog", "sun", "hat"],
medium: ["apple", "chair", "table", "water"],
hard: ["computer", "elephant", "keyboard", "internet"],
};

// start game
const startGame = (level) => {
setDifficulty(level);
setIsPlaying(true);
setScore(0);
setRound(1);
setUserInput("");


if (level === "easy") setTimeLeft(30);
else if (level === "medium") setTimeLeft(20);
else setTimeLeft(10);

pickWord(level);


};

// pick random word
const pickWord = (level) => {
const list = words[level];
const randomWord = list[Math.floor(Math.random() * list.length)];
setCurrentWord(randomWord);
};

// timer logic
useEffect(() => {
if (!isPlaying) return;

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


}, [isPlaying, round]);

// submit logic
const handleSubmit = () => {
if (userInput.toLowerCase() === currentWord.toLowerCase()) {
setScore((prev) => prev + 10);
} else {
setScore((prev) => prev - 5);
}


setUserInput("");
setRound((prev) => prev + 1);

if (difficulty === "easy") setTimeLeft(30);
else if (difficulty === "medium") setTimeLeft(20);
else setTimeLeft(10);

pickWord(difficulty);


};

// game over after 5 rounds
if (round > 5) {
return ( <div className="text-center text-white"> <h2 className="text-3xl mb-4">Game Over</h2> <h3 className="text-xl mb-4">Score: {score}</h3>
<button
onClick={() => setIsPlaying(false)}
className="bg-blue-500 px-4 py-2 rounded"
>
Play Again </button> </div>
);
}

// difficulty selection screen
if (!isPlaying) {
return ( <div className="text-center text-white"> <h2 className="text-2xl mb-4">Choose Difficulty</h2>


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

// game screen
return ( <div className="text-center text-white">


  <h2 className="text-xl mb-2">Time Left: {timeLeft}s</h2>
  <h2 className="text-xl mb-2">Score: {score}</h2>
  <h2 className="text-xl mb-4">Round: {round}</h2>

  <h1 className="text-3xl mb-4">{currentWord}</h1>

  {/* input */}
  <input
    value={userInput}
    onChange={(e) => setUserInput(e.target.value)}
    className="p-2 text-black rounded"
    placeholder="Type spelling..."
  />

  <button
    onClick={handleSubmit}
    className="ml-2 bg-blue-500 px-4 py-2 rounded"
  >
    Submit
  </button>

</div>

);
};

export default Fingerspell;
