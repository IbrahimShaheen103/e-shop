import { useState } from "react";
import { useAuthStore } from "../store/auth.store";

export const useAuthGuard = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  const [showModal, setShowModal] = useState(false);

  const requireAuth = (callback: () => void) => {
    if (!isLoggedIn) {
      setShowModal(true);
      return;
    }

    callback();
  };

  return {
    showModal,
    closeModal: () => setShowModal(false),
    requireAuth,
  };
};
