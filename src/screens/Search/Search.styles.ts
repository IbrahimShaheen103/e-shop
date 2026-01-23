import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  input: {
    margin: 16,
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  list: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 120,
  },
  row: {
    justifyContent: "space-between",
  },
  empty: {
    textAlign: "center",
    marginTop: 40,
    color: "#777",
    fontSize: 15,
  },
});
