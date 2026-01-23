import { create } from "zustand";
import { getProductById, getProducts, Product } from "../api/products.api";

type ProductsState = {
  products: Product[];
  selectedProduct: Product | null;
  isLoading: boolean;
  error: string | null;

  fetchProducts: () => Promise<void>;
  fetchProductById: (id: number) => Promise<void>;
  clearSelectedProduct: () => void;
};

export const useProductsStore = create<ProductsState>((set) => ({
  products: [],
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
}));
