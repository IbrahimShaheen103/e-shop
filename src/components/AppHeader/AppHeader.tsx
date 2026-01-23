import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef } from "react";
import { Animated, Text, View } from "react-native";
import styles from "./AppHeader.styles";

type Props = {
  title: string;
  showCartIcon?: boolean;
  backgroundColor?: string;
  iconColor?: string;
};

export default function AppHeader({
  title,
  showCartIcon = false,
  backgroundColor = "#111",
  iconColor = "#fff",
}: Props) {
  const slideAnim = useRef(new Animated.Value(-30)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor,
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <View style={styles.content}>
        <Ionicons name="storefront-outline" size={22} color={iconColor} />

        <Text
          style={[
            styles.title,
            {
              color: iconColor,
            },
          ]}
        >
          {title}
        </Text>

        {showCartIcon && (
          <Ionicons name="cart-outline" size={22} color={iconColor} />
        )}
      </View>
    </Animated.View>
  );
}
