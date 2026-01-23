import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/Home/Home.screen";
import ProductDetailsScreen from "../screens/ProductDetails/ProductDetails.screen";

export type HomeStackParamList = {
  Home: undefined;
  ProductDetails: { productId: number };
};

const Stack = createNativeStackNavigator<HomeStackParamList>();
export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
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
