import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { Settings, Eye, VolumeX, Type, Bell } from "lucide-react";

export default function Accessibility() {
  const [vibration, setVibration] = useState(true);
  const [highContrast, setHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState("medium");

  return (
    <div className="flex h-screen bg-slate-950 text-white overflow-hidden">
      <Sidebar />
      <main className="flex-1 p-8 ml-64 flex flex-col gap-8">
        <header>
            <h1 className="text-4xl font-black flex items-center gap-4">
                <Settings className="text-orange-400" />
                Accessibility Settings
            </h1>
            <p className="text-slate-400 text-lg">Customize your experience to fit your needs.</p>
        </header>

        <div className="max-w-3xl flex flex-col gap-6">
            <section className="bg-white/5 border border-white/10 p-8 rounded-3xl flex items-center justify-between">
                <div className="flex gap-4 items-center">
                    <div className="p-4 bg-orange-500/20 rounded-2xl"><Bell className="text-orange-400" /></div>
                    <div>
                        <h3 className="text-2xl font-bold">Vibration Alerts</h3>
                        <p className="text-slate-400">Tactile haptic feedback for notifications.</p>
                    </div>
                </div>
                <button 
                  onClick={() => setVibration(!vibration)}
                  className={`w-16 h-8 rounded-full transition-all relative ${vibration ? 'bg-orange-500' : 'bg-gray-700'}`}
                >
                    <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${vibration ? 'left-9' : 'left-1'}`} />
                </button>
            </section>

            <section className="bg-white/5 border border-white/10 p-8 rounded-3xl flex items-center justify-between">
                <div className="flex gap-4 items-center">
                    <div className="p-4 bg-blue-500/20 rounded-2xl"><Eye className="text-blue-400" /></div>
                    <div>
                        <h3 className="text-2xl font-bold">High Contrast Mode</h3>
                        <p className="text-slate-400">Maximize visual clarity and readability.</p>
                    </div>
                </div>
                <button 
                  onClick={() => setHighContrast(!highContrast)}
                  className={`w-16 h-8 rounded-full transition-all relative ${highContrast ? 'bg-blue-500' : 'bg-gray-700'}`}
                >
                    <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${highContrast ? 'left-9' : 'left-1'}`} />
                </button>
            </section>

            <section className="bg-white/5 border border-white/10 p-8 rounded-3xl flex flex-col gap-6">
                <div className="flex gap-4 items-center">
                    <div className="p-4 bg-emerald-500/20 rounded-2xl"><Type className="text-emerald-400" /></div>
                    <div>
                        <h3 className="text-2xl font-bold">Text Scaling</h3>
                        <p className="text-slate-400">Adjust the interface font size.</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    {["small", "medium", "large", "xl"].map(size => (
                        <button 
                            key={size}
                            onClick={() => setFontSize(size)}
                            className={`flex-1 py-4 rounded-2xl font-bold border ${fontSize === size ? 'bg-emerald-600 border-emerald-400' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
                        >
                            {size.toUpperCase()}
                        </button>
                    ))}
                </div>
            </section>
        </div>

        <footer className="mt-auto bg-white/5 p-6 rounded-3xl border border-white/10 text-center">
            <p className="text-slate-500 italic">Your settings are automatically synced across all sessions.</p>
        </footer>
      </main>
    </div>
  );
}
