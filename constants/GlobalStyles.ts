export const createGlobalStyles = (
  colorScheme: "light" | "dark" | null,
  colors: any,
) => ({
  // Layout
  container: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  safeAreaContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContainer: {
    flex: 1,
  },

  // Text Styles
  headerLarge: {
    fontSize: 32,
    fontWeight: "700" as const,
    color: colors.text,
    marginBottom: 24,
  },
  headerMedium: {
    fontSize: 24,
    fontWeight: "700" as const,
    color: colors.text,
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: "600" as const,
    color: colors.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: colorScheme === "dark" ? "#9CA3AF" : "#6B7280",
  },
  caption: {
    fontSize: 12,
    color: colorScheme === "dark" ? "#6B7280" : "#9CA3AF",
  },
  timestamp: {
    fontSize: 13,
    color: colorScheme === "dark" ? "#9CA3AF" : "#6B7280",
    fontWeight: "500" as const,
  },

  // Cards & Containers
  card: {
    backgroundColor: colorScheme === "dark" ? "#1F2937" : "#F3F4F6",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row" as const,
    alignItems: "center" as const,
  },
  touchableCard: {
    backgroundColor: colorScheme === "dark" ? "#1F2937" : "#F3F4F6",
    borderRadius: 16,
    padding: 16,
    marginBottom: 4,
    flexDirection: "row" as const,
    alignItems: "center" as const,
    justifyContent: "space-between" as const,
  },

  // Icon Containers
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colorScheme === "dark" ? "#374151" : "#E5E7EB",
    justifyContent: "center" as const,
    alignItems: "center" as const,
    marginRight: 16,
  },
  iconContainerLarge: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#0EA5E9",
    justifyContent: "center" as const,
    alignItems: "center" as const,
    marginRight: 16,
  },
  avatarContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center" as const,
    alignItems: "center" as const,
    marginRight: 12,
  },

  // Content Containers
  textContainer: {
    flex: 1,
  },
  rowBetween: {
    flexDirection: "row" as const,
    justifyContent: "space-between" as const,
    alignItems: "center" as const,
  },
  rowCenter: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    flex: 1,
  },

  // Badges
  badge: {
    backgroundColor: "#3B82F6",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    justifyContent: "center" as const,
    alignItems: "center" as const,
    minWidth: 24,
  },
  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600" as const,
  },
});
