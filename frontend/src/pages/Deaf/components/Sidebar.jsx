import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Bell, Calendar } from "lucide-react";
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
} from "lucide-react";

import logo from "../../../assets/image.png";

export default function Sidebar() {
  const [isGamificationOpen, setIsGamificationOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ x: -260 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`bg-gradient-to-b from-purple-600 to-black h-full fixed top-0 left-0 z-50 transition-all ${
        isSidebarOpen ? "w-64" : "w-20"
      }`}
    >
      {/* HEADER */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <img src={logo} className="h-8 w-8" />
          {isSidebarOpen && (
            <span className="text-yellow-300 font-bold">
              Nav Drishti
            </span>
          )}
        </div>

        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-white">
          {isSidebarOpen ? <ChevronLeft /> : <ChevronRight />}
        </button>
      </div>

      {/* NAV LINKS */}
      <div className="flex flex-col gap-4 p-4 text-white">
        <Link to="/deaf" className="flex items-center gap-3 hover:text-yellow-300 transition-colors">
          <Home />
          {isSidebarOpen && <span>Home</span>}
        </Link>
        <Link to="/deaf-planyourday" className="flex items-center gap-3 hover:text-yellow-300 transition-colors">
          <Calendar />
          {isSidebarOpen && <span>Plan your day </span>}
        </Link>

        <Link to="/deaf/sign-language" className="flex items-center gap-3 hover:text-yellow-300 transition-colors">
          <Clipboard />
          {isSidebarOpen && <span>Sign Language</span>}
        </Link>

        <Link to="/visual-learning" className="flex items-center gap-3 hover:text-yellow-300 transition-colors">
          <Eye />
          {isSidebarOpen && <span>Visual Learning</span>}
        </Link>

        {/* DROPDOWN */}
        <div>
          <div
            className="flex items-center justify-between cursor-pointer hover:text-yellow-300 transition-colors"
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
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="ml-8 mt-2 flex flex-col gap-2 text-sm"
            >
              <Link to="/canvas" className="hover:text-yellow-200">Canvas</Link>
              <Link to="/signgame" className="hover:text-yellow-200">Sign Game</Link>
              <Link to="/gamification-deaf" className="hover:text-yellow-200">More Games</Link>
              <Link to="/game2" className="hover:text-yellow-200">Games</Link>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}