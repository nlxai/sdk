/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["'Inter'", "sans-serif"],
      mono: ["'Fira Mono'", "monospace"],
      serif: ["Times", "serif"]
    },
    extend: {
      animation: {
        slideInFromLeft: "slideInFromLeftKeyframes 0.3s ease-in-out",
        slideInFromRight: "slideInFromRightKeyframes 0.3s ease-in-out"
      },
      keyframes: {
        slideInFromRightKeyframes: {
          "0%": { opacity: 0, transform: "translateX(30px)" },
          "100%": { opacity: 1, transform: "translateX(0)" }
        },
        slideInFromLeftKeyframes: {
          "0%": { opacity: 0, transform: "translateX(-30px)" },
          "100%": { opacity: 1, transform: "translateX(0)" }
        }
      },
      maxWidth: {
        "8xl": "88rem"
      }
    }
  },
  plugins: [require("@tailwindcss/typography")]
};
