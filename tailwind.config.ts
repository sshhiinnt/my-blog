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
        brandColor: "#009944",
        accentryColor: "#ffef8f",
        secondaryColor: "#f2f2e9",
      },
      fontFamily: {
        noto: ["var(--font--notoSansDisplay)"],
        Rockn: ["var(--font--RocknRollOne)"],
      }
    },
  },
  plugins: [require('@tailwindcss/typography')],
} satisfies Config;
