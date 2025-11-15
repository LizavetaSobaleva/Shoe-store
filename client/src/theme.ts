import { ThemeConfig } from "antd";

export const antTheme: ThemeConfig = {
  token: {
    colorPrimary: "#4F46E5",
    colorInfo: "#8B5CF6",
    colorSuccess: "#22c55e",
    colorWarning: "#f59e0b",
    colorError: "#ef4444",

    colorBgBase: "#F8FAFC",
    colorBgLayout: "#F8FAFC",
    colorBgContainer: "#FFFFFF",

    fontSize: 16,
    colorText: "#1E293B",

    borderRadius: 12,
    controlHeight: 44,
  },

  components: {
    Button: {
      borderRadius: 24,
      controlHeight: 46,
      colorPrimary: "#4F46E5",
      colorPrimaryHover: "#6366F1",
      colorPrimaryActive: "#4338CA",
      primaryShadow: "0 4px 10px rgba(79,70,229,0.25)",
    },

    Card: {
      borderRadius: 16,
      paddingLG: 24,
      boxShadowTertiary: "0 4px 20px rgba(0,0,0,0.06)",
    },

    Input: {
      borderRadius: 24,
      activeBorderColor: "#4F46E5",
      hoverBorderColor: "#4F46E5",
    },

    Table: {
      borderRadius: 12,
      headerBg: "#F1F5F9",
      rowHoverBg: "#EEF2FF",
    },

    Modal: {
      borderRadius: 20,
      headerBg: "#FFFFFF",
      contentBg: "#FFFFFF",
    },

    Tabs: {
      cardBg: "#FFFFFF",
      itemHoverColor: "#4F46E5",
      itemSelectedColor: "#4F46E5",
      inkBarColor: "#4F46E5",
    },
  },
};
