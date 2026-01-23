import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 16 * 2 - 12) / 2;

export default StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
    elevation: 2,
  },
  imageWrapper: {
    position: "relative",
  },
  image: {
    width: "100%",
    height: 140,
  },
  badge: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: "#E53935",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  info: {
    padding: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 6,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    fontSize: 15,
    fontWeight: "700",
  },
  rating: {
    fontSize: 13,
    color: "#555",
  },
  qtyRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },

  qtyBtn: {
    width: 28,
    height: 28,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
  },

  qtyText: {
    fontSize: 18,
    fontWeight: "600",
  },

  qtyValue: {
    marginHorizontal: 12,
    fontSize: 14,
    fontWeight: "600",
  },
});
