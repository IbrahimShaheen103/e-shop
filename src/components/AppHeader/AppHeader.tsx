import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef } from "react";
import { Animated, Text, View } from "react-native";
import { useCartStore } from "../../store/cart.store";
import styles from "./AppHeader.styles";

type Props = {
  title: string;
  showCartIcon?: boolean;
  backgroundColor?: string;
  iconColor?: string;
  compact?: boolean; // for search animation
};

export default function AppHeader({
  title,
  showCartIcon = false,
  backgroundColor = "#111",
  iconColor = "#fff",
  compact = false,
}: Props) {
  /* ---------------- animations ---------------- */

  // entrance animation
  const slideAnim = useRef(new Animated.Value(-20)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // compact (search focus) animation
  const compactAnim = useRef(new Animated.Value(1)).current;

  // cart pulse animation
  const scaleAnim = useRef(new Animated.Value(1)).current;

  /* ---------------- cart state ---------------- */

  const totalQuantity = useCartStore((state) => state.totalQuantity);

  /* ---------------- effects ---------------- */

  // entrance animation
  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 350,
        useNativeDriver: false,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 350,
        useNativeDriver: false,
      }),
    ]).start();
  }, []);

  // compact animation (search focus)
  useEffect(() => {
    Animated.timing(compactAnim, {
      toValue: compact ? 0 : 1,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [compact]);

  // pulse when cart changes
  useEffect(() => {
    if (totalQuantity === 0) return;

    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.04,
        duration: 120,
        useNativeDriver: false,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 120,
        useNativeDriver: false,
      }),
    ]).start();
  }, [totalQuantity]);

  /* ---------------- interpolations ---------------- */

  const paddingTop = compactAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [16, 44],
  });

  /* ---------------- render ---------------- */

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor,
          paddingTop,
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
        },
      ]}
    >
      <View style={styles.content}>
        <Ionicons name="storefront-outline" size={22} color={iconColor} />

        <Text style={[styles.title, { color: iconColor }]}>{title}</Text>

        {showCartIcon && (
          <View style={styles.cartWrapper}>
            <Ionicons name="cart-outline" size={22} color={iconColor} />

            {totalQuantity > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{totalQuantity}</Text>
              </View>
            )}
          </View>
        )}
      </View>
    </Animated.View>
  );
}
