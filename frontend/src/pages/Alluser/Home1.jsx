import React from "react";
import bgImage from "./assest/community.png";



export default function Home1() {
  return (
    <div
      className="relative h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Light overlay */}
      <div className="absolute inset-0 bg-white/40"></div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full text-black">


here my community card will appear









      </div>
    </div>
  );
}