import React, { useRef, useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { Paintbrush, Eraser, Trash2, Download, Circle } from "lucide-react";

export default function Canvas() {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#6366f1");
  const [lineWidth, setLineWidth] = useState(5);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  }, []);

  const startDrawing = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    const ctx = canvasRef.current.getContext("2d");
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = e.nativeEvent;
    const ctx = canvasRef.current.getContext("2d");
    ctx.lineTo(offsetX, offsetY);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="flex h-screen bg-slate-950 text-white overflow-hidden">
      <Sidebar />
      <main className="flex-1 p-8 ml-64 flex flex-col gap-6">
        <header className="flex justify-between items-center">
            <div>
                <h1 className="text-4xl font-black flex items-center gap-4">
                    <Paintbrush className="text-indigo-400" />
                    Creative Canvas
                </h1>
                <p className="text-slate-400">Sketch ideas, practice signs visually, or just doodle.</p>
            </div>
            
            <div className="flex items-center gap-4 bg-white/5 p-3 rounded-2xl border border-white/10 shadow-xl">
                <button onClick={() => setColor("#6366f1")} className={`w-8 h-8 rounded-full bg-indigo-500 ${color === '#6366f1' ? 'ring-4 ring-white' : ''}`} />
                <button onClick={() => setColor("#ef4444")} className={`w-8 h-8 rounded-full bg-red-500 ${color === '#ef4444' ? 'ring-4 ring-white' : ''}`} />
                <button onClick={() => setColor("#10b981")} className={`w-8 h-8 rounded-full bg-emerald-500 ${color === '#10b981' ? 'ring-4 ring-white' : ''}`} />
                <div className="w-px h-8 bg-white/10 mx-2" />
                <button onClick={() => setColor("#000000")} className="p-2 hover:bg-white/10 rounded-lg"><Eraser size={24} /></button>
                <button onClick={clearCanvas} className="p-2 hover:bg-red-500/20 text-red-400 rounded-lg"><Trash2 size={24} /></button>
            </div>
        </header>

        <div className="flex-1 bg-white rounded-[2rem] shadow-2xl relative overflow-hidden cursor-crosshair">
            <canvas
                ref={canvasRef}
                width={1200}
                height={800}
                className="w-full h-full"
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseOut={stopDrawing}
            />
        </div>
        
        <footer className="flex justify-center gap-8">
            <div className="flex items-center gap-4 text-slate-400">
                <span>Brush Size</span>
                <input 
                    type="range" 
                    min="1" 
                    max="50" 
                    value={lineWidth} 
                    onChange={(e) => setLineWidth(e.target.value)}
                    className="w-48 accent-indigo-500"
                />
                <span className="font-mono text-white">{lineWidth}px</span>
            </div>
        </footer>
      </main>
    </div>
  );
}
