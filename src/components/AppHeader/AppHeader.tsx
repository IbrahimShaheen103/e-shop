import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useRef, useState } from "react";
import { Animated, Modal, Text, TouchableOpacity, View } from "react-native";

import { RootStackParamList } from "../../navigation/RootStack";
import { useAuthStore } from "../../store/auth.store";
import { useCartStore } from "../../store/cart.store";
import styles from "./AppHeader.styles";

type Props = {
  title: string;
  showCartIcon?: boolean;
  showLogoutIcon?: boolean; // ✅ NEW
  backgroundColor?: string;
  iconColor?: string;
  compact?: boolean;
};

export default function AppHeader({
  title,
  showCartIcon = false,
  showLogoutIcon = false, // ✅ NEW
  backgroundColor = "#111",
  iconColor = "#fff",
  compact = false,
}: Props) {
  /* ---------------- navigation & auth (NEW) ---------------- */

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const logout = useAuthStore((s) => s.logout);
  const clearCart = useCartStore((s) => s.clearCart);

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  /* ---------------- animations (UNCHANGED) ---------------- */

  const slideAnim = useRef(new Animated.Value(-20)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const compactAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  /* ---------------- cart state (UNCHANGED) ---------------- */

  const totalQuantity = useCartStore((state) => state.totalQuantity);

  /* ---------------- effects (UNCHANGED) ---------------- */

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

  useEffect(() => {
    Animated.timing(compactAnim, {
      toValue: compact ? 0 : 1,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [compact]);

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

  /* ---------------- interpolations (UNCHANGED) ---------------- */

  const paddingTop = compactAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [16, 44],
  });

  /* ---------------- render ---------------- */

  return (
    <>
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
          {/* LEFT ICON */}
          <Ionicons name="storefront-outline" size={22} color={iconColor} />

          {/* TITLE */}
          <Text style={[styles.title, { color: iconColor }]}>{title}</Text>

          {/* RIGHT ACTIONS */}
          <View style={styles.rightActions}>
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

            {showLogoutIcon && (
              <TouchableOpacity
                onPress={() => setShowLogoutModal(true)}
                style={styles.logoutButton}
              >
                <Ionicons name="log-out-outline" size={22} color={iconColor} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Animated.View>

      {/* ---------------- LOGOUT CONFIRM MODAL (NEW) ---------------- */}

      <Modal
        visible={showLogoutModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowLogoutModal(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Logout</Text>
            <Text style={styles.modalText}>
              Are you sure you want to log out?
            </Text>

            <View style={styles.modalActions}>
              <TouchableOpacity onPress={() => setShowLogoutModal(false)}>
                <Text style={styles.cancel}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={async () => {
                  setShowLogoutModal(false);
                  await logout();
                  clearCart();
                  navigation.replace("AuthStack");
                }}
              >
                <Text style={styles.logout}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}
