import React, { useState } from "react";
import { Code, ArrowLeft, Volume2, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function CodeViewer() {
  const navigate = useNavigate();
  
  const snippets = [
    {
      title: "React Component",
      language: "javascript",
      code: "function Welcome() {\n  return <h1>Hello, World!</h1>;\n}",
      explanation: "This is a basic React function component named Welcome. It returns an H1 heading showing the text Hello World."
    },
    {
      title: "CSS Flexbox",
      language: "css",
      code: ".container {\n  display: flex;\n  justify-content: center;\n}",
      explanation: "This CSS rule centers child elements horizontally within a container using display flex and justify content center."
    },
    {
        title: "Python Loop",
        language: "python",
        code: "for i in range(5):\n    print(i)",
        explanation: "This Python code uses a for loop to iterate through a range of numbers from zero to four, printing each value."
    }
  ];

  const [activeSnippet, setActiveSnippet] = useState(snippets[0]);

  const speak = (text) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

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
          <Code size={56} className="text-indigo-400" />
          Code Viewer
        </h1>
      </header>

      <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
        <aside className="lg:w-1/3 flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-gray-500 uppercase tracking-widest mb-2">Select Snippet</h2>
          {snippets.map((s, idx) => (
            <button
              key={idx}
              onClick={() => {
                  setActiveSnippet(s);
                  speak(`Selected ${s.title}. Ready to explain.`);
              }}
              onFocus={() => speak(s.title)}
              className={`p-6 rounded-2xl text-2xl font-bold text-left transition-all ${
                activeSnippet.title === s.title 
                ? 'bg-indigo-600 border-l-8 border-white shadow-xl' 
                : 'bg-gray-800 hover:bg-gray-700'
              }`}
            >
              {s.title}
            </button>
          ))}
        </aside>

        <main className="lg:w-2/3 flex flex-col gap-6">
          <div className="bg-gray-800 p-8 rounded-3xl shadow-2xl relative overflow-hidden">
            <div className="flex justify-between items-center mb-6">
                <span className="text-xl font-mono text-indigo-400 uppercase tracking-widest bg-indigo-500/10 px-4 py-2 rounded-lg">
                    {activeSnippet.language}
                </span>
                <button 
                  onClick={() => speak(activeSnippet.explanation)}
                  className="flex items-center gap-3 bg-indigo-600 px-6 py-3 rounded-full hover:bg-indigo-500 transition-colors"
                  onFocus={() => speak("Explain this code")}
                >
                  <Volume2 size={32} />
                  <span className="text-xl font-bold">Explain Code</span>
                </button>
            </div>
            
            <div className="text-2xl rounded-2xl overflow-hidden border border-gray-700">
                <SyntaxHighlighter 
                    language={activeSnippet.language} 
                    style={atomDark}
                    customStyle={{ padding: '2rem', fontSize: '1.5rem', margin: 0 }}
                >
                    {activeSnippet.code}
                </SyntaxHighlighter>
            </div>
          </div>

          <section className="bg-gray-800/50 p-8 rounded-3xl border border-dashed border-gray-700">
            <h3 className="flex items-center gap-3 text-2xl font-bold text-indigo-400 mb-4">
                <Info size={32} />
                Accessibility Insight
            </h3>
            <p className="text-2xl text-gray-300 leading-relaxed italic">
                "{activeSnippet.explanation}"
            </p>
          </section>
        </main>
      </div>

      <footer className="mt-12 text-center text-gray-500 text-xl">
          Visualizing code through structural descriptions and audio analysis.
      </footer>
    </div>
  );
}
