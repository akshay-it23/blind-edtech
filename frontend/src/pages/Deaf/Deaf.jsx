import React, { useState, useEffect } from "react";
import bgImage from "../../assets/dashback.png"
import {
  BarChart, LineChart, Bar, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";

import {
  Calendar, Award, Book, Zap, Video, Clock
} from "lucide-react";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

export default function Deaf() {

  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeTab, setActiveTab] = useState("progress");
  const [userData, setUserData] = useState({ name: "Akshay", points: 3845, level: 7 });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Fetch user data from local API
    fetch("http://localhost:5050/api/users/u1")
      .then(res => res.json())
      .then(data => setUserData(data))
      .catch(err => console.log("Backend not running, using mock data"));

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

  const skillsData = [
    { skill: "Fingerspelling", value: 85 },
    { skill: "Common Signs", value: 72 },
    { skill: "Sentence Flow", value: 60 },
    { skill: "Facial Expressions", value: 55 },
    { skill: "Comprehension", value: 78 },
  ];

  const weeklyProgressData = [
    { day: "Mon", signLanguage: 30, visualLearning: 20, reading: 25 },
    { day: "Tue", signLanguage: 40, visualLearning: 30, reading: 35 },
    { day: "Wed", signLanguage: 50, visualLearning: 35, reading: 45 },
    { day: "Thu", signLanguage: 60, visualLearning: 40, reading: 50 },
    { day: "Fri", signLanguage: 70, visualLearning: 45, reading: 60 },
    { day: "Sat", signLanguage: 80, visualLearning: 50, reading: 65 },
    { day: "Sun", signLanguage: 90, visualLearning: 60, reading: 70 },
  ];

  const monthlyProgressData = [
    { month: "Jan", progress: 40 },
    { month: "Feb", progress: 55 },
    { month: "Mar", progress: 60 },
    { month: "Apr", progress: 70 },
    { month: "May", progress: 80 },
    { month: "Jun", progress: 90 },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
<div
  className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none"
        style={{ backgroundImage: `url(${bgImage})` }}
      ></div>

      <Sidebar />

      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar />

        <div className="flex-1 overflow-y-auto p-6 ml-64 mt-14">

          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 underline decoration-yellow-400 decoration-4 underline-offset-8">{userData.name}!</span>
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

{activeTab === "achievements" && (
  <div className="mt-6 space-y-8">

    <h2 className="text-2xl font-semibold flex items-center gap-2">
      <Award /> Your Achievements
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

      {/* Badge 1 */}
      <div className="bg-white p-4 rounded-xl shadow border-l-4 border-indigo-500">
        <h3 className="font-semibold">Signing Scholar</h3>
      </div>

      {/* Badge 2 */}
      <div className="bg-white p-4 rounded-xl shadow border-l-4 border-yellow-400">
        <h3 className="font-semibold">Perfect Streak</h3>
      </div>

      {/* Badge 3 */}
      <div className="bg-white p-4 rounded-xl shadow border-l-4 border-green-500">
        <h3 className="font-semibold">Community Guide</h3>
      </div>

    </div>

  </div>
)}


{activeTab === "skills" && (
  <div className="mt-6 space-y-8">

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

      {/* LEFT - CHART */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
          <Video /> Sign Language Proficiency
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart layout="vertical" data={skillsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" domain={[0, 100]} />
            <YAxis dataKey="skill" type="category" />
            <Tooltip />
            <Bar dataKey="value" fill="#6366f1" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* RIGHT */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">Vocabulary Progress</h2>
        <p>Common Phrases - 78%</p>
        <p>Academic Terms - 63%</p>
      </div>

    </div>

  </div>
)}






          {activeTab === "progress" && (
            <div className="mt-6 space-y-8">

              <div className="bg-white p-6 rounded-xl shadow-md">
                <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
                  <Clock /> Recent Practice Sessions
                </h2>

                <table className="w-full text-left">
                  <thead className="bg-indigo-50">
                    <tr>
                      <th className="p-2">Date</th>
                      <th className="p-2">Session Type</th>
                      <th className="p-2">Duration</th>
                      <th className="p-2">Accuracy</th>
                      <th className="p-2">Review</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-indigo-50">
                      <td className="p-2">Mar 10</td>
                      <td className="p-2">Alphabet Practice</td>
                      <td className="p-2">30min</td>
                      <td className="p-2 text-green-600 font-semibold">85%</td>
                      <td className="p-2 text-indigo-600 cursor-pointer">Review</td>
                    </tr>
                    <tr className="hover:bg-indigo-50">
                      <td className="p-2">Mar 9</td>
                      <td className="p-2">Word Formation</td>
                      <td className="p-2">25min</td>
                      <td className="p-2 text-yellow-600 font-semibold">72%</td>
                      <td className="p-2 text-indigo-600 cursor-pointer">Review</td>
                    </tr>
                    <tr className="hover:bg-indigo-50">
                      <td className="p-2">Mar 8</td>
                      <td className="p-2">Sentence Practice</td>
                      <td className="p-2">40min</td>
                      <td className="p-2 text-green-600 font-semibold">88%</td>
                      <td className="p-2 text-indigo-600 cursor-pointer">Review</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md">
                <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
                  <Zap /> Weekly Learning Activity
                </h2>

                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={weeklyProgressData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis label={{ value: "Minutes Spent", angle: -90, position: "insideLeft" }} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="signLanguage" fill="#6366f1" />
                    <Bar dataKey="visualLearning" fill="#f59e0b" />
                    <Bar dataKey="reading" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md">
                  <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
                    <Book /> Monthly Progress
                  </h2>

                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={monthlyProgressData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="progress" stroke="#6366f1" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md">
                  <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
                    <Award /> Points Summary
                  </h2>

                  <p className="text-5xl font-black text-indigo-700 font-mono tracking-tighter">{userData.points.toLocaleString()}</p>

                  <div className="flex justify-between mt-6 text-sm font-bold uppercase tracking-widest text-gray-400">
                    <span>This Week: +275</span>
                    <span>Level {userData.level}</span>
                  </div>

                  <div className="mt-4">
                    <div className="w-full bg-gray-100 h-4 rounded-full overflow-hidden border border-gray-200">
                      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 h-full w-[78%] animate-pulse"></div>
                    </div>
                    <p className="text-sm mt-3 text-gray-500 font-medium italic">Only 122 points until Level {userData.level + 1}!</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md">
                <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
                  <Calendar /> Upcoming Lessons
                </h2>

                <table className="w-full text-left">
                  <thead className="bg-indigo-50">
                    <tr>
                      <th className="p-2">Lesson</th>
                      <th className="p-2">Type</th>
                      <th className="p-2">Date</th>
                      <th className="p-2">Duration</th>
                      <th className="p-2">Points</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-indigo-50">
                      <td className="p-2">Advanced Signing Practice</td>
                      <td className="p-2 text-blue-600">Live Session</td>
                      <td className="p-2">Today 4PM</td>
                      <td className="p-2">45min</td>
                      <td className="p-2">50pts</td>
                    </tr>
                    <tr className="hover:bg-indigo-50">
                      <td className="p-2">Visual Storytelling</td>
                      <td className="p-2 text-green-600">On-demand</td>
                      <td className="p-2">Tomorrow</td>
                      <td className="p-2">30min</td>
                      <td className="p-2">35pts</td>
                    </tr>
                    <tr className="hover:bg-indigo-50">
                      <td className="p-2">STEM Vocabulary</td>
                      <td className="p-2 text-purple-600">Interactive</td>
                      <td className="p-2">Mar 16</td>
                      <td className="p-2">60min</td>
                      <td className="p-2">70pts</td>
                    </tr>
                  </tbody>
                </table>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}