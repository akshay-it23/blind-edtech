import React, { useState, useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { Bot, Mic, MicOff, Send, Volume2, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Aitutor() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hello! I am your AI Tutor. How can I help you today?" }
  ]);
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  const speak = (text) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  const handleSend = (text) => {
    if (!text.trim()) return;

    const userMessage = { role: "user", content: text };
    setMessages(prev => [...prev, userMessage]);

    // Mock AI Response
    setTimeout(() => {
      const response = getMockResponse(text.toLowerCase());
      const aiMessage = { role: "assistant", content: response };
      setMessages(prev => [...prev, aiMessage]);
      speak(response);
    }, 1000);

    resetTranscript();
  };

  const getMockResponse = (input) => {
    if (input.includes("hello") || input.includes("hi")) return "Hello Akshay! Ready to learn something new?";
    if (input.includes("math")) return "Mathematics is the study of numbers, shapes, and patterns. Would you like to solve a problem?";
    if (input.includes("science")) return "Science is about exploring the natural world through observation and experiment.";
    return "That's an interesting question. Let me look that up for you. In the meantime, is there anything else you'd like to know?";
  };

  useEffect(() => {
    if (!listening && transcript) {
      handleSend(transcript);
    }
  }, [listening]);

  useEffect(() => {
    speak("AI Tutor ready. Say your question aloud or type it below.");
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <header className="p-6 bg-gray-800 border-b border-gray-700 flex items-center gap-4">
        <button 
          onClick={() => navigate("/mainblind")}
          onFocus={() => speak("Go back to hub")}
          className="p-2 hover:bg-gray-700 rounded-full"
        >
          <ArrowLeft size={32} />
        </button>
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Bot size={40} className="text-purple-400" />
          AI Tutor
        </h1>
      </header>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg, idx) => (
          <div 
            key={idx} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            onClick={() => speak(msg.content)}
          >
            <div className={`max-w-[80%] p-6 rounded-2xl shadow-xl text-2xl ${
              msg.role === 'user' ? 'bg-purple-600' : 'bg-gray-800 border border-gray-700'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
      </div>

      <footer className="p-6 bg-gray-800 border-t border-gray-700">
        <div className="max-w-4xl mx-auto flex gap-4 items-center">
          <button
            onClick={() => listening ? SpeechRecognition.stopListening() : SpeechRecognition.startListening()}
            className={`p-6 rounded-full transition-all ${
              listening ? 'bg-red-500 animate-pulse' : 'bg-purple-600'
            }`}
            onFocus={() => speak(listening ? "Stop listening" : "Start listening")}
          >
            {listening ? <MicOff size={40} /> : <Mic size={40} />}
          </button>
          
          <input
            type="text"
            placeholder="Type your question..."
            className="flex-1 bg-gray-700 border-none rounded-xl p-6 text-2xl outline-none focus:ring-4 focus:ring-purple-500"
            onKeyPress={(e) => e.key === 'Enter' && handleSend(e.target.value)}
          />
          
          <button 
            className="p-6 bg-gray-700 rounded-full hover:bg-gray-600"
            onClick={() => speak(messages[messages.length-1].content)}
            onFocus={() => speak("Repeat last message")}
          >
            <Volume2 size={40} />
          </button>
        </div>
        <p className="text-center mt-4 text-gray-500 text-xl">
          {listening ? "Listening... Speak now" : "Tap the microphone and ask a question"}
        </p>
      </footer>
    </div>
  );
}
