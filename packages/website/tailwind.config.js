import colors from "tailwindcss/colors";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["'Neue Haas Grotesk'", "sans-serif"],
      mono: ["'Fira Mono'", "monospace"],
      serif: ["Times", "serif"],
    },
    extend: {
      animation: {
        slideInFromLeft: "slideInFromLeftKeyframes 0.3s ease-in-out",
        slideInFromRight: "slideInFromRightKeyframes 0.3s ease-in-out",
      },
      keyframes: {
        slideInFromRightKeyframes: {
          "0%": { opacity: 0, transform: "translateX(30px)" },
          "100%": { opacity: 1, transform: "translateX(0)" },
        },
        slideInFromLeftKeyframes: {
          "0%": { opacity: 0, transform: "translateX(-30px)" },
          "100%": { opacity: 1, transform: "translateX(0)" },
        },
      },
      maxWidth: {
        "8xl": "88rem",
      },
      colors: {
        gray: colors.neutral,
        blueMain: "rgba(38, 99, 218, 1)",
        blueDarker: "rgba(30, 86, 196, 1)",
        blue15: "rgba(38, 99, 218, 0.15)",
        blue05: "rgba(38, 99, 218, 0.05)",
        lightBlueDarker: "rgba(149, 184, 251, 1)",
        lightBlueMain: "rgba(174, 202, 255, 1)",

        black90: "rgba(0, 0, 0, 0.9)",
        black80: "rgba(0, 0, 0, 0.8)",
        black60: "rgba(0, 0, 0, 0.6)",
        black40: "rgba(0, 0, 0, 0.4)",
        black20: "rgba(0, 0, 0, 0.2)",
        black10: "rgba(0, 0, 0, 0.1)",
        black07: "rgba(0, 0, 0, 0.07)",
        black05: "rgba(0, 0, 0, 0.05)",
        black02: "rgba(0, 0, 0, 0.02)",

        white100: "rgba(255, 255, 255, 1)",
        white85: "rgba(255, 255, 255, 0.85)",
        white65: "rgba(255, 255, 255, 0.65)",
        white45: "rgba(255, 255, 255, 0.45)",
        white25: "rgba(255, 255, 255, 0.25)",
        white20: "rgba(255, 255, 255, 0.20)",
        white15: "rgba(255, 255, 255, 0.15)",
        white07: "rgba(255, 255, 255, 0.07)",
        white02: "rgba(255, 255, 255, 0.02)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
