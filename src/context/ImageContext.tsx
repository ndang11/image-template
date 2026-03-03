import { createContext, useContext, useState, type ReactNode } from "react";
import type { PexelsImage } from "../types/image";

export interface ImageContextType {
  images: PexelsImage[];
  selectedImage: PexelsImage | null;
  setImages: (images: PexelsImage[]) => void;
  setSelectedImage: (img: PexelsImage | null) => void;
}

const ImageContext = createContext<ImageContextType | null>(null);

interface ImageProviderProps {
  children: ReactNode;
}

export const ImageProvider = ({ children }: ImageProviderProps) => {
  const [images, setImages] = useState<PexelsImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<PexelsImage | null>(null);

  return (
    <ImageContext.Provider
      value={{ images, setImages, selectedImage, setSelectedImage }}
    >
      {children}
    </ImageContext.Provider>
  );
};

export const useImageContext = () => {
  const ctx = useContext(ImageContext);
  if (!ctx) throw new Error("useImageContext must be used within ImageProvider");
  return ctx;
};
