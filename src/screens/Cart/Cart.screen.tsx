import { Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AppHeader from "../../components/AppHeader/AppHeader";
import { useCartStore } from "../../store/cart.store";
import HEADER_THEMES from "../../types/headerTheme";
import styles from "./Cart.styles";

export default function CartScreen() {
  const {
    items,
    total,
    fetchCart,
    isLoading,
    error,
    increaseQty,
    decreaseQty,
    removeItem,
  } = useCartStore();

  useEffect(() => {
    fetchCart();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>{error}</Text>
      </View>
    );
  }

  if (items.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.empty}>Your cart is empty</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <AppHeader
        title="Your Cart"
        showCartIcon
        backgroundColor={HEADER_THEMES.cart.bg}
        iconColor={HEADER_THEMES.cart.text}
      />

      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.item}>
            {/* LEFT SIDE */}
            <View style={styles.left}>
              <Image source={{ uri: item.thumbnail }} style={styles.image} />

              <View style={styles.info}>
                <Text style={styles.title} numberOfLines={2}>
                  {item.title}
                </Text>

                <Text style={styles.price}>${item.price}</Text>
                <View style={styles.qtyRow}>
                  <TouchableOpacity
                    style={styles.qtyBtn}
                    onPress={() => decreaseQty(item.id)}
                  >
                    <Text style={styles.qtyText}>−</Text>
                  </TouchableOpacity>

                  <Text style={styles.qtyValue}>{item.quantity}</Text>

                  <TouchableOpacity
                    style={styles.qtyBtn}
                    onPress={() => increaseQty(item.id)}
                  >
                    <Text style={styles.qtyText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* RIGHT SIDE */}
            <View style={styles.right}>
              <Text style={styles.itemTotal}>${item.total}</Text>

              <TouchableOpacity
                style={styles.removeBtn}
                onPress={() => removeItem(item.id)}
              >
                <Ionicons name="trash-outline" size={18} color="#E53935" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.totalText}>Total</Text>
        <Text style={styles.totalPrice}>${total}</Text>

        <TouchableOpacity style={styles.checkout}>
          <Text style={styles.checkoutText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
