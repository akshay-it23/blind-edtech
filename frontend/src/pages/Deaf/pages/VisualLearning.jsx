import React from "react";
import Sidebar from "../components/Sidebar";
import { Eye, BookOpen, Video, Info } from "lucide-react";

const visualAids = [
  { title: "Anatomy of a Hand Sign", type: "Diagram", info: "Detailed breakdown of hand shape, orientation, and movement." },
  { title: "Facial Expressions Guide", type: "Video", info: "How to use non-manual markers to add grammatical meaning." },
  { title: "Spatial Grammar", type: "Interactive", info: "Using the signing space to represent people and objects." },
  { title: "Cultural Signs", type: "Infographic", info: "Regional variations and historical context of specific signs." }
];

export default function VisualLearning() {
  return (
    <div className="flex h-screen bg-slate-950 text-white overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-8 ml-64">
        <header className="mb-12">
            <h1 className="text-4xl font-black mb-2 flex items-center gap-4">
                <Eye className="text-indigo-400" />
                Visual Learning Lab
            </h1>
            <p className="text-slate-400 text-lg">Enhance your signing with deep visual insights and interactive guides.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {visualAids.map((aid, idx) => (
                <div key={idx} className="group relative bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-indigo-600/10 hover:border-indigo-500/50 transition-all cursor-pointer">
                    <div className="flex justify-between items-start mb-6">
                        <div className="bg-indigo-500/20 p-4 rounded-2xl group-hover:scale-110 transition-transform">
                            {aid.type === "Video" ? <Video className="text-indigo-400" /> : <BookOpen className="text-indigo-400" />}
                        </div>
                        <span className="text-xs font-mono uppercase tracking-widest text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full">
                            {aid.type}
                        </span>
                    </div>
                    <h2 className="text-2xl font-bold mb-3">{aid.title}</h2>
                    <p className="text-slate-400 leading-relaxed group-hover:text-slate-200">{aid.info}</p>
                    <div className="mt-8 flex items-center gap-2 text-indigo-400 font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                        <Info size={18} />
                        Explore Module
                    </div>
                </div>
            ))}
        </div>

        <section className="mt-16 bg-gradient-to-br from-indigo-900/40 to-slate-900 border border-indigo-500/30 p-12 rounded-[3rem] text-center">
            <h3 className="text-3xl font-black mb-4">Did You Know?</h3>
            <p className="text-xl text-indigo-200 max-w-2xl mx-auto leading-relaxed">
                Visual perception in the Deaf community is often highly developed, allowing for faster processing of spatial information and peripheral motion.
            </p>
        </section>
      </main>
    </div>
  );
}
