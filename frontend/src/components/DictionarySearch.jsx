import React, { useState } from "react";
import axios from "axios";

const DictionarySearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/search?query=${query}`);
      setResults(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold text-center mb-4">Search Dictionary</h2>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter a Malayalam word"
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />
      <button
        onClick={handleSearch}
        className="w-full p-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        disabled={loading}
      >
        {loading ? "Searching..." : "Search"}
      </button>
      
      <div className="mt-6">
        {results.length > 0 ? (
          <ul>
            {results.map((word) => (
              <li key={word._id} className="mb-4">
                <h3 className="text-xl font-bold">{word.headword}</h3>
                <p className="text-gray-500">{word.pos.join(", ")}</p>
                <ul className="list-disc list-inside">
                  {word.senses.map((sense, index) => (
                    <li key={index} className="text-gray-700">{sense}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">{loading ? "" : "No results found"}</p>
        )}
      </div>
    </div>
  );
};

export default DictionarySearch;