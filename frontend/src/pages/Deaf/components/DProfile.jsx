import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function DProfile() {

  const dummyUser = {
    name: "Akshay",
    email: "akshay@gmail.com"
  };

  const dummyProgress = {
    points: 3845,
    level: 7,
    streak: 5,
    completedLessons: [
      "Alphabet",
      "Word Formation",
      "Sentence Practice"
    ]
  };

  // 🔥 STATES
  const [user] = useState(dummyUser);
  const [progress] = useState(dummyProgress);

  const [name, setName] = useState(dummyUser.name);
  const [email, setEmail] = useState(dummyUser.email);

  // 🔥 SAVE PROFILE
  const handleSave = () => {
    alert("Profile Updated ✅");
  };

  if (!user || !progress) return <p>Loading...</p>;

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">

      <Sidebar />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex-1 p-6 ml-64 overflow-y-auto"
      >

        {/* PROFILE HEADER */}
        <motion.div 
          variants={sectionVariants}
          className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-6"
        >
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="w-20 h-20 bg-gradient-to-br from-indigo-600 to-purple-600 text-white flex items-center justify-center rounded-2xl text-2xl font-black shadow-lg shadow-indigo-200"
          >
            {user.name[0]}
          </motion.div>

          <div>
            <h2 className="text-3xl font-black text-slate-800">{user.name}</h2>
            <p className="text-gray-500 text-lg">{user.email}</p>
            <div className="mt-2">
              <span className="text-sm font-bold bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full border border-indigo-100">
                Student
              </span>
            </div>
          </div>
        </motion.div>

        {/* STATS */}
        <motion.div 
          variants={sectionVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8"
        >
          {[
            { label: "Total Points", value: progress.points, color: "text-indigo-600" },
            { label: "Current Level", value: progress.level, color: "text-purple-600" },
            { label: "Day Streak", value: progress.streak, color: "text-amber-500" }
          ].map((stat, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center"
            >
              <p className="text-gray-400 font-medium uppercase tracking-widest text-xs mb-2">{stat.label}</p>
              <motion.h3 
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                className={`text-4xl font-black ${stat.color}`}
              >
                {stat.value.toLocaleString()}
              </motion.h3>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* COMPLETED LESSONS */}
          <motion.div 
            variants={sectionVariants}
            className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100"
          >
            <h2 className="text-xl font-bold mb-6 text-slate-800">Completed Lessons</h2>

            <div className="space-y-4">
              {progress.completedLessons.map((lesson, index) => (
                <motion.div 
                  key={index}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + (index * 0.1) }}
                  className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100"
                >
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="font-semibold text-slate-700">{lesson}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* EDIT PROFILE */}
          <motion.div 
            variants={sectionVariants}
            className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100"
          >
            <h2 className="text-xl font-bold mb-6 text-slate-800">Account Settings</h2>

            <div className="flex flex-col gap-5">
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">Display Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-200 p-4 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-medium"
                  placeholder="Name"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-200 p-4 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-medium"
                  placeholder="Email"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSave}
                className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-indigo-200 hover:bg-indigo-500 transition-colors mt-2"
              >
                Save Changes
              </motion.button>
            </div>
          </motion.div>
        </div>

      </motion.div>
    </div>
  );
}