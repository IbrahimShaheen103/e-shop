import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CartScreen from "../screens/Cart/Cart.screen";
import SearchScreen from "../screens/Search/Search.screen";
import { useCartStore } from "../store/cart.store";
import HomeStack from "./HomeStack";

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  const totalQuantity = useCartStore((state) => state.totalQuantity);

  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cart" size={size} color={color} />
          ),
          tabBarBadge: totalQuantity > 0 ? totalQuantity : undefined,
        }}
      />

      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
