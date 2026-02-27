import { useImageContext } from "../context/ImageContext";

export default function ImageCard({ image }: any) {
  const { setSelectedImage } = useImageContext();

  return (
    <div
      className="relative group cursor-pointer overflow-hidden rounded-xl"
      onClick={() => setSelectedImage(image)}
    >
      <img
        src={image.src.medium}
        alt={image.photographer}
        className="w-full h-60 object-cover transition-transform duration-300 group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300 flex items-end">
        <div className="p-3 text-white">
          <p className="text-sm font-semibold">
            {image.photographer}
          </p>
        </div>
      </div>
    </div>
  );
}