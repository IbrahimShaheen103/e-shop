import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  list: {
    padding: 16,
    paddingBottom: 120,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },

  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    color: "#555",
  },
  qty: {
    fontSize: 13,
    color: "#777",
    marginTop: 4,
  },
  itemTotal: {
    fontSize: 16,
    fontWeight: "600",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    borderTopWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#fff",
  },
  totalText: {
    fontSize: 14,
    color: "#555",
  },
  totalPrice: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 12,
  },
  checkout: {
    backgroundColor: "#111",
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: "center",
  },
  checkoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  empty: {
    fontSize: 16,
    color: "#777",
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 8,
    backgroundColor: "#f2f2f2",
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  info: {
    marginLeft: 12,
    flex: 1,
  },
  qtyRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
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
  right: {
    alignItems: "flex-end",
  },

  removeBtn: {
    marginTop: 8,
  },
});
