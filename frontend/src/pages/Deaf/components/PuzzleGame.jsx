import React, { useState, useEffect } from "react";
import { Trophy, RefreshCw, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
      
      const isWin = newTiles.every((t, i) => t.id === (i + 1) % 9);
      if (isWin) setComplete(true);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center gap-6 text-white p-4"
    >
      <motion.div 
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        className="flex justify-between w-full max-w-md items-center mb-4"
      >
        <div>
          <h2 className="text-3xl font-bold flex items-center gap-2">
            <HelpCircle className="text-yellow-400" />
            ASL Slider
          </h2>
          <p className="text-gray-400">Order the alphabet signs</p>
        </div>
        <div className="bg-white/10 px-4 py-2 rounded-xl text-center border border-white/10">
          <p className="text-xs uppercase text-gray-500">Moves</p>
          <motion.p 
            key={moves}
            initial={{ scale: 1.5, color: "#fbbf24" }}
            animate={{ scale: 1, color: "#fff" }}
            className="text-2xl font-bold font-mono"
          >
            {moves}
          </motion.p>
        </div>
      </motion.div>

      <motion.div 
        layout
        className="grid grid-cols-3 gap-3 bg-white/5 p-4 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-md"
      >
        {tiles.map((tile, idx) => (
          <motion.button
            layout
            key={tile.id}
            whileHover={tile.id !== 0 ? { scale: 1.05 } : {}}
            whileTap={tile.id !== 0 ? { scale: 0.95 } : {}}
            onClick={() => handleTileClick(idx)}
            className={`w-24 h-24 sm:w-32 sm:h-32 rounded-2xl text-4xl font-black transition-colors flex items-center justify-center ${
              tile.id === 0 
              ? 'bg-transparent border-2 border-dashed border-white/10 cursor-default' 
              : 'bg-indigo-600 hover:bg-indigo-500 shadow-lg border-b-4 border-indigo-800'
            }`}
          >
            {tile.val}
          </motion.button>
        ))}
      </motion.div>

      <div className="flex gap-4 mt-4">
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={initializeGame}
          className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-xl font-bold transition-colors border border-white/10 shadow-lg"
        >
          <RefreshCw size={20} /> Reset
        </motion.button>
      </div>

      <AnimatePresence>
        {complete && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="fixed inset-0 bg-indigo-950/95 backdrop-blur-xl flex flex-col items-center justify-center z-[100] p-6 text-center"
          >
            <motion.div
              animate={{ rotate: [0, -10, 10, -10, 10, 0], scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <Trophy size={120} className="text-yellow-400 mb-6" />
            </motion.div>
            <h2 className="text-6xl font-black mb-2 text-white">Puzzle Solved!</h2>
            <p className="text-3xl mb-8 text-indigo-200">Completed in <span className="text-white font-mono">{moves}</span> moves</p>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={initializeGame}
              className="bg-white text-indigo-950 px-12 py-4 rounded-2xl font-black text-2xl hover:bg-gray-100 transition-colors shadow-2xl"
            >
              Play Again
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

