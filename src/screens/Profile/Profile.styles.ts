import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },

  /* Avatar section */

  avatarSection: {
    alignItems: "center",
    marginTop: 40,
    marginBottom: 24,
  },

  image: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 3,
    borderColor: "#111827",
    marginBottom: 12,
  },

  name: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
  },

  username: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 2,
  },

  /* Info card */

  infoCard: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    borderRadius: 16,
    paddingVertical: 10,

    // shadow iOS
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },

    // shadow Android
    elevation: 3,
  },

  infoRow: {
    paddingHorizontal: 16,
    paddingVertical: 14,
  },

  label: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 4,
  },

  value: {
    fontSize: 15,
    fontWeight: "500",
    color: "#111827",
  },

  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginHorizontal: 16,
  },

  emptyText: {
    marginTop: 40,
    textAlign: "center",
    color: "#6B7280",
  },
});
