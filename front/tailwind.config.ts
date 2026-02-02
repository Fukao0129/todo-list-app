// TailwindCSSの拡張設定 https://tailwindcss.nuxtjs.org/tailwindcss/configuration
import colors from "tailwindcss/colors";

export default {
  content: ["./app/**/*.{js,vue,ts}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#007e70",
          strong: "#005f57",
          muted: "#55beb6",
          subtle: "#e0f7f5",
        },
        neutral: {
          DEFAULT: "#333333",
          strong: "#000000",
          muted: "#666666",
          subtle: "#dfdfdf",
        },
        info: {
          DEFAULT: colors.blue[500],
          strong: colors.blue[700],
          muted: colors.blue[300],
          subtle: colors.blue[100],
        },
        warning: {
          DEFAULT: colors.amber[500],
          strong: colors.amber[700],
          muted: colors.amber[300],
          subtle: colors.amber[100],
        },
        error: {
          DEFAULT: colors.red[500],
          strong: colors.red[700],
          muted: colors.red[300],
          subtle: colors.red[100],
        },
      },
      spacing: {
        "header-height": "3.5rem",
        "sidebar-width": "10rem",
      },
      keyframes: {
        slideInUp: {
          from: { transform: "translateY(100%)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        "slide-in-up": "slideInUp 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        "slide-out-down":
          "slideInUp 0.4s cubic-bezier(0.4, 0, 0.2, 1) reverse forwards",
      },
    },
  },
  plugins: [],
};
