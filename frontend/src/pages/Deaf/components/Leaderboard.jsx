import React from "react";
import { motion } from "framer-motion";
import { Trophy, Medal, Award } from "lucide-react";

export default function Leaderboard() {
  const leaders = [
    { id: 1, name: "Priya", points: 4210, level: 8, avatar: "P" },
    { id: 2, name: "Aditya", points: 3845, level: 7, avatar: "A" },
    { id: 3, name: "Rahul", points: 2950, level: 6, avatar: "R" },
    { id: 4, name: "Sneha", points: 2100, level: 5, avatar: "S" },
    { id: 5, name: "Vikram", points: 1850, level: 4, avatar: "V" },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <Trophy className="text-yellow-500 w-8 h-8" />
        <h2 className="text-2xl font-bold text-gray-800">Leaderboard</h2>
      </div>

      <div className="space-y-4">
        {leaders.map((user, index) => (
          <motion.div 
            key={user.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`flex items-center p-4 rounded-xl transition-all ${
              index === 0 ? "bg-yellow-50 border border-yellow-200" :
              index === 1 ? "bg-gray-50 border border-gray-200" :
              index === 2 ? "bg-orange-50 border border-orange-200" :
              "bg-white border border-gray-100 hover:bg-gray-50"
            }`}
          >
            <div className="w-8 font-bold text-gray-500 flex justify-center">
              {index === 0 ? <Trophy className="text-yellow-500 w-6 h-6" /> :
               index === 1 ? <Medal className="text-gray-400 w-6 h-6" /> :
               index === 2 ? <Medal className="text-orange-400 w-6 h-6" /> :
               `#${index + 1}`}
            </div>
            
            <div className="ml-4 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold bg-indigo-500">
              {user.avatar}
            </div>
            
            <div className="ml-4 flex-1">
              <h3 className="font-bold text-gray-800">{user.name}</h3>
              <p className="text-sm text-gray-500">Level {user.level}</p>
            </div>
            
            <div className="text-right">
              <p className="font-bold text-indigo-600">{user.points}</p>
              <p className="text-xs text-gray-500">pts</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
