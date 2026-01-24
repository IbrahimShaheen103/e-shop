import { Image, Text, View } from "react-native";
import AppHeader from "../../components/AppHeader/AppHeader";
import { useAuthStore } from "../../store/auth.store";
import styles from "./Profile.styles";

export default function ProfileScreen() {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return (
      <View style={styles.container}>
        <AppHeader title="Profile" />
        <Text style={styles.emptyText}>No user data</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <AppHeader title="Profile" showLogoutIcon />

      {/* Avatar Section */}
      <View style={styles.avatarSection}>
        <Image source={{ uri: user.image }} style={styles.image} />
        <Text style={styles.name}>
          {user.firstName} {user.lastName}
        </Text>
        <Text style={styles.username}>@{user.username}</Text>
      </View>

      {/* Info Card */}
      <View style={styles.infoCard}>
        <View style={styles.infoRow}>
          <Text style={styles.label}>📧 Email</Text>
          <Text style={styles.value}>{user.email}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.infoRow}>
          <Text style={styles.label}>⚤ Gender</Text>
          <Text style={styles.value}>{user.gender}</Text>
        </View>
      </View>
    </View>
  );
}
