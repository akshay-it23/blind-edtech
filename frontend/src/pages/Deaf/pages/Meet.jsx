import React from "react";
import Sidebar from "../components/Sidebar";
import { Video, Mic, MicOff, VideoOff, PhoneOff, Users, MessageSquare } from "lucide-react";

export default function Meet() {
  return (
    <div className="flex h-screen bg-slate-950 text-white overflow-hidden">
      <Sidebar />
      <main className="flex-1 p-8 ml-64 flex flex-col gap-6">
        <header className="flex justify-between items-center">
            <h1 className="text-4xl font-black flex items-center gap-4">
                <Video className="text-emerald-400" />
                Peer Meeting Room
            </h1>
            <div className="flex items-center gap-2 bg-emerald-500/20 px-4 py-2 rounded-full border border-emerald-500/50">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-emerald-400 font-bold uppercase tracking-wider">Live: 4 Peers</span>
            </div>
        </header>

        <div className="flex-1 grid grid-cols-2 gap-6 min-h-0">
            {/* Main Speaker */}
            <div className="bg-white/5 rounded-[2.5rem] border border-white/10 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 bg-indigo-600 rounded-full flex items-center justify-center text-5xl font-black border-4 border-white/20">
                        AS
                    </div>
                </div>
                <div className="absolute bottom-6 left-8 flex items-center gap-3">
                    <div className="p-2 bg-emerald-500 rounded-lg"><Video size={20} /></div>
                    <span className="text-xl font-bold">Akshay (You)</span>
                </div>
            </div>

            {/* Other Peers Grid */}
            <div className="grid grid-cols-2 grid-rows-2 gap-6">
                {["Rahul", "Priya", "Sneha", "Aditya"].map((name, i) => (
                    <div key={i} className="bg-white/5 rounded-3xl border border-white/10 relative overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center text-xl font-bold border-2 border-white/10">
                                {name[0]}
                            </div>
                        </div>
                        <div className="absolute bottom-4 left-6 flex items-center gap-2">
                             <div className="p-1 bg-gray-800 rounded text-gray-400"><VideoOff size={14} /></div>
                             <span className="text-sm font-medium">{name}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        <footer className="flex justify-center items-center gap-6 py-4">
            <button className="p-5 bg-gray-800 hover:bg-gray-700 rounded-full transition-all border border-white/10"><MicOff /></button>
            <button className="p-5 bg-emerald-600 hover:bg-emerald-500 rounded-full transition-all shadow-xl shadow-emerald-900/20"><Video /></button>
            <button className="p-5 bg-gray-800 hover:bg-gray-700 rounded-full transition-all border border-white/10"><MessageSquare /></button>
            <button className="p-5 bg-red-600 hover:bg-red-500 rounded-full transition-all shadow-xl shadow-red-900/20 rotate-[135deg]"><PhoneOff /></button>
        </footer>
      </main>
    </div>
  );
}
