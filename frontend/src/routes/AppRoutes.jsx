import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Global
import Home from "../pages/Home";
import Home1 from "../pages/Alluser/Home1";

// Deaf
import Deaf from "../pages/Deaf/Deaf";
import Auth from "../pages/Deaf/components/Auth";
import SignLanguage from "../pages/Deaf/pages/SignLanguage";
import VisualLearning from "../pages/Deaf/pages/VisualLearning";
import Gamification from "../pages/Deaf/pages/Gamification";
import Community from "../pages/Deaf/pages/Community";
import Accessibility from "../pages/Deaf/pages/Accessibility";
import Canvas from "../pages/Deaf/pages/Canvas";
import Meet from "../pages/Deaf/pages/Meet";
import PlanYourDay from "../pages/Deaf/pages/PlanYourDay";
import DProfile from "../pages/Deaf/components/DProfile";
import Signgame from "../pages/Deaf/components/Signgame";
import SentanceGames from "../pages/Deaf/components/SentanceGames";

// Blind
import AuthBlind from "../pages/Blind/components/AuthBlind";
import BlindHub from "../pages/Blind/pages/Blind";
import Videos from "../pages/Blind/components/Videos";
import SubtitleGenerator from "../pages/Blind/pages/SubtitleGenerator";
import CodeViewer from "../pages/Blind/pages/CodeViewer";
import DevTools from "../pages/Blind/components/DevTools";
import Aitutor from "../pages/Blind/components/Aitutor";
import Game1 from "../pages/Blind/components/Game1";
import YoutubeSummary from "../pages/Blind/components/YoutubeSummary";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Global */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/allusers" element={<Home1 />} />

        {/* Deaf */}
        <Route path="/authdeaf" element={<Auth />} />
        <Route path="/deaf" element={<Deaf />} />
        <Route path="/signlang" element={<SignLanguage />} />
        <Route path="/deaf/sign-language" element={<SignLanguage />} />
        <Route path="/visual-learning" element={<VisualLearning />} />
        <Route path="/gamification-deaf" element={<Gamification />} />
        <Route path="/community-deaf" element={<Community />} />
        <Route path="/accessibility" element={<Accessibility />} />
        <Route path="/dprofile" element={<DProfile />} />
        <Route path="/canvas" element={<Canvas />} />
        <Route path="/signgame" element={<Signgame />} />
        <Route path="/deaf-meet" element={<Meet />} />
        <Route path="/deaf-planyourday" element={<PlanYourDay />} />
        <Route path="/game2" element={<SentanceGames />} />
   

        {/* Blind */}
        <Route path="/authblind" element={<AuthBlind />} />
        <Route path="/mainblind" element={<BlindHub />} />
        <Route path="/blindvideos" element={<Videos />} />
        <Route path="/blindsubtitle" element={<SubtitleGenerator />} />
        <Route path="/blindcode" element={<CodeViewer />} />
        <Route path="/blinddev" element={<DevTools />} />
        <Route path="/aitutor" element={<Aitutor />} />
        <Route path="/game1" element={<Game1 />} />
        <Route path="/youtubesummary" element={<YoutubeSummary />} />
      </Routes>
    </BrowserRouter>
  );
}
