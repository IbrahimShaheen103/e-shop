import { useEffect } from "react";
import { useAuthStore } from "../store/auth.store";
import { useCartStore } from "../store/cart.store";
import AuthStack from "./AuthStack";
import MainTabs from "./MainTaps";

const RootNavigator = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  useEffect(() => {
    useCartStore.getState().hydrateCart();
  }, []);

  return isLoggedIn ? <MainTabs /> : <AuthStack />;
};

export default RootNavigator;
