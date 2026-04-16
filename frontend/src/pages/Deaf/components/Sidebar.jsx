import React, { useState } from "react";
import { Link } from "react-router-dom";

import {
  Home,
  BarChart2,
  Clipboard,
  Eye,
  Award,
  Users,
  Settings,
  UserCircle,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Calendar,
} from "lucide-react";

import logo from "../../../assets/image.png";
export default function Sidebar() {
  const [isGamificationOpen, setIsGamificationOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div
      className={`bg-indigo-700 h-full fixed top-0 left-0 z-50 transition-all ${
        isSidebarOpen ? "w-64" : "w-20"
      }`}
    >

      {/* HEADER */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <img src={logo} className="h-8 w-8" />
          {isSidebarOpen && (
            <span className="text-yellow-300 font-bold">
              ShikshaSoladu.ai
            </span>
          )}
        </div>

        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          {isSidebarOpen ? <ChevronLeft /> : <ChevronRight />}
        </button>
      </div>

      {/* NAV LINKS */}
      <div className="flex flex-col gap-4 p-4 text-white">

        <Link to="/deaf" className="flex items-center gap-3 hover:text-yellow-300">
          <Home />
          {isSidebarOpen && <span>Home</span>}
        </Link>

        <Link to="/signlang" className="flex items-center gap-3 hover:text-yellow-300">
          <Clipboard />
          {isSidebarOpen && <span>Sign Language</span>}
        </Link>

        <Link to="/visual-learning" className="flex items-center gap-3 hover:text-yellow-300">
          <Eye />
          {isSidebarOpen && <span>Visual Learning</span>}
        </Link>

        {/* DROPDOWN */}
        <div>
          <div
            className="flex items-center justify-between cursor-pointer hover:text-yellow-300"
            onClick={() => setIsGamificationOpen(!isGamificationOpen)}
          >
            <div className="flex items-center gap-3">
              <Award />
              {isSidebarOpen && <span>Gamification</span>}
            </div>

            {isSidebarOpen &&
              (isGamificationOpen ? <ChevronUp /> : <ChevronDown />)}
          </div>

          {isGamificationOpen && isSidebarOpen && (
            <div className="ml-8 mt-2 flex flex-col gap-2 text-sm">
              <Link to="/canvas">Canvas</Link>
              <Link to="/signgame">Sign Game</Link>
              <Link to="/gamification-deaf">More Games</Link>
              <Link to="/game2">Games</Link>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}