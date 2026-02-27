export interface PexelsImage {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url?: string;
  src: {
    original: string;
    large: string;
    medium: string;
    small: string;
  };
}