import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FFFFFF",
        surface: {
          50: "#FAFAF9",
          100: "#F7F7F5",
          200: "#F2F2EE",
          300: "#E5E5DF",
        },
        foreground: "#111111",
        muted: {
          DEFAULT: "#555555",
          dark: "#333333",
          light: "#777777",
        },
        opal: {
          red: "#C8102E",
          redDark: "#8F0B21",
          redLight: "#FCEBED",
          redBorder: "rgba(200, 16, 46, 0.15)",
          black: "#0B0B0B",
          card: "#FFFFFF",
        },
        border: {
          light: "#EAEAEA",
          DEFAULT: "#E5E5E0",
          dark: "#D1D1CB",
        }
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        display: ["var(--font-display)", "Outfit", "Plus Jakarta Sans", "sans-serif"],
      },
      boxShadow: {
        subtle: "0 1px 3px 0 rgba(0, 0, 0, 0.03), 0 1px 2px -1px rgba(0, 0, 0, 0.03)",
        card: "0 4px 20px -2px rgba(0, 0, 0, 0.05), 0 2px 6px -1px rgba(0, 0, 0, 0.03)",
        premium: "0 20px 40px -15px rgba(0, 0, 0, 0.07), 0 0 0 1px rgba(0, 0, 0, 0.04)",
        glow: "0 0 25px rgba(200, 16, 46, 0.18)",
      },
      letterSpacing: {
        tighter: "-0.04em",
        tight: "-0.02em",
        wide: "0.08em",
        widest: "0.15em",
      }
    },
  },
  plugins: [],
};

export default config;
