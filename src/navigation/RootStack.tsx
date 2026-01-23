import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProductDetailsScreen from "../screens/ProductDetails/ProductDetails.screen";
import { useAuthStore } from "../store/auth.store";
import AuthStack from "./AuthStack";
import MainTabs from "./MainTaps";

export type RootStackParamList = {
  MainTabs: undefined;
  AuthStack: undefined;
  ProductDetails: { productId: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootStack() {
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={isLoggedIn ? "MainTabs" : "AuthStack"}
    >
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen name="AuthStack" component={AuthStack} />

      <Stack.Screen
        name="ProductDetails"
        component={ProductDetailsScreen}
        options={{ headerShown: true, title: "Product Details" }}
      />
    </Stack.Navigator>
  );
}
