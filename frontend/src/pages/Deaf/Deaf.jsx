import React, { useState, useEffect } from "react";

import {
  BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";

import {
  Calendar, Award, Clock, Book, Video,
  MessageSquare, Star, Users, Zap
} from "lucide-react";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

export default function Deaf() {

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const time = currentTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const date = currentTime.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const weeklyProgressData = [
    { day: "Mon", signLanguage: 30, visualLearning: 20, reading: 25 },
    { day: "Tue", signLanguage: 40, visualLearning: 30, reading: 35 },
    { day: "Wed", signLanguage: 50, visualLearning: 35, reading: 45 },
    { day: "Thu", signLanguage: 60, visualLearning: 40, reading: 50 },
    { day: "Fri", signLanguage: 70, visualLearning: 45, reading: 60 },
    { day: "Sat", signLanguage: 80, visualLearning: 50, reading: 65 },
    { day: "Sun", signLanguage: 90, visualLearning: 60, reading: 70 },
  ];

  const [activeTab, setActiveTab] = useState("progress");

  return (
    <div className="flex h-screen bg-gray-50">

      <Sidebar />

      <div className="flex flex-col flex-1 overflow-hidden">

        <Navbar />
<div className="bg-gradient-to-b from-purple-100 via-purple-50 to-black/10 flex-1 overflow-y-auto p-6 ml-64 mt-14">
          <h1 className="text-4xl font-bold text-blue-600">
            Welcome back, <span className="text-indigo-700">Akshay!</span>
          </h1>

          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 rounded-xl shadow mt-6">
            <p className="text-5xl font-bold">{time}</p>
            <p className="text-xl">{date}</p>
          </div>

          <div className="flex gap-6 mt-6 border-b pb-2">

            <button
              onClick={() => setActiveTab("progress")}
              className={activeTab === "progress"
                ? "text-indigo-700 border-b-2 border-indigo-700"
                : "text-gray-500 hover:text-indigo-600"}
            >
              Learning Progress
            </button>

            <button
              onClick={() => setActiveTab("skills")}
              className={activeTab === "skills"
                ? "text-indigo-700 border-b-2 border-indigo-700"
                : "text-gray-500 hover:text-indigo-600"}
            >
              Sign Language Skills
            </button>

            <button
              onClick={() => setActiveTab("achievements")}
              className={activeTab === "achievements"
                ? "text-indigo-700 border-b-2 border-indigo-700"
                : "text-gray-500 hover:text-indigo-600"}
            >
              Achievements
            </button>

          </div>

          {activeTab === "progress" && (
            <div className="mt-6 h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyProgressData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="signLanguage" fill="#6366f1" />
                  <Bar dataKey="visualLearning" fill="#10b981" />
                  <Bar dataKey="reading" fill="#f59e0b" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}