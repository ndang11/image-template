import { useState, useEffect } from "react";
import { Search, X, TrendingUp } from "lucide-react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  currentQuery: string;
}

const trendingSearches = [
  "Nature",
  "Technology",
  "Business",
  "Abstract",
  "Architecture",
  "Food",
  "Travel",
  "Animals",
];

export default function SearchBar({ onSearch, currentQuery }: SearchBarProps) {
  const [query, setQuery] = useState(currentQuery);
  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    setQuery(currentQuery);
  }, [currentQuery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    onSearch(suggestion);
    setShowSuggestions(false);
  };

  const handleClear = () => {
    setQuery("");
    setShowSuggestions(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto relative z-20">
      <form onSubmit={handleSubmit}>
        <div
          className={`
            flex items-center gap-3 px-5 py-4 
            bg-slate-800 
            border-2 rounded-2xl
            transition-all duration-300
            ${isFocused 
              ? "border-indigo-500 shadow-lg shadow-indigo-500/20" 
              : "border-slate-700 hover:border-slate-600"
            }
          `}
        >
          <Search 
            className={`w-5 h-5 transition-colors ${isFocused ? "text-indigo-400" : "text-slate-500"}`} 
          />
          
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => {
              setIsFocused(true);
              setShowSuggestions(true);
            }}
            onBlur={() => {
              setIsFocused(false);
              setTimeout(() => setShowSuggestions(false), 200);
            }}
            placeholder="Search for stunning images..."
            className="flex-1 bg-transparent border-none outline-none text-slate-100 placeholder:text-slate-500 text-base"
          />
          
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="p-1 hover:bg-slate-700 rounded-full transition-colors"
            >
              <X className="w-4 h-4 text-slate-500" />
            </button>
          )}
          
          <button
            type="submit"
            className="
              px-5 py-2 
              bg-gradient-to-r from-indigo-600 to-indigo-700
              text-white font-medium rounded-xl
              hover:shadow-lg hover:shadow-indigo-500/30
              transition-all duration-200
              transform hover:scale-105
            "
          >
            Search
          </button>
        </div>

        {showSuggestions && (
          <div className="absolute top-full left-0 right-0 mt-2 p-4 bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl animate-fade-in">
            <div className="flex items-center gap-2 mb-3 text-slate-500">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-medium">Trending Searches</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {trendingSearches.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleSuggestionClick(tag)}
                  className="
                    px-3 py-1.5 text-sm
                    bg-slate-700 text-slate-300
                    rounded-lg border border-slate-600
                    hover:bg-indigo-600 hover:text-white hover:border-indigo-600
                    transition-all duration-200
                  "
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
