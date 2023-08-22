import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        vnpro: ["var(--be-vietnam-pro)"],
      },
      colors: {
        primary: "#6E7271",
        secondary: "#384D48",
        dark: "#352F44",
        light: "#E2E2E2",
        greeny: "#ACAD94",
      },
    },
  },
  plugins: [],
};
export default config;
