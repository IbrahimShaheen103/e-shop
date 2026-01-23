import { StyleSheet } from "react-native";

export default StyleSheet.create({
  /* ================= HEADER ================= */

  container: {
    paddingBottom: 14,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
  },

  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    letterSpacing: 0.5,
  },

  /* ================= RIGHT ACTIONS ================= */

  rightActions: {
    flexDirection: "row",
    alignItems: "center",
  },

  cartWrapper: {
    position: "relative",
  },

  badge: {
    position: "absolute",
    top: -6,
    right: -10,
    backgroundColor: "#EF4444",
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
  },

  badgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "700",
  },

  logoutButton: {
    marginLeft: 10,
    padding: 4,
  },

  /* ================= LOGOUT MODAL ================= */

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  modal: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    elevation: 5,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
  },

  modalText: {
    fontSize: 14,
    color: "#555",
    marginBottom: 20,
  },

  modalActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 20,
  },

  cancel: {
    fontSize: 14,
    color: "#666",
  },

  logout: {
    fontSize: 14,
    fontWeight: "600",
    color: "#DC2626",
  },
});
