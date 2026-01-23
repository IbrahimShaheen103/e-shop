import { create } from "zustand";
import { login, LoginPayload, LoginResponse } from "../api/auth.api";

type AuthState = {
  user: LoginResponse | null;
  token: string | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  error: string | null;

  loginUser: (payload: LoginPayload) => Promise<void>;
  logout: () => void;
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

  logout: () => {
    set({
      user: null,
      token: null,
      isLoggedIn: false,
    });
  },
}));
