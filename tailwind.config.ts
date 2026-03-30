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
      colors: {
        bg: "#1a1a1a",
        surface: "#2a2a2a",
        border: "#0d0d0d",
        text:"#eaeaea",
        subtext:"#a0a0a0",
        accent:"#ff6b00",
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
  plugins: [require('@tailwindcss/typography')],
} satisfies Config;
