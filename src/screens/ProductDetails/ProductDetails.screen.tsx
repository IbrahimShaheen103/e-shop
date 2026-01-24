import { useRoute } from "@react-navigation/native";
import { useEffect } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useCartStore } from "../../store/cart.store";
import { useProductsStore } from "../../store/products.store";
import styles from "./ProductDetails.styles";

export default function ProductDetailsScreen() {
  const route = useRoute<any>();
  const { productId } = route.params;

  const { fetchProductById, selectedProduct, isLoading } = useProductsStore();
  const {
    addItem,
    isLoading: isCartLoading,
    error: cartError,
  } = useCartStore();

  useEffect(() => {
    fetchProductById(productId);
  }, [productId]);

  if (isLoading || !selectedProduct) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const { title, description, price, discountPercentage, rating, thumbnail } =
    selectedProduct;

  const finalPrice = Math.round(price - price * (discountPercentage / 100));

  const handleAddToCart = async () => {
    try {
      await addItem(productId, 1);
      Alert.alert("Success", "Product added to cart");
    } catch (error) {
      Alert.alert("Error", "Failed to add product to cart");
    }
  };
  return (
    <ScrollView style={styles.container}>
      {/* Image */}
      <Image source={{ uri: thumbnail }} style={styles.image} />

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>

        <View style={styles.row}>
          <Text style={styles.rating}>⭐ {rating}</Text>
          {discountPercentage > 0 && (
            <Text style={styles.discount}>
              -{Math.round(discountPercentage)}%
            </Text>
          )}
        </View>

        <View style={styles.priceRow}>
          <Text style={styles.price}>${finalPrice}</Text>
          {discountPercentage > 0 && (
            <Text style={styles.oldPrice}>${price}</Text>
          )}
        </View>

        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>{description}</Text>

        {/* Buttons */}
        <View style={styles.buttons}>
          <View style={styles.buyNow}>
            <Text style={styles.buyText}>Buy Now</Text>
          </View>

          <TouchableOpacity
            style={[styles.addToCart, isCartLoading && { opacity: 0.6 }]}
            onPress={handleAddToCart}
            disabled={isCartLoading}
          >
            {isCartLoading ? (
              <ActivityIndicator />
            ) : (
              <Text style={styles.cartText}>Add to Cart</Text>
            )}
          </TouchableOpacity>

          {cartError && (
            <Text style={{ color: "red", marginTop: 8 }}>{cartError}</Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
}
