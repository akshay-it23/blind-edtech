import React, { useState, useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Mic, MicOff, Send, Volume2, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Aitutor() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hello! I am your AI Tutor. How can I help you today?" }
  ]);
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-6">
        Speech recognition is not supported in this browser.
      </div>
    );
  }

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
    speak("AI Tutor ready. Say your question aloud or type it below.");
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-900 text-white flex flex-col"
    >
      <header className="p-6 bg-gray-800 border-b border-gray-700 flex items-center gap-4 shadow-xl">
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate("/mainblind")}
          onFocus={() => speak("Go back to hub")}
          className="p-2 hover:bg-gray-700 rounded-full"
        >
          <ArrowLeft size={32} />
        </motion.button>
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Bot size={40} className="text-purple-400" />
          AI Tutor
        </h1>
      </header>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <AnimatePresence initial={false}>
          {messages.map((msg, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, scale: 0.8, y: 20, x: msg.role === 'user' ? 20 : -20 }}
              animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              onClick={() => speak(msg.content)}
            >
              <div className={`max-w-[80%] p-6 rounded-2xl shadow-xl text-2xl cursor-pointer transition-transform hover:scale-[1.02] ${
                msg.role === 'user' ? 'bg-purple-600' : 'bg-gray-800 border border-gray-700'
              }`}>
                {msg.content}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <footer className="p-6 bg-gray-800 border-t border-gray-700 shadow-2xl">
        <div className="max-w-4xl mx-auto flex gap-4 items-center">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              if (listening) {
                SpeechRecognition.stopListening();
                if (transcript.trim()) {
                  handleSend(transcript);
                }
                return;
              }

              resetTranscript();
              SpeechRecognition.startListening();
            }}
            className={`p-6 rounded-full transition-all shadow-lg ${
              listening ? 'bg-red-500 animate-pulse' : 'bg-purple-600'
            }`}
            onFocus={() => speak(listening ? "Stop listening" : "Start listening")}
          >
            {listening ? <MicOff size={40} /> : <Mic size={40} />}
          </motion.button>
          
          <input
            type="text"
            placeholder="Type your question..."
            className="flex-1 bg-gray-700 border-none rounded-xl p-6 text-2xl outline-none focus:ring-4 focus:ring-purple-500 transition-all"
            onKeyPress={(e) => e.key === 'Enter' && handleSend(e.target.value)}
          />
          
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-6 bg-gray-700 rounded-full hover:bg-gray-600 shadow-lg"
            onClick={() => speak(messages[messages.length-1].content)}
            onFocus={() => speak("Repeat last message")}
          >
            <Volume2 size={40} />
          </motion.button>
        </div>
        <p className="text-center mt-4 text-gray-500 text-xl">
          {listening ? "Listening... Speak now" : "Tap the microphone and ask a question"}
        </p>
      </footer>
    </motion.div>
  );
}

