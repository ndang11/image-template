import { useImageContext } from "../context/ImageContext";

export default function ImageGrid() {
  const { images, setSelectedImage } = useImageContext();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4">
      {images.map((image) => (
        <div
          key={image.id}
          onClick={() => setSelectedImage(image)}
          className="relative group cursor-pointer overflow-hidden rounded-lg"
        >
          <img
            src={image.src.medium}
            alt={image.photographer}
            className="w-full h-60 object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition duration-300 flex items-end">
            <div className="p-2 text-white text-sm font-semibold">
               {image.photographer}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}