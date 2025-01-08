/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    fontFamily: {
      sans: ["var(--font-family)"],
    },
    extend: {
      backdropBlur: {
        overlay: "48px"
      },
      maxWidth: {
        content: "608px",
      },
      borderRadius: {
        base: "12px",
        plus: "20px",
      },
      zIndex: {
        touchpoint: 1000,
        launchButton: 100,
      },
      colors: {
        "primary-80": "rgb(var(--primary-80))",
        "primary-60": "rgb(var(--primary-60))",
        "primary-40": "rgb(var(--primary-40))",
        "primary-20": "rgb(var(--primary-20))",
        "primary-10": "rgb(var(--primary-10))",
        "primary-5": "rgb(var(--primary-5))",
        "primary-1": "rgb(var(--primary-1))",
        "secondary-80": "rgb(var(--secondary-80))",
        "secondary-60": "rgb(var(--secondary-60))",
        "secondary-40": "rgb(var(--secondary-40))",
        "secondary-20": "rgb(var(--secondary-20))",
        "secondary-10": "rgb(var(--secondary-10))",
        "secondary-5": "rgb(var(--secondary-5))",
        "secondary-1": "rgb(var(--secondary-1))",
        accent: "rgb(var(--accent))",
        "accent-20": "rgb(var(--accent-20))",
        background: "rgb(var(--background))",
        overlay: "rgb(var(--overlay))",
        "warning-primary": "rgb(var(--warning-primary))",
        "warning-secondary": "rgb(var(--warning-secondary))",
        "error-primary": "rgb(var(--error-primary))",
        "error-secondary": "rgb(var(--error-secondary))",
      },
    },
  },
};
