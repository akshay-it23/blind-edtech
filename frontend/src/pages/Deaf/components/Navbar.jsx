import React from "react";
import { Bell } from "lucide-react";

export default function Navbar() {
  return (
    <div className="fixed top-0 left-64 right-0 h-14 bg-white shadow z-40 flex items-center justify-between px-4">

      <div className="flex items-center">
        <input
          type="text"
          placeholder="Search..."
          className="border px-3 py-1 rounded-lg outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </div>

      <div className="flex items-center gap-4">

        <Bell className="cursor-pointer text-gray-700 hover:text-indigo-600" />

        <div className="w-8 h-8 bg-indigo-600 text-white flex items-center justify-center rounded-full font-bold">
          A
        </div>

      </div>

    </div>
  );
}