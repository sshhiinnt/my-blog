import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        tapHint: {
          "0%, 100%": {
            transform: "translateY(0) scale(1)",
          },
          "30%": {
            transform: "translateY(-3px) scale(1.03)",
          },
          "60%": {
            transform: "translateY(1px) scale(0.99)",
          },
        },
        fadeScaleIn: {
          "0%": {
            opacity: "0",
            transform: "scale(10) translateY(10px)",
            filter: "blur(6px)",
          },
          "100%": {
            opacity: "1",
            transform: "scale(1) translateY(0)",
            filter: "blur(0)",
          },
        },
      },
      animation: {
        fadeScaleIn: "fadeScaleIn 1.5s ease forwards",
        tapHint: "tapHint 1.4s ease-in-out infinite"
      },
      colors: {
        bg: "#1a1a1a",
        surface: "#2a2a2a",
        border: "#0d0d0d",
        text: "#eaeaea",
        subtext: "#a0a0a0",
        accent: "#ff6b00",
        brand: "#009944",
        accentry: "#ffef8f",
        secondary: "#f2f2e9",
      },
      fontFamily: {
        noto: ["var(--font--notoSansDisplay)"],
        Rockn: ["var(--font--RocknRollOne)"],
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwind-scrollbar-hide'),
  ],
} satisfies Config;
