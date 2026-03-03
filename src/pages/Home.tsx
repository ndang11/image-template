import { useState, useEffect } from "react";
import { useImages } from "../hooks/useImages";
import ImageGrid from "../components/ImageGrid";
import ImageModal from "../components/ImageModal";
import SearchBar from "../components/SearchBar";
import { useImageContext } from "../context/ImageContext";
import { Image } from "lucide-react";

export default function Home() {
  const [query, setQuery] = useState("nature");
  const { setImages } = useImageContext();
  const { images, loading, error } = useImages(query);

  useEffect(() => {
    setImages(images);
  }, [images, setImages]);

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
  };

  return (
    <div className="min-h-screen">
      <header className="relative pt-16 pb-12 px-4 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/2 -left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-1/2 -right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative container mx-auto">
          <div className="text-center mb-10 animate-fade-in">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-indigo-500 to-pink-500 shadow-lg shadow-indigo-500/30">
              <Image className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4">
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Image Finder
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto">
              Discover and download stunning high-quality images from Pexels
            </p>
          </div>

          <div className="animate-fade-in stagger-2">
            <SearchBar onSearch={handleSearch} currentQuery={query} />
          </div>

        </div>
      </header>

      <main className="container mx-auto px-4 pb-16">
        <div className="flex items-center justify-between mb-6">
          <div className="animate-slide-in">
            <h2 className="text-xl font-semibold text-slate-100">
              {loading ? "Searching..." : `Results for "${query}"`}
            </h2>
            {!loading && (
              <p className="text-sm text-slate-500">
                {images.length} images found
              </p>
            )}
          </div>
        </div>

        {error && (
          <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
            <div className="w-16 h-16 mb-4 rounded-full bg-red-500/10 flex items-center justify-center">
              <span className="text-3xl">⚠️</span>
            </div>
            <h3 className="text-xl font-semibold text-slate-100 mb-2">
              Oops! Something went wrong
            </h3>
            <p className="text-slate-500 text-center max-w-md">
              {error}
            </p>
            <button
              onClick={() => handleSearch(query)}
              className="mt-4 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {!error && <ImageGrid />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center">
                <Image className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-slate-100">Image Finder</span>
            </div>
            <p className="text-sm text-slate-500">
              Powered by <a href="https://www.pexels.com/" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline">Pexels</a>
            </p>
          </div>
        </div>
      </footer>

      <ImageModal />
    </div>
  );
}
