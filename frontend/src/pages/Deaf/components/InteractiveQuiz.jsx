import { useState } from "react";
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
  <div className="text-center text-black bg black">
    <h2 className="text-3xl mb-4">Quiz Completed 🎉</h2>
    <p className="text-xl">Score: {score} / {quizData.length}</p>
    <p className="text-xl">Percentage: {percentage}%</p>
  </div>
);


}

const current = quizData[currentQuestion];

return ( 
 <div
      className="min-h-screen bg-cover bg-black/60  bg-center relative"
      style={{ backgroundImage: `url(${bgquiz})` }}
    >



<div className="text-black  bg-white/80  font blod max-w-xl mx-auto">


  {/* Progress */}
  <div className="mb-4">
    <p>
      Question {currentQuestion + 1} / {quizData.length}
    </p>
    <div className="w-full bg-gray-700 h-2 rounded">
      <div
        className="bg-blue-500 h-2 rounded"
        style={{
          width: `${((currentQuestion + 1) / quizData.length) * 100}%`,
        }}
      ></div>
    </div>
  </div>

  {/* Question */}
  <h2 className="text-xl mb-4">{current.question}</h2>

  {/* Options */}
  <div className="flex flex-col gap-3 font blod ">
    {current.options.map((option, index) => {
      let bg = "bg-white/20";

      if (selectedAnswer) {
        if (option === current.answer) {
          bg = "bg-green-500";
        } else if (option === selectedAnswer) {
          bg = "bg-red-500";
        }
      }

      return (
        <button
          key={index}
          onClick={() => handleAnswer(option)}
          className={`p-3 rounded ${bg}`}
          disabled={selectedAnswer}
        >
          {option}
        </button>
      );
    })}
  </div>

  {/* Next */}
  {selectedAnswer && (
    <button
      onClick={handleNext}
      className="mt-4 bg-blue-600 px-4 py-2 rounded"
    >
      Next
    </button>
  )}
</div>

</div>
);
};

export default InteractiveQuiz;
