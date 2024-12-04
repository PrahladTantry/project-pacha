import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, BookOpen, AlertCircle } from 'lucide-react';

const DictionarySearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const searchTimeout = setTimeout(() => {
      if (searchQuery.trim() !== '') {
        performSearch();
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(searchTimeout);
  }, [searchQuery]);

  const performSearch = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get('http://localhost:5000/api/search', {
        params: { query: searchQuery }
      });

      setResults(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch dictionary results');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <BookOpen className="w-10 h-10 text-green-400 mr-4" />
          <h1 className="text-3xl md:text-4xl font-bold text-green-400">
            Malayalam Dictionary Search
          </h1>
        </div>

        <div className="relative mb-8">
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for a Malayalam word..."
            className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white 
              border border-gray-700 focus:outline-none focus:ring-2 
              focus:ring-green-500 transition duration-300"
          />
          <Search 
            className="absolute right-4 top-1/2 transform -translate-y-1/2 
              text-gray-400 pointer-events-none"
          />
        </div>

        {loading && (
          <div className="text-center text-gray-400">Searching...</div>
        )}

        {error && (
          <div className="flex items-center text-red-400 mb-4">
            <AlertCircle className="mr-2" />
            {error}
          </div>
        )}

        <div className="space-y-4">
          {results.map((result, index) => (
            <div 
              key={index} 
              className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition duration-300"
            >
              <h2 className="text-xl font-semibold text-green-400 mb-2">
                {result.headword}
              </h2>
              <p className="text-gray-300 mb-2">
                <strong>Part of Speech:</strong> {result.pos}
              </p>
              <div className="text-gray-400">
                <strong>Meanings:</strong>
                <ul className="list-disc list-inside">
                  {result.sense.map((sense, senseIndex) => (
                    <li key={senseIndex}>{sense}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}

          {results.length === 0 && searchQuery.trim() !== '' && !loading && (
            <div className="text-center text-gray-400">
              No results found. Try a different search term.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DictionarySearch;