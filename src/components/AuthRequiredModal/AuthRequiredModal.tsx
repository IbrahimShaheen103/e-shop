import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { RootStackParamList } from "../../navigation/RootStack";
import styles from "./AuthRequiredModal.styles";

type Props = {
  visible: boolean;
  onClose: () => void;
};

export default function AuthRequiredModal({ visible, onClose }: Props) {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Login Required</Text>

          <Text style={styles.message}>You need to log in to continue.</Text>

          <View style={styles.actions}>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.cancel}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                onClose();
                navigation.navigate("AuthStack");
              }}
            >
              <Text style={styles.login}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
