import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import AppHeader from "../../components/AppHeader/AppHeader";
import ProductCard from "../../components/ProductCard/ProductCard";
import { RootStackParamList } from "../../navigation/RootStack";
import { useCartStore } from "../../store/cart.store";
import { useProductsStore } from "../../store/products.store";
import HEADER_THEMES from "../../types/headerTheme";
import styles from "./Home.styles";
export default function HomeScreen() {
  const { isLoading, error, products, fetchProducts } = useProductsStore();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { items, addItem, increaseQty, decreaseQty } = useCartStore();

  useEffect(() => {
    fetchProducts();
  }, []);
  const getQuantity = (productId: number) => {
    const item = items.find((i) => i.id === productId);
    return item ? item.quantity : 0;
  };

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

  return (
    <View style={styles.container}>
      <AppHeader
        title="E-Shop"
        backgroundColor={HEADER_THEMES.home.bg}
        iconColor={HEADER_THEMES.home.text}
      />

      <FlatList
        contentContainerStyle={styles.list}
        data={products}
        numColumns={2}
        columnWrapperStyle={styles.row}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          const quantity = getQuantity(item.id);
          return (
            <ProductCard
              product={item}
              quantity={quantity}
              onAdd={() =>
                quantity === 0 ? addItem(item.id, 1) : increaseQty(item.id)
              }
              onRemove={() => decreaseQty(item.id)}
              onPress={() =>
                navigation.navigate("ProductDetails", {
                  productId: item.id,
                })
              }
            />
          );
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
