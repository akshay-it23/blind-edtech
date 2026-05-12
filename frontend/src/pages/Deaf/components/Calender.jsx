import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { motion } from "framer-motion";
import { Calendar as CalendarIcon, Plus } from "lucide-react";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const initialEvents = [
  {
    title: "Sign Language Basics",
    start: new Date(new Date().setHours(10, 0, 0, 0)),
    end: new Date(new Date().setHours(11, 0, 0, 0)),
  },
  {
    title: "Visual Storytelling",
    start: new Date(new Date().setDate(new Date().getDate() + 1)),
    end: new Date(new Date().setDate(new Date().getDate() + 1)),
  },
  {
    title: "Deaf Community Meetup",
    start: new Date(new Date().setDate(new Date().getDate() + 3)),
    end: new Date(new Date().setDate(new Date().getDate() + 3)),
  },
];

export default function Calender() {
  const [events, setEvents] = useState(initialEvents);
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });

  const handleAddEvent = (e) => {
    e.preventDefault();
    if (newEvent.title && newEvent.start && newEvent.end) {
      setEvents([...events, {
        title: newEvent.title,
        start: new Date(newEvent.start),
        end: new Date(newEvent.end)
      }]);
      setNewEvent({ title: "", start: "", end: "" });
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-8 max-w-6xl mx-auto"
    >
      <header className="mb-8 flex items-center gap-4">
        <div className="p-4 bg-indigo-100 rounded-xl">
          <CalendarIcon size={40} className="text-indigo-600" />
        </div>
        <div>
          <h1 className="text-4xl font-bold text-gray-800">Plan Your Day</h1>
          <p className="text-gray-500 text-lg">Manage your schedule and upcoming lessons</p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Event</h2>
            <form onSubmit={handleAddEvent} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Event Title</label>
                <input 
                  type="text" 
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  placeholder="e.g. Study Group"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date & Time</label>
                <input 
                  type="datetime-local" 
                  value={newEvent.start}
                  onChange={(e) => setNewEvent({...newEvent, start: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Date & Time</label>
                <input 
                  type="datetime-local" 
                  value={newEvent.end}
                  onChange={(e) => setNewEvent({...newEvent, end: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  required
                />
              </div>
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="mt-4 flex items-center justify-center gap-2 bg-indigo-600 text-white p-3 rounded-xl hover:bg-indigo-700 transition-colors font-bold shadow-md"
              >
                <Plus size={20} /> Add Event
              </motion.button>
            </form>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 h-[700px]">
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: '100%' }}
              className="font-sans"
              views={['month', 'week', 'day']}
              defaultView="month"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
