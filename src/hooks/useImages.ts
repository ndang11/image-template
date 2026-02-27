import { useEffect, useState } from "react";
import { fetchImages } from "../api/pexels"
import { type PexelsImage } from "../types/image";

export const useImages = (query: string) => {
    const [images, setImages] = useState<PexelsImage[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!query.trim()) {
            setImages([]);
            return;
        }

        setLoading(true);
        setError(null);

        fetchImages(query)
            .then((data) => {
                setImages(data.photos || []);
            })
            .catch((err) => {
                setError(err.message || "Failed to fetch images");
            })
            .finally(() => {
                setLoading(false);
            });
    }, [query]);

    return { images, loading, error };
};