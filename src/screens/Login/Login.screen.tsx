import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import AppHeader from "../../components/AppHeader/AppHeader";
import { RootStackParamList } from "../../navigation/RootStack";
import { useAuthStore } from "../../store/auth.store";
import styles from "./login.styles";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const { loginUser, isLoading, error, isLoggedIn } = useAuthStore();

  const handleLogin = () => {
    if (!username || !password) return;
    loginUser({ username, password });
  };
  useEffect(() => {
    if (isLoggedIn) {
      navigation.replace("MainTabs");
    }
  }, [isLoggedIn]);

  return (
    <View style={styles.container}>
      <AppHeader title="E-Shop" backgroundColor="#111" iconColor="#fff" />

      <View style={styles.centerWrapper}>
        <View style={styles.card}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Login to continue shopping</Text>

          <TextInput
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            style={styles.input}
            placeholderTextColor="#9CA3AF"
          />

          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
            placeholderTextColor="#9CA3AF"
          />

          {error && <Text style={styles.error}>{error}</Text>}

          <TouchableOpacity
            style={[styles.button, isLoading && { opacity: 0.7 }]}
            onPress={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Login</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
