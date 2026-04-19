import { useState } from "react";

const SignLanguageDictionary = () => {
const [query, setQuery] = useState("");
const [results, setResults] = useState([]);
const [loading, setLoading] = useState(false);

const fetchSigns = async () => {
setLoading(true);
const API_KEY = import.meta.env.VITE_GIPHY_API_KEY;

if (API_KEY) {
  const res = await fetch(
    `https://api.giphy.com/v1/gifs/search?q=${query} sign language&api_key=${API_KEY}&limit=6`
  );
  const data = await res.json();
  setResults(data.data);
}

setLoading(false);


};

const handleSearch = () => {
if (!query.trim()) return;
fetchSigns();
};

return ( <div className="p-4">


  {/* SEARCH BAR */}
  <div className="flex gap-2 mb-6">
    <input
      className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search a sign..."
    />

    <button
      onClick={handleSearch}
      className="bg-blue-600 text-white px-4 rounded-lg hover:bg-blue-700"
    >
      Search
    </button>
  </div>

  {/* LOADING */}
  {loading && <p className="text-blue-600">Loading...</p>}

  {/* EMPTY */}
  {!loading && results.length === 0 && (
    <p className="text-gray-500">No results found</p>
  )}

  {/* GRID */}
  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
    {results.map((item) => (
      <div
        key={item.id}
        className="bg-white rounded-xl shadow hover:shadow-lg transition p-2"
      >
        <img
          src={item.images.fixed_height.url}
          alt={item.title}
          className="w-full rounded-lg"
        />
        <p className="text-center mt-2 font-medium">
          {item.title}
        </p>
      </div>
    ))}
  </div>
</div>

);
};

export default SignLanguageDictionary;
