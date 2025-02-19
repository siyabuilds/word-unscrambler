import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        lightGray: "#f7f7f7",
        darkGray: "#333333",
        black: "#000000",
        white: "#FFFFFF",
        lightBlue: "#4f83cc",
        red: "#ff4d4d",
      },
    },
  },
  plugins: [],
} satisfies Config;
