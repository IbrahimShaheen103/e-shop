import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { login, LoginPayload, LoginResponse } from "../api/auth.api";

const AUTH_STORAGE_KEY = "E-SHOP-AUTH";
type AuthState = {
  user: LoginResponse | null;
  token: string | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  error: string | null;

  loginUser: (payload: LoginPayload) => Promise<void>;
  logout: () => void;
  hydrateAuth: () => Promise<void>;
  requireLogin: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isLoggedIn: false,
  isLoading: false,
  error: null,

  loginUser: async (payload) => {
    try {
      set({ isLoading: true, error: null });

      const response = await login(payload);

      const authData = {
        user: response,
        token: response.token,
        isLoggedIn: true,
      };

      await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authData));

      set({
        user: response,
        token: response.token,
        isLoggedIn: true,
        isLoading: false,
      });
    } catch (err) {
      set({
        error: String(err),
        isLoading: false,
      });
    }
  },

  hydrateAuth: async () => {
    try {
      const stored = await AsyncStorage.getItem(AUTH_STORAGE_KEY);

      if (!stored) {
        // ⚠️ DO NOT override state if no stored auth
        return;
      }

      const parsed = JSON.parse(stored);

      set((state) => {
        // ✅ already logged in → do nothing
        if (state.isLoggedIn) return state;

        return {
          user: parsed.user,
          token: parsed.token,
          isLoggedIn: true,
        };
      });
    } catch (e) {
      console.log("Auth hydrate failed", e);
    }
  },

  logout: async () => {
    await AsyncStorage.removeItem(AUTH_STORAGE_KEY);

    set({
      user: null,
      token: null,
      isLoggedIn: false,
    });
  },
  requireLogin: () => {
    set({
      isLoggedIn: false,
    });
  },
}));
