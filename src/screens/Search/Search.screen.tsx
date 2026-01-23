import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TextInput,
  View,
} from "react-native";

import AppHeader from "../../components/AppHeader/AppHeader";

import ProductCard from "../../components/ProductCard/ProductCard";
import { RootStackParamList } from "../../navigation/RootStack";
import { useCartStore } from "../../store/cart.store";
import { useProductsStore } from "../../store/products.store";
import HEADER_THEMES from "../../types/headerTheme";
import styles from "./Search.styles";

export default function SearchScreen() {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const { searchProducts, clearSearch, searchResults, isSearching } =
    useProductsStore();

  const { items, addItem, increaseQty, decreaseQty } = useCartStore();

  // debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim()) {
        searchProducts(query);
      } else {
        clearSearch();
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [query]);

  const getQuantity = (productId: number) => {
    const item = items.find((i) => i.id === productId);
    return item ? item.quantity : 0;
  };

  return (
    <View style={styles.container}>
      <AppHeader
        title="Search"
        compact={focused}
        backgroundColor={HEADER_THEMES.search.bg}
        iconColor={HEADER_THEMES.search.text}
      />

      <TextInput
        placeholder="Search products..."
        value={query}
        onChangeText={setQuery}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={styles.input}
      />

      {isSearching && <ActivityIndicator style={{ marginTop: 24 }} />}

      {!isSearching && query !== "" && searchResults.length === 0 && (
        <Text style={styles.empty}>No results found</Text>
      )}

      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
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
      />
    </View>
  );
}
