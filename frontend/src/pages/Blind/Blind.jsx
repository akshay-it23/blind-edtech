import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import {
  BookOpen,
  Bot,
  FileText,
  Headphones,
  Mic,
  Sparkles,
  Video,
  Code2,
  PlayCircle,
} from "lucide-react";

const Blind = () => {
  const navigate = useNavigate();

  const { transcript, listening, resetTranscript } =
    useSpeechRecognition();

  const supported = SpeechRecognition.browserSupportsSpeechRecognition();

  const hubCards = [
    {
      title: "PDF Reader",
      description: "Open a readable document mode and listen to content aloud.",
      icon: FileText,
      to: "/blindreader",
      accent: "from-cyan-500/20 to-sky-500/10 border-cyan-400/30",
    },
    {
      title: "AI Tutor",
      description: "Ask questions and get guided, voice-assisted help.",
      icon: Bot,
      to: "/aitutor",
      accent: "from-violet-500/20 to-fuchsia-500/10 border-violet-400/30",
    },
    {
      title: "Learning Videos",
      description: "Browse lessons and play accessible learning media.",
      icon: Video,
      to: "/blindvideos",
      accent: "from-amber-500/20 to-orange-500/10 border-amber-400/30",
    },
    {
      title: "YouTube Summary",
      description: "Turn video content into a quick spoken summary.",
      icon: PlayCircle,
      to: "/youtubesummary",
      accent: "from-emerald-500/20 to-green-500/10 border-emerald-400/30",
    },
    {
      title: "Quiz Game",
      description: "Practice with a high-contrast, voice-friendly quiz.",
      icon: BookOpen,
      to: "/game1",
      accent: "from-rose-500/20 to-pink-500/10 border-rose-400/30",
    },
    {
      title: "Code Viewer",
      description: "Read code with large type and spoken feedback.",
      icon: Code2,
      to: "/blindcode",
      accent: "from-indigo-500/20 to-blue-500/10 border-indigo-400/30",
    },
  ];

  //  Text-to-Speech
  const speak = useCallback((text) => {
    if (!window.speechSynthesis) return;

    window.speechSynthesis.cancel(); // stop previous speech

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    window.speechSynthesis.speak(utterance);
  }, []);

  // 🎯 Voice Commands
  const handleCommand = useCallback((text) => {
    if (text.includes("go to learning")) {
      speak("Opening learning section");
      navigate("/blindvideos");
    } 
    else if (text.includes("go to tutor")) {
      speak("Opening AI tutor");
      navigate("/aitutor");
    } 
    else if (text.includes("go to reader")) {
      speak("Opening PDF reader");
      navigate("/blindreader");
    } 
    else if (text.includes("read page")) {
      const content = document.body.innerText.slice(0, 500); // limit text
      speak(content);
    } 
    else if (text.includes("stop reading")) {
      window.speechSynthesis.cancel();
    } 
    else if (text.includes("go home")) {
      speak("Going home");
      navigate("/");
    }
  }, [navigate, speak]);

  // 🚀 Start Listening
  useEffect(() => {
    if (!supported) {
      speak("Speech recognition is not supported in this browser.");
      return;
    }

    SpeechRecognition.startListening({
      continuous: true,
      language: "en-US",
    });

    speak("Welcome to the main hub. Say a command.");

    // 🧹 cleanup
    return () => {
      SpeechRecognition.stopListening();
      window.speechSynthesis.cancel();
    };
  }, [speak, supported]);

  // 🧠 Listen to transcript
  useEffect(() => {
    if (!transcript) return;

    const text = transcript.toLowerCase();
    handleCommand(text);

    resetTranscript();
  }, [transcript, handleCommand, resetTranscript]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.18),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(168,85,247,0.16),_transparent_30%),radial-gradient(circle_at_bottom,_rgba(14,165,233,0.12),_transparent_35%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-30" />

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-cyan-950/20 backdrop-blur-xl sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-100">
                <Sparkles className="h-4 w-4" />
                Voice Navigation Hub
              </div>
              <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
                Built for quick voice-first movement.
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                Say a command or use the cards below to move through the blind learning experience.
                The interface is tuned for contrast, clarity, and fast navigation.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:min-w-[360px] lg:grid-cols-1">
              <div className="rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3">
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <Mic className="h-4 w-4 text-cyan-300" />
                  Voice status
                </div>
                <p className={`mt-2 text-lg font-bold ${listening ? "text-emerald-300" : "text-amber-300"}`}>
                  {listening ? "Listening" : "Mic idle"}
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3">
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <Headphones className="h-4 w-4 text-violet-300" />
                  Browser support
                </div>
                <p className={`mt-2 text-lg font-bold ${supported ? "text-emerald-300" : "text-rose-300"}`}>
                  {supported ? "Ready" : "Unsupported"}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-300">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">Say: go to learning</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">Say: go to tutor</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">Say: go to reader</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">Say: go home</span>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {hubCards.map((card) => {
            const Icon = card.icon;

            return (
              <button
                key={card.title}
                type="button"
                tabIndex={0}
                onClick={() => navigate(card.to)}
                onFocus={() => speak(card.title)}
                onMouseEnter={() => speak(card.title)}
                className={`group rounded-[1.75rem] border bg-gradient-to-br ${card.accent} p-[1px] text-left transition duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-cyan-300/70`}
              >
                <div className="flex h-full flex-col rounded-[1.7rem] border border-white/10 bg-slate-950/85 p-6 shadow-xl shadow-black/20 backdrop-blur-xl transition group-hover:bg-slate-900/90">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-white ring-1 ring-white/10">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h2 className="mt-5 text-2xl font-bold text-white">{card.title}</h2>
                  <p className="mt-3 flex-1 text-sm leading-6 text-slate-300">{card.description}</p>
                  <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-200 transition group-hover:gap-3">
                    Open section
                    <span aria-hidden="true">→</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <h3 className="text-lg font-semibold text-white">Voice feedback</h3>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              {transcript ? transcript : "Speak a command and it will appear here before navigation happens."}
            </p>
          </div>

          <div className="rounded-[1.75rem] border border-white/10 bg-slate-900/70 p-6 backdrop-blur-xl">
            <h3 className="text-lg font-semibold text-white">Quick start</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-300">
              <li>1. Use the cards for direct navigation.</li>
              <li>2. Say a command to move hands-free.</li>
              <li>3. Press the microphone if your browser supports it.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blind;