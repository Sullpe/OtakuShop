export interface Manga {
  id: number;
  title: string;
  author: string;
  description: string;
  coverImage: string;
  price: number;
  rating: number;
  volumes: number;
  genres: string[];
  releaseDate: string;
  publisher: string;
  inStock: boolean;
}

export interface CartItem {
  mangaId: number;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
}