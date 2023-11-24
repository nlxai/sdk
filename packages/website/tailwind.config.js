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
        blueMain: "rgba(38, 99, 218, 1)",
        blueDarker: "rgba(30, 86, 196, 1)",
        blue15: "rgba(38, 99, 218, 0.15)",
        blue05: "rgba(38, 99, 218, 0.05)",
        lightBlueDarker: "rgba(149, 184, 251, 1)",
        lightBlueMain: "rgba(174, 202, 255, 1)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
