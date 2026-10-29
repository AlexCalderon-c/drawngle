import { create } from 'zustand';
import axios from 'axios';

export interface UnsplashImage {
  id: string;
  urls: {
    regular: string;
    small: string;
    thumb: string;
  };
  alt_description: string | null;
  user: {
    name: string;
    links: {
      html: string;
    };
  };
}

interface SearchState {
  query: string;
  images: UnsplashImage[];
  page: number;
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  selectedImageIndex: number | null;
  formInput: string;
  setQuery: (query: string) => void;
  setFormInput: (formInput: string) => void;
  searchImages: (query: string) => Promise<void>;
  loadMore: () => Promise<void>;
  setSelectedImageIndex: (index: number | null) => void;
  nextImage: () => void;
  prevImage: () => void;
  clearError: () => void;
}

export const useSearchStore = create<SearchState>((set, get) => ({
  query: '',
  images: [],
  page: 1,
  loading: false,
  error: null,
  hasMore: true,
  selectedImageIndex: null,
  formInput: '',

  setQuery: (query: string) => set({ query }),
  setFormInput: (formInput: string) => set({ formInput }),

  clearError: () => set({ error: null }),

  searchImages: async (newQuery: string) => {
    const trimmed = newQuery.trim();
    if (!trimmed) {
      set({ error: 'Query is required and cannot be empty', images: [] });
      return;
    }

    set({ loading: true, error: null, query: trimmed, page: 1, images: [], hasMore: true });

    try {
      const response = await axios.get('http://localhost:3002/api/unsplash/search', {
        params: { query: trimmed, page: 1 },
        timeout: 10000
      });

      const results: UnsplashImage[] = response.data.results || [];
      const totalPages = response.data.total_pages || 1;

      set({
        images: results,
        loading: false,
        hasMore: 1 < totalPages && results.length > 0
      });
    } catch (err: any) {
      const message = err.code === 'ECONNABORTED' || !err.response 
        ? 'Network timeout or offline. Please check your connection.'
        : err.response?.data?.error || 'Failed to retrieve images from Unsplash.';
      
      set({ loading: false, error: message, images: [] });
    }
  },

  loadMore: async () => {
    const { query, page, loading, hasMore, images } = get();
    if (loading || !hasMore || !query) return;

    const nextPage = page + 1;
    set({ loading: true, error: null });

    try {
      const response = await axios.get('http://localhost:3002/api/unsplash/search', {
        params: { query, page: nextPage },
        timeout: 10000
      });

      const results: UnsplashImage[] = response.data.results || [];
      const totalPages = response.data.total_pages || nextPage;

      set({
        images: [...images, ...results],
        page: nextPage,
        loading: false,
        hasMore: nextPage < totalPages && results.length > 0
      });
    } catch (err: any) {
      const message = err.code === 'ECONNABORTED' || !err.response 
        ? 'Network timeout or offline.'
        : err.response?.data?.error || 'Failed to load more images.';

      set({ loading: false, error: message });
    }
  },

  setSelectedImageIndex: (index: number | null) => set({ selectedImageIndex: index }),

  nextImage: () => {
    const { selectedImageIndex, images } = get();
    if (selectedImageIndex === null || images.length === 0) return;
    const nextIndex = (selectedImageIndex + 1) % images.length;
    set({ selectedImageIndex: nextIndex });
  },

  prevImage: () => {
    const { selectedImageIndex, images } = get();
    if (selectedImageIndex === null || images.length === 0) return;
    const prevIndex = (selectedImageIndex - 1 + images.length) % images.length;
    set({ selectedImageIndex: prevIndex });
  }
}));
