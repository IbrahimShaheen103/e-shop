import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProductDetailsScreen from "../screens/ProductDetails/ProductDetails.screen";
import MainTabs from "./MainTaps";

export type RootStackParamList = {
  MainTabs: undefined;
  ProductDetails: { productId: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainTabs"
        component={MainTabs}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="ProductDetails"
        component={ProductDetailsScreen}
        options={{ title: "Product Details" }}
      />
    </Stack.Navigator>
  );
}
