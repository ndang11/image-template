import { useEffect, useState } from "react";
import { useImageContext } from "../context/ImageContext";

interface DownloadPreviewProps {
  url: string;
  label: string;
  imageId: number;
  onClose: () => void;
}

function DownloadPreview({ url, label, imageId, onClose }: DownloadPreviewProps) {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    try {
      setDownloading(true);
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `${imageId}-${label.toLowerCase()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
      onClose();
    } catch (error) {
      console.error("Download failed:", error);
      window.open(url, "_blank");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-[60]" onClick={onClose}>
      <div className="bg-white p-4 rounded-lg max-w-2xl w-full relative" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500 font-bold text-xl"
        >
          ✕
        </button>
        <img
          src={url}
          alt={`Download ${label}`}
          className="w-full max-h-[60vh] object-contain rounded"
        />
        <div className="mt-4 flex justify-center">
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded font-semibold disabled:opacity-50"
          >
            {downloading ? "Downloading..." : "Download"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ImageModal() {
  const { selectedImage, setSelectedImage } = useImageContext();
  const [downloadPreview, setDownloadPreview] = useState<{ url: string; label: string } | null>(null);

  useEffect(() => {
    const handler = (e: any) => setSelectedImage(e.detail);
    window.addEventListener("openModal", handler);
    return () => window.removeEventListener("openModal", handler);
  }, []);

  if (!selectedImage) return null;

  const resolutions = [
    { label: "Small", url: selectedImage.src.small },
    { label: "Medium", url: selectedImage.src.medium },
    { label: "Large", url: selectedImage.src.large },
    { label: "Original", url: selectedImage.src.original },
  ];

  return (
    <>
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg max-w-4xl w-full relative">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 text-red-500 font-bold text-lg"
          >
            ✕
          </button>

          <img
            src={selectedImage.src.large}
            alt={selectedImage.photographer}
            className="w-full max-h-[70vh] object-contain rounded"
          />

          <div className="mt-4 flex justify-between items-center">
            <div>
              <p className="font-semibold">{selectedImage.photographer}</p>
              <a
                href={selectedImage.photographer_url}
                target="_blank"
                className="text-blue-500 underline text-sm"
              >
                View Profile
              </a>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {resolutions.map((res) => (
              <button
                key={res.label}
                onClick={() => setDownloadPreview({ url: res.url, label: res.label })}
                className="bg-black hover:bg-blue-600 text-white px-3 py-1 rounded"
              >
                Download {res.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {downloadPreview && (
        <DownloadPreview
          url={downloadPreview.url}
          label={downloadPreview.label}
          imageId={selectedImage.id}
          onClose={() => setDownloadPreview(null)}
        />
      )}
    </>
  );
}
