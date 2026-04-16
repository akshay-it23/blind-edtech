import React, { useEffect, useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { useNavigate } from "react-router-dom";

export default function AuthBlind() {
  const [secretWord] = useState("open");
  const [feedback, setFeedback] = useState("");
  const [attemptCount, setAttemptCount] = useState(0);
  const navigate = useNavigate();
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  const playAudio = (freq) => {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    osc.connect(ctx.destination);
    osc.start();

    setTimeout(() => osc.stop(), 200);
  };

  useEffect(() => {
    if (!transcript) return;

    const text = transcript.toLowerCase();

    if (text.includes(secretWord)) {
      playAudio(800);
      speak("Authentication successful");

      setTimeout(() => {
        navigate("/mainblind");
      }, 2500);
      return;
    }

    if (text.length > 10) {
      setAttemptCount((prev) => {
        const next = prev + 1;
        if (next >= 3) {
          speak("Hint: it rhymes with hope");
        }
        return next;
      });
      setFeedback("Try again");
    }
  }, [navigate, secretWord, transcript]);

  useEffect(() => {
    if (!browserSupportsSpeechRecognition) return;

    SpeechRecognition.startListening({ continuous: true });
    playAudio(400);
    speak("Welcome. Say the secret word to continue.");

    return () => {
      SpeechRecognition.stopListening();
      window.speechSynthesis.cancel();
    };
  }, [browserSupportsSpeechRecognition]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.code !== "Space") return;

      if (listening) {
        SpeechRecognition.stopListening();
        speak("Microphone off");
      } else {
        SpeechRecognition.startListening({ continuous: true });
        speak("Listening started");
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [listening]);

  if (!browserSupportsSpeechRecognition) {
    return (
      <div>
        <input placeholder="Enter secret word" />
        <button>Submit</button>
        <p>{feedback}</p>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-6">Voice Authentication</h1>

        <div
          className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-4 ${
            listening ? "bg-green-500 animate-pulse" : "bg-red-500"
          }`}
        >
          Mic
        </div>

        <p aria-live="polite">
          {listening ? "Listening..." : "Press space to start"}
        </p>

        <p>Say the secret word to continue</p>

        <div className="bg-gray-700 p-3 rounded-lg mt-3">You said: {transcript}</div>

        {feedback && <div className="bg-blue-900 p-3 rounded-lg mt-3">{feedback}</div>}

        <div className="flex gap-3 justify-center mt-4">
          <button onClick={() => SpeechRecognition.stopListening()}>Pause</button>
          <button onClick={resetTranscript}>Clear</button>
        </div>

        <p className="mt-4 text-sm">Press space to toggle mic</p>
        {attemptCount > 0 && <p className="mt-2 text-xs">Attempts: {attemptCount}</p>}
      </div>
    </div>
  );
}

