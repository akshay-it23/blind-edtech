import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Eye, Ear, Users, ArrowRight, BookOpen, Video, Award } from "lucide-react";
import bgImage from "./assest/community.png";

export default function Home1() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Hero Section */}
      <div 
        className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="absolute inset-0 bg-indigo-900/80 mix-blend-multiply"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight"
          >
            Universal <span className="text-yellow-400">Access</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-xl md:text-2xl text-indigo-100 max-w-3xl mx-auto"
          >
            Education without barriers. Choose your preferred learning pathway and start your journey today.
          </motion.p>
        </div>
      </div>

      {/* Pathways Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Deaf Flow Card */}
          <motion.div 
            whileHover={{ y: -10 }}
            className="bg-white rounded-3xl shadow-xl overflow-hidden border-t-8 border-indigo-600 group cursor-pointer"
            onClick={() => navigate('/authdeaf')}
          >
            <div className="p-8 md:p-10">
              <div className="w-20 h-20 bg-indigo-100 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <Ear size={40} className="text-indigo-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Deaf & Hard of Hearing</h2>
              <p className="text-gray-600 text-lg mb-8">
                Visual learning paths, interactive sign language practice, and AI-powered translation tools.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-gray-700">
                  <Video className="w-6 h-6 mr-3 text-indigo-500" /> Sign Language Video Lessons
                </li>
                <li className="flex items-center text-gray-700">
                  <Users className="w-6 h-6 mr-3 text-indigo-500" /> Interactive Signing Practice
                </li>
                <li className="flex items-center text-gray-700">
                  <Award className="w-6 h-6 mr-3 text-indigo-500" /> Gamified Learning
                </li>
              </ul>
              <div className="flex items-center text-indigo-600 font-bold text-lg group-hover:text-indigo-800">
                Explore Pathway <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
              </div>
            </div>
          </motion.div>

          {/* Blind Flow Card */}
          <motion.div 
            whileHover={{ y: -10 }}
            className="bg-white rounded-3xl shadow-xl overflow-hidden border-t-8 border-purple-600 group cursor-pointer"
            onClick={() => navigate('/authblind')}
          >
            <div className="p-8 md:p-10">
              <div className="w-20 h-20 bg-purple-100 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <Eye size={40} className="text-purple-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Blind & Visually Impaired</h2>
              <p className="text-gray-600 text-lg mb-8">
                Voice-controlled interface, screen-reader optimized content, and audio-based learning tools.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-gray-700">
                  <BookOpen className="w-6 h-6 mr-3 text-purple-500" /> Audio Textbooks & PDFs
                </li>
                <li className="flex items-center text-gray-700">
                  <Video className="w-6 h-6 mr-3 text-purple-500" /> YouTube Video Summarizer
                </li>
                <li className="flex items-center text-gray-700">
                  <Users className="w-6 h-6 mr-3 text-purple-500" /> Voice-Activated AI Tutor
                </li>
              </ul>
              <div className="flex items-center text-purple-600 font-bold text-lg group-hover:text-purple-800">
                Explore Pathway <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* General Resources */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 text-center">
        <h3 className="text-3xl font-bold text-gray-900 mb-12">General Learning Resources</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100">
            <BookOpen className="w-12 h-12 text-teal-500 mx-auto mb-4" />
            <h4 className="text-xl font-bold text-gray-900 mb-2">Library</h4>
            <p className="text-gray-600">Access thousands of books and articles in multiple formats.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100">
            <Users className="w-12 h-12 text-teal-500 mx-auto mb-4" />
            <h4 className="text-xl font-bold text-gray-900 mb-2">Community Forums</h4>
            <p className="text-gray-600">Connect with other learners, share tips, and find study buddies.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100">
            <Award className="w-12 h-12 text-teal-500 mx-auto mb-4" />
            <h4 className="text-xl font-bold text-gray-900 mb-2">Certifications</h4>
            <p className="text-gray-600">Earn recognized certificates upon course completion.</p>
          </div>
        </div>
      </div>
    </div>
  );
}