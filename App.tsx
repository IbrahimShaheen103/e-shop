import { NavigationContainer } from "@react-navigation/native";
import { useEffect } from "react";
import RootStack from "./src/navigation/RootStack";
import { useAuthStore } from "./src/store/auth.store";

export default function App() {
  useEffect(() => {
    useAuthStore.getState().hydrateAuth();
  }, []);
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}
