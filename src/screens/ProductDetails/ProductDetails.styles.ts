import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 300,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 8,
  },
  rating: {
    fontSize: 14,
    color: "#444",
  },
  discount: {
    backgroundColor: "#E53935",
    color: "#fff",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    fontSize: 12,
    fontWeight: "600",
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
  },
  price: {
    fontSize: 24,
    fontWeight: "700",
  },
  oldPrice: {
    fontSize: 16,
    color: "#888",
    textDecorationLine: "line-through",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    color: "#555",
    lineHeight: 20,
  },
  buttons: {
    marginTop: 24,
    gap: 12,
  },
  buyNow: {
    backgroundColor: "#111",
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: "center",
  },
  buyText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  addToCart: {
    borderWidth: 1,
    borderColor: "#111",
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: "center",
  },
  cartText: {
    color: "#111",
    fontSize: 16,
    fontWeight: "600",
  },
});
