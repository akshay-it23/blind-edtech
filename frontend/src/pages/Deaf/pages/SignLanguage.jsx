import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import bgImage from "../assets/back.png";
import Sidebar from "../components/Sidebar";
import SignLanguageTranslator from "../components/SignLanguageTranslator";
import SignLanguageDictionary from "../components/SignLanguageDictionary";
import Fingerspell from "../components/Fingerspell";

const tabs = [
  { id: "dictionary", label: "Dictionary" },
  { id: "translator", label: "Translator" },
  { id: "fingerspelling", label: "Fingerspelling" },
];

export default function SignLanguage() {
  const [activeTab, setActiveTab] = useState("fingerspelling");

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
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Sign Language Lab</h1>
            <p className="text-slate-200 mb-6">
              Practice signs with dictionary lookup, translation, and fingerspelling drills.
            </p>
          </motion.div>

          <div className="flex flex-wrap gap-3 mb-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2.5 rounded-xl font-medium transition-all duration-300 relative ${
                  activeTab === tab.id
                    ? "text-white"
                    : "bg-white/10 hover:bg-white/20 text-slate-100"
                }`}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-indigo-500 rounded-xl -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                {tab.label}
              </button>
            ))}
          </div>

          <section className="rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md p-4 md:p-6 min-h-[65vh] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {activeTab === "dictionary" && <SignLanguageDictionary />}
                {activeTab === "fingerspelling" && <Fingerspell />}
                {activeTab === "translator" && <SignLanguageTranslator />}
              </motion.div>
            </AnimatePresence>
          </section>
        </div>
      </main>
    </div>
  );
}

