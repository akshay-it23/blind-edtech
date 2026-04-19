import { useState } from "react";
import bgImage from "../assets/back.png";
import Sidebar from "../components/Sidebar";
import SignLanguageDetection from "../components/SignLangDetection";
import SignLanguageTranslator from "../components/SignLanguageTranslator";
import SignLanguageDictionary from "../components/SignLanguageDictionary";

const tabs = [
  { id: "dictionary", label: "Dictionary" },
  { id: "translator", label: "Translator" },
  { id: "fingerspelling", label: "Detection" },
];

export default function SignLanguage() {
  const [activeTab, setActiveTab] = useState("dictionary");

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Sidebar />

      <main className="relative min-h-screen ml-64 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${bgImage})` }}
        />
        <div className="absolute inset-0 bg-slate-950/70" />

        <div className="relative z-10 p-6 md:p-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Sign Language Lab</h1>
          <p className="text-slate-200 mb-6">
            Practice signs with dictionary lookup, translation, and live detection.
          </p>

          <div className="flex flex-wrap gap-3 mb-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2.5 rounded-xl font-medium transition-colors ${
                  activeTab === tab.id
                    ? "bg-indigo-500 text-white"
                    : "bg-white/10 hover:bg-white/20 text-slate-100"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <section className="rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md p-4 md:p-6 min-h-[65vh]">
            {activeTab === "dictionary" && <SignLanguageDictionary />}
            {activeTab === "translator" && <SignLanguageTranslator />}
            {activeTab === "fingerspelling" && <SignLanguageDetection />}
          </section>
        </div>
      </main>
    </div>
  );
}
