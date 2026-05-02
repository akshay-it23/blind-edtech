import React, { useState, useEffect } from "react";
import { Play, ArrowLeft, Search, Volume2, Mic, MicOff, Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

export default function Videos() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [lastSearchQuery, setLastSearchQuery] = useState("");

  // Speech Recognition Hook
  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  // Fallback demo videos
  const demoVideos = [
    {
      id: "demo1",
      title: "Introduction to Biology",
      description: "Learn about the basics of life and living organisms.",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      videoId: "dQw4w9WgXcQ"
    },
    {
      id: "demo2",
      title: "History of Ancient Civilizations",
      description: "A deep dive into the Egyptian and Mesopotamian cultures.",
      thumbnail: "https://img.youtube.com/vi/OPf0YbXqDm0/mqdefault.jpg",
      url: "https://www.youtube.com/watch?v=OPf0YbXqDm0",
      videoId: "OPf0YbXqDm0"
    },
    {
      id: "demo3",
      title: "Physics: Laws of Motion",
      description: "Understanding Newton's three laws of motion with examples.",
      thumbnail: "https://img.youtube.com/vi/ZKl_IyWk5Ug/mqdefault.jpg",
      url: "https://www.youtube.com/watch?v=ZKl_IyWk5Ug",
      videoId: "ZKl_IyWk5Ug"
    },
    {
      id: "demo4",
      title: "Geography of World Continents",
      description: "Explore the diverse landscapes across the seven continents.",
      thumbnail: "https://img.youtube.com/vi/BXn0BxKLEhE/mqdefault.jpg",
      url: "https://www.youtube.com/watch?v=BXn0BxKLEhE",
      videoId: "BXn0BxKLEhE"
    },
    {
      id: "demo5",
      title: "Chemistry: Periodic Table Basics",
      description: "Understanding the periodic table and chemical elements.",
      thumbnail: "https://img.youtube.com/vi/sPK7ZNgFPaE/mqdefault.jpg",
      url: "https://www.youtube.com/watch?v=sPK7ZNgFPaE",
      videoId: "sPK7ZNgFPaE"
    }
  ];

  const videoList = demoVideos;

  // YouTube API Search Function
  const searchYouTube = async (searchQuery) => {
    if (!searchQuery.trim()) {
      speak("Please enter a search query.");
      return;
    }

    setIsSearching(true);
    setLastSearchQuery(searchQuery);
    const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;

    try {
      if (apiKey) {
        // Use YouTube API if key exists
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${encodeURIComponent(searchQuery)}&type=video&key=${apiKey}`
        );
        const data = await response.json();

        if (data.items && data.items.length > 0) {
          const formattedResults = data.items.map((item) => ({
            id: item.id.videoId,
            title: item.snippet.title,
            description: item.snippet.description,
            thumbnail: item.snippet.thumbnails.medium.url,
            url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
            videoId: item.id.videoId
          }));
          setResults(formattedResults);
          speak(`Found ${formattedResults.length} videos for ${searchQuery}`);
        } else {
          speak("No videos found. Showing demo results instead.");
          setResults(demoVideos);
        }
      } else {
        // Fallback to demo results
        speak(`Using demo results. To enable YouTube search, add your YouTube API key.`);
        setResults(demoVideos);
      }
    } catch (error) {
      console.error("Search error:", error);
      speak("Search failed. Showing demo results.");
      setResults(demoVideos);
    } finally {
      setIsSearching(false);
    }
  };

  // Voice Search Handler
  const handleVoiceSearch = () => {
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      resetTranscript();
      SpeechRecognition.startListening({ continuous: false });
    }
  };

  // Auto-search when transcript changes
  useEffect(() => {
    if (transcript && !listening) {
      setQuery(transcript);
      searchYouTube(transcript);
      resetTranscript();
    }
  }, [transcript, listening]);

  // Speech Synthesis
  const speak = (text) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
  };

  // Display initial demo videos if no search yet
  const displayVideos = results.length > 0 ? results : videoList;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <header className="flex items-center gap-6 mb-12">
        <button 
          onClick={() => navigate("/mainblind")}
          onFocus={() => speak("Go back to hub")}
          className="p-4 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft size={40} />
        </button>
        <h1 className="text-5xl font-black">Video Lessons</h1>
      </header>

      {/* Search Section */}
      <div className="max-w-4xl mx-auto mb-12">
        <div className="flex gap-4 items-center">
          {/* Search Input */}
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => speak("Search for videos")}
            placeholder="Search for educational videos..."
            className="flex-1 px-6 py-4 bg-gray-800 rounded-2xl text-2xl text-white placeholder-gray-500 border-2 border-gray-700 focus:border-green-500 outline-none transition-colors"
            aria-label="Search videos"
          />

          {/* Voice Search Button */}
          <button
            onClick={handleVoiceSearch}
            onFocus={() => speak(listening ? "Stop listening" : "Click to start voice search")}
            className={`p-4 rounded-full transition-all transform ${
              listening
                ? "bg-red-600 hover:bg-red-500 scale-110"
                : "bg-green-600 hover:bg-green-500"
            }`}
            aria-label={listening ? "Stop listening" : "Start voice search"}
          >
            {listening ? <MicOff size={40} /> : <Mic size={40} />}
          </button>

          {/* Search Button */}
          <button
            onClick={() => searchYouTube(query)}
            onFocus={() => speak("Click to search")}
            disabled={isSearching}
            className="p-4 bg-blue-600 rounded-full hover:bg-blue-500 transition-colors disabled:opacity-50"
            aria-label="Search"
          >
            {isSearching ? <Loader size={40} className="animate-spin" /> : <Search size={40} />}
          </button>
        </div>

        {/* Search Status */}
        {transcript && (
          <div className="mt-4 p-4 bg-gray-800 rounded-xl border-2 border-green-500">
            <p className="text-xl text-gray-300">
              Heard: <span className="text-green-400 font-bold">{transcript}</span>
            </p>
          </div>
        )}

        {isSearching && (
          <div className="mt-4 p-4 bg-gray-800 rounded-xl text-center">
            <p className="text-xl text-gray-300">Searching for videos...</p>
          </div>
        )}
      </div>

      {/* Video Results Grid */}
      <div className="max-w-6xl mx-auto">
        {displayVideos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayVideos.map((video, index) => (
              <div
                key={video.id}
                onClick={() => {
                  speak(`Now playing ${video.title}`);
                  setSelectedVideo(video);
                }}
                onFocus={() => speak(`${video.title}. ${video.description}. Press Enter to play.`)}
                tabIndex={0}
                className="group bg-gray-800 rounded-2xl overflow-hidden border-4 border-transparent hover:border-green-500 transition-all cursor-pointer transform hover:scale-105"
              >
                {/* Thumbnail */}
                <div className="relative w-full aspect-video bg-gray-700 overflow-hidden">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                    <div className="p-4 bg-green-500 rounded-full text-black group-hover:scale-110 transition-transform">
                      <Play size={32} fill="currentColor" />
                    </div>
                  </div>
                  {/* Video Number for Accessibility */}
                  <div className="absolute top-2 left-2 bg-green-500 text-black px-3 py-1 rounded-full font-bold text-sm">
                    #{index + 1}
                  </div>
                </div>

                {/* Video Info */}
                <div className="p-4">
                  <h3 className="text-xl font-bold text-green-400 mb-2 line-clamp-2">{video.title}</h3>
                  <p className="text-sm text-gray-400 line-clamp-2">{video.description}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-3xl text-gray-400">No videos found</p>
          </div>
        )}
      </div>

      {/* Video Player Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center p-8">
          <div className="w-full max-w-5xl">
            {/* Player Container */}
            <div className="w-full aspect-video bg-gray-800 rounded-3xl overflow-hidden mb-8">
              <ReactPlayer
                url={selectedVideo.url}
                controls
                width="100%"
                height="100%"
                playing
                onPlay={() => speak(`Playing ${selectedVideo.title}`)}
              />
            </div>

            {/* Video Title */}
            <h2 className="text-4xl font-black text-center mb-8 px-4">{selectedVideo.title}</h2>

            {/* Description */}
            <p className="text-xl text-gray-300 text-center mb-8 px-4 max-w-3xl mx-auto">
              {selectedVideo.description}
            </p>

            {/* Close Button */}
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  setSelectedVideo(null);
                  speak("Video stopped. Returning to gallery.");
                }}
                onFocus={() => speak("Close video player")}
                className="px-12 py-6 bg-red-600 rounded-full text-2xl font-black hover:bg-red-500 transition-colors shadow-2xl"
              >
                Close Video
              </button>

              <button
                onClick={() => speak(selectedVideo.title + ". " + selectedVideo.description)}
                onFocus={() => speak("Repeat description")}
                className="px-8 py-6 bg-blue-600 rounded-full hover:bg-blue-500 transition-colors shadow-2xl"
                aria-label="Repeat description"
              >
                <Volume2 size={32} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
