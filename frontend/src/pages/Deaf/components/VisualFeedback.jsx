import React, { useState, useCallback } from "react";
import ReactPlayer from "react-player";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

export default function Videos() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const { transcript, listening, resetTranscript } = useSpeechRecognition();
  const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

  // 🎤 Start mic
  const startVoice = () => {
    resetTranscript();
    SpeechRecognition.startListening();
  };

  // 🔍 Search videos
  const searchVideos = useCallback(async (q) => {
    if (!q) return;
    setQuery(q);
 
    try {
      if (API_KEY) {
        const res = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${q}&key=${API_KEY}&maxResults=5&type=video`
        );
        const data = await res.json();

        setResults(
          data.items.map((v) => ({
            title: v.snippet.title,
            thumbnail: v.snippet.thumbnails.medium.url,
            url: `https://www.youtube.com/watch?v=${v.id.videoId}`,
          }))
        );
      } else {
        // fallback
        setResults([
          {
            title: "React Tutorial",
            thumbnail: "https://img.youtube.com/vi/bMknfKXIFA8/mqdefault.jpg",
            url: "https://www.youtube.com/watch?v=bMknfKXIFA8",
          },
          {
            title: "JavaScript Basics",
            thumbnail: "https://img.youtube.com/vi/W6NZfCO5SIk/mqdefault.jpg",
            url: "https://www.youtube.com/watch?v=W6NZfCO5SIk",
          },
        ]);
      }
    } catch (e) {
      console.log(e);
    }
  }, [API_KEY]);

  // 🔊 Speak
  const speak = (t) => {
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(t));
  };

  return (
    <div className="p-6 bg-black text-white min-h-screen">
      <h1 className="text-2xl mb-4">Voice YouTube Search</h1>

      {/* Mic */}
      <button
        onClick={() => {
          if (listening) {
            SpeechRecognition.stopListening();
            const text = transcript.toLowerCase().trim();
            if (text) {
              searchVideos(text);
            }
            resetTranscript();
            return;
          }

          startVoice();
        }}
        className="bg-indigo-600 px-4 py-2 mb-4"
      >
        {listening ? "Listening..." : "Start Voice"}
      </button>

      <p>Query: {query}</p>

      {/* Results */}
      <div className="grid gap-4 mt-4">
        {results.map((v, i) => (
          <div
            key={i}
            tabIndex={0}
            onFocus={() => speak(v.title)}
            onClick={() => setSelectedVideo(v)}
            className="bg-gray-800 p-3 cursor-pointer"
          >
            <img src={v.thumbnail} alt="" />
            <p>{v.title}</p>
          </div>
        ))}
      </div>

      {/* Player */}
      {selectedVideo && (
        <div className="mt-6">
          <ReactPlayer url={selectedVideo.url} controls width="100%" />
        </div>
      )}
    </div>
  );
}