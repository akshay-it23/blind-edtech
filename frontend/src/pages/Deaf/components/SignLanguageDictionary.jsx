import { useState } from "react";

export default function SignLanguageDictionary() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const fetchSigns = async () => {
    const trimmed = query.trim();
    if (!trimmed) return;

    setLoading(true);
    setHasSearched(true);

    const API_KEY = import.meta.env.VITE_GIPHY_API_KEY;

    try {
      if (API_KEY) {
        const res = await fetch(
          `https://api.giphy.com/v1/gifs/search?q=${encodeURIComponent(trimmed)}%20sign%20language&api_key=${API_KEY}&limit=6`
        );
        const data = await res.json();
        setResults(Array.isArray(data.data) ? data.data : []);
      } else {
        setResults([
          {
            id: "fallback-hello",
            title: "Hello",
            images: {
              fixed_height: {
                url: "https://media.giphy.com/media/3o7aD2saalBwwftBIY/giphy.gif",
              },
            },
          },
        ]);
      }
    } catch (err) {
      console.error("Error fetching sign language GIFs:", err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full text-white">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
        Sign Language Dictionary
      </h2>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search a sign (example: hello, thank you)"
          className="flex-1 p-3 rounded-lg bg-white/10 border border-white/30 text-white placeholder-slate-300 focus:ring-2 focus:ring-cyan-400 outline-none"
        />

        <button
          onClick={fetchSigns}
          className="bg-cyan-600 px-5 py-2 rounded-lg hover:bg-cyan-500 transition-colors font-medium"
        >
          Search
        </button>
      </div>

      {loading && (
        <div className="flex justify-center py-8">
          <div className="w-8 h-8 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {!loading && hasSearched && results.length === 0 && (
        <p className="text-center text-slate-200">No results found.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {results.map((item) => {
          const imageUrl = item?.images?.fixed_height?.url;
          if (!imageUrl) return null;

          return (
            <article
              key={item.id}
              className="bg-white/10 border border-white/20 rounded-xl hover:scale-[1.02] transition-transform p-2"
            >
              <img
                src={imageUrl}
                alt={item.title || "Sign language result"}
                className="w-full rounded-lg h-44 object-cover"
              />
              <p className="text-center mt-2 font-medium text-white truncate px-1">
                {item.title || "Untitled"}
              </p>
            </article>
          );
        })}
      </div>
    </div>
  );
}
