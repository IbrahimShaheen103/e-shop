import { useState } from "react";
import { TextInput, View } from "react-native";
import AppHeader from "../../components/AppHeader/AppHeader";
import HEADER_THEMES from "../../types/headerTheme";

export default function SearchScreen() {
  const [focused, setFocused] = useState(false);

  return (
    <View>
      <AppHeader
        title="Search"
        compact={focused}
        backgroundColor={HEADER_THEMES.search.bg}
        iconColor={HEADER_THEMES.search.text}
      />

      <TextInput
        placeholder="Search products..."
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        // style={styles.searchInput}
      />
    </View>
  );
}
