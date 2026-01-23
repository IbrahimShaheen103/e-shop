import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    paddingTop: 44,
    paddingBottom: 14,
    paddingHorizontal: 16,
    backgroundColor: "#111",
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#fff",
    letterSpacing: 0.5,
  },
});
