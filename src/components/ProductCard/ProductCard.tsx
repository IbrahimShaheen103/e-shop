import { Image, Text, TouchableOpacity, View } from "react-native";
import { Product } from "../../api/products.api";
import styles from "./productCard.styles";

type Props = {
  product: Product;
  quantity: number;
  onAdd: () => void;
  onRemove: () => void;
  onPress?: () => void;
};

export default function ProductCard({
  product,
  quantity,
  onAdd,
  onRemove,
  onPress,
}: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
      <Image source={{ uri: product.thumbnail }} style={styles.image} />

      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {product.title}
        </Text>

        <Text style={styles.price}>${product.price}</Text>

        {/* ADD / REMOVE CONTROLS */}
        <View style={styles.qtyRow}>
          <TouchableOpacity
            style={styles.qtyBtn}
            onPress={onRemove}
            disabled={quantity === 0}
          >
            <Text style={styles.qtyText}>−</Text>
          </TouchableOpacity>

          <Text style={styles.qtyValue}>{quantity}</Text>

          <TouchableOpacity style={styles.qtyBtn} onPress={onAdd}>
            <Text style={styles.qtyText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}
