import React from "react";
import Sidebar from "./components/Sidebar";
export default function Deaf() { return (
  <div className="flex">

    {/* Sidebar */}
    <Sidebar />

    {/* Main Content */}
    <div className="flex-1 p-6 ml-64">
      <h1 className="text-2xl font-bold">
        Deaf Dashboard
      </h1>
    </div>

  </div>
); }
