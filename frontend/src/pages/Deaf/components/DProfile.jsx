import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";

export default function DProfile() {

  // 🔥 STATES
  const [user, setUser] = useState(null);
  const [progress, setProgress] = useState(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // 🔥 FETCH USER
 useEffect(() => {

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

  setUser(dummyUser);
  setName(dummyUser.name);
  setEmail(dummyUser.email);
  setProgress(dummyProgress);

}, []);

  // 🔥 SAVE PROFILE
  const handleSave = () => {
    alert("Profile Updated ✅");
  };

  if (!user || !progress) return <p>Loading...</p>;

  return (
    <div className="flex h-screen bg-gray-50">

      <Sidebar />

      <div className="flex-1 p-6 ml-64">

        {/* PROFILE HEADER */}
        <div className="bg-white p-6 rounded-xl shadow flex items-center gap-4">
          <div className="w-16 h-16 bg-indigo-600 text-white flex items-center justify-center rounded-full text-xl font-bold">
            {user.name[0]}
          </div>

          <div>
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-gray-500">{user.email}</p>
            <span className="text-sm bg-indigo-100 text-indigo-600 px-2 py-1 rounded">
              Student
            </span>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">

          <div className="bg-white p-4 rounded-xl shadow text-center">
            <p className="text-gray-500">Total Points</p>
            <h3 className="text-2xl font-bold text-indigo-600">
              {progress.points}
            </h3>
          </div>

          <div className="bg-white p-4 rounded-xl shadow text-center">
            <p className="text-gray-500">Current Level</p>
            <h3 className="text-2xl font-bold text-indigo-600">
              {progress.level}
            </h3>
          </div>

          <div className="bg-white p-4 rounded-xl shadow text-center">
            <p className="text-gray-500">Day Streak</p>
            <h3 className="text-2xl font-bold text-indigo-600">
              {progress.streak}
            </h3>
          </div>

        </div>

        {/* COMPLETED LESSONS */}
        <div className="bg-white p-6 rounded-xl shadow mt-6">
          <h2 className="text-lg font-semibold mb-4">Completed Lessons</h2>

          <ul className="list-disc ml-6 text-gray-600">
            {progress.completedLessons.map((lesson, index) => (
              <li key={index}>{lesson}</li>
            ))}
          </ul>
        </div>

        {/* EDIT PROFILE */}
        <div className="bg-white p-6 rounded-xl shadow mt-6">
          <h2 className="text-lg font-semibold mb-4">Edit Profile</h2>

          <div className="flex flex-col gap-4">

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-2 rounded"
              placeholder="Name"
            />

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-2 rounded"
              placeholder="Email"
            />

            <button
              onClick={handleSave}
              className="bg-indigo-600 text-white px-4 py-2 rounded"
            >
              Save
            </button>

          </div>
        </div>

      </div>
    </div>
  );
}