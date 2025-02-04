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
        overlay: "48px",
      },
      maxWidth: {
        content: "608px",
      },
      borderRadius: {
        inner: "var(--inner-border-radius)",
        outer: "var(--outer-border-radius)",
      },
      zIndex: {
        touchpoint: 1000,
        launchButton: 100,
      },
      colors: {
        "primary-80": "var(--primary-80)",
        "primary-60": "var(--primary-60)",
        "primary-40": "var(--primary-40)",
        "primary-20": "var(--primary-20)",
        "primary-10": "var(--primary-10)",
        "primary-5": "var(--primary-5)",
        "primary-1": "var(--primary-1)",
        "secondary-80": "var(--secondary-80)",
        "secondary-60": "var(--secondary-60)",
        "secondary-40": "var(--secondary-40)",
        "secondary-20": "var(--secondary-20)",
        "secondary-10": "var(--secondary-10)",
        "secondary-5": "var(--secondary-5)",
        "secondary-1": "var(--secondary-1)",
        accent: "var(--accent)",
        "accent-20": "var(--accent-20)",
        background: "var(--background)",
        overlay: "var(--overlay)",
        "warning-primary": "var(--warning-primary)",
        "warning-secondary": "var(--warning-secondary)",
        "error-primary": "var(--error-primary)",
        "error-secondary": "var(--error-secondary)",
      },
    },
  },
};
