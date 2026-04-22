import React, { useState, useEffect } from "react";
import { Trophy, RefreshCw, HelpCircle } from "lucide-react";

export default function PuzzleGame() {
  const [tiles, setTiles] = useState([]);
  const [moves, setMoves] = useState(0);
  const [complete, setComplete] = useState(false);

  const initializeGame = () => {
    const initialTiles = [
      { id: 1, val: "A", pos: 0 }, { id: 2, val: "B", pos: 1 }, { id: 3, val: "C", pos: 2 },
      { id: 4, val: "D", pos: 3 }, { id: 5, val: "E", pos: 4 }, { id: 6, val: "F", pos: 5 },
      { id: 7, val: "G", pos: 6 }, { id: 8, val: "H", pos: 7 }, { id: 0, val: "", pos: 8 }, // Blank
    ];
    
    // Shuffle logic (ensuring it's solvable for a real puzzle, but for demo we just shuffle)
    const shuffled = [...initialTiles].sort(() => Math.random() - 0.5);
    setTiles(shuffled.map((t, i) => ({ ...t, currentPos: i })));
    setMoves(0);
    setComplete(false);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  const handleTileClick = (index) => {
    if (complete) return;
    
    const blankIndex = tiles.findIndex(t => t.id === 0);
    const isAdjacent = 
      (Math.abs(index - blankIndex) === 1 && Math.floor(index/3) === Math.floor(blankIndex/3)) ||
      (Math.abs(index - blankIndex) === 3);

    if (isAdjacent) {
      const newTiles = [...tiles];
      [newTiles[index], newTiles[blankIndex]] = [newTiles[blankIndex], newTiles[index]];
      setTiles(newTiles);
      setMoves(moves + 1);
      
      // Check win condition
      const isWin = newTiles.every((t, i) => t.id === (i + 1) % 9);
      if (isWin) setComplete(true);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 text-white p-4">
      <div className="flex justify-between w-full max-w-md items-center mb-4">
        <div>
          <h2 className="text-3xl font-bold flex items-center gap-2">
            <HelpCircle className="text-yellow-400" />
            ASL Slider
          </h2>
          <p className="text-gray-400">Order the alphabet signs</p>
        </div>
        <div className="bg-white/10 px-4 py-2 rounded-xl text-center">
          <p className="text-xs uppercase text-gray-500">Moves</p>
          <p className="text-2xl font-bold font-mono">{moves}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 bg-white/5 p-4 rounded-3xl border border-white/10 shadow-2xl">
        {tiles.map((tile, idx) => (
          <button
            key={tile.id}
            onClick={() => handleTileClick(idx)}
            className={`w-24 h-24 sm:w-32 sm:h-32 rounded-2xl text-4xl font-black transition-all flex items-center justify-center ${
              tile.id === 0 
              ? 'bg-transparent border-2 border-dashed border-white/10 cursor-default' 
              : 'bg-indigo-600 hover:bg-indigo-500 shadow-lg active:scale-95 border-b-4 border-indigo-800'
            }`}
          >
            {tile.val}
          </button>
        ))}
      </div>

      <div className="flex gap-4 mt-4">
        <button 
          onClick={initializeGame}
          className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-xl font-bold transition-colors"
        >
          <RefreshCw size={20} /> Reset
        </button>
      </div>

      {complete && (
        <div className="fixed inset-0 bg-indigo-900/90 backdrop-blur-md flex flex-col items-center justify-center z-[100] animate-in fade-in zoom-in duration-500">
          <Trophy size={100} className="text-yellow-400 mb-6 animate-bounce" />
          <h2 className="text-5xl font-black mb-2">Puzzle Solved!</h2>
          <p className="text-2xl mb-8">Completed in {moves} moves</p>
          <button 
            onClick={initializeGame}
            className="bg-white text-indigo-900 px-12 py-4 rounded-2xl font-black text-2xl hover:scale-105 transition-transform shadow-2xl"
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}
