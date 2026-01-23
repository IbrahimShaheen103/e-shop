import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { addToCart, getUserCart } from "../api/cart.api";
import { useAuthStore } from "./auth.store";
import { useProductsStore } from "./products.store";

const CART_STORAGE_KEY = "E_SHOP_CART";

const persistCart = async (
  items: CartItem[],
  total: number,
  totalQuantity: number,
) => {
  await AsyncStorage.setItem(
    CART_STORAGE_KEY,
    JSON.stringify({ items, total, totalQuantity }),
  );
};

interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}

interface CartItem extends Product {
  quantity: number;
  total: number;
}

interface CartActions {
  fetchCart: () => Promise<void>;
  addItem: (productId: number, quantity?: number) => Promise<void>;
  increaseQty: (productId: number) => void;
  decreaseQty: (productId: number) => void;
  removeItem: (productId: number) => void;

  clearCart: () => void;

  hydrateCart: () => Promise<void>;
}

interface CartState extends CartActions {
  items: CartItem[];
  total: number;
  totalQuantity: number;

  isLoading: boolean;
  error: string | null;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  total: 0,
  isLoading: false,
  error: null,

  totalQuantity: 0,
  fetchCart: async () => {
    try {
      set({ isLoading: true, error: null });

      const user = useAuthStore.getState().user;
      if (!user) throw new Error("User not logged in");

      const response = await getUserCart(user.id);

      const cart = response.carts?.[0];

      set({
        items: cart?.products ?? [],
        total: cart?.total ?? 0,
        isLoading: false,
      });
    } catch (err) {
      set({
        error: String(err),
        isLoading: false,
      });
    }
  },

  addItem: async (productId, quantity = 1) => {
    try {
      set({ isLoading: true, error: null });

      const user = useAuthStore.getState().user;
      if (!user) throw new Error("User not logged in");

      // call API just to simulate success
      await addToCart(user.id, [{ id: productId, quantity }]);

      set((state) => {
        const existing = state.items.find((item) => item.id === productId);

        let updatedItems;

        if (existing) {
          updatedItems = state.items.map((item) =>
            item.id === productId
              ? {
                  ...item,
                  quantity: item.quantity + quantity,
                  total: (item.quantity + quantity) * item.price,
                }
              : item,
          );
        } else {
          const product = useProductsStore
            .getState()
            .products.find((p: { id: number }) => p.id === productId);

          if (!product) return state;

          updatedItems = [
            ...state.items,
            {
              id: product.id,
              title: product.title,
              price: product.price,
              quantity,
              total: product.price * quantity,
              thumbnail: product.thumbnail,
            },
          ];
        }

        const total = updatedItems.reduce((sum, item) => sum + item.total, 0);
        const totalQuantity = updatedItems.reduce(
          (sum, item) => sum + item.quantity,
          0,
        );
        persistCart(updatedItems, total, totalQuantity);

        return {
          items: updatedItems,
          total,
          totalQuantity,
          isLoading: false,
        };
      });
    } catch (err) {
      set({
        error: String(err),
        isLoading: false,
      });
    }
  },
  increaseQty: (productId) => {
    set((state) => {
      const updatedItems = state.items.map((item) =>
        item.id === productId
          ? {
              ...item,
              quantity: item.quantity + 1,
              total: (item.quantity + 1) * item.price,
            }
          : item,
      );

      const total = updatedItems.reduce((sum, item) => sum + item.total, 0);
      const totalQuantity = updatedItems.reduce(
        (sum, item) => sum + item.quantity,
        0,
      );
      persistCart(updatedItems, total, totalQuantity);

      return { items: updatedItems, total, totalQuantity };
    });
  },

  decreaseQty: (productId) => {
    set((state) => {
      const updatedItems = state.items
        .map((item) =>
          item.id === productId
            ? {
                ...item,
                quantity: item.quantity - 1,
                total: (item.quantity - 1) * item.price,
              }
            : item,
        )
        .filter((item) => item.quantity > 0); // remove if qty = 0

      const total = updatedItems.reduce((sum, item) => sum + item.total, 0);
      const totalQuantity = updatedItems.reduce(
        (sum, item) => sum + item.quantity,
        0,
      );
      persistCart(updatedItems, total, totalQuantity);

      return { items: updatedItems, total, totalQuantity };
    });
  },
  removeItem: (productId) => {
    set((state) => {
      const updatedItems = state.items.filter((item) => item.id !== productId);

      const total = updatedItems.reduce((sum, item) => sum + item.total, 0);
      const totalQuantity = updatedItems.reduce(
        (sum, item) => sum + item.quantity,
        0,
      );
      persistCart(updatedItems, total, totalQuantity);

      return {
        items: updatedItems,
        total,
        totalQuantity,
      };
    });
  },

  clearCart: () => {
    AsyncStorage.removeItem(CART_STORAGE_KEY);

    set({
      items: [],
      total: 0,
      totalQuantity: 0,
    });
  },
  hydrateCart: async () => {
    try {
      const stored = await AsyncStorage.getItem(CART_STORAGE_KEY);
      if (!stored) return;

      const parsed = JSON.parse(stored);

      set({
        items: parsed.items || [],
        total: parsed.total || 0,
        totalQuantity: parsed.totalQuantity || 0,
      });
    } catch (err) {
      console.log("Failed to hydrate cart", err);
    }
  },
}));
