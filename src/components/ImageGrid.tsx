import { useImageContext } from "../context/ImageContext";
import { useImages } from "../hooks/useImages";

function ImageSkeleton() {
  return (
    <div className="relative overflow-hidden rounded-sm bg-slate-800">
      <div className="w-full bg-slate-700 animate-pulse" style={{ paddingBottom: '66.67%' }}></div>
    </div>
  );
}

function ImageCard({ image }: { image: any }) {
  const { setSelectedImage } = useImageContext();

  return (
    <div
      onClick={() => setSelectedImage(image)}
      className="relative group cursor-pointer overflow-hidden rounded-sm bg-slate-800"
    >
      <img
        src={image.src.medium}
        alt={image.photographer}
        className="w-full h-auto block"
        loading="lazy"
      />
      
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <span className="text-white text-sm font-medium">
            {image.photographer}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function ImageGrid() {
  const { images } = useImageContext();
  const { loading } = useImages("");

  const skeletonCount = Array.from({ length: 21 }, (_, i) => i);

  return (
    <div className="w-full">
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-0.5 sm:gap-1">
          {skeletonCount.map((index) => (
            <ImageSkeleton key={index} />
          ))}
        </div>
      ) : images.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-24 h-24 mb-6 rounded-full bg-slate-800 flex items-center justify-center">
            <span className="text-5xl">🔍</span>
          </div>
          <h3 className="text-xl font-semibold text-slate-100 mb-2">
            No images found
          </h3>
          <p className="text-slate-500 text-center max-w-md">
            Try searching for something else
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-0.5 sm:gap-3">
          {images.map((image) => (
            <ImageCard key={image.id} image={image} />
          ))}
        </div>
      )}
    </div>
  );
}
