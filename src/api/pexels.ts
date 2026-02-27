const API_URL = 'https://api.pexels.com/v1';

const headers = {
  Authorization: import.meta.env.VITE_PEXELS_API_KEY,
};

export const fetchImages = async (query: string, page: number = 1, perPage: number = 30) => {
    const response = await fetch(`${API_URL}/search?query=${encodeURIComponent(query)}&page=${page}&per_page=${perPage}`, {
        headers,
    }); 
    return response.json();
};