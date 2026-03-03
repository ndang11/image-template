import { useEffect, useState } from "react";
import { useImageContext } from "../context/ImageContext";
import type { PexelsImage } from "../types/image";
import { X, Download, ExternalLink, Camera, User, Maximize2, Check } from "lucide-react";

interface DownloadPreviewProps {
  image: PexelsImage;
  url: string;
  label: string;
  onClose: () => void;
}

function DownloadPreview({ image, url, label, onClose }: DownloadPreviewProps) {
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = async () => {
    try {
      setDownloading(true);
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `${image.id}-${label.toLowerCase()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
      setDownloaded(true);
      setTimeout(() => {
        onClose();
        setDownloaded(false);
      }, 1500);
    } catch (error) {
      console.error("Download failed:", error);
      window.open(url, "_blank");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/95 flex items-center justify-center z-[60] animate-fade-in" 
      onClick={onClose}
    >
      <div 
        className="bg-slate-800 p-6 rounded-2xl max-w-2xl w-full mx-4 relative animate-fade-in" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-slate-700 hover:bg-red-500 hover:text-white rounded-xl transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>
        
        {/* Image Preview */}
        <div className="relative rounded-xl overflow-hidden mb-4">
          <img
            src={url}
            alt={`Download ${label}`}
            className="w-full max-h-[50vh] object-contain rounded-xl"
          />
        </div>
        
        {/* Image Details */}
        <div className="p-4 bg-slate-700 rounded-xl mb-4">
          <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
            <Maximize2 className="w-4 h-4 text-indigo-400" />
            Image Details
          </h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-slate-500" />
              <span className="text-slate-500">Photographer:</span> 
              <span className="font-medium">{image.photographer}</span>
            </div>
            <div>
              <span className="text-slate-500">Size:</span> 
              <span className="font-medium ml-1">{label}</span>
            </div>
            <div>
              <span className="text-slate-500">Dimensions:</span> 
              <span className="font-medium ml-1">{image.width} x {image.height}</span>
            </div>
            <div>
              <span className="text-slate-500">Image ID:</span> 
              <span className="font-medium ml-1">#{image.id}</span>
            </div>
          </div>
        </div>
        
        {/* Download Button */}
        <div className="flex justify-center">
          <button
            onClick={handleDownload}
            disabled={downloading || downloaded}
            className={`
              flex items-center gap-2 px-8 py-3 rounded-xl font-semibold transition-all
              ${downloaded 
                ? "bg-green-500 text-white" 
                : "bg-gradient-to-r from-indigo-600 to-indigo-700 hover:shadow-lg hover:shadow-indigo-500/30 text-white"
              }
              disabled:opacity-50
            `}
          >
            {downloading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 rounded-full animate-spin border-t-white"></div>
                <span>Downloading...</span>
              </>
            ) : downloaded ? (
              <>
                <Check className="w-5 h-5" />
                <span>Downloaded!</span>
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                <span>Download {label}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ImageModal() {
  const { selectedImage, setSelectedImage } = useImageContext();
  const [downloadPreview, setDownloadPreview] = useState<{ url: string; label: string } | null>(null);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedImage(null);
        setDownloadPreview(null);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [setSelectedImage]);

  // Handle custom event
  useEffect(() => {
    const handler = (e: any) => setSelectedImage(e.detail);
    window.addEventListener("openModal", handler);
    return () => window.removeEventListener("openModal", handler);
  }, []);

  if (!selectedImage) return null;

  const resolutions = [
    { label: "Small", url: selectedImage.src.small, desc: "640px" },
    { label: "Medium", url: selectedImage.src.medium, desc: "1920px" },
    { label: "Large", url: selectedImage.src.large, desc: "3840px" },
    { label: "Original", url: selectedImage.src.original, desc: "Full Size" },
  ];

  return (
    <>
      {/* Main Modal */}
      <div 
        className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 animate-fade-in"
        onClick={() => setSelectedImage(null)}
      >
        <div 
          className="bg-slate-800 p-6 rounded-2xl max-w-5xl w-full mx-4 relative max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 p-2 bg-slate-700 hover:bg-red-500 hover:text-white rounded-xl transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Image */}
          <img
            src={selectedImage.src.large}
            alt={selectedImage.photographer}
            className="w-full max-h-[60vh] object-contain rounded-xl mb-4"
          />

          {/* Photographer Info */}
          <div className="flex items-center justify-between mb-4 p-4 bg-slate-700 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg">
                {selectedImage.photographer.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-semibold text-lg">{selectedImage.photographer}</p>
                <a
                  href={selectedImage.photographer_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-400 hover:underline text-sm flex items-center gap-1"
                >
                  View Profile
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
            
            {/* Open Original Button */}
            <a
              href={selectedImage.src.original}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-slate-600 hover:bg-slate-500 text-white rounded-xl transition-colors flex items-center gap-2"
            >
              <Maximize2 className="w-4 h-4" />
              View Original
            </a>
          </div>

          {/* Resolution Options */}
          <div className="space-y-2">
            <p className="text-sm text-slate-500 mb-3 flex items-center gap-2">
              <Camera className="w-4 h-4" />
              Choose resolution to download:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {resolutions.map((res) => (
                <button
                  key={res.label}
                  onClick={() => setDownloadPreview({ url: res.url, label: res.label })}
                  className="flex flex-col items-center gap-2 p-4 bg-slate-700 hover:bg-indigo-600 hover:text-white rounded-xl border border-slate-600 hover:border-indigo-500 transition-all group"
                >
                  <Download className="w-5 h-5 group-hover:text-white" />
                  <div>
                    <p className="font-semibold">{res.label}</p>
                    <p className="text-xs opacity-60">{res.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Download Preview Modal */}
      {downloadPreview && (
        <DownloadPreview
          image={selectedImage}
          url={downloadPreview.url}
          label={downloadPreview.label}
          onClose={() => setDownloadPreview(null)}
        />
      )}
    </>
  );
}
