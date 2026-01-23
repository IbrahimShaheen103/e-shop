import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 28,
    fontWeight: "700",
    paddingHorizontal: 16,
    paddingTop: 26,
    paddingBottom: 8,
    textAlign: "center",
    backgroundColor: "#c4c709a6",
    color: "#ffffffde",
  },
  list: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  row: {
    justifyContent: "space-between",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
