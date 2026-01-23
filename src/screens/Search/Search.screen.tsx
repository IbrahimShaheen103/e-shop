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
  const [showSuggestions, setShowSuggestions] = useState(false);

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
        onChangeText={(text) => {
          setQuery(text);
          setShowSuggestions(true);
        }}
        onFocus={() => {
          setFocused(true);
          setShowSuggestions(true);
        }}
        onBlur={() => {
          setFocused(false);
          // delay to allow tap
          setTimeout(() => setShowSuggestions(false), 150);
        }}
        style={styles.input}
      />
      {showSuggestions && query !== "" && searchResults.length > 0 && (
        <View style={styles.suggestions}>
          {searchResults.slice(0, 5).map((item) => (
            <Text
              key={item.id}
              style={styles.suggestionItem}
              onPress={() => {
                setQuery(item.title);
                setShowSuggestions(false);
              }}
            >
              {item.title}
            </Text>
          ))}
        </View>
      )}

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
        onScrollBeginDrag={() => setShowSuggestions(false)}
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
