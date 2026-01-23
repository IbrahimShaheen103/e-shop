import { create } from "zustand";
import {
  getProductById,
  getProducts,
  Product,
  searchProducts as searchApi,
} from "../api/products.api";

interface ProductsState {
  products: Product[];
  selectedProduct: Product | null;

  searchResults: Product[];
  isSearching: boolean;
  searchError: string | null;
  isLoading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
  fetchProductById: (id: number) => Promise<void>;
  searchProducts: (query: string) => Promise<void>;
  clearSearch: () => void;
  clearSelectedProduct: () => void;
}

export const useProductsStore = create<ProductsState>((set) => ({
  products: [],
  searchResults: [],
  isSearching: false,
  searchError: null,
  selectedProduct: null,
  isLoading: false,
  error: null,

  fetchProducts: async () => {
    try {
      set({ isLoading: true, error: null });

      const response = await getProducts();

      set({
        products: response.products,
        isLoading: false,
      });
    } catch (err) {
      set({
        error: String(err),
        isLoading: false,
      });
    }
  },

  fetchProductById: async (id) => {
    try {
      set({ isLoading: true, error: null });

      const product = await getProductById(id);

      set({
        selectedProduct: product,
        isLoading: false,
      });
    } catch (err) {
      set({
        error: String(err),
        isLoading: false,
      });
    }
  },

  clearSelectedProduct: () => {
    set({ selectedProduct: null });
  },
  searchProducts: async (query) => {
    if (!query.trim()) {
      set({ searchResults: [], isSearching: false });
      return;
    }

    try {
      set({ isSearching: true, searchError: null });

      const response = await searchApi(query);

      set({
        searchResults: response.products,
        isSearching: false,
      });
    } catch (err) {
      set({
        searchError: String(err),
        isSearching: false,
      });
    }
  },

  clearSearch: () => {
    set({
      searchResults: [],
      searchError: null,
      isSearching: false,
    });
  },
}));
