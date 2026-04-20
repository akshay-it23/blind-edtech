import { useState } from "react";
import { SENTENCES } from "../utils/sentence";
import gameBg from "../assets/game.png";

const shuffleWords = (words) => {
  const arr = [...words];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const Gamification = () => {
  const [index, setIndex] = useState(0);
  const [currentSentence, setCurrentSentence] = useState(SENTENCES[0]);
  const [shuffledWords, setShuffledWords] = useState(() =>
    shuffleWords(SENTENCES[0].split(" "))
  );
  const [selectedWords, setSelectedWords] = useState([]);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [streak, setStreak] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [feedback, setFeedback] = useState({
    type: "info",
    message: "Arrange the words to form a correct sentence.",
  });

  const handleWordClick = (word, idx) => {
    if (answered) return;

    const newWords = [...shuffledWords];
    newWords.splice(idx, 1);

    setShuffledWords(newWords);
    setSelectedWords([...selectedWords, word]);
  };

  const handleSelectedWordClick = (word, idx) => {
    if (answered) return;

    const newSelectedWords = [...selectedWords];
    newSelectedWords.splice(idx, 1);
    setSelectedWords(newSelectedWords);
    setShuffledWords([...shuffledWords, word]);
  };

  const resetCurrentAttempt = () => {
    if (answered) return;
    setShuffledWords(shuffleWords([...shuffledWords, ...selectedWords]));
    setSelectedWords([]);
    setFeedback({ type: "info", message: "Try building the sentence again." });
  };

  const checkAnswer = () => {
    if (selectedWords.length !== currentSentence.split(" ").length) {
      setFeedback({ type: "warning", message: "Use all words before checking your answer." });
      return;
    }

    const userSentence = selectedWords.join(" ");
    setAttempts((prev) => prev + 1);

    if (userSentence === currentSentence) {
      setScore((prev) => prev + 1);
      setStreak((prev) => prev + 1);
      setAnswered(true);
      setFeedback({ type: "success", message: "Perfect. Great sentence flow." });
    } else {
      setStreak(0);
      setAnswered(true);
      setFeedback({ type: "error", message: `Not quite. Correct sentence: "${currentSentence}"` });
    }
  };

  const nextSentence = () => {
    const nextIndex = (index + 1) % SENTENCES.length;
    const nextSentenceValue = SENTENCES[nextIndex];

    setIndex(nextIndex);
    setCurrentSentence(nextSentenceValue);
    setShuffledWords(shuffleWords(nextSentenceValue.split(" ")));
    setSelectedWords([]);
    setAnswered(false);
    setFeedback({ type: "info", message: "Arrange the words to form a correct sentence." });
  };

  const progressPercent = Math.round(((index + 1) / SENTENCES.length) * 100);

  const feedbackStyles = {
    info: "border-sky-200 bg-sky-50 text-sky-700",
    warning: "border-amber-200 bg-amber-50 text-amber-700",
    success: "border-emerald-200 bg-emerald-50 text-emerald-700",
    error: "border-rose-200 bg-rose-50 text-rose-700",
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-cyan-50 via-white to-amber-50 px-4 py-8 sm:px-6 lg:px-8">
      <div
        className="pointer-events-none absolute inset-0 bg-center bg-no-repeat opacity-10"
        style={{
          backgroundImage: `url(${gameBg})`,
          backgroundSize: "cover",
          filter: "grayscale(20%) brightness(1.35)",
        }}
      />
      <div className="mx-auto w-full max-w-5xl">
        <div className="rounded-3xl border border-cyan-100 bg-white/90 p-6 shadow-[0_18px_60px_-24px_rgba(8,145,178,0.45)] backdrop-blur-sm sm:p-8">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-600">Gamification</p>
              <h2 className="mt-2 text-3xl font-black text-slate-900 sm:text-4xl">Sentence Builder</h2>
              <p className="mt-2 text-sm text-slate-600 sm:text-base">
                Tap words in order to build a complete sentence and level up your communication accuracy.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3 text-center text-sm sm:text-base">
              <div className="rounded-2xl border border-cyan-100 bg-cyan-50 px-4 py-3">
                <p className="text-xs uppercase tracking-wide text-cyan-700">Score</p>
                <p className="text-xl font-bold text-cyan-900">{score}</p>
              </div>
              <div className="rounded-2xl border border-amber-100 bg-amber-50 px-4 py-3">
                <p className="text-xs uppercase tracking-wide text-amber-700">Attempts</p>
                <p className="text-xl font-bold text-amber-900">{attempts}</p>
              </div>
              <div className="rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3">
                <p className="text-xs uppercase tracking-wide text-emerald-700">Streak</p>
                <p className="text-xl font-bold text-emerald-900">{streak}</p>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <div className="mb-2 flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-slate-500">
              <span>
                Round {index + 1} of {SENTENCES.length}
              </span>
              <span>{progressPercent}%</span>
            </div>
            <div className="h-2.5 w-full rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-amber-400 transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <div className="mb-6 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Your sentence</p>
            <div className="mt-3 min-h-14 rounded-xl border border-dashed border-slate-300 bg-white p-3">
              {selectedWords.length ? (
                <div className="flex flex-wrap gap-2">
                  {selectedWords.map((word, idx) => (
                    <button
                      key={`${word}-${idx}`}
                      onClick={() => handleSelectedWordClick(word, idx)}
                      className="rounded-full border border-cyan-200 bg-cyan-100 px-3 py-1 text-sm font-semibold text-cyan-800 transition hover:-translate-y-0.5 hover:bg-cyan-200"
                    >
                      {word}
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-400">Selected words appear here. Click a selected word to remove it.</p>
              )}
            </div>
          </div>

          <div className="mb-6">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Word bank</p>
            <div className="flex min-h-16 flex-wrap gap-2 rounded-2xl border border-slate-200 bg-white p-4">
              {shuffledWords.length ? (
                shuffledWords.map((word, idx) => (
                  <button
                    key={`${word}-${idx}`}
                    onClick={() => handleWordClick(word, idx)}
                    className="rounded-full border border-amber-200 bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-800 transition hover:-translate-y-0.5 hover:bg-amber-200"
                  >
                    {word}
                  </button>
                ))
              ) : (
                <p className="text-sm text-slate-400">All words selected.</p>
              )}
            </div>
          </div>

          <div className={`mb-6 rounded-xl border px-4 py-3 text-sm font-medium ${feedbackStyles[feedback.type]}`}>
            {feedback.message}
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={checkAnswer}
              disabled={answered}
              className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              Check Answer
            </button>
            <button
              onClick={resetCurrentAttempt}
              disabled={answered || selectedWords.length === 0}
              className="rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Reset Attempt
            </button>
            <button
              onClick={nextSentence}
              className="rounded-xl bg-cyan-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-cyan-700"
            >
              Next Sentence
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gamification;