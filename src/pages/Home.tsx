import { useState } from "react";
import { useImages } from "../hooks/useImages";
import ImageGrid from "../components/ImageGrid";
import ImageModal from "../components/ImageModal";
import SearchBar from "../components/SearchBar";
import { useImageContext } from "../context/ImageContext";

export default function Home() {
  const [query, setQuery] = useState("nature");
  const { setImages } = useImageContext();

  const { images } = useImages(query);

  setImages(images);

  return (
    <div>
      <section className="hero-section">
        <h1>Welcome To My Image Finder</h1>
      </section>

      <SearchBar onSearch={setQuery} />

      <ImageGrid />

      <ImageModal />
    </div>
  );
}
